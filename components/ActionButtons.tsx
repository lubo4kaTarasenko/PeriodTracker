import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ActionButtonsProps {
  onClear: () => void;
}

/**
 * Action buttons component with "Add to calendar" and "Clear" buttons
 */
export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onClear
}) => {
  return (
    <View>
      <Pressable style={styles.secondaryButton} onPress={onClear}>
        <Text style={styles.secondaryButtonText}>Clear saved periods</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  secondaryButton: {
    alignItems: "center",
    borderColor: "#dba9bc",
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 18,
    paddingVertical: 13
  },
  secondaryButtonText: {
    color: "#8c1748",
    fontSize: 15,
    fontWeight: "800"
  }
});
