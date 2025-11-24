import { TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { KPIDetailDialog } from "./KPIDetailDialog";

interface KPITileProps {
  label: string;
  primaryMetric: string;
  subtext: string;
  trend?: "up" | "down" | "neutral";
  status?: "good" | "warning" | "error" | "info";
  trendValue?: string;
  onClick?: () => void;
}

const KPITile = ({ label, primaryMetric, subtext, trend, status = "info", trendValue, onClick }: KPITileProps) => {
  const getTrendIcon = () => {
    if (trend === "up") return <TrendingUp className="h-3.5 w-3.5" />;
    if (trend === "down") return <TrendingDown className="h-3.5 w-3.5" />;
    return <Minus className="h-3.5 w-3.5" />;
  };

  const getStatusColor = () => {
    switch (status) {
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
    switch (status) {
      case "good":
        return <CheckCircle className="h-4 w-4 text-status-success" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-status-warning" />;
      case "error":
        return <AlertTriangle className="h-4 w-4 text-status-error" />;
      default:
        return null;
    }
  };

  return (
    <Card 
      className="p-3 bg-card border-border hover:shadow-md transition-shadow cursor-pointer hover:border-primary/50"
      onClick={onClick}
    >
      <div className="space-y-1.5">
        <div className="flex items-start justify-between">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {label}
          </span>
          {getStatusIcon()}
        </div>
        
        <div className="flex items-baseline gap-2">
          <div className="text-xl font-semibold text-foreground tracking-tight">
            {primaryMetric}
          </div>
          {trendValue && (
            <Badge 
              variant="outline" 
              className={`${getStatusColor()} text-xs h-5 px-1.5 gap-0.5 font-medium`}
            >
              {getTrendIcon()}
              {trendValue}
            </Badge>
          )}
        </div>

        <div className="text-xs text-muted-foreground">
          {subtext}
        </div>
      </div>
    </Card>
  );
};

export const KPIDashboard = () => {
  const [selectedKPI, setSelectedKPI] = useState<string | null>(null);

  const kpis: KPITileProps[] = [
    {
      label: "Bill Accuracy Score",
      primaryMetric: "97.2%",
      subtext: "3 billing exceptions today",
      status: "good",
      trend: "up",
      trendValue: "+0.3%",
    },
    {
      label: "Estimated vs Actual Reads",
      primaryMetric: "8.1%",
      subtext: "42 meters not reporting",
      status: "warning",
      trend: "up",
      trendValue: "+1.2%",
    },
    {
      label: "High-Bill Risk Alerts",
      primaryMetric: "126",
      subtext: ">30% MoM variance",
      status: "error",
      trend: "up",
      trendValue: "+18",
    },
    {
      label: "Rate Alignment Health",
      primaryMetric: "44",
      subtext: "Tariff drift detected",
      status: "warning",
      trend: "neutral",
      trendValue: "±0",
    },
    {
      label: "Payments & Collections",
      primaryMetric: "$2.1M",
      subtext: "12% customers in arrears",
      status: "error",
      trend: "down",
      trendValue: "-$180K",
    },
    {
      label: "Solar & EV Billing",
      primaryMetric: "19",
      subtext: "Missing export credits/EV rates",
      status: "warning",
      trend: "down",
      trendValue: "-3",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {kpis.map((kpi, index) => (
          <KPITile key={index} {...kpi} onClick={() => setSelectedKPI(kpi.label)} />
        ))}
      </div>
      
      <KPIDetailDialog 
        open={selectedKPI !== null} 
        onOpenChange={(open) => !open && setSelectedKPI(null)}
        kpiLabel={selectedKPI || ""}
      />
    </>
  );
};
