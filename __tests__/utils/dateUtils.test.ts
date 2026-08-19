import {
  addDays,
  buildMonthDays,
  fromDateKey,
  getTodayKey,
  groupConsecutiveDates,
  toDateKey
} from "../../utils/dateUtils";

describe("dateUtils", () => {
  describe("toDateKey", () => {
    it("converts a Date object to ISO format string", () => {
      const date = new Date(2026, 7, 18); // August 18, 2026
      const result = toDateKey(date);
      expect(result).toBe("2026-08-18");
    });

    it("pads single digit months and days", () => {
      const date = new Date(2026, 0, 5); // January 5, 2026
      const result = toDateKey(date);
      expect(result).toBe("2026-01-05");
    });
  });

  describe("fromDateKey", () => {
    it("converts an ISO format string to a Date object", () => {
      const result = fromDateKey("2026-08-18");
      expect(result.getFullYear()).toBe(2026);
      expect(result.getMonth()).toBe(7); // August is month 7
      expect(result.getDate()).toBe(18);
    });

    it("handles single digit months and days", () => {
      const result = fromDateKey("2026-01-05");
      expect(result.getFullYear()).toBe(2026);
      expect(result.getMonth()).toBe(0); // January is month 0
      expect(result.getDate()).toBe(5);
    });
  });

  describe("addDays", () => {
    it("adds positive days to a date", () => {
      const date = new Date(2026, 7, 18); // August 18
      const result = addDays(date, 5);
      expect(result.getDate()).toBe(23);
      expect(result.getMonth()).toBe(7); // Still August
    });

    it("handles month boundaries", () => {
      const date = new Date(2026, 7, 28); // August 28
      const result = addDays(date, 5);
      expect(result.getDate()).toBe(2);
      expect(result.getMonth()).toBe(8); // September
    });

    it("adds negative days to a date", () => {
      const date = new Date(2026, 7, 18); // August 18
      const result = addDays(date, -5);
      expect(result.getDate()).toBe(13);
      expect(result.getMonth()).toBe(7); // Still August
    });
  });

  describe("groupConsecutiveDates", () => {
    it("groups consecutive dates into ranges", () => {
      const dates = ["2026-08-01", "2026-08-02", "2026-08-03"];
      const result = groupConsecutiveDates(dates);
      expect(result).toEqual([{ start: "2026-08-01", end: "2026-08-03" }]);
    });

    it("separates non-consecutive dates", () => {
      const dates = ["2026-08-01", "2026-08-02", "2026-08-10"];
      const result = groupConsecutiveDates(dates);
      expect(result).toEqual([
        { start: "2026-08-01", end: "2026-08-02" },
        { start: "2026-08-10", end: "2026-08-10" }
      ]);
    });

    it("handles single dates", () => {
      const dates = ["2026-08-15"];
      const result = groupConsecutiveDates(dates);
      expect(result).toEqual([{ start: "2026-08-15", end: "2026-08-15" }]);
    });

    it("handles empty dates", () => {
      const dates: string[] = [];
      const result = groupConsecutiveDates(dates);
      expect(result).toEqual([]);
    });

    it("handles unsorted dates", () => {
      const dates = ["2026-08-10", "2026-08-01", "2026-08-05", "2026-08-02"];
      const result = groupConsecutiveDates(dates);
      expect(result).toEqual([
        { start: "2026-08-01", end: "2026-08-02" },
        { start: "2026-08-05", end: "2026-08-05" },
        { start: "2026-08-10", end: "2026-08-10" }
      ]);
    });
  });

  describe("getTodayKey", () => {
    it("returns today's date as an ISO format string", () => {
      const result = getTodayKey();
      const today = new Date();
      const expected = toDateKey(today);
      expect(result).toBe(expected);
    });
  });

  describe("buildMonthDays", () => {
    it("returns 42 days for a month grid", () => {
      const date = new Date(2026, 7, 15); // August 2026
      const result = buildMonthDays(date);
      expect(result).toHaveLength(42);
    });

    it("marks in-month days correctly", () => {
      const date = new Date(2026, 7, 15); // August 2026
      const result = buildMonthDays(date);
      const augustDays = result.filter((day) => day.inMonth);
      expect(augustDays.length).toBe(31); // August has 31 days
    });

    it("includes days from adjacent months", () => {
      const date = new Date(2026, 7, 15); // August 2026
      const result = buildMonthDays(date);
      const outsideDays = result.filter((day) => !day.inMonth);
      expect(outsideDays.length).toBeGreaterThan(0);
    });
  });
});
