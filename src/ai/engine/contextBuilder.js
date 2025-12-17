import fs from "fs";

export function buildContext(task, analysis) {
  return {
    task,
    projectFiles: analysis.files.slice(0, 10),
    rules: JSON.parse(fs.readFileSync("./ai/component.rules.json")),
    schema: JSON.parse(fs.readFileSync("./ai/project.schema.json")),
    api: JSON.parse(fs.readFileSync("./ai/api.contracts.json")),
  };
}
