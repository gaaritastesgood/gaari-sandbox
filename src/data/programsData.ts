export interface Program {
  id: string;
  name: string;
  currentEnrollment: number;
  eligibleCustomers: number;
  enrolledChange: number;
  eligibleChange: number;
  percentToGoal: number;
  targetEnrollment: number;
}

export interface OpportunityGroup {
  id: string;
  programId: string;
  name: string;
  eligibilityCount: number;
  topSignals: string[];
  estimatedAnnualSavings: number;
  expectedConversionMin: number;
  expectedConversionMax: number;
  recommendedChannel: "Email" | "SMS" | "Contractor" | "Portal";
  messagingExample: string;
}

export interface CustomerSample {
  id: string;
  name: string;
  eligibilityScore: number;
  primarySignal: string;
  estimatedSavings: number;
  lastOutreach: string | null;
  status: "Not Contacted" | "Contacted" | "Interested" | "Enrolled" | "Declined";
  signals: string[];
  eligiblePrograms: string[];
  outreachHistory: { date: string; channel: string; outcome: string }[];
}

export const mockPrograms: Program[] = [
  {
    id: "heat-pump",
    name: "Heat Pump Rebate",
    currentEnrollment: 2847,
    eligibleCustomers: 12450,
    enrolledChange: 124,
    eligibleChange: 892,
    percentToGoal: 62,
    targetEnrollment: 4500,
  },
  {
    id: "insulation",
    name: "Insulation & Air Sealing",
    currentEnrollment: 1523,
    eligibleCustomers: 8920,
    enrolledChange: 67,
    eligibleChange: 445,
    percentToGoal: 48,
    targetEnrollment: 3200,
  },
  {
    id: "smart-thermostat",
    name: "Smart Thermostat Incentive",
    currentEnrollment: 5612,
    eligibleCustomers: 18340,
    enrolledChange: 234,
    eligibleChange: 1205,
    percentToGoal: 78,
    targetEnrollment: 7200,
  },
  {
    id: "appliance-recycling",
    name: "Appliance Recycling",
    currentEnrollment: 892,
    eligibleCustomers: 4560,
    enrolledChange: 45,
    eligibleChange: 312,
    percentToGoal: 35,
    targetEnrollment: 2500,
  },
  {
    id: "ev-tou",
    name: "EV Time-of-Use Rate",
    currentEnrollment: 1245,
    eligibleCustomers: 3890,
    enrolledChange: 89,
    eligibleChange: 567,
    percentToGoal: 55,
    targetEnrollment: 2250,
  },
  {
    id: "cooling-optimization",
    name: "A/C Tune-Up / Cooling Optimization",
    currentEnrollment: 3421,
    eligibleCustomers: 15670,
    enrolledChange: 156,
    eligibleChange: 1023,
    percentToGoal: 71,
    targetEnrollment: 4800,
  },
];

