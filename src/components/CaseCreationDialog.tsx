import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

interface CaseCreationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerId?: string;
  customerName?: string;
}

const CASE_TYPES = [
  {
    value: "high_bill",
    label: "High Bill / Billing Issue",
    description: "Unexpected high bills, line-item confusion, missing credits, wrong rate, estimated usage, solar credit issues"
  },
  {
    value: "payment_balance",
    label: "Payment & Account Balance Issue",
    description: "Payment failures, payment plans, late fees, disconnection notices, payment posting errors"
  },
  {
    value: "service_change",
    label: "Start/Stop/Transfer Service",
    description: "Move-in, move-out, transfer, new address setup, billing overlaps"
  },
  {
    value: "meter_usage",
    label: "Meter or Usage Problem",
    description: "Estimated reads, meter not reporting, suspected meter error, AMI/smart meter issues, implausible usage"
  },
  {
    value: "outage_power",
    label: "Outage or Power Quality Concern",
    description: "Outages, voltage fluctuations, flickering, repeated reliability issues"
  }
];

export const CaseCreationDialog = ({ open, onOpenChange, customerId, customerName }: CaseCreationDialogProps) => {
  const [caseType, setCaseType] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high" | "critical">("medium");

  const handleSubmit = () => {
    if (!caseType || !subject || !description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // TODO: Save case to database when backend is connected
    toast({
      title: "Case Created",
      description: `Case "${subject}" has been created successfully`,
    });

    // Reset form
    setCaseType("");
    setSubject("");
    setDescription("");
    setPriority("medium");
    onOpenChange(false);
  };

  const selectedCaseType = CASE_TYPES.find(type => type.value === caseType);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Case</DialogTitle>
          <DialogDescription>
            {customerName ? `Creating case for ${customerName}` : "Document a customer issue or request"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="case-type">Case Type *</Label>
            <Select value={caseType} onValueChange={setCaseType}>
              <SelectTrigger id="case-type" className="bg-background">
                <SelectValue placeholder="Select case type..." />
              </SelectTrigger>
              <SelectContent>
                {CASE_TYPES.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedCaseType && (
              <p className="text-xs text-muted-foreground mt-1">
                {selectedCaseType.description}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Brief summary of the issue"
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Priority *</Label>
            <Select value={priority} onValueChange={(value) => setPriority(value as any)}>
              <SelectTrigger id="priority" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed description of the issue, what the customer reported, troubleshooting steps taken..."
              className="min-h-[150px] bg-background"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Create Case
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
