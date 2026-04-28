# The PAM Field Guide

**By The PAM Insider**

Privileged access, explained without vendor fog.

A free, private, vendor-neutral mobile field guide for understanding Privileged Access Management (PAM) concepts, risks, controls, and real-world scenarios.

## App Features

- **200 PAM Definitions** - Comprehensive glossary of PAM terms organized by category and depth (Core, Supporting, Quick)
- **30 Real-World Scenarios** - "What Went Wrong?" case studies with interactive quiz flow and lessons learned
- **5 Role Perspectives** - Learn PAM from the viewpoint of IT Admins, CISOs, Auditors, Helpdesk, and Business Leaders
- **Daily Rotating Content** - Each day features a unique term, scenario, myth buster, and role lens based on date-based logic (no server needed)
- **Myth Busters** - 12+ common PAM misconceptions debunked
- **Compliance Mapper Lite** - 8 lightweight compliance themes showing how PAM helps support requirements
- **Private by Design** - No accounts, no tracking, no analytics, no data collection. All content is bundled locally

## Tech Stack

- React Native + Expo
- Android first (iOS and web support ready)
- Offline-first architecture
- AsyncStorage for local-only data (favorites, completed scenarios, onboarding state)
- No backend, no login, no analytics SDKs

## Brand Colors

- **Background Black:** #050607
- **Deep Charcoal:** #111318
- **Card Charcoal:** #181B22
- **Border Gray:** #2A2F3A
- **Primary Neon Green:** #9DFF00
- **Secondary Purple:** #8B5CF6
- **Electric Blue Accent:** #38BDF8
- **Risk Orange:** #F97316
- **Critical Red:** #EF4444
- **Text White:** #F8FAFC
- **Muted Text Gray:** #CBD5E1
- **Dim Text Gray:** #64748B

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Expo CLI (optional, but recommended)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ScoutFamilyProducts/thepaminsider-app.git
cd thepaminsider-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

### Running on Different Platforms

- **Android:** `npm run android`
- **iOS:** `npm run ios`
- **Web:** `npm run web`

## Project Structure

```
src/
├── screens/              # All app screens
│   ├── HomeScreen.js
│   ├── LearnScreen.js
│   ├── ScenariosScreen.js
│   ├── RolesScreen.js
│   ├── SettingsScreen.js
│   ├── OnboardingScreen.js
│   ├── TermDetailScreen.js
│   ├── ScenarioDetailScreen.js
│   └── RoleDetailScreen.js
├── components/          # Reusable UI components
│   └── UIComponents.js
├── navigation/          # Navigation setup
│   └── BottomTabNavigator.js
├── data/               # Static content (JSON files)
│   ├── terms.json
│   ├── scenarios.json
│   └── staticContent.js
├── theme/              # Design tokens and colors
│   └── colors.js
└── utils/              # Utility functions
    └── storage.js
```

## Key Features Explained

### Home Screen - "Today in PAM"
Daily rotating content features one of each:
1. **Term of the Day** - A randomly selected PAM term with full definition
2. **What Went Wrong?** - A scenario demonstrating a real-world PAM failure
3. **Myth Buster** - A common misconception about PAM debunked
4. **Role Lens** - A perspective from one of the five key roles

### Learn Screen
- Searchable glossary of 200+ PAM terms
- Filter by category (Core, Supporting, Quick)
- Filter by depth level
- Favorite terms for quick reference
- Related terms for deeper learning

### What Went Wrong? Screen
- 30 interactive case studies
- Scenario → Quiz → Lesson flow
- Multiple choice questions with explanations
- Track completion progress
- Related PAM controls and terms

### Roles Screen
- Five distinct role perspectives:
  - IT Admin
  - Security Leader / CISO
  - Auditor / Compliance
  - Helpdesk / Support
  - Business Leader
- Each role includes concerns, key questions, relevant terms, and scenarios

### Settings Screen
- **About** - App information and version
- **Privacy by Design** - Privacy commitments
- **Myth Busters** - All 12+ myth busters expandable
- **Compliance Mapper Lite** - 8 compliance themes
- **Feedback** - Email link to thepaminsider@gmail.com
- **Support the Project** - Optional donation information

## Local Data Storage

Using AsyncStorage, the app stores:
- `@pam_favorite_terms` - Array of favorited term IDs
- `@pam_completed_scenarios` - Array of completed scenario IDs
- `@pam_onboarding_dismissed` - Boolean for onboarding state
- `@pam_last_opened` - Timestamp of last app open (for future features)

All data remains on the device. No synchronization with servers.

## Daily Rotation Logic

Content rotates based on days since epoch (January 1, 2024):
- Same result for all users on the same calendar day
- No server required
- Deterministic algorithm using modulo arithmetic
- All content is bundled locally

## Email Configuration

All email links use: **thepaminsider@gmail.com**

- Feedback button opens mailto with pre-filled subject/body
- Support button enables optional donations via email
- Secure, user-initiated communication only

## Onboarding

Three-screen onboarding:
1. App introduction and tagline
2. Feature overview (terms, scenarios, roles)
3. Privacy-first design commitment

Users can skip onboarding or must tap "Start Learning" to proceed. Onboarding dismissed state is stored locally.

## Future Enhancements

- Offline sync when connectivity returns
- Custom role profiles
- Expanded scenario sets (50+, 100+ terms)
- Scenario categories by industry
- User-submitted scenarios (moderated)
- Export/share favorites
- Dark/light theme toggle (currently dark-only)
- Localization to additional languages

## Contributing

This is a free educational project. Contributions welcome:
- Content suggestions (new terms, scenarios)
- Bug reports and fixes
- Translations
- UI/UX improvements

Email: thepaminsider@gmail.com

## License

To be determined. Contact The PAM Insider for license details.

## Important Notes

- This is **NOT** a Delinea, CyberArk, or BeyondTrust app
- Vendor-neutral perspective
- Educational purpose only
- No compliance advice provided
- No warranty or guarantees

---

**The PAM Field Guide** — Privileged access, explained clearly, practically, and without vendor fog.