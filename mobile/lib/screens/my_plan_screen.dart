import 'dart:async';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/registration_model.dart';
import '../services/api_service.dart';
import '../services/auth_service.dart';
import '../services/bookmarks_service.dart';
import '../theme/knot_theme.dart';
import '../widgets/event_card.dart';
import '../widgets/hackathon_card.dart';
import '../widgets/custom_button.dart';
import 'auth_screen.dart';
import 'qr_ticket_screen.dart';

class MyPlanScreen extends StatefulWidget {
  const MyPlanScreen({super.key});

  @override
  State<MyPlanScreen> createState() => _MyPlanScreenState();
}

class _MyPlanScreenState extends State<MyPlanScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  List<RegistrationModel> _registrations = [];
  bool _isLoading = true;
  Timer? _syncTimer;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    _loadRegistrations();
    _syncTimer = Timer.periodic(const Duration(seconds: 30), (_) {
      if (mounted && !_isLoading) {
        _loadRegistrationsQuiet();
      }
    });
    BookmarksService().addListener(_onBookmarksChanged);
  }

  @override
  void dispose() {
    _tabController.dispose();
    _syncTimer?.cancel();
    BookmarksService().removeListener(_onBookmarksChanged);
    super.dispose();
  }

  void _onBookmarksChanged() {
    if (mounted) setState(() {});
  }

  Future<void> _loadRegistrationsQuiet() async {
    final auth = Provider.of<AuthService>(context, listen: false);
    if (!auth.isAuthenticated) return;
    try {
      final api = ApiService(token: auth.token, userId: auth.user?.id);
      final items = await api.getMyRegistrations();
      if (mounted && items.isNotEmpty) {
        setState(() => _registrations = items);
      }
    } catch (_) {}
  }

  Future<void> _loadRegistrations() async {
    final auth = Provider.of<AuthService>(context, listen: false);
    if (!auth.isAuthenticated) {
      setState(() {
        _isLoading = false;
        _registrations = [];
      });
      return;
    }

    setState(() => _isLoading = true);

    try {
      final api = ApiService(token: auth.token, userId: auth.user?.id);
      final items = await api.getMyRegistrations();
      if (mounted) {
        setState(() {
          _registrations = items;
          _isLoading = false;
        });
      }
    } catch (_) {
      if (mounted) {
        setState(() => _isLoading = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthService>(context);
    final bookmarks = BookmarksService();

    return Scaffold(
      backgroundColor: KnotTheme.background,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        title: const Text(
          'My Plan',
          style: TextStyle(fontWeight: FontWeight.w800, fontSize: 18, color: KnotTheme.ink),
        ),
        bottom: TabBar(
          controller: _tabController,
          labelColor: KnotTheme.primary,
          unselectedLabelColor: KnotTheme.muted,
          indicatorColor: KnotTheme.primary,
          indicatorWeight: 3,
          labelStyle: const TextStyle(fontWeight: FontWeight.w800, fontSize: 13),
          tabs: [
            Tab(text: 'Passes (${_registrations.length})'),
            Tab(text: 'Saved Interests (${bookmarks.totalSavedCount})'),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh, color: KnotTheme.ink),
            onPressed: _loadRegistrations,
          ),
        ],
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          // TAB 1: CONFIRMED PASSES
          _buildPassesTab(auth),

          // TAB 2: SAVED INTERESTS
          _buildSavedTab(bookmarks),
        ],
      ),
    );
  }

  Widget _buildPassesTab(AuthService auth) {
    if (!auth.isAuthenticated) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(28),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: KnotTheme.primarySoft,
                  shape: BoxShape.circle,
                ),
                child: const Icon(Icons.confirmation_number_outlined, size: 48, color: KnotTheme.primary),
              ),
              const SizedBox(height: 18),
              const Text(
                'Sign In to Access Passes',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: KnotTheme.ink),
              ),
              const SizedBox(height: 8),
              const Text(
                'Access your registered events, QR check-in tickets, and offline event passes.',
                textAlign: TextAlign.center,
                style: TextStyle(color: KnotTheme.muted, fontSize: 13),
              ),
              const SizedBox(height: 20),
              CustomButton(
                text: 'Sign In / Register',
                icon: Icons.login,
                onPressed: () async {
                  await Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const AuthScreen()),
                  );
                  _loadRegistrations();
                },
              ),
            ],
          ),
        ),
      );
    }

    if (_isLoading) {
      return const Center(child: CircularProgressIndicator());
    }

    if (_registrations.isEmpty) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(32),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: const [
              Icon(Icons.bookmark_border, size: 48, color: KnotTheme.soft),
              SizedBox(height: 14),
              Text(
                'No Event Passes Yet',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: KnotTheme.ink),
              ),
              SizedBox(height: 6),
              Text(
                'Explore events in Bengaluru and register to get your digital pass.',
                textAlign: TextAlign.center,
                style: TextStyle(color: KnotTheme.muted, fontSize: 13),
              ),
            ],
          ),
        ),
      );
    }

    return RefreshIndicator(
      color: KnotTheme.primary,
      onRefresh: _loadRegistrations,
      child: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: _registrations.length,
        itemBuilder: (context, index) {
          final reg = _registrations[index];
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
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                      decoration: BoxDecoration(
                        color: KnotTheme.greenSoft,
                        borderRadius: BorderRadius.circular(6),
                      ),
                      child: const Text(
                        'CONFIRMED',
                        style: TextStyle(fontSize: 10.5, fontWeight: FontWeight.w800, color: KnotTheme.green),
                      ),
                    ),
                    Text(
                      reg.ticketNumber,
                      style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: KnotTheme.muted),
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                Text(
                  reg.eventTitle,
                  style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: KnotTheme.ink),
                ),
                const SizedBox(height: 6),
                Row(
                  children: [
                    const Icon(Icons.calendar_today, size: 13, color: KnotTheme.muted),
                    const SizedBox(width: 5),
                    Text(reg.date, style: const TextStyle(fontSize: 12, color: KnotTheme.muted)),
                    const SizedBox(width: 12),
                    const Icon(Icons.location_on_outlined, size: 14, color: KnotTheme.muted),
                    const SizedBox(width: 4),
                    Text(reg.location, style: const TextStyle(fontSize: 12, color: KnotTheme.muted)),
                  ],
                ),
                const SizedBox(height: 14),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton.icon(
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => QRTicketScreen(registration: reg),
                        ),
                      );
                    },
                    icon: const Icon(Icons.qr_code, size: 16),
                    label: const Text('View Digital QR Pass', style: TextStyle(fontSize: 12.5, fontWeight: FontWeight.w700)),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: KnotTheme.primary,
                      foregroundColor: Colors.white,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                    ),
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildSavedTab(BookmarksService bookmarks) {
    final savedEvents = bookmarks.savedEvents;
    final savedHackathons = bookmarks.savedHackathons;

    if (savedEvents.isEmpty && savedHackathons.isEmpty) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(32),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: const [
              Icon(Icons.bookmark_add_outlined, size: 48, color: KnotTheme.soft),
              SizedBox(height: 14),
              Text(
                'No Saved Events Yet',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: KnotTheme.ink),
              ),
              SizedBox(height: 6),
              Text(
                'Bookmark events or hackathons from the Explore feed to build your personalized plan.',
                textAlign: TextAlign.center,
                style: TextStyle(color: KnotTheme.muted, fontSize: 13),
              ),
            ],
          ),
        ),
      );
    }

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        if (savedEvents.isNotEmpty) ...[
          const Text(
            'SAVED EVENTS & WORKSHOPS',
            style: TextStyle(fontSize: 10.5, fontWeight: FontWeight.w800, color: KnotTheme.primary, letterSpacing: 0.8),
          ),
          const SizedBox(height: 10),
          ...savedEvents.map((evt) => EventCard(event: evt, onRefresh: () => setState(() {}))),
        ],
        if (savedHackathons.isNotEmpty) ...[
          const SizedBox(height: 14),
          const Text(
            'SAVED HACKATHONS',
            style: TextStyle(fontSize: 10.5, fontWeight: FontWeight.w800, color: KnotTheme.accentDark, letterSpacing: 0.8),
          ),
          const SizedBox(height: 10),
          ...savedHackathons.map((hack) => HackathonCard(hackathon: hack, onSaved: () => setState(() {}))),
        ],
      ],
    );
  }
}
