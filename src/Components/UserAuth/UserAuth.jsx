import React, { useEffect, useState } from "react";
import "./UserAuth.css";

// UserAuth component — frontend only. Configure REACT_APP_API_BASE to point to your backend API.
// Backend endpoints expected: /auth/register, /auth/login, /auth/send-otp, /auth/verify-otp, /auth/google

const API_BASE = process.env.REACT_APP_API_BASE || "";

export default function UserAuth() {
  const [mode, setMode] = useState("login"); // login | register | phone
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    // Listen for messages from OAuth popup. Backend should postMessage({ token }) from its callback page.
    function onMessage(e) {
      if (!e?.data) return;
      const { token, error: oauthError } = e.data;
      if (token) {
        localStorage.setItem("authToken", token);
        setStatus("Signed in with Google");
        setError(null);
      } else if (oauthError) {
        setError(oauthError);
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const clear = () => {
    setStatus(null);
    setError(null);
  };

  const saveToken = (token) => {
    try {
      localStorage.setItem("authToken", token);
    } catch (e) {
      console.warn("Failed to save token", e);
    }
  };

  async function postJson(path, body) {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, data };
  }

  const handleRegister = async (e) => {
    e && e.preventDefault();
    clear();
    if (!email || !password || !name)
      return setError("Name, email and password are required.");
    setLoading(true);
    const { ok, data } = await postJson("/auth/register", {
      name,
      email,
      password,
      phone,
    });
    setLoading(false);
    if (!ok) return setError(data?.message || "Registration failed");
    saveToken(data.token);
    setStatus("Registration successful — logged in");
  };

  const handleLogin = async (e) => {
    e && e.preventDefault();
    clear();
    if (!email || !password)
      return setError("Email and password are required.");
    setLoading(true);
    const { ok, data } = await postJson("/auth/login", { email, password });
    setLoading(false);
    if (!ok) return setError(data?.message || "Login failed");
    saveToken(data.token);
    setStatus("Welcome back");
  };

  const handleSendOtp = async (e) => {
    e && e.preventDefault();
    clear();
    if (!phone) return setError("Enter phone number (with country code)");
    setLoading(true);
    const { ok, data } = await postJson("/auth/send-otp", { phone });
    setLoading(false);
    if (!ok) return setError(data?.message || "Failed to send OTP");
    setOtpSent(true);
    setStatus("OTP sent to your phone");
  };

  const handleVerifyOtp = async (e) => {
    e && e.preventDefault();
    clear();
    if (!otp) return setError("Enter the OTP code");
    setLoading(true);
    const { ok, data } = await postJson("/auth/verify-otp", { phone, otp });
    setLoading(false);
    if (!ok) return setError(data?.message || "OTP verification failed");
    saveToken(data.token);
    setStatus("Phone verified — logged in");
    setOtp("");
    setOtpSent(false);
  };

  const openPopup = (url) => {
    const left = window.screenX + (window.innerWidth - 600) / 2;
    const top = window.screenY + (window.innerHeight - 700) / 2;
    return window.open(
      url,
      "oauth",
      `width=600,height=700,left=${left},top=${top}`
    );
  };

  const handleGoogle = () => {
    clear();
    // Backend should provide an endpoint that starts OAuth and then, in its callback page,
    // calls window.opener.postMessage({ token }) and window.close() so this listener can get the token.
    const redirect = encodeURIComponent(
      window.location.origin + "/auth-callback"
    );
    const url = `${API_BASE}/auth/google?redirect=${redirect}`;
    openPopup(url);
  };

  return (
    <div className="ua-wrapper">
      <div className="ua-card" role="region" aria-label="User authentication">
        <div className="ua-left">
          <div className="brand">
            <h1>Account</h1>
            <p className="muted">
              Access your profile, manage listings and save favorites.
            </p>
          </div>

          <div className="tabs" role="tablist" aria-label="Authentication tabs">
            <button
              className={mode === "login" ? "active" : ""}
              onClick={() => {
                clear();
                setMode("login");
              }}
            >
              Login
            </button>
            <button
              className={mode === "register" ? "active" : ""}
              onClick={() => {
                clear();
                setMode("register");
              }}
            >
              Register
            </button>
            <button
              className={mode === "phone" ? "active" : ""}
              onClick={() => {
                clear();
                setMode("phone");
              }}
            >
              Phone
            </button>
          </div>

          <div className="form">
            {status && <div className="msg success">{status}</div>}
            {error && <div className="msg error">{error}</div>}

            {(mode === "login" || mode === "register") && (
              <form onSubmit={mode === "login" ? handleLogin : handleRegister}>
                {mode === "register" && (
                  <label className="field">
                    <span>Name</span>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                    />
                  </label>
                )}

                <label className="field">
                  <span>Email</span>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                </label>

                <label className="field">
                  <span>Password</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Strong password"
                  />
                </label>

                <div className="actions">
                  <button
                    className="btn primary"
                    type="submit"
                    disabled={loading}
                  >
                    {loading
                      ? "Please wait..."
                      : mode === "login"
                      ? "Login"
                      : "Create account"}
                  </button>
                  <button
                    type="button"
                    className="btn ghost"
                    onClick={handleGoogle}
                  >
                    Continue with Google
                  </button>
                </div>
              </form>
            )}

            {mode === "phone" && (
              <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}>
                <label className="field">
                  <span>Phone</span>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 555 555 5555"
                  />
                </label>

                {otpSent && (
                  <label className="field">
                    <span>OTP</span>
                    <input
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="123456"
                    />
                  </label>
                )}

                <div className="actions">
                  <button
                    className="btn primary"
                    type="submit"
                    disabled={loading}
                  >
                    {loading
                      ? "Please wait..."
                      : otpSent
                      ? "Verify OTP"
                      : "Send OTP"}
                  </button>
                  <button
                    type="button"
                    className="btn ghost"
                    onClick={handleGoogle}
                  >
                    Continue with Google
                  </button>
                </div>
              </form>
            )}

            <div className="note">
              By continuing you agree to our terms. Backend must implement
              secure storage in MySQL and token issuance.
            </div>
          </div>
        </div>

        <div className="ua-right" aria-hidden>
          <div className="illustration">
            <svg
              viewBox="0 0 480 320"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <defs>
                <linearGradient id="g" x1="0" x2="1">
                  <stop offset="0" stopColor="#e6f2ff" />
                  <stop offset="1" stopColor="#f2fbff" />
                </linearGradient>
              </defs>
              <rect rx="18" width="100%" height="100%" fill="url(#g)" />
              <g transform="translate(28,28)" fill="#fff" opacity="0.95">
                <rect x="0" y="0" rx="10" width="170" height="120" />
                <rect x="190" y="20" rx="8" width="250" height="72" />
              </g>
            </svg>
            <div className="illu-text">
              <h3>Secure and simple</h3>
              <p className="muted">
                Sign in with Google, email/password, or phone OTP. Connect this
                UI to your Hostinger MySQL-backed API to store users safely.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
