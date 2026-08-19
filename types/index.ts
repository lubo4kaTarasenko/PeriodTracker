/**
 * Core type definitions for Period Tracker application
 */

/** Represents a single period cycle with start and end dates */
export interface Period {
  id: string;
  startDate: string; // ISO format: YYYY-MM-DD
  endDate: string;   // ISO format: YYYY-MM-DD
}

/** Represents a consecutive range of dates for display */
export interface DateRange {
  start: string;     // ISO format: YYYY-MM-DD
  end: string;       // ISO format: YYYY-MM-DD
}

/** Represents a single day in the calendar grid */
export interface CalendarDay {
  date: Date;
  key: string;       // ISO format: YYYY-MM-DD
  inMonth: boolean;  // Whether the day belongs to the current month
}

/** Calendar state for rendering */
export interface CalendarState {
  visibleMonth: Date;
  periodDays: string[]; // Array of ISO date strings (YYYY-MM-DD)
  loading: boolean;
  syncing: boolean;
}
