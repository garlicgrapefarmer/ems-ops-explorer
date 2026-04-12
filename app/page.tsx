
"use client";
import React from "react";

function CommsPanel() {
  const [mode, setMode] = React.useState("general");
  const [range, setRange] = React.useState("7");

const [news, setNews] = React.useState<string[]>([]);

React.useEffect(() => {
  async function fetchNews() {
    try {
      const res = await fetch(
        "https://news.google.com/rss/search?q=EMS+OR+paramedic+OR+ambulance&hl=en-US&gl=US&ceid=US:en"
      );
      const text = await res.text();

      const parser = new DOMParser();
      const xml = parser.parseFromString(text, "text/xml");

      const items = Array.from(xml.querySelectorAll("item")).slice(0, 5);

      const headlines = items.map(
        (item) => item.querySelector("title")?.textContent || ""
      );

      setNews(headlines);
    } catch (err) {
      console.error(err);
    }
  }

  fetchNews();
}, []);
  const researchSignals = [
    "AI-assisted documentation reducing field cognitive load.",
    "Body-worn technology expanding into healthcare environments.",
    "Video-based quality review gaining traction in EMS.",
    "Responder safety analytics becoming more common.",
    "Integration of operational + clinical data accelerating.",
  ];

const data = mode === "general" ? news : researchSignals;
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 18,
        padding: 22,
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
      }}
    >
      <h2 style={{ marginTop: 0, fontSize: 22 }}>Comms Intelligence</h2>
      <p
        style={{
          marginTop: 0,
          marginBottom: 14,
          color: "#6b7280",
          lineHeight: 1.6,
        }}
      >
        Top 5 readable signals with simple date-range controls.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
        {[
          ["general", "General News"],
          ["research", "Research + Field Signals"],
        ].map(([value, label]) => (
          <button
            key={value}
            onClick={() => setMode(value)}
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              background: mode === value ? "#111827" : "#e5e7eb",
              color: mode === value ? "white" : "#111827",
              fontWeight: 600,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {["7", "30", "60", "custom"].map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            style={{
              padding: "4px 10px",
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              background: range === r ? "#4b5563" : "#e5e7eb",
              color: range === r ? "white" : "#111827",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {r === "custom" ? "Custom" : `${r}d`}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gap: 10 }}>
        {data.map((item, idx) => (
          <div
            key={idx}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              padding: 12,
              background: "#fafafa",
              fontSize: 14,
              lineHeight: 1.5,
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const topCards = [
    { title: "Calls (24h)", value: "412", delta: "+8.4%", note: "vs prior 24h" },
    { title: "Avg Response Time", value: "8m 18s", delta: "-22s", note: "priority incidents" },
    { title: "Unit Hour Utilization", value: "0.46", delta: "+0.03", note: "systemwide" },
    { title: "Mutual Aid Reliance", value: "6.2%", delta: "+1.1%", note: "last 7 days" },
  ];

  const opsKpis = [
    { label: "Unit Hour Utilization (UHU)", value: "0.46", status: "Watch" },
    { label: "Mutual Aid Given", value: "11", status: "Normal" },
    { label: "Mutual Aid Received", value: "18", status: "Elevated" },
    { label: "Late Calls > 10 min", value: "18%", status: "Elevated" },
    { label: "Offload Delay > 30 min", value: "14%", status: "Watch" },
    { label: "Chute Time Compliance", value: "89%", status: "Normal" },
    { label: "Peak Hour Coverage Gap", value: "2 units", status: "Watch" },
    { label: "Non-Transport Rate", value: "17%", status: "Normal" },
  ];

  const qualityBrief = [
    {
      event: "Pediatric cardiac arrest",
      volume: "2 in 30 days",
      status: "Review",
      note: "Default sentinel monitor",
    },
    {
      event: "Ambulance / vehicle collision",
      volume: "1 in 90 days",
      status: "Review",
      note: "Vehicle safety trigger",
    },
    {
      event: "Airway escalation after delay",
      volume: "3 in 30 days",
      status: "Watch",
      note: "Clinical process marker",
    },
    {
      event: "High-risk refusal / treat-no-transport revisit",
      volume: "6 in 30 days",
      status: "Watch",
      note: "Potential quality signal",
    },
    {
      event: "Scene safety / violence exposure",
      volume: "4 in 30 days",
      status: "Review",
      note: "Responder protection marker",
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

  const futureSignals = [
    "Scene timeline fidelity",
    "Crew workload and interruption burden",
    "Lift assist / manpower demand",
    "Destination delay and handoff friction",
    "PPE / safety / compliance patterning",
    "Violence and near-miss trend detection",
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
        : status === "Review"
        ? "#ede9fe"
        : "#dcfce7",
    color:
      status === "Elevated"
        ? "#991b1b"
        : status === "Watch"
        ? "#92400e"
        : status === "Review"
        ? "#5b21b6"
        : "#166534",
  });

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f3f6f8",
        color: "#111827",
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        padding: 24,
      }}
    >
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 0.8fr",
            gap: 16,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: 18,
              padding: 24,
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: 1,
                textTransform: "uppercase",
                color: "#6b7280",
                marginBottom: 10,
              }}
            >
              Executive Operations View
            </div>
            <h1 style={{ margin: 0, fontSize: 36, lineHeight: 1.1 }}>
              EMS Ops Explorer
            </h1>
            <div style={{ marginTop: 10, fontSize: 18, color: "#4b5563" }}>
              Territory: Regional System Demo
            </div>
            <p
              style={{
                margin: "14px 0 0 0",
                maxWidth: 900,
                color: "#6b7280",
                lineHeight: 1.6,
              }}
            >
              A chief-facing dashboard focused on system pressure, response
              performance, quality surveillance, mutual aid dependency, and
              geographic variation across the service.
            </p>
          </div>

          <div
            style={{
              background: "#111827",
              color: "white",
              borderRadius: 18,
              padding: 20,
              boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
            }}
          >
            <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 8 }}>
              Morning Summary
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
              System Status: Watch
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.6, opacity: 0.92 }}>
              Demand concentration, mutual aid reliance, and hospital delay are
              producing moderate operational stress despite acceptable overall
              response performance.
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: 16,
            marginBottom: 20,
          }}
        >
          {topCards.map((card) => (
            <div
              key={card.title}
              style={{
                background: "#ffffff",
                borderRadius: 18,
                padding: 20,
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              }}
            >
              <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 10 }}>
                {card.title}
              </div>
              <div
                style={{
                  fontSize: 30,
                  fontWeight: 800,
                  lineHeight: 1.1,
                  marginBottom: 8,
                }}
              >
                {card.value}
              </div>
              <div
                style={{
                  display: "inline-block",
                  padding: "4px 10px",
                  borderRadius: 999,
                  background: "#eef2ff",
                  color: "#3730a3",
                  fontSize: 12,
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                {card.delta}
              </div>
              <div style={{ fontSize: 12, color: "#9ca3af" }}>{card.note}</div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.35fr 0.95fr",
            gap: 16,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: 18,
              padding: 22,
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              minHeight: 380,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 14,
              }}
            >
              <h2 style={{ margin: 0, fontSize: 22 }}>System Geography</h2>
              <div style={{ fontSize: 12, color: "#6b7280" }}>
                Next step: reconnect map API and district overlays
              </div>
            </div>

            <div
              style={{
                height: 300,
                borderRadius: 16,
                background:
                  "linear-gradient(135deg, #dbeafe 0%, #eff6ff 35%, #f8fafc 100%)",
                border: "1px solid #dbe3ea",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#475569",
                textAlign: "center",
                padding: 24,
              }}
            >
              Map surface for incidents, hotspot density, district boundaries,
              coverage gaps, post moves, and travel-time pressure.
            </div>
          </div>

          <div
            style={{
              background: "#ffffff",
              borderRadius: 18,
              padding: 22,
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              minHeight: 380,
            }}
          >
            <h2 style={{ marginTop: 0, fontSize: 22 }}>Operational KPIs</h2>
            <div style={{ display: "grid", gap: 10 }}>
              {opsKpis.map((item) => (
                <div
                  key={item.label}
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: 14,
                    padding: 14,
                  }}
                >
                  <div style={{ fontSize: 13, color: "#6b7280" }}>
                    {item.label}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 6,
                    }}
                  >
                    <div style={{ fontSize: 22, fontWeight: 800 }}>
                      {item.value}
                    </div>
                    <div style={badgeStyle(item.status)}>{item.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            marginBottom: 20,
          }}
        >
          <CommsPanel />

          <div
            style={{
              background: "#ffffff",
              borderRadius: 18,
              padding: 22,
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            }}
          >
            <h2 style={{ marginTop: 0, fontSize: 22 }}>Quality Brief</h2>
            <p
              style={{
                marginTop: 0,
                marginBottom: 14,
                color: "#6b7280",
                lineHeight: 1.6,
              }}
            >
              Sentinel event surveillance with default focus on pediatric arrest,
              vehicle incidents, scene safety, and high-risk care transitions.
            </p>
            <div style={{ display: "grid", gap: 12 }}>
              {qualityBrief.map((item) => (
                <div
                  key={item.event}
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: 14,
                    padding: 14,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 12,
                      alignItems: "center",
                    }}
                  >
                    <div style={{ fontWeight: 700 }}>{item.event}</div>
                    <div style={badgeStyle(item.status)}>{item.status}</div>
                  </div>
                  <div
                    style={{
                      marginTop: 8,
                      fontSize: 22,
                      fontWeight: 800,
                    }}
                  >
                    {item.volume}
                  </div>
                  <div style={{ marginTop: 4, fontSize: 13, color: "#6b7280" }}>
                    {item.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: 18,
              padding: 22,
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            }}
          >
            <h2 style={{ marginTop: 0, fontSize: 22 }}>District Performance</h2>
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 14,
                }}
              >
                <thead>
                  <tr style={{ textAlign: "left", color: "#6b7280" }}>
                    <th style={{ paddingBottom: 10 }}>District</th>
                    <th style={{ paddingBottom: 10 }}>Calls</th>
                    <th style={{ paddingBottom: 10 }}>Avg Response</th>
                    <th style={{ paddingBottom: 10 }}>UHU</th>
                    <th style={{ paddingBottom: 10 }}>Mutual Aid</th>
                    <th style={{ paddingBottom: 10 }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {districtRows.map((d) => (
                    <tr key={d.name} style={{ borderTop: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "12px 0", fontWeight: 700 }}>
                        {d.name}
                      </td>
                      <td style={{ padding: "12px 0" }}>{d.calls}</td>
                      <td style={{ padding: "12px 0" }}>{d.response}</td>
                      <td style={{ padding: "12px 0" }}>{d.uhu}</td>
                      <td style={{ padding: "12px 0" }}>{d.mutualAid}</td>
                      <td style={{ padding: "12px 0" }}>{d.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div
            style={{
              background: "#ffffff",
              borderRadius: 18,
              padding: 22,
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            }}
          >
            <h2 style={{ marginTop: 0, fontSize: 22 }}>
              Future Intelligence Layers
            </h2>
            <p
              style={{
                color: "#6b7280",
                marginTop: 0,
                marginBottom: 16,
                lineHeight: 1.6,
              }}
            >
              This gets materially stronger when the system can understand what
              truly happened on scene, during transport, and at handoff rather
              than relying only on coded incident fields.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: 12,
              }}
            >
              {futureSignals.map((item) => (
                <div
                  key={item}
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: 14,
                    padding: 16,
                    background: "#fafafa",
                    fontWeight: 600,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
