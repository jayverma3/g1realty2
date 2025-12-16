import { useState } from "react";
import "./CreateAccount.css";

// POINT THIS TO YOUR ACTUAL PHP FILE
const API_URL = "https://global1realty.com/api/create_account.php";

export default function CreateAccount() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* =========================
     CLIENT-SIDE VALIDATION
  ========================= */
  const validate = () => {
    if (!form.name || form.name.trim().length < 3) {
      return "Name must be at least 3 characters";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return "Invalid email address";
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
        form.password
      )
    ) {
      return "Password must be 8+ chars with uppercase, lowercase, number & symbol";
    }

    if (form.password !== form.confirmPassword) {
      return "Passwords do not match";
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
      // PHP expects form-urlencoded, not JSON
      const body = new URLSearchParams();
      body.append("name", form.name.trim());
      body.append("email", form.email.trim());
      body.append("password", form.password);

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Account creation failed");
      }

      setSuccess(
        data.message || "Account created. Please verify OTP sent to email."
      );

      // Clear form on success
      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     GOOGLE SIGNUP (PHP FLOW)
  ========================= */
  const handleGoogleSignup = () => {
    // This should point to your PHP Google OAuth entry
    window.location.href = "https://yourdomain.com/api/google_auth_start.php";
  };

  return (
    <div className="create-account-container">
      <form className="create-account-card" onSubmit={handleSubmit} noValidate>
        <h2>Create Account</h2>

        {error && <div className="error-msg">{error}</div>}
        {success && <div className="success-msg">{success}</div>}

        <div className="input-group">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <label>Full Name</label>
        </div>

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

        <div className="input-group">
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          <label>Confirm Password</label>
        </div>

        <button type="submit" className="ca-submit-btn" disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </button>

        <div className="divider">OR</div>

        <button
          type="button"
          className="ca-google-btn"
          onClick={handleGoogleSignup}
        >
          Continue with Google
        </button>
      </form>
    </div>
  );
}
