import { useState } from "react";
import { runAiTask } from "./aiStudio.service";

export default function AiTaskForm({ onResult }) {
  const [task, setTask] = useState("");
  const [type, setType] = useState("component");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    const res = await runAiTask({ task, type });
    onResult(res);
    setLoading(false);
  };

  return (
    <div>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="component">Component</option>
        <option value="page">Page</option>
        <option value="feature">Feature</option>
        <option value="api">API</option>
      </select>

      <textarea
        placeholder="Example: Create an order history table with filters"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={submit} disabled={loading}>
        {loading ? "Thinking..." : "Generate"}
      </button>
    </div>
  );
}
