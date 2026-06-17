"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SearchResult {
  slug: string;
  category: string;
  title: string;
  description: string;
}

interface SearchProps {
  allNotes: SearchResult[];
}

export function Search({ allNotes }: SearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  // Close on navigation
  useEffect(() => {
    setOpen(false);
    setQuery("");
  }, [pathname]);

  // Cmd+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const results = query.length > 0
    ? allNotes.filter(
        (note) =>
          note.title.toLowerCase().includes(query.toLowerCase()) ||
          note.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setOpen(false)}
      />

      {/* Modal */}
      <div className="relative max-w-lg mx-auto mt-[20vh] bg-background border border-border shadow-lg">
        <div className="flex items-center border-b border-border px-4">
          <svg className="w-4 h-4 text-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search notes..."
            className="w-full px-3 py-4 bg-transparent text-foreground outline-none text-sm placeholder:text-muted"
          />
          <kbd className="text-xs text-muted border border-border px-1.5 py-0.5 shrink-0">
            esc
          </kbd>
        </div>

        {query.length > 0 && (
          <div className="max-h-80 overflow-y-auto">
            {results.length > 0 ? (
              <ul className="py-2">
                {results.map((result) => (
                  <li key={`${result.category}/${result.slug}`}>
                    <Link
                      href={`/${result.category}/${result.slug}`}
                      className="block px-4 py-3 hover:bg-border/20 transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      <div className="text-sm text-foreground">{result.title}</div>
                      <div className="text-xs text-muted mt-0.5 capitalize">{result.category}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-8 text-center text-sm text-muted">
                No results for &ldquo;{query}&rdquo;
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
