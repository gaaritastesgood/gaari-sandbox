// Key Account Manager Dashboard Mock Data

export interface KAMAccount {
  id: string;
  name: string;
  industry: string;
  accountManager: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  meters: number;
  facilities: number;
  rateSchedule: string;
  contractRenewal: string;
  
  // Billing
  currentBill: number;
  previousBill: number;
  yoyBillChange: number;
  billForecast: number;
  
  // Usage
  monthlyUsageKWh: number;
  peakDemandKW: number;
  loadFactor: number;
  usageTrend: 'up' | 'down' | 'stable';
  
  // Reliability
  outagesYTD: number;
  momentaryInterruptions: number;
  reliabilityScore: 'good' | 'warning' | 'critical';
  lastOutageDate: string | null;
  
  // Programs
  enrolledPrograms: string[];
  eligiblePrograms: string[];
  
  // Status indicators
  billingRisk: 'low' | 'medium' | 'high';
  opportunityScore: 'low' | 'medium' | 'high';
  attentionNeeded: boolean;
  
  // Revenue
  annualRevenue: number;
}

export interface KAMNotification {
  id: string;
  accountId: string;
  accountName: string;
  type: 'outage' | 'billing' | 'opportunity' | 'contract' | 'anomaly' | 'project';
  severity: 'info' | 'warning' | 'critical';
  title: string;
  description: string;
  timestamp: string;
  actionable: boolean;
}

export interface AccountDetail extends KAMAccount {
  // Extended billing info
  billingHistory: {
    month: string;
    amount: number;
    usage: number;
  }[];
  costDrivers: {
    category: string;
    amount: number;
    percentage: number;
  }[];
  
  // Load insights
  usageHistory: {
    month: string;
    usage: number;
    peakDemand: number;
  }[];
  loadProfile: {
    hour: number;
    weekday: number;
    weekend: number;
  }[];
  anomalies: {
    type: string;
    description: string;
    date: string;
    severity: 'low' | 'medium' | 'high';
  }[];
  
  // Reliability details
  outageHistory: {
    date: string;
    duration: string;
    cause: string;
    affectedMeters: number;
  }[];
  powerQualityEvents: {
    type: string;
    count: number;
    lastOccurrence: string;
  }[];
  
  // Programs & opportunities
  programDetails: {
    name: string;
    status: 'enrolled' | 'eligible' | 'pending';
    potentialSavings: number;
    evidence: string;
  }[];
  
  // Cases & issues
  openCases: {
    id: string;
    type: string;
    status: string;
    created: string;
    description: string;
  }[];
  
  // Projects
  projects: {
    id: string;
    name: string;
    type: string;
    status: 'pending' | 'in-progress' | 'completed';
    value: number;
    expectedCompletion: string;
  }[];
  
  // Notes
  recentNotes: {
    date: string;
    author: string;
    content: string;
  }[];
}

