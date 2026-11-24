class EventLocation {
  final String name;
  final String address;
  final String locality;
  final String city;
  final double lat;
  final double lng;

  EventLocation({
    required this.name,
    required this.address,
    required this.locality,
    required this.city,
    required this.lat,
    required this.lng,
  });

  factory EventLocation.fromJson(Map<String, dynamic> json) {
    double latitude = 12.9716;
    double longitude = 77.5946;

    if (json['geo'] != null && json['geo']['coordinates'] is List) {
      final coords = json['geo']['coordinates'] as List;
      if (coords.length >= 2) {
        longitude = (coords[0] as num).toDouble();
        latitude = (coords[1] as num).toDouble();
      }
    } else if (json['lat'] != null && json['lng'] != null) {
      latitude = (json['lat'] as num).toDouble();
      longitude = (json['lng'] as num).toDouble();
    }

    return EventLocation(
      name: json['name'] ?? 'Bengaluru Venue',
      address: json['address'] ?? 'Bengaluru, Karnataka',
      locality: json['locality'] ?? json['area'] ?? 'Koramangala',
      city: json['city'] ?? 'Bengaluru',
      lat: latitude,
      lng: longitude,
    );
  }

  Map<String, dynamic> toJson() => {
    'name': name,
    'address': address,
    'locality': locality,
    'city': city,
    'geo': {
      'type': 'Point',
      'coordinates': [lng, lat],
    },
  };
}

class EventPrice {
  final bool isFree;
  final num amount;
  final String currency;

  EventPrice({
    required this.isFree,
    required this.amount,
    required this.currency,
  });

  factory EventPrice.fromJson(Map<String, dynamic> json) {
    return EventPrice(
      isFree: json['isFree'] ?? (json['amount'] == null || json['amount'] == 0),
      amount: json['amount'] ?? 0,
      currency: json['currency'] ?? 'INR',
    );
  }

  String get displayString {
    if (isFree || amount == 0) return 'Free';
    return '₹$amount';
  }
}

class EventOrganizer {
  final String name;
  final String avatar;
  final bool verified;

  EventOrganizer({
    required this.name,
    required this.avatar,
    required this.verified,
  });

  factory EventOrganizer.fromJson(Map<String, dynamic> json) {
    return EventOrganizer(
      name: json['name'] ?? 'Knot Community',
      avatar: json['avatar'] ?? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      verified: json['verified'] ?? true,
    );
  }
}

class KnotEvent {
  final String id;
  final String title;
  final String description;
  final String category;
  final String date;
  final String time;
  final EventLocation location;
  final EventPrice price;
  final int capacity;
  final int registeredCount;
  final List<String> tags;
  final String image;
  final EventOrganizer organizer;
  final String format;

  KnotEvent({
    required this.id,
    required this.title,
    required this.description,
    required this.category,
    required this.date,
    required this.time,
    required this.location,
    required this.price,
    required this.capacity,
    required this.registeredCount,
    required this.tags,
    required this.image,
    required this.organizer,
    required this.format,
  });

  factory KnotEvent.fromJson(Map<String, dynamic> json) {
    return KnotEvent(
      id: json['_id'] ?? json['id'] ?? '',
      title: json['title'] ?? 'Untitled Event',
      description: json['description'] ?? '',
      category: json['category'] ?? 'Tech',
      date: json['date'] ?? 'Upcoming',
      time: json['time'] ?? '10:00 AM - 1:00 PM',
      location: EventLocation.fromJson(json['location'] ?? {}),
      price: EventPrice.fromJson(json['price'] ?? {}),
      capacity: json['capacity'] ?? 100,
      registeredCount: json['registeredCount'] ?? 0,
      tags: (json['tags'] as List?)?.map((e) => e.toString()).toList() ?? ['Tech'],
      image: json['image'] ?? 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      organizer: EventOrganizer.fromJson(json['organizer'] ?? {}),
      format: json['format'] ?? 'In-Person',
    );
  }

  bool get isSoldOut => capacity > 0 && registeredCount >= capacity;
}
