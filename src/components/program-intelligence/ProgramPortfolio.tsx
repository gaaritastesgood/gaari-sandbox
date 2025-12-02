import { useState } from "react";
import { Program, mockPrograms } from "@/data/programMockData";
import { ProgramCard } from "./ProgramCard";
import { ProgramDetailDialog } from "./ProgramDetailDialog";
import { LayoutGrid, TrendingUp, AlertTriangle, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const ProgramPortfolio = () => {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const activeCount = mockPrograms.filter(p => p.status === 'Active').length;
  const underperformingCount = mockPrograms.filter(p => p.status === 'Underperforming').length;
  const totalOpportunityGap = mockPrograms.reduce((sum, p) => sum + p.opportunityGap, 0);

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LayoutGrid className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Program Portfolio</h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-[10px] gap-1">
            <TrendingUp className="h-3 w-3 text-success" />
            {activeCount} Active
          </Badge>
          {underperformingCount > 0 && (
            <Badge variant="outline" className="text-[10px] gap-1 border-destructive/20 text-destructive">
              <AlertTriangle className="h-3 w-3" />
              {underperformingCount} Needs Attention
            </Badge>
          )}
          <Badge variant="outline" className="text-[10px] gap-1 border-warning/20 text-warning">
            <Sparkles className="h-3 w-3" />
            {totalOpportunityGap.toLocaleString()} Total Gap
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {mockPrograms.map(program => (
          <ProgramCard 
            key={program.id} 
            program={program} 
            onViewDetails={setSelectedProgram}
          />
        ))}
      </div>

      <ProgramDetailDialog
        program={selectedProgram}
        open={!!selectedProgram}
        onOpenChange={(open) => !open && setSelectedProgram(null)}
      />
    </section>
  );
};
