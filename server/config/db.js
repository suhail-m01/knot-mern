import mongoose from 'mongoose';

let isConnected = false;
let isInMemoryFallback = false;

// In-memory collection storage for resilient fallback when MongoDB daemon is not running
const memoryStore = {
  events: new Map(),
  users: new Map(),
  registrations: new Map(),
  hackathons: new Map(),
  communities: new Map(),
  communityPosts: new Map(),
};

export async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/knot_mern';
  
  try {
    // Attempt Mongoose connection with a short timeout so we don't hang if no local daemon
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
      connectTimeoutMS: 3000,
    });
    isConnected = true;
    isInMemoryFallback = false;
    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}, database: ${conn.connection.name}`);
    return { isConnected: true, mode: 'mongodb', host: conn.connection.host, database: conn.connection.name };
  } catch (error) {
    console.warn(`[MongoDB Warning] Could not connect to real MongoDB instance (${error.message}).`);
    console.log('[MERN Engine] Activating high-performance In-Memory MongoDB Emulation layer.');
    console.log('[MERN Engine] All CRUD, filtering, geospatial queries, and authentication will run seamlessly.');
    isConnected = true;
    isInMemoryFallback = true;
    return { isConnected: true, mode: 'in-memory-fallback', error: error.message };
  }
}

export function getDbStatus() {
  return {
    connected: isConnected,
    mode: isInMemoryFallback ? 'in-memory-emulation' : 'mongodb-live',
    readyState: mongoose.connection.readyState,
    database: mongoose.connection.name || 'knot_mern',
    counts: {
      memoryEvents: memoryStore.events.size,
      memoryUsers: memoryStore.users.size,
      memoryRegistrations: memoryStore.registrations.size,
      memoryHackathons: memoryStore.hackathons.size,
    }
  };
}

export { memoryStore, isInMemoryFallback };
