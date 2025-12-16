export default function Security() {
  return (
    <div>
      <h2>Security</h2>

      <div className="card">
        <label>New Password</label>
        <input type="password" />

        <label>Confirm Password</label>
        <input type="password" />

        <button>Update Password</button>
      </div>
    </div>
  );
}
