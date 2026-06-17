"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

interface NoteMeta {
  slug: string;
  title: string;
  topic: string;
}

interface SidebarProps {
  mathNotes: NoteMeta[];
  physicsNotes: NoteMeta[];
  csNotes: NoteMeta[];
}

import { useState, useEffect } from "react";

function SidebarTopic({
  topicName,
  notes,
  pathname,
  groupHref,
}: {
  topicName: string;
  notes: NoteMeta[];
  pathname: string;
  groupHref: string;
}) {
  const isTopicActive = notes.some((n) => pathname === `${groupHref}/${n.slug}`);
  const [isOpen, setIsOpen] = useState(isTopicActive);

  useEffect(() => {
    if (isTopicActive) setIsOpen(true);
  }, [isTopicActive]);

  return (
    <div className="flex flex-col gap-1.5 mt-2 first:mt-0">
      <div
        className="flex items-center justify-between cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-xs font-semibold tracking-wider text-muted uppercase group-hover:text-foreground transition-colors">
          {topicName}
        </span>
        <svg
          className={`w-3 h-3 text-muted group-hover:text-foreground transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="flex flex-col gap-2 mt-1 mb-1 ml-1 pl-3 border-l border-border animate-in slide-in-from-top-1 fade-in duration-200">
          {notes.map((note) => {
            const noteHref = `${groupHref}/${note.slug}`;
            const isNoteActive = pathname === noteHref;
            return (
              <Link
                key={note.slug}
                href={noteHref}
                className={`text-sm leading-snug transition-colors duration-200
                  ${
                    isNoteActive
                      ? "text-foreground font-medium"
                      : "text-muted hover:text-foreground"
                  }`}
              >
                {note.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SidebarGroup({ group, pathname }: { group: any; pathname: string }) {
  const isGroupActive =
    group.href === "/"
      ? pathname === "/"
      : pathname.startsWith(group.href);

  const [isOpen, setIsOpen] = useState(isGroupActive);

  // Automatically open the group if we navigate to it
  useEffect(() => {
    if (isGroupActive) {
      setIsOpen(true);
    }
  }, [isGroupActive]);

  const hasNotes = group.notes && group.notes.length > 0;

  // Group notes by topic
  const groupedNotes = hasNotes
    ? group.notes.reduce((acc: Record<string, NoteMeta[]>, note: NoteMeta) => {
        if (!acc[note.topic]) acc[note.topic] = [];
        acc[note.topic].push(note);
        return acc;
      }, {})
    : {};

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <Link
          href={group.href}
          className={`transition-colors duration-200
            ${
              isGroupActive && !hasNotes
                ? "text-foreground font-medium border-b border-foreground"
                : isGroupActive
                ? "text-foreground font-medium"
                : "text-muted hover:text-foreground"
            }`}
        >
          {group.label}
        </Link>
        {hasNotes && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 text-muted hover:text-foreground transition-colors cursor-pointer"
            aria-label="Toggle dropdown"
          >
            <svg
              className={`w-3 h-3 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        )}
      </div>

      {hasNotes && isOpen && (
        <div className="flex flex-col gap-3 mt-2 mb-1 ml-1 pl-3 border-l border-border animate-in slide-in-from-top-1 fade-in duration-200">
          {Object.entries(groupedNotes).map(([topicName, notes]) => (
            <SidebarTopic
              key={topicName}
              topicName={topicName}
              notes={notes as NoteMeta[]}
              pathname={pathname}
              groupHref={group.href}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function Sidebar({ mathNotes, physicsNotes, csNotes }: SidebarProps) {
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
    <nav className="flex flex-col h-full">
      <div className="mb-8">
        <h1 className="text-xl font-medium tracking-tight">anxiety</h1>
        <p className="text-sm text-muted mt-1">Academic Notebook</p>
      </div>

      <div className="flex flex-col gap-4 text-sm">
        {groups.map((group) => (
          <SidebarGroup key={group.href} group={group} pathname={pathname} />
        ))}
      </div>

      <div className="mt-auto pt-8">
        <ThemeToggle />
      </div>
    </nav>
  );
}
