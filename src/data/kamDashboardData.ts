// KAM Dashboard Mock Data

export interface PortfolioKPI {
  id: string;
  label: string;
  primaryMetric: string;
  subtext: string;
  trend: "up" | "down" | "neutral";
  status: "good" | "warning" | "error" | "info";
  trendValue: string;
  drilldownType: "revenue" | "usage" | "demand" | "outages" | "alerts" | "opportunities";
}

export interface AttentionItem {
  id: string;
  customerId: string;
  customerName: string;
  accountId: string;
  industry: string;
  annualRevenue: string;
  reason: string;
  category: "outage" | "anomaly" | "contract" | "load" | "billing" | "quality" | "expansion";
  severity: "critical" | "high" | "medium";
  confidence: number;
  evidencePoints: string[];
  detectedAt: string;
  quickFacts: {
    label: string;
    value: string;
  }[];
}

export interface OpportunityItem {
  id: string;
  customerId: string;
  customerName: string;
  accountId: string;
  opportunityType: "efficiency" | "demand-response" | "electrification" | "solar" | "tariff" | "load-growth";
  opportunityName: string;
  estimatedValue: string;
  estimatedSavings?: string;
  confidence: number;
  evidence: string[];
  status: "new" | "reviewing" | "in-progress";
}

export interface KPIDrilldownData {
  title: string;
  description: string;
  chartData: { name: string; value: number; trend?: number }[];
  items: {
    id: string;
    customerId: string;
    customerName: string;
    metric: string;
    detail: string;
    status: "good" | "warning" | "error" | "info";
  }[];
}

// Portfolio KPIs - Ordered by importance (actionable first)
export const portfolioKPIs: PortfolioKPI[] = [
  {
    id: "alerts",
    label: "New Alerts",
    primaryMetric: "4",
    subtext: "Attention needed",
    trend: "up",
    status: "error",
    trendValue: "+1",
    drilldownType: "alerts",
  },
  {
    id: "opportunities",
    label: "New Opportunities",
    primaryMetric: "6",
    subtext: "Proactive engagement",
    trend: "up",
    status: "good",
    trendValue: "+2",
    drilldownType: "opportunities",
  },
  {
    id: "revenue",
    label: "Total Revenue Managed",
    primaryMetric: "$47.2M",
    subtext: "143 accounts • YTD Revenue",
    trend: "up",
    status: "good",
    trendValue: "+3.1%",
    drilldownType: "revenue",
  },
  {
    id: "usage",
    label: "Total Usage",
    primaryMetric: "892 GWh",
    subtext: "Load Factor: 72.4%",
    trend: "up",
    status: "info",
    trendValue: "+2.1%",
    drilldownType: "usage",
  },
  {
    id: "demand",
    label: "Peak Demand Trends",
    primaryMetric: "1.24 GW",
    subtext: "Portfolio coincident peak",
    trend: "up",
    status: "warning",
    trendValue: "+4.2%",
    drilldownType: "demand",
  },
  {
    id: "outages",
    label: "Outage Frequency",
    primaryMetric: "4",
    subtext: "Events in last 30 days",
    trend: "up",
    status: "error",
    trendValue: "+1",
    drilldownType: "outages",
  },
];

