export async function generateCode(context) {
  // Placeholder: connect OpenAI / local LLM later
  console.log("AI TASK:", context.task);

  return {
    changes: [
      {
        file: "src/components/Demo.jsx",
        content: "// AI generated content",
      },
    ],
  };
}
