import React from "react";

const s = (d, vb = "0 0 24 24") => ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox={vb} fill="none" stroke="currentColor"
    strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>{d}</svg>
);

export const IconDashboard = s(<>
  <rect x="3" y="3" width="7" height="7" rx="1.5" />
  <rect x="14" y="3" width="7" height="4" rx="1.5" />
  <rect x="3" y="14" width="7" height="4" rx="1.5" />
  <rect x="14" y="11" width="7" height="7" rx="1.5" />
</>);

export const IconRules = s(<>
  <path d="M12 2l3 7h7l-5.5 4.5 2 7L12 16l-6.5 4.5 2-7L2 9h7z" fill="none" />
  <line x1="4" y1="21" x2="20" y2="21" />
</>);

export const IconGears = s(<>
  <circle cx="12" cy="12" r="3" />
  <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
</>);

export const IconIslamic = s(<>
  <circle cx="12" cy="12" r="9" />
  <path d="M15 8a5 5 0 00-5 5 5 5 0 005-5z" fill="currentColor" opacity="0.3" />
  <path d="M12 3v1M12 20v1M3 12h1M20 12h1" />
</>);

export const IconRegulatory = s(<>
  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
  <rect x="9" y="3" width="6" height="4" rx="1" />
  <path d="M9 14l2 2 4-4" />
</>);

export const IconLineage = s(<>
  <circle cx="5" cy="6" r="2.5" />
  <circle cx="19" cy="6" r="2.5" />
  <circle cx="12" cy="18" r="2.5" />
  <line x1="6.5" y1="8" x2="10.5" y2="16" />
  <line x1="17.5" y1="8" x2="13.5" y2="16" />
</>);

export const IconProfiling = s(<>
  <rect x="3" y="3" width="18" height="18" rx="2" />
  <path d="M7 17V13M12 17V8M17 17V11" strokeWidth="2.5" strokeLinecap="round" />
</>);

export const IconBenchmark = s(<>
  <path d="M18 20V10M12 20V4M6 20V14" strokeWidth="2.5" strokeLinecap="round" />
</>);

export const IconRoadmap = s(<>
  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
</>);

export const IconUser = s(<>
  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
  <circle cx="12" cy="7" r="4" />
</>);

export const IconSearch = s(<>
  <circle cx="11" cy="11" r="8" />
  <line x1="21" y1="21" x2="16.65" y2="16.65" />
</>);

export const IconAlert = s(<>
  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
  <line x1="12" y1="9" x2="12" y2="13" />
  <line x1="12" y1="17" x2="12.01" y2="17" />
</>);

export const IconShield = s(<>
  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
</>);

export const IconChevronLeft = s(<path d="M15 18l-6-6 6-6" />);
export const IconChevronRight = s(<path d="M9 18l6-6-6-6" />);

export const IconCheck = s(<path d="M20 6L9 17l-5-5" />);

export const IconClock = s(<>
  <circle cx="12" cy="12" r="10" />
  <path d="M12 6v6l4 2" />
</>);

export const IconDatabase = s(<>
  <ellipse cx="12" cy="5" rx="9" ry="3" />
  <path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3" />
  <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
</>);

export const IconLayers = s(<>
  <polygon points="12 2 2 7 12 12 22 7 12 2" />
  <polyline points="2 17 12 22 22 17" />
  <polyline points="2 12 12 17 22 12" />
</>);

export const IconTarget = s(<>
  <circle cx="12" cy="12" r="10" />
  <circle cx="12" cy="12" r="6" />
  <circle cx="12" cy="12" r="2" />
</>);
