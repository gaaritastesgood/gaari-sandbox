import { useState } from "react";
import { GlobalSearch } from "@/components/GlobalSearch";
import { PortfolioKPICards } from "./PortfolioKPICards";
import { AttentionNeededPanel } from "./AttentionNeededPanel";
import { OpportunitiesPanel } from "./OpportunitiesPanel";
import { KPIDrilldownDialog } from "./KPIDrilldownDialog";
import { 
  portfolioKPIs, 
  attentionItems, 
  opportunityItems, 
  kpiDrilldownData,
  PortfolioKPI,
  AttentionItem,
  OpportunityItem
} from "@/data/kamDashboardData";
import { Customer } from "@/types/customer";
import { toast } from "sonner";

interface KAMDashboardProps {
  onSelectCustomer: (customer: Customer) => void;
  onNavigateToCustomer: (customerId: string) => void;
}

export const KAMDashboard = ({ onSelectCustomer, onNavigateToCustomer }: KAMDashboardProps) => {
  const [selectedKPI, setSelectedKPI] = useState<PortfolioKPI | null>(null);

  const handleKPIClick = (kpi: PortfolioKPI) => {
    setSelectedKPI(kpi);
  };

  const handleAttentionItemClick = (item: AttentionItem) => {
    // Navigate to customer profile
    onNavigateToCustomer(item.customerId);
    toast.info(`Opening ${item.customerName} profile`, {
      description: item.reason
    });
  };

  const handleOpportunityClick = (item: OpportunityItem) => {
    // Navigate to customer profile
    onNavigateToCustomer(item.customerId);
    toast.info(`Opening ${item.customerName} profile`, {
      description: item.opportunityName
    });
  };

  const handleStartProject = (item: OpportunityItem) => {
    toast.success(`Project initiated for ${item.customerName}`, {
      description: item.opportunityName
    });
  };

  const handleDrilldownCustomerClick = (customerId: string) => {
    onNavigateToCustomer(customerId);
  };

  return (
    <div className="space-y-6">
      {/* Persistent Search Bar */}
      <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
        <GlobalSearch onSelectCustomer={onSelectCustomer} />
      </div>

      {/* Portfolio KPI Cards */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">Portfolio Overview</h2>
        <PortfolioKPICards kpis={portfolioKPIs} onKPIClick={handleKPIClick} />
      </div>

      {/* Main Content - Attention & Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttentionNeededPanel 
          items={attentionItems} 
          onItemClick={handleAttentionItemClick} 
        />
        <OpportunitiesPanel 
          items={opportunityItems} 
          onItemClick={handleOpportunityClick}
          onStartProject={handleStartProject}
        />
      </div>

      {/* KPI Drilldown Dialog */}
      <KPIDrilldownDialog
        open={selectedKPI !== null}
        onOpenChange={(open) => !open && setSelectedKPI(null)}
        kpi={selectedKPI}
        drilldownData={selectedKPI ? kpiDrilldownData[selectedKPI.drilldownType] : null}
        onCustomerClick={handleDrilldownCustomerClick}
      />
    </div>
  );
};
