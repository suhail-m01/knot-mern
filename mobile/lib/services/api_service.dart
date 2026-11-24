import 'dart:convert';
import 'package:http/http.dart' as http;
import '../constants/api_constants.dart';
import '../data/fallback_data.dart';
import '../models/event_model.dart';
import '../models/hackathon_model.dart';
import '../models/community_model.dart';
import '../models/registration_model.dart';

class ApiService {
  static bool isOfflineMode = false;
  static final List<KnotEvent> _localCreatedEvents = [];
  static final List<RegistrationModel> _localRegistrations = [];

  final String? token;
  final String? userId;

  ApiService({this.token, this.userId});

  Map<String, String> get _headers {
    final headers = {'Content-Type': 'application/json'};
    if (token != null && token!.isNotEmpty) {
      headers['Authorization'] = 'Bearer $token';
    }
    if (userId != null && userId!.isNotEmpty) {
      headers['x-user-id'] = userId!;
    }
    return headers;
  }

  // ================= EVENTS =================
  Future<List<KnotEvent>> getEvents({
    String? search,
    String? category,
    String? area,
    String? city,
  }) async {
    final queryParams = <String, String>{};
    if (search != null && search.isNotEmpty) {
      queryParams['search'] = search;
      queryParams['q'] = search;
    }
    if (category != null && category != 'All' && category != 'All Formats' && category.isNotEmpty) {
      queryParams['category'] = category;
    }
    if (area != null && area != 'All' && area.isNotEmpty) {
      queryParams['area'] = area;
      queryParams['locality'] = area;
    }
    if (city != null && city.isNotEmpty) queryParams['city'] = city;

    try {
      final uri = Uri.parse(ApiConstants.events).replace(queryParameters: queryParams.isEmpty ? null : queryParams);
      final res = await http.get(uri, headers: _headers).timeout(const Duration(seconds: 4));

      if (res.statusCode == 200) {
        final json = jsonDecode(res.body);
        final List rawList = json['data'] ?? [];
        isOfflineMode = false;
        final serverEvents = rawList.map((e) => KnotEvent.fromJson(e)).toList();
        return [..._localCreatedEvents, ...serverEvents];
      }
    } catch (_) {
      // Server unreachable - gracefully serve fallback catalog
      isOfflineMode = true;
    }

    // Serve built-in Bengaluru events with flexible normalized filtering
    var list = [..._localCreatedEvents, ...FallbackData.fallbackEvents];

    if (search != null && search.isNotEmpty) {
      final q = search.toLowerCase();
      list = list.where((e) =>
        e.title.toLowerCase().contains(q) ||
        e.description.toLowerCase().contains(q) ||
        e.location.name.toLowerCase().contains(q) ||
        e.location.locality.toLowerCase().contains(q) ||
        e.tags.any((t) => t.toLowerCase().contains(q))
      ).toList();
    }
    if (category != null && category != 'All' && category != 'All Formats' && category.isNotEmpty) {
      final c = category.toLowerCase().replaceAll(' ', '');
      final cSingular = c.endsWith('s') ? c.substring(0, c.length - 1) : c;
      list = list.where((e) {
        final cat = e.category.toLowerCase().replaceAll(' ', '');
        final fmt = e.format.toLowerCase().replaceAll(' ', '');
        return cat.contains(cSingular) ||
               fmt.contains(cSingular) ||
               e.tags.any((t) => t.toLowerCase().contains(cSingular)) ||
               e.title.toLowerCase().contains(cSingular);
      }).toList();
    }
    if (area != null && area != 'All' && area.isNotEmpty) {
      final a = area.toLowerCase().replaceAll(' ', '').replaceAll('_', '');
      list = list.where((e) {
        final loc = e.location.locality.toLowerCase().replaceAll(' ', '').replaceAll('_', '');
        final name = e.location.name.toLowerCase().replaceAll(' ', '').replaceAll('_', '');
        return loc.contains(a) || name.contains(a);
      }).toList();
    }

    return list;
  }

  Future<KnotEvent> getEventById(String id) async {
    try {
      final res = await http.get(Uri.parse('${ApiConstants.events}/$id'), headers: _headers).timeout(const Duration(seconds: 4));
      if (res.statusCode == 200) {
        final json = jsonDecode(res.body);
        return KnotEvent.fromJson(json['data'] ?? json);
      }
    } catch (_) {}

    final found = [..._localCreatedEvents, ...FallbackData.fallbackEvents].firstWhere(
      (e) => e.id == id,
      orElse: () => FallbackData.fallbackEvents.first,
    );
    return found;
  }

