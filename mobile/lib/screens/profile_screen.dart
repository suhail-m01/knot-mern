import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../constants/api_constants.dart';
import '../services/auth_service.dart';
import '../theme/knot_theme.dart';
import '../widgets/custom_button.dart';
import '../widgets/mern_health_badge.dart';
import 'auth_screen.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  void _showBackendUrlDialog() {
    final controller = TextEditingController(text: ApiConstants.baseUrl.replaceAll('/api', ''));

    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          backgroundColor: Colors.white,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
          title: const Text('Configure Backend Server', style: TextStyle(fontWeight: FontWeight.w800, fontSize: 17, color: KnotTheme.ink)),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Enter the Express REST API URL where your server is running:',
                style: TextStyle(fontSize: 13, color: KnotTheme.muted),
              ),
              const SizedBox(height: 16),
              TextField(
                controller: controller,
                style: const TextStyle(fontFamily: 'monospace', fontSize: 13),
                decoration: const InputDecoration(
                  hintText: 'http://10.0.2.2:5000 or http://localhost:5000',
                  labelText: 'Server URL',
                ),
              ),
              const SizedBox(height: 12),
              Wrap(
                spacing: 8,
                children: [
                  ActionChip(
                    label: const Text('10.0.2.2:5000 (Android)'),
                    onPressed: () => controller.text = 'http://10.0.2.2:5000',
                  ),
                  ActionChip(
                    label: const Text('localhost:5000 (Web/iOS)'),
                    onPressed: () => controller.text = 'http://localhost:5000',
                  ),
                ],
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Cancel'),
            ),
            ElevatedButton(
              onPressed: () async {
                await ApiConstants.setCustomBaseUrl(controller.text.trim());
                if (mounted) {
                  Navigator.pop(context);
                  setState(() {});
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text('Updated API base URL to ${ApiConstants.baseUrl}'),
                      backgroundColor: KnotTheme.green,
                    ),
                  );
                }
              },
              child: const Text('Save & Apply'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthService>(context);
    final user = auth.user;

    return Scaffold(
      backgroundColor: KnotTheme.background,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        title: const Text(
          'Account & Settings',
          style: TextStyle(fontWeight: FontWeight.w800, fontSize: 18, color: KnotTheme.ink),
        ),
        actions: const [
          Padding(
            padding: EdgeInsets.only(right: 16),
            child: Center(child: MernHealthBadge()),
          ),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // User Card
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(18),
                  border: Border.all(color: KnotTheme.line),
                  boxShadow: const [
                    BoxShadow(
                      color: Color.fromRGBO(39, 28, 66, 0.04),
                      blurRadius: 8,
                      offset: Offset(0, 2),
                    ),
                  ],
                ),
                child: auth.isAuthenticated && user != null
                    ? Column(
                        children: [
                          CircleAvatar(
                            radius: 36,
                            backgroundImage: NetworkImage(user.avatar),
                            backgroundColor: KnotTheme.surfaceSoft,
                          ),
                          const SizedBox(height: 14),
                          Text(
                            user.name,
                            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: KnotTheme.ink),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            user.email,
                            style: const TextStyle(fontSize: 13, color: KnotTheme.muted),
                          ),
                          const SizedBox(height: 10),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                            decoration: BoxDecoration(
                              color: KnotTheme.primarySoft,
                              borderRadius: BorderRadius.circular(20),
                            ),
                            child: Text(
                              '${user.role.toUpperCase()} · ${user.city}',
                              style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: KnotTheme.primary),
                            ),
                          ),
                          const SizedBox(height: 16),
                          const Divider(color: KnotTheme.line),
                          const SizedBox(height: 12),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: const [
                              Icon(Icons.link, size: 16, color: KnotTheme.green),
                              SizedBox(width: 6),
                              Text(
                                'Shared MERN Account Connected',
                                style: TextStyle(fontSize: 12, color: KnotTheme.green, fontWeight: FontWeight.w700),
                              ),
                            ],
                          ),
                        ],
                      )
                    : Column(
                        children: [
                          Container(
                            padding: const EdgeInsets.all(16),
                            decoration: BoxDecoration(
                              color: KnotTheme.primarySoft,
                              shape: BoxShape.circle,
                            ),
                            child: const Icon(Icons.person_outline, size: 36, color: KnotTheme.primary),
                          ),
                          const SizedBox(height: 14),
                          const Text(
                            'Guest Explorer',
                            style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: KnotTheme.ink),
                          ),
                          const SizedBox(height: 6),
                          const Text(
                            'Sign in to sync your tickets, attend events, and host meetups across mobile and web.',
                            textAlign: TextAlign.center,
                            style: TextStyle(fontSize: 12.5, color: KnotTheme.muted),
                          ),
                          const SizedBox(height: 18),
                          CustomButton(
                            text: 'Sign In / Register',
                            icon: Icons.login,
                            onPressed: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(builder: (context) => const AuthScreen()),
                              );
                            },
                          ),
                        ],
                      ),
              ),

              const SizedBox(height: 20),

              // Settings & Configuration
              Container(
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(18),
                  border: Border.all(color: KnotTheme.line),
                ),
                child: Material(
                  color: Colors.transparent,
                  borderRadius: BorderRadius.circular(18),
                  clipBehavior: Clip.antiAlias,
                  child: Column(
                    children: [
                      ListTile(
                        leading: const Icon(Icons.dns_outlined, color: KnotTheme.primary),
                        title: const Text('Backend API Server', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: KnotTheme.ink)),
                        subtitle: Text(ApiConstants.baseUrl, style: const TextStyle(fontSize: 12, color: KnotTheme.muted)),
                        trailing: const Icon(Icons.arrow_forward_ios, size: 14, color: KnotTheme.muted),
                        onTap: _showBackendUrlDialog,
                      ),
                      const Divider(height: 1, color: KnotTheme.line),
                      ListTile(
                        leading: const Icon(Icons.location_city, color: KnotTheme.accentDark),
                        title: const Text('Primary Discovery City', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: KnotTheme.ink)),
                        subtitle: const Text('Bengaluru (40 Localities)', style: TextStyle(fontSize: 12, color: KnotTheme.muted)),
                      ),
                      const Divider(height: 1, color: KnotTheme.line),
                      ListTile(
                        leading: const Icon(Icons.hub_outlined, color: KnotTheme.green),
                        title: const Text('Architecture Stack', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: KnotTheme.ink)),
                        subtitle: const Text('MERN Web + Flutter Mobile Direct Sync', style: TextStyle(fontSize: 12, color: KnotTheme.muted)),
                      ),
                    ],
                  ),
                ),
              ),

              const SizedBox(height: 20),

              // Logout Button
              if (auth.isAuthenticated) ...[
                ElevatedButton.icon(
                  onPressed: () async {
                    await auth.logout();
                    setState(() {});
                  },
                  icon: const Icon(Icons.logout, size: 16),
                  label: const Text('Log Out of Knot Account', style: TextStyle(fontWeight: FontWeight.w700)),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: KnotTheme.surfaceSoft,
                    foregroundColor: KnotTheme.red,
                    elevation: 0,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                ),
              ],

              const SizedBox(height: 30),
            ],
          ),
        ),
      ),
    );
  }
}
