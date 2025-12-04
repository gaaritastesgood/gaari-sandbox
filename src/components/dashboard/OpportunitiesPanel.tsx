import { Sparkles, ChevronRight, TrendingUp, Zap, Sun, Leaf, DollarSign, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { OpportunityItem, opportunityTypeConfig } from "@/data/kamDashboardData";

interface OpportunitiesPanelProps {
  items: OpportunityItem[];
  onItemClick: (item: OpportunityItem) => void;
}

const getOpportunityIcon = (type: OpportunityItem["opportunityType"]) => {
  switch (type) {
    case "electrification":
      return <Zap className="h-4 w-4" />;
    case "solar":
      return <Sun className="h-4 w-4" />;
    case "efficiency":
      return <Leaf className="h-4 w-4" />;
    case "demand-response":
      return <TrendingUp className="h-4 w-4" />;
    case "tariff":
      return <DollarSign className="h-4 w-4" />;
    case "expansion":
      return <Building2 className="h-4 w-4" />;
    default:
      return <Sparkles className="h-4 w-4" />;
  }
};

const OpportunityRow = ({ 
  item, 
  onClick
}: { 
  item: OpportunityItem; 
  onClick: () => void;
}) => {
  const typeConfig = opportunityTypeConfig[item.opportunityType];

  return (
    <Card 
      className="bg-card border-border hover:shadow-md transition-all cursor-pointer hover:border-primary/50 group"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left side - Account info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-foreground text-base truncate">
                {item.customerName}
              </h4>
              {item.status === "new" && (
                <Badge variant="outline" className="bg-status-success-bg text-status-success text-xs font-medium flex-shrink-0">
                  New
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {item.accountId}
            </p>
          </div>

          {/* Center - Opportunity details (THE KEY INFO) */}
          <div className="flex-[2] px-4 border-l border-r border-border">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className={`${typeConfig.bgColor} ${typeConfig.color} text-xs font-medium gap-1`}>
                {getOpportunityIcon(item.opportunityType)}
                {typeConfig.label}
              </Badge>
            </div>
            <p className="text-base font-semibold text-foreground">
              {item.opportunityName}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
              {item.evidence.slice(0, 2).map((point, index) => (
                <span key={index} className="text-sm text-muted-foreground">
                  • {point}
                </span>
              ))}
            </div>
          </div>

          {/* Right side - Value */}
          <div className="text-right flex-shrink-0">
            <span className="text-lg font-bold text-status-success block">{item.estimatedValue}</span>
            {item.estimatedSavings && (
              <span className="text-xs text-muted-foreground">{item.estimatedSavings}</span>
            )}
          </div>

          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
        </div>
      </CardContent>
    </Card>
  );
};

export const OpportunitiesPanel = ({ items, onItemClick }: OpportunitiesPanelProps) => {
  const newCount = items.filter(i => i.status === "new").length;

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-status-success-bg">
              <Sparkles className="h-5 w-5 text-status-success" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">New Opportunities</CardTitle>
              <p className="text-sm text-muted-foreground">
                Proactive engagement opportunities
              </p>
            </div>
          </div>
          {newCount > 0 && (
            <Badge variant="outline" className="bg-status-success-bg text-status-success font-medium">
              {newCount} New
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {items.map((item) => (
              <OpportunityRow 
                key={item.id} 
                item={item} 
                onClick={() => onItemClick(item)}
              />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