// Attention Items (Triage Engine Output) - Industrial & Large Commercial only
export const attentionItems: AttentionItem[] = [
  {
    id: "att-001",
    customerId: "11",
    customerName: "Giant Food",
    accountId: "9010001234",
    industry: "Industrial",
    annualRevenue: "$2.4M",
    reason: "Outage at Chestnut Street Location - 20 Minutes, $50K Loss",
    category: "outage",
    severity: "critical",
    confidence: 96,
    evidencePoints: [
      "Outage duration: 20 minutes at Chestnut Street location",
      "Estimated loss: $50K due to operational downtime",
      "Critical refrigeration equipment affected",
      "Emergency backup generation deployed",
    ],
    detectedAt: "20 minutes ago",
    quickFacts: [
      { label: "Peak Demand", value: "4.2 MW" },
      { label: "Monthly Bill", value: "$287K" },
      { label: "Loss", value: "$50K" },
    ],
  },
  {
    id: "att-002",
    customerId: "12",
    customerName: "Keystone Manufacturing Group",
    accountId: "9010002345",
    industry: "Industrial",
    annualRevenue: "$8.7M",
    reason: "2nd Outage This Quarter - Customer Escalation Expected",
    category: "outage",
    severity: "critical",
    confidence: 94,
    evidencePoints: [
      "2nd unplanned outage in past 90 days",
      "Previous outage on Oct 15 lasted 45 minutes",
      "Production line downtime during both events",
      "Customer expressed concern in last account review",
    ],
    detectedAt: "4 hours ago",
    quickFacts: [
      { label: "Outages (90d)", value: "2 events" },
      { label: "Monthly Bill", value: "$725K" },
      { label: "Risk Level", value: "Elevated" },
    ],
  },
  {
    id: "att-003",
    customerId: "11",
    customerName: "Giant Food",
    accountId: "9010001234",
    industry: "Industrial",
    annualRevenue: "$2.4M",
    reason: "Load Growth Detected - +12% Over 6 Months",
    category: "load",
    severity: "medium",
    confidence: 88,
    evidencePoints: [
      "Meter data shows 12% load increase since June",
      "Peak demand trending upward month-over-month",
      "Baseload has increased from 3.5 MW to 3.9 MW",
      "Customer mentioned new refrigeration units in Oct call",
    ],
    detectedAt: "1 week ago",
    quickFacts: [
      { label: "Current Load", value: "4.2 MW" },
      { label: "6-Month Change", value: "+12%" },
      { label: "Trend", value: "Growing" },
    ],
  },
  {
    id: "att-004",
    customerId: "12",
    customerName: "Keystone Manufacturing Group",
    accountId: "9010002345",
    industry: "Industrial",
    annualRevenue: "$8.7M",
    reason: "Load Growth Pattern - +8% YTD",
    category: "load",
    severity: "high",
    confidence: 91,
    evidencePoints: [
      "Meter data shows steady monthly increases",
      "Peak demand up 8% year-to-date",
      "New production equipment installation in Q3",
      "Infrastructure review recommended",
    ],
    detectedAt: "3 days ago",
    quickFacts: [
      { label: "Current Load", value: "18.5 MW" },
      { label: "YTD Change", value: "+8%" },
      { label: "Trend", value: "Growing" },
    ],
  },
];

