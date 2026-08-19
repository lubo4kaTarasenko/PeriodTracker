import { DateRange } from "../types";
import { getDateKeysInRange, groupConsecutiveDates, toDateKey } from "../utils/dateUtils";

const BACKUP_FORMAT = "period-tracker-backup";
const BACKUP_VERSION = 1;
const DATE_KEY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

interface BackupPeriod {
  startDate: string;
  endDate: string;
}

interface PeriodBackup {
  format: typeof BACKUP_FORMAT;
  version: typeof BACKUP_VERSION;
  exportedAt: string;
  periods: BackupPeriod[];
}

function isValidDateKey(value: unknown): value is string {
  if (typeof value !== "string" || !DATE_KEY_PATTERN.test(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);
  return toDateKey(new Date(year, month - 1, day, 12)) === value;
}

export function createBackupJson(periodDays: string[], exportedAt = new Date()): string {
  const periods = groupConsecutiveDates(periodDays).map((range: DateRange) => ({
    startDate: range.start,
    endDate: range.end
  }));
  const backup: PeriodBackup = {
    format: BACKUP_FORMAT,
    version: BACKUP_VERSION,
    exportedAt: exportedAt.toISOString(),
    periods
  };

  return `${JSON.stringify(backup, null, 2)}\n`;
}

export function parseBackupJson(contents: string): string[] {
  let value: unknown;

  try {
    value = JSON.parse(contents);
  } catch {
    throw new Error("This is not a valid JSON backup file.");
  }

  if (!value || typeof value !== "object") {
    throw new Error("This file is not a Period Tracker backup.");
  }

  const backup = value as Partial<PeriodBackup>;
  if (
    backup.format !== BACKUP_FORMAT ||
    backup.version !== BACKUP_VERSION ||
    !Array.isArray(backup.periods)
  ) {
    throw new Error("This backup format is not supported.");
  }

  const days = new Set<string>();
  backup.periods.forEach((period) => {
    if (
      !period ||
      typeof period !== "object" ||
      !isValidDateKey(period.startDate) ||
      !isValidDateKey(period.endDate) ||
      period.startDate > period.endDate
    ) {
      throw new Error("The backup contains an invalid period date range.");
    }

    getDateKeysInRange(period.startDate, period.endDate).forEach((day) => days.add(day));
  });

  return [...days].sort();
}
