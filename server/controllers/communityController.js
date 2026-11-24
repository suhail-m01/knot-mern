import { Community, CommunityPost } from '../models/Community.js';
import { isInMemoryFallback, memoryStore } from '../config/db.js';
import { communityHarvesterAgent } from '../agents/CommunityHarvesterAgent.js';
import { dataConsolidationAgent } from '../agents/DataConsolidationAgent.js';

export const DEFAULT_COMMUNITIES = [
  {
    id: 'discord-gdg-india',
    name: 'Google Developer Community',
    slug: 'google-dev-discord',
    description: 'Official Google Developer Community for engineers, researchers, and students. Daily discussions on Gemini API, Cloud architectures, Flutter, and hackathon team matching.',
    category: 'Technology & AI',
    locality: 'koramangala',
    city: 'Bengaluru',
    memberCount: 48500,
    verified: true,
    platform: 'discord',
    platformUrl: 'https://gdg.community.dev',
    discordInvite: 'https://discord.gg/reactiflux',
    sourcePlatform: 'Discord',
    activityLevel: 'Very High (2,500+ daily online)',
    tags: ['Google', 'AI/ML', 'Cloud', 'Android', 'Hackathons'],
  },
  {
    id: 'discord-react-india',
    name: 'Reactiflux & Fullstack Guild',
    slug: 'reactiflux-discord',
    description: 'Official Reactiflux community with over 200,000 developers. Hub for React, Next.js, React Native, and TypeScript developers. Regular lightning talks, code reviews, and remote job opportunities.',
    category: 'Frontend & Web',
    locality: 'indiranagar',
    city: 'Bengaluru',
    memberCount: 215000,
    verified: true,
    platform: 'discord',
    platformUrl: 'https://discord.gg/reactiflux',
    discordInvite: 'https://discord.gg/reactiflux',
    sourcePlatform: 'Discord',
    activityLevel: 'Massive (15,000+ daily online)',
    tags: ['React', 'TypeScript', 'Next.js', 'Frontend'],
  },
  {
    id: 'discord-web3-buidl',
    name: 'ETHGlobal Community',
    slug: 'ethglobal-discord',
    description: 'Premier global community for Ethereum builders, hackathon participants, and smart contract engineers. Organizers of international Web3 buildathons.',
    category: 'Web3 & Cryptography',
    locality: 'hsr_layout',
    city: 'Bengaluru',
    memberCount: 85000,
    verified: true,
    platform: 'discord',
    platformUrl: 'https://discord.gg/ethglobal',
    discordInvite: 'https://discord.gg/ethglobal',
    sourcePlatform: 'Discord',
    activityLevel: 'Active (5,000+ daily builders)',
    tags: ['Web3', 'Ethereum', 'Solidity', 'Rust', 'DeFi'],
  },
  {
    id: 'discord-foss-united',
    name: 'Next.js & Modern Web Community',
    slug: 'nextjs-discord',
    description: 'Official Next.js and React fullstack development community. Real-time support, server components architecture, open-source show & tell.',
    category: 'Open Source',
    locality: 'koramangala',
    city: 'Bengaluru',
    memberCount: 140000,
    verified: true,
    platform: 'discord',
    platformUrl: 'https://discord.gg/nextjs',
    discordInvite: 'https://discord.gg/nextjs',
    sourcePlatform: 'Discord',
    activityLevel: 'Very High (8,000+ online)',
    tags: ['Next.js', 'React', 'Open Source', 'Vercel', 'Node.js'],
  },
  {
    id: 'discord-bangpypers',
    name: 'Python Developers Community',
    slug: 'python-discord',
    description: 'The official Python community. Everything from Python fundamentals to LLM agents, data engineering, FastAPI, and async IO.',
    category: 'Technology & AI',
    locality: 'indiranagar',
    city: 'Bengaluru',
    memberCount: 350000,
    verified: true,
    platform: 'discord',
    platformUrl: 'https://discord.gg/python',
    discordInvite: 'https://discord.gg/python',
    sourcePlatform: 'Discord',
    activityLevel: 'High (20,000+ online)',
    tags: ['Python', 'AI/ML', 'FastAPI', 'Data Science', 'Agents'],
  },
  {
    id: 'unstop-presidency-innovation',
    name: 'Presidency University Innovation Council',
    slug: 'presidency-innovation-club',
    description: 'Student engineering and startup chapter at Presidency University, Yelahanka. Hosts national-level hackathons, coding sprints, and venture pitching.',
    category: 'Campus & Clubs',
    locality: 'yelahanka',
    city: 'Bengaluru',
    memberCount: 4200,
    verified: true,
    platform: 'unstop',
    platformUrl: 'https://unstop.com',
    sourcePlatform: 'Unstop',
    activityLevel: 'Active Builder Hub',
    tags: ['Presidency', 'Hackathons', 'Student Guild', 'Innovation'],
  },
  {
    id: 'unstop-dsce-dev-circle',
    name: 'DSCE Developer Circle (Dayananda Sagar)',
    slug: 'dsce-dev-circle',
    description: 'Premier student-led technical community of Dayananda Sagar College of Engineering. Focus on Full-stack development, ML competitions, and ICPC mentoring.',
    category: 'Campus & Clubs',
    locality: 'kumaraswamy-layout',
    city: 'Bengaluru',
    memberCount: 5600,
    verified: true,
    platform: 'unstop',
    platformUrl: 'https://unstop.com',
    sourcePlatform: 'Unstop',
    activityLevel: 'Active',
    tags: ['DSCE', 'Competitive Coding', 'Web Development', 'AI'],
  },
  {
    id: 'unstop-rvce-coding-society',
    name: 'RVCE Coding & Algorithm Society',
    slug: 'rvce-coding-society',
    description: 'Competitive programming and software systems club at RV College of Engineering. Weekly contests, open source challenges, and hackathon teams.',
    category: 'Campus & Clubs',
    locality: 'mysore-road',
    city: 'Bengaluru',
    memberCount: 6100,
    verified: true,
    platform: 'unstop',
    platformUrl: 'https://unstop.com',
    sourcePlatform: 'Unstop',
    activityLevel: 'High Activity',
    tags: ['RVCE', 'Algorithms', 'MERN', 'AI Agents'],
  },
  {
    id: 'unstop-pes-builders',
    name: 'PES Hackers & Builders League',
    slug: 'pes-hackers-league',
    description: 'Hackathon builders and tech creators at PES University (Ring Road & Electronic City campuses). High placement in national and global hackathons.',
    category: 'Campus & Clubs',
    locality: 'electronic-city',
    city: 'Bengaluru',
    memberCount: 7800,
    verified: true,
    platform: 'unstop',
    platformUrl: 'https://unstop.com',
    sourcePlatform: 'Unstop',
    activityLevel: 'Very High',
    tags: ['PES', 'Hackathons', 'Startups', 'Systems'],
  },
  {
    id: 'meetup-bangalorejs',
    name: 'BangaloreJS (JavaScript & Node Guild)',
    slug: 'bangalorejs-meetup',
    description: 'One of the oldest and largest JavaScript user groups in India. Monthly offline meetups diving deep into frontend frameworks, Node.js internals, and V8 engine optimizations.',
    category: 'Frontend & Web',
    locality: 'hsr_layout',
    city: 'Bengaluru',
    memberCount: 11200,
    verified: true,
    platform: 'meetup',
    platformUrl: 'https://www.meetup.com/bangalorejs/',
    sourcePlatform: 'Meetup',
    activityLevel: 'Monthly In-Person Meetups',
    tags: ['JavaScript', 'TypeScript', 'Node.js', 'React 19'],
  },
  {
    id: 'meetup-pydata-blr',
    name: 'PyData Bangalore',
    slug: 'pydata-bangalore-meetup',
    description: 'Bringing together data scientists, ML engineers, and researchers using open source data tools like pandas, PyTorch, ClickHouse, and LangChain.',
    category: 'Data & Cloud',
    locality: 'hsr_layout',
    city: 'Bengaluru',
    memberCount: 14500,
    verified: true,
    platform: 'meetup',
    platformUrl: 'https://www.meetup.com/pydata-bangalore/',
    sourcePlatform: 'Meetup',
    activityLevel: 'Active Sprint Hub',
    tags: ['Data Science', 'PyData', 'Machine Learning', 'Big Data', 'Python'],
  },
  {
    id: 'meetup-cloud-native-blr',
    name: 'Cloud Native & Kubernetes Bangalore',
    slug: 'cloud-native-bangalore',
    description: 'CNCF official Bangalore chapter. Hands-on DevOps, container orchestration, Kubernetes operators, observability, and serverless architectures.',
    category: 'Data & Cloud',
    locality: 'whitefield',
    city: 'Bengaluru',
    memberCount: 12900,
    verified: true,
    platform: 'meetup',
    platformUrl: 'https://www.meetup.com/cloud-native-bangalore/',
    sourcePlatform: 'Meetup',
    activityLevel: 'Bi-weekly Sessions',
    tags: ['Kubernetes', 'DevOps', 'Docker', 'Cloud', 'Golang'],
  },
  {
    id: 'luma-genai-collective',
    name: 'Bengaluru GenAI Collective',
    slug: 'bengaluru-genai-collective',
    description: 'Curated circle of LLM engineers, foundational model researchers, and generative AI startup founders in Koramangala. Hosts invite-only builder demos and hacknights.',
    category: 'Technology & AI',
    locality: 'koramangala',
    city: 'Bengaluru',
    memberCount: 6800,
    verified: true,
    platform: 'luma',
    platformUrl: 'https://lu.ma',
    sourcePlatform: 'Luma',
    activityLevel: 'Weekly Demo Days',
    tags: ['GenAI', 'LLMs', 'Prompt Engineering', 'Startups', 'Agents'],
  },
  {
    id: 'luma-design-guild-blr',
    name: 'Bangalore Design Community & Guild',
    slug: 'bangalore-design-guild',
    description: 'Designers, design engineers, and product leaders crafting Figma design systems, micro-interactions, and accessibility across top Indian tech companies.',
    category: 'Design & UX',
    locality: 'koramangala',
    city: 'Bengaluru',
    memberCount: 5200,
    verified: true,
    platform: 'luma',
    platformUrl: 'https://lu.ma',
    sourcePlatform: 'Luma',
    activityLevel: 'Monthly Design Sprints',
    tags: ['Design', 'UI/UX', 'Product', 'Figma'],
  },
];

