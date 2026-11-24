import { ArrowLeft, ArrowRight, Check, ExternalLink, MessageCircle, Plus, RefreshCw, ShieldCheck, Sparkles, UserPlus, Users, Link as LinkIcon, Compass } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { EmptyState } from '../components/EmptyState';
import { EventCard } from '../components/EventCard';
import { TeamInvitationPanel } from '../components/TeamInvitationPanel';
import { TeamSynergyMatrix } from '../components/TeamSynergyMatrix';
import { SampleBadge } from '../components/Badges';
import { CommunityCard } from '../components/CommunityCard';
import { communitiesFromEvents } from '../domain/communities';
import { acceptedTeamMemberIds } from '../domain/growth';
import { SKILLS } from '../domain/interests';
import { localityById } from '../domain/localities';
import { useApp } from '../state/AppContext';
import { MernClient } from '../data/mernClient';
import { VERIFIED_COMMUNITIES } from '../domain/defaultCommunities';
import type { TeamPost } from '../domain/types';

export function CommunityPage() {
  const { communityId } = useParams();
  const { currentUser, data, requireAuth, toggleFollow, joinCommunityWithProfile, createTeamPost, requestTeam, respondTeamRequest } = useApp();
  const communities = useMemo(() => communitiesFromEvents(data.events.filter((event) => (event.visibility ?? 'public') === 'public')), [data.events]);
  
  const [harvestedCommunities, setHarvestedCommunities] = useState<any[]>(VERIFIED_COMMUNITIES);
  const [platformFilter, setPlatformFilter] = useState<'all' | 'discord' | 'unstop' | 'meetup' | 'luma'>('all');
  const [isHarvesting, setIsHarvesting] = useState(false);
  const [_agencyStatus, setAgencyStatus] = useState<any>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [tab, setTab] = useState<'events' | 'teams'>('events');
  const [teamFormOpen, setTeamFormOpen] = useState(false);
  const [teamEventId, setTeamEventId] = useState('');
  const [role, setRole] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [lookingFor, setLookingFor] = useState('');
  const [note, setNote] = useState('');
  const [requestPost, setRequestPost] = useState<TeamPost | null>(null);
  const [requestNote, setRequestNote] = useState('');
  const [error, setError] = useState('');
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [joinRole, setJoinRole] = useState('');
  const [joinSkills, setJoinSkills] = useState<string[]>([]);
  const [joinBio, setJoinBio] = useState('');

  // Find community in either derived events communities OR harvested communities
  const community = useMemo(() => {
    if (!communityId) return null;
    const fromEvents = communities.find((item) => item.id === communityId);
    if (fromEvents) return fromEvents;

    const fromHarvest = harvestedCommunities.find((item) => item.id === communityId);
    if (fromHarvest) {
      const matchingEvents = data.events.filter((e) => e.communityId === communityId || (fromHarvest.tags && fromHarvest.tags.some((t: string) => (e.interests || []).includes(t))));
      return {
        id: fromHarvest.id,
        name: fromHarvest.name,
        description: fromHarvest.description,
        interests: fromHarvest.tags || ['Community', 'Tech'],
        localityId: fromHarvest.locality || null,
        isSample: false,
        events: matchingEvents,
        platformUrl: fromHarvest.platformUrl,
        discordInvite: fromHarvest.discordInvite,
        platform: fromHarvest.platform,
        memberCount: fromHarvest.memberCount,
        verified: fromHarvest.verified,
      };
    }
    return null;
  }, [communityId, communities, harvestedCommunities, data.events]);

  useEffect(() => {
    let active = true;
    const loadData = async () => {
      try {
        const comms = await MernClient.getCommunities();
        if (active && comms && comms.length > 0) {
          setHarvestedCommunities(comms);
        }
      } catch (_) {}
      try {
        const status = await MernClient.getAgencyStatus();
        if (active && status) {
          setAgencyStatus(status.status);
        }
      } catch (_) {}
    };
    loadData();
    const timer = setInterval(loadData, 20000);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, []);

  const triggerHarvest = async () => {
    setIsHarvesting(true);
    try {
      await MernClient.triggerAgencyHarvest();
      const comms = await MernClient.getCommunities();
      if (comms && comms.length > 0) setHarvestedCommunities(comms);
      const status = await MernClient.getAgencyStatus();
      if (status) setAgencyStatus(status.status);
    } catch (_) {}
    setIsHarvesting(false);
  };

  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard?.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  if (!communityId) {
    const displayedHarvested = harvestedCommunities.filter((c) => {
      if (platformFilter === 'all') return true;
      return (c.platform || c.sourcePlatform || '').toLowerCase() === platformFilter;
    });

    return (
      <div className="page-container community-directory">
        <div className="page-heading">
          <div>
            <span className="eyebrow">Cross-Platform Builder Hubs</span>
            <h1>Communities on Knot</h1>
            <p>Production-verified tech communities, student chapters, and developer circles extracted across Discord, Unstop, Meetup, and Luma.</p>
          </div>
          <Link to="/search" className="button button--secondary">
            Explore all events <ArrowRight size={17} />
          </Link>
        </div>

        {/* Multi-Platform Agency Harvester Live Status Bar */}
        <div className="telemetry-bar" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '14px 18px',
          background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.08) 0%, rgba(6, 182, 212, 0.06) 100%)',
          borderRadius: '14px',
          border: '1px solid rgba(124, 58, 237, 0.18)',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#10B981',
              boxShadow: '0 0 8px #10B981'
            }} />
            <div>
              <strong style={{ fontSize: '0.9rem', color: '#160C2B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={15} color="#7C3AED" /> Autonomous Agency Harvester Active
              </strong>
              <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
                Continuous 30-min sync · {displayedHarvested.length} verified developer hubs ingested
              </span>
            </div>
          </div>
          <button
            onClick={triggerHarvest}
            disabled={isHarvesting}
            className="button button--small button--secondary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <RefreshCw size={13} className={isHarvesting ? 'spin' : ''} />
            {isHarvesting ? 'Harvesting Cross-Platform...' : 'Trigger Harvest Cycle'}
          </button>
        </div>

        {/* Platform Filter Tabs */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {[
            { id: 'all', label: 'All Platforms', count: harvestedCommunities.length },
            { id: 'discord', label: 'Discord Hubs', count: harvestedCommunities.filter((c) => (c.platform || '').toLowerCase() === 'discord').length },
            { id: 'unstop', label: 'Unstop Clubs', count: harvestedCommunities.filter((c) => (c.platform || '').toLowerCase() === 'unstop').length },
            { id: 'meetup', label: 'Meetup Groups', count: harvestedCommunities.filter((c) => (c.platform || '').toLowerCase() === 'meetup').length },
            { id: 'luma', label: 'Luma Circles', count: harvestedCommunities.filter((c) => (c.platform || '').toLowerCase() === 'luma').length },
          ].map((item) => {
            const isSelected = platformFilter === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setPlatformFilter(item.id as any)}
                style={{
                  padding: '7px 15px',
                  borderRadius: '20px',
                  fontSize: '0.82rem',
                  fontWeight: isSelected ? 700 : 500,
                  border: isSelected ? '1px solid #7C3AED' : '1px solid var(--line)',
                  background: isSelected ? '#EDE9FE' : '#fff',
                  color: isSelected ? '#6D28D9' : '#334155',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>{item.label}</span>
                <span style={{
                  fontSize: '0.72rem',
                  padding: '1px 6px',
                  borderRadius: '10px',
                  background: isSelected ? '#DDD6FE' : '#F1F5F9',
                  color: isSelected ? '#5B21B6' : '#64748B'
                }}>
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Communities Grid */}
        <div className="community-grid">
          {displayedHarvested.length > 0 ? (
            displayedHarvested.map((item) => {
              const platform = (item.platform || item.sourcePlatform || 'web').toLowerCase();
              const isDiscord = platform === 'discord';
              const isUnstop = platform === 'unstop';
              const isMeetup = platform === 'meetup';
              const isLuma = platform === 'luma';

              const platformColor = isDiscord ? '#5865F2' : isUnstop ? '#0073E6' : isMeetup ? '#F64060' : isLuma ? '#FF5A5F' : '#7C3AED';
              
              // Legitimate URL resolution per platform
              const primaryUrl = isDiscord
                ? (item.discordInvite || item.platformUrl || 'https://discord.gg/reactiflux')
                : (item.platformUrl || 'https://unstop.com');

              const isFollowed = data.follows.some((f) => f.userId === currentUser?.id && f.communityId === item.id);
              const nameText = item.name || 'Community';
              const initial = nameText.slice(0, 1).toUpperCase();

              return (
                <article className="community-card" key={item.id} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                      <div className="community-card__avatar" style={{ background: platformColor, margin: 0 }}>
                        {initial}
                      </div>
                      <span style={{
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        background: `${platformColor}18`,
                        color: platformColor,
                        border: `1px solid ${platformColor}30`,
                        letterSpacing: '0.5px'
                      }}>
                        {platform}
                      </span>
                    </div>

                    <h3 style={{ margin: '0 0 6px', fontSize: '1.05rem', fontWeight: 700 }}>
                      <Link to={`/communities/${item.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {nameText}
                      </Link>
                    </h3>

                    <p style={{ color: '#475569', fontSize: '0.82rem', lineHeight: '1.45', marginBottom: '12px' }}>
                      {item.description || 'Active builder community on Knot.'}
                    </p>

                    {item.activityLevel && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', color: '#059669', fontWeight: 600, marginBottom: '10px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
                        <span>{item.activityLevel}</span>
                      </div>
                    )}

                    <div className="community-card__tags" style={{ marginBottom: '14px' }}>
                      {(item.tags || []).slice(0, 3).map((tag: string) => (
                        <span key={tag} style={{ fontSize: '0.72rem' }}>{tag}</span>
                      ))}
                    </div>
                  </div>

                  <div className="community-card__footer" style={{ borderTop: '1px solid var(--line)', paddingTop: '12px', marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <a
                        href={primaryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          color: platformColor,
                          textDecoration: 'none'
                        }}
                      >
                        {isDiscord ? 'Join Discord' : isUnstop ? 'View on Unstop' : isMeetup ? 'Join Meetup' : isLuma ? 'Luma Circle' : 'Open Hub'}
                        <ExternalLink size={13} />
                      </a>

                      <button
                        type="button"
                        onClick={() => handleCopyLink(primaryUrl, item.id)}
                        title="Copy official invite/portal link"
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: copiedId === item.id ? '#10B981' : '#94A3B8',
                          padding: '2px',
                          display: 'inline-flex',
                          alignItems: 'center'
                        }}
                      >
                        {copiedId === item.id ? <Check size={14} /> : <LinkIcon size={14} />}
                      </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Link
                        to={`/communities/${item.id}`}
                        style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--ink)', textDecoration: 'none' }}
                      >
                        Details
                      </Link>
                      <button
                        className={`text-button ${isFollowed ? 'is-following' : ''}`}
                        onClick={() => toggleFollow(item.id)}
                        style={{ fontSize: '0.82rem', fontWeight: 600 }}
                      >
                        {isFollowed ? <><Check size={13} /> Followed</> : '+ Follow'}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            communities.map((item) => (
              <CommunityCard key={item.id} community={item} />
            ))
          )}
        </div>
      </div>
    );
  }

  if (!community) {
    return (
      <div className="page-container">
        <EmptyState
          title="Community not found"
          body="It may have been removed, or the link may be incomplete."
          action={<Link className="button button--primary" to="/communities">Browse all communities</Link>}
        />
      </div>
    );
  }

  const upcoming = (community.events || []).filter((event) => new Date(event.endAt ?? event.startAt ?? Date.now()).getTime() >= Date.now() && event.status !== 'cancelled');
  const teamEvents = upcoming.filter((event) => event.team && event.team.mode !== 'solo');
  const activeTeamEvent = teamEvents.find((event) => event.id === teamEventId) ?? teamEvents[0] ?? null;
  const posts = activeTeamEvent ? data.teamPosts.filter((post) => post.eventId === activeTeamEvent.id) : [];
  const followed = data.follows.some((follow) => follow.userId === currentUser?.id && follow.communityId === community.id);
  const locality = localityById(community.localityId);

  const openTeamForm = () => {
    if (!currentUser) { requireAuth(`/communities/${community.id}`, 'join a team'); return; }
    setTeamFormOpen(true); setError('');
  };

  const submitTeamPost = () => {
    if (!activeTeamEvent) return;
    try { createTeamPost(activeTeamEvent.id, role, skills, lookingFor, note); setTeamFormOpen(false); setRole(''); setLookingFor(''); setNote(''); setError(''); }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'Could not create the team post.'); }
  };

  const externalUrl = (community as any).discordInvite || (community as any).platformUrl;
  const commPlatform = ((community as any).platform || 'Web').toUpperCase();

  return (
    <div className="community-page">
      <div className="community-hero">
        <div className="page-container">
          <Link to="/communities" className="back-link"><ArrowLeft /> All communities</Link>
          <div className="community-hero__layout">
            <div className="community-hero__avatar">{(community.name || 'C').slice(0, 1).toUpperCase()}</div>
            <div>
              <div className="community-hero__badges">
                {community.isSample && <SampleBadge />}
                <span style={{ fontWeight: 700, color: '#7C3AED' }}>{commPlatform}</span>
                <span>{locality?.name ?? 'Bengaluru & Online'}</span>
                {(community as any).memberCount && (
                  <span>{(community as any).memberCount.toLocaleString()} members</span>
                )}
              </div>
              <h1>{community.name}</h1>
              <p>{community.description}</p>
              <div className="community-card__tags">
                {(community.interests || []).map((interest: string) => <span key={interest}>{interest}</span>)}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {externalUrl && (
                <a
                  href={externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button--accent"
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <ExternalLink size={16} /> Open on {commPlatform}
                </a>
              )}
              <button
                className={`button ${followed ? 'button--secondary' : 'button--primary'}`}
                onClick={() => {
                  if (!followed) {
                    if (!currentUser) { requireAuth(`/communities/${community.id}`, 'join this community'); return; }
                    setJoinModalOpen(true);
                  } else {
                    toggleFollow(community.id);
                  }
                }}
              >
                {followed ? <><Check /> Community Member</> : <><UserPlus /> Follow on Knot</>}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="page-container community-content">
        <div className="community-tabs">
          <button className={tab === 'events' ? 'active' : ''} onClick={() => setTab('events')}>
            Events <span>{upcoming.length}</span>
          </button>
          <button className={tab === 'teams' ? 'active' : ''} onClick={() => setTab('teams')}>
            Team formation <span>{teamEvents.length}</span>
          </button>
        </div>

        {tab === 'events' && (
          upcoming.length ? (
            <div className="event-grid">
              {upcoming.map((event) => <EventCard key={event.id} event={event} />)}
            </div>
          ) : (
            <EmptyState
              title="No upcoming events right now"
              body={`Follow ${community.name} to get notified when new workshops, hackathons, and meetups are posted.`}
              action={<Link className="button button--primary" to="/search"><Compass size={16} /> Explore all events</Link>}
            />
          )
        )}

        {tab === 'teams' && (
          <div className="teams-layout">
            <section>
              <div className="section-mini-heading">
                <div>
                  <h2>Find teammates with intent</h2>
                  <p>Team posts are public to adults. Contact details are shared only with the counterpart after acceptance.</p>
                </div>
                {activeTeamEvent && <button className="button button--primary button--small" onClick={openTeamForm}><Plus /> Create team post</button>}
              </div>

              {teamEvents.length > 1 && (
                <label className="dashboard-event-select">
                  Event
                  <select value={activeTeamEvent?.id ?? ''} onChange={(event) => setTeamEventId(event.target.value)}>
                    {teamEvents.map((event) => <option key={event.id} value={event.id}>{event.title}</option>)}
                  </select>
                </label>
              )}

              {!activeTeamEvent ? (
                <EmptyState icon={<Users />} title="No team-based events coming up" body="Team formation opens here when this community publishes an eligible team sprint or hackathon." />
              ) : (
                <>
                  <div className="team-event-note">
                    <Users />
                    <div>
                      <strong>{activeTeamEvent.title}</strong>
                      <span>Teams of {activeTeamEvent.team?.minSize ?? '1'}–{activeTeamEvent.team?.maxSize ?? '4'} · Team requests do not replace event registration.</span>
                    </div>
                    <Link to={`/events/${activeTeamEvent.id}`}>Event details <ArrowRight /></Link>
                  </div>

                  <TeamSynergyMatrix event={activeTeamEvent} className="community-synergy-matrix" />

                  {currentUser && currentUser.ageBand !== '18_plus' && (
                    <div className="minor-note">
                      <ShieldCheck /><span>Public team formation remains gated until Minor Mode protections are active.</span>
                    </div>
                  )}

                  {teamFormOpen && (
                    <div className="team-form">
                      <h3>Post your team or availability</h3>
                      <div className="form-grid">
                        <label>Your role<input value={role} onChange={(event) => setRole(event.target.value)} placeholder="e.g. Frontend builder" /></label>
                        <label>Looking for<input value={lookingFor} onChange={(event) => setLookingFor(event.target.value)} placeholder="e.g. One ML teammate" /></label>
                      </div>
                      <fieldset className="interest-field">
                        <legend>Your skills</legend>
                        <div className="choice-chips">
                          {SKILLS.map((skill) => (
                            <button
                              type="button"
                              key={skill}
                              className={skills.includes(skill) ? 'selected' : ''}
                              onClick={() => setSkills((prev) => prev.includes(skill) ? prev.filter((item) => item !== skill) : [...prev, skill])}
                            >
                              {skill}
                            </button>
                          ))}
                        </div>
                      </fieldset>
                      <label>Note <span>Optional</span><textarea rows={3} value={note} onChange={(event) => setNote(event.target.value)} placeholder="Share your idea, availability or what you want to build." /></label>
                      {error && <div className="form-error">{error}</div>}
                      <div className="button-row">
                        <button className="button button--primary" onClick={submitTeamPost}>Publish team post</button>
                        <button className="button button--ghost" onClick={() => setTeamFormOpen(false)}>Cancel</button>
                      </div>
                    </div>
                  )}

                  <div className="team-posts">
                    {posts.length ? posts.map((post) => {
                      const requests = data.teamRequests.filter((request) => request.postId === post.id);
                      const own = post.ownerId === currentUser?.id;
                      const mine = requests.find((request) => request.requesterId === currentUser?.id);
                      const owner = data.users.find((user) => user.id === post.ownerId);
                      return (
                        <article className="team-post" key={post.id}>
                          <div className="team-post__heading">
                            <div className="team-post__avatar">{(post.displayName || 'M').slice(0, 1)}</div>
                            <div>
                              <h3>{post.role}</h3>
                              <span>Posted by {post.displayName}</span>
                            </div>
                            <span className="team-capacity">
                              {acceptedTeamMemberIds(post, data.teamRequests, data.teamInvitations).length}/{activeTeamEvent.team?.maxSize ?? '4'} spots
                            </span>
                          </div>
                          <p>{post.note || 'Open to discussing a useful project and a realistic build plan.'}</p>
                          <div className="community-card__tags">{post.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
                          <div className="team-looking"><strong>Looking for</strong><span>{post.lookingFor}</span></div>
                          {!own && (
                            <div className="team-post__actions">
                              {mine ? (
                                <span className={`registration-status registration-status--${mine.status}`}>
                                  {mine.status === 'accepted' ? 'Request accepted' : mine.status === 'declined' ? 'Request declined' : 'Request pending'}
                                </span>
                              ) : (
                                <button className="button button--secondary button--small" onClick={() => { if (!currentUser) { requireAuth(`/communities/${community.id}`, 'join a team'); return; } setRequestPost(post); setError(''); }}>
                                  <MessageCircle /> Request to join
                                </button>
                              )}
                              {mine?.status === 'accepted' && <span className="contact-share">Owner contact: {owner?.email}</span>}
                            </div>
                          )}
                          {own && (
                            <div className="team-requests">
                              <h4>Join requests <span>{requests.length}</span></h4>
                              {requests.length ? requests.map((request) => {
                                const requester = data.users.find((user) => user.id === request.requesterId);
                                return (
                                  <div className="team-request" key={request.id}>
                                    <div>
                                      <strong>{request.displayName}</strong>
                                      <p>{request.note || 'No additional note.'}</p>
                                      {request.status === 'accepted' && <span className="contact-share">Contact: {requester?.email}</span>}
                                    </div>
                                    {request.status === 'pending' ? (
                                      <div>
                                        <button className="button button--primary button--small" onClick={() => { try { respondTeamRequest(request.id, 'accepted'); setError(''); } catch (reason) { setError(reason instanceof Error ? reason.message : 'Could not accept.'); } }}>Accept</button>
                                        <button className="button button--ghost button--small" onClick={() => respondTeamRequest(request.id, 'declined')}>Decline</button>
                                      </div>
                                    ) : (
                                      <span className={`submission-status submission-status--${request.status}`}>{request.status}</span>
                                    )}
                                  </div>
                                );
                              }) : <p>No requests yet.</p>}
                            </div>
                          )}
                          <TeamInvitationPanel post={post} event={activeTeamEvent} />
                        </article>
                      );
                    }) : (
                      <EmptyState icon={<Users />} title="No team posts yet" body="Start a team or share what you can contribute. Posting does not register you for the event." action={<button className="button button--primary" onClick={openTeamForm}>Create the first post</button>} />
                    )}
                  </div>
                  {error && !teamFormOpen && <div className="form-error">{error}</div>}
                </>
              )}
            </section>

            <aside className="team-safety">
              <ShieldCheck />
              <h3>A safer first step</h3>
              <ul>
                <li>Use the event page to confirm age and eligibility.</li>
                <li>Do not share passwords, payment PINs or private documents.</li>
                <li>Meet in public event spaces and report suspicious behaviour.</li>
                <li>Team acceptance does not verify identity or event registration.</li>
              </ul>
              <Link to="/search">Review event details <ArrowRight /></Link>
            </aside>
          </div>
        )}
      </div>

      {requestPost && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setRequestPost(null)}>
          <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="team-request-title" onMouseDown={(event) => event.stopPropagation()}>
            <span className="eyebrow">Join request</span>
            <h2 id="team-request-title">Introduce yourself to {requestPost.displayName}</h2>
            <p>Your note is visible to the team owner. Contact details stay private unless they accept.</p>
            <textarea rows={4} value={requestNote} onChange={(event) => setRequestNote(event.target.value)} placeholder="What can you contribute, and what would you like to build?" />
            {error && <div className="form-error">{error}</div>}
            <div className="button-row">
              <button className="button button--primary" onClick={() => { try { requestTeam(requestPost.id, requestNote); setRequestPost(null); setRequestNote(''); setError(''); } catch (reason) { setError(reason instanceof Error ? reason.message : 'Could not send request.'); } }}>Send request <ArrowRight /></button>
              <button className="button button--ghost" onClick={() => setRequestPost(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {joinModalOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setJoinModalOpen(false)}>
          <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="join-community-title" onMouseDown={(e) => e.stopPropagation()}>
            <span className="eyebrow">Community Membership</span>
            <h2 id="join-community-title">Join {community.name}</h2>
            <p>Connect with local builders, participate in community sessions, and find teammates for upcoming hackathons and events.</p>
            <div className="form-grid" style={{ marginBottom: '1rem' }}>
              <label>
                Your Role / Headline
                <input
                  value={joinRole}
                  onChange={(e) => setJoinRole(e.target.value)}
                  placeholder="e.g. Full-Stack Engineer, Product Designer, Student"
                />
              </label>
            </div>
            <fieldset className="interest-field">
              <legend>Your Skills &amp; Interests</legend>
              <div className="choice-chips">
                {SKILLS.map((skill) => (
                  <button
                    type="button"
                    key={skill}
                    className={joinSkills.includes(skill) ? 'selected' : ''}
                    onClick={() => setJoinSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </fieldset>
            <label style={{ display: 'block', marginTop: '1rem' }}>
              Bio / What you hope to collaborate on <span>Optional</span>
              <textarea
                rows={3}
                value={joinBio}
                onChange={(e) => setJoinBio(e.target.value)}
                placeholder="Tell other community members what projects you're interested in building..."
              />
            </label>
            <div className="button-row" style={{ marginTop: '1.25rem' }}>
              <button
                className="button button--primary"
                onClick={() => {
                  joinCommunityWithProfile(community.id, {
                    role: joinRole.trim() || undefined,
                    skills: joinSkills.length ? joinSkills : undefined,
                    bio: joinBio.trim() || undefined,
                  });
                  setJoinModalOpen(false);
                }}
              >
                <Check size={16} /> Confirm &amp; Join Community
              </button>
              <button className="button button--ghost" onClick={() => setJoinModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
