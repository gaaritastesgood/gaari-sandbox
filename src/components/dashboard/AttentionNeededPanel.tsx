import { AlertTriangle, ChevronRight, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AttentionItem, categoryConfig, severityConfig } from "@/data/kamDashboardData";

interface AttentionNeededPanelProps {
  items: AttentionItem[];
  onItemClick: (item: AttentionItem) => void;
}

const AttentionCard = ({ item, onClick }: { item: AttentionItem; onClick: () => void }) => {
  const category = categoryConfig[item.category];
  const severity = severityConfig[item.severity];

  return (
    <Card 
      className="bg-card border-border hover:shadow-md transition-all cursor-pointer hover:border-primary/50 group"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="space-y-2">
          {/* Header with badges and customer */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <Badge variant="outline" className={`${severity.bgColor} ${severity.color} text-xs font-semibold`}>
                  {severity.label}
                </Badge>
                <Badge variant="outline" className={`${category.bgColor} ${category.color} text-xs font-medium`}>
                  {category.label}
                </Badge>
              </div>
              <h4 className="font-semibold text-foreground text-base">
                {item.customerName}
              </h4>
              <p className="text-sm text-muted-foreground">{item.accountId}</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
          </div>

          {/* Reason - the key info */}
          <div className="bg-muted/50 rounded-md p-2.5">
            <p className="text-sm font-medium text-foreground">
              {item.reason}
            </p>
          </div>

          {/* Quick Facts - only 2 most important */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex gap-4">
              {item.quickFacts.slice(0, 2).map((fact, index) => (
                <div key={index}>
                  <span className="text-muted-foreground">{fact.label}:</span>{" "}
                  <span className="font-medium text-foreground">{fact.value}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {item.detectedAt}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const AttentionNeededPanel = ({ items, onItemClick }: AttentionNeededPanelProps) => {
  const criticalCount = items.filter(i => i.severity === "critical").length;
  const highCount = items.filter(i => i.severity === "high").length;

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-status-error-bg">
              <AlertTriangle className="h-5 w-5 text-status-error" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">Attention Needed</CardTitle>
              <p className="text-sm text-muted-foreground">
                Accounts requiring action
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {criticalCount > 0 && (
              <Badge variant="outline" className="bg-status-error-bg text-status-error font-medium">
                {criticalCount} Critical
              </Badge>
            )}
            {highCount > 0 && (
              <Badge variant="outline" className="bg-status-warning-bg text-status-warning font-medium">
                {highCount} High
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-3">
            {items.map((item) => (
              <AttentionCard key={item.id} item={item} onClick={() => onItemClick(item)} />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};