export async function getCommunities(req, res) {
  try {
    const { q, search, category, area, locality, city, tag, platform } = req.query;
    const searchVal = (q || search || '').trim().toLowerCase();
    const catVal = (category || '').trim().toLowerCase();
    const areaVal = (area || locality || '').trim().toLowerCase();
    const cityVal = (city || '').trim().toLowerCase();
    const tagVal = (tag || '').trim().toLowerCase();
    const platformVal = (platform || '').trim().toLowerCase();

    if (isInMemoryFallback) {
      let communities = Array.from(memoryStore.communities.values());
      if (communities.length === 0) {
        DEFAULT_COMMUNITIES.forEach((c) => memoryStore.communities.set(c.id, c));
        communities = Array.from(memoryStore.communities.values());
      }

      if (platformVal && platformVal !== 'all') {
        communities = communities.filter((c) =>
          c.platform?.toLowerCase() === platformVal ||
          c.sourcePlatform?.toLowerCase() === platformVal
        );
      }

      if (searchVal) {
        communities = communities.filter((c) =>
          c.name?.toLowerCase().includes(searchVal) ||
          c.description?.toLowerCase().includes(searchVal) ||
          c.category?.toLowerCase().includes(searchVal) ||
          c.tags?.some((t) => t.toLowerCase().includes(searchVal))
        );
      }

      if (catVal && catVal !== 'all') {
        communities = communities.filter((c) =>
          c.category?.toLowerCase().includes(catVal) ||
          c.tags?.some((t) => t.toLowerCase().includes(catVal)) ||
          c.name?.toLowerCase().includes(catVal)
        );
      }

      if (areaVal && areaVal !== 'all') {
        communities = communities.filter((c) =>
          c.locality?.toLowerCase().includes(areaVal) ||
          c.city?.toLowerCase().includes(areaVal)
        );
      }

      if (cityVal && cityVal !== 'all') {
        communities = communities.filter((c) =>
          c.city?.toLowerCase().includes(cityVal)
        );
      }

      if (tagVal) {
        communities = communities.filter((c) =>
          c.tags?.some((t) => t.toLowerCase().includes(tagVal))
        );
      }

      return res.status(200).json({ success: true, data: communities, count: communities.length });
    }

    const filter = {};
    if (searchVal) {
      filter.$or = [
        { name: { $regex: searchVal, $options: 'i' } },
        { description: { $regex: searchVal, $options: 'i' } },
        { category: { $regex: searchVal, $options: 'i' } },
        { tags: { $regex: searchVal, $options: 'i' } },
      ];
    }
    if (catVal && catVal !== 'all') {
      filter.$or = [
        { category: { $regex: catVal, $options: 'i' } },
        { tags: { $regex: catVal, $options: 'i' } },
        { name: { $regex: catVal, $options: 'i' } },
      ];
    }
    if (areaVal && areaVal !== 'all') {
      filter.$or = [
        { locality: { $regex: areaVal, $options: 'i' } },
        { city: { $regex: areaVal, $options: 'i' } },
      ];
    }
    if (cityVal && cityVal !== 'all') {
      filter.city = { $regex: cityVal, $options: 'i' };
    }
    if (tagVal) {
      filter.tags = { $regex: tagVal, $options: 'i' };
    }

    let communities = await Community.find(filter).sort({ memberCount: -1 }).lean();
    if (communities.length === 0 && Object.keys(filter).length === 0) {
      await Community.insertMany(DEFAULT_COMMUNITIES).catch(() => {});
      communities = await Community.find({}).sort({ memberCount: -1 }).lean();
    }

    return res.status(200).json({ success: true, data: communities, count: communities.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function getCommunityById(req, res) {
  try {
    const { id } = req.params;

    if (isInMemoryFallback) {
      const community = memoryStore.communities.get(id);
      if (!community) return res.status(404).json({ success: false, error: 'Community not found' });
      return res.status(200).json({ success: true, data: community });
    }

    const community = await Community.findOne({ id }).lean();
    if (!community) return res.status(404).json({ success: false, error: 'Community not found' });
    return res.status(200).json({ success: true, data: community });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function getPosts(req, res) {
  try {
    const { communityId, eventId } = req.query;

    if (isInMemoryFallback) {
      let posts = Array.from(memoryStore.communityPosts.values());
      if (communityId) posts = posts.filter((p) => p.communityId === communityId);
      if (eventId) posts = posts.filter((p) => p.eventId === eventId);
      return res.status(200).json({ success: true, data: posts, count: posts.length });
    }

    const filter = {};
    if (communityId) filter.communityId = communityId;
    if (eventId) filter.eventId = eventId;

    const posts = await CommunityPost.find(filter).sort({ createdAt: -1 }).lean();
    return res.status(200).json({ success: true, data: posts, count: posts.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function createPost(req, res) {
  try {
    const { communityId, eventId, authorId, authorName, title, content, type = 'general', tags = [] } = req.body;

    if (!authorId || !title || !content) {
      return res.status(400).json({ success: false, error: 'Author, title and content are required' });
    }

    const post = {
      id: 'post_' + Math.random().toString(36).substring(2, 11),
      communityId: communityId || null,
      eventId: eventId || null,
      authorId,
      authorName: authorName || 'Knot Member',
      title,
      content,
      type,
      tags,
      createdAt: new Date().toISOString(),
    };

    if (isInMemoryFallback) {
      memoryStore.communityPosts.set(post.id, post);
      return res.status(201).json({ success: true, data: post });
    }

    const created = await CommunityPost.create(post);
    return res.status(201).json({ success: true, data: created });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
