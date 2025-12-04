import { Sparkles, ChevronRight, TrendingUp, Zap, Sun, Leaf, DollarSign, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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
    case "expansion":
      return <Building2 className="h-4 w-4" />;
    default:
      return <Sparkles className="h-4 w-4" />;
  }
};

const OpportunityCard = ({ 
  item, 
  onClick, 
  onStartProject 
}: { 
  item: OpportunityItem; 
  onClick: () => void;
  onStartProject: () => void;
}) => {
  const typeConfig = opportunityTypeConfig[item.opportunityType];

  return (
    <Card 
      className="bg-card border-border hover:shadow-md transition-all cursor-pointer hover:border-primary/50 group"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
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
              <p className="text-sm text-muted-foreground">
                {item.accountId}
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
          </div>

          {/* Opportunity Name */}
          <div className="bg-status-success-bg/50 rounded-md p-3">
            <p className="text-sm font-medium text-foreground">
              {item.opportunityName}
            </p>
          </div>

          {/* Value */}
          <div className="flex flex-wrap gap-4">
            <div>
              <span className="text-xs text-muted-foreground block">Estimated Value</span>
              <span className="text-lg font-bold text-status-success">{item.estimatedValue}</span>
            </div>
            {item.estimatedSavings && (
              <div>
                <span className="text-xs text-muted-foreground block">Customer Savings</span>
                <span className="text-sm font-medium text-foreground">{item.estimatedSavings}</span>
              </div>
            )}
          </div>

          {/* Confidence */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Confidence:</span>
            <div className="flex items-center gap-1.5">
              <Progress value={item.confidence} className="w-16 h-1.5" />
              <span className="text-xs font-medium text-foreground">{item.confidence}%</span>
            </div>
          </div>

          {/* Evidence Points */}
          <div className="space-y-1">
            <span className="text-xs font-medium text-muted-foreground">Supporting Evidence:</span>
            <ul className="space-y-1">
              {item.evidence.slice(0, 2).map((point, index) => (
                <li key={index} className="text-xs text-muted-foreground flex items-start gap-1.5">
                  <span className="text-status-success mt-0.5">•</span>
                  {point}
                </li>
              ))}
              {item.evidence.length > 2 && (
                <li className="text-xs text-status-success font-medium">
                  +{item.evidence.length - 2} more evidence points
                </li>
              )}
            </ul>
          </div>

          {/* Action Button */}
          <Button 
            size="sm" 
            className="w-full mt-2"
            onClick={(e) => {
              e.stopPropagation();
              onStartProject();
            }}
          >
            <Sparkles className="h-4 w-4 mr-1.5" />
            Start Project
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const OpportunitiesPanel = ({ items, onItemClick, onStartProject }: OpportunitiesPanelProps) => {
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
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-3">
            {items.map((item) => (
              <OpportunityCard 
                key={item.id} 
                item={item} 
                onClick={() => onItemClick(item)}
                onStartProject={() => onStartProject(item)}
              />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
