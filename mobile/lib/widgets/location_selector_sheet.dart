import 'package:flutter/material.dart';
import '../theme/knot_theme.dart';

class LocationSelectorSheet extends StatefulWidget {
  final String currentLocality;
  final int currentRadiusKm;
  final Function(String locality, int radiusKm) onLocationChanged;

  const LocationSelectorSheet({
    super.key,
    required this.currentLocality,
    required this.currentRadiusKm,
    required this.onLocationChanged,
  });

  static void show(
    BuildContext context, {
    required String currentLocality,
    required int currentRadiusKm,
    required Function(String locality, int radiusKm) onLocationChanged,
  }) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (_) => LocationSelectorSheet(
        currentLocality: currentLocality,
        currentRadiusKm: currentRadiusKm,
        onLocationChanged: onLocationChanged,
      ),
    );
  }

  @override
  State<LocationSelectorSheet> createState() => _LocationSelectorSheetState();
}

class _LocationSelectorSheetState extends State<LocationSelectorSheet> {
  late String _selectedLocality;
  late int _selectedRadius;
  final _searchController = TextEditingController();
  String? _statusMessage;

  final List<String> _localities = [
    'All Bengaluru',
    'Koramangala',
    'Indiranagar',
    'HSR Layout',
    'Whitefield',
    'Electronic City',
    'MG Road',
    'Malleshwaram',
    'Bellandur',
    'JP Nagar',
    'Jayanagar',
    'Hebbal',
    'Yelahanka',
    'Banashankari',
    'BTM Layout',
    'Marathahalli',
    'Richmond Town',
    'Sadashivanagar',
    'Rajajinagar',
    'Basavanagudi',
    'Domlur',
    'Ulsoor',
    'Shivajinagar',
    'Frazer Town',
    'Vasanth Nagar',
    'Kalyan Nagar',
    'Kammanahalli',
    'RT Nagar',
    'Sanjay Nagar',
    'Yeshwanthpur',
    'Vijayanagar',
    'Kengeri',
    'Nagarbhavi',
    'Peenya',
    'Sarjapur Road',
    'Harlur',
    'Kasavanahalli',
    'Kadugodi',
    'Mahadevapura',
    'Hoodi',
    'KR Puram',
  ];

  final List<int> _radiusOptions = [3, 5, 10, 25, 50];

  @override
  void initState() {
    super.initState();
    _selectedLocality = widget.currentLocality;
    _selectedRadius = widget.currentRadiusKm;
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  List<String> get _filteredLocalities {
    final query = _searchController.text.trim().toLowerCase();
    if (query.isEmpty) return _localities;
    return _localities.where((l) => l.toLowerCase().contains(query)).toList();
  }

  void _handleNearMe() {
    setState(() {
      _selectedLocality = 'Koramangala';
      _statusMessage = '📍 Located nearest tech anchor: Koramangala (within 2 km).';
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: MediaQuery.of(context).size.height * 0.78,
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header Bar
          Padding(
            padding: const EdgeInsets.fromLTRB(20, 16, 20, 12),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: const [
                    Text(
                      'Choose Discovery Area',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w800,
                        color: KnotTheme.ink,
                      ),
                    ),
                    SizedBox(height: 2),
                    Text(
                      '40 Bengaluru localities + city anchors',
                      style: TextStyle(fontSize: 12, color: KnotTheme.muted),
                    ),
                  ],
                ),
                IconButton(
                  icon: const Icon(Icons.close, color: KnotTheme.muted),
                  onPressed: () => Navigator.pop(context),
                ),
              ],
            ),
          ),
          const Divider(height: 1, color: KnotTheme.line),

