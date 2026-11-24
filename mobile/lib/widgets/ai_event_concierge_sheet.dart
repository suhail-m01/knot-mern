import 'package:flutter/material.dart';
import '../models/event_model.dart';
import '../models/hackathon_model.dart';
import '../screens/event_detail_screen.dart';
import '../theme/knot_theme.dart';

class AIConciergeResult {
  final String title;
  final String category;
  final String date;
  final String locality;
  final String price;
  final String matchReason;
  final KnotEvent? event;
  final HackathonModel? hackathon;

  AIConciergeResult({
    required this.title,
    required this.category,
    required this.date,
    required this.locality,
    required this.price,
    required this.matchReason,
    this.event,
    this.hackathon,
  });
}

class ChatMessage {
  final String id;
  final bool isUser;
  final String text;
  final List<AIConciergeResult> results;
  final String timestamp;

  ChatMessage({
    required this.id,
    required this.isUser,
    required this.text,
    this.results = const [],
    required this.timestamp,
  });
}

class AIEventConciergeSheet extends StatefulWidget {
  final List<KnotEvent> allEvents;
  final List<HackathonModel> allHackathons;

  const AIEventConciergeSheet({
    super.key,
    required this.allEvents,
    required this.allHackathons,
  });

  static void show(BuildContext context, {
    required List<KnotEvent> allEvents,
    required List<HackathonModel> allHackathons,
  }) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (_) => AIEventConciergeSheet(
        allEvents: allEvents,
        allHackathons: allHackathons,
      ),
    );
  }

  @override
  State<AIEventConciergeSheet> createState() => _AIEventConciergeSheetState();
}

class _AIEventConciergeSheetState extends State<AIEventConciergeSheet> {
  final _inputController = TextEditingController();
  final _scrollController = ScrollController();
  bool _isTyping = false;

  final List<ChatMessage> _messages = [
    ChatMessage(
      id: 'welcome',
      isUser: false,
      text: 'Hello! I am your Knot AI Concierge. Ask me about tech meetups, hackathons, or workshops in Bengaluru!',
      timestamp: 'Just now',
    ),
  ];

  final List<String> _quickPrompts = [
    '🏆 Hackathons with Cash Prizes',
    '🛠️ Hands-on Tech Workshops',
    '☕ Developer Meetups & Coffee',
    '📍 Events in Koramangala & Indiranagar',
    '✨ Free Events this Weekend',
  ];

