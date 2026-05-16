export const dynamic = "force-dynamic";

type Risk = "Clear" | "Advisory" | "Watch" | "Warning";

const nwsHeaders = {
  Accept: "application/geo+json",
  "User-Agent": "EMS Ops Explorer Demo (contact: demo@example.com)",
};

const territories = [
  {
    name: "Rochester / Olmsted",
    latitude: 44.0121,
    longitude: -92.4802,
    alertTerms: ["Olmsted"],
  },
  {
    name: "Mankato / Blue Earth",
    latitude: 44.1636,
    longitude: -93.9994,
    alertTerms: ["Blue Earth"],
  },
  {
    name: "Faribault-Owatonna",
    latitude: 44.2949,
    longitude: -93.2688,
    alertTerms: ["Rice", "Steele"],
  },
  {
    name: "Winona / Bluff Country",
    latitude: 44.0554,
    longitude: -91.6664,
    alertTerms: ["Winona", "Fillmore", "Houston"],
  },
];

function alertRisk(event = "", severity = ""): Risk {
  const text = `${event} ${severity}`.toLowerCase();
  if (text.includes("warning") || text.includes("extreme") || text.includes("severe")) {
    return "Warning";
  }
  if (text.includes("watch")) {
    return "Watch";
  }
  if (text.includes("advisory") || text.includes("moderate")) {
    return "Advisory";
  }
  return "Advisory";
}

function strongestRisk(alerts: { event: string; severity: string }[]): Risk {
  const risks = alerts.map((alert) => alertRisk(alert.event, alert.severity));
  if (risks.includes("Warning")) return "Warning";
  if (risks.includes("Watch")) return "Watch";
  if (risks.includes("Advisory")) return "Advisory";
  return "Clear";
}

export async function GET() {
  try {
    const alertsRes = await fetch("https://api.weather.gov/alerts/active?area=MN", {
      headers: nwsHeaders,
      next: { revalidate: 300 },
    });

    if (!alertsRes.ok) {
      throw new Error(`NWS alerts fetch failed: ${alertsRes.status}`);
    }

    const alertsData = await alertsRes.json();
    const alerts = (alertsData.features || []).map((feature: any) => ({
      event: feature.properties?.event || "Weather Alert",
      severity: feature.properties?.severity || "Unknown",
      areaDesc: feature.properties?.areaDesc || "",
      expires: feature.properties?.expires || "",
    }));

    const territoryForecasts = await Promise.all(
      territories.map(async (territory) => {
        const pointRes = await fetch(
          `https://api.weather.gov/points/${territory.latitude},${territory.longitude}`,
          {
            headers: nwsHeaders,
            next: { revalidate: 300 },
          }
        );

        if (!pointRes.ok) {
          throw new Error(`NWS point fetch failed for ${territory.name}: ${pointRes.status}`);
        }

        const pointData = await pointRes.json();
        const forecastUrl = pointData.properties?.forecast;

        if (!forecastUrl) {
          throw new Error(`NWS point response missing forecast URL for ${territory.name}`);
        }

        const forecastRes = await fetch(forecastUrl, {
          headers: nwsHeaders,
          next: { revalidate: 300 },
        });

        if (!forecastRes.ok) {
          throw new Error(`NWS forecast fetch failed for ${territory.name}: ${forecastRes.status}`);
        }

        const forecastData = await forecastRes.json();
        const firstPeriod = forecastData.properties?.periods?.[0] || {};
        const matchingAlerts = alerts.filter((alert: any) =>
          territory.alertTerms.some((term) =>
            alert.areaDesc.toLowerCase().includes(term.toLowerCase())
          )
        );

        return {
          name: territory.name,
          latitude: territory.latitude,
          longitude: territory.longitude,
          temperature:
            typeof firstPeriod.temperature === "number"
              ? firstPeriod.temperature
              : null,
          shortForecast: firstPeriod.shortForecast || "Forecast unavailable",
          windSpeed: firstPeriod.windSpeed || "Not reported",
          icon: firstPeriod.icon || null,
          risk: strongestRisk(matchingAlerts),
          alertCount: matchingAlerts.length,
        };
      })
    );

    return Response.json({
      updatedAt: new Date().toISOString(),
      territories: territoryForecasts,
      alerts: alerts.slice(0, 3),
    });
  } catch (error) {
    console.error("Regional weather fetch failed:", error);
    return Response.json(
      {
        updatedAt: new Date().toISOString(),
        territories: territories.map((territory) => ({
          name: territory.name,
          latitude: territory.latitude,
          longitude: territory.longitude,
          temperature: null,
          shortForecast: "Forecast temporarily unavailable",
          windSpeed: "Not reported",
          icon: null,
          risk: "Clear" as Risk,
          alertCount: 0,
        })),
        alerts: [],
      },
      { status: 200 }
    );
  }
}
