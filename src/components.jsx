import React from "react";

// ─── BADGES & INDICATORS ────────────────────────────────────────────────────

const sevColors = {
  critical: "bg-red-500/15 text-red-400 border-red-500/30",
  high: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  medium: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  low: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Critical: "bg-red-500/15 text-red-400 border-red-500/30",
  High: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  Medium: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
};

export function SeverityBadge({ severity }) {
  return (
    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border whitespace-nowrap ${sevColors[severity] || sevColors.low}`}>
      {severity?.toUpperCase()}
    </span>
  );
}

export function StatusDot({ status }) {
  const c = status === "Active" ? "bg-emerald-400" : status === "Warning" ? "bg-yellow-400" : "bg-red-400";
  return <span className={`inline-block w-2 h-2 rounded-full ${c}`} />;
}

// ─── BARS & RINGS ───────────────────────────────────────────────────────────

export function MiniBar({ value, color = "#0ea5e9", height = 6 }) {
  return (
    <div className="w-full rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)", height }}>
      <div className="h-full rounded-full transition-all duration-700 ease-out"
        style={{ width: `${Math.min(100, value)}%`, background: color }} />
    </div>
  );
}

export function ScoreRing({ value, size = 120, stroke = 8, color = "#0ea5e9", label }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - value / 100);
  return (
    <div className="relative flex flex-col items-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          className="transition-all duration-1000 ease-out" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-white">{value.toFixed(1)}</span>
        {label && <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">{label}</span>}
      </div>
    </div>
  );
}

// ─── CARD ────────────────────────────────────────────────────────────────────

export function Card({ children, className = "", onClick }) {
  return (
    <div onClick={onClick}
      className={`rounded-xl border border-white/[0.06] bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm ${className}`}
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)" }}>
      {children}
    </div>
  );
}

// ─── KPI CARD ────────────────────────────────────────────────────────────────

export function KpiCard({ label, value, delta, colorClass = "text-sky-400" }) {
  return (
    <Card className="p-4">
      <p className="text-xs text-slate-400 mb-2 truncate">{label}</p>
      <p className={`text-2xl font-bold ${colorClass}`}>{value}</p>
      <p className="text-[11px] text-slate-500 mt-1">{delta}</p>
    </Card>
  );
}
