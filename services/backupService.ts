import * as DocumentPicker from "expo-document-picker";
import { File, Paths } from "expo-file-system";
import * as Sharing from "expo-sharing";
import { toDateKey } from "../utils/dateUtils";
import { createBackupJson, parseBackupJson } from "./backupFormat";

export const backupService = {
  async shareBackup(periodDays: string[]): Promise<void> {
    if (!(await Sharing.isAvailableAsync())) {
      throw new Error("File sharing is not available on this device.");
    }

    const date = toDateKey(new Date());
    const file = new File(Paths.cache, `period-tracker-backup-${date}.json`);
    file.create({ overwrite: true });
    file.write(createBackupJson(periodDays));

    await Sharing.shareAsync(file.uri, {
      dialogTitle: "Save period backup",
      mimeType: "application/json"
    });
  },

  async pickBackup(): Promise<string[] | null> {
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      multiple: false,
      type: "application/json"
    });

    if (result.canceled) {
      return null;
    }

    const file = new File(result.assets[0].uri);
    return parseBackupJson(await file.text());
  }
};
