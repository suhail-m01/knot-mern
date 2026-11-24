import 'package:flutter/foundation.dart';
import 'package:url_launcher/url_launcher.dart';

class UrlLauncherUtil {
  /// Opens an external URL safely across Web, Android, iOS, and Desktop.
  static Future<bool> openUrl(String rawUrl) async {
    if (rawUrl.isEmpty) return false;
    String url = rawUrl.trim();

    // Ensure valid schema
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://$url';
    }

    final uri = Uri.tryParse(url);
    if (uri == null) return false;

    try {
      if (kIsWeb) {
        // On Web, LaunchMode.platformDefault or externalApplication works reliably
        return await launchUrl(uri, mode: LaunchMode.platformDefault);
      } else {
        return await launchUrl(uri, mode: LaunchMode.externalApplication);
      }
    } catch (e) {
      debugPrint('[UrlLauncherUtil] Error launching URL: $e');
      try {
        return await launchUrl(uri, mode: LaunchMode.inAppWebView);
      } catch (_) {
        return false;
      }
    }
  }
}
