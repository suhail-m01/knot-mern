import { User } from '../models/User.js';
import { isInMemoryFallback, memoryStore } from '../config/db.js';

export async function register(req, res) {
  try {
    const { name, email, password, ageBand = '18_plus', role = 'participant', areaLocalityId = 'koramangala', interests = [] } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: 'Name, email and password are required' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (isInMemoryFallback) {
      const exists = Array.from(memoryStore.users.values()).some((u) => u.email === normalizedEmail);
      if (exists) {
        return res.status(400).json({ success: false, error: 'A user with this email already exists' });
      }

      const user = {
        id: 'usr_' + Math.random().toString(36).substring(2, 11),
        name,
        email: normalizedEmail,
        passwordHash: password, // In production client-side PBKDF2 hashed
        role,
        ageBand,
        areaLocalityId,
        radiusKm: 15,
        interests,
        skills: [],
        learningGoals: [],
        experienceLevel: 'Intermediate',
        education: '',
        availability: 'Weekends',
        workspaceAdmin: role === 'admin',
        accountStatus: 'active',
        personalizationConsent: false,
        returnAnalyticsConsent: false,
        learnedInterests: [],
        createdAt: new Date().toISOString(),
      };

      memoryStore.users.set(user.id, user);
      const { passwordHash: _, ...safeUser } = user;
      return res.status(201).json({ success: true, user: safeUser, token: 'mern_token_' + user.id });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'A user with this email already exists' });
    }

    const newUser = await User.create({
      id: 'usr_' + Math.random().toString(36).substring(2, 11),
      name,
      email: normalizedEmail,
      passwordHash: password,
      role,
      ageBand,
      areaLocalityId,
      radiusKm: 15,
      interests,
      workspaceAdmin: role === 'admin',
    });

    const safeUser = newUser.toObject();
    delete safeUser.passwordHash;
    delete safeUser.salt;

    return res.status(201).json({ success: true, user: safeUser, token: 'mern_token_' + newUser.id });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (isInMemoryFallback) {
      const user = Array.from(memoryStore.users.values()).find((u) => u.email === normalizedEmail);
      if (!user) {
        return res.status(401).json({ success: false, error: 'Invalid email or password' });
      }
      // Check password (supports direct match or hashed)
      if (user.passwordHash !== password && !user.passwordHash.includes(password)) {
        return res.status(401).json({ success: false, error: 'Invalid email or password' });
      }

      const { passwordHash: _, ...safeUser } = user;
      return res.status(200).json({ success: true, user: safeUser, token: 'mern_token_' + user.id });
    }

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    if (user.passwordHash !== password && !user.passwordHash.includes(password)) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    const safeUser = user.toObject();
    delete safeUser.passwordHash;
    delete safeUser.salt;

    return res.status(200).json({ success: true, user: safeUser, token: 'mern_token_' + user.id });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function getMe(req, res) {
  try {
    let userId = req.headers['x-user-id'] || req.query.userId;
    if (!userId && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith('Bearer mern_token_')) {
        userId = authHeader.replace('Bearer mern_token_', '').trim();
      } else if (authHeader.startsWith('Bearer ')) {
        userId = authHeader.replace('Bearer ', '').trim();
      }
    }
    if (!userId) {
      return res.status(200).json({ success: true, user: null });
    }

    if (isInMemoryFallback) {
      const user = memoryStore.users.get(userId);
      if (!user) return res.status(404).json({ success: false, error: 'User not found' });
      const { passwordHash: _, ...safeUser } = user;
      return res.status(200).json({ success: true, user: safeUser });
    }

    const user = await User.findOne({ id: userId }).lean();
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    delete user.passwordHash;
    delete user.salt;
    return res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function updateProfile(req, res) {
  try {
    const { id } = req.params;
    const patch = req.body;

    if (isInMemoryFallback) {
      const existing = memoryStore.users.get(id);
      if (!existing) return res.status(404).json({ success: false, error: 'User not found' });
      const updated = { ...existing, ...patch, updatedAt: new Date().toISOString() };
      memoryStore.users.set(id, updated);
      const { passwordHash: _, ...safeUser } = updated;
      return res.status(200).json({ success: true, user: safeUser });
    }

    const updated = await User.findOneAndUpdate({ id }, { $set: patch }, { new: true }).lean();
    if (!updated) return res.status(404).json({ success: false, error: 'User not found' });
    delete updated.passwordHash;
    delete updated.salt;
    return res.status(200).json({ success: true, user: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
