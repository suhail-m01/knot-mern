import mongoose from 'mongoose';

const CommunitySchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    slug: { type: String, index: true },
    description: { type: String, default: '' },
    category: { type: String, default: 'Technology' },
    locality: { type: String, default: 'koramangala' },
    city: { type: String, default: 'Bengaluru' },
    memberCount: { type: Number, default: 0 },
    verified: { type: Boolean, default: false },
    logoUrl: { type: String, default: '' },
    tags: { type: [String], default: [] },
    platform: { type: String, default: 'discord' },
    platformUrl: { type: String, default: '' },
    discordInvite: { type: String, default: '' },
    sourcePlatform: { type: String, default: 'Discord' },
    activityLevel: { type: String, default: 'High' },
    lastHarvestedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const PostSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    communityId: { type: String, index: true },
    eventId: { type: String, index: true },
    authorId: { type: String, required: true },
    authorName: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    type: { type: String, enum: ['general', 'team_formation', 'announcement', 'qna'], default: 'general' },
    tags: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

export const Community = mongoose.models.Community || mongoose.model('Community', CommunitySchema);
export const CommunityPost = mongoose.models.CommunityPost || mongoose.model('CommunityPost', PostSchema);
