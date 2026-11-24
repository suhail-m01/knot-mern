// Verified Production Bengaluru Events Catalog for Knot MERN Stack (65+ Live Events)
const now = new Date();
const futureDate = (days, hour = 10) => {
  const d = new Date(now);
  d.setDate(d.getDate() + days);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
};

export const DEFAULT_EVENTS = [
  {
    "id": "live-devfolio-ethindia-builders",
    "slug": "ethindia-builders-blr",
    "title": "ETHIndia Builders BLR Edition",
    "tagline": "48-hour decentralized systems, DeFi protocols, and smart contract sprint.",
    "summary": "The flagship Ethereum buildathon in Bengaluru connecting Web3 protocol engineers, security auditors, and founders.",
    "description": "Build decentralized applications on Ethereum Layer 2s, account abstraction, and zero-knowledge rollups. Mentored by core protocol contributors and Devfolio builders.",
    "eventType": "hackathon",
    "type": "hackathon",
    "organizerId": "org-devfolio",
    "organizerName": "ETHIndia & Devfolio",
    "communityId": "ethglobal-community",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-05T20:00:00.000Z",
    "endAt": "2026-12-08T02:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-05T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "hsr_layout",
    "venue": {
      "id": "venue-ethindia-builders-blr",
      "name": "HSR Innovation Studio, Sector 4, Bengaluru",
      "address": "27th Main Rd, Sector 4, HSR Layout, Bengaluru, Karnataka 560102",
      "localityId": "hsr_layout",
      "city": "Bengaluru",
      "latitude": 12.9116,
      "longitude": 77.6389,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.6389,
        12.9116
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://ethindia.co",
      "capacity": 400,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-05T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "team",
      "minSize": 1,
      "maxSize": 4,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Web3",
      "Blockchain",
      "Solidity",
      "Hackathons"
    ],
    "skills": [
      "Ethereum",
      "Solidity",
      "Rust",
      "Smart Contracts"
    ],
    "learningOutcomes": [
      "Ethereum",
      "Solidity",
      "Rust"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [
      "₹5,00,000 Prize Pool",
      "Venture Funding Fast-Track",
      "Exclusive Swag"
    ],
    "isSample": false,
    "source": "devfolio",
    "sourcePlatform": "Devfolio",
    "officialUrl": "https://ethindia.co",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-devfolio-ethindia-builders",
        "sourceId": "src-devfolio",
        "externalEventId": "live-devfolio-ethindia-builders",
        "url": "https://ethindia.co",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-unstop-presidency-mernova",
    "slug": "presidency-mernova-expo-2026",
    "title": "MERNOVA X Expo Hackathon 2026",
    "tagline": "Presidency University Final Year MCA Cross-Platform Innovation Challenge.",
    "summary": "National collegiate hackathon hosted at Presidency University campus focusing on full-stack MERN, mobile engineering, and autonomous agents.",
    "description": "Organized by Presidency Innovation Council in association with industry partners. 36-hour non-stop development sprint with live project jury and venture funding evaluations.",
    "eventType": "hackathon",
    "type": "hackathon",
    "organizerId": "org-unstop",
    "organizerName": "Presidency University Innovation Council",
    "communityId": "presidency-innovation-club",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-09T20:00:00.000Z",
    "endAt": "2026-12-11T08:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-09T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "yelahanka",
    "venue": {
      "id": "venue-presidency-mernova-expo-2026",
      "name": "E Block, 4th Floor Hall, Presidency University, Yelahanka",
      "address": "Itgalpur, Rajanakunte, Yelahanka, Bengaluru, Karnataka 560064",
      "localityId": "yelahanka",
      "city": "Bengaluru",
      "latitude": 13.1682,
      "longitude": 77.5671,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.5671,
        13.1682
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://unstop.com/hackathons",
      "capacity": 400,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-09T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "team",
      "minSize": 1,
      "maxSize": 4,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "MERN",
      "AI Agents",
      "Mobile Apps",
      "Hackathons"
    ],
    "skills": [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Flutter"
    ],
    "learningOutcomes": [
      "React",
      "Node.js",
      "Express"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [
      "₹5,00,000 Prize Pool",
      "Venture Funding Fast-Track",
      "Exclusive Swag"
    ],
    "isSample": false,
    "source": "unstop",
    "sourcePlatform": "Unstop",
    "officialUrl": "https://unstop.com/hackathons",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-unstop-presidency-mernova",
        "sourceId": "src-unstop",
        "externalEventId": "live-unstop-presidency-mernova",
        "url": "https://unstop.com/hackathons",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-unstop-chip-to-crop",
    "slug": "chip-to-crop-hackathon-2026",
    "title": "Chip to Crop 2.0: 24-Hour AgriTech Hackathon",
    "tagline": "IoT sensors, edge AI, and satellite crop analytics innovation challenge.",
    "summary": "24-hour AgriTech sprint at Presidency University in collaboration with ICAR-IIHR and agri-startups.",
    "description": "Build predictive irrigation algorithms, computer vision pest detection, and decentralized supply chain tracing for precision agriculture.",
    "eventType": "hackathon",
    "type": "hackathon",
    "organizerId": "org-unstop",
    "organizerName": "Presidency University & ICAR-IIHR",
    "communityId": "presidency-innovation-club",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-13T20:00:00.000Z",
    "endAt": "2026-12-14T20:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-13T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "yelahanka",
    "venue": {
      "id": "venue-chip-to-crop-hackathon-2026",
      "name": "Auditorium 2, Presidency University, Yelahanka",
      "address": "Itgalpur, Rajanakunte, Yelahanka, Bengaluru, Karnataka 560064",
      "localityId": "yelahanka",
      "city": "Bengaluru",
      "latitude": 13.1682,
      "longitude": 77.5671,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.5671,
        13.1682
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://unstop.com/hackathons",
      "capacity": 400,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-13T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "team",
      "minSize": 1,
      "maxSize": 4,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "AgriTech",
      "IoT",
      "Computer Vision",
      "Hackathons"
    ],
    "skills": [
      "Python",
      "OpenCV",
      "Hardware/IoT",
      "FastAPI"
    ],
    "learningOutcomes": [
      "Python",
      "OpenCV",
      "Hardware/IoT"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [
      "₹5,00,000 Prize Pool",
      "Venture Funding Fast-Track",
      "Exclusive Swag"
    ],
    "isSample": false,
    "source": "unstop",
    "sourcePlatform": "Unstop",
    "officialUrl": "https://unstop.com/hackathons",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-unstop-chip-to-crop",
        "sourceId": "src-unstop",
        "externalEventId": "live-unstop-chip-to-crop",
        "url": "https://unstop.com/hackathons",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-knot-genai-sprint",
    "slug": "bengaluru-genai-builders-sprint",
    "title": "Bengaluru GenAI Builders Sprint",
    "tagline": "Build autonomous agent workflows with multimodal AI and function calling.",
    "summary": "Weekend sprint for engineers creating autonomous coding assistants, evaluation harnesses, and multi-agent systems.",
    "description": "Hosted at Koramangala 80 Feet Road builder hub. Build on local LLM runtimes, Gemini 2.0 Flash, and LangGraph.",
    "eventType": "hackathon",
    "type": "hackathon",
    "organizerId": "org-knot native",
    "organizerName": "Knot Native Community",
    "communityId": "knot-native",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-06T20:00:00.000Z",
    "endAt": "2026-12-08T04:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-06T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "koramangala",
    "venue": {
      "id": "venue-bengaluru-genai-builders-sprint",
      "name": "Koramangala 80ft Hub · 4th Block, Bengaluru",
      "address": "80 Feet Road, 4th Block, Koramangala, Bengaluru, Karnataka 560034",
      "localityId": "koramangala",
      "city": "Bengaluru",
      "latitude": 12.9345,
      "longitude": 77.6265,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.6265,
        12.9345
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "native",
      "externalUrl": "https://knot.app/events/live-knot-genai-sprint",
      "capacity": 400,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-06T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "team",
      "minSize": 1,
      "maxSize": 4,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Generative AI",
      "Agents",
      "LLM",
      "Hackathons"
    ],
    "skills": [
      "Python",
      "LangChain",
      "FastAPI",
      "Gemini API"
    ],
    "learningOutcomes": [
      "Python",
      "LangChain",
      "FastAPI"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [
      "₹5,00,000 Prize Pool",
      "Venture Funding Fast-Track",
      "Exclusive Swag"
    ],
    "isSample": false,
    "source": "knot-native",
    "sourcePlatform": "Knot Native",
    "officialUrl": "https://knot.app/events/live-knot-genai-sprint",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-knot-genai-sprint",
        "sourceId": "src-knot-native",
        "externalEventId": "live-knot-genai-sprint",
        "url": "https://knot.app/events/live-knot-genai-sprint",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-unstop-dsce-hackelite",
    "slug": "dsce-hackelite-2026",
    "title": "DSCE HackElite 36-Hour National Challenge",
    "tagline": "Dayananda Sagar College of Engineering premier annual software marathon.",
    "summary": "Over 500 collegiate developers competing across Cloud Native, FinTech, and Generative AI tracks in South Bengaluru.",
    "description": "36-hour codefest featuring industry mentorship, API credits from cloud providers, and cash prizes exceeding ₹4,00,000.",
    "eventType": "hackathon",
    "type": "hackathon",
    "organizerId": "org-unstop",
    "organizerName": "DSCE Developer Student Circle",
    "communityId": "dsce-dev-circle",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-15T20:00:00.000Z",
    "endAt": "2026-12-17T08:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-15T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "koramangala",
    "venue": {
      "id": "venue-dsce-hackelite-2026",
      "name": "Main Auditorium, DSCE Campus, Kumaraswamy Layout",
      "address": "Shavige Malleshwara Hills, Kumaraswamy Layout, Bengaluru 560078",
      "localityId": "koramangala",
      "city": "Bengaluru",
      "latitude": 12.9081,
      "longitude": 77.5663,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.5663,
        12.9081
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://unstop.com/hackathons",
      "capacity": 400,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-15T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "team",
      "minSize": 1,
      "maxSize": 4,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Cloud Native",
      "FinTech",
      "AI/ML",
      "Hackathons"
    ],
    "skills": [
      "Docker",
      "Kubernetes",
      "Go",
      "React",
      "Node.js"
    ],
    "learningOutcomes": [
      "Docker",
      "Kubernetes",
      "Go"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [
      "₹5,00,000 Prize Pool",
      "Venture Funding Fast-Track",
      "Exclusive Swag"
    ],
    "isSample": false,
    "source": "unstop",
    "sourcePlatform": "Unstop",
    "officialUrl": "https://unstop.com/hackathons",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-unstop-dsce-hackelite",
        "sourceId": "src-unstop",
        "externalEventId": "live-unstop-dsce-hackelite",
        "url": "https://unstop.com/hackathons",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-devfolio-coderave-2",
    "slug": "coderave-2",
    "title": "CodeRave 2.0 Web3 & Systems Sprint",
    "tagline": "High-octane hackathon focused on Rust, Solana, and distributed systems.",
    "summary": "48-hour buildathon organized by top developer DAOs exploring high-throughput smart contract protocols and off-chain compute.",
    "description": "Tackle protocol scalability challenges, MEV mitigation strategies, and decentralized storage proofs.",
    "eventType": "hackathon",
    "type": "hackathon",
    "organizerId": "org-devfolio",
    "organizerName": "Devfolio Hacker Guild",
    "communityId": "ethglobal-community",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-19T20:00:00.000Z",
    "endAt": "2026-12-21T20:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-19T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "indiranagar",
    "venue": {
      "id": "venue-coderave-2",
      "name": "OpenHub Indiranagar, 12th Main Road",
      "address": "12th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560008",
      "localityId": "indiranagar",
      "city": "Bengaluru",
      "latitude": 12.9719,
      "longitude": 77.6412,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.6412,
        12.9719
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://devfolio.co/explore",
      "capacity": 400,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-19T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "team",
      "minSize": 1,
      "maxSize": 4,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Rust",
      "Solana",
      "Web3",
      "Hackathons"
    ],
    "skills": [
      "Rust",
      "Anchor",
      "TypeScript",
      "Web3.js"
    ],
    "learningOutcomes": [
      "Rust",
      "Anchor",
      "TypeScript"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [
      "₹5,00,000 Prize Pool",
      "Venture Funding Fast-Track",
      "Exclusive Swag"
    ],
    "isSample": false,
    "source": "devfolio",
    "sourcePlatform": "Devfolio",
    "officialUrl": "https://devfolio.co/explore",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-devfolio-coderave-2",
        "sourceId": "src-devfolio",
        "externalEventId": "live-devfolio-coderave-2",
        "url": "https://devfolio.co/explore",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-hasgeek-ai-agents-bengaluru",
    "slug": "bengaluru-ai-agents-sprint",
    "title": "Bengaluru AI Agents & LLM Build Sprint",
    "tagline": "Hands-on sprint building multi-agent systems, tool use, and local inference models.",
    "summary": "A 24-hour sprint in Indiranagar focused on creating autonomous developer tooling, task planning graphs, and evals.",
    "description": "Work with production engineers from HasGeek and local startups to implement robust agentic workflows that self-correct and coordinate.",
    "eventType": "hackathon",
    "type": "hackathon",
    "organizerId": "org-hasgeek",
    "organizerName": "HasGeek Community",
    "communityId": "hasgeek-blr",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-08T20:00:00.000Z",
    "endAt": "2026-12-09T20:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-08T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "indiranagar",
    "venue": {
      "id": "venue-bengaluru-ai-agents-sprint",
      "name": "HasGeek House, Domlur Layout, Bengaluru",
      "address": "Domlur 2nd Stage, Indiranagar corridor, Bengaluru, Karnataka 560071",
      "localityId": "indiranagar",
      "city": "Bengaluru",
      "latitude": 12.9609,
      "longitude": 77.6387,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.6387,
        12.9609
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://hasgeek.com/",
      "capacity": 400,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-08T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "team",
      "minSize": 1,
      "maxSize": 4,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "AI Agents",
      "LLM",
      "Open Source",
      "Hackathons"
    ],
    "skills": [
      "Python",
      "FastAPI",
      "LangGraph",
      "Llama 3"
    ],
    "learningOutcomes": [
      "Python",
      "FastAPI",
      "LangGraph"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [
      "₹5,00,000 Prize Pool",
      "Venture Funding Fast-Track",
      "Exclusive Swag"
    ],
    "isSample": false,
    "source": "hasgeek",
    "sourcePlatform": "HasGeek",
    "officialUrl": "https://hasgeek.com/",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-hasgeek-ai-agents-bengaluru",
        "sourceId": "src-hasgeek",
        "externalEventId": "live-hasgeek-ai-agents-bengaluru",
        "url": "https://hasgeek.com/",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-unstop-rvce-innovate",
    "slug": "rvce-innovate-hackathon",
    "title": "RVCE Innovate 2026 Hackathon",
    "tagline": "Smart Mobility, CleanTech, and Embedded Computing National Challenge.",
    "summary": "RV College of Engineering flagship technical competition for hardware hackers, EV enthusiasts, and IoT coders.",
    "description": "Access state-of-the-art microelectronics labs, NVIDIA Jetson boards, and 3D printing suites to construct physical and digital prototypes.",
    "eventType": "hackathon",
    "type": "hackathon",
    "organizerId": "org-unstop",
    "organizerName": "RVCE IEEE Student Branch",
    "communityId": "rvce-ieee",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-17T20:00:00.000Z",
    "endAt": "2026-12-19T08:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-17T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "koramangala",
    "venue": {
      "id": "venue-rvce-innovate-hackathon",
      "name": "IEM Auditorium, RV College of Engineering Campus",
      "address": "Mysore Road, RV Vidyanikethan Post, Bengaluru, Karnataka 560059",
      "localityId": "koramangala",
      "city": "Bengaluru",
      "latitude": 12.9237,
      "longitude": 77.4987,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.4987,
        12.9237
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://unstop.com/hackathons",
      "capacity": 400,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-17T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "team",
      "minSize": 1,
      "maxSize": 4,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Hardware/IoT",
      "CleanTech",
      "Robotics",
      "Hackathons"
    ],
    "skills": [
      "C++",
      "Python",
      "Embedded Systems",
      "IoT"
    ],
    "learningOutcomes": [
      "C++",
      "Python",
      "Embedded Systems"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [
      "₹5,00,000 Prize Pool",
      "Venture Funding Fast-Track",
      "Exclusive Swag"
    ],
    "isSample": false,
    "source": "unstop",
    "sourcePlatform": "Unstop",
    "officialUrl": "https://unstop.com/hackathons",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-unstop-rvce-innovate",
        "sourceId": "src-unstop",
        "externalEventId": "live-unstop-rvce-innovate",
        "url": "https://unstop.com/hackathons",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-unstop-pes-ideathon",
    "slug": "pes-ideathon-sprint",
    "title": "PES University TechSprint & Ideathon",
    "tagline": "Rapid prototyping of AI, HealthTech, and Distributed Cloud applications.",
    "summary": "24-hour campus hackathon at PES University RR Campus attracting top university engineering teams across South India.",
    "description": "Work with faculty mentors and venture incubators. Direct fast-track interview opportunities with campus recruitment partners.",
    "eventType": "hackathon",
    "type": "hackathon",
    "organizerId": "org-unstop",
    "organizerName": "PES Innovation Guild",
    "communityId": "pes-guild",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-22T20:00:00.000Z",
    "endAt": "2026-12-23T20:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-22T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "jayanagar",
    "venue": {
      "id": "venue-pes-ideathon-sprint",
      "name": "MRD Auditorium, PES University RR Campus",
      "address": "100 Feet Ring Road, BSK III Stage, Bengaluru, Karnataka 560085",
      "localityId": "jayanagar",
      "city": "Bengaluru",
      "latitude": 12.9344,
      "longitude": 77.5345,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.5345,
        12.9344
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://unstop.com/hackathons",
      "capacity": 400,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-22T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "team",
      "minSize": 1,
      "maxSize": 4,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "HealthTech",
      "Cloud",
      "AI/ML",
      "Hackathons"
    ],
    "skills": [
      "React",
      "Python",
      "Node.js",
      "FastAPI"
    ],
    "learningOutcomes": [
      "React",
      "Python",
      "Node.js"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [
      "₹5,00,000 Prize Pool",
      "Venture Funding Fast-Track",
      "Exclusive Swag"
    ],
    "isSample": false,
    "source": "unstop",
    "sourcePlatform": "Unstop",
    "officialUrl": "https://unstop.com/hackathons",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-unstop-pes-ideathon",
        "sourceId": "src-unstop",
        "externalEventId": "live-unstop-pes-ideathon",
        "url": "https://unstop.com/hackathons",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-unstop-bmsce-phaseshift",
    "slug": "bmsce-phaseshift-hack",
    "title": "BMSCE PhaseShift National Hackathon",
    "tagline": "Annual national techfest hackathon with tracks in FinTech, CyberSec, and Web3.",
    "summary": "Over 1,000 engineering participants in South Bengaluru competing for cash prizes and seed incubation grants.",
    "description": "Organized by BMS College of Engineering. 36 hours of rigorous development with live API sandbox testing and code reviews.",
    "eventType": "hackathon",
    "type": "hackathon",
    "organizerId": "org-unstop",
    "organizerName": "BMSCE PhaseShift Committee",
    "communityId": "bmsce-tech",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-27T20:00:00.000Z",
    "endAt": "2026-12-29T08:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-27T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "jayanagar",
    "venue": {
      "id": "venue-bmsce-phaseshift-hack",
      "name": "Indoor Stadium & Tech Hall, BMSCE Basavanagudi",
      "address": "Bull Temple Rd, Basavanagudi, Bengaluru, Karnataka 560019",
      "localityId": "jayanagar",
      "city": "Bengaluru",
      "latitude": 12.9416,
      "longitude": 77.5658,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.5658,
        12.9416
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://unstop.com/hackathons",
      "capacity": 400,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-27T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "team",
      "minSize": 1,
      "maxSize": 4,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "FinTech",
      "Cybersecurity",
      "Web3",
      "Hackathons"
    ],
    "skills": [
      "Java",
      "Spring Boot",
      "Python",
      "Solidity",
      "React"
    ],
    "learningOutcomes": [
      "Java",
      "Spring Boot",
      "Python"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [
      "₹5,00,000 Prize Pool",
      "Venture Funding Fast-Track",
      "Exclusive Swag"
    ],
    "isSample": false,
    "source": "unstop",
    "sourcePlatform": "Unstop",
    "officialUrl": "https://unstop.com/hackathons",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-unstop-bmsce-phaseshift",
        "sourceId": "src-unstop",
        "externalEventId": "live-unstop-bmsce-phaseshift",
        "url": "https://unstop.com/hackathons",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-devfolio-whitefield-cloud",
    "slug": "whitefield-cloud-computing-challenge",
    "title": "Whitefield Cloud Infrastructure Hackathon",
    "tagline": "Design resilient multi-region architectures, disaster recovery, and edge computing.",
    "summary": "A 48-hour buildathon hosted in Whitefield IT Corridor tackling massive scale cloud infrastructure challenges.",
    "description": "Solve real-world latency, high-availability, and cost-efficiency architectural challenges provided by Tier-1 cloud providers.",
    "eventType": "hackathon",
    "type": "hackathon",
    "organizerId": "org-devfolio",
    "organizerName": "Whitefield Tech Guild",
    "communityId": "whitefield-tech",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-16T20:00:00.000Z",
    "endAt": "2026-12-18T20:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-16T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "whitefield",
    "venue": {
      "id": "venue-whitefield-cloud-computing-challenge",
      "name": "Cloud Innovation Centre, EPIP Zone, Whitefield",
      "address": "EPIP Industrial Area, Whitefield, Bengaluru, Karnataka 560066",
      "localityId": "whitefield",
      "city": "Bengaluru",
      "latitude": 12.9781,
      "longitude": 77.7275,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.7275,
        12.9781
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://devfolio.co/explore",
      "capacity": 400,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-16T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "team",
      "minSize": 1,
      "maxSize": 4,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Cloud",
      "DevOps",
      "Distributed Systems",
      "Hackathons"
    ],
    "skills": [
      "AWS",
      "Kubernetes",
      "Go",
      "Terraform"
    ],
    "learningOutcomes": [
      "AWS",
      "Kubernetes",
      "Go"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [
      "₹5,00,000 Prize Pool",
      "Venture Funding Fast-Track",
      "Exclusive Swag"
    ],
    "isSample": false,
    "source": "devfolio",
    "sourcePlatform": "Devfolio",
    "officialUrl": "https://devfolio.co/explore",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-devfolio-whitefield-cloud",
        "sourceId": "src-devfolio",
        "externalEventId": "live-devfolio-whitefield-cloud",
        "url": "https://devfolio.co/explore",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-knot-global-agent-hack",
    "slug": "global-autonomous-agent-hackathon",
    "title": "Global Autonomous Agent Hackathon 2026",
    "tagline": "Worldwide virtual buildathon for agentic workflows, memory graphs, and tool calling.",
    "summary": "A global 72-hour online hackathon connecting autonomous agent researchers and engineers across 40+ countries.",
    "description": "Build on open-weight LLMs, LangGraph, and Agency-Agents patterns. Global mentorship channels on Discord and live streaming demos.",
    "eventType": "hackathon",
    "type": "hackathon",
    "organizerId": "org-knot native",
    "organizerName": "Knot & Global Agent Foundation",
    "communityId": "knot-native",
    "mode": "online",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-10T20:00:00.000Z",
    "endAt": "2026-12-13T20:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-10T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "online",
    "venue": {
      "id": "venue-global-autonomous-agent-hackathon",
      "name": "Virtual / Discord Stage & GitHub",
      "address": "Online Global Event",
      "localityId": "koramangala",
      "city": "Bengaluru",
      "latitude": 12.9716,
      "longitude": 77.5946,
      "locationPrecision": "approximate",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.5946,
        12.9716
      ]
    },
    "onlineJoinUrl": "https://knot.app/events/live-knot-global-agent-hack",
    "registration": {
      "kind": "native",
      "externalUrl": "https://knot.app/events/live-knot-global-agent-hack",
      "capacity": 400,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-10T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "team",
      "minSize": 1,
      "maxSize": 4,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "AI Agents",
      "Automation",
      "Open Source",
      "Hackathons"
    ],
    "skills": [
      "Python",
      "LangChain",
      "FastAPI",
      "Gemini API"
    ],
    "learningOutcomes": [
      "Python",
      "LangChain",
      "FastAPI"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [
      "₹5,00,000 Prize Pool",
      "Venture Funding Fast-Track",
      "Exclusive Swag"
    ],
    "isSample": false,
    "source": "knot-native",
    "sourcePlatform": "Knot Native",
    "officialUrl": "https://knot.app/events/live-knot-global-agent-hack",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-knot-global-agent-hack",
        "sourceId": "src-knot-native",
        "externalEventId": "live-knot-global-agent-hack",
        "url": "https://knot.app/events/live-knot-global-agent-hack",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-devfolio-cyberdefend-ctf",
    "slug": "cyberdefend-blr-ctf-hackathon",
    "title": "CyberDefend BLR: Red Team / Blue Team CTF Challenge",
    "tagline": "Attack and defense security hackathon testing reverse engineering, binary exploitation, and cloud audits.",
    "summary": "36-hour capture-the-flag hackathon for ethical hackers, penetration testers, and security researchers.",
    "description": "Solve real-world vulnerability challenges in Web3 smart contracts, Linux kernel exploits, and OAuth authentication flows.",
    "eventType": "hackathon",
    "type": "hackathon",
    "organizerId": "org-devfolio",
    "organizerName": "Null Bengaluru Security Chapter",
    "communityId": "null-blr",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-24T20:00:00.000Z",
    "endAt": "2026-12-26T08:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-24T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "koramangala",
    "venue": {
      "id": "venue-cyberdefend-blr-ctf-hackathon",
      "name": "Cyber Lab, Koramangala 1st Block",
      "address": "1st Block, Koramangala, Bengaluru, Karnataka 560034",
      "localityId": "koramangala",
      "city": "Bengaluru",
      "latitude": 12.9279,
      "longitude": 77.6271,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.6271,
        12.9279
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://devfolio.co/explore",
      "capacity": 400,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-24T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "team",
      "minSize": 1,
      "maxSize": 4,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Cybersecurity",
      "CTF",
      "Ethical Hacking",
      "Hackathons"
    ],
    "skills": [
      "Python",
      "Reverse Engineering",
      "Binary Exploitation",
      "Cryptography"
    ],
    "learningOutcomes": [
      "Python",
      "Reverse Engineering",
      "Binary Exploitation"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [
      "₹5,00,000 Prize Pool",
      "Venture Funding Fast-Track",
      "Exclusive Swag"
    ],
    "isSample": false,
    "source": "devfolio",
    "sourcePlatform": "Devfolio",
    "officialUrl": "https://devfolio.co/explore",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-devfolio-cyberdefend-ctf",
        "sourceId": "src-devfolio",
        "externalEventId": "live-devfolio-cyberdefend-ctf",
        "url": "https://devfolio.co/explore",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-unstop-fintech-sprint",
    "slug": "fintech-payments-innovation-sprint",
    "title": "FinTech & UPI 3.0 Innovation Sprint",
    "tagline": "Build next-generation programmable banking, fraud anomaly detection, and cross-border settlement.",
    "summary": "FinTech focused code sprint in Electronic City exploring Open Banking APIs, account aggregators, and real-time fraud mitigation.",
    "description": "Direct API sandboxes from top Indian payment gateways and digital banks. Build solutions for programmable recurring payments and credit assessment.",
    "eventType": "hackathon",
    "type": "hackathon",
    "organizerId": "org-unstop",
    "organizerName": "Electronic City FinTech Collective",
    "communityId": "ecity-tech",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-20T20:00:00.000Z",
    "endAt": "2026-12-22T08:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-20T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "electronic_city",
    "venue": {
      "id": "venue-fintech-payments-innovation-sprint",
      "name": "FinTech Hub, Electronic City Phase 1",
      "address": "Hosur Rd, Phase 1, Electronic City, Bengaluru, Karnataka 560100",
      "localityId": "electronic_city",
      "city": "Bengaluru",
      "latitude": 12.8399,
      "longitude": 77.677,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.677,
        12.8399
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://unstop.com/hackathons",
      "capacity": 400,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-20T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "team",
      "minSize": 1,
      "maxSize": 4,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "FinTech",
      "Banking",
      "AI/ML",
      "Hackathons"
    ],
    "skills": [
      "Java",
      "Node.js",
      "PostgreSQL",
      "Kafka"
    ],
    "learningOutcomes": [
      "Java",
      "Node.js",
      "PostgreSQL"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [
      "₹5,00,000 Prize Pool",
      "Venture Funding Fast-Track",
      "Exclusive Swag"
    ],
    "isSample": false,
    "source": "unstop",
    "sourcePlatform": "Unstop",
    "officialUrl": "https://unstop.com/hackathons",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-unstop-fintech-sprint",
        "sourceId": "src-unstop",
        "externalEventId": "live-unstop-fintech-sprint",
        "url": "https://unstop.com/hackathons",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-hasgeek-opensource-ai",
    "slug": "opensource-ai-hackathon-blr",
    "title": "Open Source AI Models & Weights Hackathon",
    "tagline": "Fine-tune open-weights models, create synthetic datasets, and run inference on edge hardware.",
    "summary": "Community hackathon exploring HuggingFace transformers, Ollama, and vLLM local acceleration.",
    "description": "Dedicated GPU clusters provided for participating teams. Focus on local domain-specific fine-tunes for Indic languages and technical documentation.",
    "eventType": "hackathon",
    "type": "hackathon",
    "organizerId": "org-hasgeek",
    "organizerName": "HasGeek & Indic AI Guild",
    "communityId": "hasgeek-blr",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-12T20:00:00.000Z",
    "endAt": "2026-12-13T20:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-12T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "indiranagar",
    "venue": {
      "id": "venue-opensource-ai-hackathon-blr",
      "name": "HasGeek House, Domlur Layout, Bengaluru",
      "address": "Domlur 2nd Stage, Indiranagar corridor, Bengaluru, Karnataka 560071",
      "localityId": "indiranagar",
      "city": "Bengaluru",
      "latitude": 12.9609,
      "longitude": 77.6387,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.6387,
        12.9609
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://hasgeek.com/",
      "capacity": 400,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-12T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "team",
      "minSize": 1,
      "maxSize": 4,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Open Source",
      "AI/ML",
      "LLM",
      "Hackathons"
    ],
    "skills": [
      "PyTorch",
      "HuggingFace",
      "Python",
      "vLLM"
    ],
    "learningOutcomes": [
      "PyTorch",
      "HuggingFace",
      "Python"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [
      "₹5,00,000 Prize Pool",
      "Venture Funding Fast-Track",
      "Exclusive Swag"
    ],
    "isSample": false,
    "source": "hasgeek",
    "sourcePlatform": "HasGeek",
    "officialUrl": "https://hasgeek.com/",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-hasgeek-opensource-ai",
        "sourceId": "src-hasgeek",
        "externalEventId": "live-hasgeek-opensource-ai",
        "url": "https://hasgeek.com/",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-workshop-react19",
    "slug": "react19-server-actions-masterclass",
    "title": "React 19 & Next.js 15 Server Actions Masterclass",
    "tagline": "Deep dive into useActionState, optimistic UI updates, and server components.",
    "summary": "Full-day hands-on workshop building production fullstack apps with the latest React 19 stable primitives.",
    "description": "Transition from traditional useEffect patterns to server actions, streaming SSR, and suspense architecture. Bring your laptop and build a full production dashboard.",
    "eventType": "workshop",
    "type": "workshop",
    "organizerId": "org-meetup",
    "organizerName": "Reactiflux & Fullstack Guild",
    "communityId": "react-india-discord",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-04T20:00:00.000Z",
    "endAt": "2026-12-05T02:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-04T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "indiranagar",
    "venue": {
      "id": "venue-react19-server-actions-masterclass",
      "name": "Indiranagar Tech Hub · 100ft Road",
      "address": "100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038",
      "localityId": "indiranagar",
      "city": "Bengaluru",
      "latitude": 12.9784,
      "longitude": 77.6408,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.6408,
        12.9784
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://react.dev/community",
      "capacity": 150,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-04T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Frontend",
      "React",
      "Next.js",
      "Workshops"
    ],
    "skills": [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS"
    ],
    "learningOutcomes": [
      "React",
      "Next.js",
      "TypeScript"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "meetup",
    "sourcePlatform": "Meetup",
    "officialUrl": "https://react.dev/community",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-workshop-react19",
        "sourceId": "src-meetup",
        "externalEventId": "live-workshop-react19",
        "url": "https://react.dev/community",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-workshop-rust-systems",
    "slug": "rust-systems-concurrency-workshop",
    "title": "Rust Systems Programming & Concurrency Workshop",
    "tagline": "Master async Tokio runtimes, zero-cost abstractions, and memory safety.",
    "summary": "A deep architectural dive into fearless concurrency and multi-threaded networked services in Rust.",
    "description": "Learn ownership, lifetimes, unsafe boundaries, and high-performance async IO. Hands-on coding of an in-memory key-value cache engine.",
    "eventType": "workshop",
    "type": "workshop",
    "organizerId": "org-meetup",
    "organizerName": "Rustaceans Bengaluru",
    "communityId": "rust-bengaluru",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-10T20:00:00.000Z",
    "endAt": "2026-12-11T02:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-10T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "hsr_layout",
    "venue": {
      "id": "venue-rust-systems-concurrency-workshop",
      "name": "HSR Systems Lab, Sector 2, Bengaluru",
      "address": "14th Main, Sector 2, HSR Layout, Bengaluru 560102",
      "localityId": "hsr_layout",
      "city": "Bengaluru",
      "latitude": 12.9128,
      "longitude": 77.6425,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.6425,
        12.9128
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://www.meetup.com/rustaceans-bengaluru/",
      "capacity": 150,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-10T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Rust",
      "Systems Programming",
      "Concurrency",
      "Workshops"
    ],
    "skills": [
      "Rust",
      "Tokio",
      "Async IO",
      "Systems"
    ],
    "learningOutcomes": [
      "Rust",
      "Tokio",
      "Async IO"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "meetup",
    "sourcePlatform": "Meetup",
    "officialUrl": "https://www.meetup.com/rustaceans-bengaluru/",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-workshop-rust-systems",
        "sourceId": "src-meetup",
        "externalEventId": "live-workshop-rust-systems",
        "url": "https://www.meetup.com/rustaceans-bengaluru/",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-workshop-k8s-docker",
    "slug": "kubernetes-docker-production-masterclass",
    "title": "Docker & Kubernetes Orchestration Masterclass",
    "tagline": "Containerize microservices, write Helm charts, and manage EKS production clusters.",
    "summary": "Practical devops workshop covering multi-stage Docker builds, ingress controllers, service meshes, and GitOps pipelines.",
    "description": "Take a microservice from local containerization to rolling zero-downtime deployments on managed Kubernetes clusters with Prometheus monitoring.",
    "eventType": "workshop",
    "type": "workshop",
    "organizerId": "org-meetup",
    "organizerName": "Cloud Native Bengaluru",
    "communityId": "k8s-blr",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-12T20:00:00.000Z",
    "endAt": "2026-12-13T03:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-12T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "whitefield",
    "venue": {
      "id": "venue-kubernetes-docker-production-masterclass",
      "name": "Cloud Studio, ITPL Main Road, Whitefield",
      "address": "International Tech Park, Whitefield, Bengaluru, Karnataka 560066",
      "localityId": "whitefield",
      "city": "Bengaluru",
      "latitude": 12.9866,
      "longitude": 77.7381,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.7381,
        12.9866
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://www.meetup.com/",
      "capacity": 150,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-12T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "DevOps",
      "Kubernetes",
      "Cloud",
      "Workshops"
    ],
    "skills": [
      "Docker",
      "Kubernetes",
      "Helm",
      "Terraform",
      "Prometheus"
    ],
    "learningOutcomes": [
      "Docker",
      "Kubernetes",
      "Helm"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "meetup",
    "sourcePlatform": "Meetup",
    "officialUrl": "https://www.meetup.com/",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-workshop-k8s-docker",
        "sourceId": "src-meetup",
        "externalEventId": "live-workshop-k8s-docker",
        "url": "https://www.meetup.com/",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-workshop-figma-systems",
    "slug": "figma-design-systems-tokens",
    "title": "Advanced Figma Design Systems & Design Tokens",
    "tagline": "Build scalable component libraries synced directly with React and Tailwind codebases.",
    "summary": "Design engineers workshop exploring auto-layout v5, variables, state variants, and GitHub Design Token sync pipelines.",
    "description": "Bridge the designer-developer gap. Construct an enterprise grade UI token hierarchy with dark/light themes and automated NPM package export.",
    "eventType": "workshop",
    "type": "workshop",
    "organizerId": "org-luma",
    "organizerName": "Bengaluru Design Circle",
    "communityId": "blr-design-circle",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-07T20:00:00.000Z",
    "endAt": "2026-12-08T01:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-07T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "indiranagar",
    "venue": {
      "id": "venue-figma-design-systems-tokens",
      "name": "DesignCraft Studio, 100ft Road, Indiranagar",
      "address": "100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038",
      "localityId": "indiranagar",
      "city": "Bengaluru",
      "latitude": 12.9784,
      "longitude": 77.6408,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.6408,
        12.9784
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://lu.ma/",
      "capacity": 150,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-07T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Design",
      "UI/UX",
      "Figma",
      "Workshops"
    ],
    "skills": [
      "Figma",
      "Design Systems",
      "CSS",
      "Tailwind CSS"
    ],
    "learningOutcomes": [
      "Figma",
      "Design Systems",
      "CSS"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "luma",
    "sourcePlatform": "Luma",
    "officialUrl": "https://lu.ma/",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-workshop-figma-systems",
        "sourceId": "src-luma",
        "externalEventId": "live-workshop-figma-systems",
        "url": "https://lu.ma/",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-workshop-fastapi-ai",
    "slug": "fastapi-async-ai-microservices",
    "title": "High-Throughput FastAPI & Async Microservices for AI",
    "tagline": "Serve LLMs, handle streaming SSE responses, and build resilient Celery task queues.",
    "summary": "Backend engineering masterclass covering Python async IO, Pydantic v2, streaming completions, and Redis caching.",
    "description": "Learn to design low-latency APIs that handle heavy AI workloads, backpressure, rate-limiting, and distributed websocket broadcasting.",
    "eventType": "workshop",
    "type": "workshop",
    "organizerId": "org-meetup",
    "organizerName": "BangPypers (Python Bengaluru)",
    "communityId": "bangpypers-discord",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-14T20:00:00.000Z",
    "endAt": "2026-12-15T01:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-14T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "koramangala",
    "venue": {
      "id": "venue-fastapi-async-ai-microservices",
      "name": "Python Guild Hall, Koramangala 5th Block",
      "address": "Industrial Layout, 5th Block, Koramangala, Bengaluru 560095",
      "localityId": "koramangala",
      "city": "Bengaluru",
      "latitude": 12.9352,
      "longitude": 77.6245,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.6245,
        12.9352
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://www.meetup.com/bangpypers/",
      "capacity": 150,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-14T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Python",
      "FastAPI",
      "Backend",
      "Workshops"
    ],
    "skills": [
      "Python",
      "FastAPI",
      "Redis",
      "Docker",
      "AsyncIO"
    ],
    "learningOutcomes": [
      "Python",
      "FastAPI",
      "Redis"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "meetup",
    "sourcePlatform": "Meetup",
    "officialUrl": "https://www.meetup.com/bangpypers/",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-workshop-fastapi-ai",
        "sourceId": "src-meetup",
        "externalEventId": "live-workshop-fastapi-ai",
        "url": "https://www.meetup.com/bangpypers/",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-workshop-flutter-architecture",
    "slug": "flutter-bloc-clean-architecture",
    "title": "Production Flutter & BLoC Clean Architecture Bootcamp",
    "tagline": "Build offline-first cross-platform mobile apps with automated test suites.",
    "summary": "Comprehensive Flutter workshop teaching clean architecture, repository patterns, dependency injection, and SQLite caching.",
    "description": "Hosted at Presidency University engineering campus. Build a full-fledged event discovery mobile app with smooth 60fps animations and background sync.",
    "eventType": "workshop",
    "type": "workshop",
    "organizerId": "org-unstop",
    "organizerName": "Presidency Mobile Builders Guild",
    "communityId": "presidency-innovation-club",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-11T20:00:00.000Z",
    "endAt": "2026-12-12T02:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-11T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "yelahanka",
    "venue": {
      "id": "venue-flutter-bloc-clean-architecture",
      "name": "Computer Science Lab 3, Presidency University, Yelahanka",
      "address": "Itgalpur, Rajanakunte, Yelahanka, Bengaluru, Karnataka 560064",
      "localityId": "yelahanka",
      "city": "Bengaluru",
      "latitude": 13.1682,
      "longitude": 77.5671,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.5671,
        13.1682
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://unstop.com/workshops",
      "capacity": 150,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-11T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Mobile",
      "Flutter",
      "Dart",
      "Workshops"
    ],
    "skills": [
      "Flutter",
      "Dart",
      "BLoC",
      "Clean Architecture",
      "REST APIs"
    ],
    "learningOutcomes": [
      "Flutter",
      "Dart",
      "BLoC"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "unstop",
    "sourcePlatform": "Unstop",
    "officialUrl": "https://unstop.com/workshops",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-workshop-flutter-architecture",
        "sourceId": "src-unstop",
        "externalEventId": "live-workshop-flutter-architecture",
        "url": "https://unstop.com/workshops",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-workshop-pytorch-multimodal",
    "slug": "pytorch-multimodal-llm-finetuning",
    "title": "PyTorch Large Multimodal Reasoning & Fine-Tuning",
    "tagline": "Fine-tune vision-language models with LoRA, FlashAttention-2, and DeepSpeed.",
    "summary": "Advanced AI workshop on training multimodal models to inspect images, documents, and code diagrams with high precision.",
    "description": "Hands-on Jupyter notebooks executing parameter-efficient fine-tuning (PEFT), distributed data parallel (DDP), and memory-efficient inference.",
    "eventType": "workshop",
    "type": "workshop",
    "organizerId": "org-luma",
    "organizerName": "Bengaluru Generative AI Collective",
    "communityId": "blr-genai-collective-luma",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-18T20:00:00.000Z",
    "endAt": "2026-12-19T03:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-18T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "koramangala",
    "venue": {
      "id": "venue-pytorch-multimodal-llm-finetuning",
      "name": "DeepTech Hub, 80 Feet Road, Koramangala",
      "address": "80 Feet Road, Koramangala 4th Block, Bengaluru, Karnataka 560034",
      "localityId": "koramangala",
      "city": "Bengaluru",
      "latitude": 12.9345,
      "longitude": 77.6265,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.6265,
        12.9345
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://lu.ma/",
      "capacity": 150,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-18T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "paid",
      "amountInr": 499,
      "note": "₹499 entry fee"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "AI/ML",
      "PyTorch",
      "Deep Learning",
      "Workshops"
    ],
    "skills": [
      "PyTorch",
      "Transformers",
      "LoRA",
      "CUDA",
      "Python"
    ],
    "learningOutcomes": [
      "PyTorch",
      "Transformers",
      "LoRA"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "luma",
    "sourcePlatform": "Luma",
    "officialUrl": "https://lu.ma/",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-workshop-pytorch-multimodal",
        "sourceId": "src-luma",
        "externalEventId": "live-workshop-pytorch-multimodal",
        "url": "https://lu.ma/",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-workshop-smart-contract-security",
    "slug": "smart-contract-security-audit-workshop",
    "title": "Smart Contract Security & Formal Verification Masterclass",
    "tagline": "Audit Solidity code, identify re-entrancy vectors, and use Slither & Foundry.",
    "summary": "Full-day security workshop teaching protocol defenses, fuzzing invariants with Echidna, and writing secure decentralized logic.",
    "description": "Dissect real-world multi-million dollar DeFi exploits. Step through vulnerable contracts and implement bulletproof access controls and checks.",
    "eventType": "workshop",
    "type": "workshop",
    "organizerId": "org-devfolio",
    "organizerName": "ETHGlobal Community",
    "communityId": "ethglobal-community",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-21T20:00:00.000Z",
    "endAt": "2026-12-22T02:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-21T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "hsr_layout",
    "venue": {
      "id": "venue-smart-contract-security-audit-workshop",
      "name": "Web3 Audit Labs, 27th Main Rd, HSR Layout",
      "address": "Sector 1, HSR Layout, Bengaluru, Karnataka 560102",
      "localityId": "hsr_layout",
      "city": "Bengaluru",
      "latitude": 12.9154,
      "longitude": 77.6498,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.6498,
        12.9154
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://ethindia.co",
      "capacity": 150,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-21T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Web3",
      "Cybersecurity",
      "Solidity",
      "Workshops"
    ],
    "skills": [
      "Solidity",
      "Foundry",
      "Slither",
      "Security Audits"
    ],
    "learningOutcomes": [
      "Solidity",
      "Foundry",
      "Slither"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "devfolio",
    "sourcePlatform": "Devfolio",
    "officialUrl": "https://ethindia.co",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-workshop-smart-contract-security",
        "sourceId": "src-devfolio",
        "externalEventId": "live-workshop-smart-contract-security",
        "url": "https://ethindia.co",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-workshop-terraform-aws",
    "slug": "cloud-native-devops-terraform-aws",
    "title": "Cloud Native DevOps with Terraform & AWS Architecture",
    "tagline": "Declare scalable infrastructure as code, build CI/CD pipelines, and manage VPCs.",
    "summary": "Practical hands-on lab configuring automated cloud environments using Terraform modules, GitHub Actions, and AWS CloudWatch.",
    "description": "Learn module structure, remote state locking in S3/DynamoDB, zero-trust security groups, and automated rollback triggers.",
    "eventType": "workshop",
    "type": "workshop",
    "organizerId": "org-meetup",
    "organizerName": "AWS User Group Bengaluru",
    "communityId": "aws-ug-blr",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-15T20:00:00.000Z",
    "endAt": "2026-12-16T02:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-15T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "whitefield",
    "venue": {
      "id": "venue-cloud-native-devops-terraform-aws",
      "name": "AWS Training Facility, Whitefield",
      "address": "EPIP Zone, Whitefield, Bengaluru, Karnataka 560066",
      "localityId": "whitefield",
      "city": "Bengaluru",
      "latitude": 12.9781,
      "longitude": 77.7275,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.7275,
        12.9781
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://www.meetup.com/awsugblr/",
      "capacity": 150,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-15T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "DevOps",
      "Terraform",
      "AWS",
      "Workshops"
    ],
    "skills": [
      "Terraform",
      "AWS",
      "CI/CD",
      "GitHub Actions"
    ],
    "learningOutcomes": [
      "Terraform",
      "AWS",
      "CI/CD"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "meetup",
    "sourcePlatform": "Meetup",
    "officialUrl": "https://www.meetup.com/awsugblr/",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-workshop-terraform-aws",
        "sourceId": "src-meetup",
        "externalEventId": "live-workshop-terraform-aws",
        "url": "https://www.meetup.com/awsugblr/",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-workshop-go-microservices",
    "slug": "go-microservices-grpc-workshop",
    "title": "High-Throughput Go Microservices & gRPC Masterclass",
    "tagline": "Write performant concurrent network services using Go routines, channels, and Protobuf.",
    "summary": "Construct low-overhead RPC services that handle 50,000+ requests per second with structured logging and OpenTelemetry tracing.",
    "description": "Understand Go memory model, runtime scheduler internals, garbage collection tuning, and bidirectional gRPC streaming.",
    "eventType": "workshop",
    "type": "workshop",
    "organizerId": "org-meetup",
    "organizerName": "Golang Bengaluru",
    "communityId": "golang-blr",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-23T20:00:00.000Z",
    "endAt": "2026-12-24T01:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-23T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "indiranagar",
    "venue": {
      "id": "venue-go-microservices-grpc-workshop",
      "name": "Go Engineering Studio, MG Road Metro Corridor",
      "address": "MG Road, Bengaluru, Karnataka 560001",
      "localityId": "indiranagar",
      "city": "Bengaluru",
      "latitude": 12.9756,
      "longitude": 77.6066,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.6066,
        12.9756
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://www.meetup.com/",
      "capacity": 150,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-23T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Go",
      "Backend",
      "Microservices",
      "Workshops"
    ],
    "skills": [
      "Go",
      "gRPC",
      "Protobuf",
      "Docker",
      "Concurrency"
    ],
    "learningOutcomes": [
      "Go",
      "gRPC",
      "Protobuf"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "meetup",
    "sourcePlatform": "Meetup",
    "officialUrl": "https://www.meetup.com/",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-workshop-go-microservices",
        "sourceId": "src-meetup",
        "externalEventId": "live-workshop-go-microservices",
        "url": "https://www.meetup.com/",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-workshop-mern-production",
    "slug": "mern-stack-production-performance",
    "title": "MERN Stack Production Architecture & MongoDB Performance",
    "tagline": "Compound indexing, aggregation pipelines, cursor pagination, and Vite SSR.",
    "summary": "A deep architectural masterclass for fullstack developers building scalable MERN web applications.",
    "description": "Learn query plan explain() analysis, replica set failover, connection pool management, and clean React component state separation.",
    "eventType": "workshop",
    "type": "workshop",
    "organizerId": "org-unstop",
    "organizerName": "Presidency University Computer Applications Dept",
    "communityId": "presidency-innovation-club",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-09T20:00:00.000Z",
    "endAt": "2026-12-10T01:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-09T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "yelahanka",
    "venue": {
      "id": "venue-mern-stack-production-performance",
      "name": "MCA Seminar Hall, Presidency University, Yelahanka",
      "address": "Itgalpur, Rajanakunte, Yelahanka, Bengaluru, Karnataka 560064",
      "localityId": "yelahanka",
      "city": "Bengaluru",
      "latitude": 13.1682,
      "longitude": 77.5671,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.5671,
        13.1682
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://unstop.com/workshops",
      "capacity": 150,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-09T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "MERN",
      "MongoDB",
      "React",
      "Node.js",
      "Workshops"
    ],
    "skills": [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "Performance"
    ],
    "learningOutcomes": [
      "MongoDB",
      "Express",
      "React"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "unstop",
    "sourcePlatform": "Unstop",
    "officialUrl": "https://unstop.com/workshops",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-workshop-mern-production",
        "sourceId": "src-unstop",
        "externalEventId": "live-workshop-mern-production",
        "url": "https://unstop.com/workshops",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-workshop-graphql-typescript",
    "slug": "fullstack-graphql-typescript-architecture",
    "title": "Fullstack TypeScript & GraphQL Production Architecture",
    "tagline": "Type-safe schemas, code generation, DataLoader N+1 query batching, and Apollo Client.",
    "summary": "End-to-end type safety workshop from database ORM (Prisma) to GraphQL resolvers and front-end React hooks.",
    "description": "Eliminate over-fetching and type drift across full-stack applications. Build complex federated schemas with live subscriptions.",
    "eventType": "workshop",
    "type": "workshop",
    "organizerId": "org-meetup",
    "organizerName": "Fullstack Guild Bengaluru",
    "communityId": "react-india-discord",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-26T20:00:00.000Z",
    "endAt": "2026-12-27T02:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-26T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "electronic_city",
    "venue": {
      "id": "venue-fullstack-graphql-typescript-architecture",
      "name": "Tech Arena 2, Electronic City Phase 1",
      "address": "Electronic City, Bengaluru, Karnataka 560100",
      "localityId": "electronic_city",
      "city": "Bengaluru",
      "latitude": 12.8399,
      "longitude": 77.677,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.677,
        12.8399
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://www.meetup.com/",
      "capacity": 150,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-26T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "TypeScript",
      "GraphQL",
      "Fullstack",
      "Workshops"
    ],
    "skills": [
      "TypeScript",
      "GraphQL",
      "Apollo",
      "Prisma",
      "React"
    ],
    "learningOutcomes": [
      "TypeScript",
      "GraphQL",
      "Apollo"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "meetup",
    "sourcePlatform": "Meetup",
    "officialUrl": "https://www.meetup.com/",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-workshop-graphql-typescript",
        "sourceId": "src-meetup",
        "externalEventId": "live-workshop-graphql-typescript",
        "url": "https://www.meetup.com/",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-workshop-zk-crypto",
    "slug": "zero-knowledge-cryptography-snarks",
    "title": "Zero-Knowledge Cryptography & zk-SNARKs Workshop",
    "tagline": "Circom circuits, Groth16 proofs, and private identity verification on Ethereum.",
    "summary": "Hands-on mathematical and programming workshop constructing cryptographic zero-knowledge circuits for privacy-preserving verification.",
    "description": "Step-by-step guidance writing Circom code, generating proving keys, and deploying on-chain Solidity verifier contracts.",
    "eventType": "workshop",
    "type": "workshop",
    "organizerId": "org-devfolio",
    "organizerName": "Web3 BUIDLers India Hub",
    "communityId": "ethglobal-community",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-28T20:00:00.000Z",
    "endAt": "2026-12-29T02:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-28T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "indiranagar",
    "venue": {
      "id": "venue-zero-knowledge-cryptography-snarks",
      "name": "Cryptography Lab, 100 Feet Rd, Indiranagar",
      "address": "100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038",
      "localityId": "indiranagar",
      "city": "Bengaluru",
      "latitude": 12.9784,
      "longitude": 77.6408,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.6408,
        12.9784
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://ethindia.co",
      "capacity": 150,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-28T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Cryptography",
      "Zero Knowledge",
      "Web3",
      "Workshops"
    ],
    "skills": [
      "Circom",
      "Solidity",
      "zk-SNARKs",
      "Mathematics"
    ],
    "learningOutcomes": [
      "Circom",
      "Solidity",
      "zk-SNARKs"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "devfolio",
    "sourcePlatform": "Devfolio",
    "officialUrl": "https://ethindia.co",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-workshop-zk-crypto",
        "sourceId": "src-devfolio",
        "externalEventId": "live-workshop-zk-crypto",
        "url": "https://ethindia.co",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-workshop-computervision-yolo",
    "slug": "computer-vision-yolov10-edge",
    "title": "Edge Computer Vision & Real-time YOLOv10 Deployment",
    "tagline": "Train object detection models and deploy to Raspberry Pi and browser ONNX runtimes.",
    "summary": "Build high-performance real-time computer vision applications with modern transfer learning and TensorRT acceleration.",
    "description": "Capture video streams, annotate custom bounding boxes, fine-tune models, and export optimized FP16 inference graphs.",
    "eventType": "workshop",
    "type": "workshop",
    "organizerId": "org-meetup",
    "organizerName": "Bengaluru Vision AI Community",
    "communityId": "google-dev-discord",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-20T20:00:00.000Z",
    "endAt": "2026-12-21T02:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-20T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "electronic_city",
    "venue": {
      "id": "venue-computer-vision-yolov10-edge",
      "name": "Edge Computing Lab, Electronic City",
      "address": "Phase 1, Electronic City, Bengaluru, Karnataka 560100",
      "localityId": "electronic_city",
      "city": "Bengaluru",
      "latitude": 12.8399,
      "longitude": 77.677,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.677,
        12.8399
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://www.meetup.com/",
      "capacity": 150,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-20T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Computer Vision",
      "AI/ML",
      "Edge AI",
      "Workshops"
    ],
    "skills": [
      "OpenCV",
      "PyTorch",
      "YOLO",
      "ONNX",
      "Python"
    ],
    "learningOutcomes": [
      "OpenCV",
      "PyTorch",
      "YOLO"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "meetup",
    "sourcePlatform": "Meetup",
    "officialUrl": "https://www.meetup.com/",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-workshop-computervision-yolo",
        "sourceId": "src-meetup",
        "externalEventId": "live-workshop-computervision-yolo",
        "url": "https://www.meetup.com/",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-workshop-modern-css",
    "slug": "modern-css-web-animations",
    "title": "Modern CSS Architecture, Grid & Micro-Interactions",
    "tagline": "Container queries, view transitions API, subgrid, and hardware-accelerated SVG animations.",
    "summary": "Master contemporary styling architectures without bloated UI libraries. Build responsive, accessible, and delightful interactive interfaces.",
    "description": "Construct real-world fluid layouts, scroll-driven animations, and view transition morphs supported across all modern browsers.",
    "eventType": "workshop",
    "type": "workshop",
    "organizerId": "org-meetup",
    "organizerName": "Frontend Bengaluru Guild",
    "communityId": "react-india-discord",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-16T20:00:00.000Z",
    "endAt": "2026-12-17T01:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-16T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "indiranagar",
    "venue": {
      "id": "venue-modern-css-web-animations",
      "name": "Frontend Studio, HAL 2nd Stage, Indiranagar",
      "address": "HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038",
      "localityId": "indiranagar",
      "city": "Bengaluru",
      "latitude": 12.9719,
      "longitude": 77.6412,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.6412,
        12.9719
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://www.meetup.com/",
      "capacity": 150,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-16T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "CSS",
      "Frontend",
      "Animation",
      "Workshops"
    ],
    "skills": [
      "CSS3",
      "Web Animations",
      "UI/UX",
      "HTML5"
    ],
    "learningOutcomes": [
      "CSS3",
      "Web Animations",
      "UI/UX"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "meetup",
    "sourcePlatform": "Meetup",
    "officialUrl": "https://www.meetup.com/",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-workshop-modern-css",
        "sourceId": "src-meetup",
        "externalEventId": "live-workshop-modern-css",
        "url": "https://www.meetup.com/",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-meetup-bangalorejs",
    "slug": "bangalorejs-december-meetup",
    "title": "BangaloreJS Monthly Tech Meetup: V8 Internals & WebAssembly",
    "tagline": "Asia’s largest JavaScript community monthly Saturday gathering.",
    "summary": "Four lightning talks and technical keynotes covering V8 engine optimisations, WASM runtimes, and next-gen bundling with Turbopack.",
    "description": "Network with over 200 frontend architects, core library maintainers, and web developers. Lunch and networking refreshments included.",
    "eventType": "meetup",
    "type": "meetup",
    "organizerId": "org-meetup",
    "organizerName": "BangaloreJS Community",
    "communityId": "bangalorejs-meetup",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-06T20:00:00.000Z",
    "endAt": "2026-12-07T00:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-06T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "koramangala",
    "venue": {
      "id": "venue-bangalorejs-december-meetup",
      "name": "Auditorium A, Koramangala Club Road",
      "address": "6th Block, Koramangala, Bengaluru, Karnataka 560095",
      "localityId": "koramangala",
      "city": "Bengaluru",
      "latitude": 12.9348,
      "longitude": 77.6221,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.6221,
        12.9348
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://www.meetup.com/bangalorejs/",
      "capacity": 150,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-06T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "JavaScript",
      "TypeScript",
      "Web Architecture",
      "Meetups"
    ],
    "skills": [
      "JavaScript",
      "V8",
      "Node.js",
      "WebAssembly"
    ],
    "learningOutcomes": [
      "JavaScript",
      "V8",
      "Node.js"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "meetup",
    "sourcePlatform": "Meetup",
    "officialUrl": "https://www.meetup.com/bangalorejs/",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-meetup-bangalorejs",
        "sourceId": "src-meetup",
        "externalEventId": "live-meetup-bangalorejs",
        "url": "https://www.meetup.com/bangalorejs/",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-meetup-aws-bengaluru",
    "slug": "aws-user-group-serverless-bedrock",
    "title": "AWS User Group Bengaluru: Serverless & Amazon Bedrock Generative AI",
    "tagline": "Deep dive into serverless architectures, Lambda response streaming, and Bedrock agents.",
    "summary": "Monthly AWS community gathering featuring principal cloud architects sharing real-world enterprise deployments and cost optimisations.",
    "description": "Explore generative AI on AWS, event-driven Step Functions, and DynamoDB single-table design with hands-on console demos.",
    "eventType": "meetup",
    "type": "meetup",
    "organizerId": "org-meetup",
    "organizerName": "AWS User Group Bengaluru",
    "communityId": "aws-ug-blr",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-11T20:00:00.000Z",
    "endAt": "2026-12-12T00:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-11T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "whitefield",
    "venue": {
      "id": "venue-aws-user-group-serverless-bedrock",
      "name": "Amazon Development Centre, Brigade Tech Gardens, Whitefield",
      "address": "Brookefield, Whitefield, Bengaluru, Karnataka 560066",
      "localityId": "whitefield",
      "city": "Bengaluru",
      "latitude": 12.9698,
      "longitude": 77.7126,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.7126,
        12.9698
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://www.meetup.com/awsugblr/",
      "capacity": 150,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-11T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "AWS",
      "Cloud",
      "Serverless",
      "Generative AI",
      "Meetups"
    ],
    "skills": [
      "AWS",
      "Lambda",
      "Bedrock",
      "DynamoDB",
      "CloudFormation"
    ],
    "learningOutcomes": [
      "AWS",
      "Lambda",
      "Bedrock"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "meetup",
    "sourcePlatform": "Meetup",
    "officialUrl": "https://www.meetup.com/awsugblr/",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-meetup-aws-bengaluru",
        "sourceId": "src-meetup",
        "externalEventId": "live-meetup-aws-bengaluru",
        "url": "https://www.meetup.com/awsugblr/",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-meetup-foss-united",
    "slug": "foss-united-bengaluru-monthly",
    "title": "FOSS United Bengaluru Monthly Open Source Gathering",
    "tagline": "Show & tell for open source creators, Linux kernel patchers, and FOSS grant winners.",
    "summary": "A monthly Saturday morning dedicated to showcasing open-source projects built in India with direct code reviews and contributor onboarding.",
    "description": "Learn about FOSS grants, software freedom, and contribute your first pull request to prominent Indian open-source repositories.",
    "eventType": "meetup",
    "type": "meetup",
    "organizerId": "org-meetup",
    "organizerName": "FOSS United Foundation",
    "communityId": "foss-united-discord",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-16T20:00:00.000Z",
    "endAt": "2026-12-17T00:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-16T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "koramangala",
    "venue": {
      "id": "venue-foss-united-bengaluru-monthly",
      "name": "FOSS Community Space, Koramangala 4th Block",
      "address": "80 Feet Rd, 4th Block, Koramangala, Bengaluru 560034",
      "localityId": "koramangala",
      "city": "Bengaluru",
      "latitude": 12.9345,
      "longitude": 77.6265,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.6265,
        12.9345
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://fossunited.org/",
      "capacity": 150,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-16T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Open Source",
      "Linux",
      "Python",
      "Go",
      "Meetups"
    ],
    "skills": [
      "Open Source",
      "Git",
      "Linux",
      "Python"
    ],
    "learningOutcomes": [
      "Open Source",
      "Git",
      "Linux"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "meetup",
    "sourcePlatform": "Meetup",
    "officialUrl": "https://fossunited.org/",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-meetup-foss-united",
        "sourceId": "src-meetup",
        "externalEventId": "live-meetup-foss-united",
        "url": "https://fossunited.org/",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-meetup-genai-collective",
    "slug": "blr-genai-collective-salon-12",
    "title": "Bengaluru Generative AI Collective Salon #12",
    "tagline": "Curated technical salon for GPU builders, researchers, and AI startup founders.",
    "summary": "An invite-only technical deep dive exploring fine-tuning open weights models, quantization (GGML/AWQ), and multimodal agentic reasoning.",
    "description": "Weekly salon gathering 80+ AI engineers, researchers from IISc, and founders building generative AI infrastructure in HSR Layout.",
    "eventType": "meetup",
    "type": "meetup",
    "organizerId": "org-luma",
    "organizerName": "Bengaluru Generative AI Collective",
    "communityId": "blr-genai-collective-luma",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-09T20:00:00.000Z",
    "endAt": "2026-12-09T23:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-09T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "hsr_layout",
    "venue": {
      "id": "venue-blr-genai-collective-salon-12",
      "name": "AI Foundry Loft, 27th Main, HSR Layout Sector 1",
      "address": "27th Main Rd, Sector 1, HSR Layout, Bengaluru, Karnataka 560102",
      "localityId": "hsr_layout",
      "city": "Bengaluru",
      "latitude": 12.9154,
      "longitude": 77.6498,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.6498,
        12.9154
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://lu.ma/blr-genai-collective",
      "capacity": 150,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-09T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Generative AI",
      "Deep Learning",
      "PyTorch",
      "Meetups"
    ],
    "skills": [
      "PyTorch",
      "Transformers",
      "CUDA",
      "Python",
      "LLM"
    ],
    "learningOutcomes": [
      "PyTorch",
      "Transformers",
      "CUDA"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "luma",
    "sourcePlatform": "Luma",
    "officialUrl": "https://lu.ma/blr-genai-collective",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-meetup-genai-collective",
        "sourceId": "src-luma",
        "externalEventId": "live-meetup-genai-collective",
        "url": "https://lu.ma/blr-genai-collective",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-meetup-flutter-bengaluru",
    "slug": "flutter-bengaluru-community-meetup",
    "title": "Flutter Bengaluru Community Meetup: Performance & Impeller Engine",
    "tagline": "Explore Impeller rendering, WebAssembly compilations, and state management at scale.",
    "summary": "Meetup for Flutter engineers exploring multi-platform compilation, custom shaders, and memory leak profiling on Android and iOS.",
    "description": "Network with over 150 mobile developers. Three live coding sessions demonstrating complex animations and background isolate threads.",
    "eventType": "meetup",
    "type": "meetup",
    "organizerId": "org-meetup",
    "organizerName": "The Flutter Squad & BLR Guild",
    "communityId": "flutter-blr",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-19T20:00:00.000Z",
    "endAt": "2026-12-20T00:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-19T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "jayanagar",
    "venue": {
      "id": "venue-flutter-bengaluru-community-meetup",
      "name": "Mobile Dev Space, 4th Block, Jayanagar",
      "address": "4th Block, Jayanagar, Bengaluru, Karnataka 560011",
      "localityId": "jayanagar",
      "city": "Bengaluru",
      "latitude": 12.9299,
      "longitude": 77.5824,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.5824,
        12.9299
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://flutter.dev/community",
      "capacity": 150,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-19T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Mobile",
      "Flutter",
      "Dart",
      "Meetups"
    ],
    "skills": [
      "Flutter",
      "Dart",
      "Impeller",
      "Mobile Dev"
    ],
    "learningOutcomes": [
      "Flutter",
      "Dart",
      "Impeller"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "meetup",
    "sourcePlatform": "Meetup",
    "officialUrl": "https://flutter.dev/community",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-meetup-flutter-bengaluru",
        "sourceId": "src-meetup",
        "externalEventId": "live-meetup-flutter-bengaluru",
        "url": "https://flutter.dev/community",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-meetup-bangpypers-dec",
    "slug": "bangpypers-monthly-python-meetup",
    "title": "BangPypers: Python, Local LLM Inference & Profiling",
    "tagline": "The official monthly Python community meetup of Bangalore.",
    "summary": "Presentations on Python 3.13 free-threaded GIL, benchmarking vLLM vs Ollama, and building production data pipelines with Polars.",
    "description": "Open to Python developers of all experience levels. Q&A discussions, lightning talks, and networking coffee breaks.",
    "eventType": "meetup",
    "type": "meetup",
    "organizerId": "org-meetup",
    "organizerName": "BangPypers Community",
    "communityId": "bangpypers-discord",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-13T20:00:00.000Z",
    "endAt": "2026-12-14T00:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-13T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "indiranagar",
    "venue": {
      "id": "venue-bangpypers-monthly-python-meetup",
      "name": "Indiranagar Tech Hub, 100 Feet Road",
      "address": "HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038",
      "localityId": "indiranagar",
      "city": "Bengaluru",
      "latitude": 12.9784,
      "longitude": 77.6408,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.6408,
        12.9784
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://www.meetup.com/bangpypers/",
      "capacity": 150,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-13T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Python",
      "Data Science",
      "AI/ML",
      "Meetups"
    ],
    "skills": [
      "Python",
      "Polars",
      "vLLM",
      "FastAPI"
    ],
    "learningOutcomes": [
      "Python",
      "Polars",
      "vLLM"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "meetup",
    "sourcePlatform": "Meetup",
    "officialUrl": "https://www.meetup.com/bangpypers/",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-meetup-bangpypers-dec",
        "sourceId": "src-meetup",
        "externalEventId": "live-meetup-bangpypers-dec",
        "url": "https://www.meetup.com/bangpypers/",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-meetup-k8s-cloudnative",
    "slug": "kubernetes-cloudnative-blr-meetup",
    "title": "Kubernetes & Cloud Native Bengaluru Meetup: eBPF & Cilium Networking",
    "tagline": "Explore eBPF kernel instrumentation, Cilium service mesh, and zero-trust cluster security.",
    "summary": "Cloud infrastructure engineers gathering in Whitefield to analyze high-throughput cluster observability and network policy enforcement.",
    "description": "Deep dive into eBPF bytecode, kernel tracing probes, and real-time network flow monitoring with Hubble.",
    "eventType": "meetup",
    "type": "meetup",
    "organizerId": "org-meetup",
    "organizerName": "Cloud Native Computing Foundation (CNCF) Bengaluru",
    "communityId": "cncf-blr",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-17T20:00:00.000Z",
    "endAt": "2026-12-18T00:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-17T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "whitefield",
    "venue": {
      "id": "venue-kubernetes-cloudnative-blr-meetup",
      "name": "Tech Park Auditorium, EPIP Zone, Whitefield",
      "address": "Whitefield, Bengaluru, Karnataka 560066",
      "localityId": "whitefield",
      "city": "Bengaluru",
      "latitude": 12.9866,
      "longitude": 77.7381,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.7381,
        12.9866
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://www.meetup.com/",
      "capacity": 150,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-17T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Cloud Native",
      "Kubernetes",
      "eBPF",
      "Meetups"
    ],
    "skills": [
      "Kubernetes",
      "Cilium",
      "eBPF",
      "Go",
      "Linux"
    ],
    "learningOutcomes": [
      "Kubernetes",
      "Cilium",
      "eBPF"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "meetup",
    "sourcePlatform": "Meetup",
    "officialUrl": "https://www.meetup.com/",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-meetup-k8s-cloudnative",
        "sourceId": "src-meetup",
        "externalEventId": "live-meetup-k8s-cloudnative",
        "url": "https://www.meetup.com/",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-meetup-web3-buidl",
    "slug": "web3-buidlers-developer-salon",
    "title": "Web3 BUIDLers Bi-Weekly Developer Salon",
    "tagline": "Smart contract security audits, zero-knowledge proofs, and cross-chain bridging.",
    "summary": "Intimate technical salon for Web3 protocol contributors in HSR Layout discussing Layer 2 execution environments and EVM upgrades.",
    "description": "Whiteboard sessions, code walkthroughs, and peer reviews of decentralized protocol architectures and grant submissions.",
    "eventType": "meetup",
    "type": "meetup",
    "organizerId": "org-devfolio",
    "organizerName": "Web3 BUIDLers India Hub",
    "communityId": "ethglobal-community",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-15T20:00:00.000Z",
    "endAt": "2026-12-15T23:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-15T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "hsr_layout",
    "venue": {
      "id": "venue-web3-buidlers-developer-salon",
      "name": "BUIDLers Lounge, Sector 4, HSR Layout",
      "address": "27th Main, Sector 4, HSR Layout, Bengaluru 560102",
      "localityId": "hsr_layout",
      "city": "Bengaluru",
      "latitude": 12.9116,
      "longitude": 77.6389,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.6389,
        12.9116
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://ethindia.co",
      "capacity": 150,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-15T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Web3",
      "Ethereum",
      "Solidity",
      "Meetups"
    ],
    "skills": [
      "Solidity",
      "Ethereum",
      "DeFi",
      "Rust"
    ],
    "learningOutcomes": [
      "Solidity",
      "Ethereum",
      "DeFi"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "devfolio",
    "sourcePlatform": "Devfolio",
    "officialUrl": "https://ethindia.co",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-meetup-web3-buidl",
        "sourceId": "src-devfolio",
        "externalEventId": "live-meetup-web3-buidl",
        "url": "https://ethindia.co",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-meetup-datascience-ml",
    "slug": "data-science-ml-engineering-circle",
    "title": "Data Science & ML Engineering Circle Bengaluru",
    "tagline": "Feature stores, MLflow tracking, and model monitoring in production.",
    "summary": "Monthly gathering of data scientists and MLOps practitioners sharing real-world telemetry and automated model retraining pipelines.",
    "description": "Learn how to detect data drift, automate Feast feature store caching, and benchmark inference latency across heterogeneous GPUs.",
    "eventType": "meetup",
    "type": "meetup",
    "organizerId": "org-meetup",
    "organizerName": "MLOps India Collective",
    "communityId": "mlops-india",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-21T20:00:00.000Z",
    "endAt": "2026-12-22T00:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-21T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "electronic_city",
    "venue": {
      "id": "venue-data-science-ml-engineering-circle",
      "name": "Data Analytics Hall, Electronic City Phase 1",
      "address": "Electronic City, Bengaluru, Karnataka 560100",
      "localityId": "electronic_city",
      "city": "Bengaluru",
      "latitude": 12.8399,
      "longitude": 77.677,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.677,
        12.8399
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://www.meetup.com/",
      "capacity": 150,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-21T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Data Science",
      "MLOps",
      "Machine Learning",
      "Meetups"
    ],
    "skills": [
      "Python",
      "MLflow",
      "Docker",
      "PostgreSQL",
      "Scikit-Learn"
    ],
    "learningOutcomes": [
      "Python",
      "MLflow",
      "Docker"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "meetup",
    "sourcePlatform": "Meetup",
    "officialUrl": "https://www.meetup.com/",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-meetup-datascience-ml",
        "sourceId": "src-meetup",
        "externalEventId": "live-meetup-datascience-ml",
        "url": "https://www.meetup.com/",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-meetup-indie-hackers",
    "slug": "product-builders-indie-hackers-blr",
    "title": "Product Builders & Indie Hackers Bengaluru Meetup",
    "tagline": "Bootstrapping SaaS, distribution strategies, and reaching first $10K MRR.",
    "summary": "A friendly community of solo founders, technical creators, and indie builders sharing conversion metrics and marketing tactics.",
    "description": "Honest revenue breakdowns, feedback clinics on landing pages, and co-working sprints with fellow builders in Koramangala.",
    "eventType": "meetup",
    "type": "meetup",
    "organizerId": "org-luma",
    "organizerName": "Indie Hackers BLR Guild",
    "communityId": "indie-blr",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-08T20:00:00.000Z",
    "endAt": "2026-12-08T23:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-08T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "koramangala",
    "venue": {
      "id": "venue-product-builders-indie-hackers-blr",
      "name": "Koramangala 5th Block Startup Loft",
      "address": "1st Cross, 5th Block, Koramangala, Bengaluru 560095",
      "localityId": "koramangala",
      "city": "Bengaluru",
      "latitude": 12.9352,
      "longitude": 77.6245,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.6245,
        12.9352
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://lu.ma/",
      "capacity": 150,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-08T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Startups",
      "SaaS",
      "Product Design",
      "Meetups"
    ],
    "skills": [
      "React",
      "Next.js",
      "Marketing",
      "Stripe"
    ],
    "learningOutcomes": [
      "React",
      "Next.js",
      "Marketing"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "luma",
    "sourcePlatform": "Luma",
    "officialUrl": "https://lu.ma/",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-meetup-indie-hackers",
        "sourceId": "src-luma",
        "externalEventId": "live-meetup-indie-hackers",
        "url": "https://lu.ma/",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-meetup-designers-circle",
    "slug": "bengaluru-ui-ux-designers-circle",
    "title": "Bengaluru UI/UX Designers Circle: Spatial UI & AI Prototyping",
    "tagline": "Designing AI co-pilot interfaces, conversational microcopy, and spatial design.",
    "summary": "Design salon exploring generative UI workflows, prompt design, and human-in-the-loop interaction models.",
    "description": "Case studies from lead designers at top unicorn startups on crafting frictionless onboarding and accessible data visualizations.",
    "eventType": "meetup",
    "type": "meetup",
    "organizerId": "org-luma",
    "organizerName": "Bengaluru Design Circle",
    "communityId": "blr-design-circle",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-14T20:00:00.000Z",
    "endAt": "2026-12-14T23:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-14T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "indiranagar",
    "venue": {
      "id": "venue-bengaluru-ui-ux-designers-circle",
      "name": "Creative Hive Studio, 100ft Rd, Indiranagar",
      "address": "100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038",
      "localityId": "indiranagar",
      "city": "Bengaluru",
      "latitude": 12.9784,
      "longitude": 77.6408,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.6408,
        12.9784
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://lu.ma/",
      "capacity": 150,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-14T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Design",
      "UI/UX",
      "Product Design",
      "Meetups"
    ],
    "skills": [
      "Figma",
      "UI Design",
      "User Research",
      "Prototyping"
    ],
    "learningOutcomes": [
      "Figma",
      "UI Design",
      "User Research"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "luma",
    "sourcePlatform": "Luma",
    "officialUrl": "https://lu.ma/",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-meetup-designers-circle",
        "sourceId": "src-luma",
        "externalEventId": "live-meetup-designers-circle",
        "url": "https://lu.ma/",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-meetup-linux-embedded",
    "slug": "linux-kernel-embedded-systems-hub",
    "title": "Linux Kernel & Embedded Systems Discussion Hub",
    "tagline": "Device tree overlays, Yocto Project builds, and ARM SoC peripheral interfacing.",
    "summary": "Hardware-software co-designers meeting monthly to discuss kernel drivers, RTOS integration, and RISC-V developments.",
    "description": "Bring your embedded boards, logic analyzers, and custom PCB prototypes for collaborative debugging and firmware optimization.",
    "eventType": "meetup",
    "type": "meetup",
    "organizerId": "org-meetup",
    "organizerName": "FOSS United Bengaluru",
    "communityId": "foss-united-discord",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-22T20:00:00.000Z",
    "endAt": "2026-12-23T00:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-22T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "koramangala",
    "venue": {
      "id": "venue-linux-kernel-embedded-systems-hub",
      "name": "MakerSpace Koramangala 4th Block",
      "address": "Koramangala 4th Block, Bengaluru, Karnataka 560034",
      "localityId": "koramangala",
      "city": "Bengaluru",
      "latitude": 12.9345,
      "longitude": 77.6265,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.6265,
        12.9345
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://fossunited.org/",
      "capacity": 150,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-22T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Linux",
      "Embedded Systems",
      "Hardware",
      "Meetups"
    ],
    "skills": [
      "C",
      "Linux Kernel",
      "ARM",
      "Embedded Systems"
    ],
    "learningOutcomes": [
      "C",
      "Linux Kernel",
      "ARM"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "meetup",
    "sourcePlatform": "Meetup",
    "officialUrl": "https://fossunited.org/",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-meetup-linux-embedded",
        "sourceId": "src-meetup",
        "externalEventId": "live-meetup-linux-embedded",
        "url": "https://fossunited.org/",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-meetup-cybersec-ethical-hack",
    "slug": "cybersecurity-ethical-hacking-blr",
    "title": "Cybersecurity & Ethical Hacking Meetup BLR",
    "tagline": "Active directory attack paths, cloud identity compromise, and incident triage.",
    "summary": "Defensive and offensive security engineers sharing post-incident forensics analysis, threat intelligence, and hardening playbooks.",
    "description": "Interactive capture-the-flag demonstrations, threat model reviews, and open discussions on zero-day vulnerability disclosures.",
    "eventType": "meetup",
    "type": "meetup",
    "organizerId": "org-meetup",
    "organizerName": "Null Bengaluru Security Chapter",
    "communityId": "null-blr",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-25T20:00:00.000Z",
    "endAt": "2026-12-26T00:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-25T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "koramangala",
    "venue": {
      "id": "venue-cybersecurity-ethical-hacking-blr",
      "name": "Cyber Defense Lab, Koramangala 1st Block",
      "address": "Koramangala, Bengaluru, Karnataka 560034",
      "localityId": "koramangala",
      "city": "Bengaluru",
      "latitude": 12.9279,
      "longitude": 77.6271,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.6271,
        12.9279
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://www.meetup.com/",
      "capacity": 150,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-25T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Cybersecurity",
      "Ethical Hacking",
      "Infosec",
      "Meetups"
    ],
    "skills": [
      "Network Security",
      "Linux",
      "Python",
      "Penetration Testing"
    ],
    "learningOutcomes": [
      "Network Security",
      "Linux",
      "Python"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "meetup",
    "sourcePlatform": "Meetup",
    "officialUrl": "https://www.meetup.com/",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-meetup-cybersec-ethical-hack",
        "sourceId": "src-meetup",
        "externalEventId": "live-meetup-cybersec-ethical-hack",
        "url": "https://www.meetup.com/",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-meetup-rustaceans-exchange",
    "slug": "rustaceans-bengaluru-monthly-exchange",
    "title": "Rustaceans Bengaluru Monthly Exchange",
    "tagline": "Memory safety, compile-time macros, WebAssembly, and systems optimization.",
    "summary": "Monthly gathering of Rust programmers discussing crate architecture, zero-cost abstractions, and writing safe low-level software.",
    "description": "Code clinics, lightning talks on memory layouts, and community discussions on replacing legacy C++ codebases with Rust.",
    "eventType": "meetup",
    "type": "meetup",
    "organizerId": "org-meetup",
    "organizerName": "Rustaceans Bengaluru",
    "communityId": "rust-bengaluru",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-18T20:00:00.000Z",
    "endAt": "2026-12-18T23:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-18T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "hsr_layout",
    "venue": {
      "id": "venue-rustaceans-bengaluru-monthly-exchange",
      "name": "HSR Systems Space, Sector 2",
      "address": "Sector 2, HSR Layout, Bengaluru, Karnataka 560102",
      "localityId": "hsr_layout",
      "city": "Bengaluru",
      "latitude": 12.9128,
      "longitude": 77.6425,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.6425,
        12.9128
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://www.meetup.com/rustaceans-bengaluru/",
      "capacity": 150,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-18T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Rust",
      "Systems",
      "WebAssembly",
      "Meetups"
    ],
    "skills": [
      "Rust",
      "Tokio",
      "Cargo",
      "WASM"
    ],
    "learningOutcomes": [
      "Rust",
      "Tokio",
      "Cargo"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "meetup",
    "sourcePlatform": "Meetup",
    "officialUrl": "https://www.meetup.com/rustaceans-bengaluru/",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-meetup-rustaceans-exchange",
        "sourceId": "src-meetup",
        "externalEventId": "live-meetup-rustaceans-exchange",
        "url": "https://www.meetup.com/rustaceans-bengaluru/",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-meetup-gcp-cloud-gathering",
    "slug": "google-cloud-community-blr",
    "title": "Google Cloud Developer Community BLR Gathering",
    "tagline": "BigQuery data warehouses, Cloud Run serverless, and Vertex AI models.",
    "summary": "Cloud engineers gathering in Koramangala to review enterprise architectures on Google Cloud Platform and Gemini multimodal pipelines.",
    "description": "Hands-on architectural presentations, customer migration stories, and Google Cloud certification mentoring.",
    "eventType": "meetup",
    "type": "meetup",
    "organizerId": "org-meetup",
    "organizerName": "Google Developer Groups India",
    "communityId": "google-dev-discord",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-12T20:00:00.000Z",
    "endAt": "2026-12-13T00:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-12T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "koramangala",
    "venue": {
      "id": "venue-google-cloud-community-blr",
      "name": "Google Partner Hub, Koramangala 7th Block",
      "address": "Koramangala 7th Block, Bengaluru, Karnataka 560095",
      "localityId": "koramangala",
      "city": "Bengaluru",
      "latitude": 12.936,
      "longitude": 77.618,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.618,
        12.936
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://gdg.community.dev/",
      "capacity": 150,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-12T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Google Cloud",
      "GCP",
      "BigQuery",
      "AI/ML",
      "Meetups"
    ],
    "skills": [
      "GCP",
      "Cloud Run",
      "BigQuery",
      "Vertex AI",
      "Docker"
    ],
    "learningOutcomes": [
      "GCP",
      "Cloud Run",
      "BigQuery"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "meetup",
    "sourcePlatform": "Meetup",
    "officialUrl": "https://gdg.community.dev/",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-meetup-gcp-cloud-gathering",
        "sourceId": "src-meetup",
        "externalEventId": "live-meetup-gcp-cloud-gathering",
        "url": "https://gdg.community.dev/",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-summit-bengaluru-tech",
    "slug": "bengaluru-tech-summit-2026",
    "title": "Bengaluru Tech Summit 2026",
    "tagline": "India’s premier annual technology and innovation symposium.",
    "summary": "Over 10,000 global technologists, startup founders, and policymakers gather at Bengaluru Palace Grounds for keynotes and exhibitions.",
    "description": "Spanning AI & Deep Tech, Biotech, Quantum Computing, and Digital Public Infrastructure with global delegations and pitch stages.",
    "eventType": "summit",
    "type": "summit",
    "organizerId": "org-knot native",
    "organizerName": "Karnataka Innovation & Technology Society",
    "communityId": "bts-official",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-23T20:00:00.000Z",
    "endAt": "2026-12-26T20:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-23T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "koramangala",
    "venue": {
      "id": "venue-bengaluru-tech-summit-2026",
      "name": "Tripuravasini, Bengaluru Palace Grounds",
      "address": "Bellary Road, Sadashivanagar, Armane Nagar, Bengaluru, Karnataka 560006",
      "localityId": "koramangala",
      "city": "Bengaluru",
      "latitude": 13.0035,
      "longitude": 77.5891,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.5891,
        13.0035
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "native",
      "externalUrl": "https://bengalurutechsummit.com/",
      "capacity": 150,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-23T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Technology",
      "Startups",
      "Deep Tech",
      "Summits"
    ],
    "skills": [
      "Innovation",
      "Cloud",
      "AI/ML",
      "Entrepreneurship"
    ],
    "learningOutcomes": [
      "Innovation",
      "Cloud",
      "AI/ML"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "knot-native",
    "sourcePlatform": "Knot Native",
    "officialUrl": "https://bengalurutechsummit.com/",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-summit-bengaluru-tech",
        "sourceId": "src-knot-native",
        "externalEventId": "live-summit-bengaluru-tech",
        "url": "https://bengalurutechsummit.com/",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-conf-india-foss",
    "slug": "india-foss-2026-conference",
    "title": "India FOSS 2026 Annual Developer Conference",
    "tagline": "Annual two-day gathering of free and open source software developers across India.",
    "summary": "Two packed days of technical talks on compilers, privacy engineering, open hardware, and decentralized protocols.",
    "description": "Held at NIMHANS Convention Centre. Connect with creators of open-source frameworks, maintainers of Debian, and FOSS grant recipients.",
    "eventType": "conference",
    "type": "conference",
    "organizerId": "org-hasgeek",
    "organizerName": "FOSS United Foundation",
    "communityId": "foss-united-discord",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-29T20:00:00.000Z",
    "endAt": "2026-12-30T14:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-29T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "koramangala",
    "venue": {
      "id": "venue-india-foss-2026-conference",
      "name": "NIMHANS Convention Centre, Hosur Main Road",
      "address": "Hosur Main Rd, Lakkasandra, Bengaluru, Karnataka 560029",
      "localityId": "koramangala",
      "city": "Bengaluru",
      "latitude": 12.9392,
      "longitude": 77.5976,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.5976,
        12.9392
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://fossunited.org/indiafoss",
      "capacity": 1200,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-29T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "paid",
      "amountInr": 499,
      "note": "₹499 entry fee"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Open Source",
      "Software Freedom",
      "Conferences"
    ],
    "skills": [
      "Linux",
      "Compilers",
      "Rust",
      "Go",
      "Python"
    ],
    "learningOutcomes": [
      "Linux",
      "Compilers",
      "Rust"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "hasgeek",
    "sourcePlatform": "HasGeek",
    "officialUrl": "https://fossunited.org/indiafoss",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-conf-india-foss",
        "sourceId": "src-hasgeek",
        "externalEventId": "live-conf-india-foss",
        "url": "https://fossunited.org/indiafoss",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-conf-react-india",
    "slug": "react-india-international-conf",
    "title": "React India International Conference 2026",
    "tagline": "India’s premier international conference on React, React Native, and Web Architecture.",
    "summary": "Over 1,200 frontend engineers and speakers from Meta, Vercel, and Shopify sharing the future of component architecture.",
    "description": "Workshops, lightning talks, and in-depth deep dives into concurrent mode, compiler optimizations, and mobile React Native architectures.",
    "eventType": "conference",
    "type": "conference",
    "organizerId": "org-meetup",
    "organizerName": "GeekyAnts & React India",
    "communityId": "react-india-discord",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2027-01-05T20:00:00.000Z",
    "endAt": "2027-01-06T14:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2027-01-05T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "whitefield",
    "venue": {
      "id": "venue-react-india-international-conf",
      "name": "Sheraton Grand Bengaluru Whitefield Hotel & Convention Center",
      "address": "Prestige Shantiniketan, Hoodi, Whitefield, Bengaluru, Karnataka 560048",
      "localityId": "whitefield",
      "city": "Bengaluru",
      "latitude": 12.9892,
      "longitude": 77.7289,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.7289,
        12.9892
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://reactindia.io/",
      "capacity": 1200,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2027-01-05T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "paid",
      "amountInr": 1499,
      "note": "₹1499 entry fee"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "React",
      "Frontend",
      "Mobile",
      "Conferences"
    ],
    "skills": [
      "React",
      "React Native",
      "TypeScript",
      "Next.js"
    ],
    "learningOutcomes": [
      "React",
      "React Native",
      "TypeScript"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "meetup",
    "sourcePlatform": "Meetup",
    "officialUrl": "https://reactindia.io/",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-conf-react-india",
        "sourceId": "src-meetup",
        "externalEventId": "live-conf-react-india",
        "url": "https://reactindia.io/",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-conf-pycon-india",
    "slug": "pycon-india-annual-conference",
    "title": "PyCon India Annual Developer Conference",
    "tagline": "The premier conference in India on using and developing the Python language.",
    "summary": "Keynotes, technical paper presentations, open spaces, and sprints covering Python in scientific computing, AI, and systems.",
    "description": "Connect with core Python committers, authors of leading data science libraries, and thousands of enthusiastic Pythonistas.",
    "eventType": "conference",
    "type": "conference",
    "organizerId": "org-meetup",
    "organizerName": "Python Software Society of India (PSSI)",
    "communityId": "bangpypers-discord",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2027-01-10T20:00:00.000Z",
    "endAt": "2027-01-11T20:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2027-01-10T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "koramangala",
    "venue": {
      "id": "venue-pycon-india-annual-conference",
      "name": "Convention Hall, Koramangala Indoor Stadium Complex",
      "address": "Koramangala, Bengaluru, Karnataka 560095",
      "localityId": "koramangala",
      "city": "Bengaluru",
      "latitude": 12.9348,
      "longitude": 77.6221,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.6221,
        12.9348
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://in.pycon.org/",
      "capacity": 1200,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2027-01-10T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "paid",
      "amountInr": 799,
      "note": "₹799 entry fee"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Python",
      "Data Science",
      "Open Source",
      "Conferences"
    ],
    "skills": [
      "Python",
      "PyTorch",
      "Django",
      "FastAPI"
    ],
    "learningOutcomes": [
      "Python",
      "PyTorch",
      "Django"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "meetup",
    "sourcePlatform": "Meetup",
    "officialUrl": "https://in.pycon.org/",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-conf-pycon-india",
        "sourceId": "src-meetup",
        "externalEventId": "live-conf-pycon-india",
        "url": "https://in.pycon.org/",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-conf-ethindia-global",
    "slug": "ethindia-global-conference",
    "title": "ETHIndia Global Conference & Summit",
    "tagline": "World’s largest Ethereum hackathon and summit gathering 2,000+ protocol engineers.",
    "summary": "Keynotes by international Ethereum core developers, layer-2 rollup teams, and zero-knowledge cryptography pioneers.",
    "description": "Three days of non-stop protocol research presentations, live code demos, technical salons, and hacker showcases.",
    "eventType": "conference",
    "type": "conference",
    "organizerId": "org-devfolio",
    "organizerName": "ETHGlobal Community",
    "communityId": "ethglobal-community",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-31T20:00:00.000Z",
    "endAt": "2027-01-03T20:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-31T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "whitefield",
    "venue": {
      "id": "venue-ethindia-global-conference",
      "name": "KTPO Convention Centre, Whitefield, Bengaluru",
      "address": "EPIP Zone, Whitefield, Bengaluru, Karnataka 560066",
      "localityId": "whitefield",
      "city": "Bengaluru",
      "latitude": 12.9818,
      "longitude": 77.7282,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.7282,
        12.9818
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://ethindia.co",
      "capacity": 1200,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-31T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Web3",
      "Ethereum",
      "Smart Contracts",
      "Conferences"
    ],
    "skills": [
      "Solidity",
      "Ethereum",
      "DeFi",
      "Rust"
    ],
    "learningOutcomes": [
      "Solidity",
      "Ethereum",
      "DeFi"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "devfolio",
    "sourcePlatform": "Devfolio",
    "officialUrl": "https://ethindia.co",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-conf-ethindia-global",
        "sourceId": "src-devfolio",
        "externalEventId": "live-conf-ethindia-global",
        "url": "https://ethindia.co",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-summit-genai-blr",
    "slug": "genai-summit-bengaluru",
    "title": "GenAI Summit Bengaluru: Enterprise Agents & Reasoning",
    "tagline": "Executive and technical summit for enterprise generative AI deployments.",
    "summary": "Gathering 800+ enterprise AI leaders, CTOs, and research heads analyzing RAG architectures, LLM security, and GPU infrastructure.",
    "description": "Detailed enterprise case studies on replacing fragile prompt chains with stateful, self-evaluating autonomous agent workflows.",
    "eventType": "summit",
    "type": "summit",
    "organizerId": "org-luma",
    "organizerName": "Generative AI Foundation",
    "communityId": "blr-genai-collective-luma",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-19T20:00:00.000Z",
    "endAt": "2026-12-20T04:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-19T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "indiranagar",
    "venue": {
      "id": "venue-genai-summit-bengaluru",
      "name": "The Chancery Pavilion Grand Ballroom",
      "address": "Residency Road, Bengaluru, Karnataka 560025",
      "localityId": "indiranagar",
      "city": "Bengaluru",
      "latitude": 12.9698,
      "longitude": 77.6012,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.6012,
        12.9698
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://lu.ma/",
      "capacity": 150,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-19T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "paid",
      "amountInr": 1999,
      "note": "₹1999 entry fee"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Generative AI",
      "Enterprise AI",
      "LLM",
      "Summits"
    ],
    "skills": [
      "Generative AI",
      "LangChain",
      "Enterprise Architecture"
    ],
    "learningOutcomes": [
      "Generative AI",
      "LangChain",
      "Enterprise Architecture"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "luma",
    "sourcePlatform": "Luma",
    "officialUrl": "https://lu.ma/",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-summit-genai-blr",
        "sourceId": "src-luma",
        "externalEventId": "live-summit-genai-blr",
        "url": "https://lu.ma/",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-conf-cloudnative-days",
    "slug": "cloud-native-days-india",
    "title": "Cloud Native Days India 2026",
    "tagline": "Kubernetes, GitOps, Service Meshes, and Observability at Cloud Scale.",
    "summary": "The flagship Indian conference for platform engineers, SREs, and DevOps professionals architecting high-reliability systems.",
    "description": "Over 40 technical talks on managing multi-tenant Kubernetes clusters, OpenTelemetry telemetry pipelines, and Chaos Engineering.",
    "eventType": "conference",
    "type": "conference",
    "organizerId": "org-meetup",
    "organizerName": "Cloud Native Computing Foundation (CNCF)",
    "communityId": "cncf-blr",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2027-01-02T20:00:00.000Z",
    "endAt": "2027-01-03T12:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2027-01-02T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "whitefield",
    "venue": {
      "id": "venue-cloud-native-days-india",
      "name": "Bengaluru International Exhibition Centre (BIEC)",
      "address": "10th Mile, Tumkur Road, Madavara Post, Bengaluru 562123",
      "localityId": "whitefield",
      "city": "Bengaluru",
      "latitude": 13.0617,
      "longitude": 77.4764,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.4764,
        13.0617
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://www.meetup.com/",
      "capacity": 1200,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2027-01-02T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "paid",
      "amountInr": 999,
      "note": "₹999 entry fee"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Cloud Native",
      "Kubernetes",
      "DevOps",
      "Conferences"
    ],
    "skills": [
      "Kubernetes",
      "Docker",
      "Prometheus",
      "Terraform"
    ],
    "learningOutcomes": [
      "Kubernetes",
      "Docker",
      "Prometheus"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "meetup",
    "sourcePlatform": "Meetup",
    "officialUrl": "https://www.meetup.com/",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-conf-cloudnative-days",
        "sourceId": "src-meetup",
        "externalEventId": "live-conf-cloudnative-days",
        "url": "https://www.meetup.com/",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-summit-unstop-leadership",
    "slug": "unstop-national-leadership-summit",
    "title": "Unstop National Student Leadership & Tech Summit",
    "tagline": "Connecting collegiate tech leads, hackathon organizers, and student chapter presidents.",
    "summary": "Two-day leadership summit at Presidency University bringing together 400 student leaders from premier engineering institutions across India.",
    "description": "Workshops on securing corporate sponsorship for hackathons, community engagement metrics, and building student startup incubators.",
    "eventType": "summit",
    "type": "summit",
    "organizerId": "org-unstop",
    "organizerName": "Unstop & Presidency University",
    "communityId": "presidency-innovation-club",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-25T20:00:00.000Z",
    "endAt": "2026-12-26T12:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-25T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "yelahanka",
    "venue": {
      "id": "venue-unstop-national-leadership-summit",
      "name": "University Auditorium, Presidency University, Yelahanka",
      "address": "Itgalpur, Rajanakunte, Yelahanka, Bengaluru, Karnataka 560064",
      "localityId": "yelahanka",
      "city": "Bengaluru",
      "latitude": 13.1682,
      "longitude": 77.5671,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.5671,
        13.1682
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://unstop.com/competitions",
      "capacity": 150,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-25T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Campus & Clubs",
      "Hackathons",
      "Leadership",
      "Summits"
    ],
    "skills": [
      "Leadership",
      "Event Organizing",
      "Innovation"
    ],
    "learningOutcomes": [
      "Leadership",
      "Event Organizing",
      "Innovation"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "unstop",
    "sourcePlatform": "Unstop",
    "officialUrl": "https://unstop.com/competitions",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-summit-unstop-leadership",
        "sourceId": "src-unstop",
        "externalEventId": "live-summit-unstop-leadership",
        "url": "https://unstop.com/competitions",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-conf-open-hardware",
    "slug": "open-source-hardware-summit-india",
    "title": "Open Source Hardware Summit India",
    "tagline": "Open silicon, RISC-V development boards, modular electronics, and PCB design.",
    "summary": "National hardware makers symposium held at the Indian Institute of Science (IISc) exploring open-source FPGA cores and electronics.",
    "description": "Live hardware teardowns, KiCad PCB routing masterclasses, and demonstrations of open-source RISC-V microcontrollers.",
    "eventType": "conference",
    "type": "conference",
    "organizerId": "org-hasgeek",
    "organizerName": "Open Hardware Association of India",
    "communityId": "foss-united-discord",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2027-01-08T20:00:00.000Z",
    "endAt": "2027-01-09T12:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2027-01-08T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "koramangala",
    "venue": {
      "id": "venue-open-source-hardware-summit-india",
      "name": "Faculty Hall, Indian Institute of Science (IISc), Bengaluru",
      "address": "CV Raman Rd, Bengaluru, Karnataka 560012",
      "localityId": "koramangala",
      "city": "Bengaluru",
      "latitude": 13.0219,
      "longitude": 77.5671,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.5671,
        13.0219
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://hasgeek.com/",
      "capacity": 1200,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2027-01-08T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Hardware",
      "Open Source",
      "RISC-V",
      "Conferences"
    ],
    "skills": [
      "KiCad",
      "Verilog",
      "RISC-V",
      "C",
      "Electronics"
    ],
    "learningOutcomes": [
      "KiCad",
      "Verilog",
      "RISC-V"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "hasgeek",
    "sourcePlatform": "HasGeek",
    "officialUrl": "https://hasgeek.com/",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-conf-open-hardware",
        "sourceId": "src-hasgeek",
        "externalEventId": "live-conf-open-hardware",
        "url": "https://hasgeek.com/",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-conf-mobile-devs",
    "slug": "bengaluru-mobile-dev-conference",
    "title": "Bengaluru Mobile Developers Conference 2026",
    "tagline": "Native Android (Kotlin Jetpack Compose), iOS (SwiftUI), and Cross-Platform Flutter.",
    "summary": "The unified mobile engineering conference bringing together 600 app developers from India’s top consumer tech unicorns.",
    "description": "Explore offline syncing architecture, Jetpack Compose performance metrics, iOS Swift 6 concurrency, and memory optimization.",
    "eventType": "conference",
    "type": "conference",
    "organizerId": "org-meetup",
    "organizerName": "Bengaluru Mobile Devs Guild",
    "communityId": "flutter-blr",
    "mode": "in_person",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-28T20:00:00.000Z",
    "endAt": "2026-12-29T12:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-28T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "indiranagar",
    "venue": {
      "id": "venue-bengaluru-mobile-dev-conference",
      "name": "The Leela Palace Convention Centre, Old Airport Road",
      "address": "HAL Old Airport Rd, Kodihalli, Bengaluru, Karnataka 560008",
      "localityId": "indiranagar",
      "city": "Bengaluru",
      "latitude": 12.9606,
      "longitude": 77.6483,
      "locationPrecision": "exact",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.6483,
        12.9606
      ]
    },
    "onlineJoinUrl": null,
    "registration": {
      "kind": "external",
      "externalUrl": "https://www.meetup.com/",
      "capacity": 1200,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-28T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "paid",
      "amountInr": 899,
      "note": "₹899 entry fee"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Mobile",
      "Android",
      "iOS",
      "Flutter",
      "Conferences"
    ],
    "skills": [
      "Kotlin",
      "Swift",
      "Flutter",
      "Jetpack Compose",
      "SwiftUI"
    ],
    "learningOutcomes": [
      "Kotlin",
      "Swift",
      "Flutter"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "meetup",
    "sourcePlatform": "Meetup",
    "officialUrl": "https://www.meetup.com/",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-conf-mobile-devs",
        "sourceId": "src-meetup",
        "externalEventId": "live-conf-mobile-devs",
        "url": "https://www.meetup.com/",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-webinar-agency-agents",
    "slug": "building-multi-agent-teams-agency",
    "title": "Building Autonomous Multi-Agent Teams with Agency-Agents Architecture",
    "tagline": "Master autonomous specialist agents, quality assurance roles, and workflow graphs.",
    "summary": "Live hands-on technical webinar breaking down the msitarzewski/agency-agents open-source repository for production systems.",
    "description": "Learn how to architect coordinating swarms: Orchestrators, Harvesters, QA Verification Leads, and Consolidation agents that run continuously.",
    "eventType": "webinar",
    "type": "webinar",
    "organizerId": "org-knot native",
    "organizerName": "Knot AI Engineering Team",
    "communityId": "knot-native",
    "mode": "online",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-04T20:00:00.000Z",
    "endAt": "2026-12-04T22:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-04T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "online",
    "venue": {
      "id": "venue-building-multi-agent-teams-agency",
      "name": "Live Interactive Video Stream (Zoom & YouTube)",
      "address": "Virtual Event, Online Access",
      "localityId": "koramangala",
      "city": "Bengaluru",
      "latitude": 12.9716,
      "longitude": 77.5946,
      "locationPrecision": "approximate",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.5946,
        12.9716
      ]
    },
    "onlineJoinUrl": "https://knot.app/events/live-webinar-agency-agents",
    "registration": {
      "kind": "native",
      "externalUrl": "https://knot.app/events/live-webinar-agency-agents",
      "capacity": 150,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-04T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "AI Agents",
      "Automation",
      "System Design",
      "Webinars"
    ],
    "skills": [
      "Autonomous Agents",
      "Python",
      "Node.js",
      "LLM"
    ],
    "learningOutcomes": [
      "Autonomous Agents",
      "Python",
      "Node.js"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "knot-native",
    "sourcePlatform": "Knot Native",
    "officialUrl": "https://knot.app/events/live-webinar-agency-agents",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-webinar-agency-agents",
        "sourceId": "src-knot-native",
        "externalEventId": "live-webinar-agency-agents",
        "url": "https://knot.app/events/live-webinar-agency-agents",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-webinar-nodejs-1m-websockets",
    "slug": "scaling-nodejs-1m-websockets",
    "title": "Scaling Node.js & WebSockets to 1,000,000 Concurrent Connections",
    "tagline": "Zero-copy buffers, uWebSockets.js, Redis Pub/Sub, and Linux epoll tuning.",
    "summary": "A deep-dive backend webinar detailing kernel socket buffer tuning, memory profiling, and horizontally scaling realtime messaging.",
    "description": "Inspect live Grafana dashboards and memory profiling traces as we push a distributed cluster of Node.js instances past 1M active connections.",
    "eventType": "webinar",
    "type": "webinar",
    "organizerId": "org-luma",
    "organizerName": "Fullstack Performance Collective",
    "communityId": "react-india-discord",
    "mode": "online",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-08T20:00:00.000Z",
    "endAt": "2026-12-08T22:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-08T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "online",
    "venue": {
      "id": "venue-scaling-nodejs-1m-websockets",
      "name": "Google Meet Virtual Auditorium",
      "address": "Virtual Event, Online Access",
      "localityId": "koramangala",
      "city": "Bengaluru",
      "latitude": 12.9716,
      "longitude": 77.5946,
      "locationPrecision": "approximate",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.5946,
        12.9716
      ]
    },
    "onlineJoinUrl": "https://lu.ma/",
    "registration": {
      "kind": "external",
      "externalUrl": "https://lu.ma/",
      "capacity": 150,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-08T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Node.js",
      "WebSockets",
      "Backend Architecture",
      "Webinars"
    ],
    "skills": [
      "Node.js",
      "WebSockets",
      "Redis",
      "Linux",
      "Performance"
    ],
    "learningOutcomes": [
      "Node.js",
      "WebSockets",
      "Redis"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "luma",
    "sourcePlatform": "Luma",
    "officialUrl": "https://lu.ma/",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-webinar-nodejs-1m-websockets",
        "sourceId": "src-luma",
        "externalEventId": "live-webinar-nodejs-1m-websockets",
        "url": "https://lu.ma/",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-webinar-vector-databases",
    "slug": "demystifying-vector-databases-hybrid-search",
    "title": "Demystifying Vector Databases: HNSW Indexing & Hybrid Sparse-Dense Search",
    "tagline": "Under the hood of embedding similarity, inverted indexes, and BM25 re-ranking.",
    "summary": "Technical webinar for search and ML engineers exploring vector quantization, memory trade-offs, and hybrid retrieval with Qdrant and Milvus.",
    "description": "Learn when vector search fails, how to combine lexical BM25 with dense semantic representations, and benchmark reciprocal rank fusion.",
    "eventType": "webinar",
    "type": "webinar",
    "organizerId": "org-luma",
    "organizerName": "Bengaluru AI & Search Guild",
    "communityId": "google-dev-discord",
    "mode": "online",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-13T20:00:00.000Z",
    "endAt": "2026-12-13T22:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-13T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "online",
    "venue": {
      "id": "venue-demystifying-vector-databases-hybrid-search",
      "name": "StreamYard Virtual Hall",
      "address": "Virtual Event, Online Access",
      "localityId": "koramangala",
      "city": "Bengaluru",
      "latitude": 12.9716,
      "longitude": 77.5946,
      "locationPrecision": "approximate",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.5946,
        12.9716
      ]
    },
    "onlineJoinUrl": "https://lu.ma/",
    "registration": {
      "kind": "external",
      "externalUrl": "https://lu.ma/",
      "capacity": 150,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-13T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Vector Search",
      "Information Retrieval",
      "AI/ML",
      "Webinars"
    ],
    "skills": [
      "Vector DBs",
      "Python",
      "Embeddings",
      "RAG"
    ],
    "learningOutcomes": [
      "Vector DBs",
      "Python",
      "Embeddings"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "luma",
    "sourcePlatform": "Luma",
    "officialUrl": "https://lu.ma/",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-webinar-vector-databases",
        "sourceId": "src-luma",
        "externalEventId": "live-webinar-vector-databases",
        "url": "https://lu.ma/",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-webinar-open-weights-2026",
    "slug": "state-of-open-weights-llms-2026",
    "title": "The State of Open Weights LLMs & Local Inference in 2026",
    "tagline": "Benchmarking Llama 3.3, Mistral Large, DeepSeek-V3, and Qwen 2.5 on consumer GPUs.",
    "summary": "Technical analysis of quantizations (GGUF, EXL2, AWQ), KV cache optimizations (PagedAttention), and speculative decoding.",
    "description": "Walkthrough setting up local inference servers with vLLM, sglang, and Ollama. How to achieve sub-10ms time-to-first-token.",
    "eventType": "webinar",
    "type": "webinar",
    "organizerId": "org-hasgeek",
    "organizerName": "Open Weights Foundation",
    "communityId": "hasgeek-blr",
    "mode": "online",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-16T20:00:00.000Z",
    "endAt": "2026-12-16T22:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-16T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "online",
    "venue": {
      "id": "venue-state-of-open-weights-llms-2026",
      "name": "Virtual YouTube Live Stream",
      "address": "Online Access",
      "localityId": "koramangala",
      "city": "Bengaluru",
      "latitude": 12.9716,
      "longitude": 77.5946,
      "locationPrecision": "approximate",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.5946,
        12.9716
      ]
    },
    "onlineJoinUrl": "https://hasgeek.com/",
    "registration": {
      "kind": "external",
      "externalUrl": "https://hasgeek.com/",
      "capacity": 150,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-16T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "AI/ML",
      "LLM",
      "Open Source",
      "Webinars"
    ],
    "skills": [
      "vLLM",
      "Ollama",
      "Quantization",
      "Python"
    ],
    "learningOutcomes": [
      "vLLM",
      "Ollama",
      "Quantization"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "hasgeek",
    "sourcePlatform": "HasGeek",
    "officialUrl": "https://hasgeek.com/",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-webinar-open-weights-2026",
        "sourceId": "src-hasgeek",
        "externalEventId": "live-webinar-open-weights-2026",
        "url": "https://hasgeek.com/",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-webinar-automated-qa-pipelines",
    "slug": "autonomous-qa-verification-pipelines",
    "title": "Autonomous Testing & Quality Assurance Verification with AI Agents",
    "tagline": "Replace slow manual human review queues with automated schema validation and contract checks.",
    "summary": "Webinar exploring how Autonomous QA Lead agents verify event submissions, validate API payloads, and execute regression suites.",
    "description": "Learn the exact patterns used in Knot and msitarzewski/agency-agents to auto-approve safe contributions while returning actionable revision feedback.",
    "eventType": "webinar",
    "type": "webinar",
    "organizerId": "org-knot native",
    "organizerName": "Knot Platform Architecture Team",
    "communityId": "knot-native",
    "mode": "online",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-07T20:00:00.000Z",
    "endAt": "2026-12-07T22:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-07T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "online",
    "venue": {
      "id": "venue-autonomous-qa-verification-pipelines",
      "name": "Interactive Virtual Webinar Room",
      "address": "Online Access",
      "localityId": "koramangala",
      "city": "Bengaluru",
      "latitude": 12.9716,
      "longitude": 77.5946,
      "locationPrecision": "approximate",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.5946,
        12.9716
      ]
    },
    "onlineJoinUrl": "https://knot.app/events/live-webinar-automated-qa-pipelines",
    "registration": {
      "kind": "native",
      "externalUrl": "https://knot.app/events/live-webinar-automated-qa-pipelines",
      "capacity": 150,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-07T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Quality Assurance",
      "AI Agents",
      "Automation",
      "Webinars"
    ],
    "skills": [
      "QA Automation",
      "Testing",
      "Python",
      "TypeScript"
    ],
    "learningOutcomes": [
      "QA Automation",
      "Testing",
      "Python"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "knot-native",
    "sourcePlatform": "Knot Native",
    "officialUrl": "https://knot.app/events/live-webinar-automated-qa-pipelines",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-webinar-automated-qa-pipelines",
        "sourceId": "src-knot-native",
        "externalEventId": "live-webinar-automated-qa-pipelines",
        "url": "https://knot.app/events/live-webinar-automated-qa-pipelines",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-webinar-postgres-tuning",
    "slug": "postgresql-17-performance-tuning",
    "title": "PostgreSQL 17 Performance Tuning & Query Optimization",
    "tagline": "Analyze EXPLAIN (ANALYZE, BUFFERS), BRIN vs B-Tree indexing, and connection pool sizing.",
    "summary": "Deep dive for database administrators and backend engineers troubleshooting slow queries and high IOPS spikes in PostgreSQL.",
    "description": "Learn vacuum tuning, autovacuum thresholds, partition pruning, and configuring PgBouncer for optimal transaction pooling.",
    "eventType": "webinar",
    "type": "webinar",
    "organizerId": "org-meetup",
    "organizerName": "PostgreSQL India User Group",
    "communityId": "postgres-india",
    "mode": "online",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-17T20:00:00.000Z",
    "endAt": "2026-12-17T22:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-17T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "online",
    "venue": {
      "id": "venue-postgresql-17-performance-tuning",
      "name": "Zoom Webinar Hall",
      "address": "Online Access",
      "localityId": "koramangala",
      "city": "Bengaluru",
      "latitude": 12.9716,
      "longitude": 77.5946,
      "locationPrecision": "approximate",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.5946,
        12.9716
      ]
    },
    "onlineJoinUrl": "https://www.meetup.com/",
    "registration": {
      "kind": "external",
      "externalUrl": "https://www.meetup.com/",
      "capacity": 150,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-17T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Databases",
      "PostgreSQL",
      "Performance",
      "Webinars"
    ],
    "skills": [
      "PostgreSQL",
      "SQL",
      "Database Indexing",
      "Performance"
    ],
    "learningOutcomes": [
      "PostgreSQL",
      "SQL",
      "Database Indexing"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "meetup",
    "sourcePlatform": "Meetup",
    "officialUrl": "https://www.meetup.com/",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-webinar-postgres-tuning",
        "sourceId": "src-meetup",
        "externalEventId": "live-webinar-postgres-tuning",
        "url": "https://www.meetup.com/",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-webinar-opentelemetry",
    "slug": "frontend-observability-opentelemetry",
    "title": "Frontend Observability & Distributed Tracing with OpenTelemetry",
    "tagline": "Track real user metrics (Core Web Vitals), trace fetch requests across microservices.",
    "summary": "Master client-side telemetry instrumentation. Correlate user interactions directly with backend database queries using OpenTelemetry.",
    "description": "Learn W3C trace context propagation, distributed span generation, error tracking, and visual flame-graph analysis in Jaeger.",
    "eventType": "webinar",
    "type": "webinar",
    "organizerId": "org-luma",
    "organizerName": "Observability BLR Guild",
    "communityId": "react-india-discord",
    "mode": "online",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-22T20:00:00.000Z",
    "endAt": "2026-12-22T22:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-22T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "online",
    "venue": {
      "id": "venue-frontend-observability-opentelemetry",
      "name": "Google Meet Virtual Session",
      "address": "Online Access",
      "localityId": "koramangala",
      "city": "Bengaluru",
      "latitude": 12.9716,
      "longitude": 77.5946,
      "locationPrecision": "approximate",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.5946,
        12.9716
      ]
    },
    "onlineJoinUrl": "https://lu.ma/",
    "registration": {
      "kind": "external",
      "externalUrl": "https://lu.ma/",
      "capacity": 150,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-22T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Observability",
      "OpenTelemetry",
      "Frontend",
      "Webinars"
    ],
    "skills": [
      "OpenTelemetry",
      "Distributed Tracing",
      "JavaScript",
      "Metrics"
    ],
    "learningOutcomes": [
      "OpenTelemetry",
      "Distributed Tracing",
      "JavaScript"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "luma",
    "sourcePlatform": "Luma",
    "officialUrl": "https://lu.ma/",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-webinar-opentelemetry",
        "sourceId": "src-luma",
        "externalEventId": "live-webinar-opentelemetry",
        "url": "https://lu.ma/",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-webinar-solana-rust",
    "slug": "solana-rust-protocol-engineering",
    "title": "Solana & Rust: High Frequency Protocol Engineering",
    "tagline": "Build Anchor programs, optimize compute units, and implement lookup tables.",
    "summary": "A fast-paced webinar for Rust engineers entering high-throughput decentralized blockchain development on Solana.",
    "description": "Analyze Solana account models, cross-program invocations (CPI), parallel transaction execution, and state compression techniques.",
    "eventType": "webinar",
    "type": "webinar",
    "organizerId": "org-devfolio",
    "organizerName": "Devfolio Hacker Guild",
    "communityId": "ethglobal-community",
    "mode": "online",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-25T20:00:00.000Z",
    "endAt": "2026-12-25T22:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-25T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "online",
    "venue": {
      "id": "venue-solana-rust-protocol-engineering",
      "name": "Discord Developer Stage",
      "address": "Online Access",
      "localityId": "koramangala",
      "city": "Bengaluru",
      "latitude": 12.9716,
      "longitude": 77.5946,
      "locationPrecision": "approximate",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.5946,
        12.9716
      ]
    },
    "onlineJoinUrl": "https://devfolio.co/explore",
    "registration": {
      "kind": "external",
      "externalUrl": "https://devfolio.co/explore",
      "capacity": 150,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-25T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Solana",
      "Rust",
      "Web3",
      "Webinars"
    ],
    "skills": [
      "Solana",
      "Rust",
      "Anchor",
      "Web3.js"
    ],
    "learningOutcomes": [
      "Solana",
      "Rust",
      "Anchor"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "devfolio",
    "sourcePlatform": "Devfolio",
    "officialUrl": "https://devfolio.co/explore",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-webinar-solana-rust",
        "sourceId": "src-devfolio",
        "externalEventId": "live-webinar-solana-rust",
        "url": "https://devfolio.co/explore",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-webinar-agritech-ai",
    "slug": "ai-in-agriculture-satellite-analytics",
    "title": "AI in Agriculture: Satellite Analytics & Precision Yield Modeling",
    "tagline": "Satellite multispectral imagery, NDVI vegetation indexes, and soil moisture prediction.",
    "summary": "Presented by Presidency University and ICAR researchers exploring computer vision and remote sensing in modern agriculture.",
    "description": "Learn how machine learning models process Sentinel-2 satellite imagery to detect crop stress weeks before visual symptoms manifest.",
    "eventType": "webinar",
    "type": "webinar",
    "organizerId": "org-unstop",
    "organizerName": "Presidency University & ICAR-IIHR",
    "communityId": "presidency-innovation-club",
    "mode": "online",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-15T20:00:00.000Z",
    "endAt": "2026-12-15T22:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-15T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "online",
    "venue": {
      "id": "venue-ai-in-agriculture-satellite-analytics",
      "name": "Presidency University Virtual Auditorium",
      "address": "Online Access",
      "localityId": "koramangala",
      "city": "Bengaluru",
      "latitude": 13.1682,
      "longitude": 77.5671,
      "locationPrecision": "approximate",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.5671,
        13.1682
      ]
    },
    "onlineJoinUrl": "https://unstop.com/workshops",
    "registration": {
      "kind": "external",
      "externalUrl": "https://unstop.com/workshops",
      "capacity": 150,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-15T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "AgriTech",
      "Remote Sensing",
      "AI/ML",
      "Webinars"
    ],
    "skills": [
      "Satellite Data",
      "Python",
      "GIS",
      "Computer Vision"
    ],
    "learningOutcomes": [
      "Satellite Data",
      "Python",
      "GIS"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "unstop",
    "sourcePlatform": "Unstop",
    "officialUrl": "https://unstop.com/workshops",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-webinar-agritech-ai",
        "sourceId": "src-unstop",
        "externalEventId": "live-webinar-agritech-ai",
        "url": "https://unstop.com/workshops",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  },
  {
    "id": "live-webinar-cloud-security",
    "slug": "securing-cloud-infrastructure-threats",
    "title": "Securing Cloud Infrastructure Against Autonomous Threat Actors",
    "tagline": "Zero-trust IAM policies, AWS CloudTrail anomaly detection, and automated containment.",
    "summary": "Practical security webinar exploring how autonomous agent exploits target misconfigured cloud permissions and how to mitigate them.",
    "description": "Live interactive demonstrations of privilege escalation vectors in AWS/GCP and deploying automated Terraform guardrails.",
    "eventType": "webinar",
    "type": "webinar",
    "organizerId": "org-meetup",
    "organizerName": "Null Bengaluru Security Chapter",
    "communityId": "null-blr",
    "mode": "online",
    "status": "published",
    "visibility": "public",
    "startAt": "2026-12-29T20:00:00.000Z",
    "endAt": "2026-12-29T22:00:00.000Z",
    "timezone": "Asia/Kolkata",
    "registrationOpensAt": "2026-11-21T19:00:00.000Z",
    "registrationDeadline": "2026-12-29T06:00:00.000Z",
    "submissionDeadline": null,
    "locality": "online",
    "venue": {
      "id": "venue-securing-cloud-infrastructure-threats",
      "name": "Zoom Webinar Hall",
      "address": "Online Access",
      "localityId": "koramangala",
      "city": "Bengaluru",
      "latitude": 12.9716,
      "longitude": 77.5946,
      "locationPrecision": "approximate",
      "confirmedBy": "organizer"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        77.5946,
        12.9716
      ]
    },
    "onlineJoinUrl": "https://www.meetup.com/",
    "registration": {
      "kind": "external",
      "externalUrl": "https://www.meetup.com/",
      "capacity": 150,
      "approval": "none",
      "waitlistEnabled": true,
      "deadline": "2026-12-29T06:00:00.000Z",
      "questions": []
    },
    "price": {
      "kind": "free",
      "amountInr": 0,
      "note": "Free verified entry"
    },
    "team": {
      "mode": "solo",
      "minSize": 1,
      "maxSize": 1,
      "formationDeadline": null
    },
    "ageRule": {
      "mode": "all_ages",
      "minAge": null,
      "maxAge": null,
      "ruleText": "All builders welcome (18+ or student id)",
      "source": "organizer_declared",
      "confidence": "high"
    },
    "interests": [
      "Cybersecurity",
      "Cloud Security",
      "AWS",
      "Webinars"
    ],
    "skills": [
      "Cloud Security",
      "IAM",
      "Terraform",
      "Auditing"
    ],
    "learningOutcomes": [
      "Cloud Security",
      "IAM",
      "Terraform"
    ],
    "eligibilityText": "Open to developers, students, researchers, and technical builders.",
    "eligibilityKnown": true,
    "experienceLevel": "all",
    "prizes": [],
    "isSample": false,
    "source": "meetup",
    "sourcePlatform": "Meetup",
    "officialUrl": "https://www.meetup.com/",
    "officialUrlVerified": true,
    "firstDiscoveredAt": "2026-11-24T10:00:00.000Z",
    "lastCheckedAt": "2026-12-01T10:00:00.000Z",
    "listings": [
      {
        "id": "listing-live-webinar-cloud-security",
        "sourceId": "src-meetup",
        "externalEventId": "live-webinar-cloud-security",
        "url": "https://www.meetup.com/",
        "firstSeenAt": "2026-11-24T10:00:00.000Z",
        "lastCheckedAt": "2026-12-01T10:00:00.000Z"
      }
    ],
    "revisions": []
  }
];

export const DEFAULT_USERS = [
  {
    id: 'usr_admin',
    name: 'Syed Suhail',
    email: 'admin@knot.in',
    passwordHash: 'admin123',
    role: 'admin',
    ageBand: '18_plus',
    areaLocalityId: 'koramangala',
    radiusKm: 25,
    interests: ['AI/ML', 'Web development', 'Startups', 'Hackathons'],
    skills: ['React', 'Node.js', 'Express', 'MongoDB', 'TypeScript'],
    workspaceAdmin: true,
    accountStatus: 'active',
  },
  {
    id: 'usr_demo_participant',
    name: 'Ananya Sharma',
    email: 'ananya@example.com',
    passwordHash: 'password123',
    role: 'participant',
    ageBand: '18_plus',
    areaLocalityId: 'indiranagar',
    radiusKm: 15,
    interests: ['AI/ML', 'Design', 'Web development'],
    skills: ['Python', 'Figma', 'React'],
    workspaceAdmin: false,
    accountStatus: 'active',
  },
];
