import { useState } from "react";
import { Customer, Bill } from "@/types/customer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Mail, Phone, FileText, MessageSquare, DollarSign, AlertTriangle } from "lucide-react";
import { AddNoteDialog } from "./AddNoteDialog";
import { EmailBillDialog } from "./EmailBillDialog";
import { IssueAdjustmentDialog } from "./IssueAdjustmentDialog";
import { CaseCreationDialog } from "./CaseCreationDialog";

interface Customer360HeaderProps {
  customer: Customer;
  bills?: Bill[];
}

export const Customer360Header = ({ customer, bills = [] }: Customer360HeaderProps) => {
  const [showAddNote, setShowAddNote] = useState(false);
  const [showEmailBill, setShowEmailBill] = useState(false);
  const [showIssueAdjustment, setShowIssueAdjustment] = useState(false);
  const [showCreateCase, setShowCreateCase] = useState(false);

  const activeAccount = customer.contractAccounts[0];
  const premise = customer.premises[0];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      active: "bg-status-success-bg text-status-success border-status-success",
      inactive: "bg-muted text-muted-foreground",
      suspended: "bg-status-warning-bg text-status-warning border-status-warning",
    };
    return variants[status] || "bg-muted";
  };

  const isOverdue = activeAccount.balance > 0 && new Date(activeAccount.dueDate) < new Date();

  return (
    <div className="bg-card border border-border rounded px-5 py-3 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="flex items-center gap-2.5">
            <h1 className="text-lg font-semibold text-foreground tracking-tight whitespace-nowrap">
              {customer.companyName || `${customer.firstName} ${customer.lastName}`}
            </h1>
            <Badge variant="outline" className={`${getStatusBadge(activeAccount.status)} text-xs font-medium`}>
              {activeAccount.status}
            </Badge>
            <Badge variant="outline" className="bg-secondary text-secondary-foreground text-xs font-medium">
              {customer.segment}
            </Badge>
            {isOverdue && (
              <Badge variant="outline" className="bg-status-error-bg text-status-error border-status-error text-xs font-medium">
                Past Due
              </Badge>
            )}
            {activeAccount.paymentPlan && (
              <Badge variant="outline" className="bg-status-info-bg text-status-info border-status-info text-xs font-medium">
                Payment Plan
              </Badge>
            )}
          </div>
          
          <div className="hidden lg:flex items-center gap-4 text-xs text-muted-foreground border-l border-border pl-4">
            <span className="flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5" />
              {customer.businessPartnerId}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {premise?.city}, {premise?.state}
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              {customer.email}
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" />
              {customer.phone}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-lg font-semibold text-foreground">
              ${activeAccount.balance.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">
              Due {new Date(activeAccount.dueDate).toLocaleDateString()}
            </div>
          </div>
          
          <div className="flex gap-1.5 border-l border-border pl-4">
            <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => setShowAddNote(true)}>
              <MessageSquare className="h-3.5 w-3.5 mr-1" />
              Note
            </Button>
            <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => setShowEmailBill(true)}>
              <FileText className="h-3.5 w-3.5 mr-1" />
              Email
            </Button>
            <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => setShowIssueAdjustment(true)}>
              <DollarSign className="h-3.5 w-3.5 mr-1" />
              Adjust
            </Button>
            <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => setShowCreateCase(true)}>
              <AlertTriangle className="h-3.5 w-3.5 mr-1" />
              Case
            </Button>
          </div>
        </div>
      </div>

      <AddNoteDialog open={showAddNote} onOpenChange={setShowAddNote} customer={customer} />
      <EmailBillDialog open={showEmailBill} onOpenChange={setShowEmailBill} customer={customer} bills={bills} />
      <IssueAdjustmentDialog open={showIssueAdjustment} onOpenChange={setShowIssueAdjustment} customer={customer} bills={bills} />
      <CaseCreationDialog open={showCreateCase} onOpenChange={setShowCreateCase} customerName={`${customer.firstName} ${customer.lastName}`} />
    </div>
  );
};
