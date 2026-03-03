import React from "react";

export default function Schedule() {
  return (
    <main className="main-content">
      <div className="header">
        <div className="header-left">
          <h1>Schedule</h1>
          <div className="org-info">Configure recurring scans and maintenance windows.</div>
        </div>
      </div>

      <div className="table-container">
        <div style={{ padding: 24, color: "var(--text-secondary)" }}>
          Scheduled scan jobs will appear here (cron frequency, targets, next run, status).
        </div>
      </div>
    </main>
  );
}
