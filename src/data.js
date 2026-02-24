// ─── STATIC DATA ────────────────────────────────────────────────────────────

export const BANKS = [
  { id: "bm", name: "Bank Muscat", assets: "14.04B", type: "Commercial", dqi: 87.2, trend: "+2.1" },
  { id: "si", name: "Sohar International", assets: "4.2B", type: "Commercial", dqi: 82.5, trend: "+3.4" },
  { id: "bd", name: "Bank Dhofar", assets: "3.8B", type: "Commercial", dqi: 79.8, trend: "+1.8" },
  { id: "bn", name: "Bank Nizwa", assets: "1.9B", type: "Islamic", dqi: 84.1, trend: "+4.2" },
  { id: "ai", name: "Alizz Islamic", assets: "1.1B", type: "Islamic", dqi: 76.3, trend: "+5.1" },
  { id: "nbo", name: "National Bank of Oman", assets: "3.5B", type: "Commercial", dqi: 81.0, trend: "+2.7" },
];

export const DIMENSIONS = [
  { key: "accuracy", label: "Accuracy", labelAr: "الدقة", weight: 30, color: "#0ea5e9" },
  { key: "completeness", label: "Completeness", labelAr: "الاكتمال", weight: 25, color: "#22c55e" },
  { key: "consistency", label: "Consistency", labelAr: "الاتساق", weight: 20, color: "#a855f7" },
  { key: "timeliness", label: "Timeliness", labelAr: "التوقيت", weight: 15, color: "#f59e0b" },
  { key: "uniqueness", label: "Uniqueness", labelAr: "التفرد", weight: 10, color: "#ef4444" },
  { key: "validity", label: "Validity", labelAr: "الصلاحية", weight: 0, color: "#06b6d4" },
];

const seed = (base) => {
  // Deterministic-ish scores per domain
  const r = (min, max) => min + ((base * 7 + min * 13) % (max - min));
  return {
    accuracy: r(base - 3, base + 5),
    completeness: r(base - 1, base + 4),
    consistency: r(base - 4, base + 6),
    timeliness: r(base - 6, base + 3),
    uniqueness: r(base, base + 4),
    validity: r(base + 1, base + 5),
  };
};

export const DOMAINS = [
  { id: "kyc", name: "KYC / Customer", nameAr: "اعرف عميلك", scores: seed(92), rules: 247, issues: 12, critical: 2 },
  { id: "aml", name: "AML / Transactions", nameAr: "مكافحة غسل الأموال", scores: seed(89), rules: 312, issues: 28, critical: 5 },
  { id: "accounts", name: "Accounts / Ledger", nameAr: "الحسابات", scores: seed(95), rules: 189, issues: 7, critical: 0 },
  { id: "payments", name: "Payments / OmanNet", nameAr: "المدفوعات", scores: seed(87), rules: 156, issues: 19, critical: 3 },
  { id: "islamic", name: "Islamic Banking", nameAr: "الصيرفة الإسلامية", scores: seed(84), rules: 198, issues: 31, critical: 4 },
  { id: "risk", name: "Risk / Basel III", nameAr: "المخاطر", scores: seed(86), rules: 221, issues: 22, critical: 3 },
  { id: "ifrs9", name: "IFRS 9 / ECL", nameAr: "المعيار الدولي", scores: seed(83), rules: 134, issues: 18, critical: 2 },
  { id: "cards", name: "Cards / Switch", nameAr: "البطاقات", scores: seed(91), rules: 98, issues: 8, critical: 1 },
];

