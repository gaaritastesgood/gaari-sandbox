import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Clock, Save } from "lucide-react";

interface InteractionPanelProps {
  onClose: () => void;
}

export const InteractionPanel = ({ onClose }: InteractionPanelProps) => {
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const startTime = new Date().toLocaleTimeString();

  return (
    <Card className="w-96 h-full border-l border-border rounded-none flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between bg-muted">
        <h3 className="font-semibold text-foreground">Current Interaction</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Clock className="h-4 w-4" />
            Started: {startTime}
          </div>
          <Badge variant="outline" className="bg-status-info-bg text-status-info">
            Call in Progress
          </Badge>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Reason for Contact
          </label>
          <Select value={reason} onValueChange={setReason}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Select reason..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="billing">Billing Inquiry</SelectItem>
              <SelectItem value="payment">Payment Issue</SelectItem>
              <SelectItem value="usage">Usage Question</SelectItem>
              <SelectItem value="rate">Rate/Tariff Question</SelectItem>
              <SelectItem value="meter">Meter Reading</SelectItem>
              <SelectItem value="service">Service Request</SelectItem>
              <SelectItem value="complaint">Complaint</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Interaction Notes
          </label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Document the customer interaction, issue details, and resolution steps..."
            className="min-h-[200px] bg-background"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Outcome
          </label>
          <Select>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Select outcome..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="escalated">Escalated</SelectItem>
              <SelectItem value="pending">Pending Follow-up</SelectItem>
              <SelectItem value="referred">Referred to Specialist</SelectItem>
              <SelectItem value="case_created">Case Created</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="p-4 border-t border-border space-y-2">
        <Button className="w-full" size="lg">
          <Save className="h-4 w-4 mr-2" />
          Save & Close Interaction
        </Button>
        <Button variant="outline" className="w-full">
          Save Draft
        </Button>
      </div>
    </Card>
  );
};
