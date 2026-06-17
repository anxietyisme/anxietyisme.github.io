import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

interface NoteCardProps {
  title: string;
  date: string;
  description: string;
  tags: string[];
  href: string;
}

export function NoteCard({ title, date, description, tags, href }: NoteCardProps) {
  return (
    <Link href={href} className="group block">
      <article className="p-5 rounded-xl border border-border bg-surface
                          hover:border-accent-muted hover:bg-surface-hover
                          transition-all duration-300">
        <div className="flex items-center gap-2 text-xs text-muted mb-2">
          <Calendar className="w-3 h-3" />
          <time>{date}</time>
        </div>
        <h3 className="text-base font-semibold mb-1.5 group-hover:text-accent transition-colors duration-200">
          {title}
        </h3>
        <p className="text-sm text-muted leading-relaxed mb-3 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-muted group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-200" />
        </div>
      </article>
    </Link>
  );
}