export const kamAccounts: KAMAccount[] = [
  {
    id: 'acc-001',
    name: 'Meridian Manufacturing Corp',
    industry: 'Manufacturing',
    accountManager: 'Sarah Chen',
    contactName: 'Robert Martinez',
    contactEmail: 'r.martinez@meridianmfg.com',
    contactPhone: '(555) 234-5678',
    address: '1200 Industrial Parkway, Metro City, ST 12345',
    meters: 12,
    facilities: 3,
    rateSchedule: 'Large Power TOU - Schedule LP-1',
    contractRenewal: '2025-06-30',
    currentBill: 287450,
    previousBill: 245320,
    yoyBillChange: 12.4,
    billForecast: 295000,
    monthlyUsageKWh: 2450000,
    peakDemandKW: 4800,
    loadFactor: 0.72,
    usageTrend: 'up',
    outagesYTD: 3,
    momentaryInterruptions: 8,
    reliabilityScore: 'warning',
    lastOutageDate: '2024-11-28',
    enrolledPrograms: ['Demand Response', 'Power Factor Correction'],
    eligiblePrograms: ['Peak Shaving Incentive', 'Energy Efficiency Rebate'],
    billingRisk: 'medium',
    opportunityScore: 'high',
    attentionNeeded: true,
    annualRevenue: 3245000
  },
  {
    id: 'acc-002',
    name: 'TechPark Data Centers',
    industry: 'Technology',
    accountManager: 'Sarah Chen',
    contactName: 'Jennifer Wu',
    contactEmail: 'jwu@techparkdc.com',
    contactPhone: '(555) 345-6789',
    address: '500 Server Lane, Metro City, ST 12346',
    meters: 8,
    facilities: 2,
    rateSchedule: 'Critical Load - Schedule CL-1',
    contractRenewal: '2025-12-31',
    currentBill: 524680,
    previousBill: 518920,
    yoyBillChange: 3.2,
    billForecast: 530000,
    monthlyUsageKWh: 4200000,
    peakDemandKW: 6200,
    loadFactor: 0.91,
    usageTrend: 'stable',
    outagesYTD: 0,
    momentaryInterruptions: 2,
    reliabilityScore: 'good',
    lastOutageDate: null,
    enrolledPrograms: ['Premium Reliability Service', 'Backup Power Incentive'],
    eligiblePrograms: ['Renewable Energy Credit'],
    billingRisk: 'low',
    opportunityScore: 'medium',
    attentionNeeded: false,
    annualRevenue: 6180000
  },
  {
    id: 'acc-003',
    name: 'Metro General Hospital',
    industry: 'Healthcare',
    accountManager: 'Sarah Chen',
    contactName: 'Dr. Michael Thompson',
    contactEmail: 'm.thompson@metrogeneral.org',
    contactPhone: '(555) 456-7890',
    address: '800 Health Center Drive, Metro City, ST 12347',
    meters: 6,
    facilities: 1,
    rateSchedule: 'Healthcare Critical - Schedule HC-1',
    contractRenewal: '2026-03-15',
    currentBill: 189340,
    previousBill: 142560,
    yoyBillChange: 28.5,
    billForecast: 195000,
    monthlyUsageKWh: 1580000,
    peakDemandKW: 2400,
    loadFactor: 0.85,
    usageTrend: 'up',
    outagesYTD: 1,
    momentaryInterruptions: 4,
    reliabilityScore: 'good',
    lastOutageDate: '2024-08-15',
    enrolledPrograms: ['Critical Facility Program'],
    eligiblePrograms: ['HVAC Optimization Rebate', 'LED Lighting Incentive'],
    billingRisk: 'high',
    opportunityScore: 'high',
    attentionNeeded: true,
    annualRevenue: 2150000
  },
  {
    id: 'acc-004',
    name: 'Valley Agricultural Co-op',
    industry: 'Agriculture',
    accountManager: 'Sarah Chen',
    contactName: 'James Henderson',
    contactEmail: 'jhenderson@valleyag.coop',
    contactPhone: '(555) 567-8901',
    address: '2500 Rural Route 7, Farmington, ST 12348',
    meters: 24,
    facilities: 8,
    rateSchedule: 'Agricultural Power - Schedule AG-2',
    contractRenewal: '2025-02-28',
    currentBill: 156780,
    previousBill: 148920,
    yoyBillChange: 5.8,
    billForecast: 162000,
    monthlyUsageKWh: 1890000,
    peakDemandKW: 3100,
    loadFactor: 0.58,
    usageTrend: 'stable',
    outagesYTD: 5,
    momentaryInterruptions: 15,
    reliabilityScore: 'critical',
    lastOutageDate: '2024-12-01',
    enrolledPrograms: ['Irrigation Efficiency'],
    eligiblePrograms: ['Solar + Storage Incentive', 'Equipment Upgrade Rebate'],
    billingRisk: 'low',
    opportunityScore: 'high',
    attentionNeeded: true,
    annualRevenue: 1820000
  },
  {
    id: 'acc-005',
    name: 'Riverside Shopping Center',
    industry: 'Retail',
    accountManager: 'Sarah Chen',
    contactName: 'Patricia Gomez',
    contactEmail: 'pgomez@riversideretail.com',
    contactPhone: '(555) 678-9012',
    address: '100 Commerce Blvd, Metro City, ST 12349',
    meters: 15,
    facilities: 1,
    rateSchedule: 'Commercial TOU - Schedule C-2',
    contractRenewal: '2025-09-30',
    currentBill: 98450,
    previousBill: 102340,
    yoyBillChange: -4.2,
    billForecast: 95000,
    monthlyUsageKWh: 920000,
    peakDemandKW: 1850,
    loadFactor: 0.65,
    usageTrend: 'down',
    outagesYTD: 2,
    momentaryInterruptions: 5,
    reliabilityScore: 'good',
    lastOutageDate: '2024-09-22',
    enrolledPrograms: ['Small Business Efficiency'],
    eligiblePrograms: ['EV Charging Infrastructure', 'Smart Thermostat Program'],
    billingRisk: 'low',
    opportunityScore: 'medium',
    attentionNeeded: false,
    annualRevenue: 1180000
  },
  {
    id: 'acc-006',
    name: 'Coastal Processing Plant',
    industry: 'Manufacturing',
    accountManager: 'Sarah Chen',
    contactName: 'David Kim',
    contactEmail: 'dkim@coastalprocessing.com',
    contactPhone: '(555) 789-0123',
    address: '4500 Harbor Industrial Way, Port City, ST 12350',
    meters: 18,
    facilities: 4,
    rateSchedule: 'Industrial TOU - Schedule I-1',
    contractRenewal: '2025-04-30',
    currentBill: 412890,
    previousBill: 398450,
    yoyBillChange: 8.2,
    billForecast: 425000,
    monthlyUsageKWh: 3580000,
    peakDemandKW: 5500,
    loadFactor: 0.78,
    usageTrend: 'up',
    outagesYTD: 4,
    momentaryInterruptions: 12,
    reliabilityScore: 'warning',
    lastOutageDate: '2024-11-15',
    enrolledPrograms: ['Demand Response', 'Industrial Efficiency'],
    eligiblePrograms: ['Process Heat Electrification', 'Motor Upgrade Rebate'],
    billingRisk: 'medium',
    opportunityScore: 'high',
    attentionNeeded: true,
    annualRevenue: 4850000
  }
];

