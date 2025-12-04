export interface Customer {
  id: string;
  businessPartnerId: string;
  firstName: string;
  lastName: string;
  companyName?: string;
  email: string;
  phone: string;
  segment: "residential" | "commercial" | "industrial";
  status: "active" | "inactive";
  contractAccounts: ContractAccount[];
  premises: Premise[];
}

export interface ContractAccount {
  id: string;
  accountNumber: string;
  status: "active" | "inactive" | "suspended";
  balance: number;
  dueDate: string;
  paymentPlan: boolean;
}

export interface Premise {
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  premiseType: "residential" | "commercial" | "office";
  servicePoints: ServicePoint[];
}

export interface ServicePoint {
  id: string;
  meterNumber: string;
  meterType: string;
  lastReadDate: string;
  lastReading: number;
  estimatedRead: boolean;
}

export interface Bill {
  id: string;
  billDate: string;
  servicePeriodStart: string;
  servicePeriodEnd: string;
  amount: number;
  status: "issued" | "paid" | "overdue" | "reversed" | "adjusted";
  dueDate: string;
  tariff: string;
  usage: number;
  usageUnit: string;
  charges: BillCharge[];
  pdfUrl: string;
  readingType: "actual" | "estimated";
  issues?: BillIssue[];
}

export interface BillCharge {
  category: string;
  description: string;
  amount: number;
  rate?: number;
  quantity?: number;
}

export interface BillIssue {
  type: string;
  severity: "info" | "warning" | "error";
  description: string;
}

export interface Payment {
  id: string;
  date: string;
  amount: number;
  method: string;
  status: "completed" | "pending" | "failed";
  reference: string;
}

export interface Interaction {
  id: string;
  date: string;
  time: string;
  type: "call" | "email" | "chat" | "field_visit" | "portal";
  channel: string;
  reason: string;
  description: string;
  outcome: string;
  agent: string;
  customerDescription?: string;
}

export interface Case {
  id: string;
  createdDate: string;
  type: string;
  subject: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "critical";
  assignedTo: string;
  relatedBillId?: string;
}

export interface Rate {
  id: string;
  name: string;
  code: string;
  effectiveDate: string;
  endDate?: string;
  category: string;
  riders: string[];
}

export interface MeterReading {
  id: string;
  date: string;
  reading: number;
  type: "actual" | "estimated" | "customer_read";
  usage: number;
  anomaly?: boolean;
}

// Customer Issues for Triage Dashboard
export interface CustomerIssue {
  id: string;
  type: string;
  severity: "info" | "warning" | "error";
  title: string;
  description: string;
  evidence: IssueEvidence[];
  status: "open" | "resolved";
  defaultCaseType?: string;
}

export interface IssueEvidence {
  label: string;
  sourceType: "billing" | "meter" | "interaction" | "usage";
  sourceId: string;
  linkTab: string;
}

// Consolidated Issue - groups related symptoms into single root cause
export interface ConsolidatedIssue {
  id: string;
  title: string;
  summary: string;
  severity: "info" | "warning" | "error";
  supportingFacts: SupportingFact[];
  recommendedAction: string;
  defaultCaseType?: string;
}

export interface SupportingFact {
  fact: string;
  linkTab: string;
}

// Program Eligibility for Customer
export interface CustomerProgramEligibility {
  customerId: string;
  programId: string;
  programName: string;
  likelihood: "high" | "medium" | "low";
  estimatedSavings: number;
  sources: EligibilitySource[];
}

export interface EligibilitySource {
  type: "call_transcript" | "load_analysis" | "billing_pattern" | "meter_data" | "prior_participation";
  description: string;
  date: string;
  sourceId: string;
  linkTab: string;
}

// Simplified Program Eligibility for compact display
export interface SimplifiedProgramEligibility {
  programId: string;
  programName: string;
  estimatedSavings: number;
  likelihood: "high" | "medium" | "low";
  summary: string;
  supportingFacts: SupportingFact[];
}
