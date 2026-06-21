"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area
} from "recharts";
import { useTheme } from "next-themes";

interface DataChartProps {
  data: any[];
  type?: "line" | "bar" | "area";
  xKey: string;
  yKey: string;
  height?: number;
  color?: string;
}

export function DataChart({ 
  data, 
  type = "line", 
  xKey, 
  yKey, 
  height = 300, 
  color = "#8ab4f8" 
}: DataChartProps) {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";
  
  const gridColor = isDark ? "#333" : "#e5e7eb";
  const textColor = isDark ? "#888" : "#666";
  const tooltipBg = isDark ? "#111" : "#fff";
  const tooltipBorder = isDark ? "#333" : "#e5e7eb";

  return (
    <div className="my-6 w-full rounded-xl border border-border p-4 bg-surface" style={{ height: `${height}px`, minHeight: 300 }}>
      <ResponsiveContainer width="100%" height="100%" minHeight={300}>
        {type === "line" ? (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey={xKey} stroke={textColor} tick={{fill: textColor}} />
            <YAxis stroke={textColor} tick={{fill: textColor}} />
            <Tooltip contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, color: isDark ? "#fff" : "#000" }} />
            <Line type="monotone" dataKey={yKey} stroke={color} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        ) : type === "area" ? (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey={xKey} stroke={textColor} tick={{fill: textColor}} />
            <YAxis stroke={textColor} tick={{fill: textColor}} />
            <Tooltip contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, color: isDark ? "#fff" : "#000" }} />
            <Area type="monotone" dataKey={yKey} stroke={color} fill={color} fillOpacity={0.3} />
          </AreaChart>
        ) : (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey={xKey} stroke={textColor} tick={{fill: textColor}} />
            <YAxis stroke={textColor} tick={{fill: textColor}} />
            <Tooltip contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, color: isDark ? "#fff" : "#000" }} />
            <Bar dataKey={yKey} fill={color} radius={[4, 4, 0, 0]} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
