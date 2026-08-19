import { useCallback, useState } from "react";

/**
 * Hook for managing calendar month navigation state
 */
export function useCalendarMonth() {
  const [visibleMonth, setVisibleMonth] = useState(new Date());

  const shiftMonth = useCallback((amount: number) => {
    setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + amount, 1));
  }, []);

  const goToToday = useCallback(() => {
    setVisibleMonth(new Date());
  }, []);

  return {
    visibleMonth,
    shiftMonth,
    goToToday
  };
}
