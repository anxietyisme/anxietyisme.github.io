# anxiety — Site Manual

A complete guide to maintaining, writing for, and extending your academic portfolio website.

---

## Table of Contents

1. [How This Site Works (The Big Picture)](#1-how-this-site-works)
2. [Project Structure](#2-project-structure)
3. [Running the Site Locally](#3-running-the-site-locally)
4. [Writing New Notes (The Most Important Section)](#4-writing-new-notes)
5. [Adding a New Category](#5-adding-a-new-category)
6. [Adding Images and Sketches](#6-adding-images-and-sketches)
7. [Using Math (LaTeX/KaTeX)](#7-using-math)
8. [Using Code Blocks](#8-using-code-blocks)
9. [Editing the Sidebar, Homepage, and About Page](#9-editing-pages)
10. [Changing Colors and Fonts](#10-changing-colors-and-fonts)
11. [Deploying to GitHub Pages](#11-deploying)
12. [Common Errors and Fixes](#12-common-errors)
13. [Cheat Sheet](#13-cheat-sheet)

---

## 1. How This Site Works

This website is built with **Next.js**, a framework that turns your code into a fast, static website (just plain HTML files — no server needed). Your notes are written in **MDX files** — essentially Markdown files that also support math equations and code highlighting.

**The workflow is dead simple:**

```
Write a .mdx file → Drop it in content/math/ → Push to GitHub → Site updates automatically
```

You never need to touch the actual website code to add new notes. Just write Markdown.

---

## 2. Project Structure

Here's what every folder and file does:

```
anxiety/
├── content/                    ← YOUR NOTES LIVE HERE
│   ├── math/                   ← Math notes (.mdx files)
│   ├── physics/                ← Physics notes (.mdx files)
│   └── cs/                     ← CS notes (.mdx files)
├── public/
│   └── images/                 ← Images used in notes
├── src/
│   ├── app/                    ← Pages (you rarely touch these)
│   │   ├── globals.css         ← Colors, fonts, styling
│   │   ├── layout.tsx          ← The overall page shell
│   │   ├── page.tsx            ← Homepage
│   │   ├── about/page.tsx      ← About page
│   │   ├── projects/page.tsx   ← Projects page
│   │   ├── math/               ← Math index + dynamic note pages
│   │   ├── physics/            ← Physics index + dynamic note pages
│   │   └── cs/                 ← CS index + dynamic note pages
│   ├── components/             ← Reusable UI pieces
│   │   ├── Sidebar.tsx         ← The left navigation sidebar
│   │   ├── Footer.tsx          ← The bottom copyright line
│   │   ├── ThemeToggle.tsx     ← Light/Dark mode switcher
│   │   ├── ThemeProvider.tsx   ← Theme system wrapper
│   │   ├── HandwrittenSketch.tsx ← Component for embedding images
│   │   └── MDXComponents.tsx   ← Maps custom components into MDX
│   └── lib/
│       └── mdx.ts              ← The engine that reads your .mdx files
├── .github/
│   └── workflows/
│       └── deploy.yml          ← Auto-deploys to GitHub Pages on push
├── next.config.ts              ← Next.js settings (static export enabled)
├── package.json                ← Dependencies list
└── tsconfig.json               ← TypeScript config
```

**Key takeaway:** 90% of the time, you will only be working inside `content/` and `public/images/`.

---

## 3. Running the Site Locally

### First Time Setup

If you've just cloned the project or are setting it up on a new machine:

```bash
cd ~/Desktop/anxiety
npm install
```

### Starting the Dev Server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser. The site will **hot-reload** — any change you save will instantly appear in the browser.

### Stopping the Dev Server

Press `Ctrl + C` in the terminal.

---

## 4. Writing New Notes

This is what you'll do most often. Here's the complete process:

### Step 1: Create a new `.mdx` file

Create a file inside the appropriate category folder. The filename becomes the URL slug.

| File path | URL |
|---|---|
| `content/math/my-cool-proof.mdx` | `/math/my-cool-proof` |
| `content/physics/wave-mechanics.mdx` | `/physics/wave-mechanics` |
| `content/cs/sorting-algorithms.mdx` | `/cs/sorting-algorithms` |

**Filename rules:**
- Use lowercase letters, numbers, and hyphens only
- No spaces (use hyphens instead)
- No special characters
- End with `.mdx`

### Step 2: Add the frontmatter header

Every `.mdx` file **must** start with a YAML frontmatter block between `---` fences. This is metadata about the note.

```yaml
---
title: "My Note Title"
date: "2026-06-17"
description: "A one-line summary of what this note covers."
tags: ["Topic Name", "Optional Second Tag"]
featured: false
---
```

| Field | Required? | What it does |
|---|---|---|
| `title` | **Yes** | Displayed as the note heading and in the sidebar |
| `date` | **Yes** | Displayed on the note page and used for sorting (newest first). Format: `YYYY-MM-DD` |
| `description` | **Yes** | Shown in the index page table |
| `tags` | **Yes** | The **first tag** is used as the "Topic" in the sidebar hierarchy (e.g., `"Topology"`, `"Algorithms"`) |
| `featured` | No | Not currently used, but reserved for future homepage features |

### Step 3: Write your content

After the frontmatter, write normal Markdown:

```markdown
---
title: "Covering Spaces"
date: "2026-06-20"
description: "An introduction to covering spaces, deck transformations, and the lifting property."
tags: ["Topology", "Algebraic Topology"]
---

## Introduction

A **covering space** of a topological space $X$ is a space $\tilde{X}$ together
with a continuous surjective map $p: \tilde{X} \to X$ such that...

## The Lifting Property

Given a path $\gamma: [0,1] \to X$ and a point $\tilde{x}_0 \in p^{-1}(\gamma(0))$,
there exists a unique **lift** $\tilde{\gamma}: [0,1] \to \tilde{X}$ satisfying:

$$
p \circ \tilde{\gamma} = \gamma, \quad \tilde{\gamma}(0) = \tilde{x}_0
$$

## Example Code

```python
def compute_fiber(covering_map, point):
    """Compute the fiber p^{-1}(x) of a covering map."""
    return [y for y in covering_map.domain if covering_map(y) == point]
```　

## Key Results

- Every path-connected, locally path-connected, semilocally simply-connected space has a universal cover
- The number of sheets equals $[\pi_1(X) : p_*(\pi_1(\tilde{X}))]$
```

### Step 4: Preview and publish

1. Run `npm run dev` to preview locally
2. When satisfied, commit and push:

```bash
git add .
git commit -m "Add covering spaces note"
git push
```

The site will automatically rebuild and deploy within ~2 minutes.

---

## 5. Adding a New Category

Let's say you want to add an "Engineering" section. You need to do 3 things:

### Step 1: Create the content folder

```bash
mkdir content/engineering
```

### Step 2: Create the index page

Create `src/app/engineering/page.tsx`:

```tsx
import Link from "next/link";
import { getNotes } from "@/lib/mdx";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering",
  description: "Notes on systems engineering, control theory, and design.",
};

export default function EngineeringIndexPage() {
  const notes = getNotes("engineering");

  return (
    <div className="px-6 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-normal mb-4">Engineering</h1>
        <div className="text-sm text-muted space-y-1">
          <p><strong>Focus:</strong> Control Theory, Systems Design</p>
          <p><strong>Level:</strong> Undergraduate</p>
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
                      href={`/engineering/${note.slug}`}
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
        <p className="text-sm text-muted">No engineering notes yet.</p>
      )}
    </div>
  );
}
```

### Step 3: Create the dynamic note page

Create `src/app/engineering/[slug]/page.tsx`:

```tsx
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
  return getNoteSlugs("engineering").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote("engineering", slug);
  if (!note) return {};
  return {
    title: note.frontmatter.title,
    description: note.frontmatter.description,
  };
}

export default async function EngineeringNotePage({ params }: PageProps) {
  const { slug } = await params;
  const note = getNote("engineering", slug);

  if (!note) notFound();

  return (
    <article className="px-6 py-12">
      <Link
        href="/engineering"
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
```

### Step 4: Add it to the sidebar

Open `src/components/Sidebar.tsx` and add these changes:

1. Update the `SidebarProps` interface:
```tsx
interface SidebarProps {
  mathNotes: NoteMeta[];
  physicsNotes: NoteMeta[];
  csNotes: NoteMeta[];
  engineeringNotes: NoteMeta[];  // ← add this
}
```

2. Add it to the `groups` array inside the `Sidebar` function:
```tsx
{ href: "/engineering", label: "Engineering", notes: engineeringNotes },
```

3. Open `src/app/layout.tsx` and add:
```tsx
const engineeringNotes = getNotes("engineering").map(mapNote);
```
And pass it to the Sidebar:
```tsx
<Sidebar
  mathNotes={mathNotes}
  physicsNotes={physicsNotes}
  csNotes={csNotes}
  engineeringNotes={engineeringNotes}
/>
```

4. Open `src/lib/mdx.ts` and add `"engineering"` to the categories array in `getRecentNotes`:
```tsx
const categories = ["math", "physics", "cs", "engineering"];
```

---

## 6. Adding Images and Sketches

### Regular images

1. Put your image file in `public/images/` (e.g., `public/images/my-diagram.png`)
2. In your `.mdx` file, reference it with a standard Markdown image:

```markdown
![Description of image](/images/my-diagram.png)
```

### Handwritten sketch component

For images you want displayed with a figure caption (like scanned handwritten notes):

```markdown
<HandwrittenSketch
  src="/images/my-proof-sketch.png"
  alt="Handwritten proof of theorem 3.2"
  caption="Fig 1. Proof sketch for the fundamental theorem."
/>
```

---

## 7. Using Math

Math is rendered using **KaTeX** (a fast LaTeX renderer). It works automatically in any `.mdx` file.

### Inline math

Wrap with single dollar signs:

```markdown
The eigenvalues satisfy $\lambda_1 + \lambda_2 = \text{tr}(A)$.
```

### Display (block) math

Wrap with double dollar signs on their own lines:

```markdown
$$
\int_{-\infty}^{\infty} e^{-x^2} \, dx = \sqrt{\pi}
$$
```

### Aligned equations

```markdown
$$
\begin{aligned}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \mathbf{B} &= 0 \\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
\nabla \times \mathbf{B} &= \mu_0 \mathbf{J} + \mu_0 \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t}
\end{aligned}
$$
```

### Common LaTeX commands that work

| What you want | What you type |
|---|---|
| Greek letters | `$\alpha, \beta, \gamma, \Gamma$` |
| Fractions | `$\frac{a}{b}$` |
| Square root | `$\sqrt{x}$` |
| Subscript/superscript | `$x_i^2$` |
| Summation | `$\sum_{i=1}^{n} x_i$` |
| Integral | `$\int_a^b f(x)\,dx$` |
| Matrices | `$\begin{pmatrix} a & b \\ c & d \end{pmatrix}$` |
| Bold math | `$\mathbf{v}$` |
| Calligraphic | `$\mathcal{F}$` |
| Text inside math | `$\text{rank}(A)$` |

---

## 8. Using Code Blocks

Code blocks are syntax-highlighted automatically using **Shiki** (via `rehype-pretty-code`).

### Fenced code blocks

Use triple backticks with a language identifier:

````markdown
```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)
```
````

### Supported languages

Python, C, C++, Rust, JavaScript, TypeScript, Java, Go, Haskell, LaTeX, Bash, and many more. Just use the correct language name after the triple backticks.

### Inline code

Use single backticks for inline code: `` `variable_name` ``

---

## 9. Editing Pages

### Homepage (`src/app/page.tsx`)

The homepage shows a brief intro paragraph and lists your recent notes + selected projects. Edit the text directly in the JSX.

### About page (`src/app/about/page.tsx`)

A simple prose page. Edit the HTML/JSX content directly. It uses the `prose` CSS class for styling.

### Projects page (`src/app/projects/page.tsx`)

Projects are defined as a simple array at the top of the file:

```tsx
const projects = [
  {
    title: "My Project",
    description: "What it does.",
    external: "https://github.com/...",
  },
  // Add more here
];
```

### Sidebar name (`src/components/Sidebar.tsx`)

To change the name displayed at the top of the sidebar, find this line and edit it:

```tsx
<h1 className="text-xl font-medium tracking-tight">anxiety</h1>
```

---

## 10. Changing Colors and Fonts

All visual styling is in `src/app/globals.css`.

### Colors

```css
/* Light Mode */
:root {
  --bg: #ffffff;          /* Page background */
  --fg: #111111;          /* Text color */
  --link: #0000ee;        /* Link color */
  --border-color: #e5e7eb; /* Border/divider color */
  --muted-text: #666666;  /* Secondary text color */
}

/* Dark Mode */
[data-theme="dark"] {
  --bg: #000000;          /* Page background (pure black) */
  --fg: #eeeeee;          /* Text color */
  --link: #8ab4f8;        /* Link color */
  --border-color: #333333; /* Border/divider color */
  --muted-text: #999999;  /* Secondary text color */
}
```

Just change the hex values to whatever you want.

### Body font

Edit the `font-family` in the `body` rule. Currently uses the system sans-serif stack.

### Prose (reading) font

Edit the `font-family` in the `.prose` rule. Currently uses Georgia/serif for that academic paper feel.

---

## 11. Deploying

### Automatic deployment (recommended)

Every time you push to the `main` branch, GitHub Actions automatically builds and deploys:

```bash
git add .
git commit -m "Add new note on X"
git push
```

That's it! The site updates in ~2 minutes.

### Manual build (for testing)

If you want to see exactly what will be deployed:

```bash
npm run build
```

This generates the static site in the `out/` folder. You can inspect the HTML files there.

### Checking deployment status

Go to your GitHub repository → **Actions** tab to see if the build succeeded or failed.

---

## 12. Common Errors and Fixes

### "Module not found" error

You probably have a typo in an import path. Double-check the file exists at the path specified.

### Math equations not rendering

- Make sure you have `$` or `$$` delimiters (not `\(` `\)`)
- Make sure there's no space between `$` and the equation for inline math
- Check for unescaped special characters. In MDX, `<` and `>` can break things — use `\lt` and `\gt` in math mode

### Images not showing

- Images must be in `public/images/`
- Reference them starting with `/images/` (not `public/images/`)
- Check the filename is exact (case-sensitive)

### Build fails on GitHub

- Go to Actions tab to see the error log
- Most common cause: a broken MDX file (missing frontmatter, unclosed tags)
- Fix the file locally, commit, and push again

### Port 3000 already in use

```bash
lsof -i :3000
kill -9 <PID>
```

Then run `npm run dev` again.

---

## 13. Cheat Sheet

### Add a new note
```bash
# 1. Create the file
touch content/math/my-new-note.mdx

# 2. Add frontmatter + content (see Section 4)

# 3. Preview
npm run dev

# 4. Deploy
git add . && git commit -m "Add my-new-note" && git push
```

### Frontmatter template
```yaml
---
title: ""
date: "2026-01-01"
description: ""
tags: ["TopicName"]
---
```

### Quick reference
| Task | How |
|---|---|
| Add a math note | Create `content/math/filename.mdx` |
| Add a physics note | Create `content/physics/filename.mdx` |
| Add a CS note | Create `content/cs/filename.mdx` |
| Add an image | Put in `public/images/`, reference as `/images/filename.png` |
| Inline math | `$E = mc^2$` |
| Block math | `$$` on its own line, equation, `$$` on its own line |
| Code block | Triple backticks with language name |
| Preview locally | `npm run dev` |
| Deploy | `git add . && git commit -m "msg" && git push` |
| Change colors | Edit `src/app/globals.css` |
| Change sidebar name | Edit `src/components/Sidebar.tsx` |
| Add a project | Edit the array in `src/app/projects/page.tsx` |

---

*Last updated: June 2026*
