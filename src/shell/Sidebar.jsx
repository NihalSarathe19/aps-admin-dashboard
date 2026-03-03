import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar({ mobileOpen }) {
  const Item = ({ to, children, end = false }) => {
    const label = typeof children === "string"
      ? children.replace(/\s+/g, " ").trim()
      : String(children).replace(/\s+/g, " ").trim();

    return (
      <NavLink
        to={to}
        end={end}
        className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
        aria-label={label}
      >
        {children}
      </NavLink>
    );
  };

  return (
    <aside className={`sidebar ${mobileOpen ? "mobile-open" : ""}`} id="sidebar">
      <div className="logo">APS</div>

      <nav className="nav-menu" aria-label="Main navigation">
        <Item to="/dashboard" end>📊 Dashboard</Item>
        <Item to="/projects">📁 Projects</Item>
        <Item to="/scans">🔍 Scans</Item>
        <Item to="/schedule">📅 Schedule</Item>
        <Item to="/notifications">🔔 Notifications</Item>
        <Item to="/settings">⚙️ Settings</Item>
        <Item to="/support">💬 Support</Item>
      </nav>

      <div className="user-profile">
        <div className="user-avatar">A</div>
        <div className="user-info">
          <h4>admin@edu.com</h4>
          <p>Security Lead</p>
        </div>
      </div>
    </aside>
  );
}