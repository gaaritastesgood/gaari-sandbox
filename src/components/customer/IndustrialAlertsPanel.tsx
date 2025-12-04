import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Eye, Users, FileText, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { AttentionItem, categoryConfig, severityConfig } from "@/data/kamDashboardData";
import { AlertStatusDialog } from "./AlertStatusDialog";
import { SendTeamDialog } from "./SendTeamDialog";
import { CaseCreationDialog } from "@/components/CaseCreationDialog";

interface IndustrialAlertsPanelProps {
  alerts: AttentionItem[];
  customerName: string;
}

export const IndustrialAlertsPanel = ({ alerts, customerName }: IndustrialAlertsPanelProps) => {
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [sendTeamDialogOpen, setSendTeamDialogOpen] = useState(false);
  const [caseDialogOpen, setCaseDialogOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<AttentionItem | null>(null);
  const [resolvedAlerts, setResolvedAlerts] = useState<Set<string>>(new Set());

  if (alerts.length === 0) {
    return (
      <Card className="p-4 border-border">
        <div className="flex items-center gap-2 text-muted-foreground">
          <CheckCircle className="h-5 w-5 text-status-success" />
          <span>No active alerts for this account</span>
        </div>
      </Card>
    );
  }

  const handleViewStatus = (alert: AttentionItem) => {
    setSelectedAlert(alert);
    setStatusDialogOpen(true);
  };

  const handleSendTeam = (alert: AttentionItem) => {
    setSelectedAlert(alert);
    setSendTeamDialogOpen(true);
  };

  const handleCreateCase = (alert: AttentionItem) => {
    setSelectedAlert(alert);
    setCaseDialogOpen(true);
  };

  const handleResolve = (alertId: string) => {
    setResolvedAlerts(prev => new Set([...prev, alertId]));
  };

  const activeAlerts = alerts.filter(a => !resolvedAlerts.has(a.id));

  return (
    <>
      <Card className="p-4 border-border border-l-4 border-l-status-error">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="h-5 w-5 text-status-error" />
          <h3 className="font-semibold text-foreground">Active Alerts</h3>
          <Badge className="bg-status-error-bg text-status-error">{activeAlerts.length}</Badge>
        </div>

        <div className="space-y-3">
          {activeAlerts.map((alert) => {
            const categoryStyle = categoryConfig[alert.category];
            const severityStyle = severityConfig[alert.severity];
            const isExpanded = expandedAlert === alert.id;

            return (
              <div 
                key={alert.id} 
                className="bg-muted/50 rounded-lg p-3 border border-border"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={`${severityStyle.bgColor} ${severityStyle.color} text-xs`}>
                        {severityStyle.label}
                      </Badge>
                      <Badge variant="outline" className={`${categoryStyle.bgColor} ${categoryStyle.color} text-xs`}>
                        {categoryStyle.label}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{alert.detectedAt}</span>
                    </div>
                    <div className="font-medium text-foreground">{alert.reason}</div>
                    
                    {/* Quick Facts */}
                    <div className="flex gap-4 mt-2 text-sm">
                      {alert.quickFacts.map((fact, i) => (
                        <div key={i}>
                          <span className="text-muted-foreground">{fact.label}: </span>
                          <span className="font-medium text-foreground">{fact.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {alert.confidence}% confidence
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedAlert(isExpanded ? null : alert.id)}
                    >
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="text-sm font-medium text-muted-foreground mb-2">More Detail</div>
                    <ul className="space-y-1 text-sm text-foreground">
                      {alert.evidencePoints.map((point, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-muted-foreground">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 mt-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-7 text-xs"
                    onClick={() => handleViewStatus(alert)}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View Status
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-7 text-xs"
                    onClick={() => handleSendTeam(alert)}
                  >
                    <Users className="h-3 w-3 mr-1" />
                    Send Team
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-7 text-xs"
                    onClick={() => handleCreateCase(alert)}
                  >
                    <FileText className="h-3 w-3 mr-1" />
                    Create Case
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="h-7 text-xs"
                    onClick={() => handleResolve(alert.id)}
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Resolve
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Dialogs */}
      <AlertStatusDialog
        open={statusDialogOpen}
        onOpenChange={setStatusDialogOpen}
        alert={selectedAlert}
      />
      
      <SendTeamDialog
        open={sendTeamDialogOpen}
        onOpenChange={setSendTeamDialogOpen}
        alert={selectedAlert}
        customerName={customerName}
      />

      <CaseCreationDialog
        open={caseDialogOpen}
        onOpenChange={setCaseDialogOpen}
        customerName={customerName}
        defaultCaseType={selectedAlert?.category === "outage" ? "outage_power" : "meter_usage"}
      />
    </>
  );
};
