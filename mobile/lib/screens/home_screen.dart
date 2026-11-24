import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../data/fallback_data.dart';
import '../models/community_model.dart';
import '../models/event_model.dart';
import '../models/hackathon_model.dart';
import '../services/api_service.dart';
import '../theme/knot_theme.dart';
import '../widgets/ai_event_concierge_sheet.dart';
import '../widgets/event_card.dart';
import '../widgets/hackathon_card.dart';
import '../widgets/harvester_inspector_sheet.dart';
import '../widgets/knot_logo.dart';
import '../widgets/location_selector_sheet.dart';
import '../widgets/mern_health_badge.dart';
import 'create_event_screen.dart';
import 'event_detail_screen.dart';
import 'hackathons_screen.dart';
import '../utils/url_launcher_util.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final _searchController = TextEditingController();
  List<KnotEvent> _events = [];
  List<HackathonModel> _hackathons = [];
  List<CommunityModel> _communities = [];
  bool _isLoading = true;
  Timer? _syncTimer;

  String _selectedCategory = 'All Formats';
  String _selectedArea = 'All';
  int _selectedRadiusKm = 10;
  String _selectedTime = 'Any time';
  String _heroTab = 'live'; // 'live' or 'local'
  String _selectedPlatform = 'all'; // 'all', 'discord', 'unstop', 'meetup', 'luma'
  final Set<String> _joinedCommunityIds = {'comm_01'};

  final List<String> _categories = [
    'All Formats',
    'Hackathons',
    'Workshops',
    'Meetups',
    'Conferences',
    'Communities',
    'Web3',
    'AI',
  ];

  final List<String> _timeOptions = [
    'Any time',
    'Today',
    'This weekend',
    'Next 7 days',
  ];

  final List<String> _areas = [
    'All',
    'Koramangala',
    'Indiranagar',
    'HSR Layout',
    'Whitefield',
    'Electronic City',
    'Yelahanka',
  ];

  @override
  void initState() {
    super.initState();
    _loadInitialData();

    _syncTimer = Timer.periodic(const Duration(seconds: 30), (_) {
      if (mounted && !_isLoading) {
        _syncQuiet();
      }
    });
  }

  @override
  void dispose() {
    _syncTimer?.cancel();
    _searchController.dispose();
    super.dispose();
  }

  Future<void> _loadInitialData() async {
    setState(() => _isLoading = true);
    await _fetchData();
    if (mounted) {
      setState(() => _isLoading = false);
    }
  }

  Future<void> _fetchData() async {
    try {
      final categoryFilter = _selectedCategory == 'All Formats' ? null : _selectedCategory;
      final eventsData = await ApiService().getEvents(
        search: _searchController.text.trim().isEmpty ? null : _searchController.text.trim(),
        category: categoryFilter,
        area: _selectedArea == 'All' ? null : _selectedArea,
      );

      final hackathonsData = await ApiService().getHackathons();
      final communitiesData = await ApiService().getCommunities(
        area: _selectedArea == 'All' ? null : _selectedArea,
        category: categoryFilter,
        search: _searchController.text.trim().isEmpty ? null : _searchController.text.trim(),
      );

      if (mounted) {
        setState(() {
          _events = eventsData.isNotEmpty ? eventsData : FallbackData.fallbackEvents;
          _hackathons = hackathonsData.isNotEmpty ? hackathonsData : FallbackData.fallbackHackathons;
          _communities = communitiesData.isNotEmpty ? communitiesData : FallbackData.fallbackCommunities;
        });
      }
    } catch (_) {
      if (mounted) {
        setState(() {
          _events = FallbackData.fallbackEvents;
          _hackathons = FallbackData.fallbackHackathons;
          _communities = FallbackData.fallbackCommunities;
        });
      }
    }
  }

  Future<void> _syncQuiet() async {
    try {
      final categoryFilter = _selectedCategory == 'All Formats' ? null : _selectedCategory;
      final eventsData = await ApiService().getEvents(
        search: _searchController.text.trim().isEmpty ? null : _searchController.text.trim(),
        category: categoryFilter,
        area: _selectedArea == 'All' ? null : _selectedArea,
      );
      if (mounted && eventsData.isNotEmpty) {
        setState(() => _events = eventsData);
      }
    } catch (_) {}
  }

  bool get _hasActiveFilters =>
      _selectedCategory != 'All Formats' ||
      _selectedArea != 'All' ||
      _selectedTime != 'Any time' ||
      _searchController.text.trim().isNotEmpty;

  void _resetAllFilters() {
    setState(() {
      _selectedCategory = 'All Formats';
      _selectedArea = 'All';
      _selectedTime = 'Any time';
      _searchController.clear();
    });
    _fetchData();
  }

  @override
  Widget build(BuildContext context) {
    // Dynamic filtering for home sections
    var displayedEvents = _events;

    // 1. Time filter
    if (_selectedTime == 'Today') {
      displayedEvents = displayedEvents.where((e) {
        final d = e.date.toLowerCase();
        return d.contains('today') || d.contains('now') || d.contains('tonight');
      }).toList();
      if (displayedEvents.isEmpty && _events.isNotEmpty) {
        displayedEvents = _events.take(4).toList();
      }
    } else if (_selectedTime == 'This weekend') {
      displayedEvents = displayedEvents.where((e) {
        final d = e.date.toLowerCase();
        return d.contains('sat') || d.contains('sun') || d.contains('weekend');
      }).toList();
      if (displayedEvents.isEmpty && _events.isNotEmpty) {
        displayedEvents = _events.take(4).toList();
      }
    } else if (_selectedTime == 'Next 7 days') {
      displayedEvents = _events.take(8).toList();
    }

    // 2. Category specific filtering on main feed
    if (_selectedCategory == 'Workshops') {
      displayedEvents = displayedEvents.where((e) =>
        e.category.toLowerCase().contains('work') ||
        e.format.toLowerCase().contains('work') ||
        e.title.toLowerCase().contains('workshop') ||
        e.title.toLowerCase().contains('masterclass')
      ).toList();
      if (displayedEvents.isEmpty) {
        displayedEvents = FallbackData.fallbackEvents.where((e) =>
          e.category.toLowerCase().contains('work') ||
          e.format.toLowerCase().contains('work') ||
          e.title.toLowerCase().contains('masterclass')
        ).toList();
      }
    } else if (_selectedCategory == 'Hackathons') {
      displayedEvents = displayedEvents.where((e) =>
        e.category.toLowerCase().contains('hack') ||
        e.format.toLowerCase().contains('hack') ||
        e.title.toLowerCase().contains('hack')
      ).toList();
    } else if (_selectedCategory == 'Meetups') {
      displayedEvents = displayedEvents.where((e) =>
        e.category.toLowerCase().contains('meet') ||
        e.format.toLowerCase().contains('meet') ||
        e.title.toLowerCase().contains('meetup')
      ).toList();
    } else if (_selectedCategory == 'Conferences') {
      displayedEvents = displayedEvents.where((e) =>
        e.category.toLowerCase().contains('conf') ||
        e.category.toLowerCase().contains('summit') ||
        e.format.toLowerCase().contains('conf') ||
        e.format.toLowerCase().contains('summit')
      ).toList();
    } else if (_selectedCategory == 'Web3') {
      displayedEvents = displayedEvents.where((e) =>
        e.category.toLowerCase().contains('web3') ||
        e.tags.any((t) => t.toLowerCase().contains('web3') || t.toLowerCase().contains('crypto') || t.toLowerCase().contains('defi'))
      ).toList();
    } else if (_selectedCategory == 'AI') {
      displayedEvents = displayedEvents.where((e) =>
        e.category.toLowerCase().contains('ai') ||
        e.tags.any((t) => t.toLowerCase().contains('ai') || t.toLowerCase().contains('agent') || t.toLowerCase().contains('llm')) ||
        e.title.toLowerCase().contains('ai')
      ).toList();
    }

    final workshops = _events.where((e) =>
      e.category.toLowerCase().contains('work') ||
      e.format.toLowerCase().contains('work') ||
      e.title.toLowerCase().contains('masterclass') ||
      e.title.toLowerCase().contains('workshop')
    ).toList();

    final meetups = _events.where((e) =>
      e.category.toLowerCase().contains('meet') ||
      e.format.toLowerCase().contains('meet') ||
      e.title.toLowerCase().contains('meetup')
    ).toList();

    return Scaffold(
      backgroundColor: KnotTheme.background,
      appBar: _buildKnotAppBar(),
      body: RefreshIndicator(
        color: KnotTheme.primary,
        onRefresh: _fetchData,
        child: SingleChildScrollView(
          physics: const AlwaysScrollableScrollPhysics(),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // 1. Interactive Harvester Strip
              _buildHarvesterBar(),

              // 2. Offline / Server Notice
              if (ApiService.isOfflineMode) _buildOfflineBanner(),

              // 3. Signature Knot Deep Hero Section
              _buildKnotHero(),

              // 4. Trust Strip
              _buildTrustStrip(),

              // 5. Category Ribbon
              _buildCategoryRibbon(),

              // 6. Time Chips Filter Bar (Matches Knot Web FilterBar)
              _buildTimeFilterChips(),

              // 7. Area Filter Bar & Reset Button
              _buildAreaFilterBar(),

              // Active filter pill banner
              if (_hasActiveFilters) _buildActiveFiltersBanner(),

              const SizedBox(height: 12),

              // 8. Section: Happening soon near you (or Active Category View)
              if (_selectedCategory == 'Communities')
                _buildCommunitiesSection(isFullView: true)
              else
                _buildSection(
                  title: _selectedCategory == 'All Formats'
                      ? 'Happening soon near you'
                      : '$_selectedCategory in ${_selectedArea == 'All' ? 'Bengaluru' : _selectedArea}',
                  eyebrow: 'Within $_selectedRadiusKm km of ${_selectedArea == 'All' ? 'Bengaluru' : _selectedArea}',
                  child: displayedEvents.isEmpty
                      ? _buildEmptyEventsPlaceholder()
                      : Column(
                          children: displayedEvents.take(5).map((event) => EventCard(
                            event: event,
                            onRefresh: _fetchData,
                          )).toList(),
                        ),
                ),

              // 9. Section: Source-linked Hackathons
              if (_hackathons.isNotEmpty && (_selectedCategory == 'All Formats' || _selectedCategory == 'Hackathons'))
                _buildSection(
                  title: 'Hackathons near you',
                  eyebrow: 'Verified developer challenges · Source-linked',
                  onSeeAll: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (_) => const HackathonsScreen()),
                    );
                  },
                  child: Column(
                    children: _hackathons.take(2).map((hack) => HackathonCard(
                      hackathon: hack,
                    )).toList(),
                  ),
                ),

              // 10. Section: Hands-on Workshops
              if (workshops.isNotEmpty && (_selectedCategory == 'All Formats' || _selectedCategory == 'Workshops'))
                _buildSection(
                  title: 'Hands-on Workshops & Masterclasses',
                  eyebrow: 'Build practical skills with real engineers',
                  child: Column(
                    children: workshops.take(3).map((event) => EventCard(
                      event: event,
                      onRefresh: _fetchData,
                    )).toList(),
                  ),
                ),

              // 11. Section: Tech Meetups
              if (meetups.isNotEmpty && (_selectedCategory == 'All Formats' || _selectedCategory == 'Meetups'))
                _buildSection(
                  title: 'Tech Meetups & Builder Circles',
                  eyebrow: 'Neighborhood coffee, code & conversations',
                  child: Column(
                    children: meetups.take(3).map((event) => EventCard(
                      event: event,
                      onRefresh: _fetchData,
                    )).toList(),
                  ),
                ),

              // 12. Section: Active Communities
              if (_communities.isNotEmpty && _selectedCategory != 'Communities')
                _buildCommunitiesSection(),

              // 13. Section: One connected journey
              _buildHowItWorksSection(),

              // 14. Organizer Callout
              _buildOrganizerCta(),

              const SizedBox(height: 80),
            ],
          ),
        ),
      ),
      floatingActionButton: _buildDualActionPills(),
    );
  }

  // --------------------------------------------------------------------------
  // APP BAR (With Interactive Locality Selector Sheet Trigger)
  // --------------------------------------------------------------------------
  PreferredSizeWidget _buildKnotAppBar() {
    return AppBar(
      backgroundColor: Colors.white,
      elevation: 0,
      scrolledUnderElevation: 1,
      titleSpacing: 16,
      title: Row(
        children: [
          const KnotLogo(size: 26),
          const SizedBox(width: 10),
          // Interactive Locality Chip
          InkWell(
            onTap: () {
              LocationSelectorSheet.show(
                context,
                currentLocality: _selectedArea,
                currentRadiusKm: _selectedRadiusKm,
                onLocationChanged: (newLoc, newRad) {
                  setState(() {
                    _selectedArea = newLoc;
                    _selectedRadiusKm = newRad;
                  });
                  _fetchData();
                },
              );
            },
            borderRadius: BorderRadius.circular(20),
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 4.5),
              decoration: BoxDecoration(
                color: KnotTheme.surfaceSoft,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: KnotTheme.line),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Icon(Icons.location_on, size: 12, color: KnotTheme.accentDark),
                  const SizedBox(width: 4),
                  Text(
                    _selectedArea == 'All' ? 'Bengaluru · ${_selectedRadiusKm}km' : '$_selectedArea · ${_selectedRadiusKm}km',
                    style: const TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.w700,
                      color: KnotTheme.ink,
                    ),
                  ),
                  const SizedBox(width: 2),
                  const Icon(Icons.arrow_drop_down, size: 14, color: KnotTheme.muted),
                ],
              ),
            ),
          ),
        ],
      ),
      actions: const [
        Padding(
          padding: EdgeInsets.only(right: 14),
          child: Center(child: MernHealthBadge()),
        ),
      ],
    );
  }

  // --------------------------------------------------------------------------
  // INTERACTIVE HARVESTER STRIP
  // --------------------------------------------------------------------------
  Widget _buildHarvesterBar() {
    return InkWell(
      onTap: () {
        HarvesterInspectorSheet.show(
          context,
          onSyncTriggered: _fetchData,
        );
      },
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
        decoration: const BoxDecoration(
          color: Color(0xFFF0ECFA),
          border: Border(bottom: BorderSide(color: Color(0xFFE2DCF2), width: 1)),
        ),
        child: Row(
          children: const [
            Icon(Icons.info_outline, size: 14, color: KnotTheme.primary),
            SizedBox(width: 6),
            Expanded(
              child: Text(
                '⚡ Autonomous Multi-Portal Harvester Active · Tap to inspect 5 portals (0s latency)',
                style: TextStyle(
                  fontSize: 11,
                  color: KnotTheme.primaryDark,
                  fontWeight: FontWeight.w700,
                ),
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
            ),
            Icon(Icons.chevron_right, size: 15, color: KnotTheme.primary),
          ],
        ),
      ),
    );
  }

  // --------------------------------------------------------------------------
  // OFFLINE BANNER
  // --------------------------------------------------------------------------
  Widget _buildOfflineBanner() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
      color: KnotTheme.amberSoft,
      child: Row(
        children: [
          const Icon(Icons.cloud_off, size: 14, color: KnotTheme.amber),
          const SizedBox(width: 6),
          const Expanded(
            child: Text(
              'Displaying curated Bengaluru catalog snapshot (MERN server starting)',
              style: TextStyle(fontSize: 11, color: KnotTheme.amber, fontWeight: FontWeight.w600),
            ),
          ),
          InkWell(
            onTap: _fetchData,
            child: const Text('Refresh', style: TextStyle(fontSize: 11, color: KnotTheme.primary, fontWeight: FontWeight.bold)),
          ),
        ],
      ),
    );
  }

  // --------------------------------------------------------------------------
  // KNOT SIGNATURE HERO SECTION
  // --------------------------------------------------------------------------
  Widget _buildKnotHero() {
    return Container(
      margin: const EdgeInsets.all(12),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: KnotTheme.deep,
        borderRadius: BorderRadius.circular(22),
        gradient: const LinearGradient(
          colors: [Color(0xFF211A3D), Color(0xFF2C2350)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        boxShadow: const [
          BoxShadow(
            color: Color.fromRGBO(33, 26, 61, 0.2),
            blurRadius: 18,
            offset: Offset(0, 6),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Kicker with Interactive AI Concierge Trigger
          InkWell(
            onTap: () {
              AIEventConciergeSheet.show(
                context,
                allEvents: _events,
                allHackathons: _hackathons,
              );
            },
            borderRadius: BorderRadius.circular(12),
            child: Row(
              children: const [
                Text('✨', style: TextStyle(fontSize: 13)),
                SizedBox(width: 6),
                Text(
                  'Your city. Your interests. Your people.',
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w600,
                    color: Color(0xFFC9C4D4),
                    letterSpacing: 0.3,
                  ),
                ),
                Spacer(),
                Text(
                  'Ask AI Concierge →',
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w700,
                    color: KnotTheme.accent,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),

          // Main Headline with Italic Coral 'your life.'
          RichText(
            text: const TextSpan(
              style: TextStyle(
                fontSize: 26,
                fontWeight: FontWeight.w800,
                color: Colors.white,
                height: 1.15,
                letterSpacing: -0.6,
              ),
              children: [
                TextSpan(text: 'Find events that fit\n'),
                TextSpan(
                  text: 'your life.',
                  style: TextStyle(
                    color: KnotTheme.accent,
                    fontStyle: FontStyle.italic,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 8),

          // Subtitle
          const Text(
            'Discover what’s happening nearby, know whether you can join, and turn one event into a community you return to.',
            style: TextStyle(
              fontSize: 12.5,
              color: Color(0xFFB5AFBF),
              height: 1.35,
            ),
          ),
          const SizedBox(height: 16),

          // Search Bar with Coral Explore Button
          Container(
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(12),
              boxShadow: const [
                BoxShadow(
                  color: Colors.black12,
                  blurRadius: 8,
                  offset: Offset(0, 2),
                ),
              ],
            ),
            child: Row(
              children: [
                const Padding(
                  padding: EdgeInsets.symmetric(horizontal: 12),
                  child: Icon(Icons.search, color: KnotTheme.muted, size: 20),
                ),
                Expanded(
                  child: TextField(
                    controller: _searchController,
                    style: const TextStyle(fontSize: 13, color: KnotTheme.ink),
                    decoration: const InputDecoration(
                      hintText: 'Try "AI", "design" or "this weekend"',
                      hintStyle: TextStyle(color: KnotTheme.soft, fontSize: 13),
                      border: InputBorder.none,
                      isDense: true,
                      contentPadding: EdgeInsets.symmetric(vertical: 12),
                    ),
                    onSubmitted: (_) => _fetchData(),
                  ),
                ),
                GestureDetector(
                  onTap: _fetchData,
                  child: Container(
                    margin: const EdgeInsets.all(4),
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                    decoration: BoxDecoration(
                      color: KnotTheme.accent,
                      borderRadius: BorderRadius.circular(9),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: const [
                        Text(
                          'Explore',
                          style: TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w700,
                            color: Colors.white,
                          ),
                        ),
                        SizedBox(width: 4),
                        Icon(Icons.arrow_forward, size: 14, color: Colors.white),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),

          // Popular Quick Pills
          Wrap(
            crossAxisAlignment: WrapCrossAlignment.center,
            spacing: 6,
            children: [
              const Text(
                'Popular:',
                style: TextStyle(fontSize: 11, color: Color(0xFF9E98AB), fontWeight: FontWeight.w600),
              ),
              _buildQuickPill('Hackathons', () {
                setState(() => _selectedCategory = 'Hackathons');
                _fetchData();
              }),
              _buildQuickPill('Workshops', () {
                setState(() => _selectedCategory = 'Workshops');
                _fetchData();
              }),
              _buildQuickPill('Meetups', () {
                setState(() => _selectedCategory = 'Meetups');
                _fetchData();
              }),
              _buildQuickPill('This weekend', () {
                setState(() => _selectedTime = 'This weekend');
              }),
            ],
          ),
          const SizedBox(height: 16),

          // Hero Panel Mini-Event Stack
          _buildHeroPanelStack(),
        ],
      ),
    );
  }

  Widget _buildQuickPill(String label, VoidCallback onTap) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(14),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
        decoration: BoxDecoration(
          color: Colors.white.withOpacity(0.08),
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: Colors.white.withOpacity(0.12)),
        ),
        child: Text(
          label,
          style: const TextStyle(fontSize: 11, color: Colors.white, fontWeight: FontWeight.w500),
        ),
      ),
    );
  }

  // --------------------------------------------------------------------------
  // HERO PANEL MINI-EVENT STACK (Interactive Card Taps)
  // --------------------------------------------------------------------------
  Widget _buildHeroPanelStack() {
    final displayHackathons = _hackathons.take(3).toList();

    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: const Color(0xFF1B1533),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.white.withOpacity(0.09)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header Row with Live Green Dot and Interactive Tabs
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  Container(
                    width: 8,
                    height: 8,
                    decoration: const BoxDecoration(
                      color: KnotTheme.liveDot,
                      shape: BoxShape.circle,
                    ),
                  ),
                  const SizedBox(width: 8),
                  Text(
                    _heroTab == 'live' ? 'Source-linked Hackathons' : 'Happening near you',
                    style: const TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w700,
                      color: Colors.white,
                    ),
                  ),
                ],
              ),
              Row(
                children: [
                  _buildHeroTabBtn('Hackathons (${_hackathons.length})', _heroTab == 'live', () => setState(() => _heroTab = 'live')),
                  const SizedBox(width: 4),
                  _buildHeroTabBtn(_selectedArea == 'All' ? 'Local' : _selectedArea, _heroTab == 'local', () => setState(() => _heroTab = 'local')),
                ],
              ),
            ],
          ),
          const SizedBox(height: 10),

          // Mini event items with direct Tap Navigation
          if (_heroTab == 'live' && displayHackathons.isNotEmpty)
            ...displayHackathons.asMap().entries.map((entry) {
              final hack = entry.value;
              return InkWell(
                onTap: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text('Opening official hackathon page via ${hack.platform}'),
                      backgroundColor: KnotTheme.primary,
                      duration: const Duration(seconds: 1),
                    ),
                  );
                },
                child: Container(
                  margin: const EdgeInsets.only(bottom: 6),
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.05),
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(color: Colors.white.withOpacity(0.06)),
                  ),
                  child: Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 4),
                        decoration: BoxDecoration(
                          color: Colors.white.withOpacity(0.1),
                          borderRadius: BorderRadius.circular(6),
                        ),
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Text(
                              hack.dayNumber,
                              style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.w800, height: 1.0),
                            ),
                            Text(
                              hack.monthCode,
                              style: const TextStyle(color: Color(0xFFC9C4D4), fontSize: 8, fontWeight: FontWeight.w700),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(width: 10),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              hack.title,
                              style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.w700),
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                            ),
                            const SizedBox(height: 2),
                            Row(
                              children: [
                                Container(
                                  width: 5,
                                  height: 5,
                                  decoration: const BoxDecoration(color: Color(0xFF4ADE80), shape: BoxShape.circle),
                                ),
                                const SizedBox(width: 4),
                                Text(
                                  '${hack.platform} · ${hack.city} · ${hack.isFree ? "FREE" : "PAID"}',
                                  style: const TextStyle(color: Color(0xFFB5AFBF), fontSize: 10),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                      const Icon(Icons.arrow_forward_ios, size: 12, color: Colors.white54),
                    ],
                  ),
                ),
              );
            })
          else
            ..._events.take(3).map((event) {
              return InkWell(
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (_) => EventDetailScreen(event: event)),
                  );
                },
                child: Container(
                  margin: const EdgeInsets.only(bottom: 6),
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.05),
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(color: Colors.white.withOpacity(0.06)),
                  ),
                  child: Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 4),
                        decoration: BoxDecoration(
                          color: Colors.white.withOpacity(0.1),
                          borderRadius: BorderRadius.circular(6),
                        ),
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: const [
                            Text('12', style: TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.w800)),
                            Text('DEC', style: TextStyle(color: Color(0xFFC9C4D4), fontSize: 8, fontWeight: FontWeight.w700)),
                          ],
                        ),
                      ),
                      const SizedBox(width: 10),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              event.title,
                              style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.w700),
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                            ),
                            const SizedBox(height: 2),
                            Text(
                              '${event.location.locality} · ${event.date}',
                              style: const TextStyle(color: Color(0xFFB5AFBF), fontSize: 10),
                            ),
                          ],
                        ),
                      ),
                      const Icon(Icons.arrow_forward_ios, size: 12, color: Colors.white54),
                    ],
                  ),
                ),
              );
            }),

          const SizedBox(height: 8),
          InkWell(
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => const HackathonsScreen()),
              );
            },
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: const [
                Text(
                  'Explore all verified hackathons',
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w700,
                    color: KnotTheme.accent,
                  ),
                ),
                SizedBox(width: 4),
                Icon(Icons.compass_calibration, size: 13, color: KnotTheme.accent),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildHeroTabBtn(String label, bool active, VoidCallback onTap) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(8),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
        decoration: BoxDecoration(
          color: active ? Colors.white.withOpacity(0.15) : Colors.transparent,
          borderRadius: BorderRadius.circular(8),
        ),
        child: Text(
          label,
          style: TextStyle(
            fontSize: 10.5,
            fontWeight: active ? FontWeight.w700 : FontWeight.w500,
            color: active ? Colors.white : Colors.white60,
          ),
        ),
      ),
    );
  }

  // --------------------------------------------------------------------------
  // TRUST STRIP
  // --------------------------------------------------------------------------
  Widget _buildTrustStrip() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: KnotTheme.line),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          _buildTrustItem(Icons.location_on_outlined, '40 Localities', 'Bengaluru discovery'),
          Container(width: 1, height: 28, color: KnotTheme.line),
          _buildTrustItem(Icons.verified_outlined, 'Source-linked', 'Fresh listings'),
          Container(width: 1, height: 28, color: KnotTheme.line),
          _buildTrustItem(Icons.check_circle_outline, 'No Account', 'Browse freely'),
        ],
      ),
    );
  }

  Widget _buildTrustItem(IconData icon, String title, String subtitle) {
    return Row(
      children: [
        Icon(icon, size: 18, color: KnotTheme.primary),
        const SizedBox(width: 8),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: const TextStyle(fontSize: 11.5, fontWeight: FontWeight.w700, color: KnotTheme.ink),
            ),
            Text(
              subtitle,
              style: const TextStyle(fontSize: 9.5, color: KnotTheme.muted),
            ),
          ],
        ),
      ],
    );
  }

  // --------------------------------------------------------------------------
  // CATEGORY RIBBON
  // --------------------------------------------------------------------------
  Widget _buildCategoryRibbon() {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      padding: const EdgeInsets.fromLTRB(12, 12, 12, 4),
      child: Row(
        children: _categories.map((cat) {
          final isSelected = _selectedCategory == cat;
          return Padding(
            padding: const EdgeInsets.only(right: 8),
            child: InkWell(
              onTap: () {
                setState(() => _selectedCategory = cat);
                _fetchData();
              },
              borderRadius: BorderRadius.circular(20),
              child: AnimatedContainer(
                duration: const Duration(milliseconds: 150),
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                decoration: BoxDecoration(
                  color: isSelected ? KnotTheme.primary : Colors.white,
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(
                    color: isSelected ? KnotTheme.primary : KnotTheme.line,
                    width: 1,
                  ),
                  boxShadow: isSelected
                      ? [
                          BoxShadow(
                            color: KnotTheme.primary.withOpacity(0.25),
                            blurRadius: 8,
                            offset: const Offset(0, 2),
                          ),
                        ]
                      : null,
                ),
                child: Text(
                  cat,
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: isSelected ? FontWeight.w700 : FontWeight.w600,
                    color: isSelected ? Colors.white : KnotTheme.ink,
                  ),
                ),
              ),
            ),
          );
        }).toList(),
      ),
    );
  }

  // --------------------------------------------------------------------------
  // TIME FILTER CHIPS (Matches Knot Web FilterBar timeChips)
  // --------------------------------------------------------------------------
  Widget _buildTimeFilterChips() {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
      child: Row(
        children: [
          const Text(
            'When: ',
            style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: KnotTheme.muted),
          ),
          const SizedBox(width: 4),
          ..._timeOptions.map((timeOpt) {
            final isSelected = _selectedTime == timeOpt;
            return Padding(
              padding: const EdgeInsets.only(right: 6),
              child: InkWell(
                onTap: () {
                  setState(() => _selectedTime = timeOpt);
                },
                borderRadius: BorderRadius.circular(14),
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: isSelected ? KnotTheme.accent.withOpacity(0.15) : Colors.white,
                    borderRadius: BorderRadius.circular(14),
                    border: Border.all(
                      color: isSelected ? KnotTheme.accent : KnotTheme.line,
                    ),
                  ),
                  child: Text(
                    timeOpt,
                    style: TextStyle(
                      fontSize: 11,
                      fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
                      color: isSelected ? KnotTheme.accentDark : KnotTheme.muted,
                    ),
                  ),
                ),
              ),
            );
          }),
        ],
      ),
    );
  }

  // --------------------------------------------------------------------------
  // AREA FILTER BAR
  // --------------------------------------------------------------------------
  Widget _buildAreaFilterBar() {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
      child: Row(
        children: [
          const Text(
            'Area: ',
            style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: KnotTheme.muted),
          ),
          const SizedBox(width: 4),
          ..._areas.map((area) {
            final isSelected = _selectedArea == area;
            return Padding(
              padding: const EdgeInsets.only(right: 6),
              child: InkWell(
                onTap: () {
                  setState(() => _selectedArea = area);
                  _fetchData();
                },
                borderRadius: BorderRadius.circular(14),
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: isSelected ? KnotTheme.primarySoft : Colors.white,
                    borderRadius: BorderRadius.circular(14),
                    border: Border.all(
                      color: isSelected ? KnotTheme.primary : KnotTheme.line,
                    ),
                  ),
                  child: Text(
                    area,
                    style: TextStyle(
                      fontSize: 11,
                      fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
                      color: isSelected ? KnotTheme.primaryDark : KnotTheme.muted,
                    ),
                  ),
                ),
              ),
            );
          }),
        ],
      ),
    );
  }

  // --------------------------------------------------------------------------
  // ACTIVE FILTERS BANNER & RESET
  // --------------------------------------------------------------------------
  Widget _buildActiveFiltersBanner() {
    return Container(
      margin: const EdgeInsets.fromLTRB(12, 6, 12, 0),
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: KnotTheme.surfaceSoft,
        borderRadius: BorderRadius.circular(10),
      ),
      child: Row(
        children: [
          const Icon(Icons.tune, size: 14, color: KnotTheme.primary),
          const SizedBox(width: 6),
          Expanded(
            child: Text(
              'Filtered: ${_selectedCategory != "All Formats" ? "$_selectedCategory · " : ""}${_selectedArea != "All" ? "$_selectedArea · " : ""}${_selectedTime != "Any time" ? "$_selectedTime · " : ""}${_searchController.text.isNotEmpty ? '"${_searchController.text}"' : ""}',
              style: const TextStyle(fontSize: 11, color: KnotTheme.ink, fontWeight: FontWeight.w600),
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
          ),
          InkWell(
            onTap: _resetAllFilters,
            child: const Text(
              'Reset all ✕',
              style: TextStyle(fontSize: 11, color: KnotTheme.primary, fontWeight: FontWeight.w800),
            ),
          ),
        ],
      ),
    );
  }

  // --------------------------------------------------------------------------
  // SECTION WRAPPER
  // --------------------------------------------------------------------------
  Widget _buildSection({
    required String title,
    required String eyebrow,
    required Widget child,
    VoidCallback? onSeeAll,
  }) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(12, 16, 12, 8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    eyebrow.toUpperCase(),
                    style: const TextStyle(
                      fontSize: 10,
                      fontWeight: FontWeight.w800,
                      color: KnotTheme.primary,
                      letterSpacing: 0.8,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    title,
                    style: const TextStyle(
                      fontSize: 17,
                      fontWeight: FontWeight.w800,
                      color: KnotTheme.ink,
                      letterSpacing: -0.3,
                    ),
                  ),
                ],
              ),
              InkWell(
                onTap: onSeeAll ?? () {},
                child: Row(
                  children: const [
                    Text(
                      'See all',
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w700,
                        color: KnotTheme.primary,
                      ),
                    ),
                    SizedBox(width: 2),
                    Icon(Icons.arrow_forward, size: 13, color: KnotTheme.primary),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          child,
        ],
      ),
    );
  }

  Widget _buildEmptyEventsPlaceholder() {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: KnotTheme.line),
      ),
      child: Center(
        child: Column(
          children: [
            const Icon(Icons.search_off, size: 36, color: KnotTheme.muted),
            const SizedBox(height: 10),
            const Text(
              'No events found matching these filters',
              style: TextStyle(fontWeight: FontWeight.w700, fontSize: 13),
            ),
            const SizedBox(height: 4),
            InkWell(
              onTap: _resetAllFilters,
              child: const Text('Reset filters to view all events', style: TextStyle(color: KnotTheme.primary, fontSize: 12, fontWeight: FontWeight.bold)),
            ),
          ],
        ),
      ),
    );
  }

  // --------------------------------------------------------------------------
  // INTERACTIVE COMMUNITIES SECTION (With Multi-Platform Agency Harvest)
  // --------------------------------------------------------------------------
  Widget _buildCommunitiesSection({bool isFullView = false}) {
    List<CommunityModel> filteredComms = _communities;
    if (_selectedPlatform != 'all') {
      filteredComms = _communities.where((c) => c.platform.toLowerCase() == _selectedPlatform.toLowerCase()).toList();
    }

    Color getPlatformColor(String platform) {
      switch (platform.toLowerCase()) {
        case 'discord':
          return const Color(0xFF5865F2);
        case 'unstop':
          return const Color(0xFF0073E6);
        case 'meetup':
          return const Color(0xFFF64060);
        case 'luma':
          return const Color(0xFFFF5A5F);
        default:
          return KnotTheme.primary;
      }
    }

    String getPlatformActionLabel(String platform) {
      switch (platform.toLowerCase()) {
        case 'discord':
          return 'Join Discord';
        case 'unstop':
          return 'View Club';
        case 'meetup':
          return 'Meetup';
        case 'luma':
          return 'Luma Circle';
        default:
          return 'Join Hub';
      }
    }

    if (isFullView) {
      return Padding(
        padding: const EdgeInsets.fromLTRB(16, 16, 16, 24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'CROSS-PLATFORM TECH HUBS',
              style: TextStyle(fontSize: 11, fontWeight: FontWeight.w800, color: KnotTheme.primary, letterSpacing: 0.8),
            ),
            const SizedBox(height: 2),
            const Text(
              'Autonomous Community Harvester',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800, color: KnotTheme.ink, letterSpacing: -0.3),
            ),
            const SizedBox(height: 4),
            Text(
              'Live extracted developer hubs across Discord, Unstop, Meetup, and Luma. Verified active membership.',
              style: TextStyle(fontSize: 12.5, color: KnotTheme.muted, height: 1.35),
            ),
            const SizedBox(height: 14),

            // Platform Filter Chips
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: [
                  {'id': 'all', 'label': 'All Platforms'},
                  {'id': 'discord', 'label': 'Discord'},
                  {'id': 'unstop', 'label': 'Unstop Clubs'},
                  {'id': 'meetup', 'label': 'Meetup'},
                  {'id': 'luma', 'label': 'Luma Circles'},
                ].map((p) {
                  final isSel = _selectedPlatform == p['id'];
                  return Padding(
                    padding: const EdgeInsets.only(right: 8),
                    child: ChoiceChip(
                      label: Text(p['label']!),
                      selected: isSel,
                      onSelected: (val) {
                        setState(() => _selectedPlatform = val ? p['id']! : 'all');
                      },
                      selectedColor: KnotTheme.primarySoft,
                      backgroundColor: Colors.white,
                      labelStyle: TextStyle(
                        fontSize: 12,
                        fontWeight: isSel ? FontWeight.w700 : FontWeight.w500,
                        color: isSel ? KnotTheme.primary : KnotTheme.ink,
                      ),
                      side: BorderSide(
                        color: isSel ? KnotTheme.primary : KnotTheme.line,
                      ),
                    ),
                  );
                }).toList(),
              ),
            ),
            const SizedBox(height: 16),

            // Vertical list of community cards
            if (filteredComms.isEmpty)
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 32),
                child: Center(
                  child: Text(
                    'No communities found for selected platform.',
                    style: TextStyle(color: KnotTheme.muted, fontSize: 13),
                  ),
                ),
              )
            else
              Column(
                children: filteredComms.map((comm) {
                  final isJoined = _joinedCommunityIds.contains(comm.id);
                  final memberCount = comm.memberCount + (isJoined ? 1 : 0);
                  final platColor = getPlatformColor(comm.platform);

                  return Container(
                    margin: const EdgeInsets.only(bottom: 14),
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: KnotTheme.line),
                      boxShadow: const [
                        BoxShadow(
                          color: Color.fromRGBO(39, 28, 66, 0.04),
                          blurRadius: 10,
                          offset: Offset(0, 3),
                        ),
                      ],
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Container(
                              width: 44,
                              height: 44,
                              decoration: BoxDecoration(
                                color: platColor.withOpacity(0.12),
                                borderRadius: BorderRadius.circular(12),
                              ),
                              child: Center(
                                child: Text(
                                  comm.name.substring(0, 1),
                                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: platColor),
                                ),
                              ),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    children: [
                                      Flexible(
                                        child: Text(
                                          comm.name,
                                          style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: KnotTheme.ink),
                                          maxLines: 1,
                                          overflow: TextOverflow.ellipsis,
                                        ),
                                      ),
                                      if (comm.verified) ...[
                                        const SizedBox(width: 4),
                                        const Icon(Icons.verified, size: 14, color: KnotTheme.primary),
                                      ],
                                    ],
                                  ),
                                  const SizedBox(height: 3),
                                  Row(
                                    children: [
                                      Container(
                                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                        decoration: BoxDecoration(
                                          color: platColor.withOpacity(0.12),
                                          borderRadius: BorderRadius.circular(4),
                                        ),
                                        child: Text(
                                          comm.platform.toUpperCase(),
                                          style: TextStyle(fontSize: 9.5, fontWeight: FontWeight.w800, color: platColor),
                                        ),
                                      ),
                                      const SizedBox(width: 6),
                                      Text(
                                        '$memberCount members · ${comm.locality}',
                                        style: const TextStyle(fontSize: 11.5, color: KnotTheme.muted),
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 10),
                        Text(
                          comm.description,
                          style: TextStyle(fontSize: 12.5, color: KnotTheme.ink.withOpacity(0.85), height: 1.35),
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                        ),
                        if (comm.activityLevel.isNotEmpty) ...[
                          const SizedBox(height: 6),
                          Row(
                            children: [
                              Container(
                                width: 6,
                                height: 6,
                                decoration: const BoxDecoration(
                                  color: Color(0xFF10B981),
                                  shape: BoxShape.circle,
                                ),
                              ),
                              const SizedBox(width: 5),
                              Text(
                                comm.activityLevel,
                                style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: Color(0xFF059669)),
                              ),
                            ],
                          ),
                        ],
                        const SizedBox(height: 12),
                        Row(
                          children: [
                            if (comm.discordInvite.isNotEmpty || comm.platformUrl.isNotEmpty) ...[
                              Expanded(
                                child: OutlinedButton(
                                  onPressed: () async {
                                    final link = comm.discordInvite.isNotEmpty ? comm.discordInvite : comm.platformUrl;
                                    Clipboard.setData(ClipboardData(text: link));
                                    ScaffoldMessenger.of(context).showSnackBar(
                                      SnackBar(
                                        content: Text('Opening ${getPlatformActionLabel(comm.platform)}... ($link)'),
                                        backgroundColor: platColor,
                                        duration: const Duration(seconds: 2),
                                      ),
                                    );
                                    await UrlLauncherUtil.openUrl(link);
                                  },
                                  style: OutlinedButton.styleFrom(
                                    foregroundColor: platColor,
                                    side: BorderSide(color: platColor.withOpacity(0.4)),
                                    padding: const EdgeInsets.symmetric(vertical: 8),
                                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                                  ),
                                  child: Text(
                                    getPlatformActionLabel(comm.platform),
                                    style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700),
                                  ),
                                ),
                              ),
                              const SizedBox(width: 10),
                            ],
                            Expanded(
                              child: ElevatedButton(
                                onPressed: () {
                                  setState(() {
                                    if (isJoined) {
                                      _joinedCommunityIds.remove(comm.id);
                                    } else {
                                      _joinedCommunityIds.add(comm.id);
                                    }
                                  });
                                  ScaffoldMessenger.of(context).showSnackBar(
                                    SnackBar(
                                      content: Text(!isJoined ? '🎉 You joined ${comm.name}!' : 'Left ${comm.name}'),
                                      backgroundColor: !isJoined ? KnotTheme.primary : KnotTheme.ink,
                                      duration: const Duration(seconds: 1),
                                    ),
                                  );
                                },
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: isJoined ? KnotTheme.greenSoft : KnotTheme.primary,
                                  foregroundColor: isJoined ? KnotTheme.green : Colors.white,
                                  elevation: 0,
                                  padding: const EdgeInsets.symmetric(vertical: 8),
                                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                                ),
                                child: Text(
                                  isJoined ? '✓ Joined' : 'Follow on Knot',
                                  style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  );
                }).toList(),
              ),
          ],
        ),
      );
    }

    // Default Horizontal Strip for Home Screen
    return Padding(
      padding: const EdgeInsets.fromLTRB(12, 16, 12, 8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'PEOPLE WORTH RETURNING TO',
            style: TextStyle(fontSize: 10, fontWeight: FontWeight.w800, color: KnotTheme.primary, letterSpacing: 0.8),
          ),
          const SizedBox(height: 2),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                'Active communities',
                style: TextStyle(fontSize: 17, fontWeight: FontWeight.w800, color: KnotTheme.ink, letterSpacing: -0.3),
              ),
              InkWell(
                onTap: () {
                  setState(() => _selectedCategory = 'Communities');
                },
                child: const Text(
                  'View All Hubs →',
                  style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: KnotTheme.primary),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: _communities.map((comm) {
                final isJoined = _joinedCommunityIds.contains(comm.id);
                final memberCount = comm.memberCount + (isJoined ? 1 : 0);
                final platColor = getPlatformColor(comm.platform);

                return Container(
                  width: 230,
                  margin: const EdgeInsets.only(right: 12),
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: KnotTheme.line),
                    boxShadow: const [
                      BoxShadow(
                        color: Color.fromRGBO(39, 28, 66, 0.04),
                        blurRadius: 8,
                        offset: Offset(0, 2),
                      ),
                    ],
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Container(
                            width: 38,
                            height: 38,
                            decoration: BoxDecoration(
                              color: platColor.withOpacity(0.12),
                              borderRadius: BorderRadius.circular(10),
                            ),
                            child: Center(
                              child: Text(
                                comm.name.substring(0, 1),
                                style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: platColor),
                              ),
                            ),
                          ),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                            decoration: BoxDecoration(
                              color: platColor.withOpacity(0.1),
                              borderRadius: BorderRadius.circular(4),
                            ),
                            child: Text(
                              comm.platform.toUpperCase(),
                              style: TextStyle(fontSize: 9, fontWeight: FontWeight.w800, color: platColor),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 10),
                      Text(
                        comm.name,
                        style: const TextStyle(fontSize: 13.5, fontWeight: FontWeight.w700, color: KnotTheme.ink),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                      const SizedBox(height: 3),
                      Text(
                        '$memberCount members · ${comm.category}',
                        style: const TextStyle(fontSize: 11, color: KnotTheme.muted),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                      const SizedBox(height: 10),
                      Row(
                        children: [
                          if (comm.discordInvite.isNotEmpty || comm.platformUrl.isNotEmpty) ...[
                            Expanded(
                              child: InkWell(
                                onTap: () async {
                                  final link = comm.discordInvite.isNotEmpty ? comm.discordInvite : comm.platformUrl;
                                  Clipboard.setData(ClipboardData(text: link));
                                  ScaffoldMessenger.of(context).showSnackBar(
                                    SnackBar(
                                      content: Text('Opening ${getPlatformActionLabel(comm.platform)}... ($link)'),
                                      backgroundColor: platColor,
                                      duration: const Duration(seconds: 2),
                                    ),
                                  );
                                  await UrlLauncherUtil.openUrl(link);
                                },
                                child: Container(
                                  padding: const EdgeInsets.symmetric(vertical: 5),
                                  decoration: BoxDecoration(
                                    border: Border.all(color: platColor.withOpacity(0.4)),
                                    borderRadius: BorderRadius.circular(6),
                                  ),
                                  alignment: Alignment.center,
                                  child: Text(
                                    getPlatformActionLabel(comm.platform),
                                    style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: platColor),
                                  ),
                                ),
                              ),
                            ),
                            const SizedBox(width: 6),
                          ],
                          Expanded(
                            child: InkWell(
                              onTap: () {
                                setState(() {
                                  if (isJoined) {
                                    _joinedCommunityIds.remove(comm.id);
                                  } else {
                                    _joinedCommunityIds.add(comm.id);
                                  }
                                });
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(
                                    content: Text(!isJoined ? '🎉 You joined ${comm.name}!' : 'Left ${comm.name}'),
                                    backgroundColor: !isJoined ? KnotTheme.primary : KnotTheme.ink,
                                    duration: const Duration(seconds: 1),
                                  ),
                                );
                              },
                              child: Container(
                                padding: const EdgeInsets.symmetric(vertical: 5),
                                decoration: BoxDecoration(
                                  color: isJoined ? KnotTheme.greenSoft : KnotTheme.primarySoft,
                                  borderRadius: BorderRadius.circular(6),
                                ),
                                alignment: Alignment.center,
                                child: Text(
                                  isJoined ? '✓ Joined' : 'Follow',
                                  style: TextStyle(
                                    fontSize: 10,
                                    fontWeight: FontWeight.w700,
                                    color: isJoined ? KnotTheme.green : KnotTheme.primary,
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                );
              }).toList(),
            ),
          ),
        ],
      ),
    );
  }

  // --------------------------------------------------------------------------
  // ONE CONNECTED JOURNEY (How It Works)
  // --------------------------------------------------------------------------
  Widget _buildHowItWorksSection() {
    return Container(
      margin: const EdgeInsets.fromLTRB(12, 16, 12, 8),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: KnotTheme.line),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('ONE CONNECTED JOURNEY', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w800, color: KnotTheme.primary)),
          const SizedBox(height: 4),
          const Text('From “maybe interested” to “see you there”', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w800, color: KnotTheme.ink)),
          const SizedBox(height: 14),
          _buildJourneyStep('01', 'Discover with context', 'Location, interests, skills, and freshness in one place.'),
          const Divider(height: 16),
          _buildJourneyStep('02', 'Participate with confidence', 'Check rules, register with zero friction, and get digital passes.'),
          const Divider(height: 16),
          _buildJourneyStep('03', 'Return to your people', 'Follow communities, track changes, and find the next event.'),
        ],
      ),
    );
  }

  Widget _buildJourneyStep(String number, String title, String description) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 3),
          decoration: BoxDecoration(color: KnotTheme.primarySoft, borderRadius: BorderRadius.circular(6)),
          child: Text(number, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w800, color: KnotTheme.primary)),
        ),
        const SizedBox(width: 10),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: KnotTheme.ink)),
              const SizedBox(height: 2),
              Text(description, style: const TextStyle(fontSize: 11.5, color: KnotTheme.muted)),
            ],
          ),
        ),
      ],
    );
  }

  // --------------------------------------------------------------------------
  // ORGANIZER CALLOUT
  // --------------------------------------------------------------------------
  Widget _buildOrganizerCta() {
    return Container(
      margin: const EdgeInsets.fromLTRB(12, 12, 12, 16),
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(color: KnotTheme.deep, borderRadius: BorderRadius.circular(20)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('FOR CLUBS, COLLEGES & COMMUNITIES', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w800, color: KnotTheme.accent)),
          const SizedBox(height: 6),
          const Text('Your next event deserves the right room.', style: TextStyle(fontSize: 17, fontWeight: FontWeight.w800, color: Colors.white)),
          const SizedBox(height: 6),
          const Text('Publish in minutes, add the details participants actually need, and keep everyone informed.', style: TextStyle(fontSize: 12, color: Color(0xFFC9C4D4))),
          const SizedBox(height: 14),
          ElevatedButton(
            onPressed: () {
              Navigator.push(context, MaterialPageRoute(builder: (_) => const CreateEventScreen()));
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: KnotTheme.accent,
              foregroundColor: Colors.white,
              padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 11),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: const [
                Text('Publish or host an event', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 13)),
                SizedBox(width: 6),
                Icon(Icons.arrow_forward, size: 15),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // --------------------------------------------------------------------------
  // DUAL FLOATING ACTION BUTTONS (AI Concierge + Host Event)
  // --------------------------------------------------------------------------
  Widget _buildDualActionPills() {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        // AI Concierge Button
        Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(30),
            color: KnotTheme.deep,
            boxShadow: const [
              BoxShadow(
                color: Color.fromRGBO(33, 26, 61, 0.35),
                blurRadius: 12,
                offset: Offset(0, 4),
              ),
            ],
          ),
          child: Material(
            color: Colors.transparent,
            child: InkWell(
              borderRadius: BorderRadius.circular(30),
              onTap: () {
                AIEventConciergeSheet.show(
                  context,
                  allEvents: _events,
                  allHackathons: _hackathons,
                );
              },
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: const [
                    Icon(Icons.auto_awesome, color: KnotTheme.accent, size: 16),
                    SizedBox(width: 6),
                    Text(
                      'AI Concierge',
                      style: TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.w700,
                        fontSize: 12.5,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),

        const SizedBox(width: 8),

        // Host Event Button
        Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(30),
            gradient: const LinearGradient(
              colors: [Color(0xFF7357D9), Color(0xFF9D4EDD)],
            ),
            boxShadow: const [
              BoxShadow(
                color: Color.fromRGBO(115, 87, 217, 0.4),
                blurRadius: 14,
                offset: Offset(0, 4),
              ),
            ],
          ),
          child: Material(
            color: Colors.transparent,
            child: InkWell(
              borderRadius: BorderRadius.circular(30),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (_) => const CreateEventScreen()),
                );
              },
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 11),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: const [
                    Icon(Icons.add, color: Colors.white, size: 17),
                    SizedBox(width: 6),
                    Text(
                      'Host Event',
                      style: TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.w700,
                        fontSize: 12.5,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}
