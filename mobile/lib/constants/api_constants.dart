import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ApiConstants {
  static const String _defaultPort = '5000';
  static String _customBaseUrl = '';

  static Future<void> init() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      _customBaseUrl = prefs.getString('custom_backend_url') ?? '';
    } catch (_) {}
  }

  static Future<void> setCustomBaseUrl(String url) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      _customBaseUrl = url.trim();
      if (_customBaseUrl.endsWith('/')) {
        _customBaseUrl = _customBaseUrl.substring(0, _customBaseUrl.length - 1);
      }
      await prefs.setString('custom_backend_url', _customBaseUrl);
    } catch (_) {}
  }

  static String get baseUrl {
    if (_customBaseUrl.isNotEmpty) {
      return _customBaseUrl.endsWith('/api') ? _customBaseUrl : '$_customBaseUrl/api';
    }

    if (kIsWeb) {
      return 'http://localhost:$_defaultPort/api';
    }

    if (defaultTargetPlatform == TargetPlatform.android) {
      return 'http://10.0.2.2:$_defaultPort/api';
    }

    return 'http://localhost:$_defaultPort/api';
  }

  // Endpoints
  static String get events => '$baseUrl/events';
  static String get hackathons => '$baseUrl/hackathons';
  static String get communities => '$baseUrl/communities';
  static String get login => '$baseUrl/auth/login';
  static String get register => '$baseUrl/auth/register';
  static String get me => '$baseUrl/auth/me';
  static String get registrations => '$baseUrl/registrations';
  static String get myRegistrations => '$baseUrl/registrations/my';
  static String get checkIn => '$baseUrl/registrations/checkin';
  static String get mernStatus => '$baseUrl/mern/status';
  static String get mernPing => '$baseUrl/mern/ping';
}