export const kamNotifications: KAMNotification[] = [
  {
    id: 'notif-001',
    accountId: 'acc-001',
    accountName: 'Meridian Manufacturing Corp',
    type: 'outage',
    severity: 'critical',
    title: 'Unplanned Outage Yesterday',
    description: 'Customer experienced 45-minute outage affecting main production facility. Third incident this year.',
    timestamp: '2024-12-03T14:30:00',
    actionable: true
  },
  {
    id: 'notif-002',
    accountId: 'acc-003',
    accountName: 'Metro General Hospital',
    type: 'billing',
    severity: 'warning',
    title: 'Bill Increased 28.5% YoY',
    description: 'Significant increase likely due to new wing expansion. Recommend rate review and efficiency consultation.',
    timestamp: '2024-12-03T09:15:00',
    actionable: true
  },
  {
    id: 'notif-003',
    accountId: 'acc-004',
    accountName: 'Valley Agricultural Co-op',
    type: 'opportunity',
    severity: 'info',
    title: 'High Potential for Solar + Storage',
    description: 'Load profile and rural location make this customer ideal for solar + battery storage incentive program.',
    timestamp: '2024-12-02T16:45:00',
    actionable: true
  },
  {
    id: 'notif-004',
    accountId: 'acc-004',
    accountName: 'Valley Agricultural Co-op',
    type: 'contract',
    severity: 'warning',
    title: 'Contract Renewal in 85 Days',
    description: 'Schedule renewal discussion. Customer has expressed interest in multi-year commitment with rate lock.',
    timestamp: '2024-12-02T11:00:00',
    actionable: true
  },
  {
    id: 'notif-005',
    accountId: 'acc-006',
    accountName: 'Coastal Processing Plant',
    type: 'anomaly',
    severity: 'warning',
    title: 'Baseload Increased 18% This Month',
    description: 'Unusual increase in overnight consumption. May indicate new equipment or process change.',
    timestamp: '2024-12-01T08:30:00',
    actionable: true
  },
  {
    id: 'notif-006',
    accountId: 'acc-002',
    accountName: 'TechPark Data Centers',
    type: 'project',
    severity: 'info',
    title: 'New Expansion Project Submitted',
    description: 'Customer submitted interconnection request for 2MW additional capacity. Review engineering study.',
    timestamp: '2024-11-30T14:20:00',
    actionable: true
  },
  {
    id: 'notif-007',
    accountId: 'acc-001',
    accountName: 'Meridian Manufacturing Corp',
    type: 'opportunity',
    severity: 'info',
    title: 'Peak Shaving Program Match',
    description: 'Load profile analysis indicates $45K annual savings potential through peak shaving enrollment.',
    timestamp: '2024-11-29T10:00:00',
    actionable: true
  }
];

