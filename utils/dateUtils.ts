import { CalendarDay, DateRange } from "../types";

/**
 * Convert a Date object to ISO format string (YYYY-MM-DD)
 */
export function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Convert an ISO format string (YYYY-MM-DD) to a Date object
 * Time is set to noon UTC to avoid timezone issues
 */
export function fromDateKey(key: string): Date {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day, 12);
}

/**
 * Add days to a date
 */
export function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

/**
 * Get a localized month label (e.g., "August 2026")
 */
export function monthLabel(date: Date): string {
  return date.toLocaleDateString(undefined, { month: "long", year: "numeric" });
}

/**
 * Build an array of 42 calendar days (6 weeks) for a given month
 * Includes days from adjacent months to fill the grid
 */
export function buildMonthDays(monthDate: Date): CalendarDay[] {
  const first = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
  const firstWeekday = (first.getDay() + 6) % 7; // Adjust for Monday start
  const gridStart = addDays(first, -firstWeekday);

  return Array.from({ length: 42 }, (_, index) => {
    const date = addDays(gridStart, index);
    return {
      date,
      key: toDateKey(date),
      inMonth: date.getMonth() === monthDate.getMonth()
    };
  });
}

/**
 * Group consecutive date keys into ranges
 * For example: ["2026-08-01", "2026-08-02", "2026-08-03", "2026-08-10"]
 * becomes: [{start: "2026-08-01", end: "2026-08-03"}, {start: "2026-08-10", end: "2026-08-10"}]
 */
export function groupConsecutiveDates(keys: string[]): DateRange[] {
  const sorted = [...keys].sort();
  const ranges: DateRange[] = [];

  sorted.forEach((key) => {
    const lastRange = ranges[ranges.length - 1];

    if (!lastRange) {
      ranges.push({ start: key, end: key });
      return;
    }

    const expectedNext = toDateKey(addDays(fromDateKey(lastRange.end), 1));
    if (key === expectedNext) {
      lastRange.end = key;
    } else {
      ranges.push({ start: key, end: key });
    }
  });

  return ranges;
}

/**
 * Get today's date as an ISO format string
 */
export function getTodayKey(): string {
  return toDateKey(new Date());
}
