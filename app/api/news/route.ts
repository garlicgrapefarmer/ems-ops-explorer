import Parser from "rss-parser";

export async function GET() {
  try {
    const parser = new Parser();

    const feed = await parser.parseURL(
      "https://news.google.com/rss/search?q=EMS+OR+paramedic+OR+ambulance&hl=en-US&gl=US&ceid=US:en"
    );

    const headlines = (feed.items || [])
      .slice(0, 5)
      .map((item) => ({
        title: item.title || "Untitled",
        link: item.link || "#",
        source: item.source?.title || "Google News",
        pubDate: item.pubDate || "",
      }));

    return Response.json({ headlines });
  } catch (error) {
    console.error("News fetch failed:", error);
    return Response.json(
      { headlines: [], error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}
