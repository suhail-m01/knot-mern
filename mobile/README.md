# Knot Mobile Application (Flutter + MERN)

> **MERNOVA X 2026 Edition** | Presidency University, Bengaluru  
> **Master of Computer Applications (MCA) Final-Year Combined Expo**  
> One real-world solution delivered across two connected platforms: **MERN Web App** and **Flutter Mobile App** powered by a single shared Express REST API and MongoDB database.

---

## 📱 Mobile Architecture & Features

The Knot Mobile application is built with **Flutter (Dart)** and connects directly to the shared Node.js Express REST API (`http://localhost:5000/api` or `http://10.0.2.2:5000/api`).

- **Shared MERN Accounts**: Register on mobile and login on web, or vice-versa with JWT authentication.
- **Explore & Filter**: Filter Bengaluru tech events by category (AI, Web3, Design, Founders, Hackathons) and locality (Koramangala, Indiranagar, HSR Layout, Whitefield).
- **One-Tap Event Registration**: Instant attendance registration with live attendee capacity tracking in MongoDB.
- **Digital QR Entry Pass**: Automatically renders a high-definition scannable QR ticket (`qr_flutter`) containing the attendee's unique `checkInToken`.
- **Organizer Check-In Desk**: Scan or input attendee QR tokens to validate and mark them checked-in directly in MongoDB.
- **Cross-Platform Host Mode**: Host an event directly from mobile; it publishes instantly and reflects on the React web client.
- **Live MERN Stack Diagnostics**: Real-time modal inspecting the health of MongoDB, Express, React, and Flutter clients.
- **Dynamic Server Switcher**: Seamlessly toggle between Android Emulator (`10.0.2.2:5000`), Localhost (`localhost:5000`), or custom Wi-Fi LAN IP for physical device testing without recompiling.

---

## 🚀 How to Run in VS Code

### Prerequisites
1. **Flutter SDK** (Version 3.0+): [Install Flutter](https://docs.flutter.dev/get-started/install)
2. **VS Code Extensions**:
   - `Flutter` (Dart Code)
   - `Dart`
3. Make sure the Knot MERN Server is running on port 5000:
   ```bash
   # From root project directory
   npm run server
   # Server will start on http://localhost:5000
   ```

### Running the App
1. Open the `mobile` folder in VS Code, or open the root project and navigate to `mobile/`.
2. Fetch dependencies:
   ```bash
   flutter pub get
   ```
3. Launch on your chosen device:
   - **Android Emulator**:
     ```bash
     flutter run -d emulator
     ```
     *(Default connects to `http://10.0.2.2:5000/api` automatically)*
   - **Chrome (Flutter Web Preview)**:
     ```bash
     flutter run -d chrome
     ```
     *(Default connects to `http://localhost:5000/api` automatically)*
   - **Physical Android / iPhone**:
     Connect your phone via USB or Wi-Fi. In the app's **Profile Screen**, tap **Backend API Server** and enter your laptop's Wi-Fi IP (e.g. `http://192.168.1.15:5000`).

---

## 📁 Mobile Directory Structure

```text
mobile/
├── android/               # Android native configuration & cleartext traffic permissions
├── ios/                   # iOS native Runner configuration
├── web/                   # Flutter Web wrapper
├── lib/
│   ├── constants/
│   │   └── api_constants.dart    # Configurable REST API URLs & endpoints
│   ├── models/
│   │   ├── event_model.dart      # KnotEvent model with 2dsphere GeoJSON support
│   │   ├── user_model.dart       # UserModel with role & interests
│   │   ├── registration_model.dart # RegistrationModel with QR checkInToken
│   │   ├── hackathon_model.dart  # HackathonModel with prize pool & tags
│   │   └── community_model.dart  # CommunityModel with member counts
│   ├── services/
│   │   ├── api_service.dart      # HTTP REST client for Events, Hackathons & Check-ins
│   │   └── auth_service.dart     # JWT Auth state provider & SharedPreferences
│   ├── theme/
│   │   └── knot_theme.dart       # Deep Indigo & Electric Purple design system
│   ├── widgets/
│   │   ├── event_card.dart       # Interactive event card
│   │   ├── hackathon_card.dart   # Hackathon status card with prize pool
│   │   ├── custom_button.dart    # Reusable styled button with loader
│   │   └── mern_health_badge.dart# Live MERN stack diagnostics badge
│   ├── screens/
│   │   ├── home_screen.dart      # Main event feed & search
│   │   ├── event_detail_screen.dart # Detailed event view & register CTA
│   │   ├── hackathons_screen.dart# Bengaluru hackathons screen
│   │   ├── my_plan_screen.dart   # Registered passes list
│   │   ├── qr_ticket_screen.dart # Digital QR code pass
│   │   ├── qr_scanner_screen.dart# Organizer QR check-in scanner
│   │   ├── create_event_screen.dart # Host an event from mobile
│   │   ├── profile_screen.dart   # Profile, MERN status & IP config
│   │   └── auth_screen.dart      # Shared account Login/Register
│   └── main.dart                 # Root app & bottom navigation bar
├── pubspec.yaml                  # Flutter dependencies (http, provider, qr_flutter, etc.)
└── README.md
```

---

## 🎯 Proving MERNOVA X Live Consistency

To demonstrate the single shared backend to the expo jury:
1. Open the **React Web App** in your browser (`http://localhost:5175`).
2. Open the **Flutter Mobile App** on your phone or emulator.
3. **Register a new account** on the mobile app.
4. **Sign in with that same account** on the React web app &mdash; it logs in immediately.
5. On the mobile app, tap **Host Event** and create a new event (e.g. *"Presidency AI Hack Night"*).
6. Refresh the web app &mdash; the new event appears in the Bengaluru feed and on the interactive Leaflet map!
7. Register for the event on the web app, and open **My Passes** on mobile &mdash; the pass with its scannable QR token appears instantly.
8. Open the **Scanner** on mobile, enter or scan the pass token &mdash; it records attendance in MongoDB in real time!
