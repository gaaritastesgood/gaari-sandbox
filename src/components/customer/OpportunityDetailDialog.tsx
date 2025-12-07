import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Lightbulb, TrendingUp, CheckCircle2, CircleDot, Target, FileText, DollarSign } from "lucide-react";
import { OpportunityItem, opportunityTypeConfig } from "@/data/kamDashboardData";

interface OpportunityDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  opportunity: OpportunityItem | null;
  customerName: string;
}

export const OpportunityDetailDialog = ({ open, onOpenChange, opportunity, customerName }: OpportunityDetailDialogProps) => {
  if (!opportunity) return null;

  const typeConfig = opportunityTypeConfig[opportunity.opportunityType];

  // Generate timeline based on opportunity type
  const timeline = [
    { time: "2 weeks ago", event: "Usage pattern analysis completed", status: "completed" },
    { time: "1 week ago", event: "Eligibility criteria verified", status: "completed" },
    { time: "Today", event: "Opportunity identified and flagged", status: "completed" },
    { time: "Next step", event: "Customer outreach recommended", status: "current" },
    { time: "Pending", event: "Enrollment/Sign-up", status: "pending" },
    { time: "Pending", event: "Benefits realization", status: "pending" },
  ];

  // Program benefits based on opportunity type
  const benefits = opportunity.opportunityType === "demand-response" ? [
    { name: "Bill Credits", description: "Monthly credits applied to account" },
    { name: "Priority Service", description: "Faster response times for service calls" },
    { name: "Usage Insights", description: "Detailed consumption analytics" },
  ] : opportunity.opportunityType === "tariff" ? [
    { name: "Lower Rate", description: "Reduced per-kWh charges during off-peak" },
    { name: "Demand Savings", description: "Reduced demand charges with load shifting" },
    { name: "Predictable Bills", description: "More consistent monthly billing" },
  ] : opportunity.opportunityType === "solar" ? [
    { name: "Energy Independence", description: "Generate your own power" },
    { name: "Net Metering", description: "Credits for excess energy produced" },
    { name: "Tax Incentives", description: "Available federal and state credits" },
  ] : [
    { name: "Improved Efficiency", description: "Reduced energy waste" },
    { name: "Equipment Rebates", description: "Available incentives for upgrades" },
    { name: "Long-term Savings", description: "Ongoing operational cost reduction" },
  ];

  const requirements = [
    { name: "Account Standing", status: "Met" },
    { name: "Usage Threshold", status: "Met" },
    { name: "Service Type", status: "Met" },
    { name: "Customer Consent", status: "Required" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-status-success" />
            <DialogTitle>Opportunity Details</DialogTitle>
            <Badge className={`${typeConfig.bgColor} ${typeConfig.color}`}>
              {typeConfig.label}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Opportunity Summary */}
          <Card className="p-4">
            <h4 className="font-medium text-foreground mb-2">{customerName}</h4>
            <p className="text-sm font-medium text-foreground">{opportunity.opportunityName}</p>
            <div className="flex gap-4 mt-3 text-sm">
              <div>
                <span className="text-muted-foreground">Estimated Value: </span>
                <span className="font-medium text-foreground">{opportunity.estimatedValue}</span>
              </div>
              {opportunity.estimatedSavings && (
                <div>
                  <span className="text-muted-foreground">Savings: </span>
                  <span className="font-medium text-status-success">{opportunity.estimatedSavings}</span>
                </div>
              )}
            </div>
          </Card>

          {/* Evidence Section */}
          <div>
            <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Supporting Evidence
            </h4>
            <div className="space-y-2">
              {opportunity.evidence.map((point, i) => (
                <div key={i} className="flex items-start gap-2 p-2 bg-muted/50 rounded">
                  <CheckCircle2 className="h-4 w-4 text-status-success mt-0.5 shrink-0" />
                  <span className="text-sm text-foreground">{point}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Timeline */}
          <div>
            <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Progress Timeline
            </h4>
            <div className="space-y-3 pl-2">
              {timeline.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {item.status === "completed" && (
                      <CheckCircle2 className="h-4 w-4 text-status-success" />
                    )}
                    {item.status === "current" && (
                      <CircleDot className="h-4 w-4 text-primary" />
                    )}
                    {item.status === "pending" && (
                      <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">{item.event}</div>
                    <div className="text-xs text-muted-foreground">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Program Benefits */}
          <div>
            <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Potential Benefits
            </h4>
            <div className="space-y-2">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex justify-between items-center p-2 bg-muted/50 rounded">
                  <div>
                    <span className="text-sm font-medium text-foreground">{benefit.name}</span>
                    <p className="text-xs text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Requirements */}
          <div>
            <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Eligibility Requirements
            </h4>
            <Card className="p-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                {requirements.map((req, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-muted-foreground">{req.name}</span>
                    <Badge 
                      className={req.status === "Met" 
                        ? "bg-status-success-bg text-status-success text-xs" 
                        : "bg-status-warning-bg text-status-warning text-xs"
                      }
                    >
                      {req.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
