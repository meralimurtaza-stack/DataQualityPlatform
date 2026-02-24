import React, { useState, useEffect } from "react";
import { Card, KpiCard, ScoreRing, MiniBar, SeverityBadge } from "../components";
import { DOMAINS, DIMENSIONS, ALERTS } from "../data";

export default function DashboardPage({ lang }) {
  const [animate, setAnimate] = useState(false);
  useEffect(() => { setTimeout(() => setAnimate(true), 100); }, []);
  const dqi = 84.7;

  // Dimension display scores
  const dimScores = { accuracy: 91.2, completeness: 89.4, consistency: 86.7, timeliness: 82.1, uniqueness: 93.5, validity: 94.8 };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {lang === "ar" ? "لوحة القيادة المؤسسية" : "Enterprise DQI Dashboard"}
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Bank Muscat — {lang === "ar" ? "آخر تحديث: اليوم 14:32" : "Last updated: Today 14:32 GST"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {lang === "ar" ? "مباشر" : "LIVE"}
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-slate-700/50 text-slate-300 text-xs border border-white/5">Q1 2026</span>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-5 gap-4">
        <KpiCard label={lang === "ar" ? "مؤشر جودة البيانات" : "Enterprise DQI"} value="84.7%" delta="+2.1% vs last month" colorClass="text-sky-400" />
        <KpiCard label={lang === "ar" ? "القواعد النشطة" : "Active Rules"} value="1,555" delta="+47 this month" colorClass="text-purple-400" />
        <KpiCard label={lang === "ar" ? "المشكلات المفتوحة" : "Open Issues"} value="145" delta="20 critical" colorClass="text-red-400" />
        <KpiCard label={lang === "ar" ? "قواعد بيانات مراقبة" : "Datasets Monitored"} value="312" delta="98.4% coverage" colorClass="text-emerald-400" />
        <KpiCard label={lang === "ar" ? "التزام الخدمة" : "SLO Compliance"} value="96.2%" delta="3 breaches this week" colorClass="text-amber-400" />
      </div>

      {/* DQI Ring + Domain Scores */}
      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-4 p-6 flex flex-col items-center justify-center">
          <ScoreRing value={animate ? dqi : 0} size={160} stroke={10} color="#0ea5e9" label="DQI" />
          <p className="text-sm text-slate-300 mt-5 font-medium">
            {lang === "ar" ? "مؤشر جودة البيانات المؤسسي" : "Enterprise Data Quality Index"}
          </p>
          <p className="text-[10px] text-slate-500 mt-1 text-center">
            DQI = Acc(30%) + Comp(25%) + Cons(20%) + Time(15%) + Uniq(10%)
          </p>
          <div className="mt-5 w-full grid grid-cols-3 gap-x-4 gap-y-3">
            {DIMENSIONS.map(d => (
              <div key={d.key} className="text-center">
                <p className="text-base font-bold" style={{ color: d.color }}>
                  {dimScores[d.key]}%
                </p>
                <p className="text-[10px] text-slate-500">{lang === "ar" ? d.labelAr : d.label}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="col-span-8 p-5">
          <h3 className="text-sm font-semibold text-slate-300 mb-4">
            {lang === "ar" ? "جودة البيانات حسب المجال" : "Data Quality by Domain"}
          </h3>
          <div className="space-y-3">
            {DOMAINS.map(d => {
              const avg = Object.values(d.scores).reduce((a, b) => a + b, 0) / 6;
              const barColor = avg > 90 ? "#22c55e" : avg > 85 ? "#0ea5e9" : avg > 80 ? "#f59e0b" : "#ef4444";
              const textColor = avg > 90 ? "text-emerald-400" : avg > 85 ? "text-sky-400" : avg > 80 ? "text-amber-400" : "text-red-400";
              return (
                <div key={d.id} className="flex items-center gap-3 group">
                  <div className="w-40 truncate">
                    <p className="text-sm text-white font-medium group-hover:text-sky-400 transition-colors">
                      {lang === "ar" ? d.nameAr : d.name}
                    </p>
                    <p className="text-[10px] text-slate-500">{d.rules} rules · {d.issues} issues</p>
                  </div>
                  <div className="flex-1">
                    <MiniBar value={avg} color={barColor} height={8} />
                  </div>
                  <span className={`text-sm font-bold w-14 text-right ${textColor}`}>{avg.toFixed(1)}%</span>
                  {d.critical > 0 && (
                    <span className="text-[10px] bg-red-500/15 text-red-400 px-1.5 py-0.5 rounded border border-red-500/30 font-semibold whitespace-nowrap">
                      {d.critical} CRIT
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Alerts */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-300">
            {lang === "ar" ? "التنبيهات الحية" : "Live Alert Feed"}
          </h3>
          <span className="text-xs text-slate-500">{ALERTS.length} active</span>
        </div>
        <div className="space-y-2">
          {ALERTS.map(a => (
            <div key={a.id} className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
              a.severity === "critical" ? "bg-red-500/[0.04] border-red-500/15 hover:bg-red-500/[0.07]" :
              a.severity === "high" ? "bg-orange-500/[0.03] border-orange-500/10 hover:bg-orange-500/[0.06]" :
              "bg-white/[0.015] border-white/[0.04] hover:bg-white/[0.03]"
            }`}>
              <span className="text-xs text-slate-500 w-12 flex-shrink-0 pt-0.5 font-mono">{a.time}</span>
              <SeverityBadge severity={a.severity} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-medium">{a.title}</p>
                <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{a.message}</p>
              </div>
              <span className="text-[11px] text-slate-600 font-mono flex-shrink-0">{a.rule}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
