import { ReactNode } from "react";
import Link from "next/link";
import { TableOfContents } from "./TableOfContents";
import { Comments } from "./Comments";

interface NoteLayoutProps {
  category: string;
  title: string;
  date: string;
  prev: { slug: string; frontmatter: { title: string } } | null;
  next: { slug: string; frontmatter: { title: string } } | null;
  children: ReactNode;
}

export function NoteLayout({ category, title, date, prev, next, children }: NoteLayoutProps) {
  return (
    <article className="relative">
      <Link
        href={`/${category}`}
        className="text-sm text-muted hover:text-foreground mb-8 inline-block"
      >
        ← Back
      </Link>

      <header className="mb-10">
        <h1 className="text-3xl font-normal mb-2 tracking-tight">
          {title}
        </h1>
        <div className="text-sm text-muted">
          {date}
        </div>
      </header>

      <div className="flex flex-col xl:flex-row gap-12 relative">
        <div className="prose prose-neutral dark:prose-invert max-w-none flex-1 min-w-0 pb-16">
          {children}

          <div className="flex justify-between items-center mt-16 pt-8 border-t border-border">
            {prev ? (
              <Link
                href={`/${category}/${prev.slug}`}
                className="group flex flex-col gap-1 text-sm text-muted hover:text-foreground transition-colors text-left max-w-[45%]"
              >
                <span className="uppercase tracking-wider text-xs">Previous</span>
                <span className="font-medium truncate">{prev.frontmatter.title}</span>
              </Link>
            ) : (
              <div />
            )}
            
            {next ? (
              <Link
                href={`/${category}/${next.slug}`}
                className="group flex flex-col gap-1 text-sm text-muted hover:text-foreground transition-colors text-right max-w-[45%]"
              >
                <span className="uppercase tracking-wider text-xs">Next</span>
                <span className="font-medium truncate">{next.frontmatter.title}</span>
              </Link>
            ) : (
              <div />
            )}
          </div>

          <Comments />
        </div>

        {/* Desktop TOC */}
        <div className="hidden xl:block w-48 shrink-0">
          <div className="sticky top-12">
            <TableOfContents />
          </div>
        </div>
      </div>
    </article>
  );
}
