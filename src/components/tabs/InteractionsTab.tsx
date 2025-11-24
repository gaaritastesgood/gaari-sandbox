import { Interaction, Case } from "@/types/customer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MessageSquare, MapPin, Globe } from "lucide-react";

interface InteractionsTabProps {
  interactions: Interaction[];
  cases: Case[];
}

export const InteractionsTab = ({ interactions, cases }: InteractionsTabProps) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "call":
        return <Phone className="h-4 w-4" />;
      case "email":
        return <Mail className="h-4 w-4" />;
      case "chat":
        return <MessageSquare className="h-4 w-4" />;
      case "field_visit":
        return <MapPin className="h-4 w-4" />;
      case "portal":
        return <Globe className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getCaseStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      open: "bg-status-info-bg text-status-info",
      in_progress: "bg-status-warning-bg text-status-warning",
      resolved: "bg-status-success-bg text-status-success",
      closed: "bg-muted text-muted-foreground",
    };
    return variants[status] || "bg-muted";
  };

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, string> = {
      low: "bg-muted text-muted-foreground",
      medium: "bg-status-info-bg text-status-info",
      high: "bg-status-warning-bg text-status-warning",
      critical: "bg-status-error-bg text-status-error",
    };
    return variants[priority] || "bg-muted";
  };

  return (
    <div className="space-y-6">
      {cases.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Open Cases</h3>
          <div className="space-y-3">
            {cases.map((caseItem) => (
              <Card key={caseItem.id} className="p-4 border-border">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-foreground">{caseItem.subject}</h4>
                    <div className="text-sm text-muted-foreground mt-1">
                      Created: {new Date(caseItem.createdDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className={getPriorityBadge(caseItem.priority)}>
                      {caseItem.priority}
                    </Badge>
                    <Badge variant="outline" className={getCaseStatusBadge(caseItem.status)}>
                      {caseItem.status.replace("_", " ")}
                    </Badge>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Type: {caseItem.type} • Assigned to: {caseItem.assignedTo}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3">Interaction History</h3>
        <div className="space-y-3">
          {interactions.map((interaction) => (
            <Card key={interaction.id} className="p-4 border-border">
              <div className="flex items-start gap-3">
                <div className="mt-1 text-primary">{getTypeIcon(interaction.type)}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-foreground">{interaction.reason}</h4>
                      <div className="text-sm text-muted-foreground">
                        {new Date(interaction.date).toLocaleDateString()} {interaction.time} • {interaction.channel}
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-secondary text-secondary-foreground">
                      {interaction.type}
                    </Badge>
                  </div>
                  <div className="text-sm text-foreground mb-2">{interaction.description}</div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">Outcome:</span> {interaction.outcome}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">{interaction.agent}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
