import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { AlertTriangle, AlertCircle, Info, ChevronRight, CheckCircle, FolderPlus, ExternalLink } from "lucide-react";
import { ConsolidatedIssue } from "@/types/customer";
import { CaseCreationDialog } from "@/components/CaseCreationDialog";
import { toast } from "@/hooks/use-toast";

interface CompactIssuesPanelProps {
  issues: ConsolidatedIssue[];
  onNavigateToTab: (tab: string) => void;
}

export const CompactIssuesPanel = ({ issues, onNavigateToTab }: CompactIssuesPanelProps) => {
  const [caseDialogOpen, setCaseDialogOpen] = useState(false);
  const [selectedCaseType, setSelectedCaseType] = useState<string | undefined>();
  const [resolvedIssues, setResolvedIssues] = useState<Set<string>>(new Set());
  const [expandedIssues, setExpandedIssues] = useState<Set<string>>(new Set());

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
        return <AlertCircle className="h-4 w-4 text-status-error" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-status-warning" />;
      default:
        return <Info className="h-4 w-4 text-status-info" />;
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
      <Card className="p-3 border-border bg-status-success-bg/10">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-status-success" />
          <span className="text-sm font-medium text-foreground">No Open Issues</span>
        </div>
      </Card>
    );
  }

  return (
    <>
      <Card className="p-3 border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-status-warning" />
            <h3 className="font-semibold text-sm text-foreground">Issues</h3>
            <Badge variant="outline" className="text-xs bg-status-warning-bg text-status-warning">
              {openIssues.length}
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          {openIssues.map((issue) => (
            <Collapsible
              key={issue.id}
              open={expandedIssues.has(issue.id)}
              onOpenChange={() => toggleExpanded(issue.id)}
            >
              <div className="rounded-md border border-border p-2 bg-card">
                <div className="flex items-start gap-2">
                  {getSeverityIcon(issue.severity)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-medium text-sm text-foreground truncate">{issue.title}</h4>
                      <Badge variant="outline" className={`text-xs shrink-0 ${getSeverityBadgeClass(issue.severity)}`}>
                        {issue.severity === "error" ? "Urgent" : issue.severity === "warning" ? "Attention" : "Info"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{issue.summary}</p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-6 text-xs text-muted-foreground hover:text-foreground p-0 gap-1">
                          <ChevronRight className={`h-3 w-3 transition-transform ${expandedIssues.has(issue.id) ? "rotate-90" : ""}`} />
                          Evidence ({issue.supportingFacts.length})
                        </Button>
                      </CollapsibleTrigger>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 text-xs px-2"
                          onClick={() => handleCreateCase(issue)}
                        >
                          <FolderPlus className="h-3 w-3 mr-1" />
                          Case
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 text-xs px-2 text-status-success hover:text-status-success hover:bg-status-success-bg"
                          onClick={() => handleResolve(issue.id)}
                        >
                          <CheckCircle className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <CollapsibleContent>
                      <div className="mt-2 pt-2 border-t border-border space-y-1.5">
                        {issue.supportingFacts.map((fact, idx) => (
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
                        <p className="text-xs text-muted-foreground italic pt-1">
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
    </>
  );
};
