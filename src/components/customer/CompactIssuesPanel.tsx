import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { AlertTriangle, AlertCircle, Info, ChevronRight, CheckCircle, FolderPlus, ExternalLink, Users } from "lucide-react";
import { ConsolidatedIssue } from "@/types/customer";
import { CaseCreationDialog } from "@/components/CaseCreationDialog";
import { SendTeamDialog } from "@/components/customer/SendTeamDialog";
import { toast } from "@/hooks/use-toast";
import { AttentionItem } from "@/data/kamDashboardData";

interface CompactIssuesPanelProps {
  issues: ConsolidatedIssue[];
  onNavigateToTab: (tab: string) => void;
  customerName?: string;
}

export const CompactIssuesPanel = ({ issues, onNavigateToTab, customerName = "Customer" }: CompactIssuesPanelProps) => {
  const [caseDialogOpen, setCaseDialogOpen] = useState(false);
  const [selectedCaseType, setSelectedCaseType] = useState<string | undefined>();
  const [resolvedIssues, setResolvedIssues] = useState<Set<string>>(new Set());
  const [expandedIssues, setExpandedIssues] = useState<Set<string>>(new Set());
  const [sendTeamDialogOpen, setSendTeamDialogOpen] = useState(false);
  const [selectedIssueForTeam, setSelectedIssueForTeam] = useState<AttentionItem | null>(null);

  const isMeterIssue = (issue: ConsolidatedIssue) => {
    const meterKeywords = ["meter", "reading", "estimated", "consumption", "usage spike", "anomaly"];
    return meterKeywords.some(keyword => 
      issue.title.toLowerCase().includes(keyword) || 
      issue.summary.toLowerCase().includes(keyword)
    );
  };

  const handleSendTeam = (issue: ConsolidatedIssue) => {
    const alertItem: AttentionItem = {
      id: issue.id,
      customerId: "residential",
      customerName: customerName,
      accountId: "RES-001",
      industry: "Residential",
      annualRevenue: "N/A",
      reason: issue.summary,
      category: "anomaly",
      severity: issue.severity === "error" ? "critical" : issue.severity === "warning" ? "high" : "medium",
      confidence: 85,
      evidencePoints: issue.supportingFacts.map(f => f.fact),
      detectedAt: new Date().toISOString(),
      quickFacts: [
        { label: "Issue Type", value: issue.title },
        { label: "Priority", value: issue.severity }
      ]
    };
    setSelectedIssueForTeam(alertItem);
    setSendTeamDialogOpen(true);
  };

  const openIssues = issues.filter(issue => !resolvedIssues.has(issue.id));

  const handleCreateCase = (issue: ConsolidatedIssue) => {
    setSelectedCaseType(issue.defaultCaseType);
    setCaseDialogOpen(true);
  };

  const handleResolve = (issueId: string) => {
    setResolvedIssues(prev => new Set([...prev, issueId]));
    toast({
      title: "Issue Resolved",
      description: "Issue has been marked as resolved.",
    });
  };

  const toggleExpanded = (issueId: string) => {
    setExpandedIssues(prev => {
      const next = new Set(prev);
      if (next.has(issueId)) {
        next.delete(issueId);
      } else {
        next.add(issueId);
      }
      return next;
    });
  };

  const getSeverityIcon = (severity: ConsolidatedIssue["severity"]) => {
    switch (severity) {
      case "error":
        return <AlertCircle className="h-5 w-5 text-status-error" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-status-warning" />;
      default:
        return <Info className="h-5 w-5 text-status-info" />;
    }
  };

  const getSeverityBadgeClass = (severity: ConsolidatedIssue["severity"]) => {
    switch (severity) {
      case "error":
        return "bg-status-error-bg text-status-error";
      case "warning":
        return "bg-status-warning-bg text-status-warning";
      default:
        return "bg-status-info-bg text-status-info";
    }
  };

  if (openIssues.length === 0) {
    return (
      <Card className="p-4 border-border bg-status-success-bg/10">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-status-success" />
          <span className="text-base font-medium text-foreground">No Open Issues</span>
        </div>
      </Card>
    );
  }

  return (
    <>
      <Card className="p-4 border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-status-warning" />
            <h3 className="font-semibold text-base text-foreground">Issues</h3>
            <Badge variant="outline" className="text-sm bg-status-warning-bg text-status-warning">
              {openIssues.length}
            </Badge>
          </div>
        </div>

        <div className="space-y-3">
          {openIssues.map((issue) => (
            <Collapsible
              key={issue.id}
              open={expandedIssues.has(issue.id)}
              onOpenChange={() => toggleExpanded(issue.id)}
            >
              <div className="rounded-md border border-border p-3 bg-card">
                <div className="flex items-start gap-3">
                  {getSeverityIcon(issue.severity)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-semibold text-base text-foreground truncate">{issue.title}</h4>
                      <Badge variant="outline" className={`text-sm shrink-0 ${getSeverityBadgeClass(issue.severity)}`}>
                        {issue.severity === "error" ? "Urgent" : issue.severity === "warning" ? "Attention" : "Info"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{issue.summary}</p>
                    
                    <div className="flex items-center justify-between mt-3">
                      <CollapsibleTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 text-sm bg-muted hover:bg-muted/80 gap-1.5">
                          <ChevronRight className={`h-4 w-4 transition-transform ${expandedIssues.has(issue.id) ? "rotate-90" : ""}`} />
                          View Evidence ({issue.supportingFacts.length})
                        </Button>
                      </CollapsibleTrigger>
                      <div className="flex gap-2">
                        {isMeterIssue(issue) && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 text-sm px-3"
                            onClick={() => handleSendTeam(issue)}
                          >
                            <Users className="h-4 w-4 mr-1.5" />
                            Send Team
                          </Button>
                        )}
                        <Button
                          size="sm"
                          className="h-8 text-sm px-3"
                          onClick={() => handleCreateCase(issue)}
                        >
                          <FolderPlus className="h-4 w-4 mr-1.5" />
                          Create Case
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 text-sm px-3 text-status-success hover:text-status-success hover:bg-status-success-bg border-status-success/30"
                          onClick={() => handleResolve(issue.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1.5" />
                          Resolve
                        </Button>
                      </div>
                    </div>

                    <CollapsibleContent>
                      <div className="mt-3 pt-3 border-t border-border space-y-2">
                        {issue.supportingFacts.map((fact, idx) => (
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
                        <p className="text-sm text-muted-foreground italic pt-1">
                          {issue.recommendedAction}
                        </p>
                      </div>
                    </CollapsibleContent>
                  </div>
                </div>
              </div>
            </Collapsible>
          ))}
        </div>
      </Card>

      <CaseCreationDialog
        open={caseDialogOpen}
        onOpenChange={setCaseDialogOpen}
        defaultCaseType={selectedCaseType}
      />

      <SendTeamDialog
        open={sendTeamDialogOpen}
        onOpenChange={setSendTeamDialogOpen}
        alert={selectedIssueForTeam}
        customerName={customerName}
      />
    </>
  );
};
