import React from "react";
import { Card, MiniBar } from "../components";
import { BANKS } from "../data";

export default function BenchmarkPage({ lang }) {
  const sorted = [...BANKS].sort((a, b) => b.dqi - a.dqi);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          {lang === "ar" ? "المقارنة المعيارية" : "GCC Bank Benchmarking"}
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          {lang === "ar" ? "مقارنة جودة البيانات عبر بنوك عمان" : "DQI comparison across Omani banking sector | Q1 2026"}
        </p>
      </div>

      <Card className="p-5">
        <h3 className="text-sm font-semibold text-slate-300 mb-5">
          {lang === "ar" ? "ترتيب البنوك حسب مؤشر الجودة" : "Bank DQI Ranking"}
        </h3>
        <div className="space-y-4">
          {sorted.map((bank, i) => (
            <div key={bank.id} className="flex items-center gap-4">
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                i === 0 ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" :
                i === 1 ? "bg-slate-400/15 text-slate-300 border border-slate-400/20" :
                i === 2 ? "bg-orange-800/20 text-orange-300 border border-orange-700/20" :
                "bg-slate-700/40 text-slate-400 border border-white/[0.04]"
              }`}>{i + 1}</span>
              <div className="w-48 flex-shrink-0">
                <p className="text-sm text-white font-medium">{bank.name}</p>
                <p className="text-[10px] text-slate-500">OMR {bank.assets} \u00B7 {bank.type}</p>
              </div>
              <div className="flex-1">
                <MiniBar value={bank.dqi}
                  color={bank.dqi > 85 ? "#0ea5e9" : bank.dqi > 80 ? "#f59e0b" : "#ef4444"} height={10} />
              </div>
              <span className="text-lg font-bold text-white w-14 text-right">{bank.dqi}</span>
              <span className="text-xs text-emerald-400 w-12 text-right font-medium">{bank.trend}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Sector Average DQI", value: "81.8", sub: "Across 6 monitored banks" },
          { label: "Top Performer", value: "Bank Muscat", sub: "DQI 87.2 — Commercial" },
          { label: "Fastest Improving", value: "Alizz Islamic", sub: "+5.1 pts this quarter" },
        ].map((k, i) => (
          <Card key={i} className="p-4 text-center">
            <p className="text-xl font-bold text-sky-400">{k.value}</p>
            <p className="text-xs text-slate-400 mt-1">{k.label}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">{k.sub}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
