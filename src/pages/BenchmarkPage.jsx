import React, { useState } from "react";
import { Card, MiniBar } from "../components";
import { DIMENSIONS } from "../data";

const DEPT_DATA = [
  {
    id: "kyc", name: "KYC / Customer", head: "Fatma Al Balushi", steward: "Ahmed Al Rawahi",
    scores: { accuracy: 93.1, completeness: 91.8, consistency: 88.4, timeliness: 86.2, uniqueness: 95.1, validity: 96.3 },
    trend: [82, 84, 85, 87, 88, 89, 90, 91, 91, 92, 91, 91.5],
    rules: 247, issues: 12, critical: 2, datasets: 34, cdes: 128
  },
  {
    id: "aml", name: "AML / Transactions", head: "Khalid Al Hashmi", steward: "Sara Al Kindi",
    scores: { accuracy: 89.7, completeness: 87.2, consistency: 85.1, timeliness: 91.4, uniqueness: 97.8, validity: 93.6 },
    trend: [78, 79, 80, 81, 83, 84, 85, 86, 87, 88, 89, 90.8],
    rules: 312, issues: 28, critical: 5, datasets: 41, cdes: 156
  },
  {
    id: "accounts", name: "Accounts / Ledger", head: "Mohammed Al Farsi", steward: "Layla Al Jabri",
    scores: { accuracy: 97.2, completeness: 96.1, consistency: 94.8, timeliness: 93.5, uniqueness: 99.1, validity: 98.4 },
    trend: [90, 91, 92, 92, 93, 93, 94, 94, 95, 95, 96, 96.5],
    rules: 189, issues: 7, critical: 0, datasets: 22, cdes: 89
  },
  {
    id: "payments", name: "Payments / OmanNet", head: "Ali Al Busaidi", steward: "Maryam Al Lawati",
    scores: { accuracy: 91.3, completeness: 88.7, consistency: 86.9, timeliness: 84.1, uniqueness: 96.4, validity: 94.2 },
    trend: [80, 81, 82, 83, 84, 84, 85, 86, 87, 88, 89, 90.3],
    rules: 156, issues: 19, critical: 3, datasets: 28, cdes: 104
  },
  {
    id: "islamic", name: "Islamic Banking", head: "Yusuf Al Hinai", steward: "Aisha Al Mammari",
    scores: { accuracy: 88.4, completeness: 85.9, consistency: 82.7, timeliness: 80.3, uniqueness: 94.2, validity: 91.8 },
    trend: [72, 74, 75, 77, 78, 79, 80, 81, 83, 84, 86, 87.2],
    rules: 198, issues: 31, critical: 4, datasets: 36, cdes: 142
  },
  {
    id: "risk", name: "Risk / Basel III", head: "Nasser Al Maskari", steward: "Huda Al Siyabi",
    scores: { accuracy: 90.1, completeness: 87.6, consistency: 85.3, timeliness: 82.8, uniqueness: 96.7, validity: 93.1 },
    trend: [76, 77, 79, 80, 81, 82, 83, 84, 85, 86, 87, 89.3],
    rules: 221, issues: 22, critical: 3, datasets: 31, cdes: 118
  },
  {
    id: "ifrs9", name: "IFRS 9 / ECL", head: "Salim Al Abri", steward: "Noora Al Ghafri",
    scores: { accuracy: 86.8, completeness: 83.4, consistency: 81.2, timeliness: 78.9, uniqueness: 95.3, validity: 90.7 },
    trend: [70, 72, 73, 74, 76, 77, 78, 79, 80, 82, 83, 86.1],
    rules: 134, issues: 18, critical: 2, datasets: 19, cdes: 76
  },
  {
    id: "cards", name: "Cards / Switch", head: "Hamad Al Zadjali", steward: "Reem Al Harthi",
    scores: { accuracy: 94.6, completeness: 92.3, consistency: 90.1, timeliness: 89.7, uniqueness: 98.2, validity: 96.8 },
    trend: [85, 86, 87, 87, 88, 89, 89, 90, 91, 92, 93, 93.6],
    rules: 98, issues: 8, critical: 1, datasets: 16, cdes: 62
  },
];

function SparkLine({ data, color = "#0ea5e9", width = 120, height = 28 }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((v, i) =>
    `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * (height - 4) - 2}`
  ).join(" ");
  return (
    <svg width={width} height={height} className="flex-shrink-0">
      <polyline points={points} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={width} cy={height - ((data[data.length - 1] - min) / range) * (height - 4) - 2} r={2.5} fill={color} />
    </svg>
  );
}

