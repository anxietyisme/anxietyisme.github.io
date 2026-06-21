"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { useTheme } from "next-themes";

interface MermaidProps {
  chart: string;
}

export function Mermaid({ chart }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    
    mermaid.initialize({
      startOnLoad: false,
      theme: currentTheme === "dark" ? "dark" : "default",
      securityLevel: "loose",
    });

    const renderChart = async () => {
      try {
        if (containerRef.current) {
          const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`;
          const { svg: renderedSvg } = await mermaid.render(id, chart);
          setSvg(renderedSvg);
        }
      } catch (error) {
        console.error("Mermaid rendering error:", error);
        setSvg(`<div class="text-red-500 bg-red-500/10 p-4 rounded-md">Error rendering diagram</div>`);
      }
    };

    renderChart();
  }, [chart, theme, systemTheme]);

  return (
    <div 
      className="my-8 flex justify-center w-full overflow-x-auto bg-surface py-6 rounded-xl border border-border"
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: svg || "<div class='text-muted text-sm'>Rendering diagram...</div>" }} 
    />
  );
}
