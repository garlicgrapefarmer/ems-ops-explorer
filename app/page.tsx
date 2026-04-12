"use client";
import React from "react";

function CommsPanel() {
  const [mode, setMode] = React.useState("global");
  const [newsMode, setNewsMode] = React.useState("news");
  const [news, setNews] = React.useState<
    { title: string; link: string; source: string; pubDate: string }[]
  >([]);

  const fieldSignals: Record<string, string[]> = {
    global: [
      "Body-worn and ambient documentation tools are increasingly being discussed as workflow reducers rather than just recording devices.",
      "Operational leaders are asking for fewer logins and more unified situational awareness across CAD, ePCR, video, and hospital flow.",
      "AI-assisted drafting is gaining attention where it reduces report burden without adding documentation friction.",
      "Clinical and operational intelligence are beginning to merge into one leadership view rather than separate reporting lanes.",
      "Responder safety, violence exposure, and near-miss visibility are becoming stronger executive priorities.",
    ],
    northAmerica: [
      "North American services are pushing harder on hospital offload visibility and late-call performance.",
      "Chiefs continue to look for simpler executive summaries rather than deeper reporting portals.",
      "Ambient documentation interest is strongest when framed as reducing ePCR burden.",
      "Cross-system staffing strain and mutual aid dependence remain recurring leadership themes.",
      "Leaders want mobile-ready views they can check quickly before the day accelerates.",
    ],
    europe: [
      "European services continue to emphasize system design, dispatch efficiency, and service-wide learning.",
      "Integrated operational command views are attractive where agencies are juggling fragmented systems.",
      "Safety, governance, and quality review remain central to adoption discussions.",
      "Leaders increasingly want signal detection rather than retrospective reporting alone.",
      "There is ongoing interest in learning across borders rather than just within-country benchmarking.",
    ],
    canada: [
      "Canadian paramedic leaders continue to value innovation framed around service improvement, not gadget adoption.",
      "Single-pane operational awareness remains compelling where leaders are managing multiple disconnected tools.",
      "Body-worn technology is more credible when tied to safety, quality, and workflow simplification together.",
      "Drafting and ambient capture are most interesting when they could reduce ePCR duplication.",
      "Operational intelligence that supports both field leadership and executive leadership has clear appeal.",
    ],
    usa: [
      "U.S. EMS leaders remain highly sensitive to staffing strain, hospital delays, and late-call burden.",
      "The strongest AI interest is still practical: summarization, drafting, and reducing clerical overload.",
      "Executive dashboards land best when they help with daily decisions, not just retrospective reporting.",
      "Mutual aid reliance and unit hour utilization remain highly legible core metrics.",
      "Leadership interest rises when tools feel usable on a phone before the first meeting of the day.",
    ],
    uk: [
      "UK-style service leadership often emphasizes system-wide visibility, governance, and equity of performance.",
      "Queueing, handover friction, and operational flow continue to shape leadership attention.",
      "Signal compression into useful executive views is more valuable than more raw reporting.",
      "Cross-service learning remains a useful framing for innovation.",
      "Operational dashboards need clear narrative, not just tables and targets.",
    ],
    sweden: [
      "Scandinavian-style health system thinking often rewards clarity, simplicity, and integrated views.",
      "Workforce sustainability and safe system design remain relevant leadership themes.",
      "Leaders are more likely to engage when tools feel calm, purposeful, and trustworthy.",
      "Technology adoption lands better when it reduces fragmentation.",
      "Quality and operational visibility are stronger together than apart.",
    ],
    australia: [
      "Australian services often balance geographic realities, workforce pressure, and broad operational visibility.",
      "Mobile-friendly leadership views are useful where leaders are not desk-bound for long.",
      "Signal detection tied to escalation and resource positioning has strong appeal.",
      "Documentation burden remains a practical entry point for AI discussion.",
      "Executive users respond well to systems that summarize rather than overwhelm.",
    ],
  };

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

  const chipStyle = (active: boolean) => ({
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid #d1d5db",
    background: active ? "#111827" : "#f3f4f6",
    color: active ? "#ffffff" : "#111827",
    fontSize: 12,
    fontWeight: 700,
    cursor: "pointer",
  });

  const displayedSignals = fieldSignals[mode] || fieldSignals.global;

  return (
    <div style={styles.panel}>
      <div style={styles.panelHeaderRow}>
        <h2 style={styles.sectionTitle}>Global Field Signals</h2>
      </div>

      <p style={styles.sectionIntro}>
        Quick coffee learning for leaders who want to zoom out from their own system.
      </p>

      <div style={styles.buttonWrap}>
        {[
          ["news", "Live News"],
          ["signals", "Field Signals"],
        ].map(([value, label]) => (
          <button
            key={value}
            onClick={() => setNewsMode(value)}
            style={chipStyle(newsMode === value)}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={styles.buttonWrap}>
        {[
          ["global", "Worldwide"],
          ["northAmerica", "N. America"],
          ["europe", "Europe"],
          ["canada", "Canada"],
          ["usa", "USA"],
          ["uk", "UK"],
          ["sweden", "Sweden"],
          ["australia", "Australia"],
        ].map(([value, label]) => (
          <button
            key={value}
            onClick={() => setMode(value)}
            style={chipStyle(mode === value)}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gap: 10 }}>
        {newsMode === "news"
          ? news.slice(0, 5).map((item, idx) => (
              <div key={idx} style={styles.subCard}>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.newsLink}
                >
                  {item.title}
                </a>
                <div style={styles.metaText}>
                  {item.source}
                  {item.pubDate
                    ? ` • ${new Date(item.pubDate).toLocaleDateString()}`
                    : ""}
                </div>
              </div>
            ))
          : displayedSignals.map((item, idx) => (
              <div key={idx} style={styles.subCard}>
                <div style={styles.signalText}>{item}</div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [pulse, setPulse] = React.useState<number | null>(null);
  const [activeSignal, setActiveSignal] = React.useState("lateCalls");

  const topCards = [
    { title: "Calls (24h)", value: "412", note: "vs prior 24h +8.4%" },
    { title: "Response Time", value: "8m 18s", note: "priority incidents" },
    { title: "UHU", value: "0.46", note: "systemwide watch" },
    { title: "Mutual Aid", value: "6.2%", note: "last 7 days" },
  ];

  const signals = [
    {
      id: "lateCalls",
      title: "Late Calls Rising",
      level: "Watch",
      summary:
        "Late-call burden has increased in the central district and is now one of the clearest markers of system strain.",
      detailTitle: "What this likely means",
      detail:
        "Demand is outrunning timely unit availability during peak periods. The issue is visible enough to affect service confidence even though overall performance still looks acceptable at the top line.",
      support: [
        "Late calls >10 min: 18%",
        "Most affected district: Central",
        "Trend versus prior week: Up",
      ],
    },
    {
      id: "offload",
      title: "Hospital Offload Drag",
      level: "Elevated",
      summary:
        "Hospital handoff friction remains the strongest operational drag on the system this morning.",
      detailTitle: "Why it matters",
      detail:
        "When crews remain tied up after arrival, the system loses recovery capacity. That pushes late calls up and increases the chance of leaning on mutual aid.",
      support: [
        "Offload delay >30 min: 14%",
        "Pressure window: Late morning to early afternoon",
        "Likely impact: Coverage compression",
      ],
    },
    {
      id: "mutualAid",
      title: "Mutual Aid Dependence",
      level: "Watch",
      summary:
        "Mutual aid use is not yet critical, but it is increasingly acting as a pressure-release valve.",
      detailTitle: "Operational takeaway",
      detail:
        "This is the sort of signal a chief wants to see early because it often reflects broader availability problems before they become obvious elsewhere.",
      support: [
        "Mutual aid reliance: 6.2%",
        "Direction: Up",
        "Interpretation: Growing strain, not collapse",
      ],
    },
  ];

  const districtRows = [
    {
      name: "Central",
      calls: 126,
      response: "7m 11s",
      uhu: "0.58",
      mutualAid: "High",
      status: "Strained",
    },
    {
      name: "North",
      calls: 81,
      response: "8m 42s",
      uhu: "0.44",
      mutualAid: "Low",
      status: "Stable",
    },
    {
      name: "South",
      calls: 92,
      response: "9m 28s",
      uhu: "0.49",
      mutualAid: "Moderate",
      status: "Watch",
    },
    {
      name: "West",
      calls: 113,
      response: "8m 02s",
      uhu: "0.41",
      mutualAid: "Low",
      status: "Stable",
    },
  ];

  const pulseLabels = [
    "Calm",
    "Manageable",
    "Mixed",
    "Strained",
    "On fire",
  ];

  const badgeStyle = (status: string) => ({
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    background:
      status === "Elevated"
        ? "#fee2e2"
        : status === "Watch"
        ? "#fef3c7"
        : status === "Strained"
        ? "#fee2e2"
        : "#dcfce7",
    color:
      status === "Elevated"
        ? "#991b1b"
        : status === "Watch"
        ? "#92400e"
        : status === "Strained"
        ? "#991b1b"
        : "#166534",
  });

  const activeSignalData =
    signals.find((signal) => signal.id === activeSignal) || signals[0];

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <div style={styles.hero}>
          <div style={styles.heroEyebrow}>Morning Brief</div>
          <div style={styles.heroTitle}>
            System Status: <span style={{ color: "#facc15" }}>Watch</span>
          </div>
          <div style={styles.heroSubtitle}>Territory: Regional System Demo</div>
          <div style={styles.heroText}>
            Late-call burden is rising in central districts, mutual aid demand is
            increasing, and hospital offload delays remain the primary operational
            constraint this morning.
          </div>
        </div>

        <div style={styles.panel}>
          <div style={styles.panelHeaderRow}>
            <h2 style={styles.sectionTitle}>System Pulse</h2>
          </div>
          <p style={styles.sectionIntro}>
            How is the day looking from your seat?
          </p>

          <div style={styles.pulseRow}>
            {["😌", "🙂", "😐", "😟", "🔥"].map((emoji, idx) => (
              <button
                key={idx}
                onClick={() => setPulse(idx)}
                style={{
                  ...styles.pulseButton,
                  background: pulse === idx ? "#111827" : "#f3f4f6",
                  color: pulse === idx ? "#ffffff" : "#111827",
                }}
              >
                <div style={{ fontSize: 24 }}>{emoji}</div>
                <div style={{ fontSize: 11, fontWeight: 700, marginTop: 4 }}>
                  {pulseLabels[idx]}
                </div>
              </button>
            ))}
          </div>

          <div style={styles.metaText}>
            {pulse === null
              ? "Tap a quick read on the day."
              : `You marked today as: ${pulseLabels[pulse]}.`}
          </div>
        </div>

        <div style={styles.panel}>
          <div style={styles.panelHeaderRow}>
            <h2 style={styles.sectionTitle}>Top Signals</h2>
          </div>
          <p style={styles.sectionIntro}>
            The three things most likely to shape your operational day.
          </p>

          <div style={styles.signalGrid}>
            {signals.map((signal) => (
              <button
                key={signal.id}
                onClick={() => setActiveSignal(signal.id)}
                style={{
                  ...styles.signalCard,
                  border:
                    activeSignal === signal.id
                      ? "2px solid #111827"
                      : "1px solid #e5e7eb",
                }}
              >
                <div style={styles.signalHeaderRow}>
                  <div style={styles.signalTitle}>{signal.title}</div>
                  <div style={badgeStyle(signal.level)}>{signal.level}</div>
                </div>
                <div style={styles.signalSummary}>{signal.summary}</div>
              </button>
            ))}
          </div>

          <div style={styles.detailCard}>
            <div style={styles.detailLabel}>{activeSignalData.detailTitle}</div>
            <div style={styles.detailText}>{activeSignalData.detail}</div>

            <div style={styles.supportList}>
              {activeSignalData.support.map((item) => (
                <div key={item} style={styles.supportItem}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={styles.kpiGrid}>
          {topCards.map((card) => (
            <div key={card.title} style={styles.kpiCard}>
              <div style={styles.kpiLabel}>{card.title}</div>
              <div style={styles.kpiValue}>{card.value}</div>
              <div style={styles.kpiNote}>{card.note}</div>
            </div>
          ))}
        </div>

        <CommsPanel />

        <div style={styles.panel}>
          <div style={styles.panelHeaderRow}>
            <h2 style={styles.sectionTitle}>District Performance</h2>
          </div>
          <p style={styles.sectionIntro}>
            Lower on the page, but still there when you want the district view.
          </p>

          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>District</th>
                  <th style={styles.th}>Calls</th>
                  <th style={styles.th}>Avg Response</th>
                  <th style={styles.th}>UHU</th>
                  <th style={styles.th}>Mutual Aid</th>
                  <th style={styles.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {districtRows.map((d) => (
                  <tr key={d.name} style={{ borderTop: "1px solid #f1f5f9" }}>
                    <td style={{ ...styles.td, fontWeight: 700 }}>{d.name}</td>
                    <td style={styles.td}>{d.calls}</td>
                    <td style={styles.td}>{d.response}</td>
                    <td style={styles.td}>{d.uhu}</td>
                    <td style={styles.td}>{d.mutualAid}</td>
                    <td style={styles.td}>
                      <span style={badgeStyle(d.status)}>{d.status}</span>
                    </td>
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

const styles: any = {
  page: {
    minHeight: "100vh",
    background: "#f3f6f8",
    color: "#111827",
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    padding: 12,
  },

  container: {
    maxWidth: 920,
    margin: "0 auto",
    display: "grid",
    gap: 12,
  },

  hero: {
    background: "#111827",
    color: "#ffffff",
    borderRadius: 18,
    padding: 16,
    boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
  },

  heroEyebrow: {
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.72)",
    marginBottom: 8,
  },

  heroTitle: {
    fontSize: 26,
    fontWeight: 800,
    lineHeight: 1.1,
    marginBottom: 8,
  },

  heroSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.82)",
    marginBottom: 10,
  },

  heroText: {
    fontSize: 14,
    lineHeight: 1.55,
    color: "rgba(255,255,255,0.9)",
  },

  panel: {
    background: "#ffffff",
    borderRadius: 18,
    padding: 14,
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  },

  panelHeaderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    marginBottom: 6,
  },

  sectionTitle: {
    margin: 0,
    fontSize: 20,
    lineHeight: 1.2,
  },

  sectionIntro: {
    marginTop: 0,
    marginBottom: 12,
    color: "#6b7280",
    lineHeight: 1.5,
    fontSize: 14,
  },

  pulseRow: {
    display: "grid",
    gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
    gap: 8,
    marginBottom: 8,
  },

  pulseButton: {
    border: "1px solid #e5e7eb",
    borderRadius: 14,
    padding: "10px 6px",
    cursor: "pointer",
  },

  signalGrid: {
    display: "grid",
    gap: 10,
    marginBottom: 12,
  },

  signalCard: {
    background: "#ffffff",
    borderRadius: 14,
    padding: 12,
    textAlign: "left" as const,
    cursor: "pointer",
  },

  signalHeaderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 8,
  },

  signalTitle: {
    fontSize: 16,
    fontWeight: 800,
    lineHeight: 1.2,
  },

  signalSummary: {
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 1.5,
  },

  detailCard: {
    border: "1px solid #e5e7eb",
    borderRadius: 14,
    padding: 12,
    background: "#fafafa",
  },

  detailLabel: {
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: 0.5,
    textTransform: "uppercase" as const,
    color: "#6b7280",
    marginBottom: 8,
  },

  detailText: {
    fontSize: 14,
    lineHeight: 1.55,
    color: "#111827",
    marginBottom: 10,
  },

  supportList: {
    display: "grid",
    gap: 8,
  },

  supportItem: {
    borderRadius: 10,
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    padding: "10px 12px",
    fontSize: 13,
    color: "#374151",
  },

  kpiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 10,
  },

  kpiCard: {
    background: "#ffffff",
    borderRadius: 16,
    padding: 14,
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  },

  kpiLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 8,
    textTransform: "uppercase" as const,
    letterSpacing: 0.5,
    fontWeight: 700,
  },

  kpiValue: {
    fontSize: 24,
    fontWeight: 800,
    lineHeight: 1.1,
    marginBottom: 6,
  },

  kpiNote: {
    fontSize: 12,
    color: "#9ca3af",
    lineHeight: 1.4,
  },

  buttonWrap: {
    display: "flex",
    gap: 8,
    marginBottom: 10,
    flexWrap: "wrap" as const,
  },

  subCard: {
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 12,
    background: "#fafafa",
  },

  newsLink: {
    color: "#111827",
    fontWeight: 700,
    textDecoration: "none",
    display: "block",
    marginBottom: 6,
    lineHeight: 1.4,
  },

  signalText: {
    fontSize: 14,
    lineHeight: 1.55,
    color: "#111827",
  },

  metaText: {
    fontSize: 12,
    color: "#6b7280",
    lineHeight: 1.4,
  },

  tableWrap: {
    overflowX: "auto" as const,
    WebkitOverflowScrolling: "touch" as const,
  },

  table: {
    width: "100%",
    minWidth: 640,
    borderCollapse: "collapse" as const,
    fontSize: 14,
  },

  th: {
    textAlign: "left" as const,
    padding: "0 0 10px 0",
    color: "#6b7280",
    fontSize: 12,
    textTransform: "uppercase" as const,
    letterSpacing: 0.5,
  },

  td: {
    padding: "12px 8px 12px 0",
    color: "#111827",
    whiteSpace: "nowrap" as const,
  },
};
