export interface Program {
  id: string;
  name: string;
  status: 'Active' | 'High Potential' | 'Underperforming' | 'New Pilot';
  participationRate: number;
  eligibleCount: number;
  enrolledCount: number;
  opportunityGap: number;
  estimatedSavings: number;
  trendData: number[];
  description: string;
  category: string;
}

export interface Segment {
  id: string;
  name: string;
  linkedPrograms: string[];
  customerCount: number;
  signals: string[];
  opportunityGap: number;
  description: string;
  estimatedSavings: number;
  outreachStrategy: string;
}

export interface RecommendedAction {
  id: string;
  title: string;
  description: string;
  channel: 'Email' | 'SMS' | 'Portal' | 'Contractor' | 'Call';
  programId?: string;
  segmentId?: string;
  priority: 'High' | 'Medium' | 'Low';
  impactedCustomers: number;
}

export interface SegmentCustomer {
  id: string;
  name: string;
  score: number;
  primarySignal: string;
  estimatedSavings: number;
  lastOutreach: string | null;
  status: 'New' | 'Contacted' | 'Enrolled' | 'Declined';
}

export const mockPrograms: Program[] = [
  {
    id: 'prog-1',
    name: 'Heat Pump Rebate',
    status: 'Active',
    participationRate: 12.4,
    eligibleCount: 18500,
    enrolledCount: 2294,
    opportunityGap: 16206,
    estimatedSavings: 4200000,
    trendData: [8, 9, 9.5, 10, 10.8, 11.2, 11.8, 12.4],
    description: 'Rebates up to $2,500 for qualifying heat pump installations, reducing winter heating costs and peak demand.',
    category: 'HVAC'
  },
  {
    id: 'prog-2',
    name: 'Insulation & Air Sealing',
    status: 'High Potential',
    participationRate: 6.2,
    eligibleCount: 24000,
    enrolledCount: 1488,
    opportunityGap: 22512,
    estimatedSavings: 6800000,
    trendData: [4, 4.5, 5, 5.2, 5.5, 5.8, 6, 6.2],
    description: 'Weatherization program offering free home energy audits and subsidized insulation upgrades.',
    category: 'Weatherization'
  },
  {
    id: 'prog-3',
    name: 'Smart Thermostat Incentive',
    status: 'Active',
    participationRate: 22.1,
    eligibleCount: 45000,
    enrolledCount: 9945,
    opportunityGap: 35055,
    estimatedSavings: 2100000,
    trendData: [15, 16, 17, 18, 19, 20, 21, 22.1],
    description: 'Free smart thermostat with installation for qualifying customers, enabling demand response participation.',
    category: 'Smart Home'
  },
  {
    id: 'prog-4',
    name: 'Appliance Recycling',
    status: 'Underperforming',
    participationRate: 3.8,
    eligibleCount: 32000,
    enrolledCount: 1216,
    opportunityGap: 30784,
    estimatedSavings: 1900000,
    trendData: [5, 4.8, 4.5, 4.2, 4, 3.9, 3.8, 3.8],
    description: 'Free pickup and rebate for recycling old refrigerators and freezers.',
    category: 'Recycling'
  },
  {
    id: 'prog-5',
    name: 'EV Time-of-Use Rate',
    status: 'New Pilot',
    participationRate: 8.5,
    eligibleCount: 8200,
    enrolledCount: 697,
    opportunityGap: 7503,
    estimatedSavings: 920000,
    trendData: [2, 3, 4, 5, 6, 7, 8, 8.5],
    description: 'Special TOU rate for EV owners with lower overnight charging costs.',
    category: 'Rate Programs'
  },
  {
    id: 'prog-6',
    name: 'A/C Tune-Up Program',
    status: 'Active',
    participationRate: 15.3,
    eligibleCount: 28000,
    enrolledCount: 4284,
    opportunityGap: 23716,
    estimatedSavings: 3400000,
    trendData: [10, 11, 12, 13, 14, 14.5, 15, 15.3],
    description: 'Subsidized A/C maintenance visits to improve efficiency and reduce summer peak demand.',
    category: 'HVAC'
  }
];

