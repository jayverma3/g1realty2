export default function Profile({ user }) {
  return (
    <div>
      <h2>Profile</h2>

      <div className="card">
        <label>Full Name</label>
        <input defaultValue={user.full_name} />

        <label>Email</label>
        <input defaultValue={user.email} disabled />

        <button>Save Changes</button>
      </div>
    </div>
  );
}
