import { ConsolidatedIssue, SimplifiedProgramEligibility } from "@/types/customer";

// Consolidated issues - groups related symptoms into single root cause
export const consolidatedCustomerIssues: Record<string, ConsolidatedIssue[]> = {
  "1": [ // Javier Ortiz - high bill + estimated reading = meter issue
    {
      id: "CONS001",
      title: "Potential Meter Issue",
      summary: "Estimated billing combined with an unusually high charge suggests a possible meter access or equipment problem requiring investigation.",
      severity: "error",
      supportingFacts: [
        { fact: "Current bill $487 is 2× typical amount", linkTab: "bills" },
        { fact: "Last reading was estimated (no actual read)", linkTab: "meters" }
      ],
      recommendedAction: "Schedule field verification or create a billing dispute case.",
      defaultCaseType: "meter_investigation"
    }
  ],
  "2": [ // Aisha Patel - commercial
    {
      id: "CONS002",
      title: "Unusual Load Pattern",
      summary: "Overnight consumption has increased significantly. This may indicate equipment issues or unintended operational changes.",
      severity: "warning",
      supportingFacts: [
        { fact: "Overnight usage up 40% in past 30 days", linkTab: "meters" },
        { fact: "Pattern differs from seasonal norms", linkTab: "bills" }
      ],
      recommendedAction: "Review interval data with customer to identify cause.",
      defaultCaseType: "usage_investigation"
    }
  ],
  "3": [ // Nolan Reeves - payment plan
    {
      id: "CONS003",
      title: "Payment Plan Reminder",
      summary: "Customer has an active payment arrangement with an upcoming installment due.",
      severity: "info",
      supportingFacts: [
        { fact: "Balance: $67.23 — next payment due Dec 20", linkTab: "payments" }
      ],
      recommendedAction: "Confirm customer is aware of upcoming payment date.",
      defaultCaseType: "payment_arrangement"
    }
  ],
  "4": [ // Serena Okafor - estimated reading
    {
      id: "CONS004",
      title: "Estimated Billing",
      summary: "Recent bill based on estimated reading. Recommend scheduling an actual meter read for accuracy.",
      severity: "warning",
      supportingFacts: [
        { fact: "Last reading was estimated", linkTab: "meters" }
      ],
      recommendedAction: "Schedule meter read or verify meter access.",
      defaultCaseType: "meter_access"
    }
  ],
  "5": [ // Lucas Mendel - high bill + follow-up needed
    {
      id: "CONS005",
      title: "High Bill Follow-Up Required",
      summary: "Customer contacted about a high bill but no resolution on record. Callback may be needed.",
      severity: "error",
      supportingFacts: [
        { fact: "Bill 65% higher than same period last year", linkTab: "bills" },
        { fact: "Nov 15 call — promised callback not completed", linkTab: "interactions" }
      ],
      recommendedAction: "Complete rate analysis and contact customer.",
      defaultCaseType: "callback"
    }
  ],
  "6": [ // Fatima Al-Rashid - rate optimization
    {
      id: "CONS006",
      title: "Rate Optimization Opportunity",
      summary: "Current rate may not be optimal for this customer's usage pattern.",
      severity: "info",
      supportingFacts: [
        { fact: "TOU rate could save ~$15/month", linkTab: "rates" },
        { fact: "Load profile shows off-peak potential", linkTab: "meters" }
      ],
      recommendedAction: "Discuss rate options with customer.",
      defaultCaseType: "rate_analysis"
    }
  ],
  "7": [ // Kai Thompson - high balance
    {
      id: "CONS007",
      title: "Past Due Balance",
      summary: "Account balance exceeds typical threshold. Payment arrangement may be appropriate.",
      severity: "error",
      supportingFacts: [
        { fact: "Outstanding balance: $4,123.78", linkTab: "payments" },
        { fact: "No recent payment arrangement on file", linkTab: "interactions" }
      ],
      recommendedAction: "Discuss payment options or create arrangement.",
      defaultCaseType: "collections"
    }
  ],
  "8": [ // Elena Vasilev - estimated reading on payment plan
    {
      id: "CONS008",
      title: "Estimated Billing",
      summary: "Last reading was estimated. Accurate billing is important for customers on payment plans.",
      severity: "warning",
      supportingFacts: [
        { fact: "Reading type: Estimated", linkTab: "meters" },
        { fact: "Customer on active payment plan", linkTab: "payments" }
      ],
      recommendedAction: "Schedule actual meter read.",
      defaultCaseType: "meter_access"
    }
  ],
  "11": [ // Giant Food - outage
    {
      id: "CONS011",
      title: "Outage at Chestnut Street Location",
      summary: "30-minute service interruption at Chestnut Street location with $50K operational loss.",
      severity: "error",
      supportingFacts: [
        { fact: "Outage duration: 30 minutes at Chestnut Street", linkTab: "meters" },
        { fact: "Operational loss estimated at $50K", linkTab: "bills" },
        { fact: "Emergency backup generation deployed", linkTab: "interactions" }
      ],
      recommendedAction: "Review outage report and discuss reliability improvements.",
      defaultCaseType: "outage_investigation"
    }
  ],
  "12": [ // Keystone Manufacturing Group - reliability concern
    {
      id: "CONS012",
      title: "2nd Outage This Quarter - Customer Escalation Expected",
      summary: "2nd unplanned outage in 90 days affecting manufacturing operations. Customer expressed concern in last review.",
      severity: "error",
      supportingFacts: [
        { fact: "2nd outage event in past 90 days", linkTab: "meters" },
        { fact: "Previous outage Oct 15 lasted 45 minutes", linkTab: "interactions" },
        { fact: "Production line equipment affected both times", linkTab: "bills" }
      ],
      recommendedAction: "Prepare reliability improvement plan and schedule proactive account review.",
      defaultCaseType: "reliability_review"
    }
  ]
};

