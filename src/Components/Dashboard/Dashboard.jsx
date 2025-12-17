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
    let mounted = true;

    fetch(API_DASHBOARD, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (!data?.user) throw new Error("Session expired");
        if (mounted) setUser(data.user);
      })
      .catch((err) => mounted && setError(err.message))
      .finally(() => mounted && setLoading(false));

    return () => (mounted = false);
  }, []);

  const logout = async () => {
    try {
      await fetch(API_LOGOUT, {
        method: "POST",
        credentials: "include",
      });
    } finally {
      window.location.href = "/login";
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <Profile user={user} />;
      case "orders":
        return <Orders />;
      case "security":
        return <Security />;
      case "settings":
        return <Settings />;
      default:
        return (
          <>
            <h1 className="welcome">
              Welcome, <span>{user.full_name}</span>
            </h1>
            <p className="subtitle">Here’s an overview of your account</p>

            <div className="stats">
              <div className="stat-card">
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>

              <div className="stat-card">
                <h4>Status</h4>
                <p className="status verified">Verified</p>
              </div>

              <div className="stat-card">
                <h4>Member Since</h4>
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
        );
    }
  };

  if (loading) {
    return <div className="loader">Loading dashboard...</div>;
  }

  if (error || !user) {
    return (
      <div className="dashboard-error">
        <h2>Access Denied</h2>
        <p>{error || "Please login again."}</p>
        <a href="/login" className="btn-primary">
          Go to Login
        </a>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h2 className="logo">MyAccount</h2>

        <nav>
          {["dashboard", "profile", "orders", "security", "settings"].map(
            (tab) => (
              <button
                key={tab}
                className={activeTab === tab ? "active" : ""}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            )
          )}
        </nav>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </aside>

      <main className="content">{renderContent()}</main>
    </div>
  );
}
