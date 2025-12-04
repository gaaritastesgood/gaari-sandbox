import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CustomerProgramEligibility } from "@/types/customer";
import { toast } from "@/hooks/use-toast";
import { DollarSign, CheckCircle, Zap } from "lucide-react";

interface ProgramEnrollmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  program: CustomerProgramEligibility;
  customerName: string;
}

export const ProgramEnrollmentDialog = ({
  open,
  onOpenChange,
  program,
  customerName,
}: ProgramEnrollmentDialogProps) => {
  const [contactMethod, setContactMethod] = useState("");
  const [contractorPreference, setContractorPreference] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (!contactMethod) {
      toast({
        title: "Missing Information",
        description: "Please select a preferred contact method.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Enrollment Initiated",
      description: `${customerName} has been enrolled in ${program.programName}. Confirmation will be sent via ${contactMethod}.`,
    });
    onOpenChange(false);
    
    // Reset form
    setContactMethod("");
    setContractorPreference("");
    setScheduleDate("");
    setNotes("");
  };

  const getLikelihoodStyles = (likelihood: string) => {
    switch (likelihood) {
      case "high":
        return "bg-status-success-bg text-status-success";
      case "medium":
        return "bg-status-warning-bg text-status-warning";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Program Enrollment
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Program Summary */}
          <Card className="p-4 bg-muted/30 border-border">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-foreground">{program.programName}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Enrolling: {customerName}
                </p>
              </div>
              <Badge variant="outline" className={getLikelihoodStyles(program.likelihood)}>
                {program.likelihood} fit
              </Badge>
            </div>
            <div className="flex items-center gap-1 mt-3 text-status-success">
              <DollarSign className="h-4 w-4" />
              <span className="text-sm font-medium">
                Est. ${program.estimatedSavings}/year savings
              </span>
            </div>
          </Card>

          {/* Eligibility Reason */}
          <div>
            <Label className="text-sm font-medium">Why Eligible</Label>
            <div className="mt-1.5 text-sm text-muted-foreground bg-muted/50 rounded-md p-3">
              {program.sources[0]?.description || "Customer meets program criteria based on usage analysis."}
            </div>
          </div>

          {/* Enrollment Form */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="contact-method">Preferred Contact Method *</Label>
              <Select value={contactMethod} onValueChange={setContactMethod}>
                <SelectTrigger id="contact-method" className="mt-1.5">
                  <SelectValue placeholder="Select contact method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="phone">Phone Call</SelectItem>
                  <SelectItem value="sms">SMS/Text</SelectItem>
                  <SelectItem value="mail">Physical Mail</SelectItem>
                  <SelectItem value="portal">Customer Portal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(program.programName.includes("Rebate") || 
              program.programName.includes("Insulation") ||
              program.programName.includes("Tune-Up")) && (
              <div>
                <Label htmlFor="contractor">Contractor Preference</Label>
                <Select value={contractorPreference} onValueChange={setContractorPreference}>
                  <SelectTrigger id="contractor" className="mt-1.5">
                    <SelectValue placeholder="Select contractor (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">No preference - assign available</SelectItem>
                    <SelectItem value="greentech">GreenTech HVAC Services</SelectItem>
                    <SelectItem value="ecoinstall">Eco Install Pros</SelectItem>
                    <SelectItem value="energywise">EnergyWise Contractors</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <Label htmlFor="schedule">Preferred Assessment Date</Label>
              <Input
                id="schedule"
                type="date"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any special instructions or customer preferences..."
                className="mt-1.5 min-h-[80px]"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="gap-1">
            <CheckCircle className="h-4 w-4" />
            Submit Enrollment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
