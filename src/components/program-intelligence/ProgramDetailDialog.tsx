import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Users, DollarSign, Target, Lightbulb, Sparkles } from "lucide-react";
import { Program, mockSegments, mockActions } from "@/data/programMockData";
import { useToast } from "@/hooks/use-toast";

interface ProgramDetailDialogProps {
  program: Program | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusColors: Record<Program['status'], string> = {
  'Active': 'bg-success/10 text-success border-success/20',
  'High Potential': 'bg-primary/10 text-primary border-primary/20',
  'Underperforming': 'bg-destructive/10 text-destructive border-destructive/20',
  'New Pilot': 'bg-warning/10 text-warning border-warning/20'
};

const Sparkline = ({ data }: { data: number[] }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const height = 40;
  const width = 120;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  const isUpward = data[data.length - 1] > data[0];

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={isUpward ? "hsl(var(--success))" : "hsl(var(--destructive))"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ProgramDetailDialog = ({ program, open, onOpenChange }: ProgramDetailDialogProps) => {
  const { toast } = useToast();

  if (!program) return null;

  const linkedSegments = mockSegments.filter(s => s.linkedPrograms.includes(program.name));
  const linkedActions = mockActions.filter(a => a.programId === program.id);
  const isUpward = program.trendData[program.trendData.length - 1] > program.trendData[0];

  const insights = [
    program.status === 'Underperforming' && "Participation declining - consider refreshing marketing materials",
    program.opportunityGap > 20000 && "Large opportunity gap suggests untapped potential for targeted outreach",
    isUpward && "Positive trend indicates effective program messaging",
    !isUpward && "Declining trend may require intervention or program redesign"
  ].filter(Boolean);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <DialogTitle className="text-xl">{program.name}</DialogTitle>
            <Badge variant="outline" className={statusColors[program.status]}>
              {program.status}
            </Badge>
          </div>
          <DialogDescription>{program.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Key Metrics */}
          <div className="grid grid-cols-4 gap-3">
            <Card>
              <CardContent className="p-3 text-center">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Participation</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <span className="text-xl font-bold">{program.participationRate}%</span>
                  {isUpward ? <TrendingUp className="h-4 w-4 text-success" /> : <TrendingDown className="h-4 w-4 text-destructive" />}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 text-center">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Enrolled</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xl font-bold">{program.enrolledCount.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 text-center">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Gap</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <Target className="h-4 w-4 text-warning" />
                  <span className="text-xl font-bold">{program.opportunityGap.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 text-center">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Savings</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <DollarSign className="h-4 w-4 text-success" />
                  <span className="text-xl font-bold">${(program.estimatedSavings / 1000000).toFixed(1)}M</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Participation Progress & Trend */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Participation vs Eligibility</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{program.enrolledCount.toLocaleString()} enrolled</span>
                <span>{program.eligibleCount.toLocaleString()} eligible</span>
              </div>
              <Progress value={program.participationRate} className="h-2" />
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">8-month trend</span>
                <Sparkline data={program.trendData} />
              </div>
            </CardContent>
          </Card>

          {/* Smart Segments */}
          {linkedSegments.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Target Segments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {linkedSegments.map(segment => (
                  <div key={segment.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                    <div>
                      <p className="text-sm font-medium">{segment.name}</p>
                      <p className="text-xs text-muted-foreground">{segment.customerCount.toLocaleString()} customers</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {segment.opportunityGap.toLocaleString()} not enrolled
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Insights */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-warning" />
                Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {insights.map((insight, idx) => (
                  <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    {insight}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Recommended Actions */}
          {linkedActions.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Recommended Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {linkedActions.map(action => (
                  <div key={action.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{action.title}</p>
                      <p className="text-xs text-muted-foreground">{action.channel} • {action.impactedCustomers.toLocaleString()} customers</p>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => {
                      toast({ title: "Action Initiated", description: `${action.title} has been queued.` });
                    }}>
                      <Sparkles className="h-3 w-3 mr-1" />
                      Execute
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
