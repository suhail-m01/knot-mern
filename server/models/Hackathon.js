import mongoose from 'mongoose';

const HackathonSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, index: 'text' },
    tagline: { type: String, default: '' },
    description: { type: String, default: '' },
    sourcePlatform: { type: String, required: true, index: true },
    sourceUrl: { type: String, required: true },
    startsAt: { type: Date, required: true, index: true },
    endsAt: { type: Date, required: true },
    registrationDeadline: { type: Date, default: null },
    mode: { type: String, enum: ['in_person', 'online', 'hybrid'], default: 'in_person' },
    city: { type: String, default: 'Bengaluru', index: true },
    venueName: { type: String, default: '' },
    prizePool: { type: String, default: 'TBD' },
    prizeInr: { type: Number, default: 0 },
    teamSizeMin: { type: Number, default: 1 },
    teamSizeMax: { type: Number, default: 4 },
    status: { type: String, enum: ['upcoming', 'ongoing', 'ended'], default: 'upcoming' },
    isVerified: { type: Boolean, default: true },
    categories: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

export const Hackathon = mongoose.models.Hackathon || mongoose.model('Hackathon', HackathonSchema);
