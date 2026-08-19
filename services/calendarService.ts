import * as Calendar from "expo-calendar";
import { DateRange } from "../types";
import { addDays, fromDateKey } from "../utils/dateUtils";

/**
 * Calendar type definitions (from expo-calendar)
 */
type CalendarType = any;
type CalendarEventDetailsType = any;

/**
 * Find the best writable calendar on the device
 * Prefers: primary writable > synced writable > any writable > first available
 */
export function getWritableCalendar(calendars: CalendarType[]): CalendarType | undefined {
  return (
    calendars.find((calendar: any) => calendar.allowsModifications && calendar.isPrimary) ||
    calendars.find((calendar: any) => calendar.allowsModifications && calendar.isSynced) ||
    calendars.find((calendar: any) => calendar.allowsModifications) ||
    calendars[0]
  );
}

/**
 * Service for managing calendar integration
 */
export const calendarService = {
  /**
   * Add period date ranges to the device/Google calendar
   */
  async addRangesToDeviceCalendar(ranges: DateRange[]): Promise<{
    success: boolean;
    message: string;
    calendarTitle?: string;
    rangeCount?: number;
  }> {
    try {
      if (ranges.length === 0) {
        return {
          success: false,
          message: "No period days selected. Tap past dates in the calendar before adding them."
        };
      }

      const permission = await Calendar.requestCalendarPermissions(false);
      if (permission.status !== "granted") {
        return {
          success: false,
          message: "Calendar permission needed. Enable calendar access to add these days."
        };
      }

      const calendars = await Calendar.getCalendars(Calendar.EntityTypes.EVENT);
      const targetCalendar = getWritableCalendar(calendars);

      if (!targetCalendar) {
        return {
          success: false,
          message: "No writable calendar found. Add a calendar account on this device, then try again."
        };
      }

      for (const range of ranges) {
        const startDate = fromDateKey(range.start);
        const endDate = addDays(fromDateKey(range.end), 1);

        const eventDetails: CalendarEventDetailsType = {
          title: "Period",
          startDate,
          endDate,
          allDay: true,
          notes: "Logged from Period Tracker"
        };

        await targetCalendar.createEvent(eventDetails);
      }

      return {
        success: true,
        message: `Created ${ranges.length} period event${ranges.length === 1 ? "" : "s"} in ${targetCalendar.title}.`,
        calendarTitle: targetCalendar.title,
        rangeCount: ranges.length
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        message: `Calendar sync failed: ${errorMessage}`
      };
    }
  }
};
