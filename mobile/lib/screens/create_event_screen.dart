import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/api_service.dart';
import '../services/auth_service.dart';
import '../theme/knot_theme.dart';
import '../widgets/custom_button.dart';
import 'auth_screen.dart';

class CreateEventScreen extends StatefulWidget {
  const CreateEventScreen({super.key});

  @override
  State<CreateEventScreen> createState() => _CreateEventScreenState();
}

class _CreateEventScreenState extends State<CreateEventScreen> {
  final _formKey = GlobalKey<FormState>();

  final _titleController = TextEditingController();
  final _descriptionController = TextEditingController();
  final _venueNameController = TextEditingController();
  final _addressController = TextEditingController();
  final _dateController = TextEditingController(text: 'Sat, Dec 12, 2026');
  final _timeController = TextEditingController(text: '10:00 AM - 1:00 PM');
  final _priceController = TextEditingController(text: '0');
  final _capacityController = TextEditingController(text: '100');
  final _tagsController = TextEditingController(text: 'AI, Networking, React');

  String _category = 'AI';
  String _locality = 'Koramangala';
  final String _format = 'In-Person';
  bool _isFree = true;
  bool _isSubmitting = false;

  final List<String> _categories = ['AI', 'Tech', 'Web3', 'Design', 'Founders', 'Hackathon'];
  final List<String> _localities = ['Koramangala', 'Indiranagar', 'HSR Layout', 'Whitefield', 'Electronic City'];

