import dotenv from 'dotenv';
import http from 'http';
import app from './app.js';
import { connectDB } from './config/db.js';
import { seedDatabase } from './scripts/seed.js';
import { agencyOrchestrator } from './agents/AgencyOrchestrator.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  console.log('='.repeat(60));
  console.log('  🚀 Starting Knot MERN Application Server');
  console.log('  M: MongoDB (Mongoose Object Modeling)');
  console.log('  E: Express.js (RESTful API Server)');
  console.log('  R: React 19 (Frontend Client with Leaflet & AI Concierge)');
  console.log('  N: Node.js Runtime');
  console.log('='.repeat(60));

  try {
    // Connect to database (live MongoDB or resilient in-memory dual layer)
    await connectDB();

    // Auto-seed database with default Knot Bengaluru events and hackathons
    await seedDatabase();

    // Start background autonomous agency agents
    try {
      agencyOrchestrator.startContinuousPolling();
    } catch (e) {
      console.warn('[Agency Orchestrator] Error starting background scheduler:', e?.message || e);
    }

    // Start Express server
    const server = http.createServer(app);
    server.listen(PORT, '0.0.0.0', () => {
      console.log(`\n✅ Knot MERN Server listening on http://localhost:${PORT}`);
      console.log(`📡 REST API Base: http://localhost:${PORT}/api`);
      console.log(`📊 MERN Diagnostics: http://localhost:${PORT}/api/mern/status\n`);
    });

    const shutdown = () => {
      console.log('\n[MERN Server] Gracefully shutting down...');
      server.close(() => {
        console.log('[MERN Server] Closed remaining connections.');
        process.exit(0);
      });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (error) {
    console.error('Fatal server startup error:', error);
    process.exit(1);
  }
}

startServer();
