import React from "react";

export default function Notifications() {
  return (
    <main className="main-content">
      <div className="header">
        <div className="header-left">
          <h1>Notifications</h1>
          <div className="org-info">Alerts for scan completion, failures, and critical findings.</div>
        </div>
      </div>

      <div className="table-container">
        <div style={{ padding: 24, color: "var(--text-secondary)" }}>
          Notification feed will appear here (severity, timestamp, action links).
        </div>
      </div>
    </main>
  );
}
