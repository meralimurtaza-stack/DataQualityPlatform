import React from "react";
import { Card } from "../components";

const NODES = [
  { id: "ekyc", label: "eKYC", sub: "Onboarding", x: 30, y: 40, type: "source" },
  { id: "cbs", label: "Core Banking", sub: "T24 / Finacle", x: 30, y: 160, type: "source" },
  { id: "omannet", label: "OmanNet", sub: "Payment Rails", x: 30, y: 280, type: "source" },
  { id: "raw", label: "Raw Zone", sub: "Landing", x: 230, y: 160, type: "process" },
  { id: "curated", label: "Curated Zone", sub: "Lakehouse", x: 410, y: 160, type: "process" },
  { id: "dq", label: "DQ-GULF", sub: "Rules Engine", x: 410, y: 40, type: "dq" },
  { id: "metrics", label: "Metrics Store", sub: "Quality Scoring", x: 590, y: 40, type: "dq" },
  { id: "reg", label: "Regulatory", sub: "Reporting", x: 590, y: 130, type: "consumer" },
  { id: "aml", label: "AML", sub: "Monitoring", x: 590, y: 210, type: "consumer" },
  { id: "dash", label: "DQI", sub: "Dashboard", x: 590, y: 290, type: "consumer" },
];

const EDGES = [
  ["ekyc", "raw"], ["cbs", "raw"], ["omannet", "raw"],
  ["raw", "curated"], ["curated", "dq"], ["dq", "metrics"],
  ["curated", "reg"], ["curated", "aml"], ["metrics", "dash"],
  ["dq", "reg"], ["dq", "aml"],
];

const TYPE_COLORS = {
  source: { fill: "#3b82f620", stroke: "#3b82f660", text: "#93c5fd" },
  process: { fill: "#8b5cf620", stroke: "#8b5cf660", text: "#c4b5fd" },
  dq: { fill: "#0ea5e920", stroke: "#0ea5e960", text: "#7dd3fc" },
  consumer: { fill: "#22c55e20", stroke: "#22c55e60", text: "#86efac" },
};

const TYPE_LABELS = [
  { label: "Sources", color: "#3b82f6" },
  { label: "Processing", color: "#8b5cf6" },
  { label: "DQ-GULF Engine", color: "#0ea5e9" },
  { label: "Consumers", color: "#22c55e" },
];

export default function LineagePage({ lang }) {
  const nodeMap = {};
  NODES.forEach(n => { nodeMap[n.id] = n; });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          {lang === "ar" ? "سلسلة البيانات" : "Data Lineage"}
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          {lang === "ar" ? "تتبع البيانات من المصدر إلى التقرير التنظيمي" : "End-to-end attribute-level tracking — ECB RDARR Guide / W3C PROV / OpenLineage"}
        </p>
      </div>

      <Card className="p-6">
        <svg width="100%" viewBox="0 0 740 360" className="overflow-visible">
          <defs>
            <marker id="arrowhead" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="7" markerHeight="5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#475569" />
            </marker>
          </defs>

          {/* Edges */}
          {EDGES.map(([fromId, toId], i) => {
            const f = nodeMap[fromId];
            const t = nodeMap[toId];
            return (
              <line key={i}
                x1={f.x + 75} y1={f.y + 22}
                x2={t.x} y2={t.y + 22}
                stroke="#334155" strokeWidth={1.5} markerEnd="url(#arrowhead)" />
            );
          })}

          {/* Nodes */}
          {NODES.map(n => {
            const c = TYPE_COLORS[n.type];
            return (
              <g key={n.id} className="cursor-pointer">
                <rect x={n.x} y={n.y} width={140} height={44} rx={8}
                  fill={c.fill} stroke={c.stroke} strokeWidth={1.5} />
                <text x={n.x + 70} y={n.y + 18} textAnchor="middle"
                  fill="white" fontSize={11} fontWeight={600}>{n.label}</text>
                <text x={n.x + 70} y={n.y + 32} textAnchor="middle"
                  fill={c.text} fontSize={9} opacity={0.7}>{n.sub}</text>
              </g>
            );
          })}

          {/* Zone labels */}
          {TYPE_LABELS.map((z, i) => (
            <text key={i} x={[100, 320, 480, 660][i]} y={345}
              textAnchor="middle" fill={z.color} fontSize={10} fontWeight={600} opacity={0.6}>
              {z.label}
            </text>
          ))}
        </svg>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Lineage Coverage", value: "94.2%", sub: "298 / 312 datasets traced" },
          { label: "Avg Depth", value: "4.3 hops", sub: "Source to final consumer" },
          { label: "Unknown Upstream", value: "3", sub: "Datasets with missing origin" },
        ].map((k, i) => (
          <Card key={i} className="p-4 text-center">
            <p className="text-2xl font-bold text-sky-400">{k.value}</p>
            <p className="text-xs text-slate-400 mt-1">{k.label}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">{k.sub}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
