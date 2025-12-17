import fs from "fs";
import path from "path";

const SRC_DIR = path.resolve("src");

export function analyzeProject() {
  const files = [];

  function scan(dir) {
    fs.readdirSync(dir).forEach((file) => {
      const full = path.join(dir, file);
      if (fs.statSync(full).isDirectory()) scan(full);
      else if (file.endsWith(".jsx") || file.endsWith(".js")) {
        files.push(full);
      }
    });
  }

  scan(SRC_DIR);

  return {
    files,
    timestamp: Date.now(),
  };
}
