"use client";
import React from "react";

type NewsItem = {
  title: string;
  link: string;
  source: string;
  pubDate: string;
};

type WeatherAlert = {
  event: string;
  areaDesc: string;
  severity: string;
  expires: string;
};

type RegionalWeatherTerritory = {
  name: string;
  latitude: number;
  longitude: number;
  temperature: number | null;
  shortForecast: string;
  windSpeed: string;
  icon: string | null;
  risk: "Clear" | "Advisory" | "Watch" | "Warning";
  alertCount: number;
};

type AirQualityObservation = {
  area: string;
  category: string;
  aqi: number;
  pollutant: string;
};

type RespiratorySignal = {
  name: string;
  value: string;
  interpretation: string;
};

type Role = "Chief" | "Operations" | "Medic" | "Community";

type Topic =
  | "all"
  | "chief"
  | "operations"
  | "medic"
  | "community"
  | "sustainability";

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
        title: "Rural EMS sustainability is a system signal",
        summary:
          "Leadership teams increasingly need to see response pressure, transfers, community paramedicine, and staffing as one connected operating picture.",
        whyItMatters:
          "The demo should show different perspectives on the same system, not disconnected scorecards.",
      },
      {
        title: "Care-in-place changes the sustainability conversation",
        summary:
          "Community paramedicine, follow-up, and avoided ED use can reduce avoidable transport while supporting vulnerable patients closer to home.",
        whyItMatters:
          "Care-in-place belongs beside response and transfer metrics in a rural command view.",
      },
      {
        title: "Transfer and offload friction shape rural readiness",
        summary:
          "Offload and transition delays continue to matter because they erode recovery capacity and distort downstream response performance.",
        whyItMatters:
          "Even a system with acceptable top-line metrics can still feel strained if crews are losing time at handoff.",
      },
      {
        title: "Public health signals add operational context",
        summary:
          "Weather, air quality, respiratory illness, and access risk help leaders explain why demand feels different from one territory to another.",
        whyItMatters:
          "Live environmental and public health feeds make prototype EMS metrics more credible.",
      },
    ],
    chief: [
      {
        title: "Regional sustainability needs executive visibility",
        summary:
          "Chiefs need a single view of strain, mutual aid exposure, care-in-place activity, and territory-level risk.",
        whyItMatters:
          "Governance conversations improve when leaders can see both operational pressure and sustainability levers.",
      },
      {
        title: "Governance depends on shared operating facts",
        summary:
          "Multi-county EMS regions need common language for risk, transfers, staffing, and public health context.",
        whyItMatters:
          "A shared dashboard can support policy, funding, and partner alignment.",
      },
      {
        title: "Care-in-place economics are strategic",
        summary:
          "Avoided ED visits, transitional care, and chronic care management can shift EMS from pure response cost center toward sustainable service line.",
        whyItMatters:
          "Chiefs need to see CP activity as a sustainability signal, not a side program.",
      },
    ],
    operations: [
      {
        title: "Transfer delays consume regional readiness",
        summary:
          "Interfacility and hospital handoff delays reduce unit availability even when call volume looks manageable.",
        whyItMatters:
          "Operations leaders need early warning before transfer pressure cascades into late calls.",
      },
      {
        title: "Response pressure is uneven by territory",
        summary:
          "Rural corridors can experience high pressure in one area while neighboring territories remain stable.",
        whyItMatters:
          "A stacked territory view helps leaders target staging, coverage, and mutual aid decisions.",
      },
      {
        title: "Staffing strain is an availability problem",
        summary:
          "Staffing pressure shows up through response reliability, turnaround burden, and missed recovery time.",
        whyItMatters:
          "Operations views should connect staffing strain to unit availability, not just shift rosters.",
      },
    ],
    medic: [
      {
        title: "Field safety needs real context",
        summary:
          "Weather, long transports, turnaround burden, and high-utilizer patterns all affect what crews experience in the field.",
        whyItMatters:
          "Medics need practical awareness, not only executive summaries.",
      },
      {
        title: "Workload is more than call count",
        summary:
          "A day with transfers, late calls, documentation burden, and repeat low-acuity demand can feel heavier than raw volume suggests.",
        whyItMatters:
          "The field view should make operational burden visible without blaming crews.",
      },
      {
        title: "Documentation burden affects recovery",
        summary:
          "Charting and handoff work compete with reset time between calls, especially during strained shifts.",
        whyItMatters:
          "A medic-centered dashboard should connect documentation to workload and availability.",
      },
    ],
    community: [
      {
        title: "Access to care is a readiness measure",
        summary:
          "Rural EMS dashboards can help public stakeholders understand where geography, transport distance, and community health needs affect access.",
        whyItMatters:
          "Transparency improves when access is explained in plain operational terms.",
      },
      {
        title: "Aging in place depends on follow-up capacity",
        summary:
          "Post-discharge follow-up, chronic care management, and CP referrals can help older adults remain safely at home.",
        whyItMatters:
          "Community paramedicine is a community readiness tool, not just an EMS add-on.",
      },
      {
        title: "Community paramedicine supports trust",
        summary:
          "Care-in-place programs make EMS visible between emergencies and can reduce avoidable ED use.",
        whyItMatters:
          "Public stakeholders can see how EMS contributes to longitudinal health readiness.",
      },
    ],
    sustainability: [
      {
        title: "TCM can turn follow-up into sustainability",
        summary:
          "Transitional Care Management creates structured post-discharge touchpoints that can reduce avoidable utilization.",
        whyItMatters:
          "TCM makes care-in-place measurable and potentially revenue-supported.",
      },
      {
        title: "CCM supports longitudinal engagement",
        summary:
          "Chronic Care Management can help EMS partners stay connected to patients with recurring needs between acute events.",
        whyItMatters:
          "CCM links patient stability with fewer avoidable responses and transports.",
      },
      {
        title: "Avoidable ED use is an operating signal",
        summary:
          "Avoided ED visits can show where CP services are reducing pressure on ambulances and hospitals.",
        whyItMatters:
          "Sustainability improves when EMS can prove capacity saved, not only calls answered.",
      },
      {
        title: "Revenue-supported CP services need proof",
        summary:
          "Programs are easier to sustain when TCM, CCM, follow-up, and avoided utilization are tracked together.",
        whyItMatters:
          "A credible demo should connect CP activity to both community benefit and financial durability.",
      },
    ],
  };

  const filteredNews = React.useMemo(() => {
    const words: Record<Topic, string[]> = {
      all: ["ems", "paramedic", "ambulance", "prehospital"],
      chief: ["chief", "leadership", "regional", "funding", "governance"],
      operations: ["operations", "response", "offload", "dispatch", "mutual"],
      medic: ["medic", "paramedic", "safety", "workload", "documentation"],
      community: ["community", "access", "aging", "public", "health"],
      sustainability: ["sustainability", "revenue", "avoidable", "chronic", "transitional"],
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
      <p style={styles.sectionIntro}>
        Concise intelligence ticker for the regional EMS operating picture.
      </p>

      <div style={styles.tickerList}>
        <div style={styles.tickerItem}>
          <span style={styles.tickerLabel}>Health</span>
          Respiratory burden may add low-acuity demand and prolong offloads.
        </div>
        <div style={styles.tickerItem}>
          <span style={styles.tickerLabel}>Transfer</span>
          South and east corridor hospitals remain the main friction watch.
        </div>
        <div style={styles.tickerItem}>
          <span style={styles.tickerLabel}>CP</span>
          Care-in-place activity is protecting unit availability.
        </div>
      </div>

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
          ["chief", "Chief"],
          ["operations", "Operations"],
          ["medic", "Medic"],
          ["community", "Community"],
          ["sustainability", "Sustainability"],
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
  const [regionalWeather, setRegionalWeather] = React.useState<
    RegionalWeatherTerritory[]
  >([]);
  const [airQuality, setAirQuality] = React.useState<AirQualityObservation[]>(
    []
  );
  const [airUpdated, setAirUpdated] = React.useState("");
  const [respiratorySignals, setRespiratorySignals] = React.useState<
    RespiratorySignal[]
  >([]);
  const [respiratoryUpdated, setRespiratoryUpdated] = React.useState("");
  const [respiratorySource, setRespiratorySource] = React.useState(
    "CDC/MDH-inspired prototype signal"
  );
  const [activeDomain, setActiveDomain] = React.useState("Weather Alerts");

  React.useEffect(() => {
    async function fetchRegionalWeather() {
      try {
        const res = await fetch("/api/regional-weather");
        const data = await res.json();
        setAlerts(data.alerts || []);
        setRegionalWeather(data.territories || []);
        setWeatherUpdated(data.updatedAt || "");
      } catch (err) {
        console.error(err);
        setAlerts([]);
        setRegionalWeather([]);
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

    async function fetchRespiratorySurveillance() {
      try {
        const res = await fetch("/api/respiratory-surveillance");
        const data = await res.json();
        setRespiratorySignals(data.signals || []);
        setRespiratoryUpdated(data.updatedAt || "");
        setRespiratorySource(data.source || "CDC/MDH-inspired prototype signal");
      } catch (err) {
        console.error(err);
        setRespiratorySignals([]);
        setRespiratoryUpdated("");
        setRespiratorySource("CDC/MDH-inspired prototype signal");
      }
    }

    fetchRegionalWeather();
    fetchAirQuality();
    fetchRespiratorySurveillance();
  }, []);

  const territories = [
    "Rochester / Olmsted",
    "Mankato / Blue Earth",
    "Faribault-Owatonna",
    "Winona / Bluff Country",
  ];

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

  const weatherRiskByTerritory = regionalWeather.reduce<Record<string, string>>(
    (acc, territory) => {
      acc[territory.name] = territory.risk;
      return acc;
    },
    {}
  );

  const respiratoryIndicators = respiratorySignals.length
    ? respiratorySignals
    : [
        {
          name: "Influenza activity",
          value: "Moderate",
          interpretation: "Seasonal flu activity may add low-acuity demand.",
        },
        {
          name: "RSV pressure",
          value: "Watch",
          interpretation: "Pediatric and older-adult respiratory calls may increase.",
        },
        {
          name: "COVID/respiratory ED signal",
          value: "Elevated",
          interpretation: "Respiratory ED burden may affect offload and referral decisions.",
        },
        {
          name: "Expected EMS impact",
          value: "Increased care-in-place need",
          interpretation: "CP follow-up and treat-and-release pathways may protect capacity.",
        },
      ];

  const territoryDetails: Record<
    string,
    Record<
      string,
      { implication: string; impact: string; strain: string }
    >
  > = {
    "Weather Alerts": {
      "Rochester / Olmsted": {
        implication: "Watch for wet roads and short storm windows around shift change.",
        impact: "May slow response and interfacility movement without changing the whole regional posture.",
        strain: "Low to moderate",
      },
      "Mankato / Blue Earth": {
        implication: "Longer west-corridor transports are more exposed to wind and storm timing.",
        impact: "Crews may need extra margin on transfers and mutual aid moves.",
        strain: "Moderate",
      },
      "Faribault-Owatonna": {
        implication: "Weather is not the primary constraint in this territory right now.",
        impact: "Normal response and transfer assumptions remain reasonable.",
        strain: "Low",
      },
      "Winona / Bluff Country": {
        implication: "Bluff terrain can amplify modest weather into access and transport friction.",
        impact: "Scene access, turnout time, and regional coverage recovery may be more fragile.",
        strain: "Moderate",
      },
    },
    "Air Quality": {
      "Rochester / Olmsted": {
        implication: "Air quality is not adding meaningful respiratory pressure.",
        impact: "No special respiratory demand adjustment expected from AQI.",
        strain: "Low",
      },
      "Mankato / Blue Earth": {
        implication: "Moderate AQI may bother COPD, asthma, and older patients.",
        impact: "Expect some added low-acuity assessments and CP follow-up opportunities.",
        strain: "Low to moderate",
      },
      "Faribault-Owatonna": {
        implication: "Moderate AQI overlaps with a territory already sensitive to access pressure.",
        impact: "May increase respiratory assessment volume and care-in-place demand.",
        strain: "Moderate",
      },
      "Winona / Bluff Country": {
        implication: "Air quality is favorable for vulnerable patients.",
        impact: "No AQI-driven EMS demand signal expected.",
        strain: "Low",
      },
    },
    "Acute Health Awareness": {
      "Rochester / Olmsted": {
        implication: "Respiratory illness pressure may increase low-acuity and oxygen-related calls.",
        impact: "Watch SNF clusters, CP referrals, and ED offload delays tied to respiratory burden.",
        strain: "Moderate",
      },
      "Mankato / Blue Earth": {
        implication: "Respiratory demand is present but not yet dominant.",
        impact: "Monitor staffing stress and repeat callers before they become transport friction.",
        strain: "Low to moderate",
      },
      "Faribault-Owatonna": {
        implication: "Elevated trend may combine with transfer friction.",
        impact: "Care-in-place and CP follow-up could preserve units during peak periods.",
        strain: "Moderate",
      },
      "Winona / Bluff Country": {
        implication: "Stable respiratory signal supports baseline planning.",
        impact: "No respiratory-driven surge posture needed, but watch long transport recovery.",
        strain: "Low",
      },
    },
    "Regional Hospital Status": {
      "Rochester / Olmsted": {
        implication: "Regional referral center posture appears manageable.",
        impact: "Turnaround and transfer acceptance should not drive the morning risk picture.",
        strain: "Low",
      },
      "Mankato / Blue Earth": {
        implication: "Transfer friction could slow unit recovery.",
        impact: "Watch queue time, offload delay, and mutual aid exposure.",
        strain: "Moderate",
      },
      "Faribault-Owatonna": {
        implication: "Boarding or transfer delay concepts may affect coverage resilience.",
        impact: "Moderate hospital drag can reduce available EMS coverage.",
        strain: "Moderate",
      },
      "Winona / Bluff Country": {
        implication: "Hospital pressure plus long transport geography creates the sharpest watch item.",
        impact: "Expect slower recovery and higher dependence on neighboring coverage.",
        strain: "Elevated",
      },
    },
  };

  const environmentSignals: {
    title: string;
    icon: string;
    value: string;
    note: string;
    territoryRisk: Record<string, string>;
  }[] = [
    {
      title: "Weather Alerts",
      icon: "⛈️",
      value: alerts.length ? `${alerts.length} Active` : "No Active Alerts",
      note: alerts.length
        ? `${alerts[0].event} reported in the corridor.`
        : "Live NWS forecast and alert feed is clear for these territory points.",
      territoryRisk: {
        "Rochester / Olmsted": weatherRiskByTerritory["Rochester / Olmsted"] || "Clear",
        "Mankato / Blue Earth": weatherRiskByTerritory["Mankato / Blue Earth"] || "Clear",
        "Faribault-Owatonna": weatherRiskByTerritory["Faribault-Owatonna"] || "Clear",
        "Winona / Bluff Country": weatherRiskByTerritory["Winona / Bluff Country"] || "Clear",
      },
    },
    {
      title: "Air Quality",
      icon: "🌫️",
      value: mostRelevantAqi
        ? `${mostRelevantAqi.category} AQI ${mostRelevantAqi.aqi}`
        : "Moderate AQI",
      note: "Prototype public-health layer for smoke and respiratory vulnerability.",
      territoryRisk: {
        "Rochester / Olmsted": "Good",
        "Mankato / Blue Earth": "Moderate",
        "Faribault-Owatonna": "Moderate",
        "Winona / Bluff Country": "Good",
      },
    },
    {
      title: "Acute Health Awareness",
      icon: "🫁",
      value: "Elevated",
      note: "Respiratory-driven call burden and care-in-place demand signal.",
      territoryRisk: {
        "Rochester / Olmsted": "Elevated",
        "Mankato / Blue Earth": "Moderate",
        "Faribault-Owatonna": "Elevated",
        "Winona / Bluff Country": "Stable",
      },
    },
    {
      title: "Regional Hospital Status",
      icon: "🏥",
      value: "Moderate Transfer Strain",
      note: "Prototype posture for transfer friction, boarding, and offload pressure.",
      territoryRisk: {
        "Rochester / Olmsted": "Stable",
        "Mankato / Blue Earth": "Watch",
        "Faribault-Owatonna": "Watch",
        "Winona / Bluff Country": "Strained",
      },
    },
  ];

  const activeSignal =
    environmentSignals.find((signal) => signal.title === activeDomain) ||
    environmentSignals[0];

  const activeTerritoryDetails = territoryDetails[activeSignal.title] || {};

  const weatherByTerritory = regionalWeather.reduce<
    Record<string, RegionalWeatherTerritory>
  >((acc, territory) => {
    acc[territory.name] = territory;
    return acc;
  }, {});

  const territoryOverlays: Record<string, string[]> = {
    "Rochester / Olmsted": ["Weather", "Respiratory"],
    "Mankato / Blue Earth": ["Hospital", "Air Quality"],
    "Faribault-Owatonna": ["Hospital", "Respiratory"],
    "Winona / Bluff Country": ["Hospital", "Weather"],
  };

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
      <div style={styles.liveFeedLine}>
        Live public feeds + prototype EMS operating metrics
      </div>

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
            <div style={styles.domainHeader}>
              <span style={styles.domainIcon}>{signal.icon}</span>
              <div style={styles.signalLabel}>{signal.title}</div>
            </div>
            <div style={styles.kpiValue}>{signal.value}</div>
            <div style={styles.signalNote}>{signal.note}</div>
          </button>
        ))}
      </div>

      <div style={styles.detailCard}>
        <div style={styles.detailHeaderRow}>
          <div style={styles.detailLabel}>
            {activeSignal.title}: Territory Impacts
          </div>
          <span style={styles.liveBadge}>
            {activeSignal.title === "Weather Alerts" ? "NWS" : "Ops posture"}
          </span>
        </div>
        <div style={{ ...styles.metaText, marginBottom: 10 }}>
          {activeSignal.title === "Weather Alerts"
            ? `Last updated: ${formatDateTime(weatherUpdated)}`
            : activeSignal.title === "Acute Health Awareness"
            ? `CDC/MDH-inspired prototype signal. Last updated: ${formatDateTime(
                respiratoryUpdated
              )}`
            : activeSignal.title === "Regional Hospital Status"
            ? "Prototype operating posture. Future integrations could connect transfer queues, diversion status, offload delay, and boarding signals."
            : `Prototype public-health layer. Last updated: ${formatDateTime(
                airUpdated
              )}`}
        </div>
        <div style={styles.supportList}>
          {territories.map((territory) => (
            <div key={territory} style={styles.drillCard}>
              <div style={styles.drillTopRow}>
                <div style={styles.peerTitle}>{territory}</div>
                <span style={riskStyle(activeSignal.territoryRisk[territory])}>
                  {activeSignal.territoryRisk[territory]}
                </span>
              </div>
              <div style={styles.overlayRow}>
                {(territoryOverlays[territory] || []).map((overlay) => (
                  <span key={overlay} style={styles.overlayPill}>
                    {overlay}
                  </span>
                ))}
              </div>
              {activeSignal.title === "Weather Alerts" ? (
                <div style={styles.compactWeatherLine}>
                  {weatherByTerritory[territory]?.temperature === null ||
                  !weatherByTerritory[territory]
                    ? ""
                    : `${weatherByTerritory[territory].temperature}°F · `}
                  {weatherByTerritory[territory]?.shortForecast ||
                    "Forecast pending"}
                </div>
              ) : null}
              <div style={styles.signalText}>
                {activeTerritoryDetails[territory]?.implication}
              </div>
              <div style={{ ...styles.metaText, marginTop: 8 }}>
                EMS impact: {activeTerritoryDetails[territory]?.impact}
              </div>
              <div style={{ ...styles.metaText, marginTop: 4 }}>
                Expected strain: {activeTerritoryDetails[territory]?.strain}
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeSignal.title === "Weather Alerts" ? (
        <div style={{ ...styles.detailCard, marginTop: 10 }}>
          <div style={styles.detailLabel}>Active Weather Watch Items</div>
          <div style={styles.stack10}>
            {alerts.length ? (
              alerts.slice(0, 3).map((alert) => (
                <div key={`${alert.event}-${alert.expires}`} style={styles.alertItem}>
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
                No active Minnesota weather alerts.
              </div>
            )}
          </div>
        </div>
      ) : null}

      {activeSignal.title === "Acute Health Awareness" ? (
        <div style={{ ...styles.detailCard, marginTop: 10 }}>
          <div style={styles.detailLabel}>Acute Health Awareness Inputs</div>
          <div style={{ ...styles.metaText, marginBottom: 10 }}>
            Source: {respiratorySource}. Used as an EMS demand signal, not an
            epidemiology dashboard.
          </div>
          <div style={styles.signalGrid}>
            {respiratoryIndicators.map((item) => (
              <div key={item.name} style={styles.supportItem}>
                <div style={styles.signalLabel}>{item.name}</div>
                <div style={styles.signalValue}>{item.value}</div>
                <div style={styles.signalNote}>{item.interpretation}</div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
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
      metrics: [
        { label: "Treat & Release: 12%", status: "On Track" },
        { label: "Transport: 76%", status: "Watch" },
        { label: "Lift Assist: 18", status: "Off Track" },
        { label: "Referred to CP Follow-up: 8%", status: "On Track" },
      ],
    },
    {
      label: "Interfacility Transport",
      value: "86",
      note: "Transfer and hospital flow pressure",
      metrics: [
        { label: "Long-distance transfers: 19", status: "Watch" },
        { label: "Delayed pickups: 11", status: "Off Track" },
      ],
    },
    {
      label: "Community Paramedicine",
      value: "64",
      note: "Care-in-place and longitudinal engagement",
      metrics: [
        { label: "Transitional Care Management: 18", status: "On Track" },
        { label: "Chronic Care Management: 27", status: "On Track" },
        { label: "Post-discharge follow-up: 31", status: "Watch" },
        { label: "Avoided ED visits: 22", status: "On Track" },
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
        "Most affected territory: Mankato / Blue Earth",
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
      name: "Rochester / Olmsted",
      calls: 126,
      response: "9m 41s",
      uhu: "0.58",
      mutualAid: "High",
      status: "Strained",
    },
    {
      name: "Mankato / Blue Earth",
      calls: 81,
      response: "8m 42s",
      uhu: "0.44",
      mutualAid: "Low",
      status: "Stable",
    },
    {
      name: "Faribault-Owatonna",
      calls: 92,
      response: "9m 28s",
      uhu: "0.49",
      mutualAid: "Moderate",
      status: "Watch",
    },
    {
      name: "Winona / Bluff Country",
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

  const statusPillStyle = (status: string) => ({
    ...styles.statusPill,
    background:
      status === "On Track"
        ? "#dcfce7"
        : status === "Watch"
        ? "#fef3c7"
        : "#fee2e2",
    color:
      status === "On Track"
        ? "#166534"
        : status === "Watch"
        ? "#92400e"
        : "#991b1b",
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
                    <div key={metric.label} style={styles.metricItem}>
                      <span>{metric.label}</span>
                      <span style={statusPillStyle(metric.status)}>
                        {metric.status}
                      </span>
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
            Mobile-safe district view. Strained indicates higher demand
            pressure, tighter unit availability, and transfer/offload friction
            risk.
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

  liveFeedLine: {
    border: "1px solid #d1d5db",
    background: "#f8fafc",
    borderRadius: 12,
    padding: "9px 11px",
    color: "#374151",
    fontSize: 13,
    fontWeight: 800,
    lineHeight: 1.35,
    marginBottom: 12,
    minWidth: 0,
    overflowWrap: "anywhere",
    boxSizing: "border-box",
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

  tickerList: {
    display: "grid",
    gap: 8,
    marginBottom: 12,
    minWidth: 0,
  },

  tickerItem: {
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    background: "#fafafa",
    padding: "9px 10px",
    fontSize: 13,
    lineHeight: 1.4,
    color: "#374151",
    minWidth: 0,
    overflowWrap: "anywhere",
    boxSizing: "border-box",
  },

  tickerLabel: {
    display: "inline-block",
    marginRight: 8,
    color: "#111827",
    fontWeight: 900,
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

  domainHeader: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
    minWidth: 0,
  },

  domainIcon: {
    fontSize: 20,
    lineHeight: 1,
    flexShrink: 0,
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

  detailHeaderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
    minWidth: 0,
  },

  liveBadge: {
    borderRadius: 999,
    padding: "4px 9px",
    background: "#dbeafe",
    color: "#1e40af",
    fontSize: 11,
    fontWeight: 900,
    letterSpacing: 0.4,
    flexShrink: 0,
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

  metricItem: {
    borderRadius: 10,
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    padding: "9px 10px",
    fontSize: 13,
    color: "#374151",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    minWidth: 0,
    overflow: "hidden",
    boxSizing: "border-box",
  },

  statusPill: {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: 999,
    padding: "3px 8px",
    fontSize: 11,
    fontWeight: 900,
    lineHeight: 1.2,
    whiteSpace: "nowrap",
    flexShrink: 0,
  },

  weatherCard: {
    borderRadius: 12,
    background: "#ffffff",
    border: "1px solid #dbeafe",
    padding: 12,
    minWidth: 0,
    overflow: "hidden",
    boxSizing: "border-box",
  },

  weatherTopRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 8,
    minWidth: 0,
  },

  weatherIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    flexShrink: 0,
  },

  weatherValue: {
    fontSize: 24,
    fontWeight: 900,
    lineHeight: 1.1,
    marginBottom: 6,
    overflowWrap: "anywhere",
  },

  weatherFooterRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
    minWidth: 0,
  },

  compactWeatherLine: {
    borderRadius: 9,
    background: "#eff6ff",
    color: "#1e3a8a",
    padding: "7px 9px",
    fontSize: 12,
    fontWeight: 700,
    lineHeight: 1.35,
    marginBottom: 8,
    minWidth: 0,
    overflowWrap: "anywhere",
    boxSizing: "border-box",
  },

  overlayRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 8,
    minWidth: 0,
  },

  overlayPill: {
    borderRadius: 999,
    background: "#f3f4f6",
    color: "#374151",
    border: "1px solid #e5e7eb",
    padding: "3px 8px",
    fontSize: 11,
    fontWeight: 800,
    lineHeight: 1.2,
  },

  alertItem: {
    borderRadius: 12,
    background: "#fff7ed",
    border: "1px solid #fed7aa",
    borderLeft: "5px solid #ea580c",
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

  drillCard: {
    borderRadius: 12,
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    padding: 12,
    minWidth: 0,
    overflow: "hidden",
    boxSizing: "border-box",
  },

  drillTopRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 8,
    minWidth: 0,
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
