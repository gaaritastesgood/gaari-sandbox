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
    primaryMetric: "28",
    subtext: "Attention needed",
    trend: "up",
    status: "error",
    trendValue: "+7",
    drilldownType: "alerts",
  },
  {
    id: "opportunities",
    label: "New Opportunities",
    primaryMetric: "15",
    subtext: "Proactive engagement",
    trend: "up",
    status: "good",
    trendValue: "+3",
    drilldownType: "opportunities",
  },
];

// Attention Items (Triage Engine Output) - Using mockCustomers IDs
export const attentionItems: AttentionItem[] = [
  {
    id: "att-001",
    customerId: "1",
    customerName: "Javier Ortiz",
    accountId: "ACC-78234",
    industry: "Residential",
    annualRevenue: "$4.2K",
    reason: "Extended outage impacting residence",
    category: "outage",
    severity: "critical",
    confidence: 94,
    evidencePoints: [
      "Outage duration: 4.5 hours on 12/02",
      "Medical equipment on premises",
      "Previous outage complaints on file",
      "Senior household registered",
    ],
    detectedAt: "2 hours ago",
    quickFacts: [
      { label: "Peak Demand", value: "8.2 kW" },
      { label: "Monthly Bill", value: "$380" },
      { label: "Account Age", value: "5 years" },
    ],
  },
  {
    id: "att-002",
    customerId: "2",
    customerName: "Aisha Patel",
    accountId: "ACC-91456",
    industry: "Commercial",
    annualRevenue: "$8.7K",
    reason: "Significant baseload increase detected - possible expansion",
    category: "expansion",
    severity: "high",
    confidence: 87,
    evidencePoints: [
      "Baseload up 23% over 3 months",
      "No filed expansion permits yet",
      "Recent call mentions 'growth plans'",
      "New equipment installation likely",
    ],
    detectedAt: "6 hours ago",
    quickFacts: [
      { label: "Load Growth", value: "+23%" },
      { label: "Monthly Bill", value: "$725" },
      { label: "Tier", value: "Commercial" },
    ],
  },
  {
    id: "att-003",
    customerId: "3",
    customerName: "Nolan Reeves",
    accountId: "ACC-34521",
    industry: "Residential",
    annualRevenue: "$3.1K",
    reason: "Power quality issues affecting home office equipment",
    category: "quality",
    severity: "critical",
    confidence: 91,
    evidencePoints: [
      "3 voltage sag events this week",
      "Home office equipment sensitivity flagged",
      "Backup generator inquiry",
      "Call logged to customer service",
    ],
    detectedAt: "4 hours ago",
    quickFacts: [
      { label: "Quality Events", value: "3 this week" },
      { label: "Critical Load", value: "2.4 kW" },
      { label: "Priority", value: "High" },
    ],
  },
  {
    id: "att-004",
    customerId: "4",
    customerName: "Serena Okafor",
    accountId: "ACC-67890",
    industry: "Commercial",
    annualRevenue: "$2.8K",
    reason: "Load anomaly - 40% demand spike detected",
    category: "anomaly",
    severity: "high",
    confidence: 82,
    evidencePoints: [
      "Demand spike: 40% above baseline",
      "New equipment likely installed",
      "No rate adjustment filed",
      "May qualify for TOU optimization",
    ],
    detectedAt: "1 day ago",
    quickFacts: [
      { label: "Demand Spike", value: "+40%" },
      { label: "Current Rate", value: "GS-3" },
      { label: "Potential Savings", value: "$18K/yr" },
    ],
  },
  {
    id: "att-005",
    customerId: "1",
    customerName: "Javier Ortiz",
    accountId: "ACC-45678",
    industry: "Residential",
    annualRevenue: "$1.9K",
    reason: "Contract renewal approaching - declining usage pattern",
    category: "contract",
    severity: "medium",
    confidence: 78,
    evidencePoints: [
      "Contract expires in 45 days",
      "Usage down 15% YoY",
      "Solar installation inquiry on file",
      "Recent efficiency upgrade",
    ],
    detectedAt: "2 days ago",
    quickFacts: [
      { label: "Contract End", value: "Jan 2025" },
      { label: "Usage Trend", value: "-15% YoY" },
      { label: "Inquiry", value: "Solar" },
    ],
  },
  {
    id: "att-006",
    customerId: "2",
    customerName: "Aisha Patel",
    accountId: "ACC-23456",
    industry: "Commercial",
    annualRevenue: "$2.4K",
    reason: "Billing variance exceeds 30% - meter investigation needed",
    category: "billing",
    severity: "high",
    confidence: 85,
    evidencePoints: [
      "Bill variance: +34% MoM",
      "No operational change reported",
      "Meter reading flagged as estimated",
      "Customer dispute likely",
    ],
    detectedAt: "12 hours ago",
    quickFacts: [
      { label: "Bill Variance", value: "+34%" },
      { label: "Read Type", value: "Estimated" },
      { label: "Risk", value: "Dispute" },
    ],
  },
];