export const mockOpportunityGroups: OpportunityGroup[] = [
  // Heat Pump Rebate groups
  {
    id: "hp-resistance-heat",
    programId: "heat-pump",
    name: "Resistance Heat Households",
    eligibilityCount: 4210,
    topSignals: ["Resistance heat signature", "High winter peaks", "Elevated baseload Dec-Feb"],
    estimatedAnnualSavings: 1850,
    expectedConversionMin: 18,
    expectedConversionMax: 24,
    recommendedChannel: "Email",
    messagingExample: "Your home's heating pattern suggests you could save up to $1,850/year by switching to a heat pump. As a valued customer, you qualify for our $2,500 rebate—limited time offer.",
  },
  {
    id: "hp-high-winter",
    programId: "heat-pump",
    name: "High Winter Peak Users",
    eligibilityCount: 3890,
    topSignals: ["Winter usage 3x summer baseline", "Peak demand 8-10am", "No heat pump signature"],
    estimatedAnnualSavings: 1420,
    expectedConversionMin: 12,
    expectedConversionMax: 18,
    recommendedChannel: "Contractor",
    messagingExample: "Your winter energy bills are higher than average for your area. A certified contractor can show you how a heat pump upgrade could cut your heating costs significantly.",
  },
  {
    id: "hp-high-bill-callers",
    programId: "heat-pump",
    name: "High Bill Complaint History",
    eligibilityCount: 2150,
    topSignals: ["2+ high bill calls past year", "Winter bill spikes", "Resistance heat pattern"],
    estimatedAnnualSavings: 2100,
    expectedConversionMin: 22,
    expectedConversionMax: 30,
    recommendedChannel: "SMS",
    messagingExample: "We heard you—high bills are frustrating. Good news: you're eligible for our heat pump rebate that could save you $2,100/year. Reply YES to learn more.",
  },
  // Insulation groups
  {
    id: "ins-thermal-decay",
    programId: "insulation",
    name: "Rapid Thermal Decay Homes",
    eligibilityCount: 3120,
    topSignals: ["Rapid thermal decay pattern", "High HVAC cycling frequency", "Older home (pre-1980 proxy)"],
    estimatedAnnualSavings: 980,
    expectedConversionMin: 15,
    expectedConversionMax: 22,
    recommendedChannel: "Contractor",
    messagingExample: "Your home may be losing heat faster than it should. Our insulation program includes a free assessment and up to $1,500 in rebates.",
  },
  {
    id: "ins-hvac-cycling",
    programId: "insulation",
    name: "HVAC Over-Cycling Pattern",
    eligibilityCount: 2890,
    topSignals: ["HVAC cycles 40%+ above normal", "Temperature swing sensitivity", "High shoulder season usage"],
    estimatedAnnualSavings: 720,
    expectedConversionMin: 10,
    expectedConversionMax: 16,
    recommendedChannel: "Email",
    messagingExample: "Is your heating/cooling system working overtime? Air sealing and insulation could reduce strain on your HVAC and lower your bills.",
  },
  // Smart Thermostat groups
  {
    id: "st-no-setback",
    programId: "smart-thermostat",
    name: "No Temperature Setback Detected",
    eligibilityCount: 6540,
    topSignals: ["Flat 24hr temperature pattern", "No weekend/weekday variation", "High baseload"],
    estimatedAnnualSavings: 340,
    expectedConversionMin: 25,
    expectedConversionMax: 35,
    recommendedChannel: "Email",
    messagingExample: "A smart thermostat could save you $340/year by automatically adjusting when you're away. Get a $75 rebate when you enroll today.",
  },
  {
    id: "st-manual-schedule",
    programId: "smart-thermostat",
    name: "Manual Schedule Opportunity",
    eligibilityCount: 5230,
    topSignals: ["Irregular temperature patterns", "High peak usage", "No smart device detected"],
    estimatedAnnualSavings: 280,
    expectedConversionMin: 20,
    expectedConversionMax: 28,
    recommendedChannel: "Portal",
    messagingExample: "Take control of your comfort and savings with a smart thermostat. Enroll through your online portal to claim your rebate.",
  },
  // Appliance Recycling groups
  {
    id: "ar-second-fridge",
    programId: "appliance-recycling",
    name: "Second Refrigerator Detected",
    eligibilityCount: 2340,
    topSignals: ["Overnight baseload > 1.2kW", "Consistent 24hr draw pattern", "Garage/basement load signature"],
    estimatedAnnualSavings: 150,
    expectedConversionMin: 30,
    expectedConversionMax: 40,
    recommendedChannel: "SMS",
    messagingExample: "That extra fridge could be costing you $150/year. We'll pick it up for free AND give you $50. Reply PICKUP to schedule.",
  },
  {
    id: "ar-old-appliance",
    programId: "appliance-recycling",
    name: "High Appliance Baseload",
    eligibilityCount: 1890,
    topSignals: ["Baseload 30%+ above peer avg", "No recent appliance program participation", "Consistent overnight draw"],
    estimatedAnnualSavings: 180,
    expectedConversionMin: 18,
    expectedConversionMax: 25,
    recommendedChannel: "Email",
    messagingExample: "Old appliances may be silently draining your wallet. Recycle them through our program and receive cash back.",
  },
  // EV TOU groups
  {
    id: "ev-charging-detected",
    programId: "ev-tou",
    name: "EV Charging Pattern Detected",
    eligibilityCount: 2450,
    topSignals: ["EV charging signature (6-10pm)", "New high load after 5pm", "Weekend charging spikes"],
    estimatedAnnualSavings: 420,
    expectedConversionMin: 35,
    expectedConversionMax: 45,
    recommendedChannel: "Email",
    messagingExample: "We noticed you're charging an EV. Switch to our TOU rate and save up to $420/year by charging during off-peak hours.",
  },
  {
    id: "ev-peak-charging",
    programId: "ev-tou",
    name: "Peak Hour EV Chargers",
    eligibilityCount: 1120,
    topSignals: ["EV charging during peak (4-9pm)", "High demand charges", "Not on TOU rate"],
    estimatedAnnualSavings: 580,
    expectedConversionMin: 40,
    expectedConversionMax: 50,
    recommendedChannel: "SMS",
    messagingExample: "You're charging during expensive peak hours. A simple rate switch could save you $580/year. Text SWITCH to learn more.",
  },
  // Cooling Optimization groups
  {
    id: "cool-overcycling",
    programId: "cooling-optimization",
    name: "A/C Over-Cycling Pattern",
    eligibilityCount: 5230,
    topSignals: ["Cooling cycles 50%+ above normal", "High summer peaks", "Temperature swing sensitivity"],
    estimatedAnnualSavings: 290,
    expectedConversionMin: 20,
    expectedConversionMax: 28,
    recommendedChannel: "Email",
    messagingExample: "Your A/C may be working harder than it needs to. A free tune-up could improve efficiency and save you nearly $300/year.",
  },
  {
    id: "cool-high-summer",
    programId: "cooling-optimization",
    name: "High Summer Peak Demand",
    eligibilityCount: 6120,
    topSignals: ["Summer peak 2x+ winter", "High afternoon demand", "No recent HVAC service"],
    estimatedAnnualSavings: 350,
    expectedConversionMin: 15,
    expectedConversionMax: 22,
    recommendedChannel: "Contractor",
    messagingExample: "Beat the heat and high bills. Schedule a free A/C assessment with our certified contractors.",
  },
  {
    id: "cool-complaint-history",
    programId: "cooling-optimization",
    name: "Summer Bill Complainers",
    eligibilityCount: 2890,
    topSignals: ["High bill calls Jun-Aug", "Summer usage spikes", "Above-average cooling load"],
    estimatedAnnualSavings: 380,
    expectedConversionMin: 25,
    expectedConversionMax: 32,
    recommendedChannel: "SMS",
    messagingExample: "Tired of summer bill surprises? Our cooling optimization program is free and could cut your costs. Reply COOL to sign up.",
  },
];

