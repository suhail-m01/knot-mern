import 'event_model.dart';

class RegistrationModel {
  final String id;
  final String eventId;
  final String eventTitle;
  final KnotEvent? event;
  final String userId;
  final String userName;
  final String userEmail;
  final String checkInToken;
  final String status;
  final bool checkedIn;
  final String? checkedInAt;
  final String createdAt;
  final String participationType;
  final String? teamName;
  final String? teamCode;
  final String? selectedTrack;
  final String? college;
  final String? role;

  String get ticketNumber => checkInToken.isNotEmpty ? checkInToken : id;
  String get date => event?.date ?? 'Dec 12, 2026';
  String get location => event?.location.name ?? 'Bengaluru Tech Venue';

  RegistrationModel({
    required this.id,
    required this.eventId,
    required this.eventTitle,
    this.event,
    required this.userId,
    required this.userName,
    required this.userEmail,
    required this.checkInToken,
    required this.status,
    required this.checkedIn,
    this.checkedInAt,
    required this.createdAt,
    this.participationType = 'solo',
    this.teamName,
    this.teamCode,
    this.selectedTrack,
    this.college,
    this.role,
  });

  factory RegistrationModel.fromJson(Map<String, dynamic> json) {
    KnotEvent? populatedEvent;
    String eId = '';
    String eTitle = '';

    if (json['eventId'] is Map) {
      populatedEvent = KnotEvent.fromJson(json['eventId']);
      eId = populatedEvent.id;
      eTitle = populatedEvent.title;
    } else {
      eId = json['eventId']?.toString() ?? '';
      eTitle = json['eventTitle'] ?? 'Knot Event';
    }

    final participantDetails = json['participantDetails'] is Map ? json['participantDetails'] : {};

    return RegistrationModel(
      id: json['_id'] ?? json['id'] ?? '',
      eventId: eId,
      eventTitle: eTitle,
      event: populatedEvent,
      userId: json['userId'] is Map ? (json['userId']['_id'] ?? '') : (json['userId']?.toString() ?? ''),
      userName: json['userName'] ?? (json['userId'] is Map ? json['userId']['name'] : 'Attendee'),
      userEmail: json['userEmail'] ?? (json['userId'] is Map ? json['userId']['email'] : ''),
      checkInToken: json['checkInToken'] ?? '',
      status: json['status'] ?? 'CONFIRMED',
      checkedIn: json['checkedIn'] ?? false,
      checkedInAt: json['checkedInAt'],
      createdAt: json['createdAt'] ?? DateTime.now().toIso8601String(),
      participationType: json['participationType'] ?? 'solo',
      teamName: json['teamName'],
      teamCode: json['teamCode'],
      selectedTrack: json['selectedTrack'] ?? participantDetails['selectedTrack'],
      college: json['college'] ?? participantDetails['college'],
      role: json['role'] ?? participantDetails['role'],
    );
  }
}
