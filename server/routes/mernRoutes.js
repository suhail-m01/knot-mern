import express from 'express';
import { getDbStatus, isInMemoryFallback, memoryStore } from '../config/db.js';
import { Event } from '../models/Event.js';
import { User } from '../models/User.js';
import { Registration } from '../models/Registration.js';
import { Hackathon } from '../models/Hackathon.js';
import { Community } from '../models/Community.js';
import { realtimeService } from '../services/realtimeService.js';

const router = express.Router();
const serverStartTime = Date.now();

// Server-Sent Events (SSE) for instant cross-platform real-time sync
router.get('/stream', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'X-Accel-Buffering': 'no',
  });

  const sendEvent = (data) => {
    try {
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    } catch (_) {}
  };

  sendEvent({ type: 'CONNECTED', message: 'Knot Real-Time MERN Sync Stream Active' });

  // Heartbeat keep-alive every 20 seconds
  const heartbeat = setInterval(() => {
    sendEvent({ type: 'HEARTBEAT', timestamp: new Date().toISOString() });
  }, 20000);

  const onSync = (event) => sendEvent(event);
  realtimeService.on('sync', onSync);

  req.on('close', () => {
    clearInterval(heartbeat);
    realtimeService.off('sync', onSync);
  });
});

router.get('/ping', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Knot MERN API is alive and responsive',
    timestamp: new Date().toISOString(),
  });
});

router.get('/status', async (req, res) => {
  try {
    const dbStatus = getDbStatus();

    let eventCount = 0;
    let userCount = 0;
    let registrationCount = 0;
    let hackathonCount = 0;
    let communityCount = 0;

    if (isInMemoryFallback) {
      eventCount = memoryStore.events.size;
      userCount = memoryStore.users.size;
      registrationCount = memoryStore.registrations.size;
      hackathonCount = memoryStore.hackathons.size;
      communityCount = memoryStore.communities.size;
    } else {
      eventCount = await Event.countDocuments().catch(() => 0);
      userCount = await User.countDocuments().catch(() => 0);
      registrationCount = await Registration.countDocuments().catch(() => 0);
      hackathonCount = await Hackathon.countDocuments().catch(() => 0);
      communityCount = await Community.countDocuments().catch(() => 0);
    }

    const uptimeSeconds = Math.floor((Date.now() - serverStartTime) / 1000);

    res.status(200).json({
      success: true,
      stack: {
        name: 'Knot MERN Architecture',
        version: '1.0.0',
        components: {
          mongoDB: {
            title: 'MongoDB (Mongoose ODM)',
            status: dbStatus.mode === 'mongodb-live' ? 'Connected (Live MongoDB)' : 'Active (Dual-Engine In-Memory Layer)',
            mode: dbStatus.mode,
            database: dbStatus.database,
            counts: {
              events: eventCount,
              users: userCount,
              registrations: registrationCount,
              hackathons: hackathonCount,
              communities: communityCount,
            },
          },
          express: {
            title: 'Express.js REST API',
            status: 'Running',
            port: process.env.PORT || 5000,
            uptimeSeconds,
            endpoints: [
              '/api/events',
              '/api/events/nearby',
              '/api/auth/register',
              '/api/auth/login',
              '/api/registrations',
              '/api/hackathons',
              '/api/communities',
              '/api/mern/status',
            ],
          },
          react: {
            title: 'React 19 + TypeScript + Vite',
            status: 'Integrated',
            features: [
              'Leaflet Geospatial Map with Bengaluru Clusters',
              'QR Code Check-In Pass & Scanner',
              'Local English OCR Ticket Parser',
              'AI Event Concierge Chatbot',
              'WhatsApp Forward Message Importer',
              'Live Hackathon Discovery',
            ],
          },
          nodeJS: {
            title: 'Node.js Runtime',
            version: process.version,
            platform: process.platform,
            arch: process.arch,
            memoryUsageMb: Math.round(process.memoryUsage().rss / (1024 * 1024)),
          },
        },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
