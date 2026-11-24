import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import eventRoutes from './routes/eventRoutes.js';
import authRoutes from './routes/authRoutes.js';
import registrationRoutes from './routes/registrationRoutes.js';
import hackathonRoutes from './routes/hackathonRoutes.js';
import communityRoutes from './routes/communityRoutes.js';
import mernRoutes from './routes/mernRoutes.js';
import agencyAgentRoutes from './routes/agencyAgentRoutes.js';
import { seedDatabase } from './scripts/seed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const app = express();

// Bulletproof CORS for Flutter Web, Android Emulators & Cross-Origin Clients
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Expose-Headers', '*');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging in development
app.use((req, res, next) => {
  if (req.url.startsWith('/api')) {
    console.log(`[Express API] ${req.method} ${req.url}`);
  }
  next();
});

// REST API Endpoints
app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/hackathons', hackathonRoutes);
app.use('/api/communities', communityRoutes);
app.use('/api/agents', agencyAgentRoutes);
app.use('/api/mern', mernRoutes);

// Seed API endpoint for easy browser/client initialization
app.post('/api/seed', async (req, res) => {
  try {
    const result = await seedDatabase();
    res.status(200).json({ success: true, message: 'Database seeded successfully', ...result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Health check root
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Knot MERN Backend',
  });
});

// Mobile Flutter Production Web Client Serving
const mobileBuildPath = path.join(rootDir, 'mobile', 'build', 'web');
if (fs.existsSync(mobileBuildPath)) {
  console.log(`[Express] Serving static mobile Flutter build from ${mobileBuildPath}`);
  app.use('/mobile', express.static(mobileBuildPath));
  app.get('/mobile*', (req, res, next) => {
    if (req.path.includes('.') && !req.path.endsWith('.html')) return next();
    let html = fs.readFileSync(path.join(mobileBuildPath, 'index.html'), 'utf8');
    html = html.replace('<base href="/">', '<base href="/mobile/">');
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  });
}

// Production Static Client Serving
const distPath = path.join(rootDir, 'dist');
if (fs.existsSync(distPath)) {
  console.log(`[Express] Serving static production build from ${distPath}`);
  app.use(express.static(distPath));
  app.get('*', (req, res, next) => {
    if (req.url.startsWith('/api')) return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Global 404 for unmatched API routes
app.all('/api/*', (req, res) => {
  res.status(404).json({ success: false, error: `API route not found: ${req.method} ${req.url}` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('[Express Error]', err);
  if (!res.headersSent) {
    res.status(err.status || 500).json({
      success: false,
      error: err.message || 'Internal Server Error',
    });
  }
});

export default app;
