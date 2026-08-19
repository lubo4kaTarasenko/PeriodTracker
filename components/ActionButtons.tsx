import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ActionButtonsProps {
  onBackup: () => void;
  onRestore: () => void;
  onClear: () => void;
}

/** Actions for backing up, restoring, and clearing period data. */
export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onBackup,
  onRestore,
  onClear
}) => {
  return (
    <View>
      <View style={styles.backupRow}>
        <Pressable style={[styles.primaryButton, styles.rowButton]} onPress={onBackup}>
          <Text style={styles.primaryButtonText}>Back up</Text>
        </Pressable>
        <Pressable style={[styles.secondaryButton, styles.rowButton]} onPress={onRestore}>
          <Text style={styles.secondaryButtonText}>Restore</Text>
        </Pressable>
      </View>
      <Pressable style={styles.secondaryButton} onPress={onClear}>
        <Text style={styles.secondaryButtonText}>Clear saved periods</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  backupRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 18
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: "#9e2455",
    borderRadius: 8,
    paddingVertical: 13
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "800"
  },
  rowButton: {
    flex: 1,
    marginTop: 0
  },
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
