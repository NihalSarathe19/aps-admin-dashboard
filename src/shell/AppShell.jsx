import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";

export default function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => setMobileOpen(false), [location.pathname]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        const el = document.getElementById("searchInput");
        if (el) {
          e.preventDefault();
          el.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        className="mobile-menu-btn"
        onClick={() => setMobileOpen((v) => !v)}
        aria-label="Open menu"
      >
        ☰
      </button>
      <div className={`mobile-overlay ${mobileOpen ? "active" : ""}`} onClick={() => setMobileOpen(false)} />

      <div className="dashboard-container screen-transition-enter">
        <Sidebar
          mobileOpen={mobileOpen}
          onCloseMobile={() => setMobileOpen(false)}
          onGoDashboard={() => navigate("/dashboard")}
          activePath={location.pathname}
        />
        <Outlet />
      </div>
    </>
  );
}
