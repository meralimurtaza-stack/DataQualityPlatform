import React from "react";
import { Card } from "../components";
import { IMPLEMENTATION_PHASES } from "../data";

export default function ImplementationPage({ lang }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          {lang === "ar" ? "خارطة طريق التنفيذ" : "Implementation Roadmap"}
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          {lang === "ar" ? "8 مراحل — 6 إلى 18 شهراً حسب حجم البنك" : "8 Phases \u2014 Pre-Sales through Optimization | 6\u201318 months by bank size"}
        </p>
      </div>

      <div className="space-y-3">
        {IMPLEMENTATION_PHASES.map((p) => (
          <Card key={p.phase} className={`p-4 border-l-[3px] ${
            p.status === "complete" ? "border-l-emerald-500" :
            p.status === "active" ? "border-l-sky-500" : "border-l-slate-700"
          }`}>
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                p.status === "complete" ? "bg-emerald-500/15 text-emerald-400" :
                p.status === "active" ? "bg-sky-500/15 text-sky-400" : "bg-slate-700/40 text-slate-500"
              }`}>{p.phase}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-white font-semibold text-sm">{p.name}</h3>
                  <span className="text-[11px] text-slate-500">{p.nameAr}</span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-700/50 text-slate-400">{p.duration}</span>
                  {p.status === "complete" && (
                    <span className="text-[11px] text-emerald-400 font-semibold">\u2713 Complete</span>
                  )}
                  {p.status === "active" && (
                    <span className="text-[11px] text-sky-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" /> In Progress
                    </span>
                  )}
                </div>
                <div className="mt-2.5 grid grid-cols-2 gap-x-4 gap-y-1">
                  {p.items.map((item, i) => {
                    const done = p.status === "complete";
                    const partial = p.status === "active" && i < 2;
                    return (
                      <p key={i} className="text-xs text-slate-400 flex items-center gap-1.5">
                        <span className={`flex-shrink-0 ${done ? "text-emerald-500" : partial ? "text-sky-500" : "text-slate-600"}`}>
                          {done ? "\u2713" : partial ? "\u25CF" : "\u25CB"}
                        </span>
                        <span className={done ? "text-slate-400" : partial ? "text-slate-300" : "text-slate-500"}>
                          {item}
                        </span>
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-5">
        <h3 className="text-sm font-semibold text-slate-300 mb-4">
          {lang === "ar" ? "الجدول الزمني حسب حجم البنك" : "Timeline by Bank Size"}
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { size: "Small Bank", sub: "Assets < $5B", months: "6\u20139 months", examples: "Bank Nizwa, Alizz Islamic" },
            { size: "Mid-Size Bank", sub: "Assets $5\u201310B", months: "9\u201312 months", examples: "Sohar International, Bank Dhofar" },
            { size: "Large Bank", sub: "Assets > $10B", months: "12\u201318 months", examples: "Bank Muscat" },
          ].map((t, i) => (
            <div key={i} className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.04] text-center">
              <p className="text-white font-semibold text-sm">{t.size}</p>
              <p className="text-[10px] text-slate-500">{t.sub}</p>
              <p className="text-2xl font-bold text-sky-400 mt-2">{t.months}</p>
              <p className="text-[10px] text-slate-500 mt-1">{t.examples}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
