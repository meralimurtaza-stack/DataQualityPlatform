import React, { useState, useEffect } from "react";
import {
  IconDashboard, IconGears, IconIslamic, IconRegulatory,
  IconLineage, IconProfiling, IconBenchmark, IconRoadmap,
  IconChevronLeft, IconChevronRight,
} from "./icons";

import DashboardPage from "./pages/DashboardPage";
import RulesPage from "./pages/RulesPage";
import IslamicPage from "./pages/IslamicPage";
import RegulatoryPage from "./pages/RegulatoryPage";
import LineagePage from "./pages/LineagePage";
import ProfilingPage from "./pages/ProfilingPage";
import BenchmarkPage from "./pages/BenchmarkPage";
import ImplementationPage from "./pages/ImplementationPage";

// ─── NAV CONFIG ─────────────────────────────────────────────────────────────

const NAV = [
  { id: "dashboard",      Icon: IconDashboard,  label: "Dashboard",        labelAr: "لوحة القيادة" },
  { id: "rules",          Icon: IconGears,       label: "Rules Engine",     labelAr: "محرك القواعد" },
  { id: "islamic",        Icon: IconIslamic,     label: "Islamic Banking",  labelAr: "الصيرفة الإسلامية" },
  { id: "regulatory",     Icon: IconRegulatory,  label: "Regulatory",       labelAr: "الامتثال التنظيمي" },
  { id: "lineage",        Icon: IconLineage,     label: "Data Lineage",     labelAr: "سلسلة البيانات" },
  { id: "profiling",      Icon: IconProfiling,   label: "Profiling",        labelAr: "تنميط البيانات" },
  { id: "benchmark",      Icon: IconBenchmark,   label: "Benchmarking",     labelAr: "المقارنة المعيارية" },
  { id: "implementation", Icon: IconRoadmap,      label: "Implementation",   labelAr: "خارطة الطريق" },
];

const PAGES = {
  dashboard: DashboardPage,
  rules: RulesPage,
  islamic: IslamicPage,
  regulatory: RegulatoryPage,
  lineage: LineagePage,
  profiling: ProfilingPage,
  benchmark: BenchmarkPage,
  implementation: ImplementationPage,
};

// ─── NAV ITEM ───────────────────────────────────────────────────────────────

function NavItem({ Icon, label, active, onClick, collapsed }) {
  return (
    <button onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
        active
          ? "bg-sky-500/[0.12] text-sky-400 border border-sky-500/20"
          : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] border border-transparent"
      } ${collapsed ? "justify-center px-0" : ""}`}>
      <span className="flex-shrink-0"><Icon size={18} /></span>
      {!collapsed && <span className="truncate">{label}</span>}
    </button>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [lang, setLang] = useState("en");
  const [collapsed, setCollapsed] = useState(false);

  const PageComponent = PAGES[page] || DashboardPage;

  return (
    <div className="h-screen flex bg-slate-950 text-white overflow-hidden"
      style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'SF Pro Display', sans-serif" }}>

      {/* ── Sidebar ── */}
      <aside className={`${collapsed ? "w-[60px]" : "w-56"} flex-shrink-0 border-r border-white/[0.06] bg-slate-900/50 flex flex-col transition-all duration-300`}>

        {/* Logo */}
        <div className={`p-4 border-b border-white/[0.06] ${collapsed ? "px-2 flex justify-center" : ""}`}>
          {collapsed ? (
            <span className="text-sky-400 font-bold text-base tracking-tight">DQ</span>
          ) : (
            <div>
              <h2 className="text-[17px] font-bold tracking-tight">
                <span className="text-sky-400">DQ</span>
                <span className="text-slate-200">-GULF</span>
              </h2>
              <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">
                Data Quality Platform<br />for GCC Banking
              </p>
            </div>
          )}
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          {NAV.map(item => (
            <NavItem
              key={item.id}
              Icon={item.Icon}
              label={lang === "ar" ? item.labelAr : item.label}
              active={page === item.id}
              onClick={() => setPage(item.id)}
              collapsed={collapsed}
            />
          ))}
        </nav>

        {/* Bottom Controls */}
        <div className="p-2 border-t border-white/[0.06] space-y-1">
          <button onClick={() => setLang(l => l === "en" ? "ar" : "en")}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all ${collapsed ? "justify-center px-0" : ""}`}>
            <span className="text-sm">{lang === "en" ? "ع" : "En"}</span>
            {!collapsed && <span>{lang === "en" ? "العربية" : "English"}</span>}
          </button>
          <button onClick={() => setCollapsed(c => !c)}
            className="w-full flex items-center justify-center py-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/[0.04] transition-all">
            {collapsed ? <IconChevronRight size={16} /> : <IconChevronLeft size={16} />}
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 max-w-[1400px] mx-auto">
          <PageComponent lang={lang} />
        </div>
      </main>
    </div>
  );
}
