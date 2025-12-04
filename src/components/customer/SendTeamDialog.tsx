import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { Users, Clock, AlertTriangle } from "lucide-react";
import { AttentionItem } from "@/data/kamDashboardData";
import { toast } from "sonner";

interface SendTeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  alert: AttentionItem | null;
  customerName: string;
}

export const SendTeamDialog = ({ open, onOpenChange, alert, customerName }: SendTeamDialogProps) => {
  const [priority, setPriority] = useState<string>("high");
  const [teamType, setTeamType] = useState<string>("");
  const [notes, setNotes] = useState("");

  if (!alert) return null;

  const teamTypes = [
    { value: "line_crew", label: "Line Crew", eta: "45-60 min" },
    { value: "engineering", label: "Engineering Team", eta: "1-2 hours" },
    { value: "account_team", label: "Account Team", eta: "Same day" },
    { value: "emergency", label: "Emergency Response", eta: "15-30 min" },
  ];

  const selectedTeam = teamTypes.find(t => t.value === teamType);

  const handleDispatch = () => {
    toast.success(`${selectedTeam?.label || "Team"} dispatched to ${customerName}`, {
      description: `Priority: ${priority.toUpperCase()} • ETA: ${selectedTeam?.eta || "TBD"}`,
    });
    onOpenChange(false);
    setPriority("high");
    setTeamType("");
    setNotes("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <DialogTitle>Dispatch Team</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Alert Context */}
          <Card className="p-3 bg-muted/50">
            <div className="text-sm font-medium text-foreground">{customerName}</div>
            <div className="text-xs text-muted-foreground mt-1">{alert.reason}</div>
          </Card>

          {/* Priority Selection */}
          <div className="space-y-2">
            <Label>Priority</Label>
            <RadioGroup value={priority} onValueChange={setPriority} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="emergency" id="emergency" />
                <Label htmlFor="emergency" className="text-status-error font-medium cursor-pointer">
                  <AlertTriangle className="h-3 w-3 inline mr-1" />
                  Emergency
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="high" />
                <Label htmlFor="high" className="text-status-warning font-medium cursor-pointer">High</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="standard" id="standard" />
                <Label htmlFor="standard" className="text-foreground cursor-pointer">Standard</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Team Type Selection */}
          <div className="space-y-2">
            <Label>Team Type</Label>
            <Select value={teamType} onValueChange={setTeamType}>
              <SelectTrigger>
                <SelectValue placeholder="Select team type" />
              </SelectTrigger>
              <SelectContent>
                {teamTypes.map((team) => (
                  <SelectItem key={team.value} value={team.value}>
                    <div className="flex justify-between items-center gap-4">
                      <span>{team.label}</span>
                      <span className="text-xs text-muted-foreground">ETA: {team.eta}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* ETA Display */}
          {selectedTeam && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Estimated arrival: <span className="font-medium text-foreground">{selectedTeam.eta}</span></span>
            </div>
          )}

          {/* Notes */}
          <div className="space-y-2">
            <Label>Instructions / Notes</Label>
            <Textarea
              placeholder="Add any special instructions for the team..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleDispatch} disabled={!teamType}>
            <Users className="h-4 w-4 mr-2" />
            Dispatch Team
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