          // Near Me & Radius Control
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Expanded(
                      child: InkWell(
                        onTap: _handleNearMe,
                        borderRadius: BorderRadius.circular(12),
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                          decoration: BoxDecoration(
                            color: KnotTheme.primarySoft,
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(color: KnotTheme.primary.withOpacity(0.3)),
                          ),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: const [
                              Icon(Icons.my_location, size: 16, color: KnotTheme.primary),
                              SizedBox(width: 8),
                              Text(
                                'Detect Near Me',
                                style: TextStyle(
                                  fontSize: 13,
                                  fontWeight: FontWeight.w700,
                                  color: KnotTheme.primary,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
                if (_statusMessage != null) ...[
                  const SizedBox(height: 8),
                  Text(
                    _statusMessage!,
                    style: const TextStyle(fontSize: 11.5, color: KnotTheme.green, fontWeight: FontWeight.w600),
                  ),
                ],
                const SizedBox(height: 14),

                // Radius selection
                const Text(
                  'DISCOVERY RADIUS',
                  style: TextStyle(fontSize: 10.5, fontWeight: FontWeight.w800, color: KnotTheme.muted, letterSpacing: 0.5),
                ),
                const SizedBox(height: 8),
                Row(
                  children: _radiusOptions.map((radius) {
                    final isSel = _selectedRadius == radius;
                    return Expanded(
                      child: Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 3),
                        child: InkWell(
                          onTap: () => setState(() => _selectedRadius = radius),
                          borderRadius: BorderRadius.circular(10),
                          child: Container(
                            padding: const EdgeInsets.symmetric(vertical: 8),
                            decoration: BoxDecoration(
                              color: isSel ? KnotTheme.primary : KnotTheme.surfaceSoft,
                              borderRadius: BorderRadius.circular(10),
                              border: Border.all(color: isSel ? KnotTheme.primary : KnotTheme.line),
                            ),
                            child: Center(
                              child: Text(
                                '$radius km',
                                style: TextStyle(
                                  fontSize: 12,
                                  fontWeight: isSel ? FontWeight.w800 : FontWeight.w600,
                                  color: isSel ? Colors.white : KnotTheme.ink,
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
                    );
                  }).toList(),
                ),
              ],
            ),
          ),
          const Divider(height: 1, color: KnotTheme.line),

          // Search Locality Input
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 10, 16, 6),
            child: TextField(
              controller: _searchController,
              onChanged: (_) => setState(() {}),
              decoration: InputDecoration(
                hintText: 'Search locality (e.g. Indiranagar, HSR...)',
                prefixIcon: const Icon(Icons.search, size: 20, color: KnotTheme.muted),
                suffixIcon: _searchController.text.isNotEmpty
                    ? IconButton(
                        icon: const Icon(Icons.clear, size: 18),
                        onPressed: () {
                          _searchController.clear();
                          setState(() {});
                        },
                      )
                    : null,
                contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
              ),
            ),
          ),

          // Locality list
          Expanded(
            child: Material(
              color: Colors.transparent,
              child: ListView.builder(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                itemCount: _filteredLocalities.length,
              itemBuilder: (context, index) {
                final loc = _filteredLocalities[index];
                final isSelected = _selectedLocality.toLowerCase() == loc.toLowerCase() ||
                    (loc == 'All Bengaluru' && (_selectedLocality == 'All' || _selectedLocality.isEmpty));

                return ListTile(
                  contentPadding: const EdgeInsets.symmetric(horizontal: 8, vertical: 0),
                  dense: true,
                  leading: Icon(
                    Icons.location_on_outlined,
                    color: isSelected ? KnotTheme.primary : KnotTheme.muted,
                    size: 20,
                  ),
                  title: Text(
                    loc,
                    style: TextStyle(
                      fontSize: 13.5,
                      fontWeight: isSelected ? FontWeight.w800 : FontWeight.w500,
                      color: isSelected ? KnotTheme.primary : KnotTheme.ink,
                    ),
                  ),
                  trailing: isSelected
                      ? const Icon(Icons.check_circle, color: KnotTheme.primary, size: 20)
                      : null,
                  onTap: () {
                    final chosen = loc == 'All Bengaluru' ? 'All' : loc;
                    widget.onLocationChanged(chosen, _selectedRadius);
                    Navigator.pop(context);
                  },
                );
              },
            ),
          ),
        ),
        ],
      ),
    );
  }
}
