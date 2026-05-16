export const dynamic = "force-dynamic";

const fallbackSignals = [
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
    interpretation: "ED respiratory burden may affect offload and referral decisions.",
  },
  {
    name: "Expected EMS impact",
    value: "Increased care-in-place need",
    interpretation: "CP follow-up and treat-and-release pathways may protect capacity.",
  },
];

export async function GET() {
  try {
    const res = await fetch(
      "https://data.cdc.gov/resource/7xva-uux8.json?$limit=8&$order=week_end%20DESC",
      {
        headers: {
          Accept: "application/json",
          "User-Agent": "EMS Ops Explorer Demo (contact: demo@example.com)",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      throw new Error(`CDC respiratory fetch failed: ${res.status}`);
    }

    const rows = await res.json();

    return Response.json({
      updatedAt: new Date().toISOString(),
      source: "CDC NSSP respiratory ED visits",
      note: "CDC live feed available; regional mapping prototype.",
      signals: rows?.length
        ? [
            {
              name: "Influenza activity",
              value: "CDC feed available",
              interpretation: "Latest public rows are available for surveillance review.",
            },
            {
              name: "RSV pressure",
              value: "CDC feed available",
              interpretation: "Regional mapping remains a prototype layer for this demo.",
            },
            {
              name: "COVID/respiratory ED signal",
              value: "CDC feed available",
              interpretation: "Respiratory ED signal can inform EMS demand expectations.",
            },
            {
              name: "Expected EMS impact",
              value: "Watch",
              interpretation: "Monitor care-in-place demand and low-acuity referral pathways.",
            },
          ]
        : fallbackSignals,
    });
  } catch (error) {
    console.error("Respiratory surveillance fetch failed:", error);
    return Response.json({
      updatedAt: new Date().toISOString(),
      source: "CDC/MDH-inspired prototype signal",
      note: "CDC feed unavailable; using realistic demo values.",
      signals: fallbackSignals,
    });
  }
}
