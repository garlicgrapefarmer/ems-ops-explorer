"use client";
import React from "react";

type NewsItem = {
  title: string;
  link: string;
  source: string;
  pubDate: string;
};

type WeatherAlert = {
  id: string;
  event: string;
  areaDesc: string;
  severity: string;
  effective: string;
  expires: string;
};

type AirQualityObservation = {
  area: string;
  category: string;
  aqi: number;
  pollutant: string;
};

type Role = "Chief" | "Operations" | "Medic" | "Community";

type Topic =
  | "all"
  | "bodyworn"
  | "documentation"
  | "safety"
  | "operations"
  | "quality";

function CommsPanel() {
  const [lane, setLane] = React.useState<"news" | "research">("news");
  const [topic, setTopic] = React.useState<Topic>("all");
  const [news, setNews] = React.useState<NewsItem[]>([]);

  React.useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("/api/news");
        const data = await res.json();
        setNews(data.headlines || []);
      } catch (err) {
        console.error(err);
        setNews([]);
      }
    }

    fetchNews();
  }, []);

  const researchBriefs: Record<
    Topic,
    { title: string; summary: string; whyItMatters: string }[]
  > = {
    all: [
      {
        title: "Documentation burden affects more than paperwork",
        summary:
          "Across prehospital and adjacent healthcare settings, documentation load is increasingly viewed as an operational drag, not just a clerical nuisance.",
        whyItMatters:
          "Chiefs should think about documentation as a contributor to availability, morale, and cognitive overload in the field.",
      },
      {
        title: "Responder safety is a leadership signal",
        summary:
          "Research and field learning continue to reinforce that violence exposure, near-misses, and scene-risk patterns deserve executive visibility.",
        whyItMatters:
          "Safety should sit beside operations and quality, not off to the side as a separate conversation.",
      },
      {
        title: "Handoff friction shapes system performance",
        summary:
          "Offload and transition delays continue to matter because they erode recovery capacity and distort downstream response performance.",
        whyItMatters:
          "Even a system with acceptable top-line metrics can still feel strained if crews are losing time at handoff.",
      },
      {
        title: "Learning systems outperform blame systems",
        summary:
          "The strongest improvement cultures connect incident review, quality surveillance, and leadership feedback loops.",
        whyItMatters:
          "A chief-facing product should support learning and pattern recognition, not just retrospective reporting.",
      },
    ],
    bodyworn: [
      {
        title: "Body-worn tools land best when framed as workflow support",
        summary:
          "The strongest case is usually not simple recording. It is safety, review, timeline reconstruction, and reduced duplicate work.",
        whyItMatters:
          "This is the wedge that makes body-worn technology feel practical rather than gimmicky.",
      },
      {
        title: "Video and audio strengthen post-event understanding",
        summary:
          "Reviewable scene context can improve supervision, training, and quality conversations when used carefully.",
        whyItMatters:
          "Chiefs gain a better view of what truly happened, not just what coded fields imply happened.",
      },
      {
        title: "Governance drives adoption",
        summary:
          "Programs succeed when privacy, trust, policy, field value, and executive intent are aligned early.",
        whyItMatters:
          "Adoption risk is often less technical than organizational.",
      },
      {
        title: "Timeline fidelity may be the hidden prize",
        summary:
          "Body-worn and fixed-video environments become more valuable when they help reconstruct sequence, interruptions, and decision burden.",
        whyItMatters:
          "That supports both safety learning and operational intelligence.",
      },
    ],
    documentation: [
      {
        title: "Ambient documentation is gaining credibility",
        summary:
          "Interest is strongest where it reduces charting duplication and lowers end-of-shift documentation drag.",
        whyItMatters:
          "This is one of the cleanest AI use cases for paramedic leadership to understand and sponsor.",
      },
      {
        title: "AI drafting works best with human review",
        summary:
          "The most credible pathway is draft support plus clinician oversight, not fully automated record creation.",
        whyItMatters:
          "That balance protects quality while still reducing burden.",
      },
      {
        title: "Documentation is also a cognitive-load problem",
        summary:
          "It competes with memory, attention, and recovery for field clinicians operating in imperfect environments.",
        whyItMatters:
          "Reducing documentation friction can improve both workforce experience and system flow.",
      },
      {
        title: "ePCR burden affects operations indirectly",
        summary:
          "Time spent documenting influences unit availability and can worsen perceived system strain.",
        whyItMatters:
          "Chiefs should see documentation as an operational lever, not just a compliance function.",
      },
    ],
    safety: [
      {
        title: "Violence exposure is not an edge case",
        summary:
          "Assaults, threats, and scene-risk patterns continue to show up as recurring themes in field safety discussions.",
        whyItMatters:
          "A leadership view that ignores safety intelligence is incomplete.",
      },
      {
        title: "Near-miss visibility matters",
        summary:
          "Organizations improve faster when they can see recurring weak signals before catastrophic events occur.",
        whyItMatters:
          "Trend detection is often more valuable than isolated storytelling.",
      },
      {
        title: "Safety belongs in executive operations",
        summary:
          "The strongest safety conversations happen when leadership sees safety alongside geography, dispatch, and workload.",
        whyItMatters:
          "That supports smarter intervention instead of generic awareness.",
      },
      {
        title: "Field confidence is shaped by what leaders can see",
        summary:
          "Safety culture strengthens when crews believe leaders can understand context, not just outcomes.",
        whyItMatters:
          "Visibility and trust are linked.",
      },
    ],
    operations: [
      {
        title: "Late calls are a leading signal",
        summary:
          "Late-call burden is often one of the clearest visible markers of strain before broader deterioration appears.",
        whyItMatters:
          "Chiefs can use it as an early warning, not just a lagging metric.",
      },
      {
        title: "Mutual aid acts like a pressure-release valve",
        summary:
          "Increasing reliance on mutual aid often reflects deeper availability and coverage problems.",
        whyItMatters:
          "It should be interpreted as signal, not just event count.",
      },
      {
        title: "Command views must compress complexity",
        summary:
          "Leadership tools are more useful when they summarize what matters instead of reproducing every feed.",
        whyItMatters:
          "Chiefs need fast understanding, not another login-heavy reporting environment.",
      },
      {
        title: "Operational drag is usually multi-factor",
        summary:
          "Dispatch, handoff, availability, geography, and workload often interact rather than fail independently.",
        whyItMatters:
          "The best dashboards make those relationships legible.",
      },
    ],
    quality: [
      {
        title: "Sentinel review remains essential",
        summary:
          "High-value quality monitoring still centers on clinically and operationally meaningful events, not just broad scorecards.",
        whyItMatters:
          "This keeps leadership attention on what truly matters.",
      },
      {
        title: "Quality signals strengthen when paired with operations",
        summary:
          "Reviewing quality apart from delay, staffing, geography, and workload often hides the real story.",
        whyItMatters:
          "Executives need integrated context, not separate silos.",
      },
      {
        title: "Improvement cultures rely on pattern recognition",
        summary:
          "Single events matter, but repeated weak signals usually tell the more strategic story.",
        whyItMatters:
          "That is where a chief-facing product becomes genuinely valuable.",
      },
      {
        title: "Leadership needs usable summaries",
        summary:
          "Quality intelligence lands best when translated into a few plain-language implications and watch items.",
        whyItMatters:
          "That is what enables action.",
      },
    ],
  };

  const filteredNews = React.useMemo(() => {
    const words: Record<Topic, string[]> = {
      all: ["ems", "paramedic", "ambulance", "prehospital"],
      bodyworn: ["body", "camera", "bodycam", "video", "audio"],
      documentation: ["documentation", "chart", "scribe", "note", "ambient"],
      safety: ["safety", "violence", "assault", "risk", "injury"],
      operations: ["operations", "response", "offload", "dispatch", "mutual"],
      quality: ["quality", "sentinel", "review", "outcome", "improvement"],
    };

    if (topic === "all") {
      return news.slice(0, 6);
    }

    const scored = news.map((item) => {
      const title = item.title.toLowerCase();
      let score = 0;
      for (const word of words[topic]) {
        if (title.includes(word)) score += 1;
      }
      return { item, score };
    });

    return scored
      .sort((a, b) => b.score - a.score)
      .map((x) => x.item)
      .slice(0, 6);
  }, [news, topic]);

  const chipStyle = (active: boolean) => ({
    ...styles.chip,
    background: active ? "#111827" : "#f3f4f6",
    color: active ? "#ffffff" : "#111827",
    border: active ? "1px solid #111827" : "1px solid #d1d5db",
  });

  return (
    <div style={styles.panel}>
      <div style={styles.panelHeaderRow}>
        <h2 style={styles.sectionTitle}>Global Field Signals</h2>
      </div>
      <section style={styles.section}>
        <div style={styles.sectionHeaderRow}>
          <div>
            <div style={styles.sectionEyebrow}>LIVE OPERATIONAL ENVIRONMENT</div>
            <h2 style={styles.sectionTitle}>Regional System Pulse</h2>
          </div>

          <div
            style={{
              padding: "8px 14px",
              borderRadius: 999,
              background: "#122033",
              color: "#d7e3f4",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            RURAL OPS VIEW
          </div>
        </div>

        <div style={styles.signalGrid}>
          <div style={styles.signalCard}>
            <div style={styles.signalLabel}>Respiratory Trend</div>
            <div style={styles.signalValue}>↑ Moderate</div>
            <div style={styles.signalNote}>
              Regional respiratory activity elevated across schools and LTC.
            </div>
          </div>

          <div style={styles.signalCard}>
            <div style={styles.signalLabel}>Transfer Delays</div>
            <div style={styles.signalValue}>42 min avg</div>
            <div style={styles.signalNote}>
              Critical access hospital transfers trending above baseline.
            </div>
          </div>

          <div style={styles.signalCard}>
            <div style={styles.signalLabel}>Community Paramedicine</div>
            <div style={styles.signalValue}>31 avoided ED trips</div>
            <div style={styles.signalNote}>
              Care-in-place activity increasing across rural service area.
            </div>
          </div>

          <div style={styles.signalCard}>
            <div style={styles.signalLabel}>Mutual Aid Load</div>
            <div style={styles.signalValue}>Stable</div>
            <div style={styles.signalNote}>
              No significant cross-county surge dependency detected today.
            </div>
          </div>
        </div>
      </section>
      <p style={styles.sectionIntro}>
        Quick morning awareness for chiefs who want both the live signal and the
        research-minded interpretation.
      </p>

      <div style={styles.chipWrap}>
        {[
          ["news", "Live News"],
          ["research", "Research Brief"],
        ].map(([value, label]) => (
          <button
            key={value}
            onClick={() => setLane(value as "news" | "research")}
            style={chipStyle(lane === value)}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={styles.chipWrap}>
        {[
          ["all", "All"],
          ["bodyworn", "Body Worn"],
          ["documentation", "Documentation"],
          ["safety", "Safety"],
          ["operations", "Operations"],
          ["quality", "Quality"],
        ].map(([value, label]) => (
          <button
            key={value}
            onClick={() => setTopic(value as Topic)}
            style={chipStyle(topic === value)}
          >
            {label}
          </button>
        ))}
      </div>

      {lane === "news" ? (
        <div style={styles.stack10}>
          {filteredNews.length ? (
            filteredNews.map((item, idx) => (
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
          ) : (
            <div style={styles.subCard}>
              <div style={styles.signalText}>
                No live headlines available right now.
              </div>
            </div>
          )}
        </div>
      ) : (
        <div style={styles.stack10}>
          {researchBriefs[topic].map((item, idx) => (
            <div key={idx} style={styles.subCard}>
              <div style={styles.peerTitle}>{item.title}</div>
              <div style={styles.signalText}>{item.summary}</div>
              <div style={{ ...styles.metaText, marginTop: 8 }}>
                Why it matters: {item.whyItMatters}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function OperationalEnvironment({ intro }: { intro: string }) {
  const [alerts, setAlerts] = React.useState<WeatherAlert[]>([]);
  const [weatherUpdated, setWeatherUpdated] = React.useState("");
  const [airQuality, setAirQuality] = React.useState<AirQualityObservation[]>(
    []
  );
  const [airUpdated, setAirUpdated] = React.useState("");
  const [activeDomain, setActiveDomain] = React.useState("Weather Alerts");

  React.useEffect(() => {
    async function fetchWeatherAlerts() {
      try {
        const res = await fetch("/api/weather-alerts");
        const data = await res.json();
        setAlerts(data.alerts || []);
        setWeatherUpdated(data.lastUpdated || "");
      } catch (err) {
        console.error(err);
        setAlerts([]);
        setWeatherUpdated("");
      }
    }

    async function fetchAirQuality() {
      try {
        const res = await fetch("/api/air-quality");
        const data = await res.json();
        setAirQuality(data.observations || []);
        setAirUpdated(data.lastUpdated || "");
      } catch (err) {
        console.error(err);
        setAirQuality([]);
        setAirUpdated("");
      }
    }

    fetchWeatherAlerts();
    fetchAirQuality();
  }, []);

  const territories = ["River Valley", "Prairie Lakes", "South Central", "Bluff Country"];

  const formatDateTime = (value: string) =>
    value
      ? new Date(value).toLocaleString([], {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        })
      : "Not reported";

  const mostRelevantAqi = airQuality.find(
    (item) => item.category === "Moderate"
  ) || airQuality[0];

  const environmentSignals: {
    title: string;
    value: string;
    note: string;
    territoryRisk: Record<string, string>;
  }[] = [
    {
      title: "Weather Alerts",
      value: alerts.length ? `${alerts.length} Active` : "No Active Alerts",
      note: alerts.length
        ? `${alerts[0].event} reported in the corridor.`
        : "Live Minnesota alert feed shows no active corridor alerts.",
      territoryRisk: {
        "River Valley": alerts.length ? "Watch" : "Clear",
        "Prairie Lakes": "Clear",
        "South Central": alerts.length ? "Advisory" : "Clear",
        "Bluff Country": alerts.length ? "Watch" : "Clear",
      },
    },
    {
      title: "Air Quality",
      value: mostRelevantAqi
        ? `${mostRelevantAqi.category} AQI ${mostRelevantAqi.aqi}`
        : "Moderate AQI",
      note: "Regional air quality observations highlight smoke and respiratory risk.",
      territoryRisk: {
        "River Valley": "Good",
        "Prairie Lakes": "Moderate",
        "South Central": "Moderate",
        "Bluff Country": "Good",
      },
    },
    {
      title: "Respiratory Trend",
      value: "Elevated",
      note: "CDC-inspired surveillance language flags rising respiratory demand.",
      territoryRisk: {
        "River Valley": "Elevated",
        "Prairie Lakes": "Moderate",
        "South Central": "Elevated",
        "Bluff Country": "Stable",
      },
    },
    {
      title: "Rural Access",
      value: "Watch",
      note: "Long transport distances and transfer delays increase regional coverage risk.",
      territoryRisk: {
        "River Valley": "Watch",
        "Prairie Lakes": "Stable",
        "South Central": "Watch",
        "Bluff Country": "Strained",
      },
    },
  ];

  const healthPulse = [
    {
      title: "Respiratory Trend",
      value: "Elevated",
      note: "Syndromic indicators suggest increased respiratory call pressure.",
    },
    {
      title: "Influenza Activity",
      value: "Regional",
      note: "Influenza-like illness remains present across care settings.",
    },
    {
      title: "Vulnerable Population Stress",
      value: "Watch",
      note: "Older adults and chronic disease patients may need care-in-place follow-up.",
    },
  ];

  const activeSignal =
    environmentSignals.find((signal) => signal.title === activeDomain) ||
    environmentSignals[0];

  const riskStyle = (value: string) => ({
    ...styles.riskBadge,
    background:
      value === "Clear" || value === "Good" || value === "Stable"
        ? "#dcfce7"
        : value === "Moderate" || value === "Advisory" || value === "Watch"
        ? "#fef3c7"
        : "#fee2e2",
    color:
      value === "Clear" || value === "Good" || value === "Stable"
        ? "#166534"
        : value === "Moderate" || value === "Advisory" || value === "Watch"
        ? "#92400e"
        : "#991b1b",
  });

  return (
    <div style={styles.panel}>
      <div style={styles.panelHeaderRow}>
        <h2 style={styles.sectionTitle}>Operational Environment</h2>
      </div>
      <p style={styles.sectionIntro}>{intro}</p>
      <p style={styles.sectionIntro}>
        Live environmental/public health feeds paired with operational prototype
        metrics for a Southern Minnesota rural EMS corridor.
      </p>

      <div style={styles.signalGrid}>
        {environmentSignals.map((signal) => (
          <button
            key={signal.title}
            onClick={() => setActiveDomain(signal.title)}
            style={{
              ...styles.signalCard,
              border:
                activeDomain === signal.title
                  ? "2px solid #111827"
                  : "1px solid #e5e7eb",
            }}
          >
            <div style={styles.signalLabel}>{signal.title}</div>
            <div style={styles.kpiValue}>{signal.value}</div>
            <div style={styles.signalNote}>{signal.note}</div>
          </button>
        ))}
      </div>

      <div style={styles.detailCard}>
        <div style={styles.detailLabel}>{activeSignal.title} by Territory</div>
        <div style={styles.detailText}>
          This domain helps leaders understand where environmental and community
          conditions may affect call volume, transport time, or care-in-place
          demand.
        </div>
        <div style={styles.supportList}>
          {territories.map((territory) => (
            <div key={territory} style={styles.territoryItem}>
              <div style={styles.peerTitle}>{territory}</div>
              <span style={riskStyle(activeSignal.territoryRisk[territory])}>
                {activeSignal.territoryRisk[territory]}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ ...styles.detailCard, marginTop: 10 }}>
        <div style={styles.detailLabel}>Regional Alert Feed</div>
        <div style={{ ...styles.metaText, marginBottom: 10 }}>
          Last updated: {formatDateTime(weatherUpdated)}
        </div>
        <div style={styles.stack10}>
          {alerts.length ? (
            alerts.slice(0, 3).map((alert) => (
              <div key={alert.id} style={styles.supportItem}>
                <div style={styles.peerTitle}>{alert.event}</div>
                <div style={styles.metaText}>Severity: {alert.severity}</div>
                <div style={styles.metaText}>Affected region: {alert.areaDesc}</div>
                <div style={styles.metaText}>
                  Expires: {formatDateTime(alert.expires)}
                </div>
              </div>
            ))
          ) : (
            <div style={styles.signalText}>
              No active regional weather alerts.
            </div>
          )}
        </div>
      </div>

      <div style={{ ...styles.detailCard, marginTop: 10 }}>
        <div style={styles.detailLabel}>Air Quality Feed</div>
        <div style={{ ...styles.metaText, marginBottom: 10 }}>
          Last updated: {formatDateTime(airUpdated)}
        </div>
        <div style={styles.supportList}>
          {airQuality.length ? (
            airQuality.map((item) => (
              <div key={item.area} style={styles.territoryItem}>
                <div>
                  <div style={styles.peerTitle}>{item.area}</div>
                  <div style={styles.metaText}>
                    Primary pollutant: {item.pollutant}
                  </div>
                </div>
                <span style={riskStyle(item.category)}>
                  {item.category} {item.aqi}
                </span>
              </div>
            ))
          ) : (
            <div style={styles.signalText}>
              Air quality observations are temporarily unavailable.
            </div>
          )}
        </div>
      </div>

      <div style={{ ...styles.detailCard, marginTop: 10 }}>
        <div style={styles.detailLabel}>Community Health Pulse</div>
        <div style={styles.signalGrid}>
          {healthPulse.map((item) => (
            <div key={item.title} style={styles.supportItem}>
              <div style={styles.signalLabel}>{item.title}</div>
              <div style={styles.signalValue}>{item.value}</div>
              <div style={styles.signalNote}>{item.note}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [role, setRole] = React.useState<Role>("Chief");
  const [pulse, setPulse] = React.useState<number | null>(null);
  const [activeSignal, setActiveSignal] = React.useState("lateCalls");

  const pulseLabels = ["Calm", "Manageable", "Mixed", "Strained", "On fire"];

  const roleCopy: Record<
    Role,
    {
      summary: string;
      pulseIntro: string;
      pulseMarked: string;
      environmentIntro: string;
      topSignalsIntro: string;
      detailLens: string;
      callMixIntro: string;
    }
  > = {
    Chief: {
      summary:
        "Executive view of sustainability, regional strain, mutual aid exposure, and care-in-place impact across a Southern Minnesota rural corridor.",
      pulseIntro:
        "A quick executive read on whether the system is sustainable today.",
      pulseMarked: "Executive perspective marked today as",
      environmentIntro:
        "Southern Minnesota corridor view for a rural multi-county system, with emphasis on sustainability, mutual aid exposure, and care-in-place demand.",
      topSignalsIntro:
        "The three signals most likely to shape executive visibility and regional sustainability.",
      detailLens:
        "Chief lens: connect strain, mutual aid, and care-in-place impact before they become board-level problems.",
      callMixIntro:
        "Demand mix with care-in-place and longitudinal engagement called out as sustainability levers.",
    },
    Operations: {
      summary:
        "Operations view of transfer delays, response pressure, staffing strain, unit availability, and hospital offload.",
      pulseIntro:
        "A quick operational read on availability, offload drag, and staffing pressure.",
      pulseMarked: "Operations perspective marked today as",
      environmentIntro:
        "Southern Minnesota corridor view for operational leaders watching transfer pressure, unit availability, and hospital offload risk.",
      topSignalsIntro:
        "The three signals most likely to affect response coverage, staffing strain, and transfer flow.",
      detailLens:
        "Operations lens: translate weak signals into deployment, staging, and offload decisions.",
      callMixIntro:
        "Demand mix showing where emergency response, transfers, and CP work compete for available units.",
    },
    Medic: {
      summary:
        "Field view of safety, turnaround burden, CP referrals, practical awareness, and usefulness on shift.",
      pulseIntro:
        "A quick field read on whether the day feels workable from the truck.",
      pulseMarked: "Field perspective marked today as",
      environmentIntro:
        "Southern Minnesota corridor view for field crews watching practical risks that shape scene safety, turnaround, and CP referral opportunities.",
      topSignalsIntro:
        "The three signals most likely to affect field safety, turnaround burden, and practical awareness.",
      detailLens:
        "Medic lens: make the dashboard useful for what crews can feel in real time, not only what leaders review later.",
      callMixIntro:
        "Demand mix showing emergency work, handoff burden, and CP referrals that can reduce repeat low-acuity calls.",
    },
    Community: {
      summary:
        "Community view of transparency, access to care, community paramedicine, aging in place, and regional readiness.",
      pulseIntro:
        "A plain-language read on regional health readiness and access to care.",
      pulseMarked: "Community perspective marked today as",
      environmentIntro:
        "Southern Minnesota corridor view for public stakeholders watching access, aging-in-place support, and community health readiness.",
      topSignalsIntro:
        "The three signals most likely to affect access to care, transparency, and community readiness.",
      detailLens:
        "Community lens: show how EMS system pressure connects to care access, aging in place, and regional readiness.",
      callMixIntro:
        "Demand mix showing how community paramedicine and follow-up work support access outside the emergency department.",
    },
  };

  const activeRoleCopy = roleCopy[role];

  const topCards = [
    { title: "Calls (24h)", value: "412", note: "vs prior 24h +8.4%" },
    { title: "Response Time", value: "8m 18s", note: "priority incidents" },
    { title: "UHU", value: "0.46", note: "systemwide watch" },
    { title: "Mutual Aid", value: "6.2%", note: "last 7 days" },
  ];

  const callMix = [
    {
      label: "911 Emergency",
      value: "312",
      note: "Immediate response demand",
      metrics: ["Treat & Release: 12%", "Referred to CP Follow-up: 8%"],
    },
    {
      label: "Interfacility Transport",
      value: "86",
      note: "Transfer and hospital flow pressure",
      metrics: ["Long-distance transfers: 19", "Delayed pickups: 11"],
    },
    {
      label: "Community Paramedicine",
      value: "64",
      note: "Care-in-place and longitudinal engagement",
      metrics: [
        "Transitional Care Management: 18",
        "Chronic Care Management: 27",
        "Post-discharge follow-up: 31",
        "Avoided ED visits: 22",
      ],
    },
  ];

  const signals = [
    {
      id: "lateCalls",
      title: "Late Calls Rising",
      level: "Watch",
      summary:
        "Late-call burden has increased in the central district and is now one of the clearest visible markers of system strain.",
      detailTitle: "What this likely means",
      detail:
        "Demand is outrunning timely unit availability during peak periods. The issue is visible enough to affect service confidence even though top-line performance still appears acceptable.",
      support: [
        "Late calls >10 min: 18%",
        "Most affected territory: South Central",
        "Direction versus prior week: Up",
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
        "When crews stay tied up at handoff, the system loses recovery capacity. That pushes late calls up and increases the chance of leaning on mutual aid.",
      support: [
        "Offload delay >30 min: 14%",
        "Pressure window: late morning to early afternoon",
        "Likely effect: coverage compression",
      ],
    },
    {
      id: "mutualAid",
      title: "Mutual Aid Dependence",
      level: "Watch",
      summary:
        "Mutual aid use is not yet critical, but it is increasingly acting as a pressure-release valve for underlying availability problems.",
      detailTitle: "Operational takeaway",
      detail:
        "This is the kind of signal a chief wants to see early because it often reflects deeper system strain before broader deterioration becomes obvious.",
      support: [
        "Mutual aid reliance: 6.2%",
        "Direction: Up",
        "Interpretation: strain is growing, not collapse",
      ],
    },
  ];

  const districtRows = [
    {
      name: "River Valley",
      calls: 126,
      response: "7m 11s",
      uhu: "0.58",
      mutualAid: "High",
      status: "Strained",
    },
    {
      name: "Prairie Lakes",
      calls: 81,
      response: "8m 42s",
      uhu: "0.44",
      mutualAid: "Low",
      status: "Stable",
    },
    {
      name: "South Central",
      calls: 92,
      response: "9m 28s",
      uhu: "0.49",
      mutualAid: "Moderate",
      status: "Watch",
    },
    {
      name: "Bluff Country",
      calls: 113,
      response: "8m 02s",
      uhu: "0.41",
      mutualAid: "Low",
      status: "Stable",
    },
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
    flexShrink: 0,
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
          <div style={styles.heroSubtitle}>
            Territory: Southern Minnesota Rural EMS Corridor
          </div>
          <div style={styles.heroText}>
            {activeRoleCopy.summary}
          </div>
        </div>

        <div style={styles.rolePanel}>
          <div style={styles.roleEyebrow}>Perspective</div>
          <div style={styles.roleTabs} role="tablist" aria-label="Dashboard perspective">
            {(["Chief", "Operations", "Medic", "Community"] as Role[]).map(
              (roleName) => (
                <button
                  key={roleName}
                  type="button"
                  role="tab"
                  aria-selected={role === roleName}
                  onClick={() => setRole(roleName)}
                  style={{
                    ...styles.roleTab,
                    background: role === roleName ? "#111827" : "#ffffff",
                    color: role === roleName ? "#ffffff" : "#374151",
                    border:
                      role === roleName
                        ? "1px solid #111827"
                        : "1px solid #d1d5db",
                  }}
                >
                  {roleName}
                </button>
              )
            )}
          </div>
        </div>

        <div style={styles.panel}>
          <div style={styles.panelHeaderRow}>
            <h2 style={styles.sectionTitle}>System Pulse</h2>
          </div>
          <p style={styles.sectionIntro}>{activeRoleCopy.pulseIntro}</p>

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
                <div style={{ fontSize: 22, lineHeight: 1 }}>{emoji}</div>
                <div style={styles.pulseLabel}>{pulseLabels[idx]}</div>
              </button>
            ))}
          </div>

          <div style={styles.metaText}>
            {pulse === null
              ? "Tap a quick read on the day."
              : `${activeRoleCopy.pulseMarked}: ${pulseLabels[pulse]}.`}
          </div>
        </div>

        <OperationalEnvironment intro={activeRoleCopy.environmentIntro} />

        <div style={styles.panel}>
          <div style={styles.panelHeaderRow}>
            <h2 style={styles.sectionTitle}>Top Signals</h2>
          </div>
          <p style={styles.sectionIntro}>{activeRoleCopy.topSignalsIntro}</p>

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
            <div style={{ ...styles.metaText, marginBottom: 10 }}>
              {activeRoleCopy.detailLens}
            </div>

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

        <div style={styles.panel}>
          <div style={styles.panelHeaderRow}>
            <h2 style={styles.sectionTitle}>Call Mix</h2>
          </div>
          <p style={styles.sectionIntro}>{activeRoleCopy.callMixIntro}</p>

          <div style={styles.signalGrid}>
            {callMix.map((item) => (
              <div key={item.label} style={styles.callMixCard}>
                <div style={styles.signalHeaderRow}>
                  <div>
                    <div style={styles.kpiLabel}>{item.label}</div>
                    <div style={styles.kpiValue}>{item.value}</div>
                  </div>
                  <div style={styles.callMixNote}>{item.note}</div>
                </div>
                <div style={styles.supportList}>
                  {item.metrics.map((metric) => (
                    <div key={metric} style={styles.supportItem}>
                      {metric}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={styles.signalText}>
            Care-in-place and longitudinal engagement reduce avoidable transport,
            protect unit availability, and improve rural sustainability.
          </div>
        </div>

        <CommsPanel />

        <div style={styles.panel}>
          <div style={styles.panelHeaderRow}>
            <h2 style={styles.sectionTitle}>District Performance</h2>
          </div>
          <p style={styles.sectionIntro}>
            Mobile-safe district view without a wide table.
          </p>

          <div style={styles.stack10}>
            {districtRows.map((d) => (
              <div key={d.name} style={styles.subCard}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 10,
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: 16 }}>{d.name}</div>
                  <span style={badgeStyle(d.status)}>{d.status}</span>
                </div>

                <div style={styles.metaText}>Calls: {d.calls}</div>
                <div style={styles.metaText}>Avg Response: {d.response}</div>
                <div style={styles.metaText}>UHU: {d.uhu}</div>
                <div style={styles.metaText}>Mutual Aid: {d.mutualAid}</div>
              </div>
            ))}
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
    padding: 10,
    overflowX: "hidden",
    width: "100%",
    maxWidth: "100vw",
    boxSizing: "border-box",
  },

  container: {
    maxWidth: 920,
    width: "100%",
    margin: "0 auto",
    display: "grid",
    gap: 10,
    minWidth: 0,
    boxSizing: "border-box",
  },

  hero: {
    background: "#111827",
    color: "#ffffff",
    borderRadius: 18,
    padding: 14,
    boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
    minWidth: 0,
    overflow: "hidden",
    boxSizing: "border-box",
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
    fontSize: 24,
    fontWeight: 800,
    lineHeight: 1.1,
    marginBottom: 8,
    overflowWrap: "anywhere",
  },

  heroSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.82)",
    marginBottom: 10,
    overflowWrap: "anywhere",
  },

  heroText: {
    fontSize: 14,
    lineHeight: 1.55,
    color: "rgba(255,255,255,0.9)",
    overflowWrap: "anywhere",
  },

  panel: {
    background: "#ffffff",
    borderRadius: 18,
    padding: 12,
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
    minWidth: 0,
    overflow: "hidden",
    boxSizing: "border-box",
  },

  rolePanel: {
    background: "#ffffff",
    borderRadius: 18,
    padding: 10,
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
    minWidth: 0,
    overflow: "hidden",
    boxSizing: "border-box",
  },

  roleEyebrow: {
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: "#6b7280",
    marginBottom: 8,
    paddingLeft: 2,
  },

  roleTabs: {
    display: "flex",
    gap: 8,
    overflowX: "auto",
    WebkitOverflowScrolling: "touch",
    paddingBottom: 2,
    minWidth: 0,
  },

  roleTab: {
    borderRadius: 999,
    padding: "10px 14px",
    fontSize: 13,
    fontWeight: 800,
    cursor: "pointer",
    whiteSpace: "nowrap",
    flex: "0 0 auto",
    minHeight: 40,
    boxSizing: "border-box",
  },

  panelHeaderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    marginBottom: 6,
    minWidth: 0,
  },

  sectionTitle: {
    margin: 0,
    fontSize: 19,
    lineHeight: 1.2,
    minWidth: 0,
    overflowWrap: "anywhere",
  },

  sectionIntro: {
    marginTop: 0,
    marginBottom: 12,
    color: "#6b7280",
    lineHeight: 1.5,
    fontSize: 14,
    overflowWrap: "anywhere",
  },

  pulseRow: {
    display: "grid",
    gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
    gap: 6,
    marginBottom: 8,
    minWidth: 0,
  },

  pulseButton: {
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: "8px 4px",
    cursor: "pointer",
    minWidth: 0,
    boxSizing: "border-box",
  },

  pulseLabel: {
    fontSize: 10,
    fontWeight: 700,
    marginTop: 4,
    lineHeight: 1.2,
    overflowWrap: "anywhere",
  },

  signalGrid: {
    display: "grid",
    gap: 10,
    marginBottom: 12,
    minWidth: 0,
  },

  signalCard: {
    background: "#ffffff",
    borderRadius: 14,
    padding: 12,
    textAlign: "left",
    cursor: "pointer",
    minWidth: 0,
    overflow: "hidden",
    boxSizing: "border-box",
  },

  signalHeaderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 8,
    minWidth: 0,
  },

  signalTitle: {
    fontSize: 16,
    fontWeight: 800,
    lineHeight: 1.2,
    minWidth: 0,
    overflowWrap: "anywhere",
  },

  signalLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    fontWeight: 800,
    overflowWrap: "anywhere",
  },

  signalValue: {
    fontSize: 20,
    fontWeight: 800,
    lineHeight: 1.15,
    marginBottom: 8,
    overflowWrap: "anywhere",
  },

  signalNote: {
    fontSize: 13,
    color: "#6b7280",
    lineHeight: 1.45,
    overflowWrap: "anywhere",
  },

  signalSummary: {
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 1.5,
    minWidth: 0,
    overflowWrap: "anywhere",
  },

  detailCard: {
    border: "1px solid #e5e7eb",
    borderRadius: 14,
    padding: 12,
    background: "#fafafa",
    minWidth: 0,
    overflow: "hidden",
    boxSizing: "border-box",
  },

  detailLabel: {
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    color: "#6b7280",
    marginBottom: 8,
    overflowWrap: "anywhere",
  },

  detailText: {
    fontSize: 14,
    lineHeight: 1.55,
    color: "#111827",
    marginBottom: 10,
    overflowWrap: "anywhere",
  },

  supportList: {
    display: "grid",
    gap: 8,
    minWidth: 0,
  },

  supportItem: {
    borderRadius: 10,
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    padding: "10px 12px",
    fontSize: 13,
    color: "#374151",
    minWidth: 0,
    overflowWrap: "anywhere",
    boxSizing: "border-box",
  },

  territoryItem: {
    borderRadius: 10,
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    padding: "10px 12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    minWidth: 0,
    overflow: "hidden",
    boxSizing: "border-box",
  },

  riskBadge: {
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 800,
    lineHeight: 1.2,
    flexShrink: 0,
  },

  kpiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 10,
    minWidth: 0,
  },

  kpiCard: {
    background: "#ffffff",
    borderRadius: 16,
    padding: 12,
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
    minWidth: 0,
    overflow: "hidden",
    boxSizing: "border-box",
  },

  kpiLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    fontWeight: 700,
    overflowWrap: "anywhere",
  },

  kpiValue: {
    fontSize: 22,
    fontWeight: 800,
    lineHeight: 1.1,
    marginBottom: 6,
    overflowWrap: "anywhere",
  },

  kpiNote: {
    fontSize: 12,
    color: "#9ca3af",
    lineHeight: 1.4,
    overflowWrap: "anywhere",
  },

  callMixCard: {
    background: "#ffffff",
    borderRadius: 14,
    padding: 12,
    border: "1px solid #e5e7eb",
    minWidth: 0,
    overflow: "hidden",
    boxSizing: "border-box",
  },

  callMixNote: {
    fontSize: 12,
    color: "#6b7280",
    lineHeight: 1.35,
    textAlign: "right",
    maxWidth: "45%",
    overflowWrap: "anywhere",
  },

  chipWrap: {
    display: "flex",
    gap: 8,
    marginBottom: 10,
    flexWrap: "wrap",
    minWidth: 0,
  },

  chip: {
    padding: "6px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    cursor: "pointer",
    minWidth: 0,
    maxWidth: "100%",
    boxSizing: "border-box",
  },

  subCard: {
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 12,
    background: "#fafafa",
    minWidth: 0,
    overflow: "hidden",
    boxSizing: "border-box",
  },

  newsLink: {
    color: "#111827",
    fontWeight: 700,
    textDecoration: "none",
    display: "block",
    marginBottom: 6,
    lineHeight: 1.4,
    overflowWrap: "anywhere",
  },

  peerTitle: {
    fontSize: 15,
    fontWeight: 800,
    marginBottom: 6,
    lineHeight: 1.3,
    color: "#111827",
    overflowWrap: "anywhere",
  },

  signalText: {
    fontSize: 14,
    lineHeight: 1.55,
    color: "#111827",
    overflowWrap: "anywhere",
  },

  metaText: {
    fontSize: 12,
    color: "#6b7280",
    lineHeight: 1.4,
    overflowWrap: "anywhere",
  },

  stack10: {
    display: "grid",
    gap: 10,
    minWidth: 0,
  },
};
