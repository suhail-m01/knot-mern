import { Registration } from '../models/Registration.js';
import { Event } from '../models/Event.js';
import { isInMemoryFallback, memoryStore } from '../config/db.js';
import { realtimeService } from '../services/realtimeService.js';

function generateCheckInToken() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let token = 'KNOT-';
  for (let i = 0; i < 8; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

export async function createRegistration(req, res) {
  try {
    const { eventId, userId, participationType = 'solo', teamName, teamMembers, participantDetails, answers } = req.body;

    if (!eventId || !userId) {
      return res.status(400).json({ success: false, error: 'Event ID and User ID are required' });
    }

    if (isInMemoryFallback) {
      // Check duplicate
      const duplicate = Array.from(memoryStore.registrations.values()).find(
        (r) => r.eventId === eventId && r.userId === userId && r.status !== 'cancelled'
      );
      if (duplicate) {
        return res.status(200).json({ success: true, status: 'duplicate', registration: duplicate });
      }

      // Check event capacity
      const event = memoryStore.events.get(eventId);
      let status = 'registered';
      if (event?.registration?.capacity) {
        const currentCount = Array.from(memoryStore.registrations.values()).filter(
          (r) => r.eventId === eventId && (r.status === 'registered' || r.status === 'approved')
        ).length;
        if (currentCount >= event.registration.capacity) {
          status = event.registration.waitlistEnabled ? 'waitlisted' : 'closed';
          if (status === 'closed') {
            return res.status(400).json({ success: false, status: 'closed', error: 'Event registration is full' });
          }
        }
      }

      const registration = {
        id: 'reg_' + Math.random().toString(36).substring(2, 11),
        eventId,
        userId,
        kind: 'native',
        status,
        checkInToken: generateCheckInToken(),
        checkedInAt: null,
        participationType,
        teamName: teamName || null,
        teamCode: teamName ? 'TEAM-' + Math.random().toString(36).substring(2, 7).toUpperCase() : null,
        teamMembers: teamMembers || [],
        participantDetails: participantDetails || {},
        answers: answers || {},
        createdAt: new Date().toISOString(),
      };

      memoryStore.registrations.set(registration.id, registration);
      realtimeService.broadcast('REGISTRATION_CREATED', registration);
      return res.status(201).json({ success: true, status, registration });
    }

    // Live MongoDB
    const duplicate = await Registration.findOne({
      eventId,
      userId,
      status: { $ne: 'cancelled' },
    });
    if (duplicate) {
      return res.status(200).json({ success: true, status: 'duplicate', registration: duplicate });
    }

    const event = await Event.findOne({ id: eventId }).lean();
    let status = 'registered';
    if (event?.registration?.capacity) {
      const currentCount = await Registration.countDocuments({
        eventId,
        status: { $in: ['registered', 'approved'] },
      });
      if (currentCount >= event.registration.capacity) {
        status = event.registration.waitlistEnabled ? 'waitlisted' : 'closed';
        if (status === 'closed') {
          return res.status(400).json({ success: false, status: 'closed', error: 'Event registration is full' });
        }
      }
    }

    const registration = await Registration.create({
      id: 'reg_' + Math.random().toString(36).substring(2, 11),
      eventId,
      userId,
      kind: 'native',
      status,
      checkInToken: generateCheckInToken(),
      participationType,
      teamName: teamName || null,
      teamCode: teamName ? 'TEAM-' + Math.random().toString(36).substring(2, 7).toUpperCase() : null,
      teamMembers: teamMembers || [],
      participantDetails: participantDetails || {},
      answers: answers || {},
    });

    realtimeService.broadcast('REGISTRATION_CREATED', registration);
    return res.status(201).json({ success: true, status, registration });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function getMyRegistrations(req, res) {
  try {
    let userId = req.query.userId || req.headers['x-user-id'];
    if (!userId && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith('Bearer mern_token_')) {
        userId = authHeader.replace('Bearer mern_token_', '').trim();
      } else if (authHeader.startsWith('Bearer ')) {
        userId = authHeader.replace('Bearer ', '').trim();
      }
    }
    if (!userId) {
      return res.status(200).json({ success: true, data: [] });
    }

    if (isInMemoryFallback) {
      const regs = Array.from(memoryStore.registrations.values()).filter((r) => r.userId === userId);
      return res.status(200).json({ success: true, data: regs });
    }

    const regs = await Registration.find({ userId }).sort({ createdAt: -1 }).lean();
    return res.status(200).json({ success: true, data: regs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function verifyCheckIn(req, res) {
  try {
    const { token, eventId } = req.body;
    if (!token) {
      return res.status(400).json({ success: false, error: 'QR Check-in token required' });
    }

    if (isInMemoryFallback) {
      const reg = Array.from(memoryStore.registrations.values()).find(
        (r) => r.checkInToken === token && (!eventId || r.eventId === eventId)
      );
      if (!reg) {
        return res.status(404).json({ success: false, error: 'Invalid or unknown check-in token' });
      }
      if (reg.checkedInAt) {
        return res.status(200).json({ success: true, alreadyCheckedIn: true, registration: reg });
      }

      reg.checkedInAt = new Date().toISOString();
      reg.status = 'attended';
      memoryStore.registrations.set(reg.id, reg);
      realtimeService.broadcast('CHECKIN_VERIFIED', reg);
      return res.status(200).json({ success: true, alreadyCheckedIn: false, registration: reg });
    }

    const filter = { checkInToken: token };
    if (eventId) filter.eventId = eventId;

    const reg = await Registration.findOne(filter);
    if (!reg) {
      return res.status(404).json({ success: false, error: 'Invalid or unknown check-in token' });
    }
    if (reg.checkedInAt) {
      return res.status(200).json({ success: true, alreadyCheckedIn: true, registration: reg });
    }

    reg.checkedInAt = new Date();
    reg.status = 'attended';
    await reg.save();

    realtimeService.broadcast('CHECKIN_VERIFIED', reg);
    return res.status(200).json({ success: true, alreadyCheckedIn: false, registration: reg });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function getEventAttendees(req, res) {
  try {
    const { eventId } = req.params;

    if (isInMemoryFallback) {
      const attendees = Array.from(memoryStore.registrations.values()).filter((r) => r.eventId === eventId);
      return res.status(200).json({ success: true, data: attendees, count: attendees.length });
    }

    const attendees = await Registration.find({ eventId }).sort({ createdAt: -1 }).lean();
    return res.status(200).json({ success: true, data: attendees, count: attendees.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
