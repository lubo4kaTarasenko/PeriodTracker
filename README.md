# Period Tracker

A React Native Android app for tracking menstrual periods using a simple calendar interface. Period data is stored locally on the device for privacy.

## Features

- Monthly calendar view with navigation
- Easy selection of period dates (individual days or ranges)
- Visual highlighting of recorded period days
- Local-first data storage (no server sync)
- Optional integration with device/Google Calendar
- Android-first UI design

## Project Structure

```
period-tracker/
├── components/          # Reusable UI components
├── features/            # Feature-specific hooks and logic
│   └── periods/        # Period tracking hooks
├── services/            # Business logic services
│   ├── storageService.ts    # Local storage management
│   └── calendarService.ts   # Calendar integration
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
│   └── dateUtils.ts    # Date manipulation helpers
├── __tests__/          # Test suites
├── App.tsx             # Main application component
└── app.json            # Expo configuration
```

## Setup

### Prerequisites

- Node.js 18+ and npm
- Expo CLI: `npm install -g expo-cli`
- Android SDK (for running on Android devices/emulators)

### Install Dependencies

```sh
npm install
```

### Run the App

**Development mode:**
```sh
npm start
```

**Build and run on Android:**
```sh
npm run android
```

**Type checking:**
```sh
npm run type-check
```

**Running tests:**
```sh
npm test
```

## Technology Stack

- **React Native** - Native mobile framework
- **Expo** - Development and build platform
- **TypeScript** - Type-safe JavaScript
- **AsyncStorage** - Local data persistence
- **Expo Calendar** - Device calendar integration

## Google Calendar Integration

The app can sync period events to Google Calendar through the device's calendar system:

1. Connect your Google account in your phone's calendar settings
2. Set your Google calendar as the writable calendar
3. In the Period Tracker app, tap "Add to phone / Google Calendar"
4. Events will automatically sync to your Google Calendar

**Note**: This is completely optional. All period data stays on your device by default.

## Privacy

- Period data is stored locally on the Android device only
- No data is sent to any server unless you explicitly sync to Google Calendar
- No analytics or tracking of period dates
- Sync to Google Calendar is opt-in

## Development

### Adding New Features

1. Create feature-specific hooks in `features/`
2. Create reusable components in `components/`
3. Add business logic to `services/`
4. Define types in `types/index.ts`
5. Write tests for critical logic

### Testing

Important business logic is tested independently of React Native UI:

- Date utilities: `__tests__/utils/dateUtils.test.ts`
- Storage service: `__tests__/services/storageService.test.ts`

Run tests:
```sh
npm test
```

## MVP Status

This is the minimal viable product for Period Tracker. Future enhancements may include:

- Cloud sync (optional)
- Period cycle statistics
- Notifications
- Enhanced UI/UX
- Data export

## License

Personal project
