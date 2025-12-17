import { useEffect, useState } from "react";

const API_USERS = "https://global1realty.com/api/users.php";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(API_USERS, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setUsers(data.users || []));
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(API_USERS, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });

    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status } : u)));
  };

  return (
    <>
      <h1>User Management</h1>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.full_name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.status}</td>
              <td>
                <button
                  onClick={() =>
                    updateStatus(
                      u.id,
                      u.status === "active" ? "blocked" : "active"
                    )
                  }
                >
                  {u.status === "active" ? "Block" : "Unblock"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
