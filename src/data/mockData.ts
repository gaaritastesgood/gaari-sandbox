import { Customer, Bill, Payment, Interaction, Case, Rate, MeterReading } from "@/types/customer";

export const mockCustomers: Customer[] = [
  {
    id: "1",
    businessPartnerId: "BP001234",
    firstName: "Maya",
    lastName: "Linton",
    email: "maya.linton@email.com",
    phone: "+1 (415) 555-0123",
    segment: "residential",
    status: "active",
    contractAccounts: [
      {
        id: "ca1",
        accountNumber: "9001234567",
        status: "active",
        balance: 245.89,
        dueDate: "2025-12-15",
        paymentPlan: false,
      },
    ],
    premises: [
      {
        id: "prem1",
        address: "1842 Haight Street",
        city: "San Francisco",
        state: "CA",
        zipCode: "94117",
        premiseType: "residential",
        servicePoints: [
          {
            id: "sp1",
            meterNumber: "MTR-2024-1001",
            meterType: "Smart Meter - Electric",
            lastReadDate: "2025-11-20",
            lastReading: 14521,
            estimatedRead: false,
          },
        ],
      },
    ],
  },
  {
    id: "2",
    businessPartnerId: "BP005678",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@email.com",
    phone: "+1 (415) 555-0124",
    segment: "commercial",
    status: "inactive",
    contractAccounts: [
      {
        id: "ca2",
        accountNumber: "9008765432",
        status: "inactive",
        balance: 0.00,
        dueDate: "2024-01-01",
        paymentPlan: false,
      },
    ],
    premises: [
      {
        id: "prem2",
        address: "123 Main Street",
        city: "San Francisco",
        state: "CA",
        zipCode: "94101",
        premiseType: "commercial",
        servicePoints: [
          {
            id: "sp2",
            meterNumber: "MTR-2024-1002",
            meterType: "Smart Meter - Gas",
            lastReadDate: "2025-11-15",
            lastReading: 8765,
            estimatedRead: true,
          },
        ],
      },
    ],
  },
  {
    id: "3",
    businessPartnerId: "BP009012",
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@email.com",
    phone: "+1 (415) 555-0125",
    segment: "residential",
    status: "active",
    contractAccounts: [
      {
        id: "ca3",
        accountNumber: "9002468135",
        status: "active",
        balance: 123.45,
        dueDate: "2025-12-20",
        paymentPlan: true,
      },
    ],
    premises: [
      {
        id: "prem3",
        address: "456 Elm Avenue",
        city: "San Francisco",
        state: "CA",
        zipCode: "94102",
        premiseType: "residential",
        servicePoints: [
          {
            id: "sp3",
            meterNumber: "MTR-2024-1003",
            meterType: "Smart Meter - Water",
            lastReadDate: "2025-11-25",
            lastReading: 4321,
            estimatedRead: false,
          },
        ],
      },
    ],
  },
  {
    id: "4",
    businessPartnerId: "BP003456",
    firstName: "Bob",
    lastName: "Williams",
    email: "bob.williams@email.com",
    phone: "+1 (415) 555-0126",
    segment: "commercial",
    status: "active",
    contractAccounts: [
      {
        id: "ca4",
        accountNumber: "9009876543",
        status: "active",
        balance: 567.89,
        dueDate: "2025-12-25",
        paymentPlan: false,
      },
    ],
    premises: [
      {
        id: "prem4",
        address: "789 Oak Street",
        city: "San Francisco",
        state: "CA",
        zipCode: "94103",
        premiseType: "commercial",
        servicePoints: [
          {
            id: "sp4",
            meterNumber: "MTR-2024-1004",
            meterType: "Smart Meter - Electric",
            lastReadDate: "2025-11-30",
            lastReading: 9876,
            estimatedRead: true,
          },
        ],
      },
    ],
  },
  {
    id: "5",
    businessPartnerId: "BP007890",
    firstName: "Emily",
    lastName: "Brown",
    email: "emily.brown@email.com",
    phone: "+1 (415) 555-0127",
    segment: "residential",
    status: "inactive",
    contractAccounts: [
      {
        id: "ca5",
        accountNumber: "9003692581",
        status: "inactive",
        balance: 0.00,
        dueDate: "2024-01-05",
        paymentPlan: false,
      },
    ],
    premises: [
      {
        id: "prem5",
        address: "101 Pine Avenue",
        city: "San Francisco",
        state: "CA",
        zipCode: "94104",
        premiseType: "residential",
        servicePoints: [
          {
            id: "sp5",
            meterNumber: "MTR-2024-1005",
            meterType: "Smart Meter - Gas",
            lastReadDate: "2025-12-05",
            lastReading: 5432,
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
      amount: 245.89,
      status: "issued",
      dueDate: "2025-12-15",
      tariff: "RES-STD (Residential Standard)",
      usage: 1245,
      usageUnit: "kWh",
      pdfUrl: "#",
      charges: [
        { category: "Energy", description: "Energy Charge", amount: 162.34, rate: 0.13, quantity: 1245 },
        { category: "Fixed", description: "Monthly Service Fee", amount: 15.00 },
        { category: "Delivery", description: "Distribution Charge", amount: 34.80, rate: 0.028, quantity: 1245 },
        { category: "Taxes", description: "State & Local Taxes", amount: 33.75 },
      ],
    },
  ],
  ca2: [
    {
      id: "bill2",
      billDate: "2025-11-05",
      servicePeriodStart: "2025-10-05",
      servicePeriodEnd: "2025-11-04",
      amount: 123.45,
      status: "paid",
      dueDate: "2025-12-20",
      tariff: "COM-STD (Commercial Standard)",
      usage: 678,
      usageUnit: "kWh",
      pdfUrl: "#",
      charges: [
        { category: "Energy", description: "Energy Charge", amount: 81.23, rate: 0.12, quantity: 678 },
        { category: "Fixed", description: "Monthly Service Fee", amount: 25.00 },
        { category: "Delivery", description: "Distribution Charge", amount: 19.00, rate: 0.028, quantity: 678 },
        { category: "Taxes", description: "State & Local Taxes", amount: 8.22 },
      ],
    },
  ],
  ca3: [
    {
      id: "bill3",
      billDate: "2025-11-10",
      servicePeriodStart: "2025-10-10",
      servicePeriodEnd: "2025-11-09",
      amount: 78.90,
      status: "issued",
      dueDate: "2025-12-25",
      tariff: "RES-LOW (Residential Low Usage)",
      usage: 345,
      usageUnit: "kWh",
      pdfUrl: "#",
      charges: [
        { category: "Energy", description: "Energy Charge", amount: 50.00, rate: 0.145, quantity: 345 },
        { category: "Fixed", description: "Monthly Service Fee", amount: 10.00 },
        { category: "Delivery", description: "Distribution Charge", amount: 10.00, rate: 0.029, quantity: 345 },
        { category: "Taxes", description: "State & Local Taxes", amount: 8.90 },
      ],
    },
  ],
  ca4: [
    {
      id: "bill4",
      billDate: "2025-11-15",
      servicePeriodStart: "2025-10-15",
      servicePeriodEnd: "2025-11-14",
      amount: 456.78,
      status: "paid",
      dueDate: "2026-01-01",
      tariff: "COM-HIGH (Commercial High Usage)",
      usage: 2345,
      usageUnit: "kWh",
      pdfUrl: "#",
      charges: [
        { category: "Energy", description: "Energy Charge", amount: 300.00, rate: 0.128, quantity: 2345 },
        { category: "Fixed", description: "Monthly Service Fee", amount: 40.00 },
        { category: "Delivery", description: "Distribution Charge", amount: 80.00, rate: 0.034, quantity: 2345 },
        { category: "Taxes", description: "State & Local Taxes", amount: 36.78 },
      ],
    },
  ],
  ca5: [
    {
      id: "bill5",
      billDate: "2025-11-20",
      servicePeriodStart: "2025-10-20",
      servicePeriodEnd: "2025-11-19",
      amount: 99.99,
      status: "issued",
      dueDate: "2026-01-05",
      tariff: "RES-STD (Residential Standard)",
      usage: 500,
      usageUnit: "kWh",
      pdfUrl: "#",
      charges: [
        { category: "Energy", description: "Energy Charge", amount: 65.00, rate: 0.13, quantity: 500 },
        { category: "Fixed", description: "Monthly Service Fee", amount: 15.00 },
        { category: "Delivery", description: "Distribution Charge", amount: 12.50, rate: 0.025, quantity: 500 },
        { category: "Taxes", description: "State & Local Taxes", amount: 7.49 },
      ],
    },
  ],
};

export const mockPayments: Record<string, Payment[]> = {
  ca1: [
    {
      id: "pay1",
      date: "2025-10-12",
      amount: 234.56,
      method: "ACH",
      status: "completed",
      reference: "ACH-2025-1012-00123",
    },
  ],
  ca2: [
    {
      id: "pay2",
      date: "2025-10-15",
      amount: 123.45,
      method: "Credit Card",
      status: "completed",
      reference: "CC-2025-1015-00456",
    },
  ],
  ca3: [
    {
      id: "pay3",
      date: "2025-10-18",
      amount: 78.90,
      method: "ACH",
      status: "completed",
      reference: "ACH-2025-1018-00789",
    },
  ],
  ca4: [
    {
      id: "pay4",
      date: "2025-10-21",
      amount: 456.78,
      method: "Credit Card",
      status: "completed",
      reference: "CC-2025-1021-01012",
    },
  ],
  ca5: [
    {
      id: "pay5",
      date: "2025-10-24",
      amount: 99.99,
      method: "ACH",
      status: "completed",
      reference: "ACH-2025-1024-01314",
    },
  ],
};

export const mockInteractions: Record<string, Interaction[]> = {
  "1": [
    {
      id: "int1",
      date: "2025-11-15",
      time: "10:23",
      type: "call",
      channel: "Phone",
      reason: "Billing Inquiry",
      description: "Customer called to inquire about recent bill increase",
      outcome: "Explained seasonal rate changes and usage spike",
      agent: "Agent: Sarah Chen",
    },
  ],
};

export const mockCases: Record<string, Case[]> = {
  "7": [
    {
      id: "case1",
      createdDate: "2025-11-19",
      type: "Billing Issue",
      subject: "High usage investigation - October bill",
      status: "in_progress",
      priority: "medium",
      assignedTo: "Billing Specialist Team",
      relatedBillId: "bill7",
    },
  ],
};

export const mockRates: Record<string, Rate[]> = {
  ca1: [
    {
      id: "rate1",
      name: "Residential Standard Rate",
      code: "RES-STD",
      effectiveDate: "2024-01-01",
      category: "Residential",
      riders: [],
    },
  ],
  ca2: [
    {
      id: "rate2",
      name: "Commercial Time-of-Use Rate",
      code: "COM-TOU-2",
      effectiveDate: "2024-01-01",
      category: "Commercial",
      riders: ["Demand Charge"],
    },
  ],
  ca7: [
    {
      id: "rate7",
      name: "Commercial Industrial Rate",
      code: "COM-IND-1",
      effectiveDate: "2024-01-01",
      category: "Industrial",
      riders: ["Industrial Demand Rider"],
    },
  ],
};

export const mockMeterReadings: Record<string, MeterReading[]> = {
  sp1: [
    { id: "mr1", date: "2025-11-20", reading: 14521, type: "actual", usage: 1245, anomaly: false },
    { id: "mr2", date: "2025-10-20", reading: 13276, type: "actual", usage: 1189, anomaly: false },
    { id: "mr3", date: "2025-09-20", reading: 12087, type: "actual", usage: 1234, anomaly: false },
  ],
  sp2: [
    { id: "mr4", date: "2025-11-18", reading: 38942, type: "actual", usage: 9842, anomaly: false },
    { id: "mr5", date: "2025-10-18", reading: 29100, type: "actual", usage: 9456, anomaly: false },
  ],
  sp5: [
    { id: "mr6", date: "2025-11-20", reading: 52341, type: "actual", usage: 16234, anomaly: false },
    { id: "mr7", date: "2025-10-20", reading: 36107, type: "actual", usage: 15892, anomaly: false },
  ],
  sp7: [
    { id: "mr8", date: "2025-11-19", reading: 61254, type: "actual", usage: 21345, anomaly: true },
    { id: "mr9", date: "2025-10-19", reading: 39909, type: "actual", usage: 18234, anomaly: false },
  ],
};
