import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface HeaderProps {
  periodDayCount: number;
}

/**
 * Header component showing the app title and period day count
 */
export const Header: React.FC<HeaderProps> = ({ periodDayCount }) => {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.eyebrow}>Period Tracker</Text>
        <Text style={styles.title}>Track past period days</Text>
      </View>
      <View style={styles.countBadge}>
        <Text style={styles.count}>{periodDayCount}</Text>
        <Text style={styles.countLabel}>days</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24
  },
  eyebrow: {
    color: "#9f315b",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.4,
    textTransform: "uppercase"
  },
  title: {
    color: "#2a1820",
    fontSize: 28,
    fontWeight: "800",
    marginTop: 4
  },
  countBadge: {
    alignItems: "center",
    backgroundColor: "#f7d6e2",
    borderRadius: 8,
    minWidth: 64,
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  count: {
    color: "#8c1748",
    fontSize: 22,
    fontWeight: "800"
  },
  countLabel: {
    color: "#8c1748",
    fontSize: 12,
    fontWeight: "700"
  }
});
