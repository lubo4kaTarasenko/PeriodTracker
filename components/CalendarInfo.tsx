import React from "react";
import { StyleSheet, Text } from "react-native";

/**
 * Information text component about Google Calendar integration
 */
export const CalendarInfo: React.FC = () => {
  return (
    <Text style={styles.note}>
      Google Calendar works through the calendar account on your phone. Choose or set your Google
      calendar as the writable calendar on iOS or Android, and these events will sync there.
    </Text>
  );
};

const styles = StyleSheet.create({
  note: {
    color: "#735667",
    fontSize: 13,
    lineHeight: 19,
    marginTop: 16
  }
});
