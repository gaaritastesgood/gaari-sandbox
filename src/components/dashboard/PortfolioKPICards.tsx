import { TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PortfolioKPI } from "@/data/kamDashboardData";

interface PortfolioKPICardsProps {
  kpis: PortfolioKPI[];
  onKPIClick: (kpi: PortfolioKPI) => void;
}

const KPICard = ({ kpi, onClick }: { kpi: PortfolioKPI; onClick: () => void }) => {
  const getTrendIcon = () => {
    if (kpi.trend === "up") return <TrendingUp className="h-3.5 w-3.5" />;
    if (kpi.trend === "down") return <TrendingDown className="h-3.5 w-3.5" />;
    return <Minus className="h-3.5 w-3.5" />;
  };

  const getStatusColor = () => {
    switch (kpi.status) {
      case "good":
        return "text-status-success bg-status-success-bg border-status-success";
      case "warning":
        return "text-status-warning bg-status-warning-bg border-status-warning";
      case "error":
        return "text-status-error bg-status-error-bg border-status-error";
      default:
        return "text-status-info bg-status-info-bg border-status-info";
    }
  };

  const getStatusIcon = () => {
    switch (kpi.status) {
      case "good":
        return <CheckCircle className="h-4 w-4 text-status-success" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-status-warning" />;
      case "error":
        return <AlertTriangle className="h-4 w-4 text-status-error" />;
      default:
        return <Info className="h-4 w-4 text-status-info" />;
    }
  };

  return (
    <Card 
      className="p-4 bg-card border-border hover:shadow-lg transition-all cursor-pointer hover:border-primary/50 hover:-translate-y-0.5"
      onClick={onClick}
    >
      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {kpi.label}
          </span>
          {getStatusIcon()}
        </div>
        
        <div className="flex items-baseline gap-2">
          <div className="text-2xl font-bold text-foreground tracking-tight">
            {kpi.primaryMetric}
          </div>
          {kpi.trendValue && (
            <Badge 
              variant="outline" 
              className={`${getStatusColor()} text-xs h-5 px-1.5 gap-0.5 font-medium`}
            >
              {getTrendIcon()}
              {kpi.trendValue}
            </Badge>
          )}
        </div>

        <div className="text-sm text-muted-foreground">
          {kpi.subtext}
        </div>
      </div>
    </Card>
  );
};

export const PortfolioKPICards = ({ kpis, onKPIClick }: PortfolioKPICardsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {kpis.map((kpi) => (
        <KPICard key={kpi.id} kpi={kpi} onClick={() => onKPIClick(kpi)} />
      ))}
    </div>
  );
};
