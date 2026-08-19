import React from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet, Text } from "react-native";

/**
 * Loading screen component shown while initializing the app
 */
export const LoadingScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.centered}>
      <ActivityIndicator color="#c43d6d" />
      <Text style={styles.loadingText}>Loading your calendar...</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centered: {
    alignItems: "center",
    backgroundColor: "#fff7fa",
    flex: 1,
    justifyContent: "center"
  },
  loadingText: {
    color: "#7b4c5d",
    marginTop: 12
  }
});
