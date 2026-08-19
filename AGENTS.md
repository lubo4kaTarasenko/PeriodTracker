# AGENTS.md

## Project

This is a personal period-tracking mobile application.

The application must be a real Android mobile application built with React Native, not a React web application.

Use:

- React Native
- Expo
- TypeScript
- Expo Router where appropriate
- Local-first storage for private user data

Target Android only for the MVP.

Do not spend time on iOS compatibility, iOS-specific UI, or App Store requirements unless explicitly requested later.

## Product Goal

The app lets a user track menstrual periods using a simple calendar.

The primary workflow is:

1. Open the application.
2. See a monthly calendar.
3. Tap a date or select a range of dates.
4. Mark those dates as period days.
5. Edit or remove previously recorded period days.
6. See previous periods visually on the calendar.

Keep the application simple and focused.

Do not add unnecessary health, social, community, AI, fertility, pregnancy, or subscription features unless explicitly requested.

## MVP Features

### Calendar

- Monthly calendar view.
- Navigate between months.
- Clearly highlight recorded period days.
- Allow selecting one day or a range of days.
- Allow adding and removing period days.
- Existing recorded periods must persist after restarting the app.

### Period History

Store recorded periods as cycles with:

- start date
- end date

Example:

```ts
type Period = {
  id: string;
  startDate: string;
  endDate: string;
};
```

Use ISO date strings (`YYYY-MM-DD`) for persisted dates.

Prefer storing a period as a date range instead of storing every day as an unrelated record.

### Local Storage

The app should work without an account.

Period information is sensitive personal data.

For the MVP:

- keep data locally on the Android device
- do not send period information to any server
- do not add analytics that contain period dates
- do not add third-party tracking without explicit instruction

Keep the storage layer abstract enough that cloud sync can be added later.

## Google Calendar

Google Calendar integration is a desired feature but is not required for the first MVP.

Design the application so it can be added later.

Eventually the user should be able to:

- connect their Google account
- optionally create calendar events for period days
- update events when period dates change
- remove corresponding events if period dates are removed

Google Calendar synchronization must be opt-in.

Never expose period information to Google Calendar automatically.

Do not implement Google Calendar integration until the basic local calendar works correctly unless explicitly asked.

## Architecture

Prefer a simple structure such as:

```text
app/
components/
features/
  periods/
services/
storage/
types/
utils/
```

Separate:

- UI components
- period/cycle business logic
- persistence
- external integrations

Do not put persistence or Google API logic directly inside UI components.

## State

Keep state management simple.

Prefer React hooks/context or another lightweight solution.

Do not introduce Redux or another large state-management framework unless the project complexity actually requires it.

## UI

The UI should be:

- Android-first
- mobile-first
- minimal
- clean
- easy to use with one hand
- visually calm
- usable in light and dark mode

Prioritize usability over decorative UI.

The calendar is the main screen of the application.

Use Android-appropriate interaction patterns where practical.

## Code Quality

Use TypeScript.

Avoid `any` unless there is a strong reason.

Prefer:

- small components
- clear names
- explicit types
- reusable business logic
- simple solutions

Avoid premature abstractions.

Do not create unnecessary wrapper layers or generic frameworks.

## Testing

Important business logic should be testable independently of React Native UI.

Tests should especially cover:

- adding period dates
- editing periods
- deleting periods
- date ranges
- periods spanning different months
- storage serialization/deserialization

## Working Rules for the Assistant

Before implementing a substantial change:

1. Inspect the existing project.
2. Understand the current architecture.
3. Check whether the project is actually React Native/Expo or React web.
4. Reuse existing code where sensible.
5. Briefly explain the proposed change.
6. Implement it.
7. Run available tests, linting, and TypeScript checks.

Do not rewrite working parts of the application unnecessarily.

Do not install large dependencies when the same result can reasonably be achieved with existing dependencies.

If an architectural decision could significantly affect the project, explain the tradeoff before making the change.

If the current project is a React web application, do not keep extending the web version. Recreate or migrate it into a proper Expo React Native Android application.

## Current Priority

1. Verify this is an Expo React Native TypeScript project.
2. If it is currently a React web application, recreate it as an Expo React Native Android application.
3. Create the Android app structure.
4. Implement the monthly period calendar.
5. Implement adding, editing, and removing period ranges.
6. Persist data locally.
7. Improve the Android UI.
8. Add Google Calendar integration later.

## Initial Assessment Task

Before making further changes, inspect the current project and determine:

1. what framework and tooling it currently uses
2. what has already been implemented
3. whether it is React Native/Expo or React web
4. whether the current structure is appropriate for this Android application
5. what should be changed before continuing

Do not modify files until this inspection is complete and the findings have been summarized.
