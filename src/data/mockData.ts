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
  ca1: [
    {
      id: "int1",
      date: "2025-11-02",
      type: "phone",
      summary: "Customer called to inquire about bill.",
      notes: "Explained the charges and due date.",
      agent: "Agent Smith",
    },
  ],
  ca2: [
    {
      id: "int2",
      date: "2025-11-06",
      type: "email",
      summary: "Customer emailed to request payment plan.",
      notes: "Sent information about available payment plans.",
      agent: "Agent Johnson",
    },
  ],
  ca3: [
    {
      id: "int3",
      date: "2025-11-11",
      type: "phone",
      summary: "Customer called to report a meter reading issue.",
      notes: "Scheduled a technician to check the meter.",
      agent: "Agent Williams",
    },
  ],
  ca4: [
    {
      id: "int4",
      date: "2025-11-16",
      type: "email",
      summary: "Customer emailed to dispute a charge.",
      notes: "Opened a case to investigate the disputed charge.",
      agent: "Agent Brown",
    },
  ],
  ca5: [
    {
      id: "int5",
      date: "2025-11-21",
      type: "phone",
      summary: "Customer called to update contact information.",
      notes: "Updated the customer's email address and phone number.",
      agent: "Agent Davis",
    },
  ],
};

export const mockCases: Record<string, Case[]> = {
  ca1: [
    {
      id: "case1",
      dateOpened: "2025-11-03",
      type: "billing dispute",
      status: "open",
      summary: "Customer disputes a high bill amount.",
      notes: "Investigating the billing details and usage history.",
      agent: "Agent Smith",
    },
  ],
  ca2: [
    {
      id: "case2",
      dateOpened: "2025-11-07",
      type: "payment plan request",
      status: "closed",
      summary: "Customer requests a payment plan due to financial hardship.",
      notes: "Approved the customer for a temporary payment plan.",
      agent: "Agent Johnson",
    },
  ],
  ca3: [
    {
      id: "case3",
      dateOpened: "2025-11-12",
      type: "meter issue",
      status: "pending",
      summary: "Customer reports a potential issue with the meter.",
      notes: "Awaiting technician's report after inspecting the meter.",
      agent: "Agent Williams",
    },
  ],
  ca4: [
    {
      id: "case4",
      dateOpened: "2025-11-17",
      type: "charge dispute",
      status: "open",
      summary: "Customer disputes a specific charge on the bill.",
      notes: "Gathering evidence to determine the validity of the charge.",
      agent: "Agent Brown",
    },
  ],
  ca5: [
    {
      id: "case5",
      dateOpened: "2025-11-22",
      type: "account update",
      status: "closed",
      summary: "Customer requests to update their account information.",
      notes: "Updated the customer's contact details and preferences.",
      agent: "Agent Davis",
    },
  ],
};

export const mockRates: Record<string, Rate[]> = {
  ca1: [
    {
      id: "rate1",
      startDate: "2025-01-01",
      endDate: "2025-12-31",
      tariff: "RES-STD (Residential Standard)",
      energyCharge: 0.13,
      deliveryCharge: 0.028,
      fixedCharge: 15.00,
    },
  ],
  ca2: [
    {
      id: "rate2",
      startDate: "2025-01-01",
      endDate: "2025-12-31",
      tariff: "COM-STD (Commercial Standard)",
      energyCharge: 0.12,
      deliveryCharge: 0.028,
      fixedCharge: 25.00,
    },
  ],
  ca3: [
    {
      id: "rate3",
      startDate: "2025-01-01",
      endDate: "2025-12-31",
      tariff: "RES-LOW (Residential Low Usage)",
      energyCharge: 0.145,
      deliveryCharge: 0.029,
      fixedCharge: 10.00,
    },
  ],
  ca4: [
    {
      id: "rate4",
      startDate: "2025-01-01",
      endDate: "2025-12-31",
      tariff: "COM-HIGH (Commercial High Usage)",
      energyCharge: 0.128,
      deliveryCharge: 0.034,
      fixedCharge: 40.00,
    },
  ],
  ca5: [
    {
      id: "rate5",
      startDate: "2025-01-01",
      endDate: "2025-12-31",
      tariff: "RES-STD (Residential Standard)",
      energyCharge: 0.13,
      deliveryCharge: 0.025,
      fixedCharge: 15.00,
    },
  ],
};

export const mockMeterReadings: Record<string, MeterReading[]> = {
  sp1: [
    {
      id: "mr1",
      date: "2025-11-20",
      reading: 14521,
      estimated: false,
      notes: "Normal meter reading.",
    },
  ],
  sp2: [
    {
      id: "mr2",
      date: "2025-11-15",
      reading: 8765,
      estimated: true,
      notes: "Estimated due to remote read failure.",
    },
  ],
  sp3: [
    {
      id: "mr3",
      date: "2025-11-25",
      reading: 4321,
      estimated: false,
      notes: "Normal meter reading.",
    },
  ],
  sp4: [
    {
      id: "mr4",
      date: "2025-11-30",
      reading: 9876,
      estimated: true,
      notes: "Estimated due to access issue.",
    },
  ],
  sp5: [
    {
      id: "mr5",
      date: "2025-12-05",
      reading: 5432,
      estimated: false,
      notes: "Normal meter reading.",
    },
  ],
};
