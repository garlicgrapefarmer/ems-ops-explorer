"use client";
import React from "react";

/* -------------------- COMMS PANEL (unchanged logic, tighter UI) -------------------- */

function CommsPanel() {
  const [mode, setMode] = React.useState("general");
  const [range, setRange] = React.useState("7");
  const [news, setNews] = React.useState<
    { title: string; link: string; source: string; pubDate: string }[]
  >([]);

  const researchSignals = [
    "AI-assisted documentation reducing field cognitive load.",
    "Body-worn technology expanding into healthcare environments.",
    "Video-based quality review gaining traction in EMS.",
    "Responder safety analytics becoming more common.",
    "Integration of operational + clinical data accelerating.",
  ];

  React.useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("/api/news");
        const data = await res.json();
        setNews(data.headlines || []);
      } catch (err) {
        console.error(err);
      }
    }
    fetchNews();
  }, []);

  const data = mode === "general" ? news : researchSignals;

  return (
    <div style={styles.panel}>
      <h2 style={styles.sectionTitle}>Comms Intelligence</h2>

      <div style={styles.buttonRow}>
        {[
          ["general", "News"],
          ["research", "Signals"],
        ].map(([value, label]) => (
          <button
            key={value}
            onClick={() => setMode(value)}
            style={styles.toggleButton(mode === value)}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={styles.buttonRow}>
        {["7", "30", "60"].map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            style={styles.smallButton(range === r)}
          >
            {r}d
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gap: 10 }}>
        {data.map((item, idx) => (
          <div key={idx} style={styles.subCard}>
            {typeof item === "string" ? (
              item
            ) : (
              <>
                <a href={item.link} target="_blank" rel="noreferrer" style={styles.link}>
                  {item.title}
                </a>
                <div style={styles.meta}>
                  {item.source}
                  {item.pubDate
                    ? ` • ${new Date(item.pubDate).toLocaleDateString()}`
                    : ""}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------- MAIN -------------------- */

export default function Home() {
  const topCards = [
    { title: "Calls", value: "412" },
    { title: "Response", value: "8m 18s" },
    { title: "UHU", value: "0.46" },
    { title: "Mutual Aid", value: "6.2%" },
  ];

  const districtRows = [
    { name: "Central", calls: 126, response: "7m", uhu: "0.58", mutual: "High" },
    { name: "North", calls: 81, response: "8m", uhu: "0.44", mutual: "Low" },
    { name: "South", calls: 92, response: "9m", uhu: "0.49", mutual: "Mod" },
  ];

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        
        {/* HEADER */}
        <div style={styles.header}>
          <div>
            <div style={styles.eyebrow}>Executive Operations</div>
            <h1 style={styles.title}>EMS Ops Explorer</h1>
            <div style={styles.subtitle}>Mobile-first system view</div>
          </div>

          <div style={styles.statusCard}>
            <div style={{ fontSize: 12, opacity: 0.8 }}>Status</div>
            <div style={{ fontSize: 20, fontWeight: 800 }}>Watch</div>
          </div>
        </div>

        {/* KPI CARDS */}
        <div style={styles.kpiGrid}>
          {topCards.map((c) => (
            <div key={c.title} style={styles.kpiCard}>
              <div style={styles.kpiLabel}>{c.title}</div>
              <div style={styles.kpiValue}>{c.value}</div>
            </div>
          ))}
        </div>

        {/* PANELS */}
        <div style={styles.panelGrid}>
          <CommsPanel />

          <div style={styles.panel}>
            <h2 style={styles.sectionTitle}>Operational Snapshot</h2>
            <div style={styles.simpleRow}>UHU: 0.46</div>
            <div style={styles.simpleRow}>Late Calls: 18%</div>
            <div style={styles.simpleRow}>Offload: 14%</div>
          </div>
        </div>

        {/* TABLE */}
        <div style={styles.panel}>
          <h2 style={styles.sectionTitle}>District Performance</h2>

          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>District</th>
                  <th style={styles.th}>Calls</th>
                  <th style={styles.th}>Resp</th>
                  <th style={styles.th}>UHU</th>
                  <th style={styles.th}>Aid</th>
                </tr>
              </thead>
              <tbody>
                {districtRows.map((d) => (
                  <tr key={d.name}>
                    <td style={styles.td}>{d.name}</td>
                    <td style={styles.td}>{d.calls}</td>
                    <td style={styles.td}>{d.response}</td>
                    <td style={styles.td}>{d.uhu}</td>
                    <td style={styles.td}>{d.mutual}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
}

/* -------------------- STYLES -------------------- */

const styles: any = {
  page: {
    background: "#f3f6f8",
    minHeight: "100vh",
    padding: 12,
  },

  container: {
    maxWidth: 1100,
    margin: "0 auto",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 16,
  },

  eyebrow: {
    fontSize: 11,
    textTransform: "uppercase",
    color: "#6b7280",
    fontWeight: 700,
  },

  title: {
    fontSize: 24,
    margin: 0,
  },

  subtitle: {
    fontSize: 13,
    color: "#6b7280",
  },

  statusCard: {
    background: "#111827",
    color: "white",
    padding: 10,
    borderRadius: 10,
  },

  kpiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: 10,
    marginBottom: 16,
  },

  kpiCard: {
    background: "white",
    padding: 12,
    borderRadius: 12,
  },

  kpiLabel: {
    fontSize: 12,
    color: "#6b7280",
  },

  kpiValue: {
    fontSize: 20,
    fontWeight: 800,
  },

  panelGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 12,
    marginBottom: 16,
  },

  panel: {
    background: "white",
    padding: 14,
    borderRadius: 14,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 10,
  },

  simpleRow: {
    fontSize: 14,
    padding: "6px 0",
  },

  buttonRow: {
    display: "flex",
    gap: 6,
    flexWrap: "wrap",
    marginBottom: 10,
  },

  toggleButton: (active: boolean) => ({
    padding: "6px 10px",
    borderRadius: 999,
    border: "none",
    background: active ? "#111827" : "#e5e7eb",
    color: active ? "white" : "#111827",
    fontSize: 12,
    cursor: "pointer",
  }),

  smallButton: (active: boolean) => ({
    padding: "4px 8px",
    borderRadius: 999,
    border: "none",
    background: active ? "#4b5563" : "#e5e7eb",
    color: active ? "white" : "#111827",
    fontSize: 11,
  }),

  subCard: {
    border: "1px solid #e5e7eb",
    padding: 10,
    borderRadius: 10,
    fontSize: 13,
  },

  link: {
    fontWeight: 700,
    textDecoration: "none",
    color: "#111827",
  },

  meta: {
    fontSize: 11,
    color: "#6b7280",
  },

  tableWrap: {
    overflowX: "auto",
  },

  table: {
    width: "100%",
    minWidth: 500,
  },

  th: {
    textAlign: "left",
    fontSize: 12,
    padding: 8,
    color: "#6b7280",
  },

  td: {
    padding: 8,
    fontSize: 13,
  },
};
