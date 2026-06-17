import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface NoteFrontmatter {
  title: string;
  date: string;
  description: string;
  tags: string[];
  featured?: boolean;
}

export interface NoteEntry {
  slug: string;
  frontmatter: NoteFrontmatter;
}

const contentDir = path.join(process.cwd(), "content");

/**
 * Returns all notes in a given category directory, sorted by date (newest first).
 */
export function getNotes(category: string): NoteEntry[] {
  const dir = path.join(contentDir, category);

  if (!fs.existsSync(dir)) return [];

  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"));

  const notes = files.map((filename) => {
    const filePath = path.join(dir, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);

    return {
      slug: filename.replace(/\.mdx$/, ""),
      frontmatter: data as NoteFrontmatter,
    };
  });

  return notes.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

/**
 * Returns a single note's MDX source, parsed frontmatter, and prev/next links.
 */
export function getNote(category: string, slug: string) {
  const filePath = path.join(contentDir, category, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  // Get neighbors
  const allNotes = getNotes(category);
  const index = allNotes.findIndex((n) => n.slug === slug);
  const prev = index > 0 ? allNotes[index - 1] : null;
  const next = index < allNotes.length - 1 ? allNotes[index + 1] : null;

  return {
    frontmatter: data as NoteFrontmatter,
    content,
    prev,
    next,
  };
}

/**
 * Returns all slugs in a category (for generateStaticParams).
 */
export function getNoteSlugs(category: string): string[] {
  const dir = path.join(contentDir, category);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

/**
 * Returns recent notes across all categories.
 */
export function getRecentNotes(limit: number = 6): (NoteEntry & { category: string })[] {
  const categories = ["math", "physics", "cs"];
  const all: (NoteEntry & { category: string })[] = [];

  for (const cat of categories) {
    const notes = getNotes(cat);
    for (const note of notes) {
      all.push({ ...note, category: cat });
    }
  }

  return all
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    )
    .slice(0, limit);
}
/**
 * Returns all tags across all categories, with their frequencies and associated notes.
 */
export function getAllTags() {
  const allNotes = getRecentNotes(1000); // Get all notes
  const tagMap = new Map<string, { count: number; notes: (NoteEntry & { category: string })[] }>();

  allNotes.forEach((note) => {
    const tags = note.frontmatter.tags || [];
    tags.forEach((tag) => {
      if (!tagMap.has(tag)) {
        tagMap.set(tag, { count: 0, notes: [] });
      }
      const entry = tagMap.get(tag)!;
      entry.count += 1;
      entry.notes.push(note);
    });
  });

  return Array.from(tagMap.entries())
    .map(([tag, data]) => ({ tag, ...data }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}
