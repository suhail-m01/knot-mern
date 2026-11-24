import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import 'package:qr_flutter/qr_flutter.dart';
import '../models/event_model.dart';
import '../models/registration_model.dart';
import '../screens/qr_ticket_screen.dart';
import '../services/api_service.dart';
import '../services/auth_service.dart';
import '../theme/knot_theme.dart';

class TrackOption {
  final String id;
  final String title;
  final String desc;
  final String icon;

  const TrackOption({
    required this.id,
    required this.title,
    required this.desc,
    required this.icon,
  });
}

class UnstopRegistrationSheet extends StatefulWidget {
  final KnotEvent event;
  final Function(RegistrationModel registration)? onSuccess;

  const UnstopRegistrationSheet({
    super.key,
    required this.event,
    this.onSuccess,
  });

  static void show(
    BuildContext context, {
    required KnotEvent event,
    Function(RegistrationModel registration)? onSuccess,
  }) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (_) => UnstopRegistrationSheet(
        event: event,
        onSuccess: onSuccess,
      ),
    );
  }

  @override
  State<UnstopRegistrationSheet> createState() => _UnstopRegistrationSheetState();
}

class _UnstopRegistrationSheetState extends State<UnstopRegistrationSheet> {
  int _currentStep = 0; // 0: Mode & Track, 1: Profile, 2: Team, 3: Ticket
  bool _isSubmitting = false;
  String _participationType = 'solo'; // 'solo' or 'team'
  String _selectedTrack = 'hyperlocal';
  String _teamIntent = 'create'; // 'create' or 'join'

  // Profile controllers
  late TextEditingController _nameController;
  late TextEditingController _emailController;
  final _phoneController = TextEditingController(text: '+91 98765 43210');
  final _teamNameController = TextEditingController(text: 'Neural Builders BLR');
  final _teamCodeController = TextEditingController();
  final _githubController = TextEditingController(text: 'https://github.com/');
  final _teammateEmailController = TextEditingController();
  final List<String> _teammates = [];

  String _selectedCollege = 'Dayananda Sagar College (DSCE)';
  String _selectedRole = 'Full-Stack Builder';
  final String _selectedExperience = 'Intermediate Builder';

  RegistrationModel? _confirmedRegistration;

  static const List<TrackOption> _tracks = [
    TrackOption(
      id: 'ai-agents',
      title: 'AI & Autonomous Agents',
      desc: 'LLM orchestrations, multimodal reasoning, tool-use',
      icon: '🤖',
    ),
    TrackOption(
      id: 'hyperlocal',
      title: 'Hyperlocal Discovery & Engagement',
      desc: 'Community hubs, local event graphs, commuter sync',
      icon: '📍',
    ),
    TrackOption(
      id: 'web3',
      title: 'Web3 & Decentralized Systems',
      desc: 'Zero-knowledge proofs, smart contracts, on-chain identity',
      icon: '🌐',
    ),
    TrackOption(
      id: 'open-innovation',
      title: 'Open Innovation & Full-Stack',
      desc: 'Developer tooling, mobile apps, systems engineering',
      icon: '💡',
    ),
  ];

  static const List<String> _colleges = [
    'Dayananda Sagar College (DSCE)',
    'PES University',
    'RV College of Engineering (RVCE)',
    'NIT Silchar',
    'BITS Pilani',
    'IIIT Bangalore',
    'Autonomous Builder / Startup',
  ];

  static const List<String> _roles = [
    'Full-Stack Builder',
    'AI / ML & Agents',
    'Frontend / React',
    'Backend / Node / Go',
    'UI/UX & Product Design',
    'Web3 & Smart Contracts',
  ];

