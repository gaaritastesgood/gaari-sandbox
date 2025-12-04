import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, MapPin, Users, Phone, AlertTriangle, CheckCircle2, CircleDot } from "lucide-react";
import { AttentionItem, severityConfig } from "@/data/kamDashboardData";

interface AlertStatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  alert: AttentionItem | null;
}

export const AlertStatusDialog = ({ open, onOpenChange, alert }: AlertStatusDialogProps) => {
  if (!alert) return null;

  const severityStyle = severityConfig[alert.severity];

  // Mock timeline data based on alert
  const timeline = [
    { time: "Dec 2, 08:42 AM", event: "Outage detected", status: "completed" },
    { time: "Dec 2, 08:45 AM", event: "Alert generated and dispatched", status: "completed" },
    { time: "Dec 2, 09:15 AM", event: "Field crew dispatched", status: "completed" },
    { time: "Dec 2, 10:30 AM", event: "Root cause identified - equipment failure", status: "completed" },
    { time: "Dec 2, 02:54 PM", event: "Service restored", status: "current" },
    { time: "Pending", event: "Post-incident review", status: "pending" },
  ];

  const affectedEquipment = [
    { name: "Transformer T-4521", status: "Replaced" },
    { name: "Breaker B-102", status: "Reset" },
    { name: "Line Segment LS-78", status: "Inspected" },
  ];

  const fieldCrew = {
    team: "Line Crew Alpha",
    lead: "Mike Rodriguez",
    members: 4,
    status: "On-site",
    eta: "Completed",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-status-error" />
            <DialogTitle>Alert Status</DialogTitle>
            <Badge className={`${severityStyle.bgColor} ${severityStyle.color}`}>
              {severityStyle.label}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Alert Summary */}
          <Card className="p-4">
            <h4 className="font-medium text-foreground mb-2">{alert.customerName}</h4>
            <p className="text-sm text-muted-foreground">{alert.reason}</p>
            <div className="flex gap-4 mt-3 text-sm">
              {alert.quickFacts.map((fact, i) => (
                <div key={i}>
                  <span className="text-muted-foreground">{fact.label}: </span>
                  <span className="font-medium text-foreground">{fact.value}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Timeline */}
          <div>
            <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Event Timeline
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

          {/* Affected Equipment */}
          <div>
            <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Affected Equipment
            </h4>
            <div className="space-y-2">
              {affectedEquipment.map((eq, i) => (
                <div key={i} className="flex justify-between items-center p-2 bg-muted/50 rounded">
                  <span className="text-sm text-foreground">{eq.name}</span>
                  <Badge variant="outline" className="text-xs">{eq.status}</Badge>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Field Crew Status */}
          <div>
            <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Field Crew Status
            </h4>
            <Card className="p-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Team: </span>
                  <span className="font-medium text-foreground">{fieldCrew.team}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Lead: </span>
                  <span className="font-medium text-foreground">{fieldCrew.lead}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Members: </span>
                  <span className="font-medium text-foreground">{fieldCrew.members}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Status: </span>
                  <Badge className="bg-status-success-bg text-status-success text-xs">
                    {fieldCrew.status}
                  </Badge>
                </div>
              </div>
            </Card>
          </div>

          {/* Communication Log */}
          <div>
            <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Customer Communication
            </h4>
            <div className="space-y-2 text-sm">
              <div className="p-2 bg-muted/50 rounded">
                <div className="text-foreground">Outage notification sent</div>
                <div className="text-xs text-muted-foreground">Dec 2, 08:50 AM • Automated</div>
              </div>
              <div className="p-2 bg-muted/50 rounded">
                <div className="text-foreground">Called customer - spoke with operations manager</div>
                <div className="text-xs text-muted-foreground">Dec 2, 09:30 AM • Sarah Chen</div>
              </div>
              <div className="p-2 bg-muted/50 rounded">
                <div className="text-foreground">Restoration confirmation sent</div>
                <div className="text-xs text-muted-foreground">Dec 2, 03:05 PM • Automated</div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
