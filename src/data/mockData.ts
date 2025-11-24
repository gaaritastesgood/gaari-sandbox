import { Customer, Bill, Payment, Interaction, Case, Rate, MeterReading } from "@/types/customer";

export const mockCustomers: Customer[] = [
  {
    id: "1",
    businessPartnerId: "17100010",
    firstName: "Yunus",
    lastName: "Kaldirim",
    email: "yunus.kaldirim@example.com",
    phone: "+1 (404) 555-0123",
    segment: "commercial",
    status: "active",
    contractAccounts: [
      {
        id: "ca1",
        accountNumber: "9000123456",
        status: "active",
        balance: 2845.67,
        dueDate: "2025-12-15",
        paymentPlan: false,
      },
    ],
    premises: [
      {
        id: "prem1",
        address: "1000 Augusta Ave SE",
        city: "Atlanta",
        state: "GA",
        zipCode: "30315-1402",
        premiseType: "office",
        servicePoints: [
          {
            id: "sp1",
            meterNumber: "MTR-2024-8891",
            meterType: "Smart Meter - Electric",
            lastReadDate: "2025-11-20",
            lastReading: 48921,
            estimatedRead: false,
          },
        ],
      },
    ],
  },
  {
    id: "2",
    businessPartnerId: "17200045",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (404) 555-0198",
    segment: "residential",
    status: "active",
    contractAccounts: [
      {
        id: "ca2",
        accountNumber: "9000234567",
        status: "active",
        balance: 145.23,
        dueDate: "2025-12-10",
        paymentPlan: true,
      },
    ],
    premises: [
      {
        id: "prem2",
        address: "456 Peachtree St NE",
        city: "Atlanta",
        state: "GA",
        zipCode: "30308",
        premiseType: "residential",
        servicePoints: [
          {
            id: "sp2",
            meterNumber: "MTR-2023-4412",
            meterType: "Smart Meter - Electric",
            lastReadDate: "2025-11-18",
            lastReading: 12456,
            estimatedRead: false,
          },
        ],
      },
    ],
  },
];

export const mockBills: Record<string, Bill[]> = {
  ca1: [
    {
      id: "bill1",
      billDate: "2025-11-01",
      servicePeriodStart: "2025-10-01",
      servicePeriodEnd: "2025-10-31",
      amount: 2845.67,
      status: "issued",
      dueDate: "2025-12-15",
      tariff: "COM-TOU-3 (Commercial Time-of-Use)",
      usage: 18542,
      usageUnit: "kWh",
      pdfUrl: "#",
      charges: [
        { category: "Energy", description: "On-Peak Energy", amount: 1245.32, rate: 0.125, quantity: 9963 },
        { category: "Energy", description: "Off-Peak Energy", amount: 578.45, rate: 0.067, quantity: 8635 },
        { category: "Delivery", description: "Distribution Charge", amount: 445.78, rate: 0.024, quantity: 18542 },
        { category: "Riders", description: "Renewable Energy Rider", amount: 92.18, rate: 0.005, quantity: 18542 },
        { category: "Riders", description: "Demand Response Credit", amount: -45.0, rate: -0.0024, quantity: 18542 },
        { category: "Taxes", description: "State & Local Taxes", amount: 528.94 },
      ],
      issues: [
        {
          type: "usage_spike",
          severity: "warning",
          description: "Usage 23% higher than previous month average",
        },
      ],
    },
    {
      id: "bill2",
      billDate: "2025-10-01",
      servicePeriodStart: "2025-09-01",
      servicePeriodEnd: "2025-09-30",
      amount: 2312.45,
      status: "paid",
      dueDate: "2025-11-15",
      tariff: "COM-TOU-3 (Commercial Time-of-Use)",
      usage: 15087,
      usageUnit: "kWh",
      pdfUrl: "#",
      charges: [
        { category: "Energy", description: "On-Peak Energy", amount: 1012.34, rate: 0.125, quantity: 8099 },
        { category: "Energy", description: "Off-Peak Energy", amount: 470.12, rate: 0.067, quantity: 7018 },
        { category: "Delivery", description: "Distribution Charge", amount: 362.09, rate: 0.024, quantity: 15087 },
        { category: "Riders", description: "Renewable Energy Rider", amount: 75.44, rate: 0.005, quantity: 15087 },
        { category: "Taxes", description: "State & Local Taxes", amount: 392.46 },
      ],
    },
    {
      id: "bill3",
      billDate: "2025-09-01",
      servicePeriodStart: "2025-08-01",
      servicePeriodEnd: "2025-08-31",
      amount: 2598.33,
      status: "paid",
      dueDate: "2025-10-15",
      tariff: "COM-TOU-3 (Commercial Time-of-Use)",
      usage: 16845,
      usageUnit: "kWh",
      pdfUrl: "#",
      charges: [
        { category: "Energy", description: "On-Peak Energy", amount: 1134.22, rate: 0.125, quantity: 9074 },
        { category: "Energy", description: "Off-Peak Energy", amount: 520.56, rate: 0.067, quantity: 7771 },
        { category: "Delivery", description: "Distribution Charge", amount: 404.28, rate: 0.024, quantity: 16845 },
        { category: "Riders", description: "Renewable Energy Rider", amount: 84.23, rate: 0.005, quantity: 16845 },
        { category: "Taxes", description: "State & Local Taxes", amount: 455.04 },
      ],
    },
  ],
  ca2: [
    {
      id: "bill4",
      billDate: "2025-11-05",
      servicePeriodStart: "2025-10-05",
      servicePeriodEnd: "2025-11-04",
      amount: 145.23,
      status: "issued",
      dueDate: "2025-12-10",
      tariff: "RES-STD (Residential Standard)",
      usage: 892,
      usageUnit: "kWh",
      pdfUrl: "#",
      charges: [
        { category: "Energy", description: "Energy Charge", amount: 98.12, rate: 0.11, quantity: 892 },
        { category: "Delivery", description: "Distribution Charge", amount: 26.76, rate: 0.03, quantity: 892 },
        { category: "Taxes", description: "State & Local Taxes", amount: 20.35 },
      ],
    },
  ],
};

