import { analyzeProject } from "./analyzer.js";
import { buildContext } from "./contextBuilder.js";
import { generateCode } from "./generator.js";
import { writeChanges } from "./writer.js";

export async function runAI(task) {
  const analysis = analyzeProject();
  const context = buildContext(task, analysis);
  const result = await generateCode(context);
  await writeChanges(result);
}
