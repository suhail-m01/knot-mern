import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/event_model.dart';
import '../models/registration_model.dart';
import '../services/auth_service.dart';
import '../theme/knot_theme.dart';
import '../widgets/unstop_registration_sheet.dart';
import 'auth_screen.dart';
import 'qr_ticket_screen.dart';

class EventDetailScreen extends StatefulWidget {
  final KnotEvent event;

  const EventDetailScreen({super.key, required this.event});

  @override
  State<EventDetailScreen> createState() => _EventDetailScreenState();
}

class _EventDetailScreenState extends State<EventDetailScreen> {
  RegistrationModel? _myRegistration;

  void _openRegistrationSheet() async {
    final auth = Provider.of<AuthService>(context, listen: false);
    if (!auth.isAuthenticated) {
      final loggedIn = await Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => const AuthScreen()),
      );
      if (loggedIn != true && !auth.isAuthenticated) return;
    }

    if (!mounted) return;
    UnstopRegistrationSheet.show(
      context,
      event: widget.event,
      onSuccess: (reg) {
        setState(() => _myRegistration = reg);
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final event = widget.event;
    final accentColor = KnotTheme.getAccent(event.category);

    return Scaffold(
      backgroundColor: KnotTheme.background,
      appBar: AppBar(
        backgroundColor: KnotTheme.deep,
        foregroundColor: Colors.white,
        elevation: 0,
        title: Text(
          event.category,
          style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: Colors.white),
        ),
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Knot Web Deep Hero Container
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(20),
              decoration: const BoxDecoration(
                color: KnotTheme.deep,
                gradient: LinearGradient(
                  colors: [Color(0xFF211A3D), Color(0xFF2C2350)],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Badges Topline
                  Wrap(
                    spacing: 8,
                    runSpacing: 6,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: accentColor.withOpacity(0.2),
                          borderRadius: BorderRadius.circular(6),
                        ),
                        child: Text(
                          event.category.toUpperCase(),
                          style: TextStyle(
                            fontSize: 10.5,
                            fontWeight: FontWeight.w800,
                            color: KnotTheme.accent,
                            letterSpacing: 0.8,
                          ),
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 4),
                        decoration: BoxDecoration(
                          color: Colors.white.withOpacity(0.12),
                          borderRadius: BorderRadius.circular(14),
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: const [
                            Text('✨', style: TextStyle(fontSize: 10)),
                            SizedBox(width: 4),
                            Text(
                              '94% MATCH',
                              style: TextStyle(
                                fontSize: 10,
                                fontWeight: FontWeight.w800,
                                color: Colors.white,
                                letterSpacing: 0.5,
                              ),
                            ),
                          ],
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: Colors.white.withOpacity(0.08),
                          borderRadius: BorderRadius.circular(14),
                        ),
                        child: const Text(
                          'All ages',
                          style: TextStyle(fontSize: 10.5, color: Color(0xFFC9C4D4), fontWeight: FontWeight.w600),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 14),

                  // Event Title
                  Text(
                    event.title,
                    style: const TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.w800,
                      color: Colors.white,
                      height: 1.25,
                      letterSpacing: -0.5,
                    ),
                  ),
                  const SizedBox(height: 10),

                  // Organizer Pill
                  Row(
                    children: [
                      CircleAvatar(
                        radius: 12,
                        backgroundColor: KnotTheme.accent,
                        child: Text(
                          event.organizer.name.substring(0, 1).toUpperCase(),
                          style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white),
                        ),
                      ),
                      const SizedBox(width: 8),
                      Text(
                        'By ${event.organizer.name}',
                        style: const TextStyle(
                          fontSize: 12.5,
                          fontWeight: FontWeight.w600,
                          color: Color(0xFFC9C4D4),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),

                  // Date Callout with left accent line
                  Container(
                    padding: const EdgeInsets.only(left: 12),
                    decoration: BoxDecoration(
                      border: Border(left: BorderSide(color: KnotTheme.accent, width: 3)),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          event.date,
                          style: const TextStyle(
                            fontSize: 15,
                            fontWeight: FontWeight.w800,
                            color: Colors.white,
                          ),
                        ),
                        const SizedBox(height: 2),
                        Text(
                          '${event.time} IST',
                          style: const TextStyle(
                            fontSize: 12,
                            color: Color(0xFFB5AFBF),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),

            // White Details Card (Matching Knot Web)
            Container(
              margin: const EdgeInsets.all(16),
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(18),
                border: Border.all(color: KnotTheme.line),
                boxShadow: const [
                  BoxShadow(
                    color: Color.fromRGBO(39, 28, 66, 0.05),
                    blurRadius: 10,
                    offset: Offset(0, 2),
                  ),
                ],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Price and Format
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        event.price.isFree ? 'Free' : event.price.displayString,
                        style: TextStyle(
                          fontSize: 22,
                          fontWeight: FontWeight.w800,
                          color: event.price.isFree ? KnotTheme.green : KnotTheme.ink,
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: KnotTheme.surfaceSoft,
                          borderRadius: BorderRadius.circular(14),
                          border: Border.all(color: KnotTheme.line),
                        ),
                        child: Text(
                          event.format,
                          style: const TextStyle(
                            fontSize: 11,
                            fontWeight: FontWeight.w600,
                            color: KnotTheme.ink,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  const Divider(color: KnotTheme.line),
                  const SizedBox(height: 16),

                  // Location Info
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Icon(Icons.location_on_outlined, color: KnotTheme.primary, size: 20),
                      const SizedBox(width: 10),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              event.location.name,
                              style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: KnotTheme.ink),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              event.location.address,
                              style: const TextStyle(fontSize: 12, color: KnotTheme.muted),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 14),

                  // Capacity Info
                  Row(
                    children: [
                      const Icon(Icons.people_outline, color: KnotTheme.muted, size: 18),
                      const SizedBox(width: 10),
                      Text(
                        'Capacity ${event.capacity} · ${event.capacity - event.registeredCount} spots remaining',
                        style: const TextStyle(fontSize: 12, color: KnotTheme.muted, fontWeight: FontWeight.w500),
                      ),
                    ],
                  ),
                  const SizedBox(height: 20),

                  // Register / View Pass Button
                  SizedBox(
                    width: double.infinity,
                    height: 48,
                    child: ElevatedButton(
                      onPressed: _myRegistration != null
                          ? () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => QRTicketScreen(registration: _myRegistration!),
                                ),
                              );
                            }
                          : _openRegistrationSheet,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: _myRegistration != null ? KnotTheme.green : KnotTheme.primary,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                                Icon(
                                  _myRegistration != null ? Icons.confirmation_number_outlined : Icons.auto_awesome,
                                  color: Colors.white,
                                  size: 18,
                                ),
                                const SizedBox(width: 8),
                                Text(
                                  _myRegistration != null ? 'View My Digital Pass' : 'Register Now (Solo / Team)',
                                  style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: Colors.white),
                                ),
                              ],
                            ),
                    ),
                  ),
                ],
              ),
            ),

            // About This Event
            Container(
              margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(18),
                border: Border.all(color: KnotTheme.line),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'About this event',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: KnotTheme.ink),
                  ),
                  const SizedBox(height: 10),
                  Text(
                    event.description,
                    style: const TextStyle(
                      fontSize: 13,
                      color: KnotTheme.muted,
                      height: 1.5,
                    ),
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    'Topics & Tags',
                    style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: KnotTheme.ink),
                  ),
                  const SizedBox(height: 8),
                  Wrap(
                    spacing: 6,
                    runSpacing: 6,
                    children: event.tags.map((tag) {
                      return Container(
                        padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 4),
                        decoration: BoxDecoration(
                          color: KnotTheme.surfaceSoft,
                          borderRadius: BorderRadius.circular(8),
                          border: Border.all(color: KnotTheme.line),
                        ),
                        child: Text(
                          '#$tag',
                          style: const TextStyle(fontSize: 11, color: KnotTheme.muted, fontWeight: FontWeight.w600),
                        ),
                      );
                    }).toList(),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 40),
          ],
        ),
      ),
    );
  }
}
