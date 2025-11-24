export interface Customer {
  id: string;
  businessPartnerId: string;
  firstName: string;
  lastName: string;
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
