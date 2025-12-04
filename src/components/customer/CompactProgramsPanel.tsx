import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Zap, ChevronRight, ExternalLink, TrendingUp } from "lucide-react";
import { SimplifiedProgramEligibility } from "@/types/customer";
import { ProgramEnrollmentDialog } from "./ProgramEnrollmentDialog";
import { CustomerProgramEligibility } from "@/types/customer";

interface CompactProgramsPanelProps {
  programs: SimplifiedProgramEligibility[];
  customerName: string;
  onNavigateToTab: (tab: string) => void;
}

export const CompactProgramsPanel = ({ 
  programs, 
  customerName,
  onNavigateToTab 
}: CompactProgramsPanelProps) => {
  const [enrollmentDialogOpen, setEnrollmentDialogOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<SimplifiedProgramEligibility | null>(null);
  const [expandedPrograms, setExpandedPrograms] = useState<Set<string>>(new Set());

  const handleStartEnrollment = (program: SimplifiedProgramEligibility) => {
    setSelectedProgram(program);
    setEnrollmentDialogOpen(true);
  };

  const toggleExpanded = (programId: string) => {
    setExpandedPrograms(prev => {
      const next = new Set(prev);
      if (next.has(programId)) {
        next.delete(programId);
      } else {
        next.add(programId);
      }
      return next;
    });
  };

  const getLikelihoodBadgeClass = (likelihood: SimplifiedProgramEligibility["likelihood"]) => {
    switch (likelihood) {
      case "high":
        return "bg-status-success-bg text-status-success";
      case "medium":
        return "bg-status-warning-bg text-status-warning";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  if (programs.length === 0) {
    return null;
  }

  // Convert to the format expected by ProgramEnrollmentDialog
  const convertToEligibility = (program: SimplifiedProgramEligibility): CustomerProgramEligibility => ({
    customerId: "",
    programId: program.programId,
    programName: program.programName,
    likelihood: program.likelihood,
    estimatedSavings: program.estimatedSavings,
    sources: program.supportingFacts.map(fact => ({
      type: "billing_pattern" as const,
      description: fact.fact,
      date: new Date().toISOString().split('T')[0],
      sourceId: "",
      linkTab: fact.linkTab
    }))
  });

  return (
    <>
      <Card className="p-3 border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            <h3 className="font-semibold text-sm text-foreground">Programs</h3>
            <Badge variant="outline" className="text-xs bg-status-info-bg text-status-info">
              {programs.length}
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          {programs.map((program) => (
            <Collapsible
              key={program.programId}
              open={expandedPrograms.has(program.programId)}
              onOpenChange={() => toggleExpanded(program.programId)}
            >
              <div className="rounded-md border border-border p-2 bg-card">
                <div className="flex items-start gap-2">
                  <div className="h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs text-primary">$</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-medium text-sm text-foreground truncate">{program.programName}</h4>
                      <Badge variant="outline" className={`text-xs shrink-0 ${getLikelihoodBadgeClass(program.likelihood)}`}>
                        {program.likelihood}
                      </Badge>
                    </div>
                    <p className="text-xs text-status-success font-medium mt-0.5">
                      ${program.estimatedSavings}/yr savings
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{program.summary}</p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-6 text-xs text-muted-foreground hover:text-foreground p-0 gap-1">
                          <ChevronRight className={`h-3 w-3 transition-transform ${expandedPrograms.has(program.programId) ? "rotate-90" : ""}`} />
                          Evidence ({program.supportingFacts.length})
                        </Button>
                      </CollapsibleTrigger>
                      <Button
                        size="sm"
                        className="h-6 text-xs px-2"
                        onClick={() => handleStartEnrollment(program)}
                      >
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Enroll
                      </Button>
                    </div>

                    <CollapsibleContent>
                      <div className="mt-2 pt-2 border-t border-border space-y-1.5">
                        {program.supportingFacts.map((fact, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs bg-muted/50 rounded px-2 py-1">
                            <span className="text-foreground">• {fact.fact}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-5 text-xs text-primary hover:text-primary/80 p-0"
                              onClick={() => onNavigateToTab(fact.linkTab)}
                            >
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </div>
                </div>
              </div>
            </Collapsible>
          ))}
        </div>
      </Card>

      {selectedProgram && (
        <ProgramEnrollmentDialog
          open={enrollmentDialogOpen}
          onOpenChange={setEnrollmentDialogOpen}
          program={convertToEligibility(selectedProgram)}
          customerName={customerName}
        />
      )}
    </>
  );
};