export const getAccountDetail = (accountId: string): AccountDetail | null => {
  const account = kamAccounts.find(a => a.id === accountId);
  if (!account) return null;
  
  return {
    ...account,
    billingHistory: [
      { month: 'Jan', amount: 245000, usage: 2200000 },
      { month: 'Feb', amount: 238000, usage: 2150000 },
      { month: 'Mar', amount: 252000, usage: 2280000 },
      { month: 'Apr', amount: 248000, usage: 2240000 },
      { month: 'May', amount: 268000, usage: 2380000 },
      { month: 'Jun', amount: 285000, usage: 2520000 },
      { month: 'Jul', amount: 312000, usage: 2680000 },
      { month: 'Aug', amount: 298000, usage: 2590000 },
      { month: 'Sep', amount: 278000, usage: 2450000 },
      { month: 'Oct', amount: 265000, usage: 2380000 },
      { month: 'Nov', amount: 272000, usage: 2420000 },
      { month: 'Dec', amount: 287450, usage: 2450000 }
    ],
    costDrivers: [
      { category: 'Energy Charges', amount: 172470, percentage: 60 },
      { category: 'Demand Charges', amount: 74737, percentage: 26 },
      { category: 'Fuel Adjustment', amount: 23021, percentage: 8 },
      { category: 'Taxes & Fees', amount: 17222, percentage: 6 }
    ],
    usageHistory: [
      { month: 'Jan', usage: 2200000, peakDemand: 4200 },
      { month: 'Feb', usage: 2150000, peakDemand: 4100 },
      { month: 'Mar', usage: 2280000, peakDemand: 4350 },
      { month: 'Apr', usage: 2240000, peakDemand: 4280 },
      { month: 'May', usage: 2380000, peakDemand: 4520 },
      { month: 'Jun', usage: 2520000, peakDemand: 4680 },
      { month: 'Jul', usage: 2680000, peakDemand: 4920 },
      { month: 'Aug', usage: 2590000, peakDemand: 4800 },
      { month: 'Sep', usage: 2450000, peakDemand: 4650 },
      { month: 'Oct', usage: 2380000, peakDemand: 4520 },
      { month: 'Nov', usage: 2420000, peakDemand: 4580 },
      { month: 'Dec', usage: 2450000, peakDemand: 4800 }
    ],
    loadProfile: Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      weekday: i < 6 ? 1200 : i < 8 ? 2800 : i < 18 ? 4200 : i < 22 ? 3400 : 1800,
      weekend: i < 6 ? 800 : i < 10 ? 1200 : i < 18 ? 1800 : 1000
    })),
    anomalies: [
      { type: 'Peak Spike', description: 'Unusual demand spike during overnight hours', date: '2024-11-28', severity: 'medium' },
      { type: 'Baseload Increase', description: 'Baseload consumption up 15% from last month', date: '2024-11-15', severity: 'low' }
    ],
    outageHistory: [
      { date: '2024-11-28', duration: '45 min', cause: 'Equipment failure', affectedMeters: 8 },
      { date: '2024-09-12', duration: '2 hrs', cause: 'Planned maintenance', affectedMeters: 12 },
      { date: '2024-06-03', duration: '30 min', cause: 'Storm damage', affectedMeters: 4 }
    ],
    powerQualityEvents: [
      { type: 'Voltage Sag', count: 12, lastOccurrence: '2024-11-25' },
      { type: 'Harmonic Distortion', count: 5, lastOccurrence: '2024-10-18' },
      { type: 'Power Factor Issue', count: 3, lastOccurrence: '2024-09-08' }
    ],
    programDetails: [
      { name: 'Demand Response', status: 'enrolled', potentialSavings: 32000, evidence: 'Currently enrolled, good performance history' },
      { name: 'Power Factor Correction', status: 'enrolled', potentialSavings: 18000, evidence: 'Achieved 0.95 PF improvement' },
      { name: 'Peak Shaving Incentive', status: 'eligible', potentialSavings: 45000, evidence: 'Load profile shows 800kW shiftable capacity' },
      { name: 'Energy Efficiency Rebate', status: 'eligible', potentialSavings: 28000, evidence: 'Aging HVAC systems qualify for upgrade rebates' }
    ],
    openCases: [
      { id: 'CASE-2024-1892', type: 'Billing Inquiry', status: 'In Progress', created: '2024-11-20', description: 'Reviewing demand charges for October billing period' },
      { id: 'CASE-2024-1756', type: 'Meter Issue', status: 'Pending Review', created: '2024-11-05', description: 'Meter #7 showing intermittent readings' }
    ],
    projects: [
      { id: 'PRJ-2024-089', name: 'Solar Interconnection Study', type: 'New Generation', status: 'in-progress', value: 125000, expectedCompletion: '2025-03-15' },
      { id: 'PRJ-2024-067', name: 'EV Fleet Charging Infrastructure', type: 'Load Addition', status: 'pending', value: 85000, expectedCompletion: '2025-06-30' }
    ],
    recentNotes: [
      { date: '2024-12-01', author: 'Sarah Chen', content: 'Met with Robert to discuss reliability concerns. Agreed to schedule engineering review of feeder.' },
      { date: '2024-11-15', author: 'Sarah Chen', content: 'Customer interested in expanding solar capacity. Referred to commercial solar team.' },
      { date: '2024-10-28', author: 'Mike Johnson', content: 'Completed annual account review. Customer satisfied overall but wants faster outage response.' }
    ]
  };
};

export const portfolioSummary = {
  totalAccounts: kamAccounts.length,
  totalRevenue: kamAccounts.reduce((sum, a) => sum + a.annualRevenue, 0),
  accountsNeedingAttention: kamAccounts.filter(a => a.attentionNeeded).length,
  upcomingRenewals: kamAccounts.filter(a => {
    const renewal = new Date(a.contractRenewal);
    const now = new Date();
    const daysUntil = (renewal.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return daysUntil <= 90 && daysUntil > 0;
  }).length,
  highOpportunityAccounts: kamAccounts.filter(a => a.opportunityScore === 'high').length,
  reliabilityConcerns: kamAccounts.filter(a => a.reliabilityScore !== 'good').length
};
