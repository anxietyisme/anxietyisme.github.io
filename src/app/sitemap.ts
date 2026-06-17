export const dynamic = "force-static";
import { getRecentNotes } from "@/lib/mdx";
import type { MetadataRoute } from "next";

const SITE_URL = "https://anxietyisme.github.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const notes = getRecentNotes(1000);

  const noteRoutes = notes.map((note) => ({
    url: `${SITE_URL}/${note.category}/${note.slug}`,
    lastModified: new Date(note.frontmatter.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const staticRoutes = [
    "",
    "/about",
    "/projects",
    "/math",
    "/physics",
    "/cs",
    "/tags",
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.9,
  }));

  return [...staticRoutes, ...noteRoutes];
}
