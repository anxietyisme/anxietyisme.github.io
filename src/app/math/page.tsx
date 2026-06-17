import Link from "next/link";
import { getNotes } from "@/lib/mdx";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mathematics",
  description: "Notes on topology, algebra, analysis, and mathematical physics.",
};

export default function MathIndexPage() {
  const notes = getNotes("math");

  return (
    <div className="px-6 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-normal mb-4">Mathematics</h1>
        <div className="text-sm text-muted space-y-1">
          <p><strong>Focus:</strong> Topology, Algebra, Analysis</p>
          <p><strong>Level:</strong> Advanced Undergraduate / Graduate</p>
        </div>
      </div>

      <h2 className="text-xl font-normal mb-6">Schedule & Notes</h2>
      
      {notes.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 font-medium text-sm w-32 text-muted">Date</th>
                <th className="py-2 font-medium text-sm text-muted">Topic</th>
              </tr>
            </thead>
            <tbody>
              {notes.map((note) => (
                <tr key={note.slug} className="border-b border-border/50">
                  <td className="py-3 text-sm text-muted tabular-nums align-top">
                    {note.frontmatter.date}
                  </td>
                  <td className="py-3 align-top">
                    <Link
                      href={`/math/${note.slug}`}
                      className="text-foreground hover:text-accent hover:underline decoration-border underline-offset-4"
                    >
                      {note.frontmatter.title}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-sm text-muted">No math notes yet.</p>
      )}
    </div>
  );
}
