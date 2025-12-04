import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { IssueEscalationDialog } from "./IssueEscalationDialog";
import { useState } from "react";

interface KPIDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  kpiLabel: string;
}

// Generate mock data for different KPIs
const generateChartData = (kpiLabel: string) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  switch (kpiLabel) {
    case "Bill Accuracy Score":
      // Generate realistic trend showing decline in recent months
      return months.map((month, i) => {
        let accuracy: number;
        if (i < 6) {
          accuracy = 98.2 + Math.random() * 0.3; // Historical good performance
        } else if (i < 9) {
          accuracy = 98.0 + Math.random() * 0.2; // Starting to slip
        } else {
          accuracy = 97.7 + Math.random() * 0.3; // Recent decline below benchmark
        }
        return {
          month,
          accuracy: Math.round(accuracy * 10) / 10,
          benchmark: 98.0,
          exceptions: i >= 9 ? Math.floor(Math.random() * 5) + 6 : Math.floor(Math.random() * 3) + 1,
        };
      });
    
    case "Estimated vs Actual Reads":
      return months.map((month, i) => ({
        month,
        estimated: 5 + Math.random() * 5,
        target: 5,
        metersDown: Math.floor(Math.random() * 60) + 20
      }));
    
    case "High-Bill Risk Alerts":
      return months.map((month, i) => ({
        month,
        alerts: Math.floor(Math.random() * 80) + 80,
        resolved: Math.floor(Math.random() * 70) + 70,
        avgVariance: 25 + Math.random() * 20
      }));
    
    case "Rate Alignment Health":
      return months.map((month, i) => ({
        month,
        misaligned: Math.floor(Math.random() * 30) + 30,
        corrected: Math.floor(Math.random() * 25) + 20,
        tariffUpdates: Math.floor(Math.random() * 5) + 1
      }));
    
    case "Payments & Collections":
      return months.map((month, i) => ({
        month,
        collected: 1.8 + Math.random() * 0.6,
        arrears: 0.2 + Math.random() * 0.15,
        arrearsRate: 10 + Math.random() * 5
      }));
    
    case "Solar & EV Billing":
      return months.map((month, i) => ({
        month,
        issues: Math.floor(Math.random() * 15) + 15,
        resolved: Math.floor(Math.random() * 12) + 10,
        exportCredits: Math.floor(Math.random() * 8) + 5
      }));
    
    case "Total Portfolio Revenue":
      const baseRevenue = 850000;
      return months.map((month, i) => ({
        month,
        currentYear: Math.round(baseRevenue * (0.9 + Math.random() * 0.2 + i * 0.01)),
        previousYear: Math.round(baseRevenue * (0.85 + Math.random() * 0.15)),
        forecast: i >= 10 ? Math.round(baseRevenue * (1.05 + Math.random() * 0.1)) : null
      }));
    
    case "Total Usage":
      const baseUsage = 2800000;
      return months.map((month, i) => {
        const seasonalFactor = i >= 5 && i <= 8 ? 1.3 : (i >= 11 || i <= 1) ? 1.2 : 1.0;
        const totalUsage = Math.round(baseUsage * seasonalFactor * (0.95 + Math.random() * 0.1));
        return {
          month,
          peakUsage: Math.round(totalUsage * 0.35),
          offPeakUsage: Math.round(totalUsage * 0.45),
          shoulderUsage: Math.round(totalUsage * 0.20),
          total: totalUsage
        };
      });
    
    case "Peak Demand":
      const baseDemand = 4.2;
      const contractedCapacity = 5.0;
      return months.map((month, i) => {
        const seasonalFactor = i >= 5 && i <= 8 ? 1.15 : 1.0;
        const peakDemand = Math.round((baseDemand * seasonalFactor * (0.9 + Math.random() * 0.2)) * 100) / 100;
        return {
          month,
          peakDemand,
          contractedCapacity,
          demandCharge: Math.round(peakDemand * 12500),
          exceeded: peakDemand > contractedCapacity
        };
      });
    
    default:
      return [];
  }
};

const chartConfig = {
  primary: {
    color: "hsl(var(--chart-1))",
  },
  secondary: {
    color: "hsl(var(--chart-2))",
  },
  tertiary: {
    color: "hsl(var(--chart-3))",
  },
};

