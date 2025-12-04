import { useState } from "react";
import { Customer, Bill, Interaction } from "@/types/customer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, FileText, Activity, TrendingUp, Zap, BarChart3, ChevronRight } from "lucide-react";
import { CompactIssuesPanel } from "@/components/customer/CompactIssuesPanel";
import { CompactProgramsPanel } from "@/components/customer/CompactProgramsPanel";
import { IndustrialAlertsPanel } from "@/components/customer/IndustrialAlertsPanel";
import { ActionableOpportunitiesPanel } from "@/components/customer/ActionableOpportunitiesPanel";
import { getConsolidatedIssues, getSimplifiedEligibility } from "@/data/consolidatedCustomerData";
import { opportunityItems, attentionItems } from "@/data/kamDashboardData";
import { KPIDetailDialog } from "@/components/KPIDetailDialog";

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

  // KPI detail dialog state
  const [selectedKPI, setSelectedKPI] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {/* Key Account Metrics - Revenue, Usage, Peak Demand */}
      {isCommercialOrIndustrial && accountMetrics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card 
            className="p-4 border-border bg-gradient-to-br from-primary/5 to-transparent cursor-pointer hover:shadow-md transition-shadow group"
            onClick={() => setSelectedKPI("Total Portfolio Revenue")}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h3 className="font-medium text-foreground">Annual Revenue</h3>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-2xl font-bold text-foreground">{accountMetrics.revenue}</div>
            <div className="text-sm text-status-success mt-1">YTD Revenue</div>
          </Card>

          <Card 
            className="p-4 border-border cursor-pointer hover:shadow-md transition-shadow group"
            onClick={() => setSelectedKPI("Total Usage")}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <h3 className="font-medium text-foreground">Total Usage</h3>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-2xl font-bold text-foreground">{accountMetrics.usage}</div>
            <div className="text-sm text-status-success mt-1">{accountMetrics.usageTrend} YoY</div>
          </Card>

          <Card 
            className="p-4 border-border cursor-pointer hover:shadow-md transition-shadow group"
            onClick={() => setSelectedKPI("Peak Demand")}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-status-warning" />
                <h3 className="font-medium text-foreground">Peak Demand</h3>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-2xl font-bold text-foreground">{accountMetrics.peakDemand}</div>
            <div className="text-sm text-status-warning mt-1">{accountMetrics.demandTrend} YoY</div>
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
          </Card>
        </div>
      )}

      {/* KPI Detail Dialog */}
      <KPIDetailDialog
        open={!!selectedKPI}
        onOpenChange={(open) => !open && setSelectedKPI(null)}
        kpiLabel={selectedKPI || ""}
      />

      {/* Industrial Alerts Section - for C&I customers */}
      {isCommercialOrIndustrial && customerAlerts.length > 0 && (
        <IndustrialAlertsPanel 
          alerts={customerAlerts} 
          customerName={customerName} 
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
      )}

      {/* Condensed Recent Interactions */}
      <Card className="p-4 border-border">
        <h3 className="font-medium text-foreground mb-3">Recent Interactions</h3>
        <div className="space-y-3">
          {interactions.slice(0, 2).map((interaction) => (
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
