import { useEffect, useState } from "react";
import "./orders.css";

const API_ORDERS = "https://global1realty.com/api/orders.php";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch(API_ORDERS, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setOrders(data.orders || []));
  }, []);

  const createOrder = async () => {
    const res = await fetch(API_ORDERS, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    const data = await res.json();
    setOrders((prev) => [...prev, data.order]);
    setTitle("");
  };

  return (
    <div>
      <h2>Orders</h2>

      <div className="order-form">
        <input
          placeholder="Order title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={createOrder}>Create Order</button>
      </div>

      <ul className="orders-list">
        {orders.map((o) => (
          <li key={o.id}>
            <span>{o.title}</span>
            <span className="status">{o.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
