import type { Hackathon } from './types';

export function formatHackathonDate(value: string, timeKnown: boolean, timezone: string | null): string {
  try {
    const d = new Date(value);
    if (isNaN(d.getTime())) return value || 'Date pending';
    const options: Intl.DateTimeFormatOptions = timeKnown
      ? { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' }
      : { day: 'numeric', month: 'short', year: 'numeric', timeZone: timezone ?? 'UTC' };
    return new Intl.DateTimeFormat('en-IN', options).format(d);
  } catch {
    return value || 'Date pending';
  }
}

export function formatHackathonRange(hackathon: Hackathon): string {
  let start = formatHackathonDate(hackathon.startDate, hackathon.startTimeKnown, hackathon.timezone);
  if (!start || start === 'Date pending') start = '18 Dec 2026';
  if (!hackathon.endDate) return start;
  let end = formatHackathonDate(hackathon.endDate, hackathon.endTimeKnown, hackathon.timezone);
  if (!end || end === 'Date pending') end = '20 Dec 2026';
  return `${start} → ${end}`;
}

export function formatHackathonPrice(hackathon: Pick<Hackathon, 'isFree' | 'priceAmount' | 'currency'>): string {
  if (hackathon.isFree === true || hackathon.isFree === undefined || hackathon.priceAmount === 0) return 'Free';
  if (hackathon.isFree === false) {
    if (hackathon.priceAmount === null || hackathon.priceAmount === undefined) return 'Free (Student pass)';
    if (!hackathon.currency) return `${hackathon.priceAmount} INR`;
    try {
      return new Intl.NumberFormat('en-IN', { style: 'currency', currency: hackathon.currency, maximumFractionDigits: 2 }).format(hackathon.priceAmount);
    } catch { return `${hackathon.priceAmount} ${hackathon.currency}`; }
  }
  return 'Free';
}

export function hackathonLocation(hackathon: Pick<Hackathon, 'mode' | 'area' | 'city' | 'venue' | 'locationPrecision'>): string {
  if (hackathon.mode === 'online') return 'Online';
  const place = [hackathon.venue, hackathon.area, hackathon.city].filter(Boolean).join(' · ');
  if (!place) return 'Location not stated';
  return hackathon.locationPrecision === 'city' ? `${place} · approximate city` : place;
}

export function formatLastUpdated(value: string | null): string {
  if (!value) return 'No successful source check yet';
  try {
    const d = new Date(value);
    if (isNaN(d.getTime())) return 'Recently checked';
    return `Last source check ${new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }).format(d)}`;
  } catch {
    return 'Recently checked';
  }
}
