import Link from "next/link";
import { getRecentNotes } from "@/lib/mdx";

const projects = [
  {
    title: "SOMEJET",
    description: "1:40 scale RC AMCA stealth fighter. Aerodynamic optimization via VLM.",
    external: "https://github.com",
  },
  {
    title: "BYTE TUI",
    description: "Terminal-based dashboard for system telemetry and AI streaming.",
    external: "https://github.com",
  },
];

export default function HomePage() {
  const recentNotes = getRecentNotes(5);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      {/* ─── Intro ─── */}
      <section className="mb-12">
        <h1 className="text-2xl font-normal mb-4">Aniket</h1>
        <div className="prose prose-neutral dark:prose-invert">
          <p>
            I am a student working at the intersection of mathematics, physics, and engineering. 
            My primary interests lie in algebraic topology, quantum mechanics, and systems programming.
          </p>
          <p>
            This site serves as an archive for my notes, derivations, and technical projects.
          </p>
        </div>
      </section>

      {/* ─── Recent Notes ─── */}
      <section className="mb-12">
        <h2 className="text-lg font-medium mb-4 pb-2 border-b border-border">Recent Notes</h2>
        {recentNotes.length > 0 ? (
          <ul className="space-y-3">
            {recentNotes.map((note) => (
              <li key={`${note.category}/${note.slug}`} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                <time className="text-sm text-muted tabular-nums shrink-0">
                  {note.frontmatter.date}
                </time>
                <Link
                  href={`/${note.category}/${note.slug}`}
                  className="text-foreground hover:text-accent hover:underline decoration-border underline-offset-4"
                >
                  {note.frontmatter.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted">No notes available.</p>
        )}
      </section>

      {/* ─── Selected Projects ─── */}
      <section className="mb-12">
        <h2 className="text-lg font-medium mb-4 pb-2 border-b border-border">Selected Projects</h2>
        <ul className="space-y-4">
          {projects.map((project) => (
            <li key={project.title}>
              <a
                href={project.external}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-accent hover:underline decoration-border underline-offset-4"
              >
                {project.title}
              </a>
              <p className="text-sm text-muted mt-1">{project.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
