import 'package:flutter/material.dart';
import '../models/event_model.dart';
import '../services/bookmarks_service.dart';
import '../theme/knot_theme.dart';
import '../screens/event_detail_screen.dart';

class EventCard extends StatefulWidget {
  final KnotEvent event;
  final VoidCallback? onRefresh;

  const EventCard({
    super.key,
    required this.event,
    this.onRefresh,
  });

  @override
  State<EventCard> createState() => _EventCardState();
}

class _EventCardState extends State<EventCard> {
  @override
  Widget build(BuildContext context) {
    final event = widget.event;
    final accentColor = KnotTheme.getAccent(event.category);

    // Parse date parts
    String day = '12';
    String month = 'DEC';
    final parts = event.date.split(' ');
    if (parts.length >= 3) {
      month = parts[1].replaceAll(',', '').toUpperCase();
      day = parts[2].replaceAll(',', '');
    }

    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      decoration: BoxDecoration(
        color: KnotTheme.surface,
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
      child: ClipRRect(
        borderRadius: BorderRadius.circular(18),
        child: InkWell(
          onTap: () async {
            await Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => EventDetailScreen(event: event),
              ),
            );
            if (widget.onRefresh != null) widget.onRefresh!();
          },
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Top Color Accent Bar
              Container(
                height: 4,
                width: double.infinity,
                color: accentColor,
              ),

              Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Topline: Category Badge + Match Score Badge
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 3),
                          decoration: BoxDecoration(
                            color: accentColor.withOpacity(0.1),
                            borderRadius: BorderRadius.circular(6),
                          ),
                          child: Text(
                            event.category.toUpperCase(),
                            style: TextStyle(
                              fontSize: 10.5,
                              fontWeight: FontWeight.w800,
                              color: accentColor,
                              letterSpacing: 0.8,
                            ),
                          ),
                        ),
                        const SizedBox(width: 8),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                          decoration: BoxDecoration(
                            color: const Color(0xFFF0EDFB),
                            borderRadius: BorderRadius.circular(6),
                          ),
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: const [
                              Icon(Icons.auto_awesome, size: 11, color: KnotTheme.primary),
                              SizedBox(width: 4),
                              Text(
                                '94% Match',
                                style: TextStyle(
                                  fontSize: 10.5,
                                  fontWeight: FontWeight.w700,
                                  color: KnotTheme.primary,
                                ),
                              ),
                            ],
                          ),
                        ),
                        const Spacer(),
                        InkWell(
                          onTap: () {
                            BookmarksService().toggleEventBookmark(event);
                            setState(() {});
                            final saved = BookmarksService().isEventSaved(event.id);
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(
                                content: Text(saved ? '✨ Saved to My Plan!' : 'Removed from saved'),
                                backgroundColor: saved ? KnotTheme.primary : KnotTheme.ink,
                                duration: const Duration(seconds: 1),
                              ),
                            );
                          },
                          child: Padding(
                            padding: const EdgeInsets.all(4),
                            child: Icon(
                              BookmarksService().isEventSaved(event.id) ? Icons.bookmark : Icons.bookmark_border,
                              size: 20,
                              color: BookmarksService().isEventSaved(event.id) ? KnotTheme.primary : KnotTheme.muted,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),

                    // Body: Date Tile + Heading (Title & Organizer)
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Signature Knot Date Tile
                        Container(
                          width: 48,
                          height: 52,
                          decoration: BoxDecoration(
                            color: KnotTheme.surfaceSoft,
                            borderRadius: BorderRadius.circular(11),
                            border: Border.all(color: KnotTheme.line),
                          ),
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Text(
                                day,
                                style: const TextStyle(
                                  fontSize: 17,
                                  fontWeight: FontWeight.w800,
                                  color: KnotTheme.ink,
                                  height: 1.1,
                                ),
                              ),
                              Text(
                                month,
                                style: const TextStyle(
                                  fontSize: 10,
                                  fontWeight: FontWeight.w700,
                                  color: KnotTheme.muted,
                                  letterSpacing: 0.5,
                                ),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(width: 14),

                        // Title & Organizer
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                event.title,
                                maxLines: 2,
                                overflow: TextOverflow.ellipsis,
                                style: const TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.w700,
                                  color: KnotTheme.ink,
                                  letterSpacing: -0.3,
                                  height: 1.25,
                                ),
                              ),
                              const SizedBox(height: 3),
                              Text(
                                event.organizer.name,
                                style: const TextStyle(
                                  fontSize: 12.5,
                                  color: KnotTheme.muted,
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),

                    if (event.description.isNotEmpty) ...[
                      const SizedBox(height: 10),
                      Text(
                        event.description,
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(
                          fontSize: 13,
                          color: KnotTheme.muted,
                          height: 1.45,
                        ),
                      ),
                    ],

                    const SizedBox(height: 14),

                    // Meta: Date & Time + Location with Distance
                    Row(
                      children: [
                        const Icon(Icons.calendar_today_outlined, size: 14, color: KnotTheme.muted),
                        const SizedBox(width: 5),
                        Text(
                          event.time,
                          style: const TextStyle(fontSize: 12.5, color: KnotTheme.muted, fontWeight: FontWeight.w500),
                        ),
                        const SizedBox(width: 14),
                        const Icon(Icons.location_on_outlined, size: 14, color: KnotTheme.accentDark),
                        const SizedBox(width: 4),
                        Expanded(
                          child: Text(
                            '${event.location.name} · ${event.location.locality}',
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: const TextStyle(fontSize: 12.5, color: KnotTheme.muted, fontWeight: FontWeight.w500),
                          ),
                        ),
                      ],
                    ),

                    const SizedBox(height: 14),
                    const Divider(color: KnotTheme.line, height: 1),
                    const SizedBox(height: 12),

                    // Footer: Age/Fit Tags + Price Badge
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                          decoration: BoxDecoration(
                            color: KnotTheme.surfaceSoft,
                            borderRadius: BorderRadius.circular(6),
                          ),
                          child: const Text(
                            'All ages',
                            style: TextStyle(fontSize: 11, color: KnotTheme.muted, fontWeight: FontWeight.w600),
                          ),
                        ),
                        const SizedBox(width: 6),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                          decoration: BoxDecoration(
                            color: KnotTheme.surfaceSoft,
                            borderRadius: BorderRadius.circular(6),
                          ),
                          child: const Text(
                            'Open registration',
                            style: TextStyle(fontSize: 11, color: KnotTheme.muted, fontWeight: FontWeight.w600),
                          ),
                        ),
                        const Spacer(),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                          decoration: BoxDecoration(
                            color: event.price.isFree ? KnotTheme.greenSoft : KnotTheme.amberSoft,
                            borderRadius: BorderRadius.circular(20),
                          ),
                          child: Text(
                            event.price.isFree ? 'FREE' : event.price.displayString,
                            style: TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.w800,
                              color: event.price.isFree ? KnotTheme.green : KnotTheme.amber,
                              letterSpacing: 0.3,
                            ),
                          ),
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
    );
  }
}
