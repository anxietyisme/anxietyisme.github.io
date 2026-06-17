import Link from "next/link";
import { getAllTags } from "@/lib/mdx";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tags",
  description: "Browse notes by tag and topic.",
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="px-6 py-12">
      <header className="mb-12">
        <h1 className="text-3xl font-normal mb-2 tracking-tight">Tags</h1>
        <div className="text-sm text-muted">
          Browse all notes by topic
        </div>
      </header>

      <div className="flex flex-wrap gap-3 mb-16">
        {tags.map(({ tag, count }) => (
          <a
            key={tag}
            href={`#${tag}`}
            className="px-3 py-1.5 text-sm bg-border/20 hover:bg-border/40 border border-border transition-colors duration-200"
          >
            {tag} <span className="text-muted text-xs ml-1">{count}</span>
          </a>
        ))}
      </div>

      <div className="space-y-16">
        {tags.map(({ tag, notes }) => (
          <section key={tag} id={tag} className="scroll-mt-8">
            <h2 className="text-xl font-medium border-b border-border pb-2 mb-6 tracking-tight">
              {tag}
            </h2>
            <div className="flex flex-col gap-4">
              {notes.map((note) => (
                <article key={`${note.category}/${note.slug}`} className="flex flex-col gap-1">
                  <Link
                    href={`/${note.category}/${note.slug}`}
                    className="text-foreground hover:text-accent font-medium leading-snug w-fit transition-colors"
                  >
                    {note.frontmatter.title}
                  </Link>
                  <p className="text-sm text-muted line-clamp-1">
                    {note.frontmatter.description}
                  </p>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
