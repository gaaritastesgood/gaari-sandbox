import { Card } from "@/components/ui/card";
import { 
  AlertTriangle, 
  TrendingUp, 
  Calendar, 
  Zap,
  DollarSign,
  Users
} from "lucide-react";
import { portfolioSummary } from "@/data/kamData";

export const PortfolioHealth = () => {
  const metrics = [
    {
      label: "Total Accounts",
      value: portfolioSummary.totalAccounts,
      icon: Users,
      color: "text-primary"
    },
    {
      label: "Annual Revenue",
      value: `$${(portfolioSummary.totalRevenue / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      color: "text-emerald-500"
    },
    {
      label: "Needs Attention",
      value: portfolioSummary.accountsNeedingAttention,
      icon: AlertTriangle,
      color: "text-amber-500"
    },
    {
      label: "Renewals (90 days)",
      value: portfolioSummary.upcomingRenewals,
      icon: Calendar,
      color: "text-blue-500"
    },
    {
      label: "High Opportunity",
      value: portfolioSummary.highOpportunityAccounts,
      icon: TrendingUp,
      color: "text-emerald-500"
    },
    {
      label: "Reliability Issues",
      value: portfolioSummary.reliabilityConcerns,
      icon: Zap,
      color: "text-red-500"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {metrics.map((metric) => (
        <Card key={metric.label} className="p-4 border-border">
          <div className="flex items-center gap-2 mb-2">
            <metric.icon className={`h-4 w-4 ${metric.color}`} />
            <span className="text-xs text-muted-foreground">{metric.label}</span>
          </div>
          <div className="text-2xl font-bold text-foreground">{metric.value}</div>
        </Card>
      ))}
    </div>
  );
};
