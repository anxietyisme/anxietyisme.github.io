import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { MobileMenu } from "@/components/MobileMenu";
import { Search } from "@/components/Search";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";
import { getNotes, getRecentNotes } from "@/lib/mdx";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "anxiety — Notes",
    template: "%s | anxiety",
  },
  description:
    "Academic notes on mathematics, physics, and computer science.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch notes to generate the hierarchical sidebar
  const mapNote = (n: { slug: string; frontmatter: { title: string; tags: string[] } }) => ({
    slug: n.slug,
    title: n.frontmatter.title,
    topic: n.frontmatter.tags && n.frontmatter.tags.length > 0 ? n.frontmatter.tags[0] : "General",
  });

  const mathNotes = getNotes("math").map(mapNote);
  const physicsNotes = getNotes("physics").map(mapNote);
  const csNotes = getNotes("cs").map(mapNote);

  // For search
  const allNotes = getRecentNotes(1000).map((n) => ({
    slug: n.slug,
    category: n.category,
    title: n.frontmatter.title,
    description: n.frontmatter.description,
  }));

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased min-h-screen">
        <ThemeProvider>
          <ScrollProgress />
          <BackToTop />
          <Search allNotes={allNotes} />
          <MobileMenu mathNotes={mathNotes} physicsNotes={physicsNotes} csNotes={csNotes} />
          
          <div className="flex flex-col md:flex-row max-w-6xl mx-auto min-h-screen">
            {/* Sidebar (hidden on mobile) */}
            <aside className="hidden md:block w-72 shrink-0 border-r border-border p-6 md:py-12 md:pr-12">
              <Sidebar
                mathNotes={mathNotes}
                physicsNotes={physicsNotes}
                csNotes={csNotes}
              />
            </aside>
            {/* Main Content */}
            <main className="flex-1 w-full max-w-3xl flex flex-col p-6 md:py-12 md:px-12">
              <div className="flex-1">
                {children}
              </div>
              <Footer />
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
