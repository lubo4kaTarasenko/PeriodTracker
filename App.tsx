import { StatusBar } from "expo-status-bar";
import React, { useEffect, useMemo } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import {
  ActionButtons,
  CalendarGrid,
  Header,
  LoadingScreen,
  MonthNavigator,
  SelectedRanges
} from "./components";
import { useCalendarMonth, usePeriodDays } from "./features/periods";
import {
  buildMonthDays,
  getTodayKey,
  groupConsecutiveDates
} from "./utils/dateUtils";

/**
 * Main Period Tracker application component
 */
export default function App() {
  // State management
  const { periodDays, loading, loadPeriodDays, addDateRange, clearPeriodDays } =
    usePeriodDays();
  const { visibleMonth, shiftMonth } = useCalendarMonth();
  const [rangeStart, setRangeStart] = React.useState<string | null>(null);

  // Computed values
  const todayKey = useMemo(() => getTodayKey(), []);
  const monthDays = useMemo(() => buildMonthDays(visibleMonth), [visibleMonth]);
  const periodSet = useMemo(() => new Set(periodDays), [periodDays]);
  const selectedRanges = useMemo(() => groupConsecutiveDates(periodDays), [periodDays]);

  // Initialize: load saved period days on mount
  useEffect(() => {
    loadPeriodDays();
  }, [loadPeriodDays]);

  // Handlers
  const handleDayPress = async (day: (typeof monthDays)[number]) => {
    if (day.key > todayKey) {
      Alert.alert("Past days only", "Choose dates that already happened.");
      return;
    }

    if (!rangeStart) {
      setRangeStart(day.key);
      return;
    }

    const success = await addDateRange(rangeStart, day.key);
    setRangeStart(null);
    if (!success) {
      Alert.alert("Error", "Could not save this period range");
    }
  };

  const handleClearAll = async () => {
    Alert.alert("Clear all period days?", "This cannot be undone.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear",
        style: "destructive",
        onPress: async () => {
          setRangeStart(null);
          await clearPeriodDays();
        }
      }
    ]);
  };

  // Render loading state
  if (loading) {
    return <LoadingScreen />;
  }

  // Render main app
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content}>
        <Header periodCount={selectedRanges.length} />

        <MonthNavigator
          visibleMonth={visibleMonth}
          onPreviousMonth={() => shiftMonth(-1)}
          onNextMonth={() => shiftMonth(1)}
        />

        <CalendarGrid
          days={monthDays}
          selectedDays={periodSet}
          rangeStart={rangeStart}
          onDayPress={handleDayPress}
        />

        <SelectedRanges ranges={selectedRanges} pendingStart={rangeStart} />

        <ActionButtons
          onClear={handleClearAll}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff7fa"
  },
  content: {
    padding: 20,
    paddingBottom: 36
  }
});
