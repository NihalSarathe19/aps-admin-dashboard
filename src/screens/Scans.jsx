import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { scans } from "../data/mock.js";

export default function Scans() {
  const [search, setSearch] = useState("");
  const nav = useNavigate();

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return scans;
    return scans.filter((x) => (x.name + " " + x.type + " " + x.status).toLowerCase().includes(s));
  }, [search]);

  return (
    <main className="main-content">
      <div className="header">
        <div className="header-left">
          <h1>Scans</h1>
          <div className="org-info">View and manage security scans across all targets.</div>
        </div>
      </div>

      <div className="table-container">
        <div className="table-toolbar">
          <input
            id="searchInput"
            className="search-input"
            placeholder="Search scans by name or type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search scans"
          />
          <button className="btn-new-scan" type="button">+ New scan</button>
        </div>

        <table className="scan-table" aria-label="Scans table">
          <thead>
            <tr>
              <th>Scan Name</th><th>Type</th><th>Status</th><th>Progress</th><th>Vulnerability</th><th>Last Scan</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((scan) => (
              <tr
                key={scan.id}
                role="button"
                tabIndex={0}
                onClick={() => nav(`/scans/${scan.id}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); nav(`/scans/${scan.id}`); }
                }}
                aria-label={`Open scan ${scan.name}`}
              >
                <td><strong>{scan.name}</strong></td>
                <td>{scan.type}</td>
                <td><span className={`status-chip ${scan.status}`}>{scan.status}</span></td>
                <td>{scan.progress}%</td>
                <td>
                  <div className="vulnerability-badges">
                    {scan.vuln[0] ? <span className="vuln-badge critical">{scan.vuln[0]}</span> : null}
                    {scan.vuln[1] ? <span className="vuln-badge high">{scan.vuln[1]}</span> : null}
                    {scan.vuln[2] ? <span className="vuln-badge medium">{scan.vuln[2]}</span> : null}
                    {scan.vuln[3] ? <span className="vuln-badge low">{scan.vuln[3]}</span> : null}
                  </div>
                </td>
                <td>{scan.lastScan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
