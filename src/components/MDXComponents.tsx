import type { MDXComponents } from "mdx/types";
import { HandwrittenSketch } from "./HandwrittenSketch";

export function getMDXComponents(): MDXComponents {
  return {
    HandwrittenSketch,
    // Override default elements for consistent styling
    h1: (props) => (
      <h1 className="text-2xl font-bold tracking-tight mb-2" {...props} />
    ),
    h2: (props) => (
      <h2
        className="text-xl font-semibold mt-10 mb-3 pb-2 border-b border-border"
        {...props}
      />
    ),
    h3: (props) => (
      <h3 className="text-lg font-semibold mt-8 mb-2" {...props} />
    ),
    a: (props) => (
      <a
        className="text-accent border-b border-transparent hover:border-accent transition-colors duration-200"
        {...props}
      />
    ),
    blockquote: (props) => (
      <blockquote
        className="border-l-3 border-accent-muted pl-4 text-muted italic my-6"
        {...props}
      />
    ),
    table: (props) => (
      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm border-collapse" {...props} />
      </div>
    ),
    th: (props) => (
      <th
        className="text-left py-2 px-3 border-b-2 border-border font-semibold"
        {...props}
      />
    ),
    td: (props) => (
      <td className="py-2 px-3 border-b border-border" {...props} />
    ),
  };
}
