import { storageService } from "../../services/storageService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const mockAsyncStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

describe("storageService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("loadPeriodDays", () => {
    it("returns parsed period days from storage", async () => {
      const mockData = ["2026-08-01", "2026-08-02"];
      mockAsyncStorage.getItem.mockResolvedValue(JSON.stringify(mockData));

      const result = await storageService.loadPeriodDays();

      expect(result).toEqual(mockData);
      expect(mockAsyncStorage.getItem).toHaveBeenCalledWith("period-tracker:period-days");
    });

    it("returns empty array when no data is stored", async () => {
      mockAsyncStorage.getItem.mockResolvedValue(null);

      const result = await storageService.loadPeriodDays();

      expect(result).toEqual([]);
    });

    it("throws error when getItem fails", async () => {
      const error = new Error("Storage error");
      mockAsyncStorage.getItem.mockRejectedValue(error);

      await expect(storageService.loadPeriodDays()).rejects.toThrow("Storage error");
    });
  });

  describe("savePeriodDays", () => {
    it("saves period days to storage", async () => {
      const mockData = ["2026-08-01", "2026-08-02"];
      mockAsyncStorage.setItem.mockResolvedValue(undefined);

      await storageService.savePeriodDays(mockData);

      expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(
        "period-tracker:period-days",
        JSON.stringify(mockData)
      );
    });

    it("throws error when setItem fails", async () => {
      const error = new Error("Storage error");
      mockAsyncStorage.setItem.mockRejectedValue(error);

      await expect(storageService.savePeriodDays([])).rejects.toThrow("Storage error");
    });
  });

  describe("clearPeriodDays", () => {
    it("clears period days from storage", async () => {
      mockAsyncStorage.removeItem.mockResolvedValue(undefined);

      await storageService.clearPeriodDays();

      expect(mockAsyncStorage.removeItem).toHaveBeenCalledWith("period-tracker:period-days");
    });

    it("throws error when removeItem fails", async () => {
      const error = new Error("Storage error");
      mockAsyncStorage.removeItem.mockRejectedValue(error);

      await expect(storageService.clearPeriodDays()).rejects.toThrow("Storage error");
    });
  });
});
