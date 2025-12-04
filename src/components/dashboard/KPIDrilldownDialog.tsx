import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight, TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { PortfolioKPI, KPIDrilldownData } from "@/data/kamDashboardData";

interface KPIDrilldownDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  kpi: PortfolioKPI | null;
  drilldownData: KPIDrilldownData | null;
  onCustomerClick: (customerId: string) => void;
}

export const KPIDrilldownDialog = ({ 
  open, 
  onOpenChange, 
  kpi, 
  drilldownData,
  onCustomerClick 
}: KPIDrilldownDialogProps) => {
  if (!kpi || !drilldownData) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "text-status-success bg-status-success-bg";
      case "warning":
        return "text-status-warning bg-status-warning-bg";
      case "error":
        return "text-status-error bg-status-error-bg";
      case "info":
      default:
        return "text-status-info bg-status-info-bg";
    }
  };

  const formatYAxis = (value: number) => {
    if (kpi.drilldownType === "revenue") {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (kpi.drilldownType === "demand") {
      return `${value} MW`;
    }
    return value.toString();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl">{drilldownData.title}</DialogTitle>
              <DialogDescription className="text-sm">
                {drilldownData.description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Summary KPI - hide for opportunities */}
          {kpi.drilldownType !== "opportunities" && (
            <Card className="bg-muted/30 border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{kpi.label}</p>
                    <p className="text-3xl font-bold text-foreground">{kpi.primaryMetric}</p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`text-sm px-3 py-1 gap-1 ${
                      kpi.status === "good" ? "text-status-success bg-status-success-bg" :
                      kpi.status === "warning" ? "text-status-warning bg-status-warning-bg" :
                      kpi.status === "error" ? "text-status-error bg-status-error-bg" :
                      "text-status-info bg-status-info-bg"
                    }`}
                  >
                    {kpi.trend === "up" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    {kpi.trendValue}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Chart - hide for opportunities */}
          {kpi.drilldownType !== "opportunities" && drilldownData.chartData.length > 0 && (
            <Card className="border-border">
              <CardContent className="p-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-4">Trend Analysis</h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    {kpi.drilldownType === "alerts" ? (
                      <BarChart data={drilldownData.chartData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis dataKey="name" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                        <YAxis className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                        />
                        <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    ) : (
                      <LineChart data={drilldownData.chartData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis dataKey="name" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                        <YAxis 
                          className="text-xs" 
                          tick={{ fill: 'hsl(var(--muted-foreground))' }}
                          tickFormatter={formatYAxis}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                          formatter={(value: number) => formatYAxis(value)}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={2}
                          dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
                        />
                      </LineChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Account List - Row format for alerts/opportunities */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-3">
              {kpi.drilldownType === "opportunities" ? "Potential Program & Service Opportunities" : 
               kpi.drilldownType === "alerts" ? "Active Alerts" : "Accounts"}
            </h4>
            <ScrollArea className={(kpi.drilldownType === "opportunities" || kpi.drilldownType === "alerts") ? "h-[400px]" : "h-[200px]"}>
              <div className="space-y-1">
                {drilldownData.items.map((item) => (
                  <div 
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/30 transition-all cursor-pointer group"
                    onClick={() => {
                      onCustomerClick(item.customerId);
                      onOpenChange(false);
                    }}
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <Badge variant="outline" className={`${getStatusColor(item.status)} text-xs font-medium shrink-0`}>
                        {kpi.drilldownType === "alerts" ? item.metric : 
                         kpi.drilldownType === "opportunities" ? "New" : item.metric}
                      </Badge>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground truncate">
                            {kpi.drilldownType === "opportunities" ? item.metric : item.customerName}
                          </span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground truncate">
                            {kpi.drilldownType === "opportunities" ? item.customerName : ""}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{item.detail}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 ml-2" />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
