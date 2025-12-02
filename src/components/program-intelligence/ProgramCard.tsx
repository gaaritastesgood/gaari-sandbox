import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Users, DollarSign, ChevronRight } from "lucide-react";
import { Program } from "@/data/programMockData";

interface ProgramCardProps {
  program: Program;
  onViewDetails: (program: Program) => void;
}

const MiniSparkline = ({ data }: { data: number[] }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const height = 24;
  const width = 60;
  
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

const statusColors: Record<Program['status'], string> = {
  'Active': 'bg-success/10 text-success border-success/20',
  'High Potential': 'bg-primary/10 text-primary border-primary/20',
  'Underperforming': 'bg-destructive/10 text-destructive border-destructive/20',
  'New Pilot': 'bg-warning/10 text-warning border-warning/20'
};

export const ProgramCard = ({ program, onViewDetails }: ProgramCardProps) => {
  const isUpward = program.trendData[program.trendData.length - 1] > program.trendData[0];

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer group" onClick={() => onViewDetails(program)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm text-foreground truncate">{program.name}</h3>
            <Badge variant="outline" className={`mt-1 text-[10px] ${statusColors[program.status]}`}>
              {program.status}
            </Badge>
          </div>
          <MiniSparkline data={program.trendData} />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Participation</p>
            <div className="flex items-center gap-1">
              <span className="text-lg font-bold text-foreground">{program.participationRate}%</span>
              {isUpward ? (
                <TrendingUp className="h-3 w-3 text-success" />
              ) : (
                <TrendingDown className="h-3 w-3 text-destructive" />
              )}
            </div>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Opportunity Gap</p>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3 text-muted-foreground" />
              <span className="text-sm font-semibold text-foreground">{program.opportunityGap.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-1">
            <DollarSign className="h-3 w-3 text-success" />
            <span className="text-xs text-muted-foreground">
              ${(program.estimatedSavings / 1000000).toFixed(1)}M potential
            </span>
          </div>
          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
            Details <ChevronRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
