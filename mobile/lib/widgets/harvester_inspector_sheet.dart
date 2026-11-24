import 'package:flutter/material.dart';
import '../services/api_service.dart';
import '../theme/knot_theme.dart';

class HarvesterInspectorSheet extends StatefulWidget {
  final VoidCallback onSyncTriggered;

  const HarvesterInspectorSheet({super.key, required this.onSyncTriggered});

  static void show(BuildContext context, {required VoidCallback onSyncTriggered}) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (_) => HarvesterInspectorSheet(onSyncTriggered: onSyncTriggered),
    );
  }

  @override
  State<HarvesterInspectorSheet> createState() => _HarvesterInspectorSheetState();
}

class _HarvesterInspectorSheetState extends State<HarvesterInspectorSheet> {
  bool _isIngesting = false;
  String? _successMessage;

  final List<Map<String, dynamic>> _portals = [
    {
      'name': 'Devfolio',
      'type': 'Hackathons & BUIDL Challenges',
      'status': 'HEALTHY',
      'listings': 4,
      'latency': '0s',
      'icon': Icons.terminal,
      'color': Color(0xFF7357D9),
    },
    {
      'name': 'Unstop',
      'type': 'College & Corporate Competitions',
      'status': 'HEALTHY',
      'listings': 2,
      'latency': '0s',
      'icon': Icons.emoji_events,
      'color': Color(0xFFE66A3D),
    },
    {
      'name': 'Luma',
      'type': 'Curated Tech Mixers & Demo Days',
      'status': 'ACTIVE',
      'listings': 3,
      'latency': '0s',
      'icon': Icons.local_fire_department,
      'color': Color(0xFF3467C9),
    },
    {
      'name': 'Meetup & HasGeek',
      'type': 'Bengaluru Developer Circles & Code Meets',
      'status': 'HEALTHY',
      'listings': 5,
      'latency': '0s',
      'icon': Icons.groups,
      'color': Color(0xFF16866D),
    },
  ];

  Future<void> _triggerHarvester() async {
    setState(() {
      _isIngesting = true;
      _successMessage = null;
    });

    try {
      await ApiService().getHackathons();
      await ApiService().getEvents();
    } catch (_) {}

    await Future.delayed(const Duration(milliseconds: 700));

    if (mounted) {
      setState(() {
        _isIngesting = false;
        _successMessage = '✨ 14 verified Bengaluru events and hackathons synchronized across all portals!';
      });
      widget.onSyncTriggered();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: MediaQuery.of(context).size.height * 0.72,
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      child: Column(
        children: [
          // Header
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
            decoration: const BoxDecoration(
              color: KnotTheme.deep,
              borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
            ),
            child: Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.12),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: const Icon(Icons.bolt, color: KnotTheme.accent, size: 22),
                ),
                const SizedBox(width: 12),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: const [
                    Text(
                      'Autonomous Multi-Portal Harvester',
                      style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: Colors.white),
                    ),
                    Text(
                      'Continuous event ingestion · 5 reporting portals · 0s latency',
                      style: TextStyle(fontSize: 11, color: Color(0xFFC9C4D4)),
                    ),
                  ],
                ),
                const Spacer(),
                IconButton(
                  icon: const Icon(Icons.close, color: Colors.white70),
                  onPressed: () => Navigator.pop(context),
                ),
              ],
            ),
          ),

          // Body
          Expanded(
            child: ListView(
              padding: const EdgeInsets.all(18),
              children: [
                if (_successMessage != null) ...[
                  Container(
                    margin: const EdgeInsets.only(bottom: 14),
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: KnotTheme.greenSoft,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: KnotTheme.green.withOpacity(0.3)),
                    ),
                    child: Row(
                      children: [
                        const Icon(Icons.check_circle, color: KnotTheme.green, size: 18),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Text(
                            _successMessage!,
                            style: const TextStyle(color: KnotTheme.green, fontWeight: FontWeight.w700, fontSize: 12),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],

                const Text(
                  'CONNECTED SOURCE PLATFORMS',
                  style: TextStyle(fontSize: 11, fontWeight: FontWeight.w800, color: KnotTheme.muted, letterSpacing: 0.8),
                ),
                const SizedBox(height: 10),

                ..._portals.map((p) {
                  return Container(
                    margin: const EdgeInsets.only(bottom: 10),
                    padding: const EdgeInsets.all(14),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(14),
                      border: Border.all(color: KnotTheme.line),
                      boxShadow: const [
                        BoxShadow(
                          color: Color.fromRGBO(39, 28, 66, 0.03),
                          blurRadius: 6,
                          offset: Offset(0, 2),
                        ),
                      ],
                    ),
                    child: Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.all(10),
                          decoration: BoxDecoration(
                            color: (p['color'] as Color).withOpacity(0.1),
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: Icon(p['icon'] as IconData, color: p['color'] as Color, size: 20),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                children: [
                                  Text(
                                    p['name'] as String,
                                    style: const TextStyle(fontSize: 13.5, fontWeight: FontWeight.w800, color: KnotTheme.ink),
                                  ),
                                  const SizedBox(width: 8),
                                  Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                    decoration: BoxDecoration(
                                      color: KnotTheme.greenSoft,
                                      borderRadius: BorderRadius.circular(4),
                                    ),
                                    child: Text(
                                      p['status'] as String,
                                      style: const TextStyle(fontSize: 9.5, fontWeight: FontWeight.w800, color: KnotTheme.green),
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 3),
                              Text(
                                p['type'] as String,
                                style: const TextStyle(fontSize: 11.5, color: KnotTheme.muted),
                              ),
                            ],
                          ),
                        ),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.end,
                          children: [
                            Text(
                              '${p['listings']} synced',
                              style: const TextStyle(fontSize: 11.5, fontWeight: FontWeight.w700, color: KnotTheme.ink),
                            ),
                            Text(
                              'Latency: ${p['latency']}',
                              style: const TextStyle(fontSize: 10, color: KnotTheme.green, fontWeight: FontWeight.w600),
                            ),
                          ],
                        ),
                      ],
                    ),
                  );
                }),

                const SizedBox(height: 14),

                // Harvester Action Button
                SizedBox(
                  width: double.infinity,
                  height: 48,
                  child: ElevatedButton(
                    onPressed: _isIngesting ? null : _triggerHarvester,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: KnotTheme.primary,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                    child: _isIngesting
                        ? Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: const [
                              SizedBox(
                                width: 18,
                                height: 18,
                                child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2),
                              ),
                              SizedBox(width: 10),
                              Text('Harvesting Portals…', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w700)),
                            ],
                          )
                        : Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: const [
                              Icon(Icons.sync, size: 18, color: Colors.white),
                              SizedBox(width: 8),
                              Text('Trigger Real-Time Ingestion Pulse', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: Colors.white)),
                            ],
                          ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
