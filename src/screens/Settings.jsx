import React from "react";
import { useTheme } from "../context/ThemeContext.jsx";

export default function Settings() {
  const { toggleTheme } = useTheme();

  return (
    <main className="main-content">
      <div className="header">
        <div className="header-left">
          <h1>Settings</h1>
          <div className="org-info">Theme, organization defaults, security preferences.</div>
        </div>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          🌓 Toggle Theme
        </button>
      </div>

      <div className="table-container">
        <div style={{ padding: 24, color: "var(--text-secondary)" }}>
          Put settings panels here (API keys, roles, integrations, export defaults).
        </div>
      </div>
    </main>
  );
}
