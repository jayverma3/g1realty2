import { useEffect, useState } from "react";
import "./Dashboard.css";

import Profile from "./Profile";
import Orders from "./Orders";
import Security from "./Security";
import Settings from "./Settings";

const API_DASHBOARD = "https://global1realty.com/api/dashboard.php";
const API_LOGOUT = "https://global1realty.com/api/logout.php";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(API_DASHBOARD, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (!data.user) throw new Error("Invalid session");
        setUser(data.user);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const logout = async () => {
    await fetch(API_LOGOUT, { method: "POST", credentials: "include" });
    window.location.href = "/login";
  };

  if (loading) return <div className="loader">Loading...</div>;

  if (error || !user)
    return (
      <div className="dashboard-error">
        <h2>Access Denied</h2>
        <p>{error}</p>
        <a href="/login">Go to Login</a>
      </div>
    );

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h2 className="logo">MyAccount</h2>

        <nav>
          <button
            onClick={() => setActiveTab("dashboard")}
            className={activeTab === "dashboard" ? "active" : ""}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={activeTab === "profile" ? "active" : ""}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={activeTab === "orders" ? "active" : ""}
          >
            Orders
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={activeTab === "security" ? "active" : ""}
          >
            Security
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={activeTab === "settings" ? "active" : ""}
          >
            Settings
          </button>
        </nav>

        <button className="logout" onClick={logout}>
          Logout
        </button>
      </aside>

      <main className="content">
        {activeTab === "dashboard" && (
          <>
            <h1>Welcome, {user.full_name}</h1>

            <div className="cards">
              <div className="card">
                <h3>Email</h3>
                <p>{user.email}</p>
              </div>
              <div className="card">
                <h3>Status</h3>
                <p className="verified">Verified</p>
              </div>
              <div className="card">
                <h3>Member Since</h3>
                <p>{new Date(user.created_at).toDateString()}</p>
              </div>
            </div>

            <div className="quick-actions">
              <button onClick={() => setActiveTab("profile")}>
                Edit Profile
              </button>
              <button onClick={() => setActiveTab("security")}>
                Change Password
              </button>
              <button onClick={() => setActiveTab("orders")}>
                View Orders
              </button>
            </div>
          </>
        )}

        {activeTab === "profile" && <Profile user={user} />}
        {activeTab === "orders" && <Orders />}
        {activeTab === "security" && <Security />}
        {activeTab === "settings" && <Settings />}
      </main>
    </div>
  );
}
