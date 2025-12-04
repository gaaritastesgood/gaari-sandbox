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
  opportunityType: "efficiency" | "demand-response" | "electrification" | "solar" | "tariff" | "expansion";
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

// Portfolio KPIs - Alerts first, then Opportunities
export const portfolioKPIs: PortfolioKPI[] = [
  {
    id: "revenue",
    label: "Total Revenue Managed",
    primaryMetric: "$47.2M",
    subtext: "143 accounts • YTD Revenue",
    trend: "up",
    status: "good",
    trendValue: "+4.2%",
    drilldownType: "revenue",
  },
  {
    id: "usage",
    label: "Total Usage",
    primaryMetric: "892 GWh",
    subtext: "Load Factor: 72.4%",
    trend: "up",
    status: "info",
    trendValue: "+2.8%",
    drilldownType: "usage",
  },
  {
    id: "demand",
    label: "Peak Demand Trends",
    primaryMetric: "1.24 GW",
    subtext: "Portfolio coincident peak",
    trend: "up",
    status: "warning",
    trendValue: "+8.1%",
    drilldownType: "demand",
  },
  {
    id: "outages",
    label: "Outage Frequency",
    primaryMetric: "12",
    subtext: "Events in last 30 days",
    trend: "up",
    status: "error",
    trendValue: "+4",
    drilldownType: "outages",
  },
  {
    id: "alerts",
    label: "New Alerts",
    primaryMetric: "2",
    subtext: "Attention needed",
    trend: "up",
    status: "error",
    trendValue: "+2",
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
];

// Attention Items (Triage Engine Output) - Industrial & Large Commercial only
export const attentionItems: AttentionItem[] = [
  {
    id: "att-001",
    customerId: "11",
    customerName: "Patriot Foods Manufacturing",
    accountId: "9010001234",
    industry: "Industrial",
    annualRevenue: "$2.4M",
    reason: "Production Line Outage - 6.2 Hours, $180K Loss",
    category: "outage",
    severity: "critical",
    confidence: 96,
    evidencePoints: [
      "Outage duration: 6.2 hours on 12/02",
      "Production line downtime estimated at $180K loss",
      "Critical manufacturing equipment affected",
      "Emergency backup generation deployed",
    ],
    detectedAt: "2 hours ago",
    quickFacts: [
      { label: "Peak Demand", value: "4.2 MW" },
      { label: "Monthly Bill", value: "$287K" },
      { label: "Production Loss", value: "$180K" },
    ],
  },
  {
    id: "att-003",
    customerId: "11",
    customerName: "Patriot Foods Manufacturing",
    accountId: "9010001234",
    industry: "Industrial",
    annualRevenue: "$2.4M",
    reason: "Expansion Planned - +1.8 MW By Q2 2025",
    category: "expansion",
    severity: "medium",
    confidence: 88,
    evidencePoints: [
      "Expansion permits filed with city planning",
      "Additional 1.8 MW load expected by Q3 2025",
      "Current load: 4.2 MW → Projected: 6.0 MW (+43%)",
      "Substation capacity review required",
      "Dedicated feeder may be needed",
      "Transformer upgrade recommended",
    ],
    detectedAt: "1 week ago",
    quickFacts: [
      { label: "Current Load", value: "4.2 MW" },
      { label: "Additional Load", value: "+1.8 MW" },
      { label: "Timeline", value: "Q2 2025" },
    ],
  },
  {
    id: "att-002",
    customerId: "12",
    customerName: "Silverline Data Center Group",
    accountId: "9010002345",
    industry: "Industrial",
    annualRevenue: "$11.3M",
    reason: "3 Outages In 14 Days - SLA At Risk",
    category: "outage",
    severity: "critical",
    confidence: 94,
    evidencePoints: [
      "3 outage events in past 14 days",
      "UPS systems activated during events",
      "SLA compliance at risk - 99.99% uptime required",
      "Requesting reliability improvement plan",
    ],
    detectedAt: "4 hours ago",
    quickFacts: [
      { label: "Outages (14d)", value: "3 events" },
      { label: "Monthly Bill", value: "$945K" },
      { label: "SLA Risk", value: "High" },
    ],
  },
  {
    id: "att-004",
    customerId: "12",
    customerName: "Silverline Data Center Group",
    accountId: "9010002345",
    industry: "Industrial",
    annualRevenue: "$11.3M",
    reason: "Expansion Planned - +8.5 MW By Q4 2025",
    category: "expansion",
    severity: "high",
    confidence: 92,
    evidencePoints: [
      "Phase 2 data hall construction approved",
      "Additional 8.5 MW load expected by Q4 2025",
      "Current load: 21.0 MW → Projected: 29.5 MW (+40%)",
      "New 115kV substation required",
      "Redundant feed installation needed",
      "Grid interconnection study required",
      "Generation capacity assessment pending",
    ],
    detectedAt: "3 days ago",
    quickFacts: [
      { label: "Current Load", value: "21.0 MW" },
      { label: "Additional Load", value: "+8.5 MW" },
      { label: "Timeline", value: "Q4 2025" },
    ],
  },
];

// Opportunities - Using mockCustomers IDs
export const opportunityItems: OpportunityItem[] = [
  {
    id: "opp-001",
    customerId: "11",
    customerName: "Patriot Foods Manufacturing",
    accountId: "9010001234",
    opportunityType: "demand-response",
    opportunityName: "Industrial Demand Response Program",
    estimatedValue: "$245K annual incentive",
    estimatedSavings: "$245K participation incentive",
    confidence: 91,
    evidence: [
      "4.2 MW curtailable load identified",
      "Production schedule flexibility noted",
      "Backup generation available",
      "Previous interest in DR programs",
    ],
    status: "new",
  },
  {
    id: "opp-002",
    customerId: "11",
    customerName: "Patriot Foods Manufacturing",
    accountId: "9010001234",
    opportunityType: "efficiency",
    opportunityName: "Process Heat Recovery System",
    estimatedValue: "$180K project value",
    estimatedSavings: "$52K annual energy savings",
    confidence: 87,
    evidence: [
      "High thermal load detected",
      "Heat waste identified in audit",
      "ROI under 3 years",
      "Rebate eligible up to $45K",
    ],
    status: "new",
  },
  {
    id: "opp-003",
    customerId: "12",
    customerName: "Silverline Data Center Group",
    accountId: "9010002345",
    opportunityType: "efficiency",
    opportunityName: "Cooling System Optimization",
    estimatedValue: "$320K project value",
    estimatedSavings: "$890K annual energy savings",
    confidence: 94,
    evidence: [
      "PUE currently at 1.8 - industry target 1.4",
      "Hot/cold aisle containment opportunity",
      "Free cooling potential identified",
      "AI-driven cooling optimization eligible",
    ],
    status: "reviewing",
  },
  {
    id: "opp-004",
    customerId: "12",
    customerName: "Silverline Data Center Group",
    accountId: "9010002345",
    opportunityType: "solar",
    opportunityName: "On-Site Solar + Battery Storage",
    estimatedValue: "$2.4M project value",
    estimatedSavings: "$1.2M annual bill reduction",
    confidence: 88,
    evidence: [
      "Large available roof and land area",
      "Corporate sustainability mandate",
      "Peak demand charges significant",
      "Tax incentives maximize ROI",
    ],
    status: "new",
  },
  {
    id: "opp-005",
    customerId: "12",
    customerName: "Silverline Data Center Group",
    accountId: "9010002345",
    opportunityType: "tariff",
    opportunityName: "High Load Factor Rate Optimization",
    estimatedValue: "Revenue neutral",
    estimatedSavings: "$340K annual savings for customer",
    confidence: 96,
    evidence: [
      "Load factor exceeds 85%",
      "Qualifies for industrial high-load rate",
      "Current rate suboptimal",
      "No infrastructure changes needed",
    ],
    status: "new",
  },
  {
    id: "opp-006",
    customerId: "11",
    customerName: "Patriot Foods Manufacturing",
    accountId: "9010001234",
    opportunityType: "expansion",
    opportunityName: "Production Line Expansion",
    estimatedValue: "$420K new annual revenue",
    confidence: 82,
    evidence: [
      "Expansion permits filed",
      "Additional 1.8 MW load expected",
      "Infrastructure upgrade needed",
      "Timeline: Q2 2025",
    ],
    status: "reviewing",
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
      { id: "1", customerId: "12", customerName: "Silverline Data Center Group", metric: "$11.3M", detail: "Largest account • +12% YoY", status: "good" },
      { id: "2", customerId: "11", customerName: "Patriot Foods Manufacturing", metric: "$2.4M", detail: "Expansion planned Q2 2025", status: "good" },
      { id: "3", customerId: "13", customerName: "Riverside Logistics & Warehousing", metric: "$1.8M", detail: "Stable account", status: "good" },
      { id: "4", customerId: "7", customerName: "Kai Thompson", metric: "$49.5K", detail: "Load growth opportunity", status: "info" },
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
      { id: "1", customerId: "12", customerName: "Silverline Data Center Group", metric: "892 GWh", detail: "Load Factor: 91% • Excellent", status: "good" },
      { id: "2", customerId: "11", customerName: "Patriot Foods Manufacturing", metric: "245 GWh", detail: "Load Factor: 72% • Opportunity", status: "warning" },
      { id: "3", customerId: "13", customerName: "Riverside Logistics & Warehousing", metric: "156 GWh", detail: "Load Factor: 68% • DR candidate", status: "info" },
      { id: "4", customerId: "7", customerName: "Kai Thompson", metric: "712 kWh", detail: "Usage growing +8.4%", status: "good" },
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
      { id: "1", customerId: "12", customerName: "Silverline Data Center Group", metric: "21.0 MW", detail: "Peak increasing +15% YoY", status: "warning" },
      { id: "2", customerId: "11", customerName: "Patriot Foods Manufacturing", metric: "4.2 MW", detail: "Peak during production hours", status: "good" },
      { id: "3", customerId: "13", customerName: "Riverside Logistics & Warehousing", metric: "2.8 MW", detail: "Curtailable load identified", status: "good" },
      { id: "4", customerId: "7", customerName: "Kai Thompson", metric: "85 kW", detail: "Demand spike detected", status: "warning" },
    ],
  },
  outages: {
    title: "Outage Impact Analysis",
    description: "Recent outages affecting managed accounts",
    chartData: [
      { name: "Week 1", value: 2 },
      { name: "Week 2", value: 4 },
      { name: "Week 3", value: 3 },
      { name: "Week 4", value: 3 },
    ],
    items: [
      { id: "1", customerId: "11", customerName: "Patriot Foods Manufacturing", metric: "6.2 hrs", detail: "Production impact • $180K loss • Dec 2", status: "error" },
      { id: "2", customerId: "12", customerName: "Silverline Data Center Group", metric: "3 events", detail: "SLA at risk • UPS activated • Past 14 days", status: "error" },
      { id: "3", customerId: "13", customerName: "Riverside Logistics & Warehousing", metric: "2.1 hrs", detail: "Cold storage affected • Nov 28", status: "warning" },
      { id: "4", customerId: "7", customerName: "Kai Thompson", metric: "45 min", detail: "Business affected • Nov 30", status: "warning" },
    ],
  },
  alerts: {
    title: "Alert Management",
    description: "All active alerts requiring attention",
    chartData: [
      { name: "Critical", value: 2 },
      { name: "High", value: 0 },
      { name: "Medium", value: 0 },
    ],
    items: [
      { id: "1", customerId: "11", customerName: "Patriot Foods Manufacturing", metric: "Critical", detail: "6.2hr outage • $180K production loss", status: "error" },
      { id: "2", customerId: "12", customerName: "Silverline Data Center Group", metric: "Critical", detail: "3 outage events • SLA compliance at risk", status: "error" },
    ],
  },
  opportunities: {
    title: "New Opportunities",
    description: "Proactive engagement opportunities for your portfolio",
    chartData: [],
    items: [
      { id: "1", customerId: "12", customerName: "Silverline Data Center Group", metric: "Cooling System Optimization", detail: "$320K project • $890K/yr savings • PUE improvement", status: "good" },
      { id: "2", customerId: "12", customerName: "Silverline Data Center Group", metric: "On-Site Solar + Battery", detail: "$2.4M project • $1.2M/yr savings • Sustainability", status: "good" },
      { id: "3", customerId: "11", customerName: "Patriot Foods Manufacturing", metric: "Industrial Demand Response", detail: "$245K/yr incentive • 4.2 MW curtailable", status: "good" },
      { id: "4", customerId: "11", customerName: "Patriot Foods Manufacturing", metric: "Process Heat Recovery", detail: "$180K project • $52K/yr savings • ROI < 3yr", status: "good" },
      { id: "5", customerId: "12", customerName: "Silverline Data Center Group", metric: "High Load Factor Rate", detail: "Revenue neutral • $340K/yr customer savings", status: "info" },
      { id: "6", customerId: "11", customerName: "Patriot Foods Manufacturing", metric: "Production Line Expansion", detail: "$420K new revenue • 1.8 MW additional load", status: "info" },
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
  expansion: { label: "Expansion", color: "text-status-success", bgColor: "bg-status-success-bg" },
};

export const severityConfig: Record<AttentionItem["severity"], { label: string; color: string; bgColor: string }> = {
  critical: { label: "Critical", color: "text-status-error", bgColor: "bg-status-error-bg" },
  high: { label: "High", color: "text-status-warning", bgColor: "bg-status-warning-bg" },
  medium: { label: "Medium", color: "text-status-info", bgColor: "bg-status-info-bg" },
};