// Opportunities - Using mockCustomers IDs (Load growth opportunities first, then others)
export const opportunityItems: OpportunityItem[] = [
  {
    id: "opp-006",
    customerId: "13",
    customerName: "Riverside Logistics & Warehousing",
    accountId: "9010003456",
    opportunityType: "load-growth",
    opportunityName: "Proactive Capacity Planning - Warehouse Expansion",
    estimatedValue: "$380K potential new annual revenue",
    confidence: 85,
    evidence: [
      "Meter data shows 15% load increase over 6 months",
      "New cold storage facility construction noted",
      "Customer mentioned expansion plans in Nov call",
      "Infrastructure upgrade may be required",
    ],
    status: "reviewing",
  },
  {
    id: "opp-007",
    customerId: "12",
    customerName: "Keystone Manufacturing Group",
    accountId: "9010002345",
    opportunityType: "load-growth",
    opportunityName: "Facility Expansion Power Planning",
    estimatedValue: "$1.4M potential new annual revenue",
    confidence: 91,
    evidence: [
      "Meter data shows 15% load growth year-to-date",
      "New production line construction underway",
      "Additional manufacturing equipment planned",
      "Proactive infrastructure planning recommended",
    ],
    status: "reviewing",
  },
  {
    id: "opp-001",
    customerId: "13",
    customerName: "Riverside Logistics & Warehousing",
    accountId: "9010003456",
    opportunityType: "demand-response",
    opportunityName: "Warehouse Demand Response Program",
    estimatedValue: "$185K annual incentive",
    estimatedSavings: "$185K participation incentive",
    confidence: 89,
    evidence: [
      "2.8 MW curtailable load identified from meter data",
      "Flexible dock scheduling allows load shifting",
      "On-site backup power available",
      "Cold storage can pre-cool during off-peak",
    ],
    status: "new",
  },
  {
    id: "opp-002",
    customerId: "13",
    customerName: "Riverside Logistics & Warehousing",
    accountId: "9010003456",
    opportunityType: "efficiency",
    opportunityName: "LED Lighting & HVAC Optimization",
    estimatedValue: "$220K project value",
    estimatedSavings: "$68K annual energy savings",
    confidence: 92,
    evidence: [
      "High lighting load detected in meter data",
      "Warehouse operates 24/7 - high savings potential",
      "HVAC cycling patterns suggest optimization opportunity",
      "Rebate eligible up to $55K",
    ],
    status: "new",
  },
  {
    id: "opp-003",
    customerId: "12",
    customerName: "Keystone Manufacturing Group",
    accountId: "9010002345",
    opportunityType: "efficiency",
    opportunityName: "Process Heat Recovery System",
    estimatedValue: "$450K project value",
    estimatedSavings: "$180K annual energy savings",
    confidence: 94,
    evidence: [
      "High thermal load from manufacturing processes",
      "Waste heat recovery potential identified",
      "Customer discussed efficiency goals in Q2 review",
      "Rebate eligible up to $85K",
    ],
    status: "reviewing",
  },
  {
    id: "opp-004",
    customerId: "12",
    customerName: "Keystone Manufacturing Group",
    accountId: "9010002345",
    opportunityType: "solar",
    opportunityName: "Rooftop Solar + Battery Storage",
    estimatedValue: "$3.2M project value",
    estimatedSavings: "$420K annual bill reduction",
    confidence: 88,
    evidence: [
      "Large roof area available on manufacturing facility",
      "High daytime energy consumption aligns with solar",
      "Battery storage provides backup for critical equipment",
      "Tax incentives maximize ROI",
    ],
    status: "new",
  },
  {
    id: "opp-005",
    customerId: "12",
    customerName: "Keystone Manufacturing Group",
    accountId: "9010002345",
    opportunityType: "tariff",
    opportunityName: "Industrial Rate Optimization",
    estimatedValue: "Revenue neutral",
    estimatedSavings: "$290K annual savings for customer",
    confidence: 96,
    evidence: [
      "Load factor exceeds 80% per meter data",
      "Qualifies for large industrial rate",
      "Current rate suboptimal based on usage analysis",
      "No infrastructure changes needed",
    ],
    status: "new",
  },
];

