# VahaniQ

VahaniQ is a comprehensive, dual-sided ride-hailing application built with **React Native** and **Expo**. It provides an integrated experience for both Passengers (Users) and Captains (Drivers), operating seamlessly in a single unified application through role switching.

## 🚀 Features

### 👤 User (Passenger) App
- **Live Ride Tracking**: Real-time GPS location tracking using `react-native-webview` and Leaflet integration (bypassing native Map API costs).
- **Dynamic Fare Estimates**: Accurate ride fare calculation prior to booking.
- **Multilingual Support**: Switch seamlessly between English and Hindi globally across the interface.
- **Safety Toolkit**: Features Auto-share live location, SOS Emergency Button, and proactive ride safety alerts.
- **Help & Support System**: Built-in ticketing for fare disputes, captain related queries, and general support.
- **Ride History**: Detailed overview of past journeys.

### 🚕 Captain (Driver) App
- **Service Manager**: Activate or deactivate specific services (Auto, Auto Parcel, Auto Boost) based on availability.
- **Earnings Dashboard**: Track daily, weekly, and transaction-level financial metrics.
- **In-App Navigation**: Accept, track, and complete rides using the integrated free mapping solution.
- **100% Localized Experience**: All screens logically translated for Hindi-first captains.
- **Zero-Commission Access Fee System**: Subscription-based model offering rides with ₹0 commission deductions. 
- **Rewards System**: Gamified Gem logic & Insurance tracking for performing captains.

## 🛠️ Tech Stack & Dependencies

- **Framework**: [React Native](https://reactnative.dev) + [Expo SDK 54](https://expo.dev/)
- **Navigation**: React Navigation (`@react-navigation/native`, `@react-navigation/bottom-tabs`, `@react-navigation/native-stack`)
- **Maps / Location**: Custom HTML/Leaflet map overlay via `react-native-webview` (Replaced `react-native-maps` for cross-platform stability without API limits), plus `expo-location`.
- **Icons & UI**: `@expo/vector-icons` (Ionicons, MaterialCommunityIcons), `react-native-safe-area-context`
- **State Management**: React Context API (`AppContext`)
- **Localization**: Custom dictionary setup (`translations.js`) mapped to Context globally.
- **Build System**: Expo Application Services (EAS)

## 📦 Project Structure

```text
VahaniQ/
├── assets/                 # App icons, splash screens, logos
├── src/
│   ├── components/         # Reusable UI elements (Map components, Buttons, Navbars)
│   ├── constants/          # Shared metrics, colors, static variables
│   ├── context/            # AppContext logic for Language state, User Roles etc
│   ├── screens/
│   │   ├── Auth/           # Login, Role Selection, Language Select, Documents
│   │   ├── Driver/         # Captain-specific screens (Earnings, Service Manager, Drops)
│   │   └── User/           # Passenger-specific screens (Ride Track, Drop Location, Help)
│   └── utils/
│       └── translations.js # The global dictionary for EN & HI strings
├── app.json                # Expo config defining App name and App icons
└── package.json            # Node modules and build scripts
```

## 🏁 How To Run Locally

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repository_url>
   cd VahaniQ
   ```

2. **Install dependencies**:
   Ensure you have NodeJS v18+ installed. 
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npx expo start -c
   ```
   *The `-c` flag ensures the packager cache is cleared, loading the newest assets & logos.*

4. **Testing on your device**:
   - For **Android**: Scan the QR code with the Expo Go app.
   - For **iOS**: Open the camera app and scan the QR code to open in Expo Go.

## 🏗️ Building for Production (Android APK)

To construct a standalone, installable `.apk` file for testing:

1. Connect to EAS:
   ```bash
   npm install -g eas-cli
   eas login
   ```
2. Kick off the build:
   ```bash
   eas build -p android --profile preview
   ```

---
*Created thoughtfully to maintain the Rapido-like ride-booking experience tailored specifically for the VahaniQ ecosystem.*
