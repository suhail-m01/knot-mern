import mongoose from 'mongoose';

const RegistrationSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    eventId: { type: String, required: true, index: true },
    userId: { type: String, required: true, index: true },
    kind: { type: String, enum: ['native', 'external'], default: 'native' },
    status: {
      type: String,
      enum: ['registered', 'waitlisted', 'approved', 'cancelled', 'attended', 'pending'],
      default: 'registered',
      index: true,
    },
    checkInToken: { type: String, index: true },
    checkedInAt: { type: Date, default: null },
    participationType: { type: String, enum: ['solo', 'team'], default: 'solo' },
    teamName: { type: String, default: null },
    teamCode: { type: String, default: null, index: true },
    teamMembers: { type: [Object], default: [] },
    participantDetails: { type: Object, default: {} },
    answers: { type: Object, default: {} },
    selfDeclaredAgeRuleMet: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

// Compound index for finding user registration for a specific event
RegistrationSchema.index({ eventId: 1, userId: 1 });

export const Registration = mongoose.models.Registration || mongoose.model('Registration', RegistrationSchema);
