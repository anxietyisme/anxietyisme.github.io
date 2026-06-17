import React, { ReactNode, isValidElement } from "react";
import { CopyButton } from "./CopyButton";

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  children?: ReactNode;
}

export function CodeBlock({ children, ...props }: CodeBlockProps) {
  let textToCopy = "";

  if (isValidElement(children)) {
    // Attempt to extract text from the children elements
    const codeProps = children.props as any;
    if (codeProps && codeProps.children) {
      if (typeof codeProps.children === "string") {
        textToCopy = codeProps.children;
      } else if (Array.isArray(codeProps.children)) {
        // rehype-pretty-code wraps code in spans
        textToCopy = codeProps.children
          .map((child: any) => {
            if (typeof child === "string") return child;
            if (isValidElement(child) && (child.props as any).children) {
              const innerChildren = (child.props as any).children;
              if (typeof innerChildren === "string") return innerChildren;
              if (Array.isArray(innerChildren)) {
                return innerChildren
                  .map((c: any) => (typeof c === "string" ? c : (c?.props?.children || "")))
                  .join("");
              }
            }
            return "";
          })
          .join("");
      }
    }
  } else if (typeof children === "string") {
    textToCopy = children;
  }

  return (
    <div className="relative group">
      <pre {...props}>{children}</pre>
      {textToCopy && <CopyButton code={textToCopy} />}
    </div>
  );
}
