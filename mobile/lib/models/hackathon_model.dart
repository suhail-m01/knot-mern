import 'event_model.dart';

class HackathonPrizePool {
  final num total;
  final String currency;

  HackathonPrizePool({
    required this.total,
    required this.currency,
  });

  factory HackathonPrizePool.fromJson(Map<String, dynamic> json) {
    return HackathonPrizePool(
      total: json['total'] ?? 0,
      currency: json['currency'] ?? 'INR',
    );
  }

  String get displayString {
    if (total >= 100000) {
      final inLakhs = (total / 100000).toStringAsFixed(1).replaceAll('.0', '');
      return '₹$inLakhs Lakhs';
    } else if (total > 0) {
      return '₹$total';
    }
    return 'Swag & Perks';
  }

  num get amount => total;
}

class HackathonModel {
  final String id;
  final String name;
  final String slug;
  final String tagline;
  final String description;
  final String coverUrl;
  final HackathonPrizePool prizePool;
  final String status;
  final String mode;
  final String startDate;
  final String endDate;
  final String deadline;
  final String platform;
  final String city;
  final String location;
  final List<String> tags;
  final int registrationCount;
  final String officialUrl;
  final String sourceUrl;

  String get title => name;
  String get organizer => platform.isNotEmpty ? platform : 'Knot';
  String get teamSize => '1-4 Members';
  bool get isFree => true;

  String get effectiveUrl {
    if (officialUrl.isNotEmpty) return officialUrl;
    if (sourceUrl.isNotEmpty) return sourceUrl;
    if (platform.toLowerCase().contains('unstop')) {
      return 'https://unstop.com/hackathons';
    }
    if (platform.toLowerCase().contains('devfolio')) {
      return 'https://devfolio.co/explore';
    }
    return 'https://knot.app/events/$id';
  }

  String get dayNumber {
    if (startDate.contains('-')) {
      final parts = startDate.split('-');
      if (parts.length >= 3) return parts[2].substring(0, 2);
    }
    return '18';
  }

  String get monthCode {
    if (startDate.contains('-')) {
      final parts = startDate.split('-');
      if (parts.length >= 2) {
        final m = int.tryParse(parts[1]) ?? 12;
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        return months[(m - 1).clamp(0, 11)];
      }
    }
    return 'DEC';
  }

  KnotEvent toKnotEvent() {
    return KnotEvent(
      id: id,
      title: name,
      description: description.isNotEmpty ? description : tagline,
      category: 'Hackathon',
      date: startDate.isNotEmpty ? startDate.split('T')[0] : 'Upcoming',
      time: '10:00 AM - 6:00 PM',
      location: EventLocation(
        name: location.isNotEmpty ? location : '$city Campus / Studio',
        address: location.isNotEmpty ? location : '$city, Karnataka',
        locality: location.contains(',') ? location.split(',')[0].trim() : 'Koramangala',
        city: city,
        lat: 12.9716,
        lng: 77.5946,
      ),
      price: EventPrice(isFree: true, amount: 0, currency: 'INR'),
      capacity: 500,
      registeredCount: registrationCount,
      tags: tags,
      image: coverUrl,
      organizer: EventOrganizer(
        name: organizer,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
        verified: true,
      ),
      format: mode,
    );
  }

  HackathonModel({
    required this.id,
    required this.name,
    required this.slug,
    required this.tagline,
    required this.description,
    required this.coverUrl,
    required this.prizePool,
    required this.status,
    required this.mode,
    required this.startDate,
    required this.endDate,
    required this.deadline,
    required this.platform,
    required this.city,
    required this.location,
    required this.tags,
    required this.registrationCount,
    this.officialUrl = '',
    this.sourceUrl = '',
  });

  factory HackathonModel.fromJson(Map<String, dynamic> json) {
    return HackathonModel(
      id: json['_id'] ?? json['id'] ?? '',
      name: json['name'] ?? json['title'] ?? 'Hackathon',
      slug: json['slug'] ?? '',
      tagline: json['tagline'] ?? '',
      description: json['description'] ?? '',
      coverUrl: json['coverUrl'] ?? json['imageUrl'] ?? 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
      prizePool: HackathonPrizePool.fromJson(json['prizePool'] is Map ? json['prizePool'] : {'total': 500000, 'currency': 'INR'}),
      status: json['status'] ?? 'UPCOMING',
      mode: json['mode'] ?? 'HYBRID',
      startDate: json['startDate'] ?? '',
      endDate: json['endDate'] ?? '',
      deadline: json['registrationDeadline'] ?? json['deadline'] ?? '',
      platform: json['platform'] ?? json['sourcePlatform'] ?? 'Knot Native',
      city: json['city'] ?? 'Bengaluru',
      location: json['location'] ?? json['venue'] ?? 'Koramangala, Bengaluru',
      tags: (json['tags'] as List?)?.map((e) => e.toString()).toList() ?? ['Hackathon'],
      registrationCount: json['registrationCount'] ?? json['participantCount'] ?? 150,
      officialUrl: json['officialUrl'] ?? json['registrationUrl'] ?? json['url'] ?? '',
      sourceUrl: json['sourceUrl'] ?? '',
    );
  }
}
