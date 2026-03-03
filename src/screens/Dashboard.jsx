import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { scans as mockScans } from "../data/mock.js";
import { useTheme } from "../context/ThemeContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import Modal from "../ui/Modal.jsx";
import Button from "../ui/Button.jsx";
import { SkeletonRow, SkeletonCard } from "../ui/Skeleton.jsx";

export default function Dashboard() {
  const { toggleTheme } = useTheme();
  const { push } = useToast();
  const nav = useNavigate();

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [newScanOpen, setNewScanOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [columnOpen, setColumnOpen] = useState(false);

  const [columns, setColumns] = useState({
    name: true, type: true, status: true, progress: true, vuln: true, last: true
  });

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return mockScans;
    return mockScans.filter((x) => (x.name + " " + x.type + " " + x.status).toLowerCase().includes(s));
  }, [search]);

  const openScan = (scanId) => nav(`/scans/${scanId}`);

  return (
    <main className="main-content">
      <div className="header">
        <div className="header-left">
          <h1>Dashboard</h1>
          <div className="org-info">
            <strong>Org:</strong> Project X · <strong>Owner:</strong> Nammagiri ·{" "}
            <strong>Total Scans:</strong> 100 · <strong>Scheduled:</strong> 1000 ·{" "}
            <strong>Rescans:</strong> 100 · <strong>Failed Scans:</strong> 100 ·{" "}
            <span style={{ color: "var(--text-secondary)" }}>10 mins ago</span>
          </div>
        </div>
        <button className="theme-toggle" onClick={() => { toggleTheme(); push("Theme changed successfully!", "success"); }} aria-label="Toggle theme">
          🌓 Toggle Theme
        </button>
      </div>

      <div className="stats-grid">
        {loading ? (
          <>
            <div className="stat-card"><SkeletonCard /></div>
            <div className="stat-card"><SkeletonCard /></div>
            <div className="stat-card"><SkeletonCard /></div>
            <div className="stat-card"><SkeletonCard /></div>
          </>
        ) : (
          <>
            <div className="stat-card">
              <div className="stat-header"><span className="stat-label">Critical Severity</span></div>
              <div className="stat-value" style={{ color: "var(--critical-red)" }}>86</div>
              <div className="stat-change positive">↑ 2% increase than yesterday</div>
            </div>
            <div className="stat-card">
              <div className="stat-header"><span className="stat-label">High Severity</span></div>
              <div className="stat-value" style={{ color: "var(--high-orange)" }}>16</div>
              <div className="stat-change positive">↑ 0.9% increase than yesterday</div>
            </div>
            <div className="stat-card">
              <div className="stat-header"><span className="stat-label">Medium Severity</span></div>
              <div className="stat-value" style={{ color: "var(--medium-yellow)" }}>26</div>
              <div className="stat-change negative">↓ 0.9% decrease than yesterday</div>
            </div>
            <div className="stat-card">
              <div className="stat-header"><span className="stat-label">Low Severity</span></div>
              <div className="stat-value" style={{ color: "var(--low-green)" }}>16</div>
              <div className="stat-change positive">↑ 0.9% increase than yesterday</div>
            </div>
          </>
        )}
      </div>

      <div className="table-container">
        <div className="table-toolbar">
          <input
            id="searchInput"
            type="text"
            className="search-input"
            placeholder="Search scans by name or type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search scans"
          />
          <button className="btn-secondary" onClick={() => setFilterOpen(true)} aria-label="Filter scans">🔽 Filter</button>
          <button className="btn-secondary" onClick={() => setColumnOpen(true)} aria-label="Customize columns">⚙️ Column</button>
          <button className="btn-new-scan" onClick={() => setNewScanOpen(true)} aria-label="Create new scan">+ New scan</button>
        </div>

        <table className="scan-table" role="table" aria-label="Scans table">
          <thead>
            <tr>
              {columns.name && <th>Scan Name</th>}
              {columns.type && <th>Type</th>}
              {columns.status && <th>Status</th>}
              {columns.progress && <th>Progress</th>}
              {columns.vuln && <th>Vulnerability</th>}
              {columns.last && <th>Last Scan</th>}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <tr key={i}><td colSpan={6}><SkeletonRow /></td></tr>
              ))
            ) : (
              filtered.map((scan, idx) => (
                <tr
                  key={scan.id}
                  style={{ animation: `fadeIn 0.3s ease ${idx * 0.05}s both` }}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${scan.name} scan details`}
                  onClick={() => openScan(scan.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openScan(scan.id); }
                  }}
                >
                  {columns.name && <td><strong>{scan.name}</strong></td>}
                  {columns.type && <td>{scan.type}</td>}
                  {columns.status && (
                    <td>
                      <span className={`status-chip ${scan.status}`} role="status" aria-label={`Status: ${scan.status}`}>
                        {scan.status.charAt(0).toUpperCase() + scan.status.slice(1)}
                      </span>
                    </td>
                  )}
                  {columns.progress && <td>{scan.progress}%</td>}
                  {columns.vuln && (
                    <td>
                      <div className="vulnerability-badges" role="list" aria-label="Vulnerabilities found">
                        {scan.vuln[0] ? <span className="vuln-badge critical" role="listitem">{scan.vuln[0]}</span> : null}
                        {scan.vuln[1] ? <span className="vuln-badge high" role="listitem">{scan.vuln[1]}</span> : null}
                        {scan.vuln[2] ? <span className="vuln-badge medium" role="listitem">{scan.vuln[2]}</span> : null}
                        {scan.vuln[3] ? <span className="vuln-badge low" role="listitem">{scan.vuln[3]}</span> : null}
                      </div>
                    </td>
                  )}
                  {columns.last && <td>{scan.lastScan}</td>}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal
        open={newScanOpen}
        title="Create New Scan"
        onClose={() => setNewScanOpen(false)}
        footer={
          <>
            <Button onClick={() => setNewScanOpen(false)}>Cancel</Button>
            <Button
              variant="primary"
              onClick={() => { push("Scan initiated successfully!", "success"); setNewScanOpen(false); }}
            >
              Start Scan
            </Button>
          </>
        }
      >
        <div className="form-group">
          <label>Scan Name</label>
          <input className="form-control" placeholder="e.g., Production Web App" />
        </div>
        <div className="form-group">
          <label>Target URL</label>
          <input className="form-control" placeholder="https://example.com" />
        </div>
        <div className="form-group">
          <label>Scan Type</label>
          <select className="form-control">
            <option>Greybox</option>
            <option>Blackbox</option>
            <option>Whitebox</option>
          </select>
        </div>
      </Modal>

      <Modal
        open={filterOpen}
        title="Filter Scans"
        onClose={() => setFilterOpen(false)}
        footer={
          <>
            <Button onClick={() => setFilterOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => { push("Filters applied successfully", "success"); setFilterOpen(false); }}>
              Apply Filters
            </Button>
          </>
        }
      >
        <div className="form-group">
          <label>Status</label>
          <select className="form-control">
            <option>All</option>
            <option>Completed</option>
            <option>Scheduled</option>
            <option>Failed</option>
          </select>
        </div>
        <div className="form-group">
          <label>Scan Type</label>
          <select className="form-control">
            <option>All</option>
            <option>Greybox</option>
            <option>Blackbox</option>
            <option>Whitebox</option>
          </select>
        </div>
      </Modal>

      <Modal
        open={columnOpen}
        title="Customize Columns"
        onClose={() => setColumnOpen(false)}
        footer={
          <>
            <Button onClick={() => setColumnOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => { push("Column preferences saved", "success"); setColumnOpen(false); }}>
              Save
            </Button>
          </>
        }
      >
        {Object.entries(columns).map(([k, v]) => (
          <label key={k} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <input
              type="checkbox"
              checked={v}
              onChange={(e) => setColumns((c) => ({ ...c, [k]: e.target.checked }))}
            />
            {k}
          </label>
        ))}
      </Modal>
    </main>
  );
}
