export const dynamic = "force-static";
import { getRecentNotes } from "@/lib/mdx";

const SITE_URL = "https://anxietyisme.github.io";

export async function GET() {
  const notes = getRecentNotes(100); // Get latest 100 notes

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>anxiety — Academic Notebook</title>
    <link>${SITE_URL}</link>
    <description>Academic notes on mathematics, physics, and computer science.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    ${notes
      .map(
        (note) => `
    <item>
      <title>${note.frontmatter.title}</title>
      <link>${SITE_URL}/${note.category}/${note.slug}</link>
      <guid>${SITE_URL}/${note.category}/${note.slug}</guid>
      <pubDate>${new Date(note.frontmatter.date).toUTCString()}</pubDate>
      <description>${note.frontmatter.description}</description>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml",
      "Cache-Control": "s-maxage=86400, stale-while-revalidate",
    },
  });
}
