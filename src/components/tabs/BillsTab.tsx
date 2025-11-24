import { useState } from "react";
import { Bill } from "@/types/customer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Download, ChevronRight, AlertCircle, Zap, DollarSign, Activity } from "lucide-react";
import { CaseCreationDialog } from "@/components/CaseCreationDialog";

interface BillsTabProps {
  bills: Bill[];
  customerSegment?: "residential" | "commercial" | "industrial";
  customerId?: string;
  customerName?: string;
}

export const BillsTab = ({ bills, customerSegment, customerId, customerName }: BillsTabProps) => {
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [showCaseDialog, setShowCaseDialog] = useState(false);

  const getChargesByCategory = (bill: Bill) => {
    const energyCost = bill.charges.find(c => c.category === "Energy");
    const fixedCost = bill.charges.find(c => c.category === "Fixed");
    const demandCost = bill.charges.find(c => c.category === "Demand");
    const otherCharges = bill.charges.filter(c => !["Energy", "Fixed", "Demand"].includes(c.category || ""));
    
    return { energyCost, fixedCost, demandCost, otherCharges };
  };

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
              <div className="bg-muted/50 rounded-lg p-3 border border-border">
                <div className="text-xs text-muted-foreground mb-1">Rate Plan</div>
                <div className="font-semibold text-foreground">{selectedBill.tariff}</div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground">Bill Period</div>
                <div className="font-medium text-foreground">
                  {new Date(selectedBill.servicePeriodStart).toLocaleDateString()} - {new Date(selectedBill.servicePeriodEnd).toLocaleDateString()}
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground">Total Usage</div>
                <div className="text-xl font-bold text-foreground">{selectedBill.usage.toLocaleString()} {selectedBill.usageUnit}</div>
              </div>

              <div className="border-t border-border pt-4">
                <div className="text-sm font-semibold text-foreground mb-3">Cost Breakdown</div>
                <div className="space-y-3">
                  {(() => {
                    const { energyCost, fixedCost, demandCost, otherCharges } = getChargesByCategory(selectedBill);
                    
                    return (
                      <>
                        {energyCost && (
                          <div className="bg-muted/30 rounded-lg p-3 border border-border">
                            <div className="flex items-start gap-2">
                              <Zap className="h-4 w-4 text-primary mt-0.5" />
                              <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                  <div className="font-medium text-sm text-foreground">Energy Cost</div>
                                  <div className="font-bold text-foreground">${energyCost.amount.toLocaleString()}</div>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {energyCost.rate && energyCost.quantity && (
                                    <>${energyCost.rate}/kWh × {energyCost.quantity.toLocaleString()} kWh</>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {fixedCost && (
                          <div className="bg-muted/30 rounded-lg p-3 border border-border">
                            <div className="flex items-start gap-2">
                              <DollarSign className="h-4 w-4 text-primary mt-0.5" />
                              <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                  <div className="font-medium text-sm text-foreground">Fixed Cost</div>
                                  <div className="font-bold text-foreground">${fixedCost.amount.toLocaleString()}</div>
                                </div>
                                <div className="text-xs text-muted-foreground">{fixedCost.description}</div>
                              </div>
                            </div>
                          </div>
                        )}

                        {demandCost && (customerSegment === "commercial" || customerSegment === "industrial") && (
                          <div className="bg-muted/30 rounded-lg p-3 border border-border">
                            <div className="flex items-start gap-2">
                              <Activity className="h-4 w-4 text-primary mt-0.5" />
                              <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                  <div className="font-medium text-sm text-foreground">Demand Cost</div>
                                  <div className="font-bold text-foreground">${demandCost.amount.toLocaleString()}</div>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {demandCost.rate && demandCost.quantity && (
                                    <>${demandCost.rate}/kW × {demandCost.quantity.toLocaleString()} kW</>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {otherCharges.length > 0 && (
                          <div className="space-y-2 mt-2">
                            {otherCharges.map((charge, idx) => (
                              <div key={idx} className="flex justify-between items-center text-sm">
                                <div className="text-muted-foreground">{charge.description}</div>
                                <div className="font-medium text-foreground">${charge.amount.toLocaleString()}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-semibold text-foreground">Total Amount</div>
                  <div className="text-2xl font-bold text-foreground">${selectedBill.amount.toLocaleString()}</div>
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
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => setShowCaseDialog(true)}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Create Billing Issue Case
                </Button>
              </div>
            </div>

            <CaseCreationDialog
              open={showCaseDialog}
              onOpenChange={setShowCaseDialog}
              customerId={customerId}
              customerName={customerName}
              defaultCaseType="high_bill"
            />
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
