export default function AiPreview({ result }) {
  return (
    <div className="ai-preview">
      <h3>Proposed Changes</h3>

      {result.changes.map((c, i) => (
        <pre key={i}>
          <strong>{c.file}</strong>
          {"\n"}
          {c.content}
        </pre>
      ))}

      <button>Apply Changes</button>
    </div>
  );
}
