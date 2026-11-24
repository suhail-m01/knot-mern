import { defaultAgeRule } from './defaults';
import type { AgeRule, Confidence, EventMode, EventType, ExtractedField, ExtractionDraft, Price } from './types';

const field = <T,>(value: T, confidence: Confidence, evidence = ''): ExtractedField<T> => ({ value, confidence, evidence });
const eventTypes: [EventType, RegExp][] = [
  ['hackathon', /hackathon|hack\s*day|buildathon|code\s*sprint/i],
  ['workshop', /workshop|bootcamp|masterclass/i],
  ['meetup', /meetup|meet-up|gathering/i],
  ['conference', /conference/i],
  ['summit', /summit/i],
  ['competition', /competition|contest|challenge|ideathon/i],
  ['webinar', /webinar/i],
  ['community_session', /community|session|salon/i],
];
const skillList = ['Python', 'React', 'JavaScript', 'TypeScript', 'AI/ML', 'Design', 'Figma', 'Cloud', 'Cybersecurity', 'Data', 'Mobile', 'Hardware/IoT', 'Open Source', 'AgriTech', 'Web3'];

function findEventType(text: string) {
  return eventTypes.find(([, pattern]) => pattern.test(text))?.[0] ?? null;
}

const MONTH_NAMES_STR = 'Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?';

function parseDate(text: string, now: Date) {
  // 1. ISO format
  const iso = text.match(/\b\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?(?:Z|[+-]\d{2}:?\d{2})?\b/);
  if (iso) {
    const parsed = new Date(iso[0]);
    if (Number.isFinite(parsed.getTime())) return { value: parsed.toISOString(), confidence: 'high' as Confidence, evidence: iso[0] };
  }

  let day: number, month: number, year: number, confidence: Confidence, evidence: string;

  // 2. Day Range with Month Name: e.g. "4-5 November 2026", "4 to 5 Nov", "4th & 5th November 2026"
  const dayRangeWithMonth = text.match(new RegExp(`\\b(\\d{1,2})(?:st|nd|rd|th)?\\s*(?:-|–|—|to|&|and)\\s*(\\d{1,2})(?:st|nd|rd|th)?\\s+(${MONTH_NAMES_STR})\\s*,?\\s*(\\d{4})?\\b`, 'i'));
  // 3. Month First with Day Range: e.g. "November 4-5, 2026", "Nov 4 to 5, 2026"
  const monthFirstRange = text.match(new RegExp(`\\b(${MONTH_NAMES_STR})\\s+(\\d{1,2})(?:st|nd|rd|th)?\\s*(?:-|–|—|to|&|and)\\s*(\\d{1,2})(?:st|nd|rd|th)?\\s*,?\\s*(\\d{4})?\\b`, 'i'));
  // 4. Single Day with Month Name: e.g. "4th November 2026", "14 Nov 2026"
  const singleDayWithMonth = text.match(new RegExp(`\\b(\\d{1,2})(?:st|nd|rd|th)?\\s+(${MONTH_NAMES_STR})\\s*,?\\s*(\\d{4})?\\b`, 'i'));
  // 5. Month First Single Day: e.g. "November 4, 2026", "Nov 14th, 2026"
  const monthFirstSingle = text.match(new RegExp(`\\b(${MONTH_NAMES_STR})\\s+(\\d{1,2})(?:st|nd|rd|th)?\\s*,?\\s*(\\d{4})?\\b`, 'i'));

  if (dayRangeWithMonth) {
    day = Number(dayRangeWithMonth[1]);
    month = new Date(`${dayRangeWithMonth[3]} 1, 2020`).getMonth() + 1;
    year = dayRangeWithMonth[4] ? Number(dayRangeWithMonth[4]) : now.getFullYear();
    confidence = 'high';
    evidence = dayRangeWithMonth[0];
  } else if (monthFirstRange) {
    day = Number(monthFirstRange[2]);
    month = new Date(`${monthFirstRange[1]} 1, 2020`).getMonth() + 1;
    year = monthFirstRange[4] ? Number(monthFirstRange[4]) : now.getFullYear();
    confidence = 'high';
    evidence = monthFirstRange[0];
  } else if (singleDayWithMonth) {
    day = Number(singleDayWithMonth[1]);
    month = new Date(`${singleDayWithMonth[2]} 1, 2020`).getMonth() + 1;
    year = singleDayWithMonth[3] ? Number(singleDayWithMonth[3]) : now.getFullYear();
    confidence = singleDayWithMonth[3] ? 'high' : 'medium';
    evidence = singleDayWithMonth[0];
  } else if (monthFirstSingle) {
    day = Number(monthFirstSingle[2]);
    month = new Date(`${monthFirstSingle[1]} 1, 2020`).getMonth() + 1;
    year = monthFirstSingle[3] ? Number(monthFirstSingle[3]) : now.getFullYear();
    confidence = monthFirstSingle[3] ? 'high' : 'medium';
    evidence = monthFirstSingle[0];
  } else {
    // 6. Strict numeric date: only when 4-digit year is explicitly included or preceded by "date:"
    const numeric = text.match(/\b(?:date\s*[:\-]\s*)?(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})\b/i);
    if (!numeric) return null;
    day = Number(numeric[1]);
    month = Number(numeric[2]);
    year = Number(numeric[3]);
    if (year < 100) year += 2000;
    confidence = 'high';
    evidence = numeric[0];
  }

  let candidate = new Date(year, month - 1, day, 10, 0, 0);
  if (Number.isNaN(candidate.getTime()) || candidate.getMonth() !== month - 1) return null;
  
  // Time extraction
  const time = text.match(/\b(\d{1,2})(?::(\d{2}))?\s*(AM|PM)\b/i);
  if (time) {
    let hour = Number(time[1]) % 12;
    if (time[3].toUpperCase() === 'PM') hour += 12;
    candidate.setHours(hour, Number(time[2] ?? 0), 0, 0);
  }
  return { value: candidate.toISOString(), confidence, evidence: `${evidence}${time ? ` ${time[0]}` : ''}` };
}

