import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { DateRange } from "../types";

interface SelectedRangesProps {
  ranges: DateRange[];
}

/**
 * Panel component displaying selected period date ranges
 */
export const SelectedRanges: React.FC<SelectedRangesProps> = ({ ranges }) => {
  return (
    <View style={styles.panel}>
      <Text style={styles.panelTitle}>Selected ranges</Text>
      {ranges.length === 0 ? (
        <Text style={styles.emptyText}>
          Tap dates to mark period days. Future dates are locked.
        </Text>
      ) : (
        ranges.map((range) => (
          <Text key={`${range.start}-${range.end}`} style={styles.rangeText}>
            {range.start === range.end ? range.start : `${range.start} to ${range.end}`}
          </Text>
        ))
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
