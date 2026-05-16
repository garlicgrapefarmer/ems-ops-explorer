export const dynamic = "force-dynamic";

export async function GET() {
  try {
    /*
      AirNow live integration point:
      - Set AIRNOW_API_KEY in the deployment environment.
      - Replace the fallback below with a fetch to:
        https://www.airnowapi.org/aq/observation/latLong/current/?format=application/json&latitude=<LAT>&longitude=<LON>&distance=50&API_KEY=${process.env.AIRNOW_API_KEY}
      - For this demo, realistic Southern Minnesota corridor values are returned
        until an API key is available.
    */
    return Response.json({
      source: "AirNow-ready placeholder",
      lastUpdated: new Date().toISOString(),
      observations: [
        {
          area: "River Valley",
          category: "Good",
          aqi: 42,
          pollutant: "PM2.5",
        },
        {
          area: "Prairie Lakes",
          category: "Moderate",
          aqi: 61,
          pollutant: "PM2.5",
        },
        {
          area: "South Central",
          category: "Moderate",
          aqi: 68,
          pollutant: "Ozone",
        },
        {
          area: "Bluff Country",
          category: "Good",
          aqi: 39,
          pollutant: "PM2.5",
        },
      ],
    });
  } catch (error) {
    console.error("Air quality fetch failed:", error);
    return Response.json({
      source: "AirNow-ready placeholder",
      lastUpdated: new Date().toISOString(),
      observations: [],
    });
  }
}