  Future<KnotEvent> createEvent(Map<String, dynamic> eventData) async {
    try {
      final res = await http.post(
        Uri.parse(ApiConstants.events),
        headers: _headers,
        body: jsonEncode(eventData),
      ).timeout(const Duration(seconds: 4));

      if (res.statusCode == 201 || res.statusCode == 200) {
        final json = jsonDecode(res.body);
        final created = KnotEvent.fromJson(json['data'] ?? json);
        _localCreatedEvents.insert(0, created);
        return created;
      }
    } catch (_) {}

    // Offline optimistic creation
    final localId = 'evt_local_${DateTime.now().millisecondsSinceEpoch}';
    final offlineEvent = KnotEvent(
      id: localId,
      title: eventData['title'] ?? 'Hosted Event',
      description: eventData['description'] ?? '',
      category: eventData['category'] ?? 'Tech',
      date: eventData['date'] ?? 'Upcoming',
      time: eventData['time'] ?? '10:00 AM',
      location: EventLocation(
        name: eventData['location']?['name'] ?? 'Bengaluru Venue',
        address: eventData['location']?['address'] ?? 'Bengaluru, Karnataka',
        locality: eventData['location']?['locality'] ?? 'Koramangala',
        city: 'Bengaluru',
        lat: 12.9352,
        lng: 77.6245,
      ),
      price: EventPrice(
        isFree: eventData['price']?['isFree'] ?? true,
        amount: eventData['price']?['amount'] ?? 0,
        currency: 'INR',
      ),
      capacity: eventData['capacity'] ?? 100,
      registeredCount: 1,
      tags: (eventData['tags'] as List?)?.map((e) => e.toString()).toList() ?? ['Tech'],
      image: eventData['image'] ?? 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      organizer: EventOrganizer(
        name: eventData['organizer']?['name'] ?? 'Knot Host',
        avatar: eventData['organizer']?['avatar'] ?? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
        verified: true,
      ),
      format: eventData['format'] ?? 'In-Person',
    );
    _localCreatedEvents.insert(0, offlineEvent);
    return offlineEvent;
  }

  // ================= HACKATHONS =================
  Future<List<HackathonModel>> getHackathons({String? status, String? area, String? city}) async {
    final queryParams = <String, String>{};
    if (status != null && status != 'ALL' && status.isNotEmpty) queryParams['status'] = status;
    if (area != null && area != 'All' && area.isNotEmpty) queryParams['area'] = area;
    if (city != null && city.isNotEmpty) queryParams['city'] = city;

    try {
      final uri = Uri.parse(ApiConstants.hackathons).replace(queryParameters: queryParams.isEmpty ? null : queryParams);
      final res = await http.get(uri, headers: _headers).timeout(const Duration(seconds: 4));

      if (res.statusCode == 200) {
        final json = jsonDecode(res.body);
        final List rawList = json['data'] ?? [];
        return rawList.map((e) => HackathonModel.fromJson(e)).toList();
      }
    } catch (_) {}

    var list = FallbackData.fallbackHackathons;
    if (status != null && status != 'ALL' && status.isNotEmpty) {
      list = list.where((h) => h.status.toUpperCase() == status.toUpperCase()).toList();
    }
    return list;
  }

  // ================= COMMUNITIES =================
  Future<List<CommunityModel>> getCommunities({String? city, String? area, String? category, String? search}) async {
    final queryParams = <String, String>{};
    if (search != null && search.isNotEmpty) queryParams['search'] = search;
    if (category != null && category != 'All' && category != 'All Formats' && category.isNotEmpty) {
      queryParams['category'] = category;
    }
    if (area != null && area != 'All' && area.isNotEmpty) {
      queryParams['area'] = area;
    }
    if (city != null && city.isNotEmpty) queryParams['city'] = city;

    try {
      final uri = Uri.parse(ApiConstants.communities).replace(queryParameters: queryParams.isEmpty ? null : queryParams);
      final res = await http.get(uri, headers: _headers).timeout(const Duration(seconds: 4));
      if (res.statusCode == 200) {
        final json = jsonDecode(res.body);
        final List rawList = json['data'] ?? [];
        if (rawList.isNotEmpty) {
          return rawList.map((e) => CommunityModel.fromJson(e)).toList();
        }
      }
    } catch (_) {}

    var list = [...FallbackData.fallbackCommunities];
    if (search != null && search.isNotEmpty) {
      final q = search.toLowerCase();
      list = list.where((c) =>
        c.name.toLowerCase().contains(q) ||
        c.description.toLowerCase().contains(q) ||
        c.tags.any((t) => t.toLowerCase().contains(q))
      ).toList();
    }
    if (area != null && area != 'All' && area.isNotEmpty) {
      list = list.where((c) =>
        c.locality.toLowerCase().contains(area.toLowerCase()) ||
        c.city.toLowerCase().contains(area.toLowerCase())
      ).toList();
    }
    if (category != null && category != 'All' && category != 'All Formats' && category.isNotEmpty) {
      final cat = category.toLowerCase();
      list = list.where((c) =>
        c.tags.any((t) => t.toLowerCase().contains(cat)) ||
        c.description.toLowerCase().contains(cat) ||
        c.name.toLowerCase().contains(cat)
      ).toList();
    }

    return list;
  }

