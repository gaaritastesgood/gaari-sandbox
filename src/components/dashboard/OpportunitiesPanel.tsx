import { Sparkles, ChevronRight, TrendingUp, Zap, Sun, Leaf, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { OpportunityItem, opportunityTypeConfig } from "@/data/kamDashboardData";

interface OpportunitiesPanelProps {
  items: OpportunityItem[];
  onItemClick: (item: OpportunityItem) => void;
  onStartProject: (item: OpportunityItem) => void;
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
    case "load-growth":
      return <TrendingUp className="h-4 w-4" />;
    default:
      return <Sparkles className="h-4 w-4" />;
  }
};

const OpportunityCard = ({ 
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
        <div className="space-y-2">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <Badge variant="outline" className={`${typeConfig.bgColor} ${typeConfig.color} text-xs font-medium gap-1`}>
                  {getOpportunityIcon(item.opportunityType)}
                  {typeConfig.label}
                </Badge>
                {item.status === "new" && (
                  <Badge variant="outline" className="bg-status-success-bg text-status-success text-xs font-medium">
                    New
                  </Badge>
                )}
              </div>
              <h4 className="font-semibold text-foreground text-base">
                {item.customerName}
              </h4>
              <p className="text-sm text-muted-foreground">{item.accountId}</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
          </div>

          {/* Opportunity Name */}
          <div className="bg-status-success-bg/50 rounded-md p-2.5">
            <p className="text-sm font-medium text-foreground">
              {item.opportunityName}
            </p>
          </div>

          {/* Value - simplified */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-status-success">{item.estimatedValue}</span>
            </div>
            {item.estimatedSavings && (
              <div className="text-sm text-muted-foreground">
                Savings: <span className="font-medium text-foreground">{item.estimatedSavings}</span>
              </div>
            )}
          </div>
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
              <CardTitle className="text-lg font-semibold">Opportunities</CardTitle>
              <p className="text-sm text-muted-foreground">
                Revenue potential
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
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-3">
            {items.map((item) => (
              <OpportunityCard 
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