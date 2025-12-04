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

// Portfolio KPIs
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

// Attention Items (Triage Engine Output)
export const attentionItems: AttentionItem[] = [
  {
    id: "att-001",
    customerId: "cust-001",
    customerName: "Meridian Manufacturing Co.",
    accountId: "ACC-78234",
    industry: "Manufacturing",
    annualRevenue: "$4.2M",
    reason: "Extended outage impacting production facility",
    category: "outage",
    severity: "critical",
    confidence: 94,
    evidencePoints: [
      "Outage duration: 4.5 hours on 12/02",
      "Production line impacted",
      "Previous outage complaints on file",
      "Contract renewal due in 60 days",
    ],
    detectedAt: "2 hours ago",
    quickFacts: [
      { label: "Peak Demand", value: "8.2 MW" },
      { label: "Monthly Bill", value: "$380K" },
      { label: "Contract End", value: "Feb 2025" },
    ],
  },
  {
    id: "att-002",
    customerId: "cust-002",
    customerName: "TechCore Data Centers",
    accountId: "ACC-91456",
    industry: "Technology",
    annualRevenue: "$8.7M",
    reason: "Significant baseload increase detected - possible expansion",
    category: "expansion",
    severity: "high",
    confidence: 87,
    evidencePoints: [
      "Baseload up 23% over 3 months",
      "No filed expansion permits yet",
      "Competitor facility opened nearby",
      "Recent call mentions 'growth plans'",
    ],
    detectedAt: "6 hours ago",
    quickFacts: [
      { label: "Load Growth", value: "+23%" },
      { label: "Monthly Bill", value: "$725K" },
      { label: "Tier", value: "Platinum" },
    ],
  },
  {
    id: "att-003",
    customerId: "cust-003",
    customerName: "Central Hospital System",
    accountId: "ACC-34521",
    industry: "Healthcare",
    annualRevenue: "$3.1M",
    reason: "Power quality issues affecting critical equipment",
    category: "quality",
    severity: "critical",
    confidence: 91,
    evidencePoints: [
      "3 voltage sag events this week",
      "MRI equipment sensitivity flagged",
      "Backup generator activated twice",
      "Call logged to customer service",
    ],
    detectedAt: "4 hours ago",
    quickFacts: [
      { label: "Quality Events", value: "3 this week" },
      { label: "Critical Load", value: "2.4 MW" },
      { label: "Priority", value: "Essential Services" },
    ],
  },
  {
    id: "att-004",
    customerId: "cust-004",
    customerName: "Greenfield Foods Processing",
    accountId: "ACC-67890",
    industry: "Food Processing",
    annualRevenue: "$2.8M",
    reason: "Load anomaly - 40% demand spike detected",
    category: "anomaly",
    severity: "high",
    confidence: 82,
    evidencePoints: [
      "Demand spike: 40% above baseline",
      "New refrigeration units likely installed",
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
    customerId: "cust-005",
    customerName: "Summit Office Complex",
    accountId: "ACC-45678",
    industry: "Commercial Real Estate",
    annualRevenue: "$1.9M",
    reason: "Contract renewal approaching - declining usage pattern",
    category: "contract",
    severity: "medium",
    confidence: 78,
    evidencePoints: [
      "Contract expires in 45 days",
      "Usage down 15% YoY",
      "Tenant occupancy reported at 72%",
      "Solar installation inquiry on file",
    ],
    detectedAt: "2 days ago",
    quickFacts: [
      { label: "Contract End", value: "Jan 2025" },
      { label: "Usage Trend", value: "-15% YoY" },
      { label: "Occupancy", value: "72%" },
    ],
  },
  {
    id: "att-006",
    customerId: "cust-006",
    customerName: "Pacific Automotive Parts",
    accountId: "ACC-23456",
    industry: "Manufacturing",
    annualRevenue: "$2.4M",
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

// Opportunities
export const opportunityItems: OpportunityItem[] = [
  {
    id: "opp-001",
    customerId: "cust-007",
    customerName: "Metro Transit Authority",
    accountId: "ACC-11223",
    opportunityType: "electrification",
    opportunityName: "Fleet Electrification Program",
    estimatedValue: "$2.4M revenue potential",
    estimatedSavings: "$890K annual fuel savings for customer",
    confidence: 89,
    evidence: [
      "Fleet replacement plan filed with city",
      "150 buses scheduled for EV conversion",
      "Depot charging infrastructure needed",
      "Federal funding approved",
    ],
    status: "new",
  },
  {
    id: "opp-002",
    customerId: "cust-008",
    customerName: "Riverside Mall Complex",
    accountId: "ACC-33445",
    opportunityType: "solar",
    opportunityName: "Rooftop Solar + Storage",
    estimatedValue: "$340K project value",
    estimatedSavings: "$85K annual bill reduction",
    confidence: 84,
    evidence: [
      "450,000 sq ft roof space available",
      "Peak demand charges: $42K/month",
      "Sustainability goals publicly stated",
      "Recent inquiry about net metering",
    ],
    status: "new",
  },
  {
    id: "opp-003",
    customerId: "cust-009",
    customerName: "Cascade Steel Works",
    accountId: "ACC-55667",
    opportunityType: "demand-response",
    opportunityName: "Demand Response Enrollment",
    estimatedValue: "$180K annual incentive",
    estimatedSavings: "$180K participation incentive",
    confidence: 92,
    evidence: [
      "Flexible production schedule",
      "12 MW curtailable load identified",
      "Previous DR participation interest",
      "New plant manager supportive",
    ],
    status: "reviewing",
  },
  {
    id: "opp-004",
    customerId: "cust-010",
    customerName: "University Medical Center",
    accountId: "ACC-77889",
    opportunityType: "efficiency",
    opportunityName: "HVAC Efficiency Upgrade",
    estimatedValue: "$520K rebate eligible",
    estimatedSavings: "$145K annual energy savings",
    confidence: 86,
    evidence: [
      "Building energy audit completed",
      "HVAC system 15+ years old",
      "High cooling demand identified",
      "Capital budget approved for FY25",
    ],
    status: "new",
  },
  {
    id: "opp-005",
    customerId: "cust-011",
    customerName: "Northgate Distribution Center",
    accountId: "ACC-99001",
    opportunityType: "tariff",
    opportunityName: "Rate Schedule Optimization",
    estimatedValue: "Revenue neutral",
    estimatedSavings: "$62K annual savings for customer",
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
    customerId: "cust-012",
    customerName: "BioTech Research Campus",
    accountId: "ACC-22334",
    opportunityType: "expansion",
    opportunityName: "New Research Wing - Load Addition",
    estimatedValue: "$1.8M new revenue",
    confidence: 88,
    evidence: [
      "Building permit filed last month",
      "Lab equipment list indicates 4 MW load",
      "Construction timeline: 18 months",
      "Preliminary service request received",
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
      { id: "1", customerId: "cust-002", customerName: "TechCore Data Centers", metric: "$8.7M", detail: "Largest account • +12% YoY", status: "good" },
      { id: "2", customerId: "cust-001", customerName: "Meridian Manufacturing Co.", metric: "$4.2M", detail: "Contract renewal pending", status: "warning" },
      { id: "3", customerId: "cust-003", customerName: "Central Hospital System", metric: "$3.1M", detail: "Essential services • Stable", status: "good" },
      { id: "4", customerId: "cust-004", customerName: "Greenfield Foods Processing", metric: "$2.8M", detail: "Load growth opportunity", status: "info" },
      { id: "5", customerId: "cust-006", customerName: "Pacific Automotive Parts", metric: "$2.4M", detail: "Billing issue flagged", status: "error" },
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
      { id: "1", customerId: "cust-002", customerName: "TechCore Data Centers", metric: "245 GWh", detail: "Load Factor: 91% • Excellent", status: "good" },
      { id: "2", customerId: "cust-001", customerName: "Meridian Manufacturing Co.", metric: "128 GWh", detail: "Load Factor: 68% • Opportunity", status: "warning" },
      { id: "3", customerId: "cust-009", customerName: "Cascade Steel Works", metric: "112 GWh", detail: "Load Factor: 54% • DR candidate", status: "info" },
      { id: "4", customerId: "cust-005", customerName: "Summit Office Complex", metric: "42 GWh", detail: "Usage declining -15%", status: "error" },
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
      { id: "1", customerId: "cust-002", customerName: "TechCore Data Centers", metric: "42 MW", detail: "Baseload increasing +23%", status: "warning" },
      { id: "2", customerId: "cust-001", customerName: "Meridian Manufacturing Co.", metric: "8.2 MW", detail: "Peak during production hours", status: "good" },
      { id: "3", customerId: "cust-009", customerName: "Cascade Steel Works", metric: "18 MW", detail: "Curtailable load identified", status: "good" },
      { id: "4", customerId: "cust-004", customerName: "Greenfield Foods Processing", metric: "6.8 MW", detail: "40% spike detected", status: "error" },
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
      { id: "1", customerId: "cust-001", customerName: "Meridian Manufacturing Co.", metric: "4.5 hrs", detail: "Production impact • Dec 2", status: "error" },
      { id: "2", customerId: "cust-003", customerName: "Central Hospital System", metric: "45 min", detail: "Generator activated • Dec 1", status: "error" },
      { id: "3", customerId: "cust-007", customerName: "Metro Transit Authority", metric: "2.1 hrs", detail: "Depot affected • Nov 28", status: "warning" },
      { id: "4", customerId: "cust-012", customerName: "BioTech Research Campus", metric: "1.2 hrs", detail: "Lab equipment reset needed", status: "warning" },
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
      { id: "1", customerId: "cust-001", customerName: "Meridian Manufacturing Co.", metric: "Critical", detail: "Outage impact + contract renewal", status: "error" },
      { id: "2", customerId: "cust-003", customerName: "Central Hospital System", metric: "Critical", detail: "Power quality affecting equipment", status: "error" },
      { id: "3", customerId: "cust-006", customerName: "Pacific Automotive Parts", metric: "High", detail: "Billing variance +34%", status: "error" },
      { id: "4", customerId: "cust-002", customerName: "TechCore Data Centers", metric: "High", detail: "Expansion detected - engagement needed", status: "warning" },
      { id: "5", customerId: "cust-005", customerName: "Summit Office Complex", metric: "Medium", detail: "Contract renewal in 45 days", status: "warning" },
    ],
  },
  opportunities: {
    title: "Opportunity Pipeline",
    description: "Proactive engagement opportunities identified",
    chartData: [
      { name: "Electrification", value: 3 },
      { name: "DR", value: 4 },
      { name: "Efficiency", value: 5 },
      { name: "Solar", value: 2 },
      { name: "Tariff", value: 1 },
    ],
    items: [
      { id: "1", customerId: "cust-007", customerName: "Metro Transit Authority", metric: "$2.4M", detail: "Fleet electrification program", status: "good" },
      { id: "2", customerId: "cust-012", customerName: "BioTech Research Campus", metric: "$1.8M", detail: "New research wing load", status: "good" },
      { id: "3", customerId: "cust-010", customerName: "University Medical Center", metric: "$520K", detail: "HVAC efficiency rebate", status: "good" },
      { id: "4", customerId: "cust-009", customerName: "Cascade Steel Works", metric: "$180K", detail: "Demand response enrollment", status: "good" },
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
