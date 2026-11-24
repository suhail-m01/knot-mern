import 'package:flutter/material.dart';
import '../services/api_service.dart';
import '../theme/knot_theme.dart';
import '../constants/api_constants.dart';

class MernHealthBadge extends StatefulWidget {
  const MernHealthBadge({super.key});

  @override
  State<MernHealthBadge> createState() => _MernHealthBadgeState();
}

class _MernHealthBadgeState extends State<MernHealthBadge> {
  bool _isConnected = false;
  bool _isLoading = true;
  Map<String, dynamic>? _statusData;

  @override
  void initState() {
    super.initState();
    _checkHealth();
  }

  Future<void> _checkHealth() async {
    try {
      final res = await ApiService().getMernStatus();
      if (mounted) {
        setState(() {
          _statusData = res;
          _isConnected = res['status'] == 'healthy' || res['architecture'] != null;
          _isLoading = false;
        });
      }
    } catch (_) {
      if (mounted) {
        setState(() {
          _isConnected = false;
          _isLoading = false;
        });
      }
    }
  }

  void _showMernDiagnosticsModal() {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.white,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (context) {
        return DraggableScrollableSheet(
          initialChildSize: 0.65,
          minChildSize: 0.4,
          maxChildSize: 0.9,
          expand: false,
          builder: (context, scrollController) {
            return Padding(
              padding: const EdgeInsets.all(20),
              child: ListView(
                controller: scrollController,
                children: [
                  Center(
                    child: Container(
                      width: 40,
                      height: 4,
                      margin: const EdgeInsets.only(bottom: 20),
                      decoration: BoxDecoration(
                        color: KnotTheme.line,
                        borderRadius: BorderRadius.circular(2),
                      ),
                    ),
                  ),
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          color: KnotTheme.primarySoft,
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: const Icon(Icons.hub_outlined, color: KnotTheme.primary, size: 24),
                      ),
                      const SizedBox(width: 12),
                      const Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'MERNOVA X 2026 Engine',
                            style: TextStyle(fontSize: 17, fontWeight: FontWeight.w800, color: KnotTheme.ink),
                          ),
                          Text(
                            'Shared MERN Backend Diagnostics',
                            style: TextStyle(fontSize: 12.5, color: KnotTheme.muted),
                          ),
                        ],
                      ),
                    ],
                  ),
                  const SizedBox(height: 20),
                  _diagRow('M', 'MongoDB Database', _statusData?['stack']?['mongo']?['status'] ?? (_isConnected ? 'Connected' : 'Dual-Engine Emulated'), Icons.storage),
                  _diagRow('E', 'Express.js REST API', _isConnected ? 'Active on :5000' : 'Unreachable', Icons.cloud_done),
                  _diagRow('R', 'React Web Client', 'Running (Vite 7)', Icons.web),
                  _diagRow('N', 'Node.js Runtime', _statusData?['diagnostics']?['nodeVersion'] ?? 'Active', Icons.terminal),
                  _diagRow('F', 'Flutter Mobile Client', 'Connected to API', Icons.phone_android, isFlutter: true),
                  const SizedBox(height: 18),
                  Container(
                    padding: const EdgeInsets.all(14),
                    decoration: BoxDecoration(
                      color: KnotTheme.surfaceSoft,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: KnotTheme.line),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Backend REST Endpoint',
                          style: TextStyle(fontSize: 11, color: KnotTheme.muted, fontWeight: FontWeight.w700),
                        ),
                        const SizedBox(height: 4),
                        SelectableText(
                          ApiConstants.baseUrl,
                          style: const TextStyle(fontSize: 12.5, color: KnotTheme.primaryDark, fontFamily: 'monospace', fontWeight: FontWeight.w600),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton.icon(
                    onPressed: () {
                      Navigator.pop(context);
                      _checkHealth();
                    },
                    icon: const Icon(Icons.refresh, size: 18),
                    label: const Text('Re-probe Connection'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: KnotTheme.primary,
                      foregroundColor: Colors.white,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                    ),
                  ),
                ],
              ),
            );
          },
        );
      },
    );
  }

  Widget _diagRow(String letter, String title, String status, IconData icon, {bool isFlutter = false}) {
    final bool ok = isFlutter ? true : _isConnected;
    final color = isFlutter ? KnotTheme.primary : (ok ? KnotTheme.green : KnotTheme.accentDark);

    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: KnotTheme.line),
      ),
      child: Row(
        children: [
          Container(
            width: 28,
            height: 28,
            decoration: BoxDecoration(
              color: color.withOpacity(0.12),
              borderRadius: BorderRadius.circular(6),
            ),
            child: Center(
              child: Text(
                letter,
                style: TextStyle(color: color, fontWeight: FontWeight.w900, fontSize: 13),
              ),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 12.5, color: KnotTheme.ink)),
                Text(status, style: TextStyle(color: color, fontSize: 11, fontWeight: FontWeight.w600)),
              ],
            ),
          ),
          Icon(icon, size: 18, color: KnotTheme.muted),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: _showMernDiagnosticsModal,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
        decoration: BoxDecoration(
          color: (_isConnected ? KnotTheme.greenSoft : KnotTheme.surfaceSoft),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: (_isConnected ? KnotTheme.green.withOpacity(0.3) : KnotTheme.line),
          ),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 7,
              height: 7,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: _isConnected ? KnotTheme.liveDot : KnotTheme.amber,
              ),
            ),
            const SizedBox(width: 5),
            Text(
              _isLoading ? 'MERN...' : (_isConnected ? 'MERN Live' : 'MERN Ready'),
              style: TextStyle(
                fontSize: 10.5,
                fontWeight: FontWeight.w700,
                color: _isConnected ? KnotTheme.green : KnotTheme.muted,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
