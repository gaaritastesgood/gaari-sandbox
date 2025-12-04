import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, AlertCircle, Info, ExternalLink, CheckCircle, FolderPlus } from "lucide-react";
import { CustomerIssue } from "@/types/customer";
import { CaseCreationDialog } from "@/components/CaseCreationDialog";
import { toast } from "@/hooks/use-toast";

interface CustomerIssuesPanelProps {
  issues: CustomerIssue[];
  onNavigateToTab: (tab: string) => void;
}

export const CustomerIssuesPanel = ({ issues, onNavigateToTab }: CustomerIssuesPanelProps) => {
  const [caseDialogOpen, setCaseDialogOpen] = useState(false);
  const [selectedCaseType, setSelectedCaseType] = useState<string | undefined>();
  const [resolvedIssues, setResolvedIssues] = useState<Set<string>>(new Set());

  const openIssues = issues.filter(issue => !resolvedIssues.has(issue.id));

  const handleCreateCase = (issue: CustomerIssue) => {
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

  const getSeverityIcon = (severity: CustomerIssue["severity"]) => {
    switch (severity) {
      case "error":
        return <AlertCircle className="h-5 w-5 text-status-error" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-status-warning" />;
      default:
        return <Info className="h-5 w-5 text-status-info" />;
    }
  };

  const getSeverityStyles = (severity: CustomerIssue["severity"]) => {
    switch (severity) {
      case "error":
        return "border-l-status-error bg-status-error-bg/10";
      case "warning":
        return "border-l-status-warning bg-status-warning-bg/10";
      default:
        return "border-l-status-info bg-status-info-bg/10";
    }
  };

  if (openIssues.length === 0) {
    return (
      <Card className="p-4 border-border bg-status-success-bg/10 border-l-4 border-l-status-success">
        <div className="flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-status-success" />
          <div>
            <h3 className="font-medium text-foreground">No Open Issues</h3>
            <p className="text-sm text-muted-foreground">All potential issues have been addressed.</p>
          </div>
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
            <h3 className="font-semibold text-foreground">Potential Issues</h3>
            <Badge variant="outline" className="bg-status-warning-bg text-status-warning">
              {openIssues.length} detected
            </Badge>
          </div>
        </div>

        <div className="space-y-3">
          {openIssues.map((issue) => (
            <div
              key={issue.id}
              className={`rounded-lg border border-border border-l-4 p-4 ${getSeverityStyles(issue.severity)}`}
            >
              <div className="flex items-start gap-3">
                {getSeverityIcon(issue.severity)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-medium text-foreground">{issue.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{issue.description}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        issue.severity === "error"
                          ? "bg-status-error-bg text-status-error"
                          : issue.severity === "warning"
                          ? "bg-status-warning-bg text-status-warning"
                          : "bg-status-info-bg text-status-info"
                      }
                    >
                      {issue.severity}
                    </Badge>
                  </div>

                  {/* Evidence Links */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {issue.evidence.map((ev, idx) => (
                      <Button
                        key={idx}
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs text-primary hover:text-primary/80 hover:bg-primary/10 gap-1"
                        onClick={() => onNavigateToTab(ev.linkTab)}
                      >
                        <ExternalLink className="h-3 w-3" />
                        {ev.label}
                      </Button>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs gap-1"
                      onClick={() => handleCreateCase(issue)}
                    >
                      <FolderPlus className="h-3.5 w-3.5" />
                      Create Case
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 text-xs gap-1 text-status-success hover:text-status-success hover:bg-status-success-bg"
                      onClick={() => handleResolve(issue.id)}
                    >
                      <CheckCircle className="h-3.5 w-3.5" />
                      Resolve
                    </Button>
                  </div>
                </div>
              </div>
            </div>
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
