import React from "react";
import { Card, MiniBar } from "../components";

const PRODUCT_CHECKS = [
  { product: "Murabaha", rule: "sale_price == cost + agreed_profit", standard: "AAOIFI FAS 2", status: "pass", desc: "Zero tolerance: any hidden charge = riba violation" },
  { product: "Ijara", rule: "lessor_owns_asset == true && rental_known == true", standard: "AAOIFI FAS 8", status: "pass", desc: "Lessor must retain legal ownership throughout lease" },
  { product: "Sukuk", rule: "underlying_assets \u2208 sharia_compliant_list", standard: "AAOIFI FAS 17", status: "pass", desc: "Asset-backing must be genuine and Sharia-compliant" },
  { product: "Musharaka", rule: "loss \u221D capital_contribution && profit_ratio_agreed", standard: "AAOIFI FAS 4", status: "warn", desc: "3 contracts pending profit ratio re-validation" },
  { product: "Mudaraba", rule: "loss_borne_by_rab_al_mal && profit_shared_per_ratio", standard: "AAOIFI FAS 3", status: "pass", desc: "Capital provider bears losses; profit split per agreement" },
  { product: "Tawarruq", rule: "PROHIBITED in Oman", standard: "IBRF / CBO", status: "block", desc: "Commodity murabaha explicitly prohibited under Omani IBRF" },
];

const SCREENING = [
  { name: "Alcohol", flagged: 0 },
  { name: "Gambling", flagged: 2 },
  { name: "Pork Products", flagged: 0 },
  { name: "Weapons / Arms", flagged: 1 },
  { name: "Tobacco", flagged: 3 },
  { name: "Adult Entertainment", flagged: 0 },
];

const HIJRI = [
  { label: "Murabaha maturity dates", hijri: "1447-08-15", greg: "2026-02-08", status: "match" },
  { label: "Ijara rental periods", hijri: "1447-09-01", greg: "2026-02-22", status: "match" },
  { label: "Sukuk profit distribution", hijri: "1447-07-30", greg: "2026-01-28", status: "match" },
  { label: "Musharaka settlement", hijri: "1447-10-15", greg: "2026-04-07", status: "drift" },
];

export default function IslamicPage({ lang }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          {lang === "ar" ? "التحقق من الصيرفة الإسلامية" : "Islamic Banking Validation"}
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          {lang === "ar" ? "الامتثال الشرعي — الإطار التنظيمي المصرفي الإسلامي / هيئة المحاسبة" : "Sharia Compliance — IBRF / AAOIFI / Central Sharia Authority"}
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: lang === "ar" ? "معدل الامتثال الشرعي" : "Sharia Compliance Rate", value: "99.6%", color: "text-emerald-400" },
          { label: lang === "ar" ? "قواعد إسلامية نشطة" : "Active Islamic Rules", value: "198", color: "text-sky-400" },
          { label: lang === "ar" ? "مشكلات حرجة" : "Critical Issues", value: "4", color: "text-amber-400" },
        ].map((k, i) => (
          <Card key={i} className="p-4 text-center">
            <p className={`text-3xl font-bold ${k.color}`}>{k.value}</p>
            <p className="text-xs text-slate-400 mt-1">{k.label}</p>
          </Card>
        ))}
      </div>

      {/* Product Validation */}
      <Card className="p-5">
        <h3 className="text-sm font-semibold text-slate-300 mb-4">
          {lang === "ar" ? "التحقق من المنتجات الإسلامية" : "Islamic Product Validation Rules"}
        </h3>
        <div className="space-y-3">
          {PRODUCT_CHECKS.map((c, i) => (
            <div key={i} className={`flex items-center gap-4 p-3.5 rounded-lg border transition-colors ${
              c.status === "block" ? "bg-red-500/[0.06] border-red-500/20" :
              c.status === "warn" ? "bg-amber-500/[0.04] border-amber-500/15" :
              "bg-white/[0.015] border-white/[0.04]"
            }`}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5">
                  <span className="text-white font-semibold text-sm">{c.product}</span>
                  <span className="text-[10px] text-slate-500 bg-slate-800/80 px-2 py-0.5 rounded font-mono">{c.standard}</span>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-1.5">{c.rule}</p>
                <p className="text-[11px] text-slate-500 mt-1">{c.desc}</p>
              </div>
              <span className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
                c.status === "pass" ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20" :
                c.status === "warn" ? "bg-amber-500/15 text-amber-400 border border-amber-500/20" :
                "bg-red-500/15 text-red-400 border border-red-500/20"
              }`}>
                {c.status === "pass" ? "\u2713 PASS" : c.status === "warn" ? "\u26A0 REVIEW" : "\u2715 BLOCKED"}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Bottom Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Prohibited Industry Screening */}
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-slate-300 mb-4">
            {lang === "ar" ? "فحص القطاعات المحظورة" : "Prohibited Industry Screening"}
          </h3>
          <p className="text-[11px] text-slate-500 mb-3">Screening 12,847 counterparties</p>
          <div className="space-y-2.5">
            {SCREENING.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-sm text-slate-300 w-36">{s.name}</span>
                <div className="flex-1">
                  <MiniBar value={s.flagged === 0 ? 100 : 99.9} color={s.flagged === 0 ? "#22c55e" : "#f59e0b"} height={6} />
                </div>
                <span className={`text-xs font-semibold w-16 text-right ${s.flagged === 0 ? "text-emerald-400" : "text-amber-400"}`}>
                  {s.flagged === 0 ? "Clear" : `${s.flagged} flagged`}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Hijri Calendar */}
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-slate-300 mb-4">
            {lang === "ar" ? "التحقق من التقويم الهجري" : "Hijri Calendar Validation"}
          </h3>
          <p className="text-[11px] text-slate-500 mb-3">Umm al-Qura calculation method (Saudi standard)</p>
          <div className="space-y-2.5">
            {HIJRI.map((d, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.03]">
                <span className="text-xs text-slate-300">{d.label}</span>
                <div className="flex items-center gap-2.5">
                  <span className="text-[11px] text-slate-500 font-mono">{d.hijri}</span>
                  <span className="text-[10px] text-slate-600">\u2194</span>
                  <span className="text-[11px] text-slate-500 font-mono">{d.greg}</span>
                  <span className={`text-[11px] font-semibold ${d.status === "match" ? "text-emerald-400" : "text-amber-400"}`}>
                    {d.status === "match" ? "\u2713 Match" : "\u26A0 1-day drift"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
