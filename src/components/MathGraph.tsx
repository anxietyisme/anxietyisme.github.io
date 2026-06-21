"use client";

import React, { useMemo } from "react";
import { Mafs, Coordinates, Plot, Theme } from "mafs";

interface MathGraphProps {
  y?: string;
  x?: string;
  domain?: [number, number];
  height?: number;
  color?: string;
}

export function MathGraph({ 
  y, 
  x,
  domain = [-5, 5], 
  height = 300,
  color = Theme.indigo
}: MathGraphProps) {
  const plotFunction = useMemo(() => {
    if (y) {
      try {
        return new Function("x", `
          const { sin, cos, tan, exp, log, PI, E, abs, sqrt, pow } = Math;
          return ${y};
        `) as (x: number) => number;
      } catch (e) {
        console.error("Invalid math function string for y(x):", y);
      }
    }
    if (x) {
      try {
        return new Function("y", `
          const { sin, cos, tan, exp, log, PI, E, abs, sqrt, pow } = Math;
          return ${x};
        `) as (y: number) => number;
      } catch (e) {
        console.error("Invalid math function string for x(y):", x);
      }
    }
    return () => 0;
  }, [y, x]);

  return (
    <div className="my-6 w-full overflow-hidden rounded-xl border border-border">
      <Mafs height={height} viewBox={{ x: domain }}>
        <Coordinates.Cartesian />
        {y && <Plot.OfX y={(x) => Math.sin(x)} color={color} />}
        {x && <Plot.OfY x={(y) => Math.sin(y)} color={color} />}
      </Mafs>
    </div>
  );
}
