import { notFound } from "next/navigation";
import { getNote, getNoteSlugs } from "@/lib/mdx";
import { getMDXComponents } from "@/components/MDXComponents";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import Link from "next/link";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getNoteSlugs("physics").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote("physics", slug);
  if (!note) return {};
  return {
    title: note.frontmatter.title,
    description: note.frontmatter.description,
  };
}

export default async function PhysicsNotePage({ params }: PageProps) {
  const { slug } = await params;
  const note = getNote("physics", slug);

  if (!note) notFound();

  return (
    <article className="px-6 py-12">
      <Link
        href="/physics"
        className="text-sm text-muted hover:text-foreground mb-8 inline-block"
      >
        ← Back
      </Link>

      <header className="mb-10">
        <h1 className="text-3xl font-normal mb-2">
          {note.frontmatter.title}
        </h1>
        <div className="text-sm text-muted">
          {note.frontmatter.date}
        </div>
      </header>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <MDXRemote
          source={note.content}
          components={getMDXComponents()}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkMath],
              rehypePlugins: [
                rehypeKatex,
                [
                  rehypePrettyCode,
                  {
                    theme: "github-dark-default",
                    keepBackground: false,
                  },
                ],
              ],
            },
          }}
        />
      </div>
    </article>
  );
}
