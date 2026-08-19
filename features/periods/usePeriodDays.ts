import { useCallback, useState } from "react";
import { storageService } from "../../services/storageService";
import { getDateKeysInRange, getTodayKey } from "../../utils/dateUtils";

/**
 * Hook for managing period day state and operations
 */
export function usePeriodDays() {
  const [periodDays, setPeriodDays] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPeriodDays = useCallback(async () => {
    try {
      const days = await storageService.loadPeriodDays();
      setPeriodDays(days);
    } catch (error) {
      console.error("Failed to load period days:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const savePeriodDays = useCallback(
    async (days: string[]) => {
      setPeriodDays(days);
      await storageService.savePeriodDays(days);
    },
    []
  );

  const addDateRange = useCallback(
    async (startKey: string, endKey: string): Promise<boolean> => {
      const todayKey = getTodayKey();

      if (startKey > todayKey || endKey > todayKey) {
        console.warn("Cannot add future dates");
        return false;
      }

      const nextSet = new Set(periodDays);
      getDateKeysInRange(startKey, endKey).forEach((key) => nextSet.add(key));

      await savePeriodDays([...nextSet].sort());
      return true;
    },
    [periodDays, savePeriodDays]
  );

  const clearPeriodDays = useCallback(async () => {
    await savePeriodDays([]);
  }, [savePeriodDays]);

  return {
    periodDays,
    loading,
    loadPeriodDays,
    savePeriodDays,
    addDateRange,
    clearPeriodDays
  };
}
