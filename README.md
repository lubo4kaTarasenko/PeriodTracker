# Period Tracker

A React Native Android app for tracking menstrual periods using a simple calendar interface. Period data is stored locally on the device for privacy.

## Features

- Monthly calendar view with navigation
- Easy selection of period dates (individual days or ranges)
- Visual highlighting of recorded period days
- Local-first data storage (no server sync)
- Readable JSON backup and restore through Android's file picker
- Android-first UI design

## Project Structure

```
period-tracker/
├── components/          # Reusable UI components
├── features/            # Feature-specific hooks and logic
│   └── periods/        # Period tracking hooks
├── services/            # Business logic services
│   ├── storageService.ts    # Local storage management
│   ├── backupFormat.ts      # Backup serialization and validation
│   └── backupService.ts     # Android file sharing and selection
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
- **Expo FileSystem, Sharing, and Document Picker** - Backup export and restore

## Backing Up and Moving to a New Phone

Period data is stored locally by default. To keep a copy or move it to another phone:

1. Tap **Back up** in the app.
2. Choose Google Drive or another private location from Android's share sheet.
3. On the new phone, install and open the app.
4. Tap **Restore** and choose the saved JSON file.
5. Confirm that the locally saved periods should be replaced.

The backup is deliberately readable JSON and is not encrypted. Anyone with access to the file can read the period dates, so save it somewhere private. The app does not connect directly to Google Drive and does not require a backend or account.

## Privacy

- Period data is stored locally on the Android device only
- No data is sent anywhere unless you explicitly share a backup file
- No analytics or tracking of period dates
- Backup and restore are always initiated by the user

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