  @override
  void dispose() {
    _titleController.dispose();
    _descriptionController.dispose();
    _venueNameController.dispose();
    _addressController.dispose();
    _dateController.dispose();
    _timeController.dispose();
    _priceController.dispose();
    _capacityController.dispose();
    _tagsController.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    final auth = Provider.of<AuthService>(context, listen: false);
    if (!auth.isAuthenticated) {
      final proceed = await Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => const AuthScreen()),
      );
      if (proceed != true && !auth.isAuthenticated) return;
    }

    if (!_formKey.currentState!.validate()) return;

    setState(() => _isSubmitting = true);

    try {
      final tagsList = _tagsController.text
          .split(',')
          .map((e) => e.trim())
          .where((e) => e.isNotEmpty)
          .toList();

      final eventPayload = {
        'title': _titleController.text.trim(),
        'description': _descriptionController.text.trim(),
        'category': _category,
        'format': _format,
        'date': _dateController.text.trim(),
        'time': _timeController.text.trim(),
        'location': {
          'name': _venueNameController.text.trim().isEmpty ? 'Tech Hub' : _venueNameController.text.trim(),
          'address': _addressController.text.trim().isEmpty ? 'Bengaluru, Karnataka' : _addressController.text.trim(),
          'locality': _locality,
          'city': 'Bengaluru',
          'geo': {
            'type': 'Point',
            'coordinates': [77.6245, 12.9352],
          },
        },
        'price': {
          'isFree': _isFree,
          'amount': _isFree ? 0 : (num.tryParse(_priceController.text) ?? 0),
          'currency': 'INR',
        },
        'capacity': int.tryParse(_capacityController.text) ?? 100,
        'tags': tagsList.isEmpty ? ['Tech', 'Bengaluru'] : tagsList,
        'image': 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
        'organizer': {
          'name': auth.user?.name ?? 'Knot Host',
          'avatar': auth.user?.avatar ?? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
          'verified': true,
        },
      };

      final api = ApiService(token: auth.token, userId: auth.user?.id);
      await api.createEvent(eventPayload);

      if (mounted) {
        setState(() => _isSubmitting = false);
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('🎉 Event published! Now live on both Mobile and Web!'),
            backgroundColor: KnotTheme.green,
          ),
        );
        Navigator.pop(context, true);
      }
    } catch (e) {
      if (mounted) {
        setState(() => _isSubmitting = false);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Failed to publish: ${e.toString()}'),
            backgroundColor: KnotTheme.red,
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: KnotTheme.background,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        title: const Text('Host an Event', style: TextStyle(fontWeight: FontWeight.w800, fontSize: 18, color: KnotTheme.ink)),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Container(
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(14),
                    border: Border.all(color: KnotTheme.line),
                  ),
                  child: Row(
                    children: const [
                      Icon(Icons.bolt, color: KnotTheme.accentDark, size: 22),
                      SizedBox(width: 10),
                      Expanded(
                        child: Text(
                          'Direct Sync: Events published here appear instantly in the MERN Web Explorer.',
                          style: TextStyle(fontSize: 12, color: KnotTheme.muted, fontWeight: FontWeight.w500),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 16),

                Container(
                  padding: const EdgeInsets.all(18),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(18),
                    border: Border.all(color: KnotTheme.line),
                  ),
                  child: Column(
                    children: [
                      // Title
                      TextFormField(
                        controller: _titleController,
                        decoration: const InputDecoration(
                          labelText: 'Event Title *',
                          hintText: 'e.g. Bengaluru GenAI Founders Breakfast',
                        ),
                        validator: (v) => (v == null || v.trim().isEmpty) ? 'Please enter a title' : null,
                      ),
                      const SizedBox(height: 14),

                      // Category & Locality
                      Row(
                        children: [
                          Expanded(
                            child: DropdownButtonFormField<String>(
                              value: _category,
                              decoration: const InputDecoration(labelText: 'Category'),
                              dropdownColor: Colors.white,
                              items: _categories.map((c) => DropdownMenuItem(value: c, child: Text(c))).toList(),
                              onChanged: (v) => setState(() => _category = v ?? 'AI'),
                            ),
                          ),
                          const SizedBox(width: 12),
                          Expanded(
                            child: DropdownButtonFormField<String>(
                              value: _locality,
                              decoration: const InputDecoration(labelText: 'Locality'),
                              dropdownColor: Colors.white,
                              items: _localities.map((l) => DropdownMenuItem(value: l, child: Text(l))).toList(),
                              onChanged: (v) => setState(() => _locality = v ?? 'Koramangala'),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 14),

                      // Venue Name
                      TextFormField(
                        controller: _venueNameController,
                        decoration: const InputDecoration(
                          labelText: 'Venue / Hub Name',
                          hintText: 'e.g. 91springboard, Koramangala',
                        ),
                      ),
                      const SizedBox(height: 14),

                      // Date & Time
                      Row(
                        children: [
                          Expanded(
                            child: TextFormField(
                              controller: _dateController,
                              decoration: const InputDecoration(labelText: 'Date'),
                            ),
                          ),
                          const SizedBox(width: 12),
                          Expanded(
                            child: TextFormField(
                              controller: _timeController,
                              decoration: const InputDecoration(labelText: 'Time'),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 14),

                      // Free vs Paid Toggle
                      SwitchListTile(
                        contentPadding: EdgeInsets.zero,
                        title: const Text('Free Entry Event', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 13, color: KnotTheme.ink)),
                        subtitle: Text(_isFree ? 'Anyone can register for free' : 'Paid ticketed event', style: const TextStyle(fontSize: 11, color: KnotTheme.muted)),
                        value: _isFree,
                        activeColor: KnotTheme.primary,
                        onChanged: (val) => setState(() => _isFree = val),
                      ),

                      if (!_isFree) ...[
                        const SizedBox(height: 8),
                        TextFormField(
                          controller: _priceController,
                          keyboardType: TextInputType.number,
                          decoration: const InputDecoration(
                            labelText: 'Ticket Price (INR)',
                            prefixText: '₹ ',
                          ),
                        ),
                      ],
                      const SizedBox(height: 14),

                      // Capacity
                      TextFormField(
                        controller: _capacityController,
                        keyboardType: TextInputType.number,
                        decoration: const InputDecoration(
                          labelText: 'Attendee Capacity',
                          hintText: '100',
                        ),
                      ),
                      const SizedBox(height: 14),

                      // Tags
                      TextFormField(
                        controller: _tagsController,
                        decoration: const InputDecoration(
                          labelText: 'Tags (comma separated)',
                          hintText: 'AI, Networking, React',
                        ),
                      ),
                      const SizedBox(height: 14),

                      // Description
                      TextFormField(
                        controller: _descriptionController,
                        maxLines: 3,
                        decoration: const InputDecoration(
                          labelText: 'Full Description',
                          hintText: 'Share what attendees will learn, build, or experience...',
                        ),
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 20),

                CustomButton(
                  text: 'Publish Event to Knot',
                  icon: Icons.cloud_upload_outlined,
                  isLoading: _isSubmitting,
                  onPressed: _submit,
                ),
                const SizedBox(height: 30),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
