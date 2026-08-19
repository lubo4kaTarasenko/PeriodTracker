import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { DateRange } from "../types";

interface SelectedRangesProps {
  ranges: DateRange[];
  pendingStart: string | null;
}

/**
 * Panel component displaying selected period date ranges
 */
export const SelectedRanges: React.FC<SelectedRangesProps> = ({ ranges, pendingStart }) => {
  const [showSavedPeriods, setShowSavedPeriods] = useState(false);
  const newestFirstRanges = useMemo(
    () => [...ranges].sort((first, second) => second.start.localeCompare(first.start)),
    [ranges]
  );

  return (
    <View style={styles.panel}>
      {pendingStart ? (
        <Text style={styles.emptyText}>Start selected: {pendingStart}. Tap the end date to save the range.</Text>
      ) : ranges.length === 0 ? (
        <Text style={styles.emptyText}>Tap the first day, then the last day of your period.</Text>
      ) : (
        <>
          <Pressable
            accessibilityRole="button"
            onPress={() => setShowSavedPeriods((visible) => !visible)}
            style={styles.toggleButton}
          >
            <Text style={styles.toggleButtonText}>
              {showSavedPeriods ? "Hide saved periods" : "Show saved periods"}
            </Text>
          </Pressable>
          {showSavedPeriods && (
            <View>
              <Text style={styles.panelTitle}>Saved periods</Text>
              {newestFirstRanges.map((range) => (
                <Text key={`${range.start}-${range.end}`} style={styles.rangeText}>
                  {range.start === range.end ? range.start : `${range.start} to ${range.end}`}
                </Text>
              ))}
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  panel: {
    backgroundColor: "#ffffff",
    borderColor: "#f0c8d7",
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 22,
    padding: 16
  },
  panelTitle: {
    color: "#2a1820",
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 8
  },
  toggleButton: {
    alignItems: "center",
    borderColor: "#dba9bc",
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: 12
  },
  toggleButtonText: {
    color: "#8c1748",
    fontSize: 15,
    fontWeight: "800"
  },
  emptyText: {
    color: "#755869",
    lineHeight: 20
  },
  rangeText: {
    color: "#5b2c40",
    fontSize: 15,
    fontWeight: "700",
    marginTop: 5
  }
});
