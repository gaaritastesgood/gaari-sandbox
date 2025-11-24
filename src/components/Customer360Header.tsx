import { Customer } from "@/types/customer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Mail, Phone, FileText, MessageSquare, DollarSign, AlertTriangle } from "lucide-react";

interface Customer360HeaderProps {
  customer: Customer;
}

export const Customer360Header = ({ customer }: Customer360HeaderProps) => {
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
    <div className="bg-card border border-border rounded p-5 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <h1 className="text-xl font-semibold text-foreground tracking-tight">
              {customer.firstName} {customer.lastName}
            </h1>
            <Badge variant="outline" className={`${getStatusBadge(activeAccount.status)} text-xs font-medium`}>
              {activeAccount.status}
            </Badge>
            <Badge variant="outline" className="bg-secondary text-secondary-foreground text-xs font-medium">
              {customer.segment}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5" />
              BP: {customer.businessPartnerId}
            </span>
            <span className="flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5" />
              Account: {activeAccount.accountNumber}
            </span>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-xl font-semibold text-foreground">
            ${activeAccount.balance.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">
            Due: {new Date(activeAccount.dueDate).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="flex items-center gap-2 text-xs">
          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-foreground">
            {premise?.address}, {premise?.city}, {premise?.state} {premise?.zipCode}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Mail className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-foreground">{customer.email}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Phone className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-foreground">{customer.phone}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {isOverdue && (
          <Badge variant="outline" className="bg-status-error-bg text-status-error border-status-error text-xs font-medium">
            Bill Past Due
          </Badge>
        )}
        {activeAccount.paymentPlan && (
          <Badge variant="outline" className="bg-status-info-bg text-status-info border-status-info text-xs font-medium">
            On Payment Plan
          </Badge>
        )}
        {premise?.premiseType === "office" && (
          <Badge variant="outline" className="bg-secondary text-secondary-foreground text-xs font-medium">
            Commercial Premise
          </Badge>
        )}
      </div>

      <div className="flex gap-2 pt-3 border-t border-border">
        <Button size="sm" variant="outline" className="h-8 text-xs">
          <MessageSquare className="h-3.5 w-3.5 mr-1" />
          Add Note
        </Button>
        <Button size="sm" variant="outline" className="h-8 text-xs">
          <FileText className="h-3.5 w-3.5 mr-1" />
          Email Bill
        </Button>
        <Button size="sm" variant="outline" className="h-8 text-xs">
          <DollarSign className="h-3.5 w-3.5 mr-1" />
          Issue Adjustment
        </Button>
        <Button size="sm" variant="outline" className="h-8 text-xs">
          <AlertTriangle className="h-3.5 w-3.5 mr-1" />
          Create Case
        </Button>
      </div>
    </div>
  );
};