export const generateCustomerSamples = (groupId: string): CustomerSample[] => {
  const group = mockOpportunityGroups.find(g => g.id === groupId);
  if (!group) return [];
  
  const firstNames = ["James", "Maria", "Robert", "Linda", "Michael", "Sarah", "David", "Jennifer", "William", "Elizabeth", "Richard", "Patricia", "Joseph", "Barbara", "Thomas", "Susan", "Charles", "Jessica", "Daniel", "Karen"];
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"];
  
  const statuses: CustomerSample["status"][] = ["Not Contacted", "Contacted", "Interested", "Enrolled", "Declined"];
  const channels = ["Email", "SMS", "Phone", "Portal"];
  const outcomes = ["No response", "Opened", "Clicked", "Replied", "Scheduled call", "Requested info"];
  
  return Array.from({ length: 15 }, (_, i) => {
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[(i * 3) % lastNames.length];
    const score = Math.floor(Math.random() * 30) + 70;
    const hasOutreach = Math.random() > 0.4;
    
    return {
      id: `CUST-${String(10000 + i).slice(1)}`,
      name: `${firstName} ${lastName}`,
      eligibilityScore: score,
      primarySignal: group.topSignals[0],
      estimatedSavings: group.estimatedAnnualSavings + Math.floor(Math.random() * 400) - 200,
      lastOutreach: hasOutreach ? `2024-${String(Math.floor(Math.random() * 3) + 10).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}` : null,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      signals: group.topSignals.slice(0, Math.floor(Math.random() * 2) + 2),
      eligiblePrograms: [group.programId, ...mockPrograms.filter(p => p.id !== group.programId && Math.random() > 0.6).map(p => p.name).slice(0, 2)],
      outreachHistory: hasOutreach ? Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, j) => ({
        date: `2024-${String(10 - j).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
        channel: channels[Math.floor(Math.random() * channels.length)],
        outcome: outcomes[Math.floor(Math.random() * outcomes.length)],
      })) : [],
    };
  }).sort((a, b) => b.eligibilityScore - a.eligibilityScore);
};
