import { Payment } from "@/types/customer";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, XCircle } from "lucide-react";

interface PaymentsTabProps {
  payments: Payment[];
  balance: number;
}

export const PaymentsTab = ({ payments, balance }: PaymentsTabProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-status-success" />;
      case "pending":
        return <Clock className="h-4 w-4 text-status-warning" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-status-error" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      completed: "bg-status-success-bg text-status-success",
      pending: "bg-status-warning-bg text-status-warning",
      failed: "bg-status-error-bg text-status-error",
    };
    return variants[status] || "bg-muted";
  };

  return (
    <div className="space-y-4">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Current Balance</h3>
        <div className="text-3xl font-bold text-foreground">${balance.toLocaleString()}</div>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Method</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Reference</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3 text-sm text-foreground">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-foreground">
                    ${payment.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{payment.method}</td>
                  <td className="px-4 py-3 text-sm font-mono text-muted-foreground">{payment.reference}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(payment.status)}
                      <Badge variant="outline" className={getStatusBadge(payment.status)}>
                        {payment.status}
                      </Badge>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
