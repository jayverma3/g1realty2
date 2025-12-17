import { useEffect, useState } from "react";
import "./orders.css";

const API_LIST = "https://global1realty.com/orders_list.php";
const API_CREATE = "https://global1realty.com/order_create.php";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const loadOrders = () => {
    fetch(API_LIST, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setOrders(data.orders || []));
  };

  useEffect(loadOrders, []);

  const createOrder = async () => {
    const form = new FormData();
    form.append("title", title);
    form.append("amount", amount);

    await fetch(API_CREATE, {
      method: "POST",
      body: form,
      credentials: "include",
    });

    setTitle("");
    setAmount("");
    loadOrders();
  };

  return (
    <div>
      <h2>Your Orders</h2>

      <div className="order-form">
        <input
          placeholder="Order title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={createOrder}>Create Order</button>
      </div>

      <table className="orders-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.title}</td>
              <td className={`status ${o.status}`}>{o.status}</td>
              <td>₹{o.amount}</td>
              <td>{new Date(o.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