// Opportunities - Using mockCustomers IDs
export const opportunityItems: OpportunityItem[] = [
  {
    id: "opp-001",
    customerId: "1",
    customerName: "Javier Ortiz",
    accountId: "ACC-11223",
    opportunityType: "electrification",
    opportunityName: "EV Charger Installation Program",
    estimatedValue: "$2.4K revenue potential",
    estimatedSavings: "$890 annual fuel savings for customer",
    confidence: 89,
    evidence: [
      "EV purchase detected in area",
      "Home charging infrastructure needed",
      "Federal rebates available",
      "High electricity usage household",
    ],
    status: "new",
  },
  {
    id: "opp-002",
    customerId: "2",
    customerName: "Aisha Patel",
    accountId: "ACC-33445",
    opportunityType: "solar",
    opportunityName: "Rooftop Solar + Storage",
    estimatedValue: "$3.4K project value",
    estimatedSavings: "$850 annual bill reduction",
    confidence: 84,
    evidence: [
      "Large roof space available",
      "Peak demand charges high",
      "Sustainability goals mentioned",
      "Recent inquiry about net metering",
    ],
    status: "new",
  },
  {
    id: "opp-003",
    customerId: "3",
    customerName: "Nolan Reeves",
    accountId: "ACC-55667",
    opportunityType: "demand-response",
    opportunityName: "Demand Response Enrollment",
    estimatedValue: "$180 annual incentive",
    estimatedSavings: "$180 participation incentive",
    confidence: 92,
    evidence: [
      "Flexible schedule",
      "Curtailable load identified",
      "Previous DR participation interest",
      "Smart thermostat installed",
    ],
    status: "reviewing",
  },
  {
    id: "opp-004",
    customerId: "4",
    customerName: "Serena Okafor",
    accountId: "ACC-77889",
    opportunityType: "efficiency",
    opportunityName: "HVAC Efficiency Upgrade",
    estimatedValue: "$520 rebate eligible",
    estimatedSavings: "$145 annual energy savings",
    confidence: 86,
    evidence: [
      "Building energy audit completed",
      "HVAC system 15+ years old",
      "High cooling demand identified",
      "Budget approved for upgrades",
    ],
    status: "new",
  },
  {
    id: "opp-005",
    customerId: "1",
    customerName: "Javier Ortiz",
    accountId: "ACC-99001",
    opportunityType: "tariff",
    opportunityName: "Rate Schedule Optimization",
    estimatedValue: "Revenue neutral",
    estimatedSavings: "$62 annual savings for customer",
    confidence: 94,
    evidence: [
      "Load profile analysis complete",
      "Currently on suboptimal rate",
      "TOU rate would reduce bills 18%",
      "No infrastructure changes needed",
    ],
    status: "new",
  },
  {
    id: "opp-006",
    customerId: "3",
    customerName: "Nolan Reeves",
    accountId: "ACC-22334",
    opportunityType: "expansion",
    opportunityName: "Home Addition - Load Increase",
    estimatedValue: "$1.8K new revenue",
    confidence: 88,
    evidence: [
      "Building permit filed last month",
      "Additional load expected",
      "Construction timeline: 6 months",
      "Service upgrade may be needed",
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
      { id: "1", customerId: "2", customerName: "Aisha Patel", metric: "$8.7K", detail: "Largest account • +12% YoY", status: "good" },
      { id: "2", customerId: "1", customerName: "Javier Ortiz", metric: "$4.2K", detail: "Contract renewal pending", status: "warning" },
      { id: "3", customerId: "3", customerName: "Nolan Reeves", metric: "$3.1K", detail: "Stable account", status: "good" },
      { id: "4", customerId: "4", customerName: "Serena Okafor", metric: "$2.8K", detail: "Load growth opportunity", status: "info" },
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
      { id: "1", customerId: "2", customerName: "Aisha Patel", metric: "245 kWh", detail: "Load Factor: 91% • Excellent", status: "good" },
      { id: "2", customerId: "1", customerName: "Javier Ortiz", metric: "128 kWh", detail: "Load Factor: 68% • Opportunity", status: "warning" },
      { id: "3", customerId: "3", customerName: "Nolan Reeves", metric: "112 kWh", detail: "Load Factor: 54% • DR candidate", status: "info" },
      { id: "4", customerId: "4", customerName: "Serena Okafor", metric: "42 kWh", detail: "Usage declining -15%", status: "error" },
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
      { id: "1", customerId: "2", customerName: "Aisha Patel", metric: "42 kW", detail: "Baseload increasing +23%", status: "warning" },
      { id: "2", customerId: "1", customerName: "Javier Ortiz", metric: "8.2 kW", detail: "Peak during evening hours", status: "good" },
      { id: "3", customerId: "3", customerName: "Nolan Reeves", metric: "18 kW", detail: "Curtailable load identified", status: "good" },
      { id: "4", customerId: "4", customerName: "Serena Okafor", metric: "6.8 kW", detail: "40% spike detected", status: "error" },
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
      { id: "1", customerId: "1", customerName: "Javier Ortiz", metric: "4.5 hrs", detail: "Residence impact • Dec 2", status: "error" },
      { id: "2", customerId: "3", customerName: "Nolan Reeves", metric: "45 min", detail: "Home office affected • Dec 1", status: "error" },
      { id: "3", customerId: "2", customerName: "Aisha Patel", metric: "2.1 hrs", detail: "Business affected • Nov 28", status: "warning" },
      { id: "4", customerId: "4", customerName: "Serena Okafor", metric: "1.2 hrs", detail: "Equipment reset needed", status: "warning" },
    ],
  },
  alerts: {
    title: "Alert Management",
    description: "All active alerts requiring attention",
    chartData: [
      { name: "Critical", value: 8 },
      { name: "High", value: 12 },
      { name: "Medium", value: 8 },
    ],
    items: [
      { id: "1", customerId: "1", customerName: "Javier Ortiz", metric: "Critical", detail: "Outage impact + contract renewal", status: "error" },
      { id: "2", customerId: "3", customerName: "Nolan Reeves", metric: "Critical", detail: "Power quality affecting equipment", status: "error" },
      { id: "3", customerId: "2", customerName: "Aisha Patel", metric: "High", detail: "Billing variance +34%", status: "error" },
      { id: "4", customerId: "2", customerName: "Aisha Patel", metric: "High", detail: "Expansion detected - engagement needed", status: "warning" },
      { id: "5", customerId: "1", customerName: "Javier Ortiz", metric: "Medium", detail: "Contract renewal in 45 days", status: "warning" },
    ],
  },
  opportunities: {
    title: "New Opportunities",
    description: "Proactive engagement opportunities for your portfolio",
    chartData: [],
    items: [
      { id: "1", customerId: "1", customerName: "Javier Ortiz", metric: "EV Charger Installation", detail: "$2.4K revenue • $890/yr customer savings • Load Growth +15%", status: "good" },
      { id: "2", customerId: "2", customerName: "Aisha Patel", metric: "Rooftop Solar + Storage", detail: "$3.4K project • $850/yr savings • Peak demand reduction", status: "good" },
      { id: "3", customerId: "3", customerName: "Nolan Reeves", metric: "Demand Response Enrollment", detail: "$180/yr incentive • Flexible load • Smart thermostat ready", status: "good" },
      { id: "4", customerId: "4", customerName: "Serena Okafor", metric: "HVAC Efficiency Upgrade", detail: "$520 rebate • $145/yr savings • High cooling demand", status: "good" },
      { id: "5", customerId: "1", customerName: "Javier Ortiz", metric: "Rate Schedule Optimization", detail: "TOU rate switch • $62/yr savings • No changes needed", status: "info" },
      { id: "6", customerId: "3", customerName: "Nolan Reeves", metric: "Home Addition Load Increase", detail: "$1.8K new revenue • Service upgrade • 6mo timeline", status: "info" },
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
