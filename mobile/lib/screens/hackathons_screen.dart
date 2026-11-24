import 'package:flutter/material.dart';
import '../data/fallback_data.dart';
import '../models/hackathon_model.dart';
import '../services/api_service.dart';
import '../theme/knot_theme.dart';
import '../widgets/hackathon_card.dart';

class HackathonsScreen extends StatefulWidget {
  const HackathonsScreen({super.key});

  @override
  State<HackathonsScreen> createState() => _HackathonsScreenState();
}

class _HackathonsScreenState extends State<HackathonsScreen> {
  List<HackathonModel> _hackathons = [];
  bool _isLoading = true;
  String _selectedFilter = 'All';

  final List<String> _filterPills = ['All', 'Online', 'In-Person', 'Free Only'];

  @override
  void initState() {
    super.initState();
    _loadHackathons();
  }

  Future<void> _loadHackathons() async {
    setState(() => _isLoading = true);
    try {
      final items = await ApiService().getHackathons();
      if (mounted) {
        setState(() {
          _hackathons = items.isNotEmpty ? items : FallbackData.fallbackHackathons;
          _isLoading = false;
        });
      }
    } catch (_) {
      if (mounted) {
        setState(() {
          _hackathons = FallbackData.fallbackHackathons;
          _isLoading = false;
        });
      }
    }
  }

  List<HackathonModel> get _filteredHackathons {
    if (_selectedFilter == 'Online') {
      return _hackathons.where((h) => h.mode.toLowerCase().contains('online')).toList();
    } else if (_selectedFilter == 'In-Person') {
      return _hackathons.where((h) => !h.mode.toLowerCase().contains('online')).toList();
    } else if (_selectedFilter == 'Free Only') {
      return _hackathons.where((h) => h.isFree).toList();
    }
    return _hackathons;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: KnotTheme.background,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        scrolledUnderElevation: 1,
        title: const Text(
          'Hackathons',
          style: TextStyle(fontWeight: FontWeight.w800, fontSize: 18, color: KnotTheme.ink),
        ),
      ),
      body: RefreshIndicator(
        color: KnotTheme.primary,
        onRefresh: _loadHackathons,
        child: SingleChildScrollView(
          physics: const AlwaysScrollableScrollPhysics(),
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Page Header
              const Text(
                'PERMISSIONED DISCOVERY · INDIA + ONLINE',
                style: TextStyle(
                  fontSize: 10,
                  fontWeight: FontWeight.w800,
                  color: KnotTheme.primary,
                  letterSpacing: 0.8,
                ),
              ),
              const SizedBox(height: 4),
              const Text(
                'Hackathons worth building for.',
                style: TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.w800,
                  color: KnotTheme.ink,
                  letterSpacing: -0.5,
                ),
              ),
              const SizedBox(height: 6),
              const Text(
                'Source-linked hackathon listings with conservative details and verified snapshot states. An Interested click opens the official platform.',
                style: TextStyle(
                  fontSize: 12.5,
                  color: KnotTheme.muted,
                  height: 1.35,
                ),
              ),
              const SizedBox(height: 14),

              // Filter pills
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: _filterPills.map((filter) {
                    final isSelected = _selectedFilter == filter;
                    return Padding(
                      padding: const EdgeInsets.only(right: 8),
                      child: InkWell(
                        onTap: () => setState(() => _selectedFilter = filter),
                        borderRadius: BorderRadius.circular(20),
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 7),
                          decoration: BoxDecoration(
                            color: isSelected ? KnotTheme.primary : Colors.white,
                            borderRadius: BorderRadius.circular(20),
                            border: Border.all(
                              color: isSelected ? KnotTheme.primary : KnotTheme.line,
                            ),
                          ),
                          child: Text(
                            filter,
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
              ),
              const SizedBox(height: 16),

              // Results count
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    '${_filteredHackathons.length} verified listings',
                    style: const TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w700,
                      color: KnotTheme.ink,
                    ),
                  ),
                  const Text(
                    'Devfolio · Unstop · HasGeek',
                    style: TextStyle(fontSize: 11, color: KnotTheme.muted),
                  ),
                ],
              ),
              const SizedBox(height: 12),

              // Hackathons List
              if (_isLoading)
                const Center(child: Padding(padding: EdgeInsets.all(32), child: CircularProgressIndicator()))
              else if (_filteredHackathons.isEmpty)
                Container(
                  padding: const EdgeInsets.all(24),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: KnotTheme.line),
                  ),
                  child: Center(
                    child: Column(
                      children: const [
                        Icon(Icons.search_off, size: 36, color: KnotTheme.muted),
                        SizedBox(height: 10),
                        Text(
                          'No hackathons match these filters',
                          style: TextStyle(fontWeight: FontWeight.w700, fontSize: 14),
                        ),
                        SizedBox(height: 4),
                        Text('Try browsing all hackathons or switching modes.', style: TextStyle(color: KnotTheme.muted, fontSize: 12)),
                      ],
                    ),
                  ),
                )
              else
                ..._filteredHackathons.map((hackathon) => HackathonCard(
                  hackathon: hackathon,
                  onSaved: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('Saved to your interests!'),
                        backgroundColor: KnotTheme.primary,
                        duration: Duration(seconds: 1),
                      ),
                    );
                  },
                )),

              const SizedBox(height: 40),
            ],
          ),
        ),
      ),
    );
  }
}
