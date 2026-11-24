import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:qr_flutter/qr_flutter.dart';
import '../models/registration_model.dart';
import '../theme/knot_theme.dart';

class QRTicketScreen extends StatelessWidget {
  final RegistrationModel registration;

  const QRTicketScreen({super.key, required this.registration});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: KnotTheme.background,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        title: const Text(
          'Digital Entry Pass',
          style: TextStyle(fontWeight: FontWeight.w800, fontSize: 18, color: KnotTheme.ink),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20),
          child: Column(
            children: [
              // Ticket Card
              Container(
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(22),
                  border: Border.all(color: KnotTheme.line),
                  boxShadow: const [
                    BoxShadow(
                      color: Color.fromRGBO(39, 28, 66, 0.08),
                      blurRadius: 18,
                      offset: Offset(0, 6),
                    ),
                  ],
                ),
                child: Column(
                  children: [
                    // Top Accent Bar
                    Container(
                      height: 5,
                      width: double.infinity,
                      decoration: const BoxDecoration(
                        color: KnotTheme.primary,
                        borderRadius: BorderRadius.vertical(top: Radius.circular(22)),
                      ),
                    ),

                    // Header Bar
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 12),
                      decoration: const BoxDecoration(
                        color: KnotTheme.surfaceSoft,
                      ),
                      child: Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                            decoration: BoxDecoration(
                              color: KnotTheme.primarySoft,
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: const Text(
                              'KNOT PASS',
                              style: TextStyle(
                                fontSize: 10.5,
                                fontWeight: FontWeight.w900,
                                color: KnotTheme.primary,
                                letterSpacing: 1.0,
                              ),
                            ),
                          ),
                          const Spacer(),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                            decoration: BoxDecoration(
                              color: registration.checkedIn
                                  ? KnotTheme.greenSoft
                                  : KnotTheme.greenSoft,
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: Text(
                              registration.checkedIn ? 'CHECKED IN' : 'CONFIRMED',
                              style: const TextStyle(
                                fontSize: 10.5,
                                fontWeight: FontWeight.w800,
                                color: KnotTheme.green,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),

                    Padding(
                      padding: const EdgeInsets.all(22),
                      child: Column(
                        children: [
                          Text(
                            registration.eventTitle,
                            textAlign: TextAlign.center,
                            style: const TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.w800,
                              color: KnotTheme.ink,
                              letterSpacing: -0.3,
                            ),
                          ),
                          const SizedBox(height: 6),
                          if (registration.event != null) ...[
                            Text(
                              '${registration.event!.date} · ${registration.event!.time}',
                              style: const TextStyle(
                                fontSize: 12.5,
                                color: KnotTheme.muted,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              '${registration.event!.location.name}, ${registration.event!.location.locality}',
                              style: const TextStyle(
                                fontSize: 11.5,
                                color: KnotTheme.muted,
                              ),
                            ),
                          ],
                          const SizedBox(height: 20),

                          // QR Code Container
                          Container(
                            padding: const EdgeInsets.all(14),
                            decoration: BoxDecoration(
                              color: Colors.white,
                              borderRadius: BorderRadius.circular(16),
                              border: Border.all(color: KnotTheme.line),
                            ),
                            child: QrImageView(
                              data: registration.checkInToken,
                              version: QrVersions.auto,
                              size: 190.0,
                              backgroundColor: Colors.white,
                              eyeStyle: const QrEyeStyle(
                                eyeShape: QrEyeShape.square,
                                color: KnotTheme.ink,
                              ),
                              dataModuleStyle: const QrDataModuleStyle(
                                dataModuleShape: QrDataModuleShape.square,
                                color: KnotTheme.ink,
                              ),
                            ),
                          ),
                          const SizedBox(height: 14),

                          // Token Box
                          GestureDetector(
                            onTap: () {
                              Clipboard.setData(ClipboardData(text: registration.checkInToken));
                              ScaffoldMessenger.of(context).showSnackBar(
                                const SnackBar(
                                  content: Text('Pass token copied to clipboard!'),
                                  backgroundColor: KnotTheme.primary,
                                  duration: Duration(seconds: 1),
                                ),
                              );
                            },
                            child: Container(
                              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 7),
                              decoration: BoxDecoration(
                                color: KnotTheme.surfaceSoft,
                                borderRadius: BorderRadius.circular(8),
                                border: Border.all(color: KnotTheme.line),
                              ),
                              child: Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  Text(
                                    registration.checkInToken,
                                    style: const TextStyle(
                                      fontFamily: 'monospace',
                                      fontSize: 12,
                                      color: KnotTheme.primaryDark,
                                      fontWeight: FontWeight.w700,
                                    ),
                                  ),
                                  const SizedBox(width: 8),
                                  const Icon(Icons.copy, size: 14, color: KnotTheme.muted),
                                ],
                              ),
                            ),
                          ),
                          const SizedBox(height: 18),

                          const Divider(color: KnotTheme.line),
                          const SizedBox(height: 14),

                          // Attendee Row
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Text('ATTENDEE', style: TextStyle(fontSize: 10, color: KnotTheme.muted, fontWeight: FontWeight.w800)),
                                  const SizedBox(height: 2),
                                  Text(registration.userName, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: KnotTheme.ink)),
                                ],
                              ),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.end,
                                children: [
                                  const Text('PASS STATUS', style: TextStyle(fontSize: 10, color: KnotTheme.muted, fontWeight: FontWeight.w800)),
                                  const SizedBox(height: 2),
                                  Text(registration.status, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w800, color: KnotTheme.green)),
                                ],
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 20),
              const Text(
                'Present this QR pass at the entrance gate to check in.\nOrganizers can verify it instantly using the Knot Scanner.',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 12, color: KnotTheme.muted),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
