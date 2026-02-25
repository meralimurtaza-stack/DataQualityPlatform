import React, { useState, useEffect } from "react";
import { Card, KpiCard, ScoreRing, MiniBar, SeverityBadge } from "../components";
import { DOMAINS, DIMENSIONS, ALERTS, RULES_DATA } from "../data";

/* ── Critical issues per domain (what appears when you click) ── */
const DOMAIN_ISSUES = {
  kyc: [
    { id: "CI-001", title: "National ID mismatch — 847 records", severity: "critical", rule: "R-001", field: "national_id", failRate: 0.3, impact: "Regulatory: CBO AML/KYC inspection risk", detected: "Today 09:14", status: "Open" },
    { id: "CI-002", title: "Cross-system KYC status conflict — core vs digital", severity: "critical", rule: "R-008", field: "kyc_status", failRate: 3.2, impact: "Operational: Inconsistent risk classification", detected: "Today 07:30", status: "Investigating" },
    { id: "CI-003", title: "Missing source-of-funds for 1,204 corporate accounts", severity: "high", rule: "R-010", field: "source_of_funds", failRate: 4.1, impact: "Regulatory: FATF recommendation non-compliance", detected: "Yesterday", status: "Assigned" },
    { id: "CI-004", title: "Duplicate customer clusters — 312 potential matches", severity: "high", rule: "R-003", field: "customer_name", failRate: 1.8, impact: "Risk: Inflated exposure calculations", detected: "Yesterday", status: "Open" },
    { id: "CI-005", title: "Expired ID documents — 89 high-risk customers", severity: "medium", rule: "R-011", field: "id_expiry_date", failRate: 0.9, impact: "Compliance: Enhanced due diligence required", detected: "2 days ago", status: "Open" },
  ],
  aml: [
    { id: "CI-006", title: "Missing originator details — 2,341 cross-border transfers", severity: "critical", rule: "R-006", field: "originator_name", failRate: 2.6, impact: "Regulatory: FATF Travel Rule violation", detected: "Today 08:45", status: "Escalated" },
    { id: "CI-007", title: "Transaction monitoring gap — 18hr processing lag", severity: "critical", rule: "R-012", field: "monitoring_timestamp", failRate: 0, impact: "Regulatory: Delayed suspicious activity detection", detected: "Today 06:00", status: "Investigating" },
    { id: "CI-008", title: "Sanctions screening bypass — batch file format error", severity: "critical", rule: "R-013", field: "screening_result", failRate: 1.1, impact: "Regulatory: Potential sanctions breach", detected: "Today 11:22", status: "Escalated" },
    { id: "CI-009", title: "Incomplete beneficiary data for OMR 50K+ transfers", severity: "critical", rule: "R-006", field: "beneficiary_address", failRate: 3.8, impact: "Regulatory: Large value transfer reporting", detected: "Yesterday", status: "Open" },
    { id: "CI-010", title: "STR reference linking failure — orphaned alerts", severity: "critical", rule: "R-014", field: "alert_case_id", failRate: 0.4, impact: "Operational: Lost audit trail", detected: "Yesterday", status: "Assigned" },
    { id: "CI-011", title: "Duplicate transaction IDs in monitoring feed", severity: "high", rule: "R-015", field: "transaction_id", failRate: 0.2, impact: "Operational: False alert inflation", detected: "2 days ago", status: "Open" },
  ],
  accounts: [
    { id: "CI-012", title: "Closed accounts with non-zero balance — 3 records", severity: "high", rule: "R-009", field: "current_balance", failRate: 0.01, impact: "Financial: GL reconciliation break", detected: "Yesterday", status: "Investigating" },
    { id: "CI-013", title: "Missing account classification code — 41 records", severity: "medium", rule: "R-016", field: "account_class", failRate: 0.3, impact: "Reporting: Basel III RWA misclassification risk", detected: "3 days ago", status: "Open" },
  ],
  payments: [
    { id: "CI-014", title: "OmanNet settlement mismatch — OMR 12,430 delta", severity: "critical", rule: "R-017", field: "settlement_total", failRate: 0, impact: "Financial: Reconciliation break with CBO", detected: "Today 10:15", status: "Escalated" },
    { id: "CI-015", title: "Invalid IBAN format — 156 rejected payments", severity: "critical", rule: "R-002", field: "beneficiary_iban", failRate: 0.1, impact: "Operational: Payment failures / customer complaints", detected: "Today 07:00", status: "Investigating" },
    { id: "CI-016", title: "Duplicate payment instructions — 8 flagged", severity: "critical", rule: "R-018", field: "payment_reference", failRate: 0.02, impact: "Financial: Double payment risk", detected: "Yesterday", status: "Open" },
    { id: "CI-017", title: "Late ACH file — 4hr beyond SLA", severity: "high", rule: "R-019", field: "file_timestamp", failRate: 0, impact: "Operational: Delayed salary processing", detected: "Yesterday", status: "Resolved" },
  ],
  islamic: [
    { id: "CI-018", title: "Murabaha hidden charge detected — 2 contracts", severity: "critical", rule: "R-004", field: "profit_calculation", failRate: 0.1, impact: "Sharia: Riba violation — Sharia Board escalation", detected: "Today 09:50", status: "Escalated" },
    { id: "CI-019", title: "Ijara rental not matching lease schedule — 14 contracts", severity: "critical", rule: "R-020", field: "rental_amount", failRate: 0.8, impact: "Sharia: Contract terms mismatch", detected: "Yesterday", status: "Investigating" },
    { id: "CI-020", title: "Prohibited industry exposure — counterparty flagged", severity: "critical", rule: "R-021", field: "counterparty_sector", failRate: 0.05, impact: "Sharia: Investment in haram sector", detected: "Today 11:00", status: "Escalated" },
    { id: "CI-021", title: "AAOIFI vs IFRS dual reporting gap — 31 accounts", severity: "critical", rule: "R-022", field: "accounting_standard", failRate: 1.7, impact: "Regulatory: Dual statement inconsistency", detected: "2 days ago", status: "Open" },
    { id: "CI-022", title: "Sukuk maturity date in Hijri not matching Gregorian", severity: "high", rule: "R-023", field: "maturity_date_hijri", failRate: 0.3, impact: "Operational: Contract date confusion", detected: "3 days ago", status: "Open" },
  ],
  risk: [
    { id: "CI-023", title: "PD model input stale — 3 days beyond refresh SLA", severity: "critical", rule: "R-024", field: "pd_refresh_date", failRate: 0, impact: "Regulatory: BCBS 239 timeliness breach", detected: "Today 08:00", status: "Investigating" },
    { id: "CI-024", title: "Large exposure missing counterparty linkage — 7 groups", severity: "critical", rule: "R-025", field: "group_id", failRate: 2.1, impact: "Regulatory: Large Exposure Report inaccuracy", detected: "Yesterday", status: "Assigned" },
    { id: "CI-025", title: "RWA calculation mismatch — IRB vs SA delta > 5%", severity: "critical", rule: "R-026", field: "rwa_amount", failRate: 0.8, impact: "Capital: Basel IV output floor compliance", detected: "2 days ago", status: "Open" },
    { id: "CI-026", title: "Missing collateral valuation — 42 exposures", severity: "high", rule: "R-027", field: "collateral_value", failRate: 1.9, impact: "Risk: LGD estimation unreliable", detected: "3 days ago", status: "Open" },
  ],
  ifrs9: [
    { id: "CI-027", title: "Stage migration data gap — 218 facilities missing SICR flag", severity: "critical", rule: "R-028", field: "sicr_indicator", failRate: 3.4, impact: "Financial: ECL underestimation risk", detected: "Today 10:00", status: "Investigating" },
    { id: "CI-028", title: "Forward-looking macro variables not updated — Q4 vintage", severity: "critical", rule: "R-007", field: "macro_scenario_date", failRate: 0, impact: "Financial: Outdated ECL provisions", detected: "Yesterday", status: "Escalated" },
    { id: "CI-029", title: "Origination date missing — 85 restructured loans", severity: "high", rule: "R-029", field: "origination_date", failRate: 1.2, impact: "Regulatory: Lifetime ECL calculation error", detected: "2 days ago", status: "Open" },
  ],
  cards: [
    { id: "CI-030", title: "Card switch reconciliation break — 14 transactions", severity: "critical", rule: "R-030", field: "switch_settlement", failRate: 0.01, impact: "Financial: Cardholder dispute risk", detected: "Yesterday", status: "Investigating" },
    { id: "CI-031", title: "POS terminal ID not in registry — 6 terminals", severity: "high", rule: "R-031", field: "terminal_id", failRate: 0.3, impact: "Operational: Unregistered merchant", detected: "2 days ago", status: "Open" },
  ],
};

