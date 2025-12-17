import { useState } from "react";
import AiTaskForm from "./AiTaskForm";
import AiPreview from "./AiPreview";
import AiHistory from "./AiHistory";
import "./aiStudio.css";

export default function AiStudio() {
  const [result, setResult] = useState(null);

  return (
    <div className="ai-studio">
      <h1>AI Studio</h1>
      <p>Describe what you want to build</p>

      <AiTaskForm onResult={setResult} />
      {result && <AiPreview result={result} />}
      <AiHistory />
    </div>
  );
}
