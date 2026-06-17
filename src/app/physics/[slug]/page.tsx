import { notFound } from "next/navigation";
import { getNote, getNoteSlugs } from "@/lib/mdx";
import { getMDXComponents } from "@/components/MDXComponents";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import type { Metadata } from "next";
import { NoteLayout } from "@/components/NoteLayout";

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
    <NoteLayout
      category="physics"
      title={note.frontmatter.title}
      date={note.frontmatter.date}
      prev={note.prev}
      next={note.next}
    >
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
    </NoteLayout>
  );
}
