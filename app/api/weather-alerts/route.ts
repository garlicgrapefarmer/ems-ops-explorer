export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestedState = searchParams.get("state") || "KS";
    const state = /^[A-Za-z]{2}$/.test(requestedState)
      ? requestedState.toUpperCase()
      : "KS";

    const res = await fetch(
      `https://api.weather.gov/alerts/active?area=${state}`,
      {
        headers: {
          Accept: "application/geo+json",
          "User-Agent": "ems-ops-explorer demo",
        },
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) {
      throw new Error(`Weather alert fetch failed: ${res.status}`);
    }

    const data = await res.json();
    const alerts = (data.features || []).slice(0, 3).map((feature: any) => ({
      id: feature.id || feature.properties?.id || feature.properties?.event,
      event: feature.properties?.event || "Weather Alert",
      areaDesc: feature.properties?.areaDesc || "Demo Rural Region",
      severity: feature.properties?.severity || "Unknown",
    }));

    return Response.json({ alerts });
  } catch (error) {
    console.error("Weather alerts fetch failed:", error);
    return Response.json({ alerts: [] });
  }
}
