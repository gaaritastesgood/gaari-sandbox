import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Users, Calendar, FileText } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface IssueEscalationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  issueType: string;
  count: number;
  impact: string;
}

export const IssueEscalationDialog = ({ open, onOpenChange, issueType, count, impact }: IssueEscalationDialogProps) => {
  const [team, setTeam] = useState("");
  const [priority, setPriority] = useState("");
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  const handleEscalate = () => {
    toast({
      title: "Issue Escalated",
      description: `${issueType} has been flagged to ${team} with ${priority} priority.`,
    });
    onOpenChange(false);
    // Reset form
    setTeam("");
    setPriority("");
    setNotes("");
  };

  const getTeamOptions = () => {
    switch (issueType) {
      case "Estimated Over-read":
      case "Smart Meter Offline":
        return ["Field Operations", "Meter Engineering", "Network Operations"];
      case "Stuck Meter":
      case "Mismatched Meter":
        return ["Field Operations", "Meter Engineering", "Customer Service"];
      default:
        return ["Field Operations", "Billing Team", "Customer Service", "Meter Engineering"];
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Escalate Issue: {issueType}</DialogTitle>
          <DialogDescription>
            Flag this issue to the relevant team for investigation and resolution
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Issue Summary */}
          <div className="flex items-start gap-4 p-4 rounded-lg border border-border bg-muted/50">
            <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-foreground">{issueType}</h4>
                <Badge variant={impact === "High" ? "destructive" : "outline"}>
                  {impact} Impact
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>{count} occurrences in last 7 days</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Affecting current billing cycle</span>
                </div>
              </div>
            </div>
          </div>

          {/* Assign Team */}
          <div className="space-y-2">
            <Label htmlFor="team" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Assign to Team
            </Label>
            <Select value={team} onValueChange={setTeam}>
              <SelectTrigger id="team">
                <SelectValue placeholder="Select team to handle this issue" />
              </SelectTrigger>
              <SelectContent>
                {getTeamOptions().map((teamOption) => (
                  <SelectItem key={teamOption} value={teamOption}>
                    {teamOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Priority Level */}
          <div className="space-y-2">
            <Label htmlFor="priority" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Priority Level
            </Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger id="priority">
                <SelectValue placeholder="Select priority level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="critical">Critical - Immediate action required</SelectItem>
                <SelectItem value="high">High - Resolve within 24 hours</SelectItem>
                <SelectItem value="medium">Medium - Resolve within 3 days</SelectItem>
                <SelectItem value="low">Low - Resolve within 7 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any additional context or instructions for the team..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleEscalate} 
              disabled={!team || !priority}
              className="bg-primary hover:bg-primary/90"
            >
              Escalate Issue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
