import { Customer, Bill, Interaction } from "@/types/customer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, FileText, TrendingUp, Zap, BarChart3, ChevronRight } from "lucide-react";
import { CompactIssuesPanel } from "@/components/customer/CompactIssuesPanel";
import { CompactProgramsPanel } from "@/components/customer/CompactProgramsPanel";
import { IndustrialAlertsPanel } from "@/components/customer/IndustrialAlertsPanel";
import { ActionableOpportunitiesPanel } from "@/components/customer/ActionableOpportunitiesPanel";
import { getConsolidatedIssues, getSimplifiedEligibility } from "@/data/consolidatedCustomerData";
import { opportunityItems, attentionItems } from "@/data/kamDashboardData";

interface OverviewTabProps {
  customer: Customer;
  bills: Bill[];
  interactions: Interaction[];
  onNavigateToTab: (tab: string) => void;
}

// Mock account metrics - in production, these would come from the backend
const getAccountMetrics = (customerId: string, segment: string) => {
  const metricsMap: Record<string, { revenue: string; usage: string; usageTrend: string; peakDemand: string; demandTrend: string }> = {
    "11": { revenue: "$2.4M", usage: "245 GWh", usageTrend: "+4.2%", peakDemand: "4.2 MW", demandTrend: "+8%" },
    "12": { revenue: "$11.3M", usage: "892 GWh", usageTrend: "+12.1%", peakDemand: "21.0 MW", demandTrend: "+15%" },
    "13": { revenue: "$1.8M", usage: "156 GWh", usageTrend: "+2.8%", peakDemand: "2.8 MW", demandTrend: "+3%" },
    "2": { revenue: "$8.7K", usage: "245 kWh", usageTrend: "+5.2%", peakDemand: "42 kW", demandTrend: "+12%" },
    "4": { revenue: "$2.8K", usage: "180 kWh", usageTrend: "-2.1%", peakDemand: "28 kW", demandTrend: "+4%" },
    "7": { revenue: "$49.5K", usage: "712 kWh", usageTrend: "+8.4%", peakDemand: "85 kW", demandTrend: "+6%" },
    "10": { revenue: "$21.5K", usage: "456 kWh", usageTrend: "+3.1%", peakDemand: "52 kW", demandTrend: "+2%" },
  };
  
  if (segment === "industrial" || segment === "commercial") {
    return metricsMap[customerId] || { revenue: "$0", usage: "0 kWh", usageTrend: "0%", peakDemand: "0 kW", demandTrend: "0%" };
  }
  return null;
};

export const OverviewTab = ({ 
  customer, 
  bills, 
  interactions, 
  onNavigateToTab 
}: OverviewTabProps) => {
  const latestBill = bills[0];
  const activeAccount = customer.contractAccounts[0];
  const customerName = customer.companyName || `${customer.firstName} ${customer.lastName}`;
  const isCommercialOrIndustrial = customer.segment === "commercial" || customer.segment === "industrial";
  const accountMetrics = getAccountMetrics(customer.id, customer.segment);

  // Get consolidated issues and simplified eligibility
  const consolidatedIssues = getConsolidatedIssues(customer.id);
  const simplifiedEligibility = getSimplifiedEligibility(customer.id);
  
  // Get opportunities and alerts for this customer
  const customerOpportunities = opportunityItems.filter(opp => opp.customerId === customer.id);
  const customerAlerts = attentionItems.filter(alert => alert.customerId === customer.id);

  return (
    <div className="space-y-4">
      {/* Key Account Metrics - Streamlined 3-card layout for C&I */}
      {isCommercialOrIndustrial && accountMetrics && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 border-border bg-gradient-to-br from-primary/5 to-transparent">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="font-medium text-foreground">Annual Revenue</h3>
            </div>
            <div className="text-2xl font-bold text-foreground">{accountMetrics.revenue}</div>
            <div className="text-sm text-status-success mt-1">YTD</div>
          </Card>

          <Card className="p-4 border-border">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <h3 className="font-medium text-foreground">Usage / Peak</h3>
            </div>
            <div className="text-2xl font-bold text-foreground">{accountMetrics.usage}</div>
            <div className="text-sm text-muted-foreground mt-1">Peak: {accountMetrics.peakDemand}</div>
          </Card>

          <Card className="p-4 border-border">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <h3 className="font-medium text-foreground">Balance Due</h3>
            </div>
            <div className="text-2xl font-bold text-foreground">
              ${activeAccount.balance.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Due: {new Date(activeAccount.dueDate).toLocaleDateString()}
            </div>
          </Card>
        </div>
      )}

      {/* Industrial Alerts Section - for C&I customers */}
      {isCommercialOrIndustrial && customerAlerts.length > 0 && (
        <IndustrialAlertsPanel 
          alerts={customerAlerts} 
          customerName={customerName}
          customerEmail={customer.email}
          customerPhone={customer.phone}
        />
      )}

      {/* Actionable Opportunities Section */}
      {customerOpportunities.length > 0 && (
        <ActionableOpportunitiesPanel
          opportunities={customerOpportunities}
          customerName={customerName}
          customerEmail={customer.email}
          customerPhone={customer.phone}
        />
      )}

      {/* Side-by-side Issues and Programs - Issues only for residential */}
      <div className={`grid grid-cols-1 ${!isCommercialOrIndustrial ? 'lg:grid-cols-2' : ''} gap-4`}>
        {!isCommercialOrIndustrial && (
          <CompactIssuesPanel 
            issues={consolidatedIssues} 
            onNavigateToTab={onNavigateToTab}
            customerName={customerName}
          />
        )}
        <CompactProgramsPanel 
          programs={simplifiedEligibility}
          customerName={customerName}
          onNavigateToTab={onNavigateToTab} 
        />
      </div>

      {/* Condensed Key Metrics - only for residential */}
      {!isCommercialOrIndustrial && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  {new Date(latestBill.billDate).toLocaleDateString()} • {latestBill.usage.toLocaleString()} {latestBill.usageUnit}
                </div>
              </>
            )}
          </Card>

          <Card className="p-4 border-border">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <h3 className="font-medium text-foreground">Balance Due</h3>
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
        </div>
      )}

      {/* Recent Interaction - simplified to just 1 */}
      {interactions.length > 0 && (
        <Card className="p-4 border-border">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-muted-foreground">Last Interaction</span>
              <div className="font-medium text-foreground">{interactions[0].reason}</div>
              <div className="text-sm text-muted-foreground">
                {interactions[0].date} • {interactions[0].type} • {interactions[0].agent}
              </div>
            </div>
            <button 
              onClick={() => onNavigateToTab("interactions")}
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              View all <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </Card>
      )}
    </div>
  );
};