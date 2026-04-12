export default function Home() {
  const cards = [
    { title: "Total Calls", value: "1,284", note: "Last 30 days" },
    { title: "Avg Response", value: "8m 42s", note: "Priority incidents" },
    { title: "Transport Rate", value: "61%", note: "All incidents" },
    { title: "Peak Hour", value: "16:00", note: "Highest call volume" },
  ];

  return (
    <main
      style={{
        padding: 24,
        fontFamily: "Arial, sans-serif",
        background: "#f5f7f8",
        minHeight: "100vh",
        color: "#111827",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            background: "white",
            borderRadius: 16,
            padding: 24,
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 0.8,
              color: "#6b7280",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Operations Intelligence
          </div>
          <h1 style={{ margin: 0, fontSize: 36 }}>EMS Ops Explorer</h1>
          <p style={{ margin: "8px 0 0 0", color: "#4b5563", fontSize: 18 }}>
            Territory: Kansas City Metro (Sample Data)
          </p>
          <p style={{ margin: "12px 0 0 0", color: "#6b7280" }}>
            Prototype dashboard for exploring EMS operational performance,
            demand patterns, and deployment signals.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: 16,
            marginBottom: 20,
          }}
        >
          {cards.map((card) => (
            <div
              key={card.title}
              style={{
                background: "white",
                borderRadius: 16,
                padding: 20,
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              }}
            >
              <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 8 }}>
                {card.title}
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 6 }}>
                {card.value}
              </div>
              <div style={{ fontSize: 13, color: "#9ca3af" }}>{card.note}</div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: 16,
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: 16,
              padding: 20,
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              minHeight: 320,
            }}
          >
            <h2 style={{ marginTop: 0 }}>Map and Geographic View</h2>
            <p style={{ color: "#6b7280" }}>
              Placeholder for incident map, hotspots, station coverage, and
              geography-based filtering.
            </p>
          </div>

          <div
            style={{
              background: "white",
              borderRadius: 16,
              padding: 20,
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              minHeight: 320,
            }}
          >
            <h2 style={{ marginTop: 0 }}>Morning Brief</h2>
            <ul style={{ paddingLeft: 20, color: "#374151", lineHeight: 1.7 }}>
              <li>Call volume elevated in the urban core overnight.</li>
              <li>Transport mix trending upward for medical incidents.</li>
              <li>Response times stretched during late afternoon peak.</li>
              <li>One district shows repeated low-acuity demand clustering.</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