export const RULES_DATA = [
  { id: "R-001", name: "KYC National ID Format", domain: "KYC", dimension: "Validity", regulation: "CBO BM 955 / PDPL", severity: "Critical", passRate: 99.7, status: "Active", description: "Validates Omani national ID format (8 digits starting with valid prefix)" },
  { id: "R-002", name: "IBAN Format Validation", domain: "Payments", dimension: "Validity", regulation: "CBO Open Banking", severity: "Critical", passRate: 99.9, status: "Active", description: "Oman IBAN must be 23 characters: OM + 2 check digits + 3 bank code + 16 account" },
  { id: "R-003", name: "Customer Duplicate Detection", domain: "KYC", dimension: "Uniqueness", regulation: "BCBS 239 Principle 3", severity: "High", passRate: 98.2, status: "Active", description: "Arabic name fuzzy matching with Character Equivalence Classes" },
  { id: "R-004", name: "Murabaha Profit Calculation", domain: "Islamic", dimension: "Accuracy", regulation: "IBRF / AAOIFI FAS 2", severity: "Critical", passRate: 99.8, status: "Active", description: "Sale price must equal cost + agreed profit margin — zero hidden charges (riba check)" },
  { id: "R-005", name: "Sukuk Asset-Backing", domain: "Islamic", dimension: "Validity", regulation: "IBRF / AAOIFI FAS 17", severity: "Critical", passRate: 100.0, status: "Active", description: "Underlying assets must be Sharia-compliant and genuinely backing the sukuk instrument" },
  { id: "R-006", name: "AML Transaction Completeness", domain: "AML", dimension: "Completeness", regulation: "FATF Travel Rule / RD 30/2016", severity: "Critical", passRate: 97.4, status: "Alert", description: "All mandatory originator/beneficiary fields populated for cross-border transfers" },
  { id: "R-007", name: "ECL Model Data Freshness", domain: "IFRS 9", dimension: "Timeliness", regulation: "IFRS 9 / CBO Guidelines", severity: "High", passRate: 95.1, status: "Warning", description: "PD/LGD/EAD model inputs must be refreshed within T+1 of reporting date" },
  { id: "R-008", name: "Cross-System KYC Consistency", domain: "KYC", dimension: "Consistency", regulation: "BCBS 239 Principle 4", severity: "High", passRate: 96.8, status: "Warning", description: "Customer risk rating must match across core banking, channels, and regulatory reporting" },
  { id: "R-009", name: "GL-Subledger Reconciliation", domain: "Accounts", dimension: "Accuracy", regulation: "CBO Banking Law 2/2025", severity: "Critical", passRate: 99.95, status: "Active", description: "GL balances must reconcile to subledger totals within OMR 0.001 tolerance" },
  { id: "R-010", name: "Prohibited Industry Screening", domain: "Islamic", dimension: "Validity", regulation: "IBRF / Central Sharia Authority", severity: "Critical", passRate: 99.6, status: "Active", description: "Counterparty screening: alcohol, gambling, pork, weapons, tobacco" },
  { id: "R-011", name: "OmanNet Settlement Recon", domain: "Payments", dimension: "Accuracy", regulation: "CBO / OmanNet SLA", severity: "High", passRate: 99.8, status: "Active", description: "Posted transactions must reconcile against OmanNet settlement totals by EOD" },
  { id: "R-012", name: "Basel III CAR Data Complete", domain: "Risk", dimension: "Completeness", regulation: "BM 1140 / Basel III", severity: "Critical", passRate: 98.9, status: "Active", description: "All RWA components present for CET1, Tier 1, Total Capital (min 12% CAR)" },
  { id: "R-013", name: "Ijara Ownership Validation", domain: "Islamic", dimension: "Validity", regulation: "IBRF / AAOIFI FAS 8", severity: "High", passRate: 99.4, status: "Active", description: "Lessor must retain legal ownership of leased asset throughout Ijara contract" },
  { id: "R-014", name: "Hijri Date Consistency", domain: "Islamic", dimension: "Consistency", regulation: "IBRF", severity: "Medium", passRate: 97.2, status: "Warning", description: "Islamic contract dates (Hijri) must correspond correctly to Gregorian via Umm al-Qura" },
  { id: "R-015", name: "PDPL Consent Verification", domain: "KYC", dimension: "Completeness", regulation: "PDPL RD 6/2022", severity: "Critical", passRate: 98.5, status: "Active", description: "Explicit written consent record must exist for every data processing activity" },
];