/* ── Drill-down panel component ── */
function DomainDrillDown({ domain, lang, onClose }) {
  const issues = DOMAIN_ISSUES[domain.id] || [];
  const relatedRules = RULES_DATA.filter(r => r.domain === domain.name.split(" / ")[0] || r.domain === domain.name);
  const avg = Object.values(domain.scores).reduce((a, b) => a + b, 0) / 6;
  const critCount = issues.filter(i => i.severity === "critical").length;
  const highCount = issues.filter(i => i.severity === "high").length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-[#0d1b2a] border border-white/10 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-[#0d1b2a]/95 backdrop-blur-md border-b border-white/[0.06] px-6 py-4 flex items-center justify-between z-10 rounded-t-2xl">
          <div>
            <h2 className="text-lg font-bold text-white">{lang === "ar" ? domain.nameAr : domain.name}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{domain.rules} rules · {domain.issues} issues · {critCount} critical · {highCount} high</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-xl font-bold ${avg > 90 ? "text-emerald-400" : avg > 85 ? "text-sky-400" : avg > 80 ? "text-amber-400" : "text-red-400"}`}>
              {avg.toFixed(1)}%
            </span>
            <button onClick={onClose} className="w-8 h-8 rounded-lg bg-slate-700/50 border border-white/[0.06] flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-600/50 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Dimension breakdown */}
          <div className="grid grid-cols-6 gap-3">
            {DIMENSIONS.map(dim => {
              const val = domain.scores[dim.key];
              const color = val > 95 ? "text-emerald-400" : val > 90 ? "text-sky-400" : val > 85 ? "text-amber-400" : "text-red-400";
              const bg = val > 95 ? "bg-emerald-500/[0.06]" : val > 90 ? "bg-sky-500/[0.06]" : val > 85 ? "bg-amber-500/[0.06]" : "bg-red-500/[0.06]";
              const border = val > 95 ? "border-emerald-500/15" : val > 90 ? "border-sky-500/15" : val > 85 ? "border-amber-500/15" : "border-red-500/15";
              return (
                <div key={dim.key} className={`rounded-xl p-3 text-center border ${bg} ${border}`}>
                  <p className={`text-lg font-bold ${color}`}>{val.toFixed(1)}%</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{lang === "ar" ? dim.labelAr : dim.label}</p>
                </div>
              );
            })}
          </div>

          {/* Critical & High Issues */}
          <div>
            <h3 className="text-sm font-semibold text-slate-300 mb-3">
              {lang === "ar" ? "المشكلات الحرجة والعالية" : "Critical & High Priority Issues"}
            </h3>
            <div className="space-y-2">
              {issues.map(issue => (
                <div key={issue.id} className={`p-3.5 rounded-xl border transition-colors ${
                  issue.severity === "critical" ? "bg-red-500/[0.04] border-red-500/15 hover:bg-red-500/[0.08]" :
                  issue.severity === "high" ? "bg-orange-500/[0.03] border-orange-500/10 hover:bg-orange-500/[0.06]" :
                  "bg-white/[0.015] border-white/[0.04] hover:bg-white/[0.03]"
                }`}>
                  <div className="flex items-start gap-3">
                    <SeverityBadge severity={issue.severity} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-medium">{issue.title}</p>
                      <div className="flex items-center gap-4 mt-1.5">
                        <span className="text-[10px] text-slate-500">Rule: <span className="text-slate-400 font-mono">{issue.rule}</span></span>
                        <span className="text-[10px] text-slate-500">Field: <span className="text-slate-400 font-mono">{issue.field}</span></span>
                        {issue.failRate > 0 && <span className="text-[10px] text-slate-500">Fail rate: <span className="text-red-400 font-semibold">{issue.failRate}%</span></span>}
                        <span className="text-[10px] text-slate-500">{issue.detected}</span>
                      </div>
                      <p className="text-[11px] text-amber-400/80 mt-1.5">{issue.impact}</p>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-semibold flex-shrink-0 ${
                      issue.status === "Escalated" ? "bg-red-500/15 text-red-400 border border-red-500/20" :
                      issue.status === "Investigating" ? "bg-amber-500/15 text-amber-400 border border-amber-500/20" :
                      issue.status === "Assigned" ? "bg-sky-500/15 text-sky-400 border border-sky-500/20" :
                      issue.status === "Resolved" ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20" :
                      "bg-slate-700/50 text-slate-400 border border-white/[0.06]"
                    }`}>{issue.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related Rules */}
          {relatedRules.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-300 mb-3">
                {lang === "ar" ? "القواعد ذات الصلة" : "Related Quality Rules"}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      {["Rule", "Name", "Dimension", "Pass Rate", "Status"].map(h => (
                        <th key={h} className="px-3 py-2 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {relatedRules.map((r, i) => (
                      <tr key={r.id} className={`border-b border-white/[0.03] ${i % 2 ? "bg-white/[0.01]" : ""}`}>
                        <td className="px-3 py-2 text-xs font-mono text-slate-400">{r.id}</td>
                        <td className="px-3 py-2 text-xs text-white">{r.name}</td>
                        <td className="px-3 py-2 text-xs text-slate-300">{r.dimension}</td>
                        <td className="px-3 py-2">
                          <span className={`text-xs font-bold ${r.passRate >= 99.5 ? "text-emerald-400" : r.passRate >= 97 ? "text-sky-400" : "text-amber-400"}`}>
                            {r.passRate}%
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                            r.status === "Active" ? "bg-emerald-500/15 text-emerald-400" :
                            r.status === "Alert" ? "bg-red-500/15 text-red-400" :
                            "bg-amber-500/15 text-amber-400"
                          }`}>{r.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Main Dashboard ── */
export default function DashboardPage({ lang }) {
  const [animate, setAnimate] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState(null);
  useEffect(() => { setTimeout(() => setAnimate(true), 100); }, []);
  const dqi = 84.7;

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
            <span className="text-[10px] text-slate-500 font-normal ml-2">Click to drill down</span>
          </h3>
          <div className="space-y-3">
            {DOMAINS.map(d => {
              const avg = Object.values(d.scores).reduce((a, b) => a + b, 0) / 6;
              const barColor = avg > 90 ? "#22c55e" : avg > 85 ? "#0ea5e9" : avg > 80 ? "#f59e0b" : "#ef4444";
              const textColor = avg > 90 ? "text-emerald-400" : avg > 85 ? "text-sky-400" : avg > 80 ? "text-amber-400" : "text-red-400";
              return (
                <div key={d.id}
                  onClick={() => setSelectedDomain(d)}
                  className="flex items-center gap-3 group cursor-pointer rounded-lg px-2 py-1 -mx-2 hover:bg-white/[0.03] transition-all">
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
                  <svg className="w-4 h-4 text-slate-600 group-hover:text-sky-400 transition-colors flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
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

      {/* Drill-down modal */}
      {selectedDomain && (
        <DomainDrillDown domain={selectedDomain} lang={lang} onClose={() => setSelectedDomain(null)} />
      )}
    </div>
  );
}
