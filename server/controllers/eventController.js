import { Event } from '../models/Event.js';
import { isInMemoryFallback, memoryStore } from '../config/db.js';
import { realtimeService } from '../services/realtimeService.js';
import { DEFAULT_EVENTS } from '../data/defaultCatalog.js';
import { autonomousReviewAgent } from '../agents/AutonomousReviewAgent.js';

// Haversine distance in km
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export async function getEvents(req, res) {
  try {
    const {
      q,
      search,
      query,
      type,
      category,
      eventType,
      format,
      mode,
      locality,
      area,
      city,
      price,
      interest,
      limit = 50,
      page = 1,
      sort = 'soonest',
    } = req.query;

    const parsedLimit = Math.min(parseInt(limit, 10) || 50, 100);
    const parsedPage = Math.max(parseInt(page, 10) || 1, 1);
    const skip = (parsedPage - 1) * parsedLimit;

    const searchVal = (q || search || query || '').trim().toLowerCase();
    const categoryRaw = (category || type || eventType || format || '').trim();
    const catLower = categoryRaw.toLowerCase().replace(/s$/, ''); // e.g. 'workshops' -> 'workshop'
    const isFormat = ['hackathon', 'workshop', 'meetup', 'conference', 'summit', 'webinar', 'competition'].includes(catLower);
    const isTopic = !isFormat && catLower !== 'all' && catLower !== 'all format' && catLower !== '';
    const isCommunity = catLower.startsWith('communit');
    const areaVal = (area || locality || '').trim().toLowerCase();
    const cityVal = (city || '').trim().toLowerCase();
    const modeVal = (mode || '').trim().toLowerCase();
    const priceVal = (price || '').trim().toLowerCase();
    const interestVal = (interest || '').trim().toLowerCase();

    if (isInMemoryFallback) {
      let events = Array.from(memoryStore.events.values());
      if (events.length === 0) {
        DEFAULT_EVENTS.forEach((e) => memoryStore.events.set(e.id, e));
        events = Array.from(memoryStore.events.values());
      }

      // Search keyword filter
      if (searchVal) {
        events = events.filter((e) =>
          e.title?.toLowerCase().includes(searchVal) ||
          e.summary?.toLowerCase().includes(searchVal) ||
          e.description?.toLowerCase().includes(searchVal) ||
          e.locality?.toLowerCase().includes(searchVal) ||
          e.venue?.name?.toLowerCase().includes(searchVal) ||
          e.venue?.address?.toLowerCase().includes(searchVal) ||
          e.interests?.some((i) => i.toLowerCase().includes(searchVal)) ||
          e.skills?.some((s) => s.toLowerCase().includes(searchVal))
        );
      }

      // Category / Format / Topic filter
      if (isFormat) {
        events = events.filter((e) => {
          const eType = (e.eventType || e.type || '').toLowerCase().replace(/s$/, '');
          return eType === catLower ||
            e.title?.toLowerCase().includes(catLower) ||
            e.summary?.toLowerCase().includes(catLower);
        });
      } else if (isCommunity) {
        events = events.filter((e) => e.communityId || e.organizerName);
      } else if (isTopic) {
        events = events.filter((e) =>
          e.interests?.some((i) => i.toLowerCase().includes(catLower)) ||
          e.skills?.some((s) => s.toLowerCase().includes(catLower)) ||
          e.title?.toLowerCase().includes(catLower) ||
          e.summary?.toLowerCase().includes(catLower) ||
          e.tags?.some((t) => t.toLowerCase().includes(catLower))
        );
      }

      // Mode filter
      if (modeVal && modeVal !== 'all') {
        events = events.filter((e) => e.mode?.toLowerCase() === modeVal);
      }

      // Locality / Area filter
      if (areaVal && areaVal !== 'all') {
        events = events.filter((e) =>
          e.locality?.toLowerCase().includes(areaVal) ||
          e.venue?.localityId?.toLowerCase().includes(areaVal) ||
          e.venue?.name?.toLowerCase().includes(areaVal) ||
          e.venue?.address?.toLowerCase().includes(areaVal)
        );
      }

      // City filter
      if (cityVal && cityVal !== 'all') {
        events = events.filter((e) =>
          e.venue?.city?.toLowerCase().includes(cityVal) ||
          e.city?.toLowerCase().includes(cityVal) ||
          e.mode === 'online'
        );
      }

      // Price filter
      if (priceVal === 'free') {
        events = events.filter((e) => e.price?.kind === 'free' || e.price?.amountInr === 0 || e.isFree === true);
      }

      // Interest filter
      if (interestVal) {
        events = events.filter((e) =>
          e.interests?.some((i) => i.toLowerCase().includes(interestVal))
        );
      }

      // Sort
      events.sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());

      const total = events.length;
      const paginated = events.slice(skip, skip + parsedLimit);

      return res.status(200).json({
        success: true,
        data: paginated,
        meta: {
          total,
          page: parsedPage,
          limit: parsedLimit,
          totalPages: Math.ceil(total / parsedLimit),
          engine: 'MERN-InMemory-MongoDB-Layer',
        },
      });
    }

    // Live MongoDB Query
    const filter = {};
    if (searchVal) {
      filter.$or = [
        { title: { $regex: searchVal, $options: 'i' } },
        { summary: { $regex: searchVal, $options: 'i' } },
        { description: { $regex: searchVal, $options: 'i' } },
        { locality: { $regex: searchVal, $options: 'i' } },
        { 'venue.name': { $regex: searchVal, $options: 'i' } },
        { interests: { $regex: searchVal, $options: 'i' } },
        { skills: { $regex: searchVal, $options: 'i' } },
      ];
    }

    if (isFormat) {
      filter.$or = [
        { eventType: { $regex: catLower, $options: 'i' } },
        { type: { $regex: catLower, $options: 'i' } },
        { title: { $regex: catLower, $options: 'i' } },
      ];
    } else if (isCommunity) {
      filter.communityId = { $exists: true, $ne: null };
    } else if (isTopic) {
      filter.$or = [
        { interests: { $regex: catLower, $options: 'i' } },
        { skills: { $regex: catLower, $options: 'i' } },
        { title: { $regex: catLower, $options: 'i' } },
        { summary: { $regex: catLower, $options: 'i' } },
      ];
    }

    if (modeVal && modeVal !== 'all') filter.mode = modeVal;
    if (areaVal && areaVal !== 'all') {
      filter.$or = [
        { locality: { $regex: areaVal, $options: 'i' } },
        { 'venue.localityId': { $regex: areaVal, $options: 'i' } },
        { 'venue.name': { $regex: areaVal, $options: 'i' } },
      ];
    }
    if (priceVal === 'free') filter['price.kind'] = 'free';
    if (interestVal) filter.interests = { $regex: interestVal, $options: 'i' };

    const total = await Event.countDocuments(filter);
    const events = await Event.find(filter)
      .sort({ startAt: 1 })
      .skip(skip)
      .limit(parsedLimit)
      .lean();

    return res.status(200).json({
      success: true,
      data: events,
      meta: {
        total,
        page: parsedPage,
        limit: parsedLimit,
        totalPages: Math.ceil(total / parsedLimit),
        engine: 'MERN-Native-MongoDB',
      },
    });
  } catch (error) {
    console.error('Error in getEvents:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function getEventById(req, res) {
  try {
    const { id } = req.params;

    if (isInMemoryFallback) {
      const event = memoryStore.events.get(id);
      if (!event) return res.status(404).json({ success: false, error: 'Event not found' });
      return res.status(200).json({ success: true, data: event });
    }

    const event = await Event.findOne({ id }).lean();
    if (!event) return res.status(404).json({ success: false, error: 'Event not found' });
    return res.status(200).json({ success: true, data: event });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function createEvent(req, res) {
  try {
    const eventData = req.body;
    if (!eventData.title || !eventData.startAt) {
      return res.status(400).json({ success: false, error: 'Title and start time are required' });
    }

    if (!eventData.id) {
      eventData.id = 'evt_' + Math.random().toString(36).substring(2, 11);
    }
    if (!eventData.slug) {
      eventData.slug = eventData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    // Set GeoJSON coordinates if latitude & longitude provided
    if (eventData.venue?.latitude && eventData.venue?.longitude) {
      eventData.location = {
        type: 'Point',
        coordinates: [eventData.venue.longitude, eventData.venue.latitude],
      };
    }

    if (isInMemoryFallback) {
      memoryStore.events.set(eventData.id, eventData);
      realtimeService.broadcast('EVENT_CREATED', eventData);
      return res.status(201).json({ success: true, data: eventData });
    }

    const newEvent = await Event.create(eventData);
    realtimeService.broadcast('EVENT_CREATED', newEvent);
    return res.status(201).json({ success: true, data: newEvent });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function updateEvent(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (isInMemoryFallback) {
      const existing = memoryStore.events.get(id);
      if (!existing) return res.status(404).json({ success: false, error: 'Event not found' });
      const updated = { ...existing, ...updates, updatedAt: new Date().toISOString() };
      memoryStore.events.set(id, updated);
      realtimeService.broadcast('EVENT_UPDATED', updated);
      return res.status(200).json({ success: true, data: updated });
    }

    const updated = await Event.findOneAndUpdate({ id }, { $set: updates }, { new: true }).lean();
    if (!updated) return res.status(404).json({ success: false, error: 'Event not found' });
    realtimeService.broadcast('EVENT_UPDATED', updated);
    return res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function deleteEvent(req, res) {
  try {
    const { id } = req.params;

    if (isInMemoryFallback) {
      const deleted = memoryStore.events.delete(id);
      if (!deleted) return res.status(404).json({ success: false, error: 'Event not found' });
      realtimeService.broadcast('EVENT_DELETED', { id });
      return res.status(200).json({ success: true, message: 'Event deleted' });
    }

    const result = await Event.deleteOne({ id });
    if (result.deletedCount === 0) return res.status(404).json({ success: false, error: 'Event not found' });
    realtimeService.broadcast('EVENT_DELETED', { id });
    return res.status(200).json({ success: true, message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function getNearbyEvents(req, res) {
  try {
    const { lat, lon, radiusKm = 10 } = req.query;
    if (!lat || !lon) {
      return res.status(400).json({ success: false, error: 'Latitude and Longitude are required' });
    }

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);
    const radius = parseFloat(radiusKm);

    if (isInMemoryFallback) {
      const events = Array.from(memoryStore.events.values());
      const nearby = events
        .map((e) => {
          const eLat = e.venue?.latitude || e.location?.coordinates?.[1];
          const eLon = e.venue?.longitude || e.location?.coordinates?.[0];
          if (!eLat || !eLon) return null;
          const dist = calculateDistance(latitude, longitude, eLat, eLon);
          return dist <= radius ? { ...e, distanceKm: Math.round(dist * 10) / 10 } : null;
        })
        .filter(Boolean)
        .sort((a, b) => a.distanceKm - b.distanceKm);

      return res.status(200).json({ success: true, data: nearby, count: nearby.length });
    }

    // Geospatial search via MongoDB $nearSphere (radius in meters)
    const meters = radius * 1000;
    const events = await Event.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: meters,
        },
      },
    }).lean();

    return res.status(200).json({ success: true, data: events, count: events.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function autoApproveDraft(req, res) {
  try {
    const draft = req.body;
    const result = await autonomousReviewAgent.reviewAndApprove(draft, req.user);
    if (!result.approved) {
      return res.status(422).json(result);
    }
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