export const ALERTS = [
  { id: 1, time: "14:32", severity: "critical", title: "AML Feed Freshness Breach", domain: "AML", message: "Transaction monitoring feed lag exceeded 120s SLO (current: 247s). Pipeline: aml_stream_ingest.", rule: "R-006" },
  { id: 2, time: "14:18", severity: "high", title: "KYC Duplicate Spike Detected", domain: "KYC", message: "Anomaly: 340% increase in fuzzy-match candidates in last 2 hours. Possible bulk upload.", rule: "R-003" },
  { id: 3, time: "13:55", severity: "critical", title: "Murabaha Profit Discrepancy", domain: "Islamic", message: "3 Murabaha contracts: sale_price \u2260 cost + agreed_profit. Potential riba violation.", rule: "R-004" },
  { id: 4, time: "13:41", severity: "medium", title: "IFRS 9 Staging Inconsistency", domain: "IFRS 9", message: "127 exposures show Stage 2 in ECL model but Stage 1 in core banking.", rule: "R-008" },
  { id: 5, time: "13:22", severity: "high", title: "OmanNet Recon Break", domain: "Payments", message: "Settlement delta: OMR 4,271.500 unreconciled. 17 transactions in break queue.", rule: "R-011" },
  { id: 6, time: "12:58", severity: "low", title: "Metadata Coverage Gap", domain: "Risk", message: "12 new Basel III report fields missing business glossary definitions.", rule: null },
];

export const IMPLEMENTATION_PHASES = [
  { phase: 0, name: "Pre-Sales", nameAr: "\u0645\u0627 \u0642\u0628\u0644 \u0627\u0644\u0628\u064a\u0639", duration: "2\u20134 wks", status: "complete", items: ["Stakeholder alignment & executive demo", "Business case with ROI model", "Pilot scope agreement", "Data quality health check (free)"] },
  { phase: 1, name: "Assessment & Planning", nameAr: "\u0627\u0644\u062a\u0642\u064a\u064a\u0645 \u0648\u0627\u0644\u062a\u062e\u0637\u064a\u0637", duration: "4\u20136 wks", status: "complete", items: ["DCAM maturity assessment", "Stakeholder RACI mapping", "Priority domain identification", "Quick-win catalog (dedup, IBAN, KYC)"] },
  { phase: 2, name: "Data Profiling & Baseline", nameAr: "\u0627\u0644\u062a\u0646\u0645\u064a\u0637 \u0648\u0627\u0644\u0623\u0633\u0627\u0633", duration: "4\u20138 wks", status: "active", items: ["Enterprise profiling across priority domains", "Measure CDEs across 6 dimensions", "Baseline DQI scorecard", "Critical issue register"] },
  { phase: 3, name: "Design & Rule Definition", nameAr: "\u0627\u0644\u062a\u0635\u0645\u064a\u0645 \u0648\u0627\u0644\u0642\u0648\u0627\u0639\u062f", duration: "6\u201310 wks", status: "upcoming", items: ["Domain workshops (2\u20133 hrs each)", "Rule categorization: Regulatory / Risk / Operational", "Threshold specifications", "Dashboard wireframes"] },
  { phase: 4, name: "Development & Config", nameAr: "\u0627\u0644\u062a\u0637\u0648\u064a\u0631 \u0648\u0627\u0644\u0625\u0639\u062f\u0627\u062f", duration: "8\u201312 wks", status: "upcoming", items: ["Rule implementation & testing", "Dashboard configuration", "Connector deployment", "Integration testing"] },
  { phase: 5, name: "Integration & Testing", nameAr: "\u0627\u0644\u062a\u0643\u0627\u0645\u0644 \u0648\u0627\u0644\u0627\u062e\u062a\u0628\u0627\u0631", duration: "6\u20138 wks", status: "upcoming", items: ["System integration testing", "Performance benchmarks", "Parallel run reconciliation", "Security penetration testing"] },
  { phase: 6, name: "UAT & Training", nameAr: "\u0627\u0644\u0627\u062e\u062a\u0628\u0627\u0631 \u0648\u0627\u0644\u062a\u062f\u0631\u064a\u0628", duration: "4\u20136 wks", status: "upcoming", items: ["Business sign-off (bilingual)", "Instructor-led training (EN/AR)", "Hierarchically sensitive sessions", "Knowledge transfer documentation"] },
  { phase: 7, name: "Go-Live & Hypercare", nameAr: "\u0627\u0644\u0625\u0637\u0644\u0627\u0642 \u0648\u0627\u0644\u062f\u0639\u0645", duration: "4\u20138 wks", status: "upcoming", items: ["Production deployment", "24/7 hypercare support", "SLA monitoring activation", "Incident response validation"] },
];
