import http from 'http';
import path from 'path';
import fs from 'fs';
import express from 'express';
import cors from 'cors';
import app from '../server/app.js';
import { connectDB } from '../server/config/db.js';
import { seedDatabase } from '../server/scripts/seed.js';
import { agencyOrchestrator } from '../server/agents/AgencyOrchestrator.js';
import { createServer as createViteServer } from 'vite';

const rootDir = path.resolve();
const mobileBuildPath = path.join(rootDir, 'mobile', 'build', 'web');

async function main() {
  console.log('='.repeat(65));
  console.log('  🚀 Launching Knot Unified MERN + Vite Development System');
  console.log('='.repeat(65));

  try {
    // 1. Database Connection, Seeding and Autonomous Agency Agents
    await connectDB();
    await seedDatabase();
    agencyOrchestrator.startContinuousPolling();

    // 2. Start Express API Server on 5000
    const expressServer = http.createServer(app);
    await new Promise((resolve) => expressServer.listen(5000, '0.0.0.0', resolve));
    console.log('  ✅ [Express API & MERN Backend] http://localhost:5000');
    console.log('  📊 [MERN Diagnostics Endpoint]   http://localhost:5000/api/mern/status');

    // 3. Start Vite Client on 5174
    const vite = await createViteServer({
      server: {
        port: 5174,
        host: '0.0.0.0',
        strictPort: false,
      },
    });
    await vite.listen();
    console.log('  ⚡ [Vite React 19 Client]        http://localhost:5174/');

    // 4. Create Mirror Gateway on 5175 for IDE preview tab compatibility
    const mirrorServer = http.createServer((req, res) => {
      const proxyReq = http.request(
        {
          hostname: '127.0.0.1',
          port: 5174,
          path: req.url,
          method: req.method,
          headers: req.headers,
        },
        (proxyRes) => {
          res.writeHead(proxyRes.statusCode, proxyRes.headers);
          proxyRes.pipe(res, { end: true });
        }
      );
      proxyReq.on('error', () => {
        res.writeHead(502);
        res.end('Knot Vite server is initializing...');
      });
      req.pipe(proxyReq, { end: true });
    });

    mirrorServer.on('upgrade', (req, socket) => {
      const proxyReq = http.request({
        hostname: '127.0.0.1',
        port: 5174,
        path: req.url,
        method: req.method,
        headers: req.headers,
      });
      proxyReq.on('upgrade', (proxyRes, proxySocket) => {
        socket.write(
          'HTTP/1.1 101 Switching Protocols\r\n' +
            Object.entries(proxyRes.headers)
              .map(([k, v]) => `${k}: ${v}`)
              .join('\r\n') +
            '\r\n\r\n'
        );
        proxySocket.pipe(socket);
        socket.pipe(proxySocket);
      });
      proxyReq.on('error', () => socket.destroy());
      proxyReq.end();
    });

    mirrorServer.listen(5175, '0.0.0.0', () => {
      console.log('  🎯 [IDE Preview Tab Mirror]       http://localhost:5175/');
    });

    // 5. Start Dedicated Mobile App Web Server on 8080
    let mobileServer = null;
    if (fs.existsSync(mobileBuildPath)) {
      const mobileApp = express();
      mobileApp.use(cors({ origin: '*' }));
      mobileApp.use(express.static(mobileBuildPath));
      mobileApp.use('/mobile', express.static(mobileBuildPath));
      mobileApp.get('*', (req, res, next) => {
        if (req.path.includes('.') && !req.path.endsWith('.html')) return next();
        let html = fs.readFileSync(path.join(mobileBuildPath, 'index.html'), 'utf8');
        html = html.replace('<base href="/mobile/">', '<base href="/">');
        res.setHeader('Content-Type', 'text/html');
        res.send(html);
      });
      mobileServer = http.createServer(mobileApp);
      await new Promise((resolve) => mobileServer.listen(8080, '0.0.0.0', resolve));
      console.log('  📱 [Flutter Mobile Web App]      http://localhost:8080/');
    }

    console.log('='.repeat(65));
    console.log('\n✨ All Knot services are ACTIVE and reachable!');
    console.log('👉 Click "Reload" on your localhost:5175, localhost:5000, or localhost:8080 tabs.\n');

    const shutdown = () => {
      console.log('\nShutting down servers...');
      expressServer.close();
      vite.close();
      mirrorServer.close();
      if (mobileServer) mobileServer.close();
      process.exit(0);
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (err) {
    console.error('Fatal dev server error:', err);
    process.exit(1);
  }
}

main();
