import { useState } from "react";
import { Bill, ConsolidatedIssue } from "@/types/customer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { FileText, Download, ChevronRight, AlertCircle, AlertTriangle, CheckCircle, Wrench, ExternalLink } from "lucide-react";
import { CaseCreationDialog } from "@/components/CaseCreationDialog";
import { toast } from "@/hooks/use-toast";

interface BillsTabProps {
  bills: Bill[];
  customerSegment?: "residential" | "commercial" | "industrial";
  customerId?: string;
  customerName?: string;
  issues?: ConsolidatedIssue[];
  onNavigateToTab?: (tab: string) => void;
}

export const BillsTab = ({ bills, customerSegment, customerId, customerName, issues = [], onNavigateToTab }: BillsTabProps) => {
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [showCaseDialog, setShowCaseDialog] = useState(false);
  const [selectedCaseType, setSelectedCaseType] = useState<string | undefined>("high_bill");
  const [resolvedIssues, setResolvedIssues] = useState<Set<string>>(new Set());
  const [expandedIssues, setExpandedIssues] = useState<Set<string>>(new Set());

  const openIssues = issues.filter(issue => !resolvedIssues.has(issue.id));

  const handleCreateServiceRequest = (issue: ConsolidatedIssue) => {
    setSelectedCaseType("service_problems");
    setShowCaseDialog(true);
  };

  const handleResolve = (issueId: string) => {
    setResolvedIssues(prev => new Set([...prev, issueId]));
    toast({
      title: "Issue Resolved",
      description: "Issue has been marked as resolved.",
    });
  };

  const toggleExpanded = (issueId: string) => {
    setExpandedIssues(prev => {
      const next = new Set(prev);
      if (next.has(issueId)) {
        next.delete(issueId);
      } else {
        next.add(issueId);
      }
      return next;
    });
  };

  const getSeverityIcon = (severity: ConsolidatedIssue["severity"]) => {
    switch (severity) {
      case "error":
        return <AlertCircle className="h-5 w-5 text-status-error" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-status-warning" />;
      default:
        return <AlertCircle className="h-5 w-5 text-status-info" />;
    }
  };

  const getSeverityBadgeClass = (severity: ConsolidatedIssue["severity"]) => {
    switch (severity) {
      case "error":
        return "bg-status-error-bg text-status-error";
      case "warning":
        return "bg-status-warning-bg text-status-warning";
      default:
        return "bg-status-info-bg text-status-info";
    }
  };

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
    <div className="space-y-4">
      {/* Create Billing Case Button - Always visible */}
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setSelectedCaseType("high_bill");
            setShowCaseDialog(true);
          }}
        >
          <FileText className="h-4 w-4 mr-1.5" />
          Create Billing Case
        </Button>
      </div>

      {/* Issues Alert Panel */}
      {openIssues.length > 0 && (
        <Card className="p-4 border-border">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-status-warning" />
            <h3 className="font-semibold text-base text-foreground">Billing Issues Detected</h3>
            <Badge variant="outline" className="text-sm bg-status-warning-bg text-status-warning">
              {openIssues.length}
            </Badge>
          </div>

          <div className="space-y-3">
            {openIssues.map((issue) => (
              <Collapsible
                key={issue.id}
                open={expandedIssues.has(issue.id)}
                onOpenChange={() => toggleExpanded(issue.id)}
              >
                <div className="rounded-md border border-border p-3 bg-card">
                  <div className="flex items-start gap-3">
                    {getSeverityIcon(issue.severity)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-semibold text-base text-foreground truncate">{issue.title}</h4>
                        <Badge variant="outline" className={`text-sm shrink-0 ${getSeverityBadgeClass(issue.severity)}`}>
                          {issue.severity === "error" ? "Urgent" : issue.severity === "warning" ? "Attention" : "Info"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{issue.summary}</p>
                      
                      <div className="flex items-center justify-between mt-3">
                        <CollapsibleTrigger asChild>
                          <Button variant="outline" size="sm" className="h-8 text-sm bg-muted hover:bg-muted/80 gap-1.5">
                            <ChevronRight className={`h-4 w-4 transition-transform ${expandedIssues.has(issue.id) ? "rotate-90" : ""}`} />
                            View Evidence ({issue.supportingFacts.length})
                          </Button>
                        </CollapsibleTrigger>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="h-8 text-sm px-3"
                            onClick={() => handleCreateServiceRequest(issue)}
                          >
                            <Wrench className="h-4 w-4 mr-1.5" />
                            Create Service Request
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 text-sm px-3 text-status-success hover:text-status-success hover:bg-status-success-bg border-status-success/30"
                            onClick={() => handleResolve(issue.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1.5" />
                            Resolve
                          </Button>
                        </div>
                      </div>

                      <CollapsibleContent>
                        <div className="mt-3 pt-3 border-t border-border space-y-2">
                          {issue.supportingFacts.map((fact, idx) => (
                            <div key={idx} className="flex items-center justify-between text-sm bg-muted/50 rounded px-3 py-2">
                              <span className="text-foreground">• {fact.fact}</span>
                              {onNavigateToTab && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 text-sm text-primary hover:text-primary/80 px-2"
                                  onClick={() => onNavigateToTab(fact.linkTab)}
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                          <p className="text-sm text-muted-foreground italic pt-1">
                            {issue.recommendedAction}
                          </p>
                        </div>
                      </CollapsibleContent>
                    </div>
                  </div>
                </div>
              </Collapsible>
            ))}
          </div>
        </Card>
      )}

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
                <Badge 
                  variant="outline" 
                  className={selectedBill.readingType === "estimated" ? "mt-2 bg-status-warning-bg text-status-warning" : "mt-2 bg-status-success-bg text-status-success"}
                >
                  {selectedBill.readingType === "estimated" ? "Estimated Reading" : "Actual Reading"}
                </Badge>
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
                        )}

                        {fixedCost && (
                          <div className="bg-muted/30 rounded-lg p-3 border border-border">
                            <div className="flex justify-between items-start mb-1">
                              <div className="font-medium text-sm text-foreground">Fixed Cost</div>
                              <div className="font-bold text-foreground">${fixedCost.amount.toLocaleString()}</div>
                            </div>
                            <div className="text-xs text-muted-foreground">{fixedCost.description}</div>
                          </div>
                        )}

                        {demandCost && (customerSegment === "commercial" || customerSegment === "industrial") && (
                          <div className="bg-muted/30 rounded-lg p-3 border border-border">
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

          </Card>
        ) : (
          <Card className="p-8 border-border text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">Select a bill to view details</p>
          </Card>
        )}
        </div>
      </div>

      <CaseCreationDialog
        open={showCaseDialog}
        onOpenChange={setShowCaseDialog}
        customerId={customerId}
        customerName={customerName}
        defaultCaseType={selectedCaseType}
      />
    </div>
  );
};