  @override
  void initState() {
    super.initState();
    final auth = Provider.of<AuthService>(context, listen: false);
    _nameController = TextEditingController(text: auth.user?.name ?? 'Syed Suhail');
    _emailController = TextEditingController(text: auth.user?.email ?? 'suhail@knot.in');
  }

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _phoneController.dispose();
    _teamNameController.dispose();
    _teamCodeController.dispose();
    _githubController.dispose();
    _teammateEmailController.dispose();
    super.dispose();
  }

  Future<void> _submitRegistration() async {
    setState(() => _isSubmitting = true);
    final auth = Provider.of<AuthService>(context, listen: false);

    try {
      final api = ApiService(token: auth.token, userId: auth.user?.id);
      final reg = await api.registerForEvent(
        widget.event.id,
        participationType: _participationType,
        teamName: _participationType == 'team' ? _teamNameController.text.trim() : null,
        teamCode: _participationType == 'team' && _teamIntent == 'join' ? _teamCodeController.text.trim() : null,
        teamMembers: _participationType == 'team' ? _teammates : null,
        selectedTrack: _selectedTrack,
        college: _selectedCollege,
        role: _selectedRole,
        phone: _phoneController.text.trim(),
        githubUrl: _githubController.text.trim(),
        notes: 'Experience: $_selectedExperience',
      );

      if (mounted) {
        setState(() {
          _confirmedRegistration = reg;
          _isSubmitting = false;
          _currentStep = 3; // Advance to confirmed ticket screen
        });
        widget.onSuccess?.call(reg);
      }
    } catch (_) {
      if (mounted) {
        setState(() => _isSubmitting = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final bottomInset = MediaQuery.of(context).viewInsets.bottom;

    return Container(
      constraints: BoxConstraints(
        maxHeight: MediaQuery.of(context).size.height * 0.92,
      ),
      margin: EdgeInsets.only(bottom: bottomInset),
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Header Bar
          _buildHeader(),
          const Divider(height: 1, color: KnotTheme.line),

          // Content body
          Flexible(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(20),
              child: _buildCurrentStepContent(),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildHeader() {
    final titles = [
      'Choose Participation Mode & Track',
      'Builder Profile Details',
      'Team Formation Arena',
      'Registration Confirmed! 🎉',
    ];

    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 16, 12, 12),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                      decoration: BoxDecoration(
                        color: KnotTheme.primarySoft,
                        borderRadius: BorderRadius.circular(6),
                      ),
                      child: Text(
                        'STEP ${_currentStep + 1} OF 4',
                        style: const TextStyle(
                          fontSize: 10,
                          fontWeight: FontWeight.w800,
                          color: KnotTheme.primary,
                          letterSpacing: 0.8,
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Text(
                      widget.event.title,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(fontSize: 11, color: KnotTheme.muted),
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                Text(
                  titles[_currentStep],
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w800,
                    color: KnotTheme.ink,
                  ),
                ),
              ],
            ),
          ),
          IconButton(
            onPressed: () => Navigator.pop(context),
            icon: const Icon(Icons.close, color: KnotTheme.muted, size: 22),
          ),
        ],
      ),
    );
  }

  Widget _buildCurrentStepContent() {
    switch (_currentStep) {
      case 0:
        return _buildStepModeAndTrack();
      case 1:
        return _buildStepProfile();
      case 2:
        return _buildStepTeam();
      case 3:
        return _buildStepTicket();
      default:
        return const SizedBox();
    }
  }

  // --------------------------------------------------------------------------
  // STEP 1: MODE & TRACK
  // --------------------------------------------------------------------------
  Widget _buildStepModeAndTrack() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'HOW WOULD YOU LIKE TO PARTICIPATE?',
          style: TextStyle(fontSize: 11, fontWeight: FontWeight.w800, color: KnotTheme.muted, letterSpacing: 0.6),
        ),
        const SizedBox(height: 10),

        Row(
          children: [
            Expanded(
              child: _buildModeCard(
                type: 'solo',
                title: 'Solo Hacker',
                subtitle: 'Individual entry & builder pass',
                icon: Icons.person_outline,
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: _buildModeCard(
                type: 'team',
                title: 'Team Entry',
                subtitle: 'Teams of 2–4 builders with synergy',
                icon: Icons.groups_outlined,
              ),
            ),
          ],
        ),

        const SizedBox(height: 24),
        const Text(
          'SELECT YOUR HACKATHON / WORKSHOP TRACK',
          style: TextStyle(fontSize: 11, fontWeight: FontWeight.w800, color: KnotTheme.muted, letterSpacing: 0.6),
        ),
        const SizedBox(height: 10),

        ..._tracks.map((t) {
          final isSelected = _selectedTrack == t.id;
          return Container(
            margin: const EdgeInsets.only(bottom: 10),
            decoration: BoxDecoration(
              color: isSelected ? KnotTheme.primarySoft.withAlpha(80) : Colors.white,
              borderRadius: BorderRadius.circular(14),
              border: Border.all(
                color: isSelected ? KnotTheme.primary : KnotTheme.line,
                width: isSelected ? 1.8 : 1,
              ),
            ),
            child: InkWell(
              onTap: () => setState(() => _selectedTrack = t.id),
              borderRadius: BorderRadius.circular(14),
              child: Padding(
                padding: const EdgeInsets.all(14),
                child: Row(
                  children: [
                    Text(t.icon, style: const TextStyle(fontSize: 24)),
                    const SizedBox(width: 14),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            t.title,
                            style: TextStyle(
                              fontSize: 13.5,
                              fontWeight: FontWeight.w700,
                              color: isSelected ? KnotTheme.primaryDark : KnotTheme.ink,
                            ),
                          ),
                          const SizedBox(height: 2),
                          Text(
                            t.desc,
                            style: const TextStyle(fontSize: 11, color: KnotTheme.muted),
                          ),
                        ],
                      ),
                    ),
                    Icon(
                      isSelected ? Icons.check_circle : Icons.radio_button_unchecked,
                      color: isSelected ? KnotTheme.primary : KnotTheme.muted,
                      size: 20,
                    ),
                  ],
                ),
              ),
            ),
          );
        }),

        const SizedBox(height: 20),
        SizedBox(
          width: double.infinity,
          height: 48,
          child: ElevatedButton(
            onPressed: () => setState(() => _currentStep = 1),
            style: ElevatedButton.styleFrom(
              backgroundColor: KnotTheme.primary,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            ),
            child: const Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text('Continue to Profile', style: TextStyle(fontWeight: FontWeight.w700, color: Colors.white, fontSize: 14)),
                SizedBox(width: 8),
                Icon(Icons.arrow_forward, size: 16, color: Colors.white),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildModeCard({
    required String type,
    required String title,
    required String subtitle,
    required IconData icon,
  }) {
    final isSelected = _participationType == type;

    return InkWell(
      onTap: () => setState(() => _participationType = type),
      borderRadius: BorderRadius.circular(14),
      child: Container(
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: isSelected ? KnotTheme.primarySoft.withAlpha(80) : Colors.white,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(
            color: isSelected ? KnotTheme.primary : KnotTheme.line,
            width: isSelected ? 1.8 : 1,
          ),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Icon(icon, color: isSelected ? KnotTheme.primary : KnotTheme.muted, size: 24),
            const SizedBox(height: 10),
            Text(
              title,
              style: TextStyle(
                fontWeight: FontWeight.w800,
                fontSize: 13.5,
                color: isSelected ? KnotTheme.primaryDark : KnotTheme.ink,
              ),
            ),
            const SizedBox(height: 3),
            Text(
              subtitle,
              style: const TextStyle(fontSize: 10.5, color: KnotTheme.muted),
            ),
          ],
        ),
      ),
    );
  }

  // --------------------------------------------------------------------------
  // STEP 2: BUILDER PROFILE
  // --------------------------------------------------------------------------
  Widget _buildStepProfile() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Name & Email
        TextFormField(
          controller: _nameController,
          decoration: const InputDecoration(
            labelText: 'Full Name *',
            hintText: 'e.g. Syed Suhail',
            prefixIcon: Icon(Icons.person_outline, size: 18),
          ),
        ),
        const SizedBox(height: 12),
        TextFormField(
          controller: _emailController,
          keyboardType: TextInputType.emailAddress,
          decoration: const InputDecoration(
            labelText: 'Email Address *',
            hintText: 'suhail@knot.in',
            prefixIcon: Icon(Icons.mail_outline, size: 18),
          ),
        ),
        const SizedBox(height: 12),
        TextFormField(
          controller: _phoneController,
          keyboardType: TextInputType.phone,
          decoration: const InputDecoration(
            labelText: 'WhatsApp Phone Number *',
            hintText: '+91 98765 43210',
            prefixIcon: Icon(Icons.phone_outlined, size: 18),
          ),
        ),

        const SizedBox(height: 16),
        const Text(
          'COLLEGE / CAMPUS / ORGANIZATION',
          style: TextStyle(fontSize: 11, fontWeight: FontWeight.w800, color: KnotTheme.muted, letterSpacing: 0.6),
        ),
        const SizedBox(height: 6),
        DropdownButtonFormField<String>(
          initialValue: _selectedCollege,
          dropdownColor: Colors.white,
          decoration: const InputDecoration(
            prefixIcon: Icon(Icons.school_outlined, size: 18),
          ),
          items: _colleges.map((c) => DropdownMenuItem(value: c, child: Text(c, style: const TextStyle(fontSize: 12)))).toList(),
          onChanged: (v) => setState(() => _selectedCollege = v ?? _colleges[0]),
        ),

        const SizedBox(height: 16),
        const Text(
          'PRIMARY BUILDER ROLE',
          style: TextStyle(fontSize: 11, fontWeight: FontWeight.w800, color: KnotTheme.muted, letterSpacing: 0.6),
        ),
        const SizedBox(height: 8),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: _roles.map((r) {
            final isSel = _selectedRole == r;
            return ChoiceChip(
              label: Text(r, style: TextStyle(fontSize: 11.5, fontWeight: isSel ? FontWeight.w700 : FontWeight.w500)),
              selected: isSel,
              selectedColor: KnotTheme.primarySoft,
              labelStyle: TextStyle(color: isSel ? KnotTheme.primaryDark : KnotTheme.ink),
              onSelected: (val) {
                if (val) setState(() => _selectedRole = r);
              },
            );
          }).toList(),
        ),

        const SizedBox(height: 16),
        TextFormField(
          controller: _githubController,
          decoration: const InputDecoration(
            labelText: 'GitHub / Portfolio URL',
            hintText: 'https://github.com/yourhandle',
            prefixIcon: Icon(Icons.link, size: 18),
          ),
        ),

        const SizedBox(height: 24),
        Row(
          children: [
            OutlinedButton(
              onPressed: () => setState(() => _currentStep = 0),
              style: OutlinedButton.styleFrom(
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                side: const BorderSide(color: KnotTheme.line),
              ),
              child: const Text('Back', style: TextStyle(color: KnotTheme.ink)),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: ElevatedButton(
                onPressed: () {
                  if (_participationType == 'team') {
                    setState(() => _currentStep = 2);
                  } else {
                    _submitRegistration();
                  }
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: KnotTheme.primary,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  padding: const EdgeInsets.symmetric(vertical: 14),
                ),
                child: _isSubmitting
                    ? const SizedBox(height: 18, width: 18, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                    : Text(
                        _participationType == 'team' ? 'Continue to Team Setup' : 'Complete Registration',
                        style: const TextStyle(fontWeight: FontWeight.w700, color: Colors.white),
                      ),
              ),
            ),
          ],
        ),
      ],
    );
  }

  // --------------------------------------------------------------------------
  // STEP 3: TEAM FORMATION
  // --------------------------------------------------------------------------
  Widget _buildStepTeam() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Expanded(
              child: ChoiceChip(
                label: const Center(child: Text('Create Team', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700))),
                selected: _teamIntent == 'create',
                selectedColor: KnotTheme.primarySoft,
                onSelected: (val) {
                  if (val) setState(() => _teamIntent = 'create');
                },
              ),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: ChoiceChip(
                label: const Center(child: Text('Join with Code', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700))),
                selected: _teamIntent == 'join',
                selectedColor: KnotTheme.primarySoft,
                onSelected: (val) {
                  if (val) setState(() => _teamIntent = 'join');
                },
              ),
            ),
          ],
        ),
        const SizedBox(height: 18),

        if (_teamIntent == 'create') ...[
          TextFormField(
            controller: _teamNameController,
            decoration: const InputDecoration(
              labelText: 'Team Name *',
              hintText: 'e.g. Autonomous Agents BLR',
              prefixIcon: Icon(Icons.shield_outlined, size: 18),
            ),
          ),
          const SizedBox(height: 16),
          const Text(
            'INVITE TEAMMATES (OPTIONAL)',
            style: TextStyle(fontSize: 11, fontWeight: FontWeight.w800, color: KnotTheme.muted, letterSpacing: 0.6),
          ),
          const SizedBox(height: 8),
          Row(
            children: [
              Expanded(
                child: TextFormField(
                  controller: _teammateEmailController,
                  decoration: const InputDecoration(
                    labelText: 'Teammate Email',
                    hintText: 'friend@college.edu',
                    prefixIcon: Icon(Icons.mail_outline, size: 18),
                  ),
                ),
              ),
              const SizedBox(width: 8),
              ElevatedButton(
                onPressed: () {
                  final email = _teammateEmailController.text.trim();
                  if (email.isNotEmpty && email.contains('@')) {
                    setState(() {
                      _teammates.add(email);
                      _teammateEmailController.clear();
                    });
                  }
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: KnotTheme.surfaceSoft,
                  foregroundColor: KnotTheme.primaryDark,
                  elevation: 0,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                ),
                child: const Text('Add'),
              ),
            ],
          ),
          if (_teammates.isNotEmpty) ...[
            const SizedBox(height: 10),
            Wrap(
              spacing: 6,
              children: _teammates.map((em) => Chip(
                label: Text(em, style: const TextStyle(fontSize: 11)),
                deleteIcon: const Icon(Icons.close, size: 14),
                onDeleted: () => setState(() => _teammates.remove(em)),
              )).toList(),
            ),
          ],
          const SizedBox(height: 10),
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: KnotTheme.surfaceSoft,
              borderRadius: BorderRadius.circular(10),
            ),
            child: const Row(
              children: [
                Icon(Icons.info_outline, size: 16, color: KnotTheme.primary),
                SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'Upon completion, a 6-digit Team Code will be issued so teammates can join immediately.',
                    style: TextStyle(fontSize: 11, color: KnotTheme.ink),
                  ),
                ),
              ],
            ),
          ),
        ] else ...[
          TextFormField(
            controller: _teamCodeController,
            decoration: const InputDecoration(
              labelText: 'Enter 6-Digit Team Code *',
              hintText: 'e.g. KNOT-9X2',
              prefixIcon: Icon(Icons.vpn_key_outlined, size: 18),
            ),
          ),
          const SizedBox(height: 10),
          const Text(
            'Ask your team leader for the invitation code generated on their pass.',
            style: TextStyle(fontSize: 11.5, color: KnotTheme.muted),
          ),
        ],

        const SizedBox(height: 24),
        Row(
          children: [
            OutlinedButton(
              onPressed: () => setState(() => _currentStep = 1),
              style: OutlinedButton.styleFrom(
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                side: const BorderSide(color: KnotTheme.line),
              ),
              child: const Text('Back', style: TextStyle(color: KnotTheme.ink)),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: ElevatedButton(
                onPressed: _isSubmitting ? null : _submitRegistration,
                style: ElevatedButton.styleFrom(
                  backgroundColor: KnotTheme.primary,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  padding: const EdgeInsets.symmetric(vertical: 14),
                ),
                child: _isSubmitting
                    ? const SizedBox(height: 18, width: 18, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                    : const Text(
                        'Confirm & Issue Pass',
                        style: TextStyle(fontWeight: FontWeight.w700, color: Colors.white),
                      ),
              ),
            ),
          ],
        ),
      ],
    );
  }

  // --------------------------------------------------------------------------
  // STEP 4: TICKET PASS CONFIRMATION
  // --------------------------------------------------------------------------
  Widget _buildStepTicket() {
    final reg = _confirmedRegistration!;
    final token = reg.checkInToken.isNotEmpty ? reg.checkInToken : 'KNOT-${reg.id}';
    final teamCode = reg.teamCode ?? (_participationType == 'team' ? 'TEAM-BLR88' : null);

    return Column(
      children: [
        // Ticket Container
        Container(
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(20),
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
              // Purple Header Bar
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                decoration: const BoxDecoration(
                  color: KnotTheme.primary,
                  borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.confirmation_number_outlined, color: Colors.white, size: 18),
                    const SizedBox(width: 8),
                    const Text(
                      'OFFICIAL KNOT ENTRY PASS',
                      style: TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.w800, letterSpacing: 0.8),
                    ),
                    const Spacer(),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                      decoration: BoxDecoration(
                        color: Colors.white.withAlpha(50),
                        borderRadius: BorderRadius.circular(6),
                      ),
                      child: const Text(
                        'RSVP CONFIRMED',
                        style: TextStyle(color: Colors.white, fontSize: 9.5, fontWeight: FontWeight.w800),
                      ),
                    ),
                  ],
                ),
              ),

              Padding(
                padding: const EdgeInsets.all(18),
                child: Column(
                  children: [
                    Text(
                      widget.event.title,
                      textAlign: TextAlign.center,
                      style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: KnotTheme.ink),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      '${widget.event.date} · ${widget.event.time}',
                      style: const TextStyle(fontSize: 12, color: KnotTheme.muted, fontWeight: FontWeight.w600),
                    ),
                    Text(
                      widget.event.location.name,
                      style: const TextStyle(fontSize: 11, color: KnotTheme.muted),
                    ),

                    const SizedBox(height: 14),

                    // Badges row
                    Wrap(
                      spacing: 6,
                      runSpacing: 6,
                      alignment: WrapAlignment.center,
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                          decoration: BoxDecoration(
                            color: KnotTheme.surfaceSoft,
                            borderRadius: BorderRadius.circular(6),
                          ),
                          child: Text(
                            _participationType.toUpperCase(),
                            style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w800, color: KnotTheme.primaryDark),
                          ),
                        ),
                        if (teamCode != null)
                          GestureDetector(
                            onTap: () {
                              Clipboard.setData(ClipboardData(text: teamCode));
                              ScaffoldMessenger.of(context).showSnackBar(
                                const SnackBar(content: Text('Team code copied!'), duration: Duration(seconds: 1)),
                              );
                            },
                            child: Container(
                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                              decoration: BoxDecoration(
                                color: KnotTheme.accent.withAlpha(50),
                                borderRadius: BorderRadius.circular(6),
                                border: Border.all(color: KnotTheme.accentDark.withAlpha(100)),
                              ),
                              child: Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  Text(
                                    'TEAM: $teamCode',
                                    style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w800, color: KnotTheme.accentDark),
                                  ),
                                  const SizedBox(width: 4),
                                  const Icon(Icons.copy, size: 10, color: KnotTheme.accentDark),
                                ],
                              ),
                            ),
                          ),
                      ],
                    ),

                    const SizedBox(height: 16),

                    // Live QR Code
                    Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(14),
                        border: Border.all(color: KnotTheme.line),
                      ),
                      child: QrImageView(
                        data: token,
                        version: QrVersions.auto,
                        size: 160.0,
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

                    const SizedBox(height: 10),
                    Text(
                      token,
                      style: const TextStyle(fontFamily: 'monospace', fontWeight: FontWeight.w700, fontSize: 13, color: KnotTheme.primaryDark),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),

        const SizedBox(height: 18),

        // Action Buttons
        Row(
          children: [
            Expanded(
              child: ElevatedButton.icon(
                onPressed: () {
                  final text = '🚀 I just registered for ${widget.event.title}! Join my team on Knot using code: ${teamCode ?? token}';
                  Clipboard.setData(ClipboardData(text: text));
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('WhatsApp invitation link copied!')),
                  );
                },
                icon: const Icon(Icons.share, size: 16),
                label: const Text('WhatsApp Invite', style: TextStyle(fontSize: 12.5)),
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF25D366),
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                  padding: const EdgeInsets.symmetric(vertical: 12),
                ),
              ),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: OutlinedButton.icon(
                onPressed: () {
                  Navigator.pop(context);
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (_) => QRTicketScreen(registration: reg)),
                  );
                },
                icon: const Icon(Icons.fullscreen, size: 16),
                label: const Text('Fullscreen Pass', style: TextStyle(fontSize: 12.5)),
                style: OutlinedButton.styleFrom(
                  foregroundColor: KnotTheme.ink,
                  side: const BorderSide(color: KnotTheme.line),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                  padding: const EdgeInsets.symmetric(vertical: 12),
                ),
              ),
            ),
          ],
        ),
        const SizedBox(height: 10),

        SizedBox(
          width: double.infinity,
          child: TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Done & Return to Event', style: TextStyle(color: KnotTheme.muted, fontWeight: FontWeight.w600)),
          ),
        ),
      ],
    );
  }
}
