import React from "react";
import { Card } from "../components";

const FRAMEWORKS = [
  { name: "BCBS 239", compliant: 11, partial: 2, gap: 1 },
  { name: "CBO Banking Law 2/2025", compliant: 38, partial: 3, gap: 1 },
  { name: "Oman PDPL (RD 6/2022)", compliant: 25, partial: 2, gap: 1 },
  { name: "CBO Cybersecurity Framework", compliant: 5, partial: 1, gap: 0 },
  { name: "IBRF (Islamic Banking)", compliant: 31, partial: 3, gap: 1 },
  { name: "Basel III/IV (BM 1140)", compliant: 21, partial: 2, gap: 1 },
  { name: "IFRS 9 Guidelines", compliant: 14, partial: 3, gap: 1 },
  { name: "AML/CFT (RD 30/2016)", compliant: 19, partial: 2, gap: 1 },
];

export default function RegulatoryPage({ lang }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          {lang === "ar" ? "الامتثال التنظيمي" : "Regulatory Compliance"}
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          {lang === "ar" ? "مراقبة الامتثال — البنك المركزي العماني، بازل، قانون حماية البيانات" : "Multi-framework compliance — CBO, BCBS 239, PDPL, IBRF, Basel, FATF"}
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Overall Compliance", value: "86.4%", color: "text-sky-400" },
          { label: "Frameworks Tracked", value: "8", color: "text-purple-400" },
          { label: "Controls Mapped", value: "189", color: "text-emerald-400" },
          { label: "Gaps Identified", value: "7", color: "text-red-400" },
        ].map((k, i) => (
          <Card key={i} className="p-4 text-center">
            <p className={`text-3xl font-bold ${k.color}`}>{k.value}</p>
            <p className="text-xs text-slate-400 mt-1">{k.label}</p>
          </Card>
        ))}
      </div>

      <Card className="p-5">
        <h3 className="text-sm font-semibold text-slate-300 mb-4">
          {lang === "ar" ? "حالة الأطر التنظيمية" : "Regulatory Framework Status"}
        </h3>
        <div className="space-y-3">
          {FRAMEWORKS.map((f, i) => {
            const total = f.compliant + f.partial + f.gap;
            const pct = Math.round((f.compliant / total) * 100);
            return (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-white/[0.015] border border-white/[0.04] hover:bg-white/[0.025] transition-colors">
                <div className="w-52 flex-shrink-0">
                  <p className="text-sm text-white font-semibold">{f.name}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{total} total controls</p>
                </div>
                <div className="flex-1">
                  <div className="flex h-3.5 rounded-full overflow-hidden bg-slate-800/80">
                    <div className="bg-emerald-500/70 transition-all duration-500" style={{ width: `${(f.compliant / total) * 100}%` }} />
                    <div className="bg-amber-500/70 transition-all duration-500" style={{ width: `${(f.partial / total) * 100}%` }} />
                    {f.gap > 0 && <div className="bg-red-500/70 transition-all duration-500" style={{ width: `${(f.gap / total) * 100}%` }} />}
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[11px] flex-shrink-0">
                  <span className="text-emerald-400 font-medium">{f.compliant} \u2713</span>
                  <span className="text-amber-400 font-medium">{f.partial} \u25D0</span>
                  <span className="text-red-400 font-medium">{f.gap} \u2715</span>
                </div>
                <span className="text-sm font-bold text-sky-400 w-12 text-right flex-shrink-0">{pct}%</span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-6 mt-4 text-[11px] text-slate-500">
          <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded-sm bg-emerald-500/70" /> Compliant</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded-sm bg-amber-500/70" /> Partial</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded-sm bg-red-500/70" /> Gap</span>
        </div>
      </Card>
    </div>
  );
}
