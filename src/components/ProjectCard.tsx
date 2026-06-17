import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  external?: string;
}

export function ProjectCard({ title, description, tags, href, external }: ProjectCardProps) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    if (external) {
      return (
        <a href={external} target="_blank" rel="noopener noreferrer" className="group block">
          {children}
        </a>
      );
    }
    if (href) {
      return (
        <Link href={href} className="group block">
          {children}
        </Link>
      );
    }
    return <div className="group block">{children}</div>;
  };

  return (
    <Wrapper>
      <article className="p-5 rounded-xl border border-border bg-surface
                          hover:border-accent-muted hover:bg-surface-hover
                          transition-all duration-300 h-full flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-base font-semibold group-hover:text-accent transition-colors duration-200">
            {title}
          </h3>
          {(href || external) && (
            <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-accent flex-shrink-0 mt-0.5 transition-colors duration-200" />
          )}
        </div>
        <p className="text-sm text-muted leading-relaxed mb-4 flex-1">
          {description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-accent-highlight/30 text-accent-secondary font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </article>
    </Wrapper>
  );
}
