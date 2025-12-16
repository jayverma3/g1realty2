import { useEffect, useState } from "react";

const API_ORDERS = "https://global1realty.com/api/admin/orders.php";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(API_ORDERS, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setOrders(data.orders || []));
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(API_ORDERS, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });

    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  return (
    <>
      <h1>Orders</h1>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Order</th>
            <th>User</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.title}</td>
              <td>{o.user_email}</td>
              <td>{o.status}</td>
              <td>
                <select
                  value={o.status}
                  onChange={(e) => updateStatus(o.id, e.target.value)}
                >
                  <option>pending</option>
                  <option>processing</option>
                  <option>completed</option>
                  <option>cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