  @override
  void dispose() {
    _inputController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  void _handleSend(String query) {
    final clean = query.trim();
    if (clean.isEmpty) return;
    _inputController.clear();

    final userMsg = ChatMessage(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      isUser: true,
      text: clean,
      timestamp: 'Now',
    );

    setState(() {
      _messages.add(userMsg);
      _isTyping = true;
    });

    _scrollToBottom();

    // Simulate smart AI analysis
    Future.delayed(const Duration(milliseconds: 600), () {
      if (!mounted) return;
      final q = clean.toLowerCase();
      final results = <AIConciergeResult>[];

      // Match Hackathons
      if (q.contains('hack') || q.contains('prize') || q.contains('cash') || q.contains('code') || q.contains('bengaluru')) {
        for (final hack in widget.allHackathons) {
          if (results.length >= 3) break;
          results.add(AIConciergeResult(
            title: hack.title,
            category: 'HACKATHON',
            date: '${hack.startDate} - ${hack.endDate}',
            locality: hack.city,
            price: hack.isFree ? 'FREE' : 'PAID',
            matchReason: 'Source-linked hackathon with ${hack.prizePool.displayString}',
            hackathon: hack,
          ));
        }
      }

      // Match Events
      for (final evt in widget.allEvents) {
        if (results.length >= 4) break;
        final title = evt.title.toLowerCase();
        final desc = evt.description.toLowerCase();
        final cat = evt.category.toLowerCase();
        final loc = evt.location.locality.toLowerCase();

        bool match = false;
        String reason = 'Matched your interest';

        if (q.contains('free') && evt.price.isFree) {
          match = true;
          reason = 'Free registration verified';
        } else if (q.contains('work') && (cat.contains('work') || title.contains('masterclass'))) {
          match = true;
          reason = 'Practical engineering workshop';
        } else if (q.contains('meet') && (cat.contains('meet') || title.contains('mixer'))) {
          match = true;
          reason = 'Community networking & coffee';
        } else if (q.contains('kora') && loc.contains('kora')) {
          match = true;
          reason = 'Located in Koramangala hub';
        } else if (q.contains('indira') && loc.contains('indira')) {
          match = true;
          reason = 'Located near Indiranagar Metro';
        } else if (title.contains(q) || desc.contains(q) || cat.contains(q)) {
          match = true;
          reason = 'Keywords match in title & description';
        }

        if (match && !results.any((r) => r.title == evt.title)) {
          results.add(AIConciergeResult(
            title: evt.title,
            category: evt.category.toUpperCase(),
            date: evt.date,
            locality: evt.location.locality,
            price: evt.price.isFree ? 'FREE' : evt.price.displayString,
            matchReason: reason,
            event: evt,
          ));
        }
      }

      // Fallback if no exact match
      if (results.isEmpty && widget.allEvents.isNotEmpty) {
        final top = widget.allEvents.first;
        results.add(AIConciergeResult(
          title: top.title,
          category: top.category.toUpperCase(),
          date: top.date,
          locality: top.location.locality,
          price: top.price.isFree ? 'FREE' : top.price.displayString,
          matchReason: 'Top recommended event for your area',
          event: top,
        ));
      }

      final aiMsg = ChatMessage(
        id: (DateTime.now().millisecondsSinceEpoch + 1).toString(),
        isUser: false,
        text: results.isNotEmpty
            ? 'I found ${results.length} matches in Bengaluru for "$clean":'
            : 'Here are the top trending gatherings in Bengaluru right now:',
        results: results,
        timestamp: 'Just now',
      );

      setState(() {
        _isTyping = false;
        _messages.add(aiMsg);
      });

      _scrollToBottom();
    });
  }

  void _scrollToBottom() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent + 200,
          duration: const Duration(milliseconds: 250),
          curve: Curves.easeOut,
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: MediaQuery.of(context).size.height * 0.85,
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      child: Column(
        children: [
          // Header Bar
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 14),
            decoration: const BoxDecoration(
              color: KnotTheme.deep,
              borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
            ),
            child: Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(7),
                  decoration: BoxDecoration(
                    color: KnotTheme.accent.withOpacity(0.2),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: const Icon(Icons.auto_awesome, color: KnotTheme.accent, size: 20),
                ),
                const SizedBox(width: 12),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: const [
                    Text(
                      'Knot AI Event Concierge',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w800,
                        color: Colors.white,
                      ),
                    ),
                    Text(
                      'Natural-language discovery · Bengaluru events & hackathons',
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

          // Quick Prompts Horizontal Bar
          Container(
            color: KnotTheme.surfaceSoft,
            padding: const EdgeInsets.symmetric(vertical: 8),
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 14),
              child: Row(
                children: _quickPrompts.map((prompt) {
                  return Padding(
                    padding: const EdgeInsets.only(right: 8),
                    child: InkWell(
                      onTap: () => _handleSend(prompt.replaceAll(RegExp(r'^[^\w]+'), '')),
                      borderRadius: BorderRadius.circular(16),
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(color: KnotTheme.line),
                        ),
                        child: Text(
                          prompt,
                          style: const TextStyle(
                            fontSize: 11.5,
                            fontWeight: FontWeight.w600,
                            color: KnotTheme.ink,
                          ),
                        ),
                      ),
                    ),
                  );
                }).toList(),
              ),
            ),
          ),

          // Messages View
          Expanded(
            child: ListView.builder(
              controller: _scrollController,
              padding: const EdgeInsets.all(16),
              itemCount: _messages.length,
              itemBuilder: (context, index) {
                final msg = _messages[index];
                return _buildMessageBubble(msg);
              },
            ),
          ),

          if (_isTyping)
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 6),
              child: Row(
                children: const [
                  SizedBox(
                    width: 14,
                    height: 14,
                    child: CircularProgressIndicator(strokeWidth: 2, color: KnotTheme.primary),
                  ),
                  SizedBox(width: 8),
                  Text(
                    'Knot AI is scanning Bengaluru event catalog…',
                    style: TextStyle(fontSize: 11.5, color: KnotTheme.muted, fontStyle: FontStyle.italic),
                  ),
                ],
              ),
            ),

          // Input Bar
          Container(
            padding: EdgeInsets.fromLTRB(14, 8, 14, MediaQuery.of(context).viewInsets.bottom + 12),
            decoration: const BoxDecoration(
              color: Colors.white,
              border: Border(top: BorderSide(color: KnotTheme.line)),
            ),
            child: Row(
              children: [
                Expanded(
                  child: Container(
                    decoration: BoxDecoration(
                      color: KnotTheme.surfaceSoft,
                      borderRadius: BorderRadius.circular(24),
                      border: Border.all(color: KnotTheme.line),
                    ),
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    child: TextField(
                      controller: _inputController,
                      decoration: const InputDecoration(
                        hintText: 'e.g. Free AI hackathons near Koramangala...',
                        hintStyle: TextStyle(fontSize: 13, color: KnotTheme.muted),
                        border: InputBorder.none,
                        isDense: true,
                        contentPadding: EdgeInsets.symmetric(vertical: 12),
                      ),
                      onSubmitted: _handleSend,
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                InkWell(
                  onTap: () => _handleSend(_inputController.text),
                  borderRadius: BorderRadius.circular(22),
                  child: Container(
                    padding: const EdgeInsets.all(12),
                    decoration: const BoxDecoration(
                      color: KnotTheme.primary,
                      shape: BoxShape.circle,
                    ),
                    child: const Icon(Icons.send, color: Colors.white, size: 18),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMessageBubble(ChatMessage msg) {
    if (msg.isUser) {
      return Align(
        alignment: Alignment.centerRight,
        child: Container(
          margin: const EdgeInsets.only(bottom: 12),
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
          decoration: BoxDecoration(
            color: KnotTheme.primary,
            borderRadius: BorderRadius.circular(16).copyWith(bottomRight: Radius.zero),
          ),
          child: Text(
            msg.text,
            style: const TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.w600),
          ),
        ),
      );
    }

    return Align(
      alignment: Alignment.centerLeft,
      child: Container(
        margin: const EdgeInsets.only(bottom: 14),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
              decoration: BoxDecoration(
                color: KnotTheme.surfaceSoft,
                borderRadius: BorderRadius.circular(16).copyWith(bottomLeft: Radius.zero),
                border: Border.all(color: KnotTheme.line),
              ),
              child: Text(
                msg.text,
                style: const TextStyle(color: KnotTheme.ink, fontSize: 13, height: 1.3),
              ),
            ),
            if (msg.results.isNotEmpty) ...[
              const SizedBox(height: 10),
              ...msg.results.map((item) => _buildResultCard(item)),
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildResultCard(AIConciergeResult res) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
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
                padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 2.5),
                decoration: BoxDecoration(
                  color: KnotTheme.primarySoft,
                  borderRadius: BorderRadius.circular(6),
                ),
                child: Text(
                  res.category,
                  style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w800, color: KnotTheme.primary),
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 2.5),
                decoration: BoxDecoration(
                  color: KnotTheme.greenSoft,
                  borderRadius: BorderRadius.circular(6),
                ),
                child: Text(
                  res.price,
                  style: const TextStyle(fontSize: 10.5, fontWeight: FontWeight.w800, color: KnotTheme.green),
                ),
              ),
            ],
          ),
          const SizedBox(height: 6),
          Text(
            res.title,
            style: const TextStyle(fontSize: 13.5, fontWeight: FontWeight.w800, color: KnotTheme.ink),
          ),
          const SizedBox(height: 4),
          Row(
            children: [
              const Icon(Icons.location_on_outlined, size: 13, color: KnotTheme.muted),
              const SizedBox(width: 3),
              Text(res.locality, style: const TextStyle(fontSize: 11, color: KnotTheme.muted)),
              const SizedBox(width: 10),
              const Icon(Icons.calendar_today_outlined, size: 12, color: KnotTheme.muted),
              const SizedBox(width: 3),
              Text(res.date, style: const TextStyle(fontSize: 11, color: KnotTheme.muted)),
            ],
          ),
          const SizedBox(height: 6),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            decoration: BoxDecoration(
              color: KnotTheme.amberSoft,
              borderRadius: BorderRadius.circular(6),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Icon(Icons.bolt, size: 12, color: KnotTheme.amber),
                const SizedBox(width: 4),
                Text(
                  res.matchReason,
                  style: const TextStyle(fontSize: 10.5, fontWeight: FontWeight.w600, color: KnotTheme.amber),
                ),
              ],
            ),
          ),
          const SizedBox(height: 8),
          SizedBox(
            width: double.infinity,
            child: InkWell(
              onTap: () {
                Navigator.pop(context); // Close sheet
                if (res.event != null) {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (_) => EventDetailScreen(event: res.event!)),
                  );
                } else if (res.hackathon != null) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text('Opening official platform via ${res.hackathon!.platform}'),
                      backgroundColor: KnotTheme.primary,
                    ),
                  );
                }
              },
              child: Container(
                padding: const EdgeInsets.symmetric(vertical: 8),
                decoration: BoxDecoration(
                  color: KnotTheme.surfaceSoft,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: const [
                    Text(
                      'View Details & Register',
                      style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: KnotTheme.primary),
                    ),
                    SizedBox(width: 4),
                    Icon(Icons.arrow_forward, size: 13, color: KnotTheme.primary),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
