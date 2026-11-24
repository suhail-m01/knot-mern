import type { KnotEvent } from './types';

export interface CommunityProfile {
  id: string;
  name: string;
  description: string;
  interests: string[];
  localityId: string | null;
  isSample: boolean;
  events: KnotEvent[];
}

function extractStringName(source: any): string {
  if (!source) return '';
  if (typeof source === 'string') return source.trim();
  if (typeof source === 'object') {
    if (typeof source.name === 'string') return source.name.trim();
    if (typeof source.title === 'string') return source.title.trim();
    if (typeof source.label === 'string') return source.label.trim();
  }
  return '';
}

export function communitiesFromEvents(events: KnotEvent[]): CommunityProfile[] {
  const groups = new Map<string, KnotEvent[]>();
  events.forEach((event) => {
    if (!event) return;
    const commId = event.communityId || event.organizerId || (event.organizerName ? `org-${String(event.organizerName).toLowerCase().replace(/[^a-z0-9]+/g, '-')}` : 'general-community');
    groups.set(commId, [...(groups.get(commId) ?? []), event]);
  });

  return Array.from(groups.entries()).map(([id, communityEvents]) => {
    const first = communityEvents[0] || ({} as KnotEvent);
    const futureEvents = communityEvents.filter((event) => new Date(event.endAt ?? event.startAt ?? Date.now()).getTime() >= Date.now());
    const isSample = communityEvents.every((event) => event.isSample);
    
    const rawOrganizer = extractStringName(first.organizerName) || 
      extractStringName((first as any).organizer) || 
      extractStringName((first as any).title) || 
      'Knot Community';
    const commName = rawOrganizer || 'Knot Community';
    const allInterests = Array.from(new Set(communityEvents.flatMap((event) => event.interests ?? []).map(String)));

    return {
      id: id || 'community',
      name: commName,
      description: `${isSample ? 'Active community network' : 'Organizer community'} for people interested in ${allInterests.slice(0, 3).join(', ') || 'local participation'}. ${futureEvents.length} upcoming event${futureEvents.length === 1 ? '' : 's'} in this workspace.`,
      interests: allInterests,
      localityId: communityEvents.find((event) => event.venue?.localityId)?.venue?.localityId ?? null,
      isSample,
      events: communityEvents.sort((a, b) => (a.startAt || '').localeCompare(b.startAt || '')),
    };
  }).sort((a, b) => (a.name || '').localeCompare(b.name || ''));
}
