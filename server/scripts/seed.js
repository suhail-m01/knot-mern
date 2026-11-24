import dotenv from 'dotenv';
import { connectDB, isInMemoryFallback, memoryStore } from '../config/db.js';
import { Event } from '../models/Event.js';
import { User } from '../models/User.js';
import { Hackathon } from '../models/Hackathon.js';
import { Community } from '../models/Community.js';
import { DEFAULT_EVENTS, DEFAULT_USERS } from '../data/defaultCatalog.js';
import { DEFAULT_HACKATHONS } from '../controllers/hackathonController.js';
import { DEFAULT_COMMUNITIES } from '../controllers/communityController.js';

dotenv.config();

export async function seedDatabase() {
  console.log('[MERN Seeder] Initializing database seeding...');
  await connectDB();

  if (isInMemoryFallback) {
    console.log('[MERN Seeder] Seeding In-Memory MongoDB store...');
    DEFAULT_EVENTS.forEach((e) => memoryStore.events.set(e.id, e));
    DEFAULT_USERS.forEach((u) => memoryStore.users.set(u.id, u));
    DEFAULT_HACKATHONS.forEach((h) => memoryStore.hackathons.set(h.id, h));
    DEFAULT_COMMUNITIES.forEach((c) => memoryStore.communities.set(c.id, c));
    console.log(`[MERN Seeder] Successfully seeded:
  - ${DEFAULT_EVENTS.length} Events
  - ${DEFAULT_USERS.length} Users
  - ${DEFAULT_HACKATHONS.length} Hackathons
  - ${DEFAULT_COMMUNITIES.length} Communities`);
    return { success: true, mode: 'in-memory', counts: { events: DEFAULT_EVENTS.length, users: DEFAULT_USERS.length, hackathons: DEFAULT_HACKATHONS.length } };
  }

  try {
    console.log('[MERN Seeder] Seeding Live MongoDB instance...');
    
    // Upsert events
    for (const evt of DEFAULT_EVENTS) {
      await Event.findOneAndUpdate({ id: evt.id }, { $set: evt }, { upsert: true, new: true });
    }

    // Upsert users
    for (const usr of DEFAULT_USERS) {
      await User.findOneAndUpdate({ id: usr.id }, { $set: usr }, { upsert: true, new: true });
    }

    // Upsert hackathons
    for (const hck of DEFAULT_HACKATHONS) {
      await Hackathon.findOneAndUpdate({ id: hck.id }, { $set: hck }, { upsert: true, new: true });
    }

    // Upsert communities
    for (const comm of DEFAULT_COMMUNITIES) {
      await Community.findOneAndUpdate({ id: comm.id }, { $set: comm }, { upsert: true, new: true });
    }

    const eventCount = await Event.countDocuments();
    const userCount = await User.countDocuments();
    const hackathonCount = await Hackathon.countDocuments();
    const communityCount = await Community.countDocuments();

    console.log(`[MERN Seeder] MongoDB Seeding Complete:
  - ${eventCount} Events in MongoDB
  - ${userCount} Users in MongoDB
  - ${hackathonCount} Hackathons in MongoDB
  - ${communityCount} Communities in MongoDB`);

    return {
      success: true,
      mode: 'mongodb-live',
      counts: { events: eventCount, users: userCount, hackathons: hackathonCount, communities: communityCount },
    };
  } catch (error) {
    console.error('[MERN Seeder] Seeding error:', error);
    throw error;
  }
}

// Auto-run if executed directly
if (process.argv[1]?.endsWith('seed.js')) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