// KPI Drilldown Data
export const kpiDrilldownData: Record<string, KPIDrilldownData> = {
  revenue: {
    title: "Revenue Analysis",
    description: "Total managed revenue across your portfolio with account breakdown",
    chartData: [
      { name: "Jan", value: 7200000 },
      { name: "Feb", value: 7400000 },
      { name: "Mar", value: 7800000 },
      { name: "Apr", value: 7600000 },
      { name: "May", value: 8100000 },
      { name: "Jun", value: 8500000 },
    ],
    items: [
      { id: "1", customerId: "12", customerName: "Keystone Manufacturing Group", metric: "$8.7M", detail: "Largest account • +15% YoY", status: "good" },
      { id: "2", customerId: "11", customerName: "Giant Food", metric: "$2.4M", detail: "Expansion planned Q2 2025", status: "good" },
      { id: "3", customerId: "13", customerName: "Riverside Logistics & Warehousing", metric: "$1.8M", detail: "Stable account", status: "good" },
      { id: "4", customerId: "7", customerName: "Wawa Corporate", metric: "$1.2M", detail: "Load growth opportunity", status: "info" },
    ],
  },
  usage: {
    title: "Usage & Load Factor Analysis",
    description: "Portfolio-wide consumption patterns and load factor metrics",
    chartData: [
      { name: "Jan", value: 142, trend: 71 },
      { name: "Feb", value: 138, trend: 69 },
      { name: "Mar", value: 151, trend: 73 },
      { name: "Apr", value: 148, trend: 72 },
      { name: "May", value: 155, trend: 74 },
      { name: "Jun", value: 158, trend: 72 },
    ],
    items: [
      { id: "1", customerId: "12", customerName: "Keystone Manufacturing Group", metric: "645 GWh", detail: "Load Factor: 88% • Excellent", status: "good" },
      { id: "2", customerId: "11", customerName: "Giant Food", metric: "245 GWh", detail: "Load Factor: 72% • Opportunity", status: "warning" },
      { id: "3", customerId: "13", customerName: "Riverside Logistics & Warehousing", metric: "156 GWh", detail: "Load Factor: 68% • DR candidate", status: "info" },
      { id: "4", customerId: "7", customerName: "Wawa Corporate", metric: "89 GWh", detail: "Usage growing +8.4%", status: "good" },
    ],
  },
  demand: {
    title: "Peak Demand Analysis",
    description: "Coincident and non-coincident peak demand trends",
    chartData: [
      { name: "Jan", value: 1180 },
      { name: "Feb", value: 1150 },
      { name: "Mar", value: 1210 },
      { name: "Apr", value: 1190 },
      { name: "May", value: 1280 },
      { name: "Jun", value: 1340 },
    ],
    items: [
      { id: "1", customerId: "12", customerName: "Keystone Manufacturing Group", metric: "18.5 MW", detail: "Peak increasing +15% YoY", status: "warning" },
      { id: "2", customerId: "11", customerName: "Giant Food", metric: "4.2 MW", detail: "Peak during production hours", status: "good" },
      { id: "3", customerId: "13", customerName: "Riverside Logistics & Warehousing", metric: "2.8 MW", detail: "Curtailable load identified", status: "good" },
      { id: "4", customerId: "7", customerName: "Wawa Corporate", metric: "1.8 MW", detail: "Stable demand profile", status: "good" },
    ],
  },
  outages: {
    title: "Outage Impact Analysis",
    description: "Recent outages affecting managed accounts",
    chartData: [
      { name: "Week 1", value: 1 },
      { name: "Week 2", value: 0 },
      { name: "Week 3", value: 2 },
      { name: "Week 4", value: 1 },
    ],
    items: [
      { id: "1", customerId: "11", customerName: "Giant Food", metric: "20 min", detail: "Chestnut Street location • $50K loss • Active", status: "error" },
      { id: "2", customerId: "12", customerName: "Keystone Manufacturing Group", metric: "2 events", detail: "2nd outage this quarter • Customer concerned", status: "error" },
      { id: "3", customerId: "13", customerName: "Riverside Logistics & Warehousing", metric: "35 min", detail: "Cold storage affected • Nov 28", status: "warning" },
      { id: "4", customerId: "7", customerName: "Wawa Corporate", metric: "15 min", detail: "Distribution center • Nov 30", status: "warning" },
    ],
  },
  alerts: {
    title: "Alert Management",
    description: "All active alerts requiring attention",
    chartData: [
      { name: "Critical", value: 2 },
      { name: "High", value: 1 },
      { name: "Medium", value: 1 },
    ],
    items: [
      { id: "1", customerId: "11", customerName: "Giant Food", metric: "Critical", detail: "20min outage at Chestnut Street • $50K loss", status: "error" },
      { id: "2", customerId: "12", customerName: "Keystone Manufacturing Group", metric: "Critical", detail: "2nd outage this quarter • Escalation likely", status: "error" },
      { id: "3", customerId: "12", customerName: "Keystone Manufacturing Group", metric: "High", detail: "Load growth +8% YTD • Capacity planning needed", status: "warning" },
      { id: "4", customerId: "11", customerName: "Giant Food", metric: "Medium", detail: "Load growth +12% over 6 months • Monitor trend", status: "info" },
    ],
  },
  opportunities: {
    title: "Potential Program & Service Opportunities",
    description: "Proactive engagement opportunities based on meter data and customer conversations",
    chartData: [],
    items: [
      { id: "1", customerId: "12", customerName: "Keystone Manufacturing Group", metric: "Facility Expansion Power Planning", detail: "+8% YTD growth • $1.4M potential revenue", status: "good" },
      { id: "2", customerId: "13", customerName: "Riverside Logistics & Warehousing", metric: "Warehouse Expansion Planning", detail: "+10% 6-month growth • $380K potential revenue", status: "good" },
      { id: "3", customerId: "12", customerName: "Keystone Manufacturing Group", metric: "Process Heat Recovery", detail: "$450K project • $180K/yr savings", status: "good" },
      { id: "4", customerId: "12", customerName: "Keystone Manufacturing Group", metric: "Rooftop Solar + Battery", detail: "$3.2M project • Backup for critical equipment", status: "good" },
      { id: "5", customerId: "13", customerName: "Riverside Logistics & Warehousing", metric: "Warehouse Demand Response", detail: "$185K/yr incentive • 2.8 MW curtailable load", status: "good" },
      { id: "6", customerId: "13", customerName: "Riverside Logistics & Warehousing", metric: "LED & HVAC Optimization", detail: "$220K project • 24/7 operations", status: "good" },
    ],
  },
};