export default function BenchmarkPage({ lang }) {
  const [sortBy, setSortBy] = useState("dqi");
  const [view, setView] = useState("overview");

  const sorted = [...DEPT_DATA].sort((a, b) => {
    const aAvg = Object.values(a.scores).reduce((s, v) => s + v, 0) / 6;
    const bAvg = Object.values(b.scores).reduce((s, v) => s + v, 0) / 6;
    if (sortBy === "dqi") return bAvg - aAvg;
    if (sortBy === "issues") return b.issues - a.issues;
    if (sortBy === "critical") return b.critical - a.critical;
    return bAvg - aAvg;
  });

  const allAvg = DEPT_DATA.reduce((s, d) => s + Object.values(d.scores).reduce((a, b) => a + b, 0) / 6, 0) / DEPT_DATA.length;
  const bestDept = sorted[0];
  const bestAvg = Object.values(bestDept.scores).reduce((a, b) => a + b, 0) / 6;
  const worstDept = sorted[sorted.length - 1];
  const worstAvg = Object.values(worstDept.scores).reduce((a, b) => a + b, 0) / 6;
  const maxImprover = [...DEPT_DATA].sort((a, b) => {
    const aGain = a.trend[a.trend.length - 1] - a.trend[0];
    const bGain = b.trend[b.trend.length - 1] - b.trend[0];
    return bGain - aGain;
  })[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {lang === "ar" ? "المقارنة المعيارية الداخلية" : "Internal Benchmarking"}
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {lang === "ar" ? "مقارنة جودة البيانات عبر الإدارات" : "DQI comparison across departments & domains | Bank Muscat — Q1 2026"}
          </p>
        </div>
        <div className="flex gap-1.5">
          {[
            { id: "overview", label: "Overview" },
            { id: "dimensions", label: "By Dimension" },
          ].map(v => (
            <button key={v.id} onClick={() => setView(v.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                view === v.id ? "bg-sky-500/20 text-sky-400 border border-sky-500/30" : "bg-slate-800/50 text-slate-400 border border-white/[0.04] hover:text-white"
              }`}>{v.label}</button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-sky-400">{allAvg.toFixed(1)}%</p>
          <p className="text-xs text-slate-400 mt-1">Enterprise Average DQI</p>
          <p className="text-[10px] text-slate-500">Across 8 departments</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-emerald-400">{bestDept.name}</p>
          <p className="text-xs text-slate-400 mt-1">Top Performer</p>
          <p className="text-[10px] text-slate-500">DQI {bestAvg.toFixed(1)}%</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-red-400">{worstDept.name}</p>
          <p className="text-xs text-slate-400 mt-1">Needs Attention</p>
          <p className="text-[10px] text-slate-500">DQI {worstAvg.toFixed(1)}%</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-amber-400">{maxImprover.name}</p>
          <p className="text-xs text-slate-400 mt-1">Fastest Improving</p>
          <p className="text-[10px] text-slate-500">+{(maxImprover.trend[maxImprover.trend.length - 1] - maxImprover.trend[0]).toFixed(1)} pts (12 months)</p>
        </Card>
      </div>

      {view === "overview" && (
        <>
          {/* Department Ranking */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-300">
                {lang === "ar" ? "ترتيب الإدارات" : "Department DQI Ranking"}
              </h3>
              <div className="flex gap-1.5">
                {[
                  { id: "dqi", label: "By DQI" },
                  { id: "issues", label: "By Issues" },
                  { id: "critical", label: "By Critical" },
                ].map(s => (
                  <button key={s.id} onClick={() => setSortBy(s.id)}
                    className={`px-2 py-1 rounded text-[10px] font-medium transition-all ${
                      sortBy === s.id ? "bg-sky-500/15 text-sky-400" : "text-slate-500 hover:text-slate-300"
                    }`}>{s.label}</button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {sorted.map((dept, i) => {
                const avg = Object.values(dept.scores).reduce((a, b) => a + b, 0) / 6;
                const barColor = avg > 93 ? "#22c55e" : avg > 89 ? "#0ea5e9" : avg > 85 ? "#f59e0b" : "#ef4444";
                const textColor = avg > 93 ? "text-emerald-400" : avg > 89 ? "text-sky-400" : avg > 85 ? "text-amber-400" : "text-red-400";
                return (
                  <div key={dept.id} className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      i === 0 ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20" :
                      i >= sorted.length - 2 ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                      "bg-slate-700/40 text-slate-400 border border-white/[0.04]"
                    }`}>{i + 1}</span>
                    <div className="w-40 flex-shrink-0">
                      <p className="text-sm text-white font-medium">{dept.name}</p>
                      <p className="text-[10px] text-slate-500">{dept.rules} rules · {dept.datasets} datasets</p>
                    </div>
                    <div className="flex-1">
                      <MiniBar value={avg} color={barColor} height={8} />
                    </div>
                    <SparkLine data={dept.trend} color={barColor} width={80} height={24} />
                    <span className={`text-sm font-bold w-14 text-right ${textColor}`}>{avg.toFixed(1)}%</span>
                    <div className="w-20 text-right flex-shrink-0">
                      {dept.critical > 0 ? (
                        <span className="text-[10px] bg-red-500/15 text-red-400 px-1.5 py-0.5 rounded border border-red-500/30 font-semibold">
                          {dept.critical} CRIT
                        </span>
                      ) : (
                        <span className="text-[10px] text-emerald-400 font-semibold">Clear</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Ownership Table */}
          <Card className="p-5">
            <h3 className="text-sm font-semibold text-slate-300 mb-4">
              {lang === "ar" ? "ملكية البيانات" : "Data Ownership & Stewardship"}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    {["Department", "Data Owner", "Data Steward", "Datasets", "CDEs", "Open Issues", "SLO Status"].map(h => (
                      <th key={h} className="px-3 py-2.5 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DEPT_DATA.map((d, i) => (
                    <tr key={d.id} className={`border-b border-white/[0.03] ${i % 2 ? "bg-white/[0.01]" : ""}`}>
                      <td className="px-3 py-2.5 text-white font-medium text-xs">{d.name}</td>
                      <td className="px-3 py-2.5 text-xs text-slate-300">{d.head}</td>
                      <td className="px-3 py-2.5 text-xs text-slate-400">{d.steward}</td>
                      <td className="px-3 py-2.5 text-xs text-slate-300 text-center">{d.datasets}</td>
                      <td className="px-3 py-2.5 text-xs text-slate-300 text-center">{d.cdes}</td>
                      <td className="px-3 py-2.5 text-center">
                        <span className={`text-xs font-bold ${d.critical > 0 ? "text-red-400" : "text-emerald-400"}`}>
                          {d.issues} {d.critical > 0 ? `(${d.critical} crit)` : ""}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-center">
                        <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                          d.critical === 0 ? "bg-emerald-500/15 text-emerald-400" :
                          d.critical <= 2 ? "bg-amber-500/15 text-amber-400" :
                          "bg-red-500/15 text-red-400"
                        }`}>
                          {d.critical === 0 ? "On Target" : d.critical <= 2 ? "At Risk" : "Breached"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}

      {view === "dimensions" && (
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-slate-300 mb-4">
            {lang === "ar" ? "مقارنة الأبعاد عبر الإدارات" : "Dimension Comparison Across Departments"}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="px-3 py-2.5 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Department</th>
                  {DIMENSIONS.map(d => (
                    <th key={d.key} className="px-3 py-2.5 text-center text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap" style={{ color: d.color }}>
                      {lang === "ar" ? d.labelAr : d.label}
                    </th>
                  ))}
                  <th className="px-3 py-2.5 text-center text-[11px] font-semibold text-sky-400 uppercase tracking-wider">DQI</th>
                </tr>
              </thead>
              <tbody>
                {DEPT_DATA.map((dept, i) => {
                  const avg = Object.values(dept.scores).reduce((a, b) => a + b, 0) / 6;
                  return (
                    <tr key={dept.id} className={`border-b border-white/[0.03] ${i % 2 ? "bg-white/[0.01]" : ""}`}>
                      <td className="px-3 py-3 text-white font-medium text-xs whitespace-nowrap">{dept.name}</td>
                      {DIMENSIONS.map(dim => {
                        const val = dept.scores[dim.key];
                        const color = val > 95 ? "text-emerald-400" : val > 90 ? "text-sky-400" : val > 85 ? "text-amber-400" : "text-red-400";
                        const bg = val > 95 ? "bg-emerald-500/5" : val > 90 ? "bg-sky-500/5" : val > 85 ? "bg-amber-500/5" : "bg-red-500/5";
                        return (
                          <td key={dim.key} className={`px-3 py-3 text-center ${bg}`}>
                            <span className={`text-xs font-bold ${color}`}>{val.toFixed(1)}</span>
                          </td>
                        );
                      })}
                      <td className="px-3 py-3 text-center">
                        <span className="text-sm font-bold text-sky-400">{avg.toFixed(1)}</span>
                      </td>
                    </tr>
                  );
                })}
                <tr className="border-t-2 border-white/10 bg-white/[0.02]">
                  <td className="px-3 py-3 text-sky-400 font-semibold text-xs">Enterprise Avg</td>
                  {DIMENSIONS.map(dim => {
                    const avg = DEPT_DATA.reduce((s, d) => s + d.scores[dim.key], 0) / DEPT_DATA.length;
                    return (
                      <td key={dim.key} className="px-3 py-3 text-center">
                        <span className="text-xs font-bold text-slate-300">{avg.toFixed(1)}</span>
                      </td>
                    );
                  })}
                  <td className="px-3 py-3 text-center">
                    <span className="text-sm font-bold text-sky-400">{allAvg.toFixed(1)}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
