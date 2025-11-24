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
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-semibold text-foreground">
              {customer.firstName} {customer.lastName}
            </h1>
            <Badge variant="outline" className={getStatusBadge(activeAccount.status)}>
              {activeAccount.status}
            </Badge>
            <Badge variant="outline" className="bg-secondary text-secondary-foreground">
              {customer.segment}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Building2 className="h-4 w-4" />
              BP: {customer.businessPartnerId}
            </span>
            <span className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              Account: {activeAccount.accountNumber}
            </span>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-foreground">
            ${activeAccount.balance.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">
            Due: {new Date(activeAccount.dueDate).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground">
            {premise?.address}, {premise?.city}, {premise?.state} {premise?.zipCode}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground">{customer.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground">{customer.phone}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {isOverdue && (
          <Badge variant="outline" className="bg-status-error-bg text-status-error border-status-error">
            Bill Past Due
          </Badge>
        )}
        {activeAccount.paymentPlan && (
          <Badge variant="outline" className="bg-status-info-bg text-status-info border-status-info">
            On Payment Plan
          </Badge>
        )}
        {premise?.premiseType === "office" && (
          <Badge variant="outline" className="bg-secondary text-secondary-foreground">
            Commercial Premise
          </Badge>
        )}
      </div>

      <div className="flex gap-2 pt-2 border-t border-border">
        <Button size="sm" variant="outline">
          <MessageSquare className="h-4 w-4 mr-1" />
          Add Note
        </Button>
        <Button size="sm" variant="outline">
          <FileText className="h-4 w-4 mr-1" />
          Email Bill
        </Button>
        <Button size="sm" variant="outline">
          <DollarSign className="h-4 w-4 mr-1" />
          Issue Adjustment
        </Button>
        <Button size="sm" variant="outline">
          <AlertTriangle className="h-4 w-4 mr-1" />
          Create Case
        </Button>
      </div>
    </div>
  );
};
