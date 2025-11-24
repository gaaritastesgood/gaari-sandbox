import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

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
      return months.map((month, i) => ({
        month,
        accuracy: 95 + Math.random() * 3,
        target: 97,
        exceptions: Math.floor(Math.random() * 10) + 1
      }));
    
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

  const renderChart = () => {
    switch (kpiLabel) {
      case "Bill Accuracy Score":
        return (
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" domain={[93, 100]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Area type="monotone" dataKey="accuracy" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.3} name="Accuracy %" />
                <Area type="monotone" dataKey="target" stroke="hsl(var(--chart-3))" fill="hsl(var(--chart-3))" fillOpacity={0.1} name="Target %" strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
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

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{kpiLabel} - Performance Trend</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {renderChart()}
        </div>
      </DialogContent>
    </Dialog>
  );
};
