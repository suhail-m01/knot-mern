import { ArrowRight, Check, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SampleBadge } from './Badges';
import type { CommunityProfile } from '../domain/communities';
import { localityById } from '../domain/localities';
import { useApp } from '../state/AppContext';

export function CommunityCard({ community }: { community: CommunityProfile }) {
  const { currentUser, data, toggleFollow } = useApp();
  const id = typeof community?.id === 'string' ? community.id : String(community?.id || 'community');
  
  const rawName = community?.name;
  const name: string = typeof rawName === 'string'
    ? rawName
    : (rawName && typeof rawName === 'object' && typeof (rawName as any).name === 'string')
      ? (rawName as any).name
      : String(rawName || 'Knot Community');

  const rawDesc = community?.description;
  const description: string = typeof rawDesc === 'string'
    ? rawDesc
    : (rawDesc && typeof rawDesc === 'object' && typeof (rawDesc as any).description === 'string')
      ? (rawDesc as any).description
      : String(rawDesc || 'Active builder community.');

  const interests = Array.isArray(community?.interests) ? community.interests.map(String) : [];
  const events = Array.isArray(community?.events) ? community.events : [];
  const followed = data.follows.some((follow) => follow.userId === currentUser?.id && follow.communityId === id);
  const locality = localityById(community?.localityId);
  const initialChar = (name.trim() || 'C').charAt(0).toUpperCase();

  return (
    <article className="community-card">
      <div className="community-card__avatar">{initialChar}</div>
      <div className="community-card__badges">{community?.isSample && <SampleBadge />}</div>
      <h3><Link to={`/communities/${id}`}>{name}</Link></h3>
      <p>{description}</p>
      <div className="community-card__tags">
        {interests.slice(0, 4).map((interest) => (
          <span key={interest}>{interest}</span>
        ))}
      </div>
      <div className="community-card__meta">
        <span><MapPin size={13} />{locality?.name ?? 'Online & Bengaluru'}</span>
        <span><Users size={13} />{events.length} event{events.length === 1 ? '' : 's'}</span>
      </div>
      <div className="community-card__footer">
        <Link to={`/communities/${id}`}>Open community <ArrowRight size={15} /></Link>
        <button
          className={`text-button ${followed ? 'is-following' : ''}`}
          onClick={() => toggleFollow(id)}
        >
          {followed ? <><Check size={14} /> Following</> : 'Follow'}
        </button>
      </div>
    </article>
  );
}
