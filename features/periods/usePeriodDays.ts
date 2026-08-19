import { useCallback, useState } from "react";
import { storageService } from "../../services/storageService";
import { getTodayKey } from "../../utils/dateUtils";

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

  const toggleDay = useCallback(
    async (dayKey: string): Promise<boolean> => {
      const todayKey = getTodayKey();

      // Only allow toggling past or today's dates
      if (dayKey > todayKey) {
        console.warn("Cannot toggle future dates");
        return false;
      }

      const nextSet = new Set(periodDays);
      if (nextSet.has(dayKey)) {
        nextSet.delete(dayKey);
      } else {
        nextSet.add(dayKey);
      }

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
    toggleDay,
    clearPeriodDays
  };
}
