import { Program } from "@/data/programsData";
import { Card } from "@/components/ui/card";
import { TrendingUp, Users, Target } from "lucide-react";

interface ProgramCardProps {
  program: Program;
  onClick: () => void;
}

export const ProgramCard = ({ program, onClick }: ProgramCardProps) => {
  return (
    <Card 
      className="p-4 cursor-pointer hover:shadow-md transition-all hover:border-primary/50 bg-card"
      onClick={onClick}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-sm text-foreground leading-tight">{program.name}</h3>
          <div className="flex items-center gap-1 text-xs">
            <Target className="h-3 w-3 text-muted-foreground" />
            <span className="font-medium text-primary">{program.percentToGoal}%</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-muted-foreground">Enrolled</p>
            <p className="text-lg font-semibold text-foreground">{program.currentEnrollment.toLocaleString()}</p>
            <p className="text-xs text-emerald-600">+{program.enrolledChange} this month</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Eligible</p>
            <p className="text-lg font-semibold text-foreground">{program.eligibleCustomers.toLocaleString()}</p>
            <p className="text-xs text-blue-600">+{program.eligibleChange} new</p>
          </div>
        </div>
        
        <div className="pt-2 border-t border-border">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Progress to goal</span>
            <span className="text-muted-foreground">{program.currentEnrollment.toLocaleString()} / {program.targetEnrollment.toLocaleString()}</span>
          </div>
          <div className="mt-1 h-1.5 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${program.percentToGoal}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
