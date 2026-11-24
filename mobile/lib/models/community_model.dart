class CommunityModel {
  final String id;
  final String name;
  final String slug;
  final String tagline;
  final String description;
  final String avatarUrl;
  final String coverUrl;
  final String city;
  final String locality;
  final int memberCount;
  final List<String> tags;
  final bool verified;
  final String platform;
  final String platformUrl;
  final String discordInvite;
  final String activityLevel;

  int get membersCount => memberCount;
  String get category => tags.isNotEmpty ? tags.first : 'Tech';

  CommunityModel({
    required this.id,
    required this.name,
    required this.slug,
    required this.tagline,
    required this.description,
    required this.avatarUrl,
    required this.coverUrl,
    required this.city,
    required this.locality,
    required this.memberCount,
    required this.tags,
    required this.verified,
    this.platform = 'discord',
    this.platformUrl = '',
    this.discordInvite = '',
    this.activityLevel = 'high',
  });

  factory CommunityModel.fromJson(Map<String, dynamic> json) {
    return CommunityModel(
      id: json['_id'] ?? json['id'] ?? '',
      name: json['name'] ?? 'Knot Tech Hub',
      slug: json['slug'] ?? '',
      tagline: json['tagline'] ?? '',
      description: json['description'] ?? '',
      avatarUrl: json['avatarUrl'] ?? 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100',
      coverUrl: json['coverUrl'] ?? 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800',
      city: json['city'] ?? 'Bengaluru',
      locality: json['locality'] ?? json['area'] ?? 'Koramangala',
      memberCount: json['memberCount'] ?? 250,
      tags: (json['tags'] as List?)?.map((e) => e.toString()).toList() ?? ['Community'],
      verified: json['verified'] ?? true,
      platform: json['platform'] ?? (json['discordInvite'] != null ? 'discord' : 'web'),
      platformUrl: json['platformUrl'] ?? '',
      discordInvite: json['discordInvite'] ?? '',
      activityLevel: json['activityLevel'] ?? 'high',
    );
  }
}
