import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "period-tracker:period-days";

/**
 * Service for managing local period data storage
 */
export const storageService = {
  /**
   * Load saved period days from storage
   */
  async loadPeriodDays(): Promise<string[]> {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error loading period days:", error);
      throw error;
    }
  },

  /**
   * Save period days to storage
   */
  async savePeriodDays(days: string[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(days));
    } catch (error) {
      console.error("Error saving period days:", error);
      throw error;
    }
  },

  /**
   * Clear all saved period days
   */
  async clearPeriodDays(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Error clearing period days:", error);
      throw error;
    }
  }
};
