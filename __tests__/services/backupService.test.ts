import { createBackupJson, parseBackupJson } from "../../services/backupFormat";

describe("backup format", () => {
  it("exports readable consecutive period ranges and restores their days", () => {
    const days = ["2026-07-30", "2026-07-31", "2026-08-01", "2026-08-12"];
    const json = createBackupJson(days, new Date("2026-08-19T10:00:00.000Z"));

    expect(JSON.parse(json)).toEqual({
      format: "period-tracker-backup",
      version: 1,
      exportedAt: "2026-08-19T10:00:00.000Z",
      periods: [
        { startDate: "2026-07-30", endDate: "2026-08-01" },
        { startDate: "2026-08-12", endDate: "2026-08-12" }
      ]
    });
    expect(parseBackupJson(json)).toEqual(days);
  });

  it("restores an empty backup", () => {
    expect(
      parseBackupJson('{"format":"period-tracker-backup","version":1,"periods":[]}')
    ).toEqual([]);
  });

  it("rejects invalid JSON and unsupported files", () => {
    expect(() => parseBackupJson("not json")).toThrow("valid JSON");
    expect(() => parseBackupJson('{"periods":[]}')).toThrow("not supported");
  });

  it("rejects invalid or reversed date ranges", () => {
    expect(() =>
      parseBackupJson(
        '{"format":"period-tracker-backup","version":1,"periods":[{"startDate":"2026-02-30","endDate":"2026-03-01"}]}'
      )
    ).toThrow("invalid period date range");

    expect(() =>
      parseBackupJson(
        '{"format":"period-tracker-backup","version":1,"periods":[{"startDate":"2026-08-10","endDate":"2026-08-01"}]}'
      )
    ).toThrow("invalid period date range");
  });
});
