import { useState } from "react";
import "./Admin.css";
import AdminUsers from "./AdminUsers";
import AdminOrders from "./AdminOrders";

export default function AdminDashboard() {
  const [tab, setTab] = useState("users");

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>

        <button
          onClick={() => setTab("users")}
          className={tab === "users" ? "active" : ""}
        >
          Users
        </button>
        <button
          onClick={() => setTab("orders")}
          className={tab === "orders" ? "active" : ""}
        >
          Orders
        </button>
      </aside>

      <main className="admin-content">
        {tab === "users" && <AdminUsers />}
        {tab === "orders" && <AdminOrders />}
      </main>
    </div>
  );
}
