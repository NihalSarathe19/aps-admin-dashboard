import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext.jsx";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const { push } = useToast();

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    window.setTimeout(() => {
      localStorage.setItem("aps_authed", "1");
      setLoading(false);
      push("Account created successfully!", "success");
      nav("/dashboard");
    }, 900);
  };

  return (
    <div id="loginScreen" className="login-container">
      <div className="login-left">
        <h1>APS</h1>
        <p className="tagline">Expert level Cybersecurity in hours, not weeks</p>
        <ul className="feature-list">
          <li>Effortlessly spider and map targets to uncover hidden security flaws</li>
          <li>Deliver high-quality, validated findings in hours, not weeks</li>
          <li>Generate professional, enterprise-grade security reports automatically</li>
        </ul>
        <div style={{ fontSize: 14, color: "#6B7280" }}>⭐ Trustpilot Rated 4.5/5.0 · 100k+ reviews</div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <h2>Sign up</h2>
          <form onSubmit={onSubmit} aria-label="Create account form">
            <div className="form-row">
              <div className="form-group">
                <label>First name</label>
                <input type="text" placeholder="Enter first name" required />
              </div>
              <div className="form-group">
                <label>Last name</label>
                <input type="text" placeholder="Enter last name" required />
              </div>
            </div>
            <div className="form-group">
              <label>Email address</label>
              <input type="email" placeholder="Enter your email" required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="8+ characters" required />
            </div>
            <div className="checkbox-group">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">I agree to APS's Terms & Conditions and acknowledge the Privacy Policy</label>
            </div>
            <button type="submit" className="btn-primary" disabled={loading} aria-label="Create account">
              {loading ? "Creating..." : "Create account"}
            </button>
          </form>

          <div className="divider"><span>OR</span></div>
          <div className="social-login">
            <button className="social-btn" type="button" aria-label="Continue with Apple">🍎 Apple</button>
            <button className="social-btn" type="button" aria-label="Continue with Google">G Google</button>
            <button className="social-btn" type="button" aria-label="Continue with Meta">f Meta</button>
          </div>

          <p style={{ textAlign: "center", marginTop: 24, fontSize: 14, color: "var(--text-secondary)" }}>
            Already have an account?{" "}
            <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "var(--primary-teal)", fontWeight: 600 }}>
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
