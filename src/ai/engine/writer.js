import fs from "fs";
import path from "path";

export async function writeChanges(result) {
  for (const change of result.changes) {
    const backupDir = "./ai/backups";
    if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir);

    if (fs.existsSync(change.file)) {
      const backupPath = `${backupDir}/${path.basename(
        change.file
      )}.${Date.now()}.bak`;
      fs.copyFileSync(change.file, backupPath);
    }

    fs.writeFileSync(change.file, change.content);
  }
}