// Category styling
export const categoryConfig: Record<AttentionItem["category"], { label: string; color: string; bgColor: string }> = {
  outage: { label: "Outage", color: "text-status-error", bgColor: "bg-status-error-bg" },
  anomaly: { label: "Anomaly", color: "text-status-warning", bgColor: "bg-status-warning-bg" },
  contract: { label: "Contract", color: "text-status-info", bgColor: "bg-status-info-bg" },
  load: { label: "Load Change", color: "text-status-warning", bgColor: "bg-status-warning-bg" },
  billing: { label: "Billing", color: "text-status-error", bgColor: "bg-status-error-bg" },
  quality: { label: "Power Quality", color: "text-status-error", bgColor: "bg-status-error-bg" },
  expansion: { label: "Expansion", color: "text-status-success", bgColor: "bg-status-success-bg" },
};

export const opportunityTypeConfig: Record<OpportunityItem["opportunityType"], { label: string; color: string; bgColor: string }> = {
  efficiency: { label: "Efficiency", color: "text-status-success", bgColor: "bg-status-success-bg" },
  "demand-response": { label: "Demand Response", color: "text-status-info", bgColor: "bg-status-info-bg" },
  electrification: { label: "Electrification", color: "text-primary", bgColor: "bg-primary/10" },
  solar: { label: "Solar/Storage", color: "text-status-warning", bgColor: "bg-status-warning-bg" },
  tariff: { label: "Tariff Optimization", color: "text-status-info", bgColor: "bg-status-info-bg" },
  "load-growth": { label: "Load Growth", color: "text-status-info", bgColor: "bg-status-info-bg" },
};

export const severityConfig: Record<AttentionItem["severity"], { label: string; color: string; bgColor: string }> = {
  critical: { label: "Critical", color: "text-status-error", bgColor: "bg-status-error-bg" },
  high: { label: "High", color: "text-status-warning", bgColor: "bg-status-warning-bg" },
  medium: { label: "Medium", color: "text-status-info", bgColor: "bg-status-info-bg" },
};