function parseAgeRule(text: string): ExtractedField<AgeRule> {
  const range = text.match(/\b(?:ages?\s*)?(\d{1,2})\s*[–-]\s*(\d{1,2})\s*(?:years?|yrs?)?\b/i);
  if (range && Number(range[1]) >= 5 && Number(range[2]) <= 100) {
    return field({ ...defaultAgeRule(), mode: 'age_range', minAge: Number(range[1]), maxAge: Number(range[2]), source: 'extracted_from_source', confidence: 'high', ruleText: range[0] }, 'high', range[0]);
  }
  const minimum = text.match(/\b(?:ages?\s*)?(\d{1,2})\s*\+(?!\d)/i);
  if (minimum && Number(minimum[1]) >= 5 && Number(minimum[1]) <= 100) {
    const age = Number(minimum[1]);
    return field({ ...defaultAgeRule(), mode: age === 18 ? 'adults_only' : 'min_age', minAge: age, source: 'extracted_from_source', confidence: 'high', ruleText: minimum[0] }, 'high', minimum[0]);
  }
  if (/class\s+\d|grade\s+\d|school students|college students|freshers/i.test(text)) {
    return field({ ...defaultAgeRule(), ruleText: text.match(/class\s+\d[^.\n]*|grade\s+\d[^.\n]*|school students|college students|freshers/i)?.[0] ?? '' }, 'low', 'Age cannot be inferred from class, grade or student wording');
  }
  return field(defaultAgeRule(), 'missing');
}