export const KPIDetailDialog = ({ open, onOpenChange, kpiLabel }: KPIDetailDialogProps) => {
  const data = generateChartData(kpiLabel);
  const [selectedIssue, setSelectedIssue] = useState<{ type: string; count: number; impact: string } | null>(null);

  const renderChart = () => {
    switch (kpiLabel) {
      case "Bill Accuracy Score":
        return (
          <div className="space-y-6">
            <ChartContainer config={chartConfig} className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="accuracyGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="hsl(var(--destructive))" stopOpacity={0.3} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" domain={[96, 99]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  {/* Red zone below benchmark */}
                  <Area 
                    type="monotone" 
                    dataKey={() => 98} 
                    stroke="none" 
                    fill="hsl(var(--destructive))" 
                    fillOpacity={0.1} 
                    name="Below Benchmark"
                  />
                  {/* Benchmark line */}
                  <Area 
                    type="monotone" 
                    dataKey="benchmark" 
                    stroke="hsl(var(--destructive))" 
                    fill="none"
                    strokeWidth={2}
                    strokeDasharray="5 5" 
                    name="98% Benchmark"
                  />
                  {/* Actual accuracy */}
                  <Area 
                    type="monotone" 
                    dataKey="accuracy" 
                    stroke="hsl(var(--chart-1))" 
                    fill="url(#accuracyGradient)"
                    strokeWidth={3}
                    name="Accuracy %" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>

            {/* Exception Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div 
                className="p-4 rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all cursor-pointer"
                onClick={() => setSelectedIssue({ type: "Estimated Over-read", count: 5, impact: "High" })}
              >
                <div className="text-sm text-muted-foreground mb-1">Primary Issue</div>
                <div className="text-lg font-semibold text-foreground">Estimated Reads</div>
                <div className="text-xs text-muted-foreground mt-1">5 of 8 exceptions (62.5%)</div>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="text-sm text-muted-foreground mb-1">Root Cause</div>
                <div className="text-lg font-semibold text-foreground">Meter Communication</div>
                <div className="text-xs text-muted-foreground mt-1">Smart meter failures</div>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="text-sm text-muted-foreground mb-1">Action Required</div>
                <div className="text-lg font-semibold text-foreground">Field Verification</div>
                <div className="text-xs text-muted-foreground mt-1">42 meters need checking</div>
              </div>
            </div>

            {/* Recent Exceptions Detail */}
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-muted px-4 py-2 border-b border-border">
                <h4 className="text-sm font-semibold text-foreground">Recent Exceptions (Last 7 Days)</h4>
              </div>
              <div className="divide-y divide-border">
                {[
                  { type: "Estimated Over-read", count: 3, impact: "High" },
                  { type: "Stuck Meter", count: 2, impact: "Medium" },
                  { type: "Mismatched Meter", count: 2, impact: "High" },
                  { type: "Smart Meter Offline", count: 1, impact: "Medium" },
                ].map((item, i) => (
                  <div 
                    key={i} 
                    className="px-4 py-3 flex items-center justify-between hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => setSelectedIssue(item)}
                  >
                    <div>
                      <div className="text-sm font-medium text-foreground">{item.type}</div>
                      <div className="text-xs text-muted-foreground">{item.count} occurrences</div>
                    </div>
                    <div className={`text-xs font-medium px-2 py-1 rounded ${
                      item.impact === "High" 
                        ? "bg-destructive/10 text-destructive" 
                        : "bg-status-warning-bg text-status-warning"
                    }`}>
                      {item.impact} Impact
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "Estimated vs Actual Reads":
        return (
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis yAxisId="left" className="text-xs" />
                <YAxis yAxisId="right" orientation="right" className="text-xs" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="estimated" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Estimated %" />
                <Line yAxisId="right" type="monotone" dataKey="metersDown" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Meters Not Reporting" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        );

      case "High-Bill Risk Alerts":
        return (
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="alerts" fill="hsl(var(--chart-1))" name="Total Alerts" />
                <Bar dataKey="resolved" fill="hsl(var(--chart-2))" name="Resolved" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        );

      case "Rate Alignment Health":
        return (
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="misaligned" fill="hsl(var(--chart-2))" name="Misaligned Accounts" />
                <Bar dataKey="corrected" fill="hsl(var(--chart-1))" name="Corrected" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        );

      case "Payments & Collections":
        return (
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Area type="monotone" dataKey="collected" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.3} name="Collected ($M)" />
                <Area type="monotone" dataKey="arrears" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" fillOpacity={0.3} name="Arrears ($M)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        );

      case "Solar & EV Billing":
        return (
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line type="monotone" dataKey="issues" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Issues Detected" />
                <Line type="monotone" dataKey="resolved" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Resolved" />
                <Line type="monotone" dataKey="exportCredits" stroke="hsl(var(--chart-3))" strokeWidth={2} name="Missing Export Credits" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        );

      case "Total Portfolio Revenue":
        const totalRevenue = data.reduce((sum: number, d: any) => sum + (d.currentYear || 0), 0);
        const prevYearRevenue = data.reduce((sum: number, d: any) => sum + (d.previousYear || 0), 0);
        const revenueGrowth = ((totalRevenue - prevYearRevenue) / prevYearRevenue * 100).toFixed(1);
        return (
          <div className="space-y-6">
            <ChartContainer config={chartConfig} className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="currentYear" 
                    stroke="hsl(var(--chart-1))" 
                    fill="url(#revenueGradient)"
                    strokeWidth={2}
                    name="Current Year" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="previousYear" 
                    stroke="hsl(var(--chart-2))" 
                    fill="none"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Previous Year" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="text-sm text-muted-foreground mb-1">YTD Revenue</div>
                <div className="text-xl font-semibold text-foreground">${(totalRevenue / 1000000).toFixed(2)}M</div>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="text-sm text-muted-foreground mb-1">YoY Growth</div>
                <div className={`text-xl font-semibold ${Number(revenueGrowth) >= 0 ? 'text-emerald-600' : 'text-destructive'}`}>
                  {Number(revenueGrowth) >= 0 ? '+' : ''}{revenueGrowth}%
                </div>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="text-sm text-muted-foreground mb-1">Avg Monthly</div>
                <div className="text-xl font-semibold text-foreground">${(totalRevenue / 12 / 1000).toFixed(0)}K</div>
              </div>
            </div>
          </div>
        );

      case "Total Usage":
        const totalUsageSum = data.reduce((sum: number, d: any) => sum + (d.total || 0), 0);
        const peakUsageSum = data.reduce((sum: number, d: any) => sum + (d.peakUsage || 0), 0);
        const peakRatio = ((peakUsageSum / totalUsageSum) * 100).toFixed(1);
        return (
          <div className="space-y-6">
            <ChartContainer config={chartConfig} className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value: number) => [`${(value / 1000).toFixed(0)}K kWh`, '']}
                  />
                  <Legend />
                  <Bar dataKey="peakUsage" stackId="usage" fill="hsl(var(--chart-1))" name="Peak Hours" />
                  <Bar dataKey="shoulderUsage" stackId="usage" fill="hsl(var(--chart-2))" name="Shoulder Hours" />
                  <Bar dataKey="offPeakUsage" stackId="usage" fill="hsl(var(--chart-3))" name="Off-Peak Hours" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="text-sm text-muted-foreground mb-1">Total Usage (YTD)</div>
                <div className="text-xl font-semibold text-foreground">{(totalUsageSum / 1000000).toFixed(1)}M kWh</div>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="text-sm text-muted-foreground mb-1">Peak Usage Ratio</div>
                <div className="text-xl font-semibold text-foreground">{peakRatio}%</div>
                <div className="text-xs text-muted-foreground">of total consumption</div>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="text-sm text-muted-foreground mb-1">Avg Daily</div>
                <div className="text-xl font-semibold text-foreground">{((totalUsageSum / 365) / 1000).toFixed(0)}K kWh</div>
              </div>
            </div>
          </div>
        );

      case "Peak Demand":
        const maxPeak = Math.max(...data.map((d: any) => d.peakDemand || 0));
        const avgPeak = (data.reduce((sum: number, d: any) => sum + (d.peakDemand || 0), 0) / data.length).toFixed(2);
        const exceedances = data.filter((d: any) => d.exceeded).length;
        return (
          <div className="space-y-6">
            <ChartContainer config={chartConfig} className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="demandGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" domain={[0, 6]} tickFormatter={(value) => `${value} MW`} />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value: number, name: string) => [
                      name === 'Demand Charge' ? `$${value.toLocaleString()}` : `${value} MW`, 
                      ''
                    ]}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="contractedCapacity" 
                    stroke="hsl(var(--destructive))" 
                    fill="none"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Contracted Capacity" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="peakDemand" 
                    stroke="hsl(var(--chart-1))" 
                    fill="url(#demandGradient)"
                    strokeWidth={2}
                    name="Peak Demand" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="text-sm text-muted-foreground mb-1">Max Peak Demand</div>
                <div className="text-xl font-semibold text-foreground">{maxPeak} MW</div>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="text-sm text-muted-foreground mb-1">Avg Peak Demand</div>
                <div className="text-xl font-semibold text-foreground">{avgPeak} MW</div>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="text-sm text-muted-foreground mb-1">Capacity Exceedances</div>
                <div className={`text-xl font-semibold ${exceedances > 0 ? 'text-destructive' : 'text-emerald-600'}`}>
                  {exceedances} times
                </div>
                <div className="text-xs text-muted-foreground">this year</div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{kpiLabel} - Performance Trend</DialogTitle>
            <DialogDescription>
              Click on any issue to escalate it to the relevant team
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            {renderChart()}
          </div>
        </DialogContent>
      </Dialog>

      <IssueEscalationDialog
        open={selectedIssue !== null}
        onOpenChange={(open) => !open && setSelectedIssue(null)}
        issueType={selectedIssue?.type || ""}
        count={selectedIssue?.count || 0}
        impact={selectedIssue?.impact || ""}
      />
    </>
  );
};
