import { useEffect, useState } from "react";

const API = "https://global1realty.com/api/orders.php";
const UPDATE = "https://global1realty.com/api/order_update.php";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const load = () => {
    fetch(API, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setOrders(data.orders || []));
  };

  useEffect(load, []);

  const updateStatus = async (id, status) => {
    const form = new FormData();
    form.append("id", id);
    form.append("status", status);

    await fetch(UPDATE, {
      method: "POST",
      body: form,
      credentials: "include",
    });

    load();
  };

  return (
    <div>
      <h2>Admin Order Management</h2>

      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Title</th>
            <th>Status</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.email}</td>
              <td>{o.title}</td>
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
              <td>₹{o.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
