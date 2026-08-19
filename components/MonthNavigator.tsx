import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { monthLabel } from "../utils/dateUtils";

interface MonthNavigatorProps {
  visibleMonth: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

/**
 * Month navigator component with previous/next buttons
 */
export const MonthNavigator: React.FC<MonthNavigatorProps> = ({
  visibleMonth,
  onPreviousMonth,
  onNextMonth
}) => {
  return (
    <View style={styles.monthBar}>
      <Pressable style={styles.monthButton} onPress={onPreviousMonth}>
        <Text style={styles.monthButtonText}>‹</Text>
      </Pressable>
      <Text style={styles.monthTitle}>{monthLabel(visibleMonth)}</Text>
      <Pressable style={styles.monthButton} onPress={onNextMonth}>
        <Text style={styles.monthButtonText}>›</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  monthBar: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16
  },
  monthButton: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#f0c8d7",
    borderRadius: 8,
    borderWidth: 1,
    height: 44,
    justifyContent: "center",
    width: 44
  },
  monthButtonText: {
    color: "#8c1748",
    fontSize: 30,
    lineHeight: Platform.OS === "ios" ? 32 : 34
  },
  monthTitle: {
    color: "#2a1820",
    fontSize: 20,
    fontWeight: "800"
  }
});
