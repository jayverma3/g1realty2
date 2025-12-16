import { useState } from "react";
import "./Login.css";

// POINT THIS TO YOUR PHP LOGIN FILE
const API_URL = "https://global1realty.com/api/login.php";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* =========================
     VALIDATION
  ========================= */
  const validate = () => {
    if (!form.email || !form.password) {
      return "Email and password are required";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return "Invalid email address";
    }

    if (form.password.length < 8) {
      return "Invalid credentials";
    }

    return null;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* =========================
     SUBMIT HANDLER
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const body = new URLSearchParams();
      body.append("email", form.email.trim());
      body.append("password", form.password);

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: "include", // IMPORTANT for PHP sessions
        body: body.toString(),
      });

      const text = await res.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.error("Invalid JSON:", text);
        throw new Error("Server error");
      }

      if (!res.ok || data.error) {
        throw new Error(data.error || "Login failed");
      }

      setSuccess("Login successful. Redirecting…");

      // OPTIONAL: redirect after login
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit} noValidate>
        <h2>Login</h2>

        {error && <div className="error-msg">{error}</div>}
        {success && <div className="success-msg">{success}</div>}

        <div className="input-group">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <label>Email Address</label>
        </div>

        <div className="input-group">
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <label>Password</label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="login-links">
          <a href="/forgot-password">Forgot password?</a>
          <a href="/create-account">Create account</a>
        </div>
      </form>
    </div>
  );
}
