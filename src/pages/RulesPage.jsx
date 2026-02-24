import React, { useState } from "react";
import { Card, MiniBar, SeverityBadge, StatusDot } from "../components";
import { RULES_DATA } from "../data";
import { IconSearch } from "../icons";

export default function RulesPage({ lang }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = RULES_DATA.filter(r => {
    if (filter !== "All" && r.domain !== filter) return false;
    if (search && !r.name.toLowerCase().includes(search.toLowerCase()) && !r.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const domains = ["All", ...new Set(RULES_DATA.map(r => r.domain))];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          {lang === "ar" ? "محرك القواعد" : "Rules Engine"}
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          {lang === "ar" ? "مكتبة القواعد التنظيمية والمخاطر والتشغيلية" : "Regulatory, Risk & Operational Rule Library — 1,555 active rules"}
        </p>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
            <IconSearch size={15} />
          </div>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder={lang === "ar" ? "بحث عن قاعدة..." : "Search rules by name or ID..."}
            className="w-full bg-slate-800/50 border border-white/[0.06] rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/40 transition-colors" />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {domains.map(d => (
            <button key={d} onClick={() => setFilter(d)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === d
                  ? "bg-sky-500/20 text-sky-400 border border-sky-500/30"
                  : "bg-slate-800/50 text-slate-400 border border-white/[0.04] hover:text-white hover:border-white/10"
              }`}>{d}</button>
          ))}
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {["ID", "Rule Name", "Domain", "Dimension", "Regulation", "Severity", "Pass Rate", "Status"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={r.id} className={`border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors ${i % 2 ? "bg-white/[0.01]" : ""}`}>
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">{r.id}</td>
                  <td className="px-4 py-3 max-w-[240px]">
                    <p className="text-white font-medium truncate">{r.name}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5 truncate">{r.description}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-300 text-xs whitespace-nowrap">{r.domain}</td>
                  <td className="px-4 py-3 text-slate-300 text-xs whitespace-nowrap">{r.dimension}</td>
                  <td className="px-4 py-3 text-[11px] text-slate-400 max-w-[140px] truncate">{r.regulation}</td>
                  <td className="px-4 py-3"><SeverityBadge severity={r.severity} /></td>
                  <td className="px-4 py-3 min-w-[120px]">
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <MiniBar value={r.passRate}
                          color={r.passRate > 99 ? "#22c55e" : r.passRate > 97 ? "#f59e0b" : "#ef4444"} height={4} />
                      </div>
                      <span className={`text-xs font-bold whitespace-nowrap ${
                        r.passRate > 99 ? "text-emerald-400" : r.passRate > 97 ? "text-amber-400" : "text-red-400"
                      }`}>{r.passRate}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <StatusDot status={r.status} />
                    <span className="text-xs text-slate-400 ml-1.5">{r.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="p-12 text-center text-slate-500 text-sm">No rules match your search.</div>
        )}
      </Card>
    </div>
  );
}
