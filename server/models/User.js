import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    salt: { type: String, default: '' },
    role: {
      type: String,
      enum: ['participant', 'organizer', 'admin'],
      default: 'participant',
    },
    ageBand: {
      type: String,
      enum: ['under_13', '13_15', '16_17', '18_plus'],
      default: '18_plus',
    },
    areaLocalityId: { type: String, default: 'koramangala' },
    radiusKm: { type: Number, default: 15 },
    interests: { type: [String], default: [] },
    skills: { type: [String], default: [] },
    learningGoals: { type: [String], default: [] },
    experienceLevel: { type: String, default: 'Intermediate' },
    education: { type: String, default: '' },
    availability: { type: String, default: 'Weekends' },
    workspaceAdmin: { type: Boolean, default: false },
    accountStatus: { type: String, default: 'active' },
    personalizationConsent: { type: Boolean, default: false },
    returnAnalyticsConsent: { type: Boolean, default: false },
    learnedInterests: { type: [String], default: [] },
    guardianEmail: { type: String, default: null },
    teamStatus: { type: String, default: 'Open to teams' },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
