import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { consoleLogs, findings, scans } from "../data/mock.js";
import { useTheme } from "../context/ThemeContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import Tabs from "../ui/Tabs.jsx";
import Modal from "../ui/Modal.jsx";
import Button from "../ui/Button.jsx";

export default function ScanDetail() {
  const { scanId } = useParams();
  const scan = useMemo(() => scans.find((s) => s.id === scanId) || scans[0], [scanId]);

  const { toggleTheme } = useTheme();
  const { push } = useToast();

  const [tab, setTab] = useState("activity");
  const [loadingConsole, setLoadingConsole] = useState(true);
  const [loadingFindings, setLoadingFindings] = useState(true);
  const [stopOpen, setStopOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setLoadingConsole(true);
    setLoadingFindings(true);
    const t1 = setTimeout(() => setLoadingConsole(false), 650);
    const t2 = setTimeout(() => setLoadingFindings(false), 650);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [scanId]);

  useEffect(() => {
    setProgress(0);
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 100;
        const next = Math.min(100, p + (Math.floor(Math.random() * 5) + 1));
        return next;
      });
    }, 2000);
    return () => clearInterval(id);
  }, [scanId]);

  const progressLabel = progress === 100 ? "Complete" : "In Progress";

  return (
    <main className="main-content">
      <div className="header">
        <div className="header-left">
          <h1>Scan: {scan.name}</h1>
          <div className="org-info">Active Security Assessment</div>
        </div>
        <button className="theme-toggle" onClick={() => { toggleTheme(); push("Theme changed successfully!", "success"); }} aria-label="Toggle theme">
          🌓 Toggle Theme
        </button>
      </div>

      <div className="scan-detail-header">
        <div className="detail-top">
          <div className="progress-circle" aria-label={`Progress ${progress}%`}>
            <span className="progress-value">{progress}%</span>
            <span className="progress-label">{progressLabel}</span>
          </div>
          <div className="stepper" aria-label="Scan steps">
            <div className={`step ${progress < 20 ? "active" : "completed"}`}>Spidering</div>
            <div className={`step ${progress >= 20 && progress < 40 ? "active" : progress >= 40 ? "completed" : ""}`}>Mapping</div>
            <div className={`step ${progress >= 40 && progress < 60 ? "active" : progress >= 60 ? "completed" : ""}`}>Testing</div>
            <div className={`step ${progress >= 60 && progress < 80 ? "active" : progress >= 80 ? "completed" : ""}`}>Validating</div>
            <div className={`step ${progress >= 80 && progress < 100 ? "active" : progress >= 100 ? "completed" : ""}`}>Reporting</div>
          </div>
        </div>

        <div className="metadata-grid">
          <div className="metadata-item"><h4>Scan Type</h4><p>{scan.type}</p></div>
          <div className="metadata-item"><h4>Targets</h4><p>google.com</p></div>
          <div className="metadata-item"><h4>Started At</h4><p>Nov 22, 09:00AM</p></div>
          <div className="metadata-item"><h4>Credentials</h4><p>2 Active</p></div>
          <div className="metadata-item"><h4>Files</h4><p>Control.pdf</p></div>
          <div className="metadata-item"><h4>Checklists</h4><p>403/50</p></div>
        </div>
      </div>

      <div className="scan-detail-content">
        <div className="console-panel">
          <div className="panel-header">
            <h3>Live Scan Console</h3>
            <Tabs
              value={tab}
              onChange={(v) => { setTab(v); push(`Switched to ${v === "activity" ? "Activity Log" : "Verification Loops"} tab`, "success"); }}
              tabs={[
                { value: "activity", label: "Activity Log" },
                { value: "verification", label: "Verification Loops" },
              ]}
            />
          </div>

          <div className="console-content" id="consoleContent">
            {loadingConsole ? (
              Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="skeleton" style={{ height: 16, marginBottom: 12 }} />
              ))
            ) : (
              (tab === "activity" ? consoleLogs : consoleLogs.slice(0, 6)).map((log, idx) => (
                <div key={idx} className="console-line" style={{ animation: `fadeIn 0.3s ease ${idx * 0.08}s both` }}>
                  <span className="timestamp">{log.time}</span>
                  {log.text}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="findings-panel">
          <div className="panel-header">
            <h3>Finding Log</h3>
          </div>
          <div className="findings-content" id="findingsContent">
            {loadingFindings ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="skeleton" style={{ height: 150, marginBottom: 16, borderRadius: 8 }} />
              ))
            ) : (
              findings.map((f, idx) => (
                <div key={idx} className="finding-card" style={{ animation: `slideUp 0.3s ease ${idx * 0.08}s both` }} role="article" aria-label={f.title}>
                  <div className="finding-header">
                    <span className={`severity-badge ${f.severity}`}>{f.severity}</span>
                    <span className="finding-time">{f.time}</span>
                  </div>
                  <div className="finding-title">{f.title}</div>
                  <div className="finding-endpoint">{f.endpoint}</div>
                  <div className="finding-description">{f.description}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="status-bar">
        <div className="status-item"><span className="status-label">Sub-Agents</span><span className="status-value">0</span></div>
        <div className="status-item"><span className="status-label">Parallel Executions</span><span className="status-value">2</span></div>
        <div className="status-item"><span className="status-label">Operations</span><span className="status-value">1</span></div>
        <div className="status-item"><span className="status-label">Critical</span><span className="status-value" style={{ color: "var(--critical-red)" }}>0</span></div>
        <div className="status-item"><span className="status-label">High</span><span className="status-value" style={{ color: "var(--high-orange)" }}>0</span></div>
        <div className="status-item"><span className="status-label">Medium</span><span className="status-value" style={{ color: "var(--medium-yellow)" }}>0</span></div>
        <div className="status-item"><span className="status-label">Low</span><span className="status-value" style={{ color: "var(--low-green)" }}>0</span></div>

        <div className="action-buttons">
          <button className="btn-action btn-export" onClick={() => setExportOpen(true)} aria-label="Export report">📥 Export Report</button>
          <button className="btn-action btn-stop" onClick={() => setStopOpen(true)} aria-label="Stop scan">⏹ Stop Scan</button>
        </div>
      </div>

      <Modal
        open={exportOpen}
        title="Export Report"
        onClose={() => setExportOpen(false)}
        footer={
          <>
            <Button onClick={() => setExportOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => { push("Downloading report…", "success"); setExportOpen(false); }}>
              Download
            </Button>
          </>
        }
      >
        <div className="form-group">
          <label>Format</label>
          <select className="form-control" defaultValue="pdf">
            <option value="pdf">PDF</option>
            <option value="json">JSON</option>
            <option value="csv">CSV</option>
            <option value="html">HTML</option>
          </select>
        </div>
      </Modal>

      <Modal
        open={stopOpen}
        title="⚠️ Stop Scan"
        onClose={() => setStopOpen(false)}
        footer={
          <>
            <Button onClick={() => setStopOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => { push("Scan stopped successfully", "error"); setStopOpen(false); }}>
              Stop Scan
            </Button>
          </>
        }
      >
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
          Are you sure you want to stop the current scan? This action cannot be undone.
        </p>
      </Modal>
    </main>
  );
}
