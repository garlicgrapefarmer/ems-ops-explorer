export default function Home() {
  const topCards = [
    {
      title: "Calls (24h)",
      value: "412",
      delta: "+8.4%",
      note: "vs prior 24h",
    },
    {
      title: "Avg Response Time",
      value: "8m 18s",
      delta: "-22s",
      note: "priority incidents",
    },
    {
      title: "Unit Hour Utilization",
      value: "0.46",
      delta: "+0.03",
      note: "systemwide",
    },
    {
      title: "Left Without Transport",
      value: "17%",
      delta: "+2.1%",
      note: "watch trend",
    },
  ];

  const pressureItems = [
    ["High-acuity queue", "7 active", "Elevated"],
    ["Hospitals with offload delay", "3 sites", "Watch"],
    ["Late calls (>10 min)", "18%", "Elevated"],
    ["Peak demand window", "15:00–19:00", "Expected"],
  ];

  const districts = [
    {
      name: "Central",
      calls: 126,
      response: "7m 11s",
      utilization: "0.58",
      status: "Strained",
    },
    {
      name: "North",
      calls: 81,
      response: "8m 42s",
      utilization: "0.44",
      status: "Stable",
    },
    {
      name: "South",
      calls: 92,
      response: "9m 28s",
      utilization: "0.49",
      status: "Watch",
    },
    {
      name: "West",
      calls: 113,
      response: "8m 02s",
      utilization: "0.41",
      status: "Stable",
    },
  ];

  const leadersBrief = [
    "Call volume is concentrated in the central urban corridor and remains above baseline for a second straight day.",
    "Response performance is acceptable systemwide, but the central district is absorbing sustained pressure and should be monitored for late-call growth.",
    "Three receiving facilities are contributing to downstream delay, with offload friction most visible during the late afternoon window.",
    "Non-transport and low-acuity clustering suggest an opportunity for alternate response design, targeted follow-up, or revised deployment logic.",
  ];

  const futureSignals = [
    "Scene timeline fidelity",
    "Crew workload and interruption burden",
    "Lift assist / manpower demand by call type",
    "Destination delay and handoff friction",
    "PPE / safety / compliance patterning",
    "Near-miss and violence exposure trends",
  ];

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
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 16,
            marginBottom: 20,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: 18,
              padding: 24,
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              flex: "1 1 760px",
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
            <div
              style={{
                marginTop: 10,
                fontSize: 18,
                color: "#4b5563",
              }}
            >
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
              A chief-facing operational dashboard focused on demand, response
              performance, system pressure, workforce strain, and geographic
              variation across the service.
            </p>
          </div>

          <div
            style={{
              background: "#111827",
              color: "white",
              borderRadius: 18,
              padding: 20,
              minWidth: 280,
              boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
            }}
          >
            <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 8 }}>
              Morning Summary
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
              System Status: Watch
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.6, opacity: 0.9 }}>
              Response times remain acceptable, but central demand concentration
              and hospital delay are creating visible pressure in the afternoon
              and evening window.
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
              <div
                style={{
                  fontSize: 13,
                  color: "#6b7280",
                  marginBottom: 10,
                }}
              >
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
            gridTemplateColumns: "1.3fr 0.9fr",
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
              minHeight: 360,
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
                Placeholder for map / heat layer / district filters
              </div>
            </div>

            <div
              style={{
                height: 280,
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
              Map surface for incidents, hotspot density, district coverage,
              post moves, and travel-time pressure.
            </div>
          </div>

          <div
            style={{
              background: "#ffffff",
              borderRadius: 18,
              padding: 22,
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              minHeight: 360,
            }}
          >
            <h2 style={{ marginTop: 0, fontSize: 22 }}>System Pressure</h2>
            <div style={{ display: "grid", gap: 12 }}>
              {pressureItems.map(([label, value, status]) => (
                <div
                  key={label}
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: 14,
                    padding: 14,
                  }}
                >
                  <div style={{ fontSize: 13, color: "#6b7280" }}>{label}</div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 6,
                    }}
                  >
                    <div style={{ fontSize: 22, fontWeight: 800 }}>{value}</div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        padding: "4px 10px",
                        borderRadius: 999,
                        background:
                          status === "Elevated"
                            ? "#fef3c7"
                            : status === "Watch"
                            ? "#fee2e2"
                            : "#dcfce7",
                        color:
                          status === "Elevated"
                            ? "#92400e"
                            : status === "Watch"
                            ? "#991b1b"
                            : "#166534",
                      }}
                    >
                      {status}
                    </div>
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
                    <th style={{ paddingBottom: 10 }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {districts.map((d) => (
                    <tr key={d.name} style={{ borderTop: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "12px 0", fontWeight: 700 }}>
                        {d.name}
                      </td>
                      <td style={{ padding: "12px 0" }}>{d.calls}</td>
                      <td style={{ padding: "12px 0" }}>{d.response}</td>
                      <td style={{ padding: "12px 0" }}>{d.utilization}</td>
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
            <h2 style={{ marginTop: 0, fontSize: 22 }}>Leader Briefing</h2>
            <ul
              style={{
                paddingLeft: 20,
                margin: 0,
                color: "#374151",
                lineHeight: 1.8,
              }}
            >
              {leadersBrief.map((item) => (
                <li key={item} style={{ marginBottom: 10 }}>
                  {item}
                </li>
              ))}
            </ul>
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
            This dashboard becomes significantly more valuable when it can move
            beyond static incident records and begin to understand what actually
            happened on scene, during transport, and at handoff.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 14,
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
    </main>
  );
}
