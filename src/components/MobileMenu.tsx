"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

interface NoteMeta {
  slug: string;
  title: string;
  topic: string;
}

interface MobileMenuProps {
  mathNotes: NoteMeta[];
  physicsNotes: NoteMeta[];
  csNotes: NoteMeta[];
}

export function MobileMenu({ mathNotes, physicsNotes, csNotes }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const groups = [
    { href: "/", label: "Home" },
    { href: "/math", label: "Mathematics", notes: mathNotes },
    { href: "/physics", label: "Physics", notes: physicsNotes },
    { href: "/cs", label: "Computer Science", notes: csNotes },
    { href: "/projects", label: "Projects" },
    { href: "/tags", label: "Tags" },
    { href: "/about", label: "About" },
  ];

  return (
    <div className="md:hidden">
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 right-4 z-50 p-2 border border-border bg-background text-foreground cursor-pointer"
        aria-label="Toggle menu"
      >
        {open ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Slide-out drawer */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-40 w-72 bg-background border-r border-border p-6 overflow-y-auto">
            <div className="mb-8">
              <h1 className="text-xl font-medium tracking-tight">anxiety</h1>
              <p className="text-sm text-muted mt-1">Academic Notebook</p>
            </div>

            <div className="flex flex-col gap-4 text-sm">
              {groups.map((group) => {
                const isActive =
                  group.href === "/" ? pathname === "/" : pathname.startsWith(group.href);

                return (
                  <div key={group.href} className="flex flex-col gap-1.5">
                    <Link
                      href={group.href}
                      onClick={() => setOpen(false)}
                      className={`transition-colors duration-200 ${
                        isActive ? "text-foreground font-medium" : "text-muted hover:text-foreground"
                      }`}
                    >
                      {group.label}
                    </Link>

                    {group.notes && group.notes.length > 0 && isActive && (
                      <div className="flex flex-col gap-2 mt-1 mb-1 ml-1 pl-3 border-l border-border">
                        {group.notes.map((note) => (
                          <Link
                            key={note.slug}
                            href={`${group.href}/${note.slug}`}
                            onClick={() => setOpen(false)}
                            className={`text-sm leading-snug transition-colors duration-200 ${
                              pathname === `${group.href}/${note.slug}`
                                ? "text-foreground font-medium"
                                : "text-muted hover:text-foreground"
                            }`}
                          >
                            {note.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-4 border-t border-border">
              <ThemeToggle />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
