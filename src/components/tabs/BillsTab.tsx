import { useState } from "react";
import { Bill } from "@/types/customer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Download, ChevronRight, TrendingUp, AlertCircle } from "lucide-react";

interface BillsTabProps {
  bills: Bill[];
}

export const BillsTab = ({ bills }: BillsTabProps) => {
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      paid: "bg-status-success-bg text-status-success",
      issued: "bg-status-info-bg text-status-info",
      overdue: "bg-status-error-bg text-status-error",
      reversed: "bg-muted text-muted-foreground",
      adjusted: "bg-status-warning-bg text-status-warning",
    };
    return variants[status] || "bg-muted";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Bill Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Service Period</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Usage</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Tariff</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {bills.map((bill) => (
                  <tr
                    key={bill.id}
                    className="border-b border-border hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => setSelectedBill(bill)}
                  >
                    <td className="px-4 py-3 text-sm text-foreground">
                      {new Date(bill.billDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {new Date(bill.servicePeriodStart).toLocaleDateString()} - {new Date(bill.servicePeriodEnd).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-foreground">
                      ${bill.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground">
                      {bill.usage.toLocaleString()} {bill.usageUnit}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={getStatusBadge(bill.status)}>
                        {bill.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {bill.tariff.split("(")[0]}
                    </td>
                    <td className="px-4 py-3">
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        {selectedBill ? (
          <Card className="p-4 border-border sticky top-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Bill Details</h3>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-1" />
                PDF
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground">Bill Date</div>
                <div className="font-medium text-foreground">{new Date(selectedBill.billDate).toLocaleDateString()}</div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground">Total Amount</div>
                <div className="text-2xl font-bold text-foreground">${selectedBill.amount.toLocaleString()}</div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-2">Charges Breakdown</div>
                <div className="space-y-2">
                  {selectedBill.charges.map((charge, idx) => (
                    <div key={idx} className="flex justify-between items-start text-sm border-b border-border pb-2 last:border-b-0">
                      <div>
                        <div className="font-medium text-foreground">{charge.description}</div>
                        <div className="text-xs text-muted-foreground">
                          {charge.rate && charge.quantity && (
                            <>Rate: ${charge.rate} × {charge.quantity.toLocaleString()}</>
                          )}
                        </div>
                      </div>
                      <div className="font-medium text-foreground">${charge.amount.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedBill.issues && selectedBill.issues.length > 0 && (
                <div className="bg-status-warning-bg border border-status-warning rounded p-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-status-warning mt-0.5" />
                    <div>
                      <div className="font-medium text-sm text-foreground mb-1">Issues Detected</div>
                      {selectedBill.issues.map((issue, idx) => (
                        <div key={idx} className="text-sm text-foreground">{issue.description}</div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-border">
                <Button className="w-full" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Create Billing Issue Case
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="p-8 border-border text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">Select a bill to view details</p>
          </Card>
        )}
      </div>
    </div>
  );
};
