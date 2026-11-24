class UserModel {
  final String id;
  final String name;
  final String email;
  final String role;
  final String avatar;
  final List<String> interests;
  final String city;

  UserModel({
    required this.id,
    required this.name,
    required this.email,
    required this.role,
    required this.avatar,
    required this.interests,
    required this.city,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['_id'] ?? json['id'] ?? '',
      name: json['name'] ?? 'Knot Explorer',
      email: json['email'] ?? '',
      role: json['role'] ?? 'user',
      avatar: json['avatar'] ?? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
      interests: (json['interests'] as List?)?.map((e) => e.toString()).toList() ?? ['AI', 'Tech', 'Hackathons'],
      city: json['city'] ?? 'Bengaluru',
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    'email': email,
    'role': role,
    'avatar': avatar,
    'interests': interests,
    'city': city,
  };
}
