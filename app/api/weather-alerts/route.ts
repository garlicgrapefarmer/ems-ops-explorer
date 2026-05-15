export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch("https://api.weather.gov/alerts/active?area=NE", {
      headers: {
        Accept: "application/geo+json",
        "User-Agent": "ems-ops-explorer demo",
      },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      throw new Error(`Weather alert fetch failed: ${res.status}`);
    }

    const data = await res.json();
    const alerts = (data.features || []).slice(0, 3).map((feature: any) => ({
      id: feature.id || feature.properties?.id || feature.properties?.event,
      event: feature.properties?.event || "Weather Alert",
      areaDesc: feature.properties?.areaDesc || "Nebraska",
      severity: feature.properties?.severity || "Unknown",
    }));

    return Response.json({ alerts });
  } catch (error) {
    console.error("Weather alerts fetch failed:", error);
    return Response.json({ alerts: [] });
  }
}
