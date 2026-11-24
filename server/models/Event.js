import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    slug: { type: String, index: true },
    title: { type: String, required: true, index: 'text' },
    tagline: { type: String, default: '' },
    summary: { type: String, default: '' },
    description: { type: String, default: '' },
    eventType: {
      type: String,
      enum: ['hackathon', 'workshop', 'meetup', 'conference', 'summit', 'competition', 'webinar', 'community_session', 'other'],
      default: 'meetup',
      index: true,
    },
    type: {
      type: String,
      default: 'meetup',
    },
    organizerId: { type: String, default: null },
    organizerName: { type: String, default: 'Community Organizer' },
    communityId: { type: String, default: 'knot-community' },
    mode: {
      type: String,
      enum: ['in_person', 'online', 'hybrid'],
      default: 'in_person',
      index: true,
    },
    status: {
      type: String,
      enum: ['draft', 'pending_review', 'published', 'changed', 'stale', 'cancelled', 'ended', 'archived'],
      default: 'published',
      index: true,
    },
    visibility: {
      type: String,
      enum: ['public', 'unlisted', 'private'],
      default: 'public',
      index: true,
    },
    startAt: { type: String, required: true, index: true },
    endAt: { type: String, default: null },
    timezone: { type: String, default: 'Asia/Kolkata' },
    registrationOpensAt: { type: String, default: null },
    registrationDeadline: { type: String, default: null },
    submissionDeadline: { type: String, default: null },
    locality: { type: String, default: 'koramangala', index: true },
    venue: {
      id: String,
      name: String,
      address: String,
      localityId: String,
      city: String,
      latitude: Number,
      longitude: Number,
      locationPrecision: String,
      confirmedBy: String,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        default: [77.6245, 12.9352],
      },
    },
    onlineJoinUrl: { type: String, default: null },
    organizer: {
      name: { type: String, default: 'Community Organizer' },
      contactEmail: String,
      verified: { type: Boolean, default: false },
    },
    registration: {
      kind: { type: String, enum: ['native', 'external'], default: 'native' },
      externalUrl: { type: String, default: null },
      capacity: { type: Number, default: null },
      approval: { type: String, default: 'none' },
      waitlistEnabled: { type: Boolean, default: false },
      deadline: { type: String, default: null },
      questions: { type: [Object], default: [] },
    },
    price: {
      kind: { type: String, enum: ['free', 'paid', 'unknown'], default: 'free' },
      amountInr: { type: Number, default: 0 },
      note: String,
    },
    team: {
      mode: { type: String, enum: ['solo', 'team'], default: 'solo' },
      minSize: { type: Number, default: 1 },
      maxSize: { type: Number, default: 1 },
      formationDeadline: { type: String, default: null },
    },
    ageRule: {
      mode: { type: String, default: 'all_ages' },
      minAge: { type: Number, default: null },
      maxAge: { type: Number, default: null },
      ruleText: { type: String, default: 'All ages welcome' },
      guardianConsentRequired: { type: String, default: 'not_stated' },
      guardianPresentRequired: { type: String, default: 'not_stated' },
      source: { type: String, default: 'organizer_set' },
      confidence: { type: String, default: 'high' },
    },
    interests: { type: [String], default: [], index: true },
    skills: { type: [String], default: [] },
    learningOutcomes: { type: [String], default: [] },
    eligibilityText: { type: String, default: 'Open to everyone' },
    eligibilityKnown: { type: Boolean, default: true },
    experienceLevel: { type: String, default: 'all' },
    prizes: { type: [String], default: [] },
    isSample: { type: Boolean, default: false },
    source: { type: String, default: 'knot-native' },
    firstDiscoveredAt: { type: String, default: () => new Date().toISOString() },
    lastCheckedAt: { type: String, default: () => new Date().toISOString() },
    listings: { type: [Object], default: [] },
    revisions: { type: [Object], default: [] },
  },
  {
    timestamps: true,
  }
);

EventSchema.index({ location: '2dsphere' });
EventSchema.index({ startAt: 1, locality: 1, eventType: 1 });

export const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);
