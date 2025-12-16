export default function Settings() {
  return (
    <div>
      <h2>Settings</h2>

      <div className="card">
        <label>
          <input type="checkbox" /> Receive notifications
        </label>

        <button>Save Settings</button>
      </div>
    </div>
  );
}