// Simplified program eligibility with professional summaries
export const simplifiedProgramEligibility: Record<string, SimplifiedProgramEligibility[]> = {
  "1": [ // Javier Ortiz
    {
      programId: "PROG001",
      programName: "Heat Pump Rebate",
      estimatedSavings: 850,
      likelihood: "high",
      summary: "Usage patterns indicate electric resistance heating, which has significantly higher operating costs than heat pump alternatives.",
      supportingFacts: [
        { fact: "Winter bills 3.2× summer average", linkTab: "bills" },
        { fact: "Resistance heat signature detected", linkTab: "meters" }
      ]
    }
  ],
  "2": [ // Aisha Patel
    {
      programId: "PROG006",
      programName: "A/C Tune-Up",
      estimatedSavings: 280,
      likelihood: "high",
      summary: "Cooling system shows signs of inefficiency with frequent cycling patterns.",
      supportingFacts: [
        { fact: "Short run times with frequent starts", linkTab: "meters" },
        { fact: "Summer peak 45% above similar businesses", linkTab: "bills" }
      ]
    }
  ],
  "3": [ // Nolan Reeves
    {
      programId: "PROG003",
      programName: "Smart Thermostat",
      estimatedSavings: 180,
      likelihood: "high",
      summary: "No temperature setback detected — a programmable thermostat could reduce energy use.",
      supportingFacts: [
        { fact: "HVAC runs at constant level 24/7", linkTab: "meters" }
      ]
    }
  ],
  "5": [ // Lucas Mendel
    {
      programId: "PROG001",
      programName: "Heat Pump Rebate",
      estimatedSavings: 720,
      likelihood: "high",
      summary: "Strong indicators of electric resistance heating. Customer mentioned older equipment.",
      supportingFacts: [
        { fact: "Winter bills 2.8× summer bills", linkTab: "bills" },
        { fact: "Customer mentioned 'old furnace'", linkTab: "interactions" }
      ]
    }
  ],
  "6": [ // Fatima Al-Rashid
    {
      programId: "PROG005",
      programName: "EV Time-of-Use Rate",
      estimatedSavings: 320,
      likelihood: "high",
      summary: "EV charging pattern detected. Shifting charging to off-peak hours would reduce costs.",
      supportingFacts: [
        { fact: "6-8kW load detected 6pm-10pm daily", linkTab: "meters" },
        { fact: "Overnight baseline up 35%", linkTab: "meters" }
      ]
    }
  ],
  "8": [ // Elena Vasilev
    {
      programId: "PROG003",
      programName: "Smart Thermostat",
      estimatedSavings: 165,
      likelihood: "high",
      summary: "Constant temperature maintained — programmable setback could reduce costs.",
      supportingFacts: [
        { fact: "No setback pattern detected", linkTab: "meters" },
        { fact: "Previously expressed interest", linkTab: "interactions" }
      ]
    }
  ]
};

// Helper functions
export const getConsolidatedIssues = (customerId: string): ConsolidatedIssue[] => {
  return consolidatedCustomerIssues[customerId] || [];
};

export const getSimplifiedEligibility = (customerId: string): SimplifiedProgramEligibility[] => {
  return simplifiedProgramEligibility[customerId] || [];
};