export const mockSegments: Segment[] = [
  {
    id: 'seg-1',
    name: 'Resistance Heat High Spenders',
    linkedPrograms: ['Heat Pump Rebate', 'Insulation & Air Sealing'],
    customerCount: 2400,
    signals: ['High winter peaks', 'Resistance heat signature', 'Bills >$400/mo winter'],
    opportunityGap: 2180,
    description: 'Customers with electric resistance heating showing high winter consumption patterns.',
    estimatedSavings: 1800,
    outreachStrategy: 'Direct mail with contractor partnership offer, followed by phone outreach for high-value prospects.'
  },
  {
    id: 'seg-2',
    name: 'High Summer Peak Users',
    linkedPrograms: ['A/C Tune-Up Program', 'Smart Thermostat Incentive'],
    customerCount: 9300,
    signals: ['Peak demand >8kW', 'Cooling overcycling', 'Summer bills spike'],
    opportunityGap: 6200,
    description: 'Homes with significant summer cooling demand contributing to system peaks.',
    estimatedSavings: 450,
    outreachStrategy: 'Portal banner and email campaign before summer peak season.'
  },
  {
    id: 'seg-3',
    name: 'Overnight Baseline Loaders',
    linkedPrograms: ['Appliance Recycling'],
    customerCount: 4800,
    signals: ['Overnight load >2kW', 'Flat load profile', 'Secondary fridge likely'],
    opportunityGap: 4100,
    description: 'Customers with elevated overnight baseline indicating old appliances running 24/7.',
    estimatedSavings: 280,
    outreachStrategy: 'Email campaign highlighting free pickup and rebate value.'
  },
  {
    id: 'seg-4',
    name: 'EV Charging Pattern Detected',
    linkedPrograms: ['EV Time-of-Use Rate'],
    customerCount: 3200,
    signals: ['Evening load spike', 'EV charging signature', 'Not on TOU rate'],
    opportunityGap: 2500,
    description: 'Customers with AMI patterns indicating EV charging but not enrolled in EV rate.',
    estimatedSavings: 380,
    outreachStrategy: 'Personalized email showing potential savings with rate switch.'
  },
  {
    id: 'seg-5',
    name: 'Cooling Overcyclers',
    linkedPrograms: ['Smart Thermostat Incentive', 'A/C Tune-Up Program'],
    customerCount: 5600,
    signals: ['Short cycling pattern', 'Inefficient cooling', 'No smart thermostat'],
    opportunityGap: 4900,
    description: 'HVAC systems showing inefficient short-cycling behavior detectable via AMI.',
    estimatedSavings: 320,
    outreachStrategy: 'Contractor outreach for tune-up, bundled with smart thermostat offer.'
  },
  {
    id: 'seg-6',
    name: 'High Bill Complainers',
    linkedPrograms: ['Heat Pump Rebate', 'Insulation & Air Sealing', 'Smart Thermostat Incentive'],
    customerCount: 1850,
    signals: ['Recent billing complaint', 'Usage increase', 'No program enrollment'],
    opportunityGap: 1720,
    description: 'Customers who contacted support about high bills but haven\'t enrolled in any efficiency programs.',
    estimatedSavings: 680,
    outreachStrategy: 'CSR follow-up with personalized program recommendations during next contact.'
  }
];

export const mockActions: RecommendedAction[] = [
  {
    id: 'action-1',
    title: 'Heat Pump Outreach Campaign',
    description: 'Send personalized heat pump rebate offers to top 2,400 resistance-heat customers with projected savings calculations.',
    channel: 'Email',
    segmentId: 'seg-1',
    programId: 'prog-1',
    priority: 'High',
    impactedCustomers: 2400
  },
  {
    id: 'action-2',
    title: 'Export Contractor List',
    description: 'Generate contractor assignment list for Region A cooling overcycled homes requiring A/C tune-up visits.',
    channel: 'Contractor',
    segmentId: 'seg-5',
    programId: 'prog-6',
    priority: 'Medium',
    impactedCustomers: 1800
  },
  {
    id: 'action-3',
    title: 'Smart Thermostat Portal Banner',
    description: 'Add targeted portal banner recommending smart thermostats for 9,300 high summer peak users.',
    channel: 'Portal',
    segmentId: 'seg-2',
    programId: 'prog-3',
    priority: 'High',
    impactedCustomers: 9300
  },
  {
    id: 'action-4',
    title: 'Pre-Heatwave SMS Alert',
    description: 'Push SMS reminder to high summer-peak cohort about A/C tune-up availability before forecasted heat wave.',
    channel: 'SMS',
    segmentId: 'seg-2',
    programId: 'prog-6',
    priority: 'High',
    impactedCustomers: 6200
  },
  {
    id: 'action-5',
    title: 'EV Rate Switch Campaign',
    description: 'Email EV owners showing personalized savings comparison if they switch to TOU rate.',
    channel: 'Email',
    segmentId: 'seg-4',
    programId: 'prog-5',
    priority: 'Medium',
    impactedCustomers: 2500
  },
  {
    id: 'action-6',
    title: 'Appliance Recycling Reactivation',
    description: 'Call campaign to overnight baseline loaders highlighting free pickup and $50 rebate for old appliances.',
    channel: 'Call',
    segmentId: 'seg-3',
    programId: 'prog-4',
    priority: 'Low',
    impactedCustomers: 4100
  }
];

