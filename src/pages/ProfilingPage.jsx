import React from "react";
import { Card } from "../components";

const FIELDS = [
  { name: "customer_id", type: "VARCHAR", nullPct: 0.0, unique: 100, pattern: "CUST-\\d{8}", top: "CUST-00012847" },
  { name: "national_id", type: "VARCHAR", nullPct: 0.3, unique: 99.7, pattern: "\\d{8}", top: "12345678" },
  { name: "full_name_ar", type: "NVARCHAR", nullPct: 0.1, unique: 94.2, pattern: "Arabic text", top: "\u0645\u062d\u0645\u062f \u0628\u0646 \u0639\u0628\u062f\u0627\u0644\u0644\u0647" },
  { name: "full_name_en", type: "VARCHAR", nullPct: 2.1, unique: 93.8, pattern: "Latin text", top: "Mohammed Al Abdullah" },
  { name: "kyc_status", type: "ENUM", nullPct: 0.0, unique: 0.01, pattern: "VERIFIED|PENDING|EXPIRED", top: "VERIFIED (87%)" },
  { name: "risk_rating", type: "ENUM", nullPct: 0.5, unique: 0.01, pattern: "LOW|MEDIUM|HIGH|PEP", top: "LOW (72%)" },
  { name: "date_of_birth", type: "DATE", nullPct: 0.2, unique: 41.3, pattern: "YYYY-MM-DD", top: "1985-03-15" },
  { name: "phone_number", type: "VARCHAR", nullPct: 1.8, unique: 99.1, pattern: "+968\\d{8}", top: "+96891234567" },
  { name: "iban", type: "VARCHAR", nullPct: 3.2, unique: 98.9, pattern: "OM\\d{21}", top: "OM04012000000123456..." },
  { name: "source_of_funds", type: "VARCHAR", nullPct: 4.7, unique: 0.03, pattern: "SALARY|BUSINESS|...", top: "SALARY (61%)" },
  { name: "nationality", type: "VARCHAR", nullPct: 0.1, unique: 0.4, pattern: "ISO 3166-1 alpha-2", top: "OM (78%)" },
  { name: "employer_name", type: "VARCHAR", nullPct: 8.2, unique: 12.4, pattern: "Free text", top: "Ministry of Defence" },
];

export default function ProfilingPage({ lang }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          {lang === "ar" ? "تنميط البيانات" : "Data Profiling"}
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          {lang === "ar" ? "التحليل الإحصائي — سجل العميل الرئيسي" : "Statistical analysis — KYC Customer Master | 45,231 records profiled"}
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Records", value: "45,231", color: "text-sky-400" },
          { label: "Fields Profiled", value: "12", color: "text-purple-400" },
          { label: "Issues Found", value: "7", color: "text-amber-400" },
          { label: "Rules Suggested", value: "23", color: "text-emerald-400" },
        ].map((k, i) => (
          <Card key={i} className="p-4 text-center">
            <p className={`text-2xl font-bold ${k.color}`}>{k.value}</p>
            <p className="text-xs text-slate-400 mt-1">{k.label}</p>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {["Field Name", "Type", "Null %", "Unique %", "Pattern", "Top Value", "Status"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FIELDS.map((f, i) => {
                const status = f.nullPct === 0 ? "good" : f.nullPct < 2 ? "ok" : f.nullPct < 5 ? "review" : "action";
                const statusLabel = { good: "\u2713 Good", ok: "\u2713 OK", review: "\u25D0 Review", action: "\u26A0 Action" }[status];
                const statusColor = { good: "text-emerald-400", ok: "text-emerald-400", review: "text-amber-400", action: "text-red-400" }[status];
                return (
                  <tr key={f.name} className={`border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors ${i % 2 ? "bg-white/[0.01]" : ""}`}>
                    <td className="px-4 py-2.5 font-mono text-xs text-sky-400">{f.name}</td>
                    <td className="px-4 py-2.5 text-[11px] text-slate-500">{f.type}</td>
                    <td className="px-4 py-2.5">
                      <span className={`text-xs font-bold ${f.nullPct === 0 ? "text-emerald-400" : f.nullPct < 2 ? "text-sky-400" : f.nullPct < 5 ? "text-amber-400" : "text-red-400"}`}>
                        {f.nullPct}%
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-xs text-slate-300">{f.unique}%</td>
                    <td className="px-4 py-2.5 font-mono text-[10px] text-slate-500 max-w-[160px] truncate">{f.pattern}</td>
                    <td className="px-4 py-2.5 text-[11px] text-slate-400 max-w-[160px] truncate">{f.top}</td>
                    <td className={`px-4 py-2.5 text-xs font-semibold ${statusColor}`}>{statusLabel}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
