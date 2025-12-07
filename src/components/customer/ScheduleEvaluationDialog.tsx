import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ClipboardCheck, Calendar, Clock, User } from "lucide-react";
import { OpportunityItem } from "@/data/kamDashboardData";
import { toast } from "sonner";

interface ScheduleEvaluationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  opportunity: OpportunityItem | null;
  customerName: string;
  customerPhone?: string;
}

export const ScheduleEvaluationDialog = ({ 
  open, 
  onOpenChange, 
  opportunity, 
  customerName,
  customerPhone 
}: ScheduleEvaluationDialogProps) => {
  const [evaluationType, setEvaluationType] = useState<string>("hvac_assessment");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState<string>("");
  const [technicianType, setTechnicianType] = useState<string>("");
  const [contactPhone, setContactPhone] = useState(customerPhone || "");
  const [accessInstructions, setAccessInstructions] = useState("");
  const [notifyCustomer, setNotifyCustomer] = useState(true);
  const [includeQuote, setIncludeQuote] = useState(true);

  if (!opportunity) return null;

  const evaluationTypes = [
    { value: "hvac_assessment", label: "HVAC System Assessment", duration: "1-2 hours" },
    { value: "heat_pump_sizing", label: "Heat Pump Sizing & Feasibility", duration: "2-3 hours" },
    { value: "energy_audit", label: "Full Home Energy Audit", duration: "3-4 hours" },
    { value: "duct_inspection", label: "Ductwork Inspection", duration: "1 hour" },
  ];

  const timeSlots = [
    { value: "morning", label: "Morning (8am - 12pm)" },
    { value: "afternoon", label: "Afternoon (12pm - 5pm)" },
    { value: "evening", label: "Evening (5pm - 8pm)" },
  ];

  const technicianTypes = [
    { value: "utility_tech", label: "Utility Technician" },
    { value: "certified_contractor", label: "Certified HVAC Contractor" },
    { value: "energy_auditor", label: "Energy Auditor" },
  ];

  const selectedEvaluation = evaluationTypes.find(e => e.value === evaluationType);

  const handleSchedule = () => {
    if (!preferredDate || !preferredTime || !technicianType) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success(`Evaluation scheduled for ${customerName}`, {
      description: `${selectedEvaluation?.label} on ${preferredDate} (${timeSlots.find(t => t.value === preferredTime)?.label})`,
    });
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setEvaluationType("hvac_assessment");
    setPreferredDate("");
    setPreferredTime("");
    setTechnicianType("");
    setAccessInstructions("");
    setNotifyCustomer(true);
    setIncludeQuote(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5 text-primary" />
            <DialogTitle>Schedule Heating System Evaluation</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Context Card */}
          <Card className="p-3 bg-muted/50">
            <div className="text-sm font-medium text-foreground">{customerName}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {opportunity.opportunityName} • {opportunity.estimatedSavings}
            </div>
          </Card>

          {/* Evaluation Type */}
          <div className="space-y-2">
            <Label>Evaluation Type</Label>
            <Select value={evaluationType} onValueChange={setEvaluationType}>
              <SelectTrigger>
                <SelectValue placeholder="Select evaluation type" />
              </SelectTrigger>
              <SelectContent>
                {evaluationTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex justify-between items-center gap-4">
                      <span>{type.label}</span>
                      <span className="text-xs text-muted-foreground">~{type.duration}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedEvaluation && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>Estimated duration: {selectedEvaluation.duration}</span>
              </div>
            )}
          </div>

          {/* Technician Type */}
          <div className="space-y-2">
            <Label>Technician / Contractor</Label>
            <Select value={technicianType} onValueChange={setTechnicianType}>
              <SelectTrigger>
                <SelectValue placeholder="Select who to send" />
              </SelectTrigger>
              <SelectContent>
                {technicianTypes.map((tech) => (
                  <SelectItem key={tech.value} value={tech.value}>
                    <div className="flex items-center gap-2">
                      <User className="h-3 w-3" />
                      <span>{tech.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Preferred Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="pl-10"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Time Slot</Label>
              <Select value={preferredTime} onValueChange={setPreferredTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot.value} value={slot.value}>
                      {slot.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Contact Phone */}
          <div className="space-y-2">
            <Label>Contact Phone for Appointment</Label>
            <Input
              type="tel"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="(555) 123-4567"
            />
          </div>

          {/* Access Instructions */}
          <div className="space-y-2">
            <Label>Access Instructions (Optional)</Label>
            <Textarea
              placeholder="e.g., Gate code, parking instructions, where to find equipment..."
              value={accessInstructions}
              onChange={(e) => setAccessInstructions(e.target.value)}
              rows={2}
            />
          </div>

          {/* Options */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="notify" 
                checked={notifyCustomer} 
                onCheckedChange={(checked) => setNotifyCustomer(checked as boolean)}
              />
              <Label htmlFor="notify" className="text-sm cursor-pointer">
                Send appointment confirmation to customer
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="quote" 
                checked={includeQuote} 
                onCheckedChange={(checked) => setIncludeQuote(checked as boolean)}
              />
              <Label htmlFor="quote" className="text-sm cursor-pointer">
                Include equipment upgrade quote with assessment
              </Label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSchedule} disabled={!preferredDate || !preferredTime || !technicianType}>
            <ClipboardCheck className="h-4 w-4 mr-2" />
            Schedule Evaluation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};