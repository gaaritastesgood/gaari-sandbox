import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, ExternalLink, DollarSign, TrendingUp } from "lucide-react";
import { CustomerProgramEligibility } from "@/types/customer";
import { ProgramEnrollmentDialog } from "./ProgramEnrollmentDialog";

interface ProgramEligibilityPanelProps {
  eligibility: CustomerProgramEligibility[];
  customerName: string;
  onNavigateToTab: (tab: string) => void;
}

export const ProgramEligibilityPanel = ({ 
  eligibility, 
  customerName,
  onNavigateToTab 
}: ProgramEligibilityPanelProps) => {
  const [enrollmentDialogOpen, setEnrollmentDialogOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<CustomerProgramEligibility | null>(null);

  const handleStartEnrollment = (program: CustomerProgramEligibility) => {
    setSelectedProgram(program);
    setEnrollmentDialogOpen(true);
  };

  const getLikelihoodStyles = (likelihood: CustomerProgramEligibility["likelihood"]) => {
    switch (likelihood) {
      case "high":
        return "bg-status-success-bg text-status-success";
      case "medium":
        return "bg-status-warning-bg text-status-warning";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getSourceTypeLabel = (type: string) => {
    switch (type) {
      case "call_transcript":
        return "Call Notes";
      case "load_analysis":
        return "Load Analysis";
      case "billing_pattern":
        return "Billing";
      case "meter_data":
        return "Meter Data";
      case "prior_participation":
        return "History";
      default:
        return type;
    }
  };

  if (eligibility.length === 0) {
    return null;
  }

  return (
    <>
      <Card className="p-4 border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Program Eligibility</h3>
            <Badge variant="outline" className="bg-status-info-bg text-status-info">
              {eligibility.length} programs
            </Badge>
          </div>
        </div>

        <div className="space-y-4">
          {eligibility.map((program) => (
            <div
              key={program.programId}
              className="rounded-lg border border-border p-4 bg-card hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium text-foreground">{program.programName}</h4>
                    <Badge variant="outline" className={getLikelihoodStyles(program.likelihood)}>
                      {program.likelihood} likelihood
                    </Badge>
                  </div>

                  {/* Estimated Savings */}
                  <div className="flex items-center gap-1 text-sm text-status-success mb-3">
                    <DollarSign className="h-4 w-4" />
                    <span className="font-medium">${program.estimatedSavings}/year estimated savings</span>
                  </div>

                  {/* Source Citations */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Evidence Sources</p>
                    {program.sources.map((source, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-sm bg-muted/50 rounded-md p-2"
                      >
                        <Badge variant="secondary" className="text-xs shrink-0">
                          {getSourceTypeLabel(source.type)}
                        </Badge>
                        <div className="flex-1 min-w-0">
                          <p className="text-foreground text-sm">{source.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">{source.date}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-5 text-xs text-primary hover:text-primary/80 p-0 gap-1"
                              onClick={() => onNavigateToTab(source.linkTab)}
                            >
                              <ExternalLink className="h-3 w-3" />
                              View source
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enrollment Button */}
                <Button
                  size="sm"
                  className="shrink-0 gap-1"
                  onClick={() => handleStartEnrollment(program)}
                >
                  <TrendingUp className="h-4 w-4" />
                  Start Enrollment
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {selectedProgram && (
        <ProgramEnrollmentDialog
          open={enrollmentDialogOpen}
          onOpenChange={setEnrollmentDialogOpen}
          program={selectedProgram}
          customerName={customerName}
        />
      )}
    </>
  );
};
