import { CustomerIssue, CustomerProgramEligibility } from "@/types/customer";

// Mock customer issues data - using actual customer IDs from mockData.ts
export const mockCustomerIssues: Record<string, CustomerIssue[]> = {
  "1": [ // Javier Ortiz - residential
    {
      id: "ISS001",
      type: "high_bill",
      severity: "error",
      title: "Bill is 2× higher than usual",
      description: "Current bill of $487.89 is 98% higher than the 6-month average of $246.50. This may indicate meter issues, rate changes, or significant usage increase.",
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
  "2": [ // Aisha Patel - commercial
    {
      id: "ISS003",
      type: "usage_spike",
      severity: "warning",
      title: "Unusual overnight usage pattern",
      description: "Baseline overnight usage increased 40% in past 30 days. May indicate equipment issues or operational changes.",
      evidence: [
        { label: "View interval meter data", sourceType: "meter", sourceId: "MTR002", linkTab: "meters" },
        { label: "Compare to seasonal norms", sourceType: "usage", sourceId: "USG001", linkTab: "bills" }
      ],
      status: "open",
      defaultCaseType: "usage_investigation"
    }
  ],
  "3": [ // Nolan Reeves - residential with payment plan
    {
      id: "ISS004",
      type: "payment_plan",
      severity: "info",
      title: "Payment plan active - next payment due soon",
      description: "Customer is on a payment plan. Balance of $67.23 with next installment due Dec 20.",
      evidence: [
        { label: "View payment history", sourceType: "billing", sourceId: "PAY001", linkTab: "payments" }
      ],
      status: "open",
      defaultCaseType: "payment_arrangement"
    }
  ],
  "4": [ // Serena Okafor - commercial
    {
      id: "ISS005",
      type: "estimated_reading",
      severity: "warning",
      title: "Estimated meter reading",
      description: "Recent bill based on estimated reading. Recommend scheduling actual meter read.",
      evidence: [
        { label: "View meter read history", sourceType: "meter", sourceId: "MTR004", linkTab: "meters" }
      ],
      status: "open",
      defaultCaseType: "meter_access"
    }
  ],
  "5": [ // Lucas Mendel - residential
    {
      id: "ISS006",
      type: "high_bill",
      severity: "error",
      title: "Significant bill increase detected",
      description: "Current bill 65% higher than same period last year. May indicate heating system inefficiency or rate change.",
      evidence: [
        { label: "View year-over-year comparison", sourceType: "billing", sourceId: "BILL005", linkTab: "bills" },
        { label: "Analyze load profile", sourceType: "meter", sourceId: "MTR005", linkTab: "meters" }
      ],
      status: "open",
      defaultCaseType: "high_bill_inquiry"
    },
    {
      id: "ISS007",
      type: "call_followup",
      severity: "info",
      title: "Follow-up needed from previous call",
      description: "Customer called about high bill on Nov 15. Promised callback with rate analysis but no follow-up recorded.",
      evidence: [
        { label: "View call history", sourceType: "interaction", sourceId: "INT005", linkTab: "interactions" }
      ],
      status: "open",
      defaultCaseType: "callback"
    }
  ],
  "6": [ // Fatima Al-Rashid
    {
      id: "ISS008",
      type: "rate_mismatch",
      severity: "info",
      title: "May qualify for better rate plan",
      description: "Current standard rate may not be optimal. Usage pattern suggests TOU rate could save ~$15/month.",
      evidence: [
        { label: "View current rate details", sourceType: "billing", sourceId: "RATE006", linkTab: "rates" },
        { label: "Analyze load shape", sourceType: "meter", sourceId: "MTR006", linkTab: "meters" }
      ],
      status: "open",
      defaultCaseType: "rate_analysis"
    }
  ],
  "7": [ // Kai Thompson - commercial
    {
      id: "ISS009",
      type: "high_balance",
      severity: "error",
      title: "High outstanding balance",
      description: "Balance of $4,123.78 exceeds typical commercial threshold. May need payment arrangement discussion.",
      evidence: [
        { label: "View payment history", sourceType: "billing", sourceId: "PAY007", linkTab: "payments" },
        { label: "Review past interactions", sourceType: "interaction", sourceId: "INT007", linkTab: "interactions" }
      ],
      status: "open",
      defaultCaseType: "collections"
    }
  ],
  "8": [ // Elena Vasilev - residential with payment plan
    {
      id: "ISS010",
      type: "estimated_reading",
      severity: "warning",
      title: "Estimated meter reading",
      description: "Last reading was estimated. Customer on payment plan - accurate billing important.",
      evidence: [
        { label: "View meter read history", sourceType: "meter", sourceId: "MTR008", linkTab: "meters" }
      ],
      status: "open",
      defaultCaseType: "meter_access"
    }
  ]
};

// Mock customer program eligibility data
export const mockCustomerEligibility: Record<string, CustomerProgramEligibility[]> = {
  "1": [ // Javier Ortiz
    {
      customerId: "1",
      programId: "PROG001",
      programName: "Heat Pump Rebate",
      likelihood: "high",
      estimatedSavings: 850,
      sources: [
        { type: "load_analysis", description: "Resistance heat signature detected (high winter peak, rapid on/off cycling)", date: "2024-11-20", sourceId: "MTR001", linkTab: "meters" },
        { type: "billing_pattern", description: "Winter bills 3.2× higher than summer average", date: "2024-11-15", sourceId: "BILL001", linkTab: "bills" }
      ]
    },
    {
      customerId: "1",
      programId: "PROG002",
      programName: "Insulation & Air Sealing",
      likelihood: "medium",
      estimatedSavings: 420,
      sources: [
        { type: "load_analysis", description: "Rapid thermal decay pattern detected (HVAC runs frequently after setpoint reached)", date: "2024-11-18", sourceId: "MTR001", linkTab: "meters" }
      ]
    }
  ],
  "2": [ // Aisha Patel - commercial
    {
      customerId: "2",
      programId: "PROG006",
      programName: "A/C Tune-Up",
      likelihood: "high",
      estimatedSavings: 280,
      sources: [
        { type: "load_analysis", description: "Cooling over-cycling pattern detected (short run times, frequent starts)", date: "2024-08-10", sourceId: "MTR002", linkTab: "meters" },
        { type: "billing_pattern", description: "Summer peak usage 45% above similar businesses", date: "2024-08-15", sourceId: "BILL002", linkTab: "bills" }
      ]
    }
  ],
  "3": [ // Nolan Reeves
    {
      customerId: "3",
      programId: "PROG003",
      programName: "Smart Thermostat Incentive",
      likelihood: "high",
      estimatedSavings: 180,
      sources: [
        { type: "load_analysis", description: "No setback pattern detected - HVAC runs at constant level 24/7", date: "2024-11-22", sourceId: "MTR003", linkTab: "meters" }
      ]
    }
  ],
  "4": [ // Serena Okafor - commercial
    {
      customerId: "4",
      programId: "PROG003",
      programName: "Smart Thermostat Incentive",
      likelihood: "medium",
      estimatedSavings: 320,
      sources: [
        { type: "load_analysis", description: "Inconsistent HVAC scheduling detected across business hours", date: "2024-11-15", sourceId: "MTR004", linkTab: "meters" }
      ]
    }
  ],
  "5": [ // Lucas Mendel
    {
      customerId: "5",
      programId: "PROG001",
      programName: "Heat Pump Rebate",
      likelihood: "high",
      estimatedSavings: 720,
      sources: [
        { type: "load_analysis", description: "Strong resistance heat signature in winter months", date: "2024-11-25", sourceId: "MTR005", linkTab: "meters" },
        { type: "call_transcript", description: "Customer mentioned 'old furnace' during high bill call on Nov 15", date: "2024-11-15", sourceId: "INT005", linkTab: "interactions" },
        { type: "billing_pattern", description: "Winter bills consistently 2.8× summer bills", date: "2024-11-20", sourceId: "BILL005", linkTab: "bills" }
      ]
    },
    {
      customerId: "5",
      programId: "PROG002",
      programName: "Insulation & Air Sealing",
      likelihood: "high",
      estimatedSavings: 380,
      sources: [
        { type: "load_analysis", description: "High heating degree day correlation (1.9× typical)", date: "2024-11-18", sourceId: "MTR005", linkTab: "meters" },
        { type: "call_transcript", description: "Customer mentioned 'drafty house' during service call", date: "2024-10-22", sourceId: "INT005", linkTab: "interactions" }
      ]
    }
  ],
  "6": [ // Fatima Al-Rashid
    {
      customerId: "6",
      programId: "PROG005",
      programName: "EV Time-of-Use Rate",
      likelihood: "high",
      estimatedSavings: 320,
      sources: [
        { type: "load_analysis", description: "EV charging pattern detected (consistent 6-8kW load 6pm-10pm)", date: "2024-11-25", sourceId: "MTR006", linkTab: "meters" },
        { type: "meter_data", description: "Overnight baseline increased 35% in past 6 months", date: "2024-11-20", sourceId: "MTR006", linkTab: "meters" }
      ]
    },
    {
      customerId: "6",
      programId: "PROG004",
      programName: "Appliance Recycling",
      likelihood: "medium",
      estimatedSavings: 150,
      sources: [
        { type: "load_analysis", description: "Secondary refrigeration load signature detected (constant 150W baseline)", date: "2024-11-15", sourceId: "MTR006", linkTab: "meters" }
      ]
    }
  ],
  "7": [ // Kai Thompson - commercial
    {
      customerId: "7",
      programId: "PROG006",
      programName: "A/C Tune-Up",
      likelihood: "medium",
      estimatedSavings: 450,
      sources: [
        { type: "load_analysis", description: "HVAC efficiency degradation detected over past year", date: "2024-10-15", sourceId: "MTR007", linkTab: "meters" }
      ]
    }
  ],
  "8": [ // Elena Vasilev
    {
      customerId: "8",
      programId: "PROG003",
      programName: "Smart Thermostat Incentive",
      likelihood: "high",
      estimatedSavings: 165,
      sources: [
        { type: "load_analysis", description: "No programmable setback pattern - constant temperature maintained", date: "2024-11-28", sourceId: "MTR008", linkTab: "meters" },
        { type: "prior_participation", description: "Previously expressed interest in energy efficiency programs", date: "2024-09-10", sourceId: "INT008", linkTab: "interactions" }
      ]
    }
  ],
  "9": [ // Omar Haddad
    {
      customerId: "9",
      programId: "PROG002",
      programName: "Insulation & Air Sealing",
      likelihood: "medium",
      estimatedSavings: 290,
      sources: [
        { type: "load_analysis", description: "HVAC cycles frequently during extreme temperatures", date: "2024-11-21", sourceId: "MTR009", linkTab: "meters" }
      ]
    }
  ],
  "10": [ // Brielle Kingston - commercial
    {
      customerId: "10",
      programId: "PROG003",
      programName: "Smart Thermostat Incentive",
      likelihood: "high",
      estimatedSavings: 420,
      sources: [
        { type: "load_analysis", description: "Manual thermostat behavior detected - inconsistent scheduling", date: "2024-11-23", sourceId: "MTR010", linkTab: "meters" }
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