export const mockPayments: Record<string, Payment[]> = {
  ca1: [
    {
      id: "pay1",
      date: "2025-11-10",
      amount: 2312.45,
      method: "ACH",
      status: "completed",
      reference: "ACH-2025-1110-00234",
    },
    {
      id: "pay2",
      date: "2025-10-12",
      amount: 2598.33,
      method: "Check",
      status: "completed",
      reference: "CHK-8845",
    },
  ],
  ca2: [
    {
      id: "pay3",
      date: "2025-11-01",
      amount: 72.62,
      method: "Credit Card",
      status: "completed",
      reference: "CC-2025-1101-00891",
    },
  ],
};

export const mockInteractions: Record<string, Interaction[]> = {
  "1": [
    {
      id: "int1",
      date: "2025-11-24",
      time: "14:23",
      type: "call",
      channel: "Phone",
      reason: "Billing Inquiry",
      description: "Customer called regarding high usage on recent bill",
      outcome: "Explained time-of-use rates and usage spike due to HVAC",
      agent: "Agent: Jane Smith",
    },
    {
      id: "int2",
      date: "2025-10-15",
      time: "09:45",
      type: "email",
      channel: "Email",
      reason: "Payment Confirmation",
      description: "Customer requested payment confirmation for October bill",
      outcome: "Sent payment receipt and account statement",
      agent: "Agent: Mike Johnson",
    },
  ],
  "2": [
    {
      id: "int3",
      date: "2025-11-20",
      time: "16:12",
      type: "chat",
      channel: "Web Chat",
      reason: "Payment Plan",
      description: "Customer inquired about payment plan options",
      outcome: "Enrolled customer in 6-month payment plan",
      agent: "Agent: Lisa Chen",
    },
  ],
};

export const mockCases: Record<string, Case[]> = {
  "1": [
    {
      id: "case1",
      createdDate: "2025-11-24",
      type: "Billing Issue",
      subject: "High usage investigation - October bill",
      status: "in_progress",
      priority: "medium",
      assignedTo: "Billing Specialist Team",
      relatedBillId: "bill1",
    },
  ],
  "2": [],
};

export const mockRates: Record<string, Rate[]> = {
  ca1: [
    {
      id: "rate1",
      name: "Commercial Time-of-Use Rate 3",
      code: "COM-TOU-3",
      effectiveDate: "2024-01-01",
      category: "Commercial",
      riders: ["Renewable Energy Rider", "Demand Response Program"],
    },
  ],
  ca2: [
    {
      id: "rate2",
      name: "Residential Standard Rate",
      code: "RES-STD",
      effectiveDate: "2024-01-01",
      category: "Residential",
      riders: [],
    },
  ],
};

export const mockMeterReadings: Record<string, MeterReading[]> = {
  sp1: [
    { id: "mr1", date: "2025-11-20", reading: 48921, type: "actual", usage: 1542, anomaly: false },
    { id: "mr2", date: "2025-10-20", reading: 47379, type: "actual", usage: 1287, anomaly: false },
    { id: "mr3", date: "2025-09-20", reading: 46092, type: "actual", usage: 1445, anomaly: false },
    { id: "mr4", date: "2025-08-20", reading: 44647, type: "actual", usage: 1623, anomaly: true },
    { id: "mr5", date: "2025-07-20", reading: 43024, type: "actual", usage: 1312, anomaly: false },
    { id: "mr6", date: "2025-06-20", reading: 41712, type: "actual", usage: 1198, anomaly: false },
  ],
  sp2: [
    { id: "mr7", date: "2025-11-18", reading: 12456, type: "actual", usage: 892, anomaly: false },
    { id: "mr8", date: "2025-10-18", reading: 11564, type: "actual", usage: 845, anomaly: false },
    { id: "mr9", date: "2025-09-18", reading: 10719, type: "actual", usage: 912, anomaly: false },
  ],
};
