import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class KnotTheme {
  // Knot exact CSS color palette from src/styles.css
  static const Color background = Color(0xFFF8F7FB);
  static const Color surface = Color(0xFFFFFFFF);
  static const Color surfaceSoft = Color(0xFFF4F1F8);
  static const Color ink = Color(0xFF282438);
  static const Color muted = Color(0xFF706B7D);
  static const Color soft = Color(0xFF9791A3);
  static const Color line = Color(0xFFE7E3ED);
  
  static const Color primary = Color(0xFF6750C7);
  static const Color primaryDark = Color(0xFF4C389F);
  static const Color primarySoft = Color(0xFFEEE9FB);
  
  static const Color deep = Color(0xFF211A3D);
  static const Color deep2 = Color(0xFF2C2350);
  
  static const Color accent = Color(0xFFF59A73);
  static const Color accentDark = Color(0xFFD97850);
  
  static const Color green = Color(0xFF11765F);
  static const Color greenSoft = Color(0xFFE7F6F0);
  static const Color liveDot = Color(0xFF40C69F);
  
  static const Color amber = Color(0xFFA86513);
  static const Color amberSoft = Color(0xFFFFF4DF);
  
  static const Color red = Color(0xFFB44A53);
  static const Color redSoft = Color(0xFFFFF0F1);

  // Backward-compatibility and component aliases
  static const Color border = line;
  static const Color borderDark = line;
  static const Color textPrimary = ink;
  static const Color textSecondary = muted;
  static const Color textMuted = soft;
  static const Color surfaceElevated = surfaceSoft;
  static const Color accentCyan = Color(0xFF3467C9);
  static const Color accentGold = amber;
  static const Color accentOrange = accent;
  static const Color errorRed = red;
  static const Color successGreen = green;
  static const Color primaryLight = primarySoft;

  // Event category accent colors from EventCard.tsx
  static const Map<String, Color> categoryAccents = {
    'hackathon': Color(0xFF7357D9),
    'workshop': Color(0xFFE66A3D),
    'meetup': Color(0xFF16866D),
    'conference': Color(0xFF3467C9),
    'summit': Color(0xFFAD5A92),
    'ai': Color(0xFF6750C7),
    'tech': Color(0xFF3467C9),
    'design': Color(0xFFE66A3D),
    'web3': Color(0xFF16866D),
    'founders': Color(0xFFF59A73),
  };

  static Color getAccent(String category) {
    return categoryAccents[category.toLowerCase()] ?? primary;
  }

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      scaffoldBackgroundColor: background,
      primaryColor: primary,
      colorScheme: const ColorScheme.light(
        primary: primary,
        secondary: accent,
        surface: surface,
        error: red,
        onPrimary: Colors.white,
        onSecondary: Colors.white,
        onSurface: ink,
      ),
      fontFamilyFallback: const ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      textTheme: GoogleFonts.interTextTheme(
        ThemeData.light().textTheme,
      ).apply(
        bodyColor: ink,
        displayColor: ink,
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: surface,
        elevation: 0,
        scrolledUnderElevation: 1,
        centerTitle: false,
        titleTextStyle: TextStyle(
          fontSize: 18,
          fontWeight: FontWeight.w700,
          color: ink,
        ),
        iconTheme: IconThemeData(color: ink),
      ),
      cardTheme: CardThemeData(
        color: surface,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(18),
          side: const BorderSide(color: line, width: 1),
        ),
        margin: EdgeInsets.zero,
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: surface,
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: line),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: line),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: primary, width: 1.5),
        ),
        hintStyle: const TextStyle(color: muted, fontSize: 14),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: primary,
          foregroundColor: Colors.white,
          elevation: 0,
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 13),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(11),
          ),
          textStyle: const TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        backgroundColor: surface,
        selectedItemColor: primary,
        unselectedItemColor: muted,
        type: BottomNavigationBarType.fixed,
        elevation: 8,
        selectedLabelStyle: TextStyle(fontSize: 11, fontWeight: FontWeight.w700),
        unselectedLabelStyle: TextStyle(fontSize: 11, fontWeight: FontWeight.w500),
      ),
      dividerTheme: const DividerThemeData(
        color: line,
        thickness: 1,
        space: 1,
      ),
    );
  }
}
