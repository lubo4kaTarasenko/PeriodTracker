import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ActionButtonsProps {
  onAddToCalendar: () => void;
  onClear: () => void;
  isLoading?: boolean;
}

/**
 * Action buttons component with "Add to calendar" and "Clear" buttons
 */
export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onAddToCalendar,
  onClear,
  isLoading = false
}) => {
  return (
    <View>
      <Pressable
        style={[styles.primaryButton, isLoading && styles.disabledButton]}
        onPress={onAddToCalendar}
        disabled={isLoading}
      >
        <Text style={styles.primaryButtonText}>
          {isLoading ? "Adding..." : "Add to phone / Google Calendar"}
        </Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={onClear}>
        <Text style={styles.secondaryButtonText}>Clear saved period days</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  primaryButton: {
    alignItems: "center",
    backgroundColor: "#8c1748",
    borderRadius: 8,
    marginTop: 18,
    paddingVertical: 15
  },
  disabledButton: {
    opacity: 0.65
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800"
  },
  secondaryButton: {
    alignItems: "center",
    borderColor: "#dba9bc",
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 10,
    paddingVertical: 13
  },
  secondaryButtonText: {
    color: "#8c1748",
    fontSize: 15,
    fontWeight: "800"
  }
});