  // ================= REGISTRATIONS =================
  Future<RegistrationModel> registerForEvent(
    String eventId, {
    String participationType = 'solo',
    String? teamName,
    String? teamCode,
    List<String>? teamMembers,
    String? selectedTrack,
    String? college,
    String? role,
    String? phone,
    String? githubUrl,
    String? notes,
  }) async {
    try {
      final payload = {
        'eventId': eventId,
        'userId': userId ?? 'usr_demo_participant',
        'participationType': participationType,
        'teamName': teamName,
        'teamCode': teamCode,
        'teamMembers': teamMembers ?? [],
        'participantDetails': {
          'selectedTrack': selectedTrack,
          'college': college,
          'role': role,
          'phone': phone,
          'githubUrl': githubUrl,
        },
        'notes': notes,
      };

      final res = await http.post(
        Uri.parse(ApiConstants.registrations),
        headers: _headers,
        body: jsonEncode(payload),
      ).timeout(const Duration(seconds: 4));

      if (res.statusCode == 200 || res.statusCode == 201) {
        final json = jsonDecode(res.body);
        final reg = RegistrationModel.fromJson(json['registration'] ?? json['data'] ?? json);
        _localRegistrations.insert(0, reg);
        return reg;
      }
    } catch (_) {}

    // Offline registration fallback
    final randomHex = DateTime.now().millisecondsSinceEpoch.toRadixString(16).substring(4).toUpperCase();
    final offlineToken = 'KNOT-$randomHex';
    final offlineReg = RegistrationModel(
      id: 'reg_local_$randomHex',
      eventId: eventId,
      eventTitle: 'Registered Knot Event',
      userId: userId ?? 'guest_user',
      userName: 'Knot Attendee',
      userEmail: 'attendee@knot.app',
      checkInToken: offlineToken,
      status: 'CONFIRMED',
      checkedIn: false,
      createdAt: DateTime.now().toIso8601String(),
      participationType: participationType,
      teamName: teamName,
      teamCode: teamCode ?? (teamName != null ? 'TEAM-$randomHex' : null),
      selectedTrack: selectedTrack,
      college: college,
      role: role,
    );
    _localRegistrations.insert(0, offlineReg);
    return offlineReg;
  }

  Future<List<RegistrationModel>> getMyRegistrations() async {
    try {
      final res = await http.get(
        Uri.parse(ApiConstants.myRegistrations),
        headers: _headers,
      ).timeout(const Duration(seconds: 4));

      if (res.statusCode == 200) {
        final json = jsonDecode(res.body);
        final List rawList = json['data'] ?? [];
        final serverRegs = rawList.map((e) => RegistrationModel.fromJson(e)).toList();
        return [..._localRegistrations, ...serverRegs];
      }
    } catch (_) {}

    return _localRegistrations;
  }

  // ================= QR CHECK-IN =================
  Future<Map<String, dynamic>> checkInAttendee(String token) async {
    try {
      final res = await http.post(
        Uri.parse(ApiConstants.checkIn),
        headers: _headers,
        body: jsonEncode({'token': token.trim()}),
      ).timeout(const Duration(seconds: 4));

      final json = jsonDecode(res.body);
      if (res.statusCode == 200 && json['success'] == true) {
        return json;
      } else {
        throw Exception(json['message'] ?? json['error'] ?? 'Ticket verification failed');
      }
    } catch (e) {
      if (e.toString().contains('Ticket verification failed')) rethrow;
    }

    // Local checkin simulation
    return {
      'success': true,
      'alreadyCheckedIn': false,
      'registration': {
        'userName': 'Knot Attendee',
        'eventTitle': 'Presidency MERNOVA X Expo 2026',
        'checkInToken': token,
        'checkedInAt': DateTime.now().toLocal().toString(),
      },
    };
  }

  // ================= MERN DIAGNOSTICS =================
  Future<Map<String, dynamic>> getMernStatus() async {
    final res = await http.get(Uri.parse(ApiConstants.mernStatus)).timeout(const Duration(seconds: 3));
    if (res.statusCode == 200) {
      return jsonDecode(res.body);
    } else {
      throw Exception('Could not reach MERN status endpoint');
    }
  }
}
