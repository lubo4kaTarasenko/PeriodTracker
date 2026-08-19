import { StatusBar } from "expo-status-bar";
import React, { useEffect, useMemo } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import {
  ActionButtons,
  CalendarGrid,
  CalendarInfo,
  Header,
  LoadingScreen,
  MonthNavigator,
  SelectedRanges
} from "./components";
import { useCalendarMonth, usePeriodDays } from "./features/periods";
import { calendarService } from "./services";
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
  const { periodDays, loading, loadPeriodDays, savePeriodDays, toggleDay, clearPeriodDays } =
    usePeriodDays();
  const { visibleMonth, shiftMonth } = useCalendarMonth();
  const [syncing, setSyncing] = React.useState(false);

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
  const handleDayPress = async (day: typeof monthDays[0]) => {
    if (day.key > todayKey) {
      Alert.alert("Past days only", "Use this calendar to record period days that already happened.");
      return;
    }

    const success = await toggleDay(day.key);
    if (!success) {
      Alert.alert("Error", "Could not toggle period day");
    }
  };

  const handleAddToCalendar = async () => {
    setSyncing(true);
    try {
      const result = await calendarService.addRangesToDeviceCalendar(selectedRanges);

      if (result.success) {
        Alert.alert("Added to calendar", result.message);
      } else {
        Alert.alert("Error", result.message);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      Alert.alert("Error", `Failed to add to calendar: ${errorMessage}`);
    } finally {
      setSyncing(false);
    }
  };

  const handleClearAll = async () => {
    Alert.alert("Clear all period days?", "This cannot be undone.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear",
        style: "destructive",
        onPress: async () => {
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
        <Header periodDayCount={periodDays.length} />

        <MonthNavigator
          visibleMonth={visibleMonth}
          onPreviousMonth={() => shiftMonth(-1)}
          onNextMonth={() => shiftMonth(1)}
        />

        <CalendarGrid
          days={monthDays}
          selectedDays={periodSet}
          onDayPress={handleDayPress}
        />

        <SelectedRanges ranges={selectedRanges} />

        <ActionButtons
          onAddToCalendar={handleAddToCalendar}
          onClear={handleClearAll}
          isLoading={syncing}
        />

        <CalendarInfo />
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
