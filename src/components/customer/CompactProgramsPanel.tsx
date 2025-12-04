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
      <Card className="p-4 border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-base text-foreground">Potentially Eligible Programs</h3>
            <Badge variant="outline" className="text-sm bg-status-info-bg text-status-info">
              {programs.length}
            </Badge>
          </div>
        </div>

        <div className="space-y-3">
          {programs.map((program) => (
            <Collapsible
              key={program.programId}
              open={expandedPrograms.has(program.programId)}
              onOpenChange={() => toggleExpanded(program.programId)}
            >
              <div className="rounded-md border border-border p-3 bg-card">
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-sm text-primary">$</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-semibold text-base text-foreground truncate">{program.programName}</h4>
                      <Badge variant="outline" className={`text-sm shrink-0 ${getLikelihoodBadgeClass(program.likelihood)}`}>
                        {program.likelihood}
                      </Badge>
                    </div>
                    <p className="text-sm text-status-success font-medium mt-1">
                      ${program.estimatedSavings}/yr savings
                    </p>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{program.summary}</p>
                    
                    <div className="flex items-center justify-between mt-3">
                      <CollapsibleTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 text-sm bg-muted hover:bg-muted/80 gap-1.5">
                          <ChevronRight className={`h-4 w-4 transition-transform ${expandedPrograms.has(program.programId) ? "rotate-90" : ""}`} />
                          View Evidence ({program.supportingFacts.length})
                        </Button>
                      </CollapsibleTrigger>
                      <Button
                        size="sm"
                        className="h-8 text-sm px-3"
                        onClick={() => handleStartEnrollment(program)}
                      >
                        <TrendingUp className="h-4 w-4 mr-1.5" />
                        Enroll
                      </Button>
                    </div>

                    <CollapsibleContent>
                      <div className="mt-3 pt-3 border-t border-border space-y-2">
                        {program.supportingFacts.map((fact, idx) => (
                          <div key={idx} className="flex items-center justify-between text-sm bg-muted/50 rounded px-3 py-2">
                            <span className="text-foreground">• {fact.fact}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-sm text-primary hover:text-primary/80 px-2"
                              onClick={() => onNavigateToTab(fact.linkTab)}
                            >
                              <ExternalLink className="h-4 w-4" />
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
