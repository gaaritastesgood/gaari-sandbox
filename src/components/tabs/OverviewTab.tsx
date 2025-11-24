import { Customer, Bill, Interaction } from "@/types/customer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, FileText, Activity, AlertTriangle } from "lucide-react";

interface OverviewTabProps {
  customer: Customer;
  bills: Bill[];
  interactions: Interaction[];
}

export const OverviewTab = ({ customer, bills, interactions }: OverviewTabProps) => {
  const latestBill = bills[0];
  const activeAccount = customer.contractAccounts[0];
  const lastPayment = interactions.find(i => i.reason.includes("Payment"));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 border-border">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-5 w-5 text-primary" />
            <h3 className="font-medium text-foreground">Latest Bill</h3>
          </div>
          {latestBill && (
            <>
              <div className="text-2xl font-bold text-foreground">
                ${latestBill.amount.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {new Date(latestBill.billDate).toLocaleDateString()} • {latestBill.status}
              </div>
              <div className="text-sm text-muted-foreground">
                {latestBill.usage.toLocaleString()} {latestBill.usageUnit}
              </div>
            </>
          )}
        </Card>

        <Card className="p-4 border-border">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-5 w-5 text-primary" />
            <h3 className="font-medium text-foreground">Current Balance</h3>
          </div>
          <div className="text-2xl font-bold text-foreground">
            ${activeAccount.balance.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            Due: {new Date(activeAccount.dueDate).toLocaleDateString()}
          </div>
          {activeAccount.paymentPlan && (
            <Badge variant="outline" className="mt-2 bg-status-info-bg text-status-info">
              Payment Plan Active
            </Badge>
          )}
        </Card>

        <Card className="p-4 border-border">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-5 w-5 text-primary" />
            <h3 className="font-medium text-foreground">Recent Activity</h3>
          </div>
          <div className="text-sm text-foreground">
            Last Interaction: {interactions[0]?.date}
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            {interactions[0]?.reason}
          </div>
          <div className="text-sm text-muted-foreground">
            {interactions[0]?.type} • {interactions[0]?.time}
          </div>
        </Card>
      </div>

      {latestBill?.issues && latestBill.issues.length > 0 && (
        <Card className="p-4 border-border border-l-4 border-l-status-warning">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-status-warning mt-0.5" />
            <div>
              <h3 className="font-medium text-foreground mb-2">Potential Issues Detected</h3>
              {latestBill.issues.map((issue, idx) => (
                <div key={idx} className="mb-2 last:mb-0">
                  <Badge 
                    variant="outline" 
                    className={
                      issue.severity === "error" 
                        ? "bg-status-error-bg text-status-error mr-2" 
                        : "bg-status-warning-bg text-status-warning mr-2"
                    }
                  >
                    {issue.severity}
                  </Badge>
                  <span className="text-sm text-foreground">{issue.description}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      <Card className="p-4 border-border">
        <h3 className="font-medium text-foreground mb-3">Recent Interactions</h3>
        <div className="space-y-3">
          {interactions.slice(0, 3).map((interaction) => (
            <div key={interaction.id} className="flex justify-between items-start border-b border-border pb-3 last:border-b-0 last:pb-0">
              <div>
                <div className="font-medium text-sm text-foreground">{interaction.reason}</div>
                <div className="text-sm text-muted-foreground mt-1">{interaction.description}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {interaction.date} {interaction.time} • {interaction.agent}
                </div>
              </div>
              <Badge variant="outline" className="bg-secondary text-secondary-foreground">
                {interaction.type}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
