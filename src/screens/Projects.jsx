import React from "react";

export default function Projects() {
  return (
    <main className="main-content">
      <div className="header">
        <div className="header-left">
          <h1>Projects</h1>
          <div className="org-info">Manage organizations, projects, owners, and access.</div>
        </div>
      </div>

      <div className="table-container">
        <div className="table-toolbar">
          <input className="search-input" placeholder="Search projects..." aria-label="Search projects" />
          <button className="btn-new-scan" type="button">+ New project</button>
        </div>
        <div style={{ padding: 24, color: "var(--text-secondary)" }}>
          Create and manage projects here (e.g., Project X, environments, owners, RBAC).
        </div>
      </div>
    </main>
  );
}