export const mockSegmentCustomers: Record<string, SegmentCustomer[]> = {
  'seg-1': [
    { id: 'cust-1', name: 'Robert Martinez', score: 94, primarySignal: 'Resistance heat, $520/mo winter avg', estimatedSavings: 2400, lastOutreach: null, status: 'New' },
    { id: 'cust-2', name: 'Patricia Williams', score: 91, primarySignal: 'High winter peaks, poor insulation', estimatedSavings: 2100, lastOutreach: '2024-01-15', status: 'Contacted' },
    { id: 'cust-3', name: 'James Johnson', score: 89, primarySignal: 'Electric baseboard detected', estimatedSavings: 1950, lastOutreach: null, status: 'New' },
    { id: 'cust-4', name: 'Linda Brown', score: 87, primarySignal: 'Resistance heat signature', estimatedSavings: 1800, lastOutreach: '2024-02-20', status: 'Declined' },
    { id: 'cust-5', name: 'Michael Davis', score: 85, primarySignal: 'High winter consumption', estimatedSavings: 1750, lastOutreach: null, status: 'New' },
  ],
  'seg-2': [
    { id: 'cust-6', name: 'Jennifer Garcia', score: 92, primarySignal: 'Peak demand 12kW, no thermostat', estimatedSavings: 580, lastOutreach: null, status: 'New' },
    { id: 'cust-7', name: 'David Miller', score: 88, primarySignal: 'Cooling overcycling pattern', estimatedSavings: 520, lastOutreach: '2024-06-01', status: 'Contacted' },
    { id: 'cust-8', name: 'Susan Wilson', score: 86, primarySignal: 'Summer bills 3x winter', estimatedSavings: 490, lastOutreach: null, status: 'New' },
  ],
  'seg-3': [
    { id: 'cust-9', name: 'Thomas Anderson', score: 90, primarySignal: 'Overnight load 3.2kW constant', estimatedSavings: 340, lastOutreach: null, status: 'New' },
    { id: 'cust-10', name: 'Nancy Taylor', score: 85, primarySignal: 'Secondary fridge detected', estimatedSavings: 280, lastOutreach: '2024-03-10', status: 'Enrolled' },
  ],
  'seg-4': [
    { id: 'cust-11', name: 'Christopher Lee', score: 95, primarySignal: 'EV charging 6-9pm daily', estimatedSavings: 450, lastOutreach: null, status: 'New' },
    { id: 'cust-12', name: 'Karen White', score: 88, primarySignal: 'Evening spike pattern', estimatedSavings: 380, lastOutreach: null, status: 'New' },
  ],
  'seg-5': [
    { id: 'cust-13', name: 'Daniel Harris', score: 91, primarySignal: 'A/C cycling every 8 mins', estimatedSavings: 420, lastOutreach: null, status: 'New' },
    { id: 'cust-14', name: 'Lisa Clark', score: 87, primarySignal: 'Inefficient cooling signature', estimatedSavings: 350, lastOutreach: '2024-05-15', status: 'Contacted' },
  ],
  'seg-6': [
    { id: 'cust-15', name: 'Lucas Mendel', score: 96, primarySignal: 'Called about high bill, usage 4x increase', estimatedSavings: 890, lastOutreach: '2024-11-20', status: 'Contacted' },
    { id: 'cust-16', name: 'Amanda Robinson', score: 89, primarySignal: 'Billing complaint, no programs', estimatedSavings: 620, lastOutreach: null, status: 'New' },
  ]
};
