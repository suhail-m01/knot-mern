import 'package:flutter/foundation.dart';
import '../models/event_model.dart';
import '../models/hackathon_model.dart';

class BookmarksService extends ChangeNotifier {
  static final BookmarksService _instance = BookmarksService._internal();
  factory BookmarksService() => _instance;
  BookmarksService._internal();

  final Set<String> _savedEventIds = {};
  final Set<String> _savedHackathonIds = {};
  final Map<String, KnotEvent> _savedEventsMap = {};
  final Map<String, HackathonModel> _savedHackathonsMap = {};

  bool isEventSaved(String id) => _savedEventIds.contains(id);
  bool isHackathonSaved(String id) => _savedHackathonIds.contains(id);

  List<KnotEvent> get savedEvents => _savedEventsMap.values.toList();
  List<HackathonModel> get savedHackathons => _savedHackathonsMap.values.toList();

  int get totalSavedCount => _savedEventIds.length + _savedHackathonIds.length;

  void toggleEventBookmark(KnotEvent event) {
    if (_savedEventIds.contains(event.id)) {
      _savedEventIds.remove(event.id);
      _savedEventsMap.remove(event.id);
    } else {
      _savedEventIds.add(event.id);
      _savedEventsMap[event.id] = event;
    }
    notifyListeners();
  }

  void toggleHackathonBookmark(HackathonModel hackathon) {
    if (_savedHackathonIds.contains(hackathon.id)) {
      _savedHackathonIds.remove(hackathon.id);
      _savedHackathonsMap.remove(hackathon.id);
    } else {
      _savedHackathonIds.add(hackathon.id);
      _savedHackathonsMap[hackathon.id] = hackathon;
    }
    notifyListeners();
  }
}
