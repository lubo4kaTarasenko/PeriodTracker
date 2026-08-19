import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CalendarDay } from "../types";
import { getTodayKey } from "../utils/dateUtils";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface CalendarGridProps {
  days: CalendarDay[];
  selectedDays: Set<string>;
  onDayPress: (day: CalendarDay) => void;
}

/**
 * Calendar grid component displaying a month's days
 */
export const CalendarGrid: React.FC<CalendarGridProps> = ({ days, selectedDays, onDayPress }) => {
  const todayKey = useMemo(() => getTodayKey(), []);

  return (
    <>
      <View style={styles.weekdays}>
        {WEEKDAYS.map((day) => (
          <Text key={day} style={styles.weekday}>
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.grid}>
        {days.map((day) => {
          const isSelected = selectedDays.has(day.key);
          const isToday = day.key === todayKey;
          const isFuture = day.key > todayKey;

          return (
            <Pressable
              key={day.key}
              onPress={() => onDayPress(day)}
              style={[
                styles.day,
                !day.inMonth && styles.dayOutsideMonth,
                isToday && styles.today,
                isSelected && styles.selectedDay,
                isFuture && styles.futureDay
              ]}
            >
              <Text
                style={[
                  styles.dayText,
                  !day.inMonth && styles.dayTextMuted,
                  isSelected && styles.selectedDayText,
                  isFuture && styles.futureDayText
                ]}
              >
                {day.date.getDate()}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  weekdays: {
    flexDirection: "row",
    marginBottom: 8
  },
  weekday: {
    color: "#8a6573",
    flex: 1,
    fontSize: 12,
    fontWeight: "800",
    textAlign: "center"
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -3
  },
  day: {
    alignItems: "center",
    aspectRatio: 1,
    backgroundColor: "#ffffff",
    borderColor: "#f3d6e0",
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "center",
    margin: 3,
    width: "13.45%"
  },
  dayOutsideMonth: {
    backgroundColor: "#fffafc"
  },
  selectedDay: {
    backgroundColor: "#c43d6d",
    borderColor: "#c43d6d"
  },
  today: {
    borderColor: "#2a1820",
    borderWidth: 2
  },
  futureDay: {
    opacity: 0.45
  },
  dayText: {
    color: "#2a1820",
    fontSize: 16,
    fontWeight: "700"
  },
  dayTextMuted: {
    color: "#b597a3"
  },
  selectedDayText: {
    color: "#ffffff"
  },
  futureDayText: {
    color: "#9f8791"
  }
});
