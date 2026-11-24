import 'package:flutter/material.dart';
import '../models/hackathon_model.dart';
import '../screens/event_detail_screen.dart';
import '../services/bookmarks_service.dart';
import '../theme/knot_theme.dart';
import '../utils/url_launcher_util.dart';

class HackathonCard extends StatefulWidget {
  final HackathonModel hackathon;
  final VoidCallback? onSaved;

  const HackathonCard({
    super.key,
    required this.hackathon,
    this.onSaved,
  });

  @override
  State<HackathonCard> createState() => _HackathonCardState();
}

class _HackathonCardState extends State<HackathonCard> {
  @override
  Widget build(BuildContext context) {
    final hack = widget.hackathon;
    final isLive = hack.status.toUpperCase() == 'LIVE' || hack.status.toUpperCase() == 'ACTIVE';

    return Container(
      margin: const EdgeInsets.only(bottom: 16),
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
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          borderRadius: BorderRadius.circular(18),
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => EventDetailScreen(event: hack.toKnotEvent()),
              ),
            );
          },
          child: ClipRRect(
            borderRadius: BorderRadius.circular(18),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
            // Top Accent Bar (Purple for Hackathons)
            Container(
              height: 4,
              width: double.infinity,
              color: const Color(0xFF7357D9),
            ),

            // Optional Cover Image
            if (hack.coverUrl.isNotEmpty) ...[
              SizedBox(
                height: 120,
                width: double.infinity,
                child: Image.network(
                  hack.coverUrl,
                  fit: BoxFit.cover,
                  errorBuilder: (_, __, ___) => const SizedBox.shrink(),
                ),
              ),
            ],

            Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Topline: Tag + Source Platform
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                        decoration: BoxDecoration(
                          color: const Color(0xFF7357D9).withOpacity(0.1),
                          borderRadius: BorderRadius.circular(6),
                        ),
                        child: Text(
                          isLive ? 'HAPPENING NOW' : 'HACKATHON',
                          style: const TextStyle(
                            fontSize: 10.5,
                            fontWeight: FontWeight.w800,
                            color: Color(0xFF7357D9),
                            letterSpacing: 0.8,
                          ),
                        ),
                      ),
                      Text(
                        'via ${hack.platform}',
                        style: const TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w600,
                          color: KnotTheme.muted,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),

                  // Heading: Date Block + Title + Organizer
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Date Block
                      Container(
                        width: 48,
                        padding: const EdgeInsets.symmetric(vertical: 6),
                        decoration: BoxDecoration(
                          color: KnotTheme.surfaceSoft,
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(color: KnotTheme.line),
                        ),
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Text(
                              hack.dayNumber,
                              style: const TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.w800,
                                color: KnotTheme.ink,
                                height: 1.0,
                              ),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              hack.monthCode,
                              style: const TextStyle(
                                fontSize: 10,
                                fontWeight: FontWeight.w800,
                                color: KnotTheme.muted,
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(width: 12),
                      // Title and Organizer
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              hack.title,
                              style: const TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.w800,
                                color: KnotTheme.ink,
                                height: 1.25,
                                letterSpacing: -0.3,
                              ),
                              maxLines: 2,
                              overflow: TextOverflow.ellipsis,
                            ),
                            const SizedBox(height: 3),
                            Text(
                              'By ${hack.organizer}',
                              style: const TextStyle(
                                fontSize: 12,
                                fontWeight: FontWeight.w500,
                                color: KnotTheme.muted,
                              ),
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),

                  // Description
                  if (hack.tagline.isNotEmpty) ...[
                    const SizedBox(height: 10),
                    Text(
                      hack.tagline,
                      style: const TextStyle(
                        fontSize: 12.5,
                        color: KnotTheme.muted,
                        height: 1.35,
                      ),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ],

                  const SizedBox(height: 12),

                  // Metadata Row: Location & Team
                  Wrap(
                    spacing: 14,
                    runSpacing: 6,
                    children: [
                      Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          const Icon(Icons.location_on_outlined, size: 14, color: KnotTheme.accentDark),
                          const SizedBox(width: 4),
                          Text(
                            '${hack.city} · ${hack.mode}',
                            style: const TextStyle(fontSize: 12, color: KnotTheme.muted, fontWeight: FontWeight.w500),
                          ),
                        ],
                      ),
                      Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          const Icon(Icons.people_outline, size: 14, color: KnotTheme.primary),
                          const SizedBox(width: 4),
                          Text(
                            hack.teamSize,
                            style: const TextStyle(fontSize: 12, color: KnotTheme.muted, fontWeight: FontWeight.w500),
                          ),
                        ],
                      ),
                      if (hack.prizePool.amount > 0)
                        Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            const Icon(Icons.emoji_events_outlined, size: 14, color: KnotTheme.amber),
                            const SizedBox(width: 4),
                            Text(
                              hack.prizePool.displayString,
                              style: const TextStyle(fontSize: 12, color: KnotTheme.amber, fontWeight: FontWeight.w700),
                            ),
                          ],
                        ),
                    ],
                  ),

                  const SizedBox(height: 14),

                  // Footer: Price Badge & Official Action
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      // Price
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: hack.isFree ? KnotTheme.greenSoft : KnotTheme.surfaceSoft,
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Text(
                          hack.isFree ? 'FREE' : 'PAID',
                          style: TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w800,
                            color: hack.isFree ? KnotTheme.green : KnotTheme.ink,
                          ),
                        ),
                      ),

                      // Action Buttons
                      Row(
                        children: [
                          IconButton(
                            icon: Icon(
                              BookmarksService().isHackathonSaved(hack.id) ? Icons.bookmark : Icons.bookmark_border,
                              color: BookmarksService().isHackathonSaved(hack.id) ? KnotTheme.primary : KnotTheme.muted,
                              size: 20,
                            ),
                            onPressed: () {
                              BookmarksService().toggleHackathonBookmark(hack);
                              setState(() {});
                              final saved = BookmarksService().isHackathonSaved(hack.id);
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text(saved ? '✨ Hackathon saved to My Plan!' : 'Removed from saved'),
                                  backgroundColor: saved ? KnotTheme.primary : KnotTheme.ink,
                                  duration: const Duration(seconds: 1),
                                ),
                              );
                              if (widget.onSaved != null) widget.onSaved!();
                            },
                            tooltip: 'Save to My Interests',
                          ),
                          const SizedBox(width: 4),
                          ElevatedButton(
                            onPressed: () async {
                              final targetUrl = hack.effectiveUrl;
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text('Opening registration on ${hack.platform}...'),
                                  backgroundColor: KnotTheme.primary,
                                  duration: const Duration(seconds: 2),
                                ),
                              );
                              final launched = await UrlLauncherUtil.openUrl(targetUrl);
                              if (!launched && context.mounted) {
                                // If external launch fails, fall back to native event detail screen
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) => EventDetailScreen(event: hack.toKnotEvent()),
                                  ),
                                );
                              }
                            },
                            style: ElevatedButton.styleFrom(
                              backgroundColor: KnotTheme.primary,
                              foregroundColor: Colors.white,
                              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 9),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(9)),
                            ),
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: const [
                                Text('Interested', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 12)),
                                SizedBox(width: 4),
                                Icon(Icons.arrow_outward, size: 13),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),

                  const SizedBox(height: 10),

                  // Trust footnote
                  Row(
                    children: const [
                      Icon(Icons.check_circle_outline, size: 12, color: KnotTheme.green),
                      SizedBox(width: 4),
                      Text(
                        'Organizer-domain link checked · External registration',
                        style: TextStyle(fontSize: 10.5, color: KnotTheme.muted),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    ),
  ),
);
  }
}
