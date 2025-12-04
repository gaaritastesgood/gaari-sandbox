import { CustomerIssue, CustomerProgramEligibility } from "@/types/customer";

// Mock customer issues data
export const mockCustomerIssues: Record<string, CustomerIssue[]> = {
  "CUST001": [
    {
      id: "ISS001",
      type: "high_bill",
      severity: "error",
      title: "Bill is 2× higher than usual",
      description: "Current bill of $287.50 is 98% higher than the 6-month average of $145.20. This may indicate meter issues, rate changes, or significant usage increase.",
      evidence: [
        { label: "View 6-month billing history", sourceType: "billing", sourceId: "BILL001", linkTab: "bills" },
        { label: "Check meter readings for anomalies", sourceType: "meter", sourceId: "MTR001", linkTab: "meters" }
      ],
      status: "open",
      defaultCaseType: "high_bill_inquiry"
    },
    {
      id: "ISS002",
      type: "estimated_reading",
      severity: "warning",
      title: "Estimated meter reading on last bill",
      description: "Last bill used an estimated reading due to meter access issues. Customer may be overbilled or underbilled.",
      evidence: [
        { label: "View meter read history", sourceType: "meter", sourceId: "MTR001", linkTab: "meters" },
        { label: "Check field visit notes", sourceType: "interaction", sourceId: "INT003", linkTab: "interactions" }
      ],
      status: "open",
      defaultCaseType: "meter_access"
    }
  ],
  "CUST002": [
    {
      id: "ISS003",
      type: "payment_overdue",
      severity: "error",
      title: "Payment overdue by 15 days",
      description: "Account balance of $1,245.00 is past due. Customer called about high bill last month but no resolution recorded.",
      evidence: [
        { label: "View payment history", sourceType: "billing", sourceId: "PAY001", linkTab: "payments" },
        { label: "Review high bill call notes", sourceType: "interaction", sourceId: "INT005", linkTab: "interactions" }
      ],
      status: "open",
      defaultCaseType: "payment_arrangement"
    },
    {
      id: "ISS004",
      type: "usage_spike",
      severity: "warning",
      title: "Unusual overnight usage pattern",
      description: "Baseline overnight usage increased 40% in past 30 days. May indicate appliance issues or unauthorized usage.",
      evidence: [
        { label: "View interval meter data", sourceType: "meter", sourceId: "MTR002", linkTab: "meters" },
        { label: "Compare to seasonal norms", sourceType: "usage", sourceId: "USG001", linkTab: "bills" }
      ],
      status: "open",
      defaultCaseType: "usage_investigation"
    }
  ],
  "CUST003": [
    {
      id: "ISS005",
      type: "rate_mismatch",
      severity: "info",
      title: "May qualify for better rate plan",
      description: "Current TOU rate may not be optimal given usage pattern. EV charging detected but not on EV rate.",
      evidence: [
        { label: "View current rate details", sourceType: "billing", sourceId: "RATE001", linkTab: "rates" },
        { label: "Analyze load shape", sourceType: "meter", sourceId: "MTR003", linkTab: "meters" }
      ],
      status: "open",
      defaultCaseType: "rate_analysis"
    }
  ]
};

// Mock customer program eligibility data
export const mockCustomerEligibility: Record<string, CustomerProgramEligibility[]> = {
  "CUST001": [
    {
      customerId: "CUST001",
      programId: "PROG001",
      programName: "Heat Pump Rebate",
      likelihood: "high",
      estimatedSavings: 850,
      sources: [
        { type: "load_analysis", description: "Resistance heat signature detected (high winter peak, rapid on/off cycling)", date: "2024-11-20", sourceId: "MTR001", linkTab: "meters" },
        { type: "billing_pattern", description: "Winter bills 3.2× higher than summer average", date: "2024-11-15", sourceId: "BILL001", linkTab: "bills" },
        { type: "call_transcript", description: "Customer mentioned 'electric baseboard heaters' during high bill call", date: "2024-10-28", sourceId: "INT001", linkTab: "interactions" }
      ]
    },
    {
      customerId: "CUST001",
      programId: "PROG002",
      programName: "Insulation & Air Sealing",
      likelihood: "medium",
      estimatedSavings: 420,
      sources: [
        { type: "load_analysis", description: "Rapid thermal decay pattern detected (HVAC runs frequently after setpoint reached)", date: "2024-11-18", sourceId: "MTR001", linkTab: "meters" },
        { type: "billing_pattern", description: "High heating/cooling degree day correlation (1.8× typical)", date: "2024-11-10", sourceId: "BILL001", linkTab: "bills" }
      ]
    }
  ],
  "CUST002": [
    {
      customerId: "CUST002",
      programId: "PROG003",
      programName: "Smart Thermostat Incentive",
      likelihood: "high",
      estimatedSavings: 180,
      sources: [
        { type: "load_analysis", description: "No setback pattern detected - HVAC runs at constant level 24/7", date: "2024-11-22", sourceId: "MTR002", linkTab: "meters" },
        { type: "call_transcript", description: "Customer asked about programmable thermostat options during service call", date: "2024-09-15", sourceId: "INT004", linkTab: "interactions" }
      ]
    },
    {
      customerId: "CUST002",
      programId: "PROG006",
      programName: "A/C Tune-Up",
      likelihood: "medium",
      estimatedSavings: 95,
      sources: [
        { type: "load_analysis", description: "Cooling over-cycling pattern detected (short run times, frequent starts)", date: "2024-08-10", sourceId: "MTR002", linkTab: "meters" },
        { type: "billing_pattern", description: "Summer peak usage 45% above similar homes", date: "2024-08-15", sourceId: "BILL002", linkTab: "bills" }
      ]
    }
  ],
  "CUST003": [
    {
      customerId: "CUST003",
      programId: "PROG005",
      programName: "EV Time-of-Use Rate",
      likelihood: "high",
      estimatedSavings: 320,
      sources: [
        { type: "load_analysis", description: "EV charging pattern detected (consistent 6-8kW load 6pm-10pm)", date: "2024-11-25", sourceId: "MTR003", linkTab: "meters" },
        { type: "meter_data", description: "Overnight baseline increased 35% in past 6 months", date: "2024-11-20", sourceId: "MTR003", linkTab: "meters" }
      ]
    },
    {
      customerId: "CUST003",
      programId: "PROG004",
      programName: "Appliance Recycling",
      likelihood: "medium",
      estimatedSavings: 150,
      sources: [
        { type: "load_analysis", description: "Secondary refrigeration load signature detected (constant 150W baseline)", date: "2024-11-15", sourceId: "MTR003", linkTab: "meters" },
        { type: "call_transcript", description: "Customer mentioned 'old freezer in garage' during outage report", date: "2024-07-22", sourceId: "INT006", linkTab: "interactions" }
      ]
    }
  ]
};

// Helper function to get issues for a customer
export const getCustomerIssues = (customerId: string): CustomerIssue[] => {
  return mockCustomerIssues[customerId] || [];
};

// Helper function to get program eligibility for a customer
export const getCustomerEligibility = (customerId: string): CustomerProgramEligibility[] => {
  return mockCustomerEligibility[customerId] || [];
};