export function parseInstantText(rawText: string, now = new Date()): ExtractionDraft {
  const text = rawText.trim();
  const lines = text.split(/\n+/).map((line) => line.trim()).filter(Boolean);

  const bannerRegex = /^(>|presidency\s*presidency|icar|iihr|department\s+of|dept\s+of|presents\b|sponsored\s+by|congratulations|welcome\s+to|organized\s+by|organised\s+by|in\s+association\s+with)\b/i;

  const explicitTitle = lines.find((line) => /^title\s*:/i.test(line))?.replace(/^title\s*:\s*/i, '')
    ?? lines.find((line) => /^page title\s*:/i.test(line))?.replace(/^page title\s*:\s*/i, '') ?? null;

  const cleanedCandidates = lines.filter((line) =>
    line.length >= 4 && line.length <= 120 &&
    !/^(source url|date|time|start|end|venue|location|register|registration|rsvp|event url|eligibility|description|page summary|price evidence)\b/i.test(line) &&
    !/^https?:\/\//i.test(line) &&
    !bannerRegex.test(line)
  );

  // Look for event keyword matches first (e.g. "Chip to Crop 2.0: 24-Hour AgriTech Hackathon")
  const keywordTitle = cleanedCandidates.find((line) =>
    /hackathon|challenge|sprint|summit|conference|workshop|meetup|bootcamp|buildathon|symposium|expo|ideathon/i.test(line)
  );

  const titleLine = explicitTitle ?? keywordTitle ?? cleanedCandidates[0] ?? lines[0] ?? null;

  const date = parseDate(text, now);
  const endLine = lines.find((line) => /^end\s*:/i.test(line));
  const endDate = endLine ? parseDate(endLine, now) : null;
  const deadlineLine = lines.find((line) => /^(registration deadline|register by)\s*:/i.test(line));
  const deadline = deadlineLine ? parseDate(deadlineLine, now) : null;

  const venueLine = lines.find((line) => /^(venue|location|place)\s*[:\-]/i.test(line));
  let venueValue = venueLine?.replace(/^(venue|location|place)\s*[:\-]\s*/i, '') ?? null;

  if (!venueValue) {
    const venueCandidate = lines.find((line) =>
      /(presidency university|hall|auditorium|block|floor|campus|engineering college|innovation studio)/i.test(line) &&
      !bannerRegex.test(line) && line !== titleLine
    );
    if (venueCandidate) venueValue = venueCandidate;
  }

  const registrationLine = lines.find((line) => /^(register|registration|rsvp|event url|join)\s*[:\-]/i.test(line));
  const labelledUrl = registrationLine?.match(/https?:\/\/[^\s)\]]+/i)?.[0] ?? null;
  const url = labelledUrl ?? lines.filter((line) => !/^source url\s*:/i.test(line)).join('\n').match(/https?:\/\/[^\s)\]]+/i)?.[0] ?? null;
  const mode: EventMode | null = /hybrid/i.test(text) ? 'hybrid' : /online|zoom|google meet|virtual|webinar/i.test(text) ? 'online' : venueValue ? 'in_person' : null;
  const freeForSome = /free\s+for\s+(members|students|women|college|early)/i.test(text);
  const priceLine = lines.find((line) => /^(price|ticket(?:\s+price)?|entry(?:\s+fee)?|registration\s+fee|fee|cost)\b/i.test(line)) ?? '';
  const explicitFree = /\bfree\s+(?:entry|admission|participation|registration|for everyone)\b/i.test(text) || /^\s*free\s*$/i.test(priceLine);
  const explicitPaid = /[₹]\s*\d[\d,]*/.test(priceLine) || /(?:price|ticket|entry fee|registration fee|cost)\s*(?:is|of|:|-)?\s*[₹]\s*\d[\d,]*/i.test(text);
  const paidMatch = (priceLine || text).match(/[₹]\s*([\d,]+)/);
  const price: Price = freeForSome ? { kind: 'unknown', amountInr: null, note: text.match(/free\s+for\s+[^.\n]+/i)?.[0] ?? 'Conditional price wording' } :
    explicitFree ? { kind: 'free', amountInr: 0, note: 'Stated free in source' } :
    explicitPaid ? { kind: 'paid', amountInr: Number(paidMatch?.[1]?.replace(/,/g, '') ?? 0) || null, note: 'Price extracted from explicit fee evidence' } :
    { kind: 'unknown', amountInr: null, note: '' };

  const eligibility = lines.find((line) => /eligib|open to|students only|who can join/i.test(line)) ?? null;
  const skills = skillList.filter((skill) => text.toLowerCase().includes(skill.toLowerCase()));
  const team = text.match(/team(?:\s+size)?\s*(?:of|:)?\s*(\d+)(?:\s*[–-]\s*(\d+))?/i);
  const eventType = findEventType(text);
  const summaryType = eventType ? eventType.replace('_', ' ') : 'event';
  const summaryPlace = venueValue ? ` at ${venueValue}` : mode === 'online' ? ' online' : '';

  return {
    title: field(titleLine, titleLine ? 'high' : 'missing', titleLine ?? ''),
    eventType: field(eventType, eventType ? 'high' : 'missing'),
    organizer: field(lines.find((line) => /^(organizer|organised by|organized by|hosted by)\s*[:\-]/i.test(line))?.replace(/^[^:\-]+[:\-]\s*/, '') ?? null, 'missing'),
    startDatetime: field(date?.value ?? null, date?.confidence ?? 'missing', date?.evidence ?? ''),
    endDatetime: field(endDate?.value ?? null, endDate?.confidence ?? 'missing', endDate?.evidence ?? ''),
    registrationDeadline: field(deadline?.value ?? null, deadline?.confidence ?? 'missing', deadline?.evidence ?? ''),
    mode: field(mode, mode ? 'high' : 'missing'),
    venueName: field(venueValue, venueValue ? 'high' : 'missing', venueLine ?? ''),
    addressOrLocality: field(venueValue, venueValue ? 'medium' : 'missing', venueLine ?? ''),
    city: field(/bengaluru|bangalore/i.test(text) ? 'Bengaluru' : null, /bengaluru|bangalore/i.test(text) ? 'high' : 'missing'),
    registrationUrl: field(url, url ? 'high' : 'missing', url ?? ''),
    price: field(price, price.kind === 'unknown' ? 'missing' : 'high', freeForSome ? 'Conditional free wording is not free for everyone' : ''),
    eligibilityText: field(eligibility, eligibility ? 'high' : 'missing', eligibility ?? ''),
    ageRule: parseAgeRule(text),
    skills: field(skills, skills.length ? 'high' : 'missing'),
    teamSize: field({ min: team ? Number(team[1]) : null, max: team?.[2] ? Number(team[2]) : team ? Number(team[1]) : null }, team ? 'high' : 'missing', team?.[0] ?? ''),
    summary: field(`A ${summaryType}${summaryPlace}. Review the source details, eligibility and registration information before publishing.`, 'high'),
  };
}
