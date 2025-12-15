import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Gauge, ClipboardList, Calendar } from "lucide-react";

interface MeterRereadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerName?: string;
}

const PRIORITY_OPTIONS = [
  { value: "routine", label: "Routine", description: "5-7 business days" },
  { value: "priority", label: "Priority", description: "2-3 business days" },
  { value: "urgent", label: "Urgent", description: "Next business day" },
];

const WORK_ORDER_TYPES = [
  { 
    value: "meter_reread", 
    label: "Meter Re-read",
    icon: Gauge,
    description: "Dispatch technician to verify current meter reading"
  },
  { 
    value: "meter_test", 
    label: "Meter Test",
    icon: ClipboardList,
    description: "Full meter accuracy test and calibration check"
  },
];

export const MeterRereadDialog = ({ open, onOpenChange, customerName }: MeterRereadDialogProps) => {
  const [orderType, setOrderType] = useState("meter_reread");
  const [priority, setPriority] = useState("routine");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    const selectedType = WORK_ORDER_TYPES.find(t => t.value === orderType);
    const selectedPriority = PRIORITY_OPTIONS.find(p => p.value === priority);
    
    toast({
      title: "Work Order Created",
      description: `${selectedType?.label} scheduled with ${selectedPriority?.label} priority (${selectedPriority?.description})`,
    });

    // Reset form
    setOrderType("meter_reread");
    setPriority("routine");
    setNotes("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create Work Order</DialogTitle>
          <DialogDescription>
            {customerName ? `Schedule field service for ${customerName}` : "Schedule meter re-read or test"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-4">
          {/* Work Order Type */}
          <div className="space-y-3">
            <Label>Work Order Type</Label>
            <div className="space-y-2">
              {WORK_ORDER_TYPES.map(type => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setOrderType(type.value)}
                    className={`w-full flex items-start gap-3 p-3 rounded-lg border text-left transition-colors ${
                      orderType === type.value 
                        ? "border-primary bg-primary/5" 
                        : "border-border bg-background hover:bg-muted"
                    }`}
                  >
                    <Icon className={`h-5 w-5 mt-0.5 ${orderType === type.value ? "text-primary" : "text-muted-foreground"}`} />
                    <div>
                      <div className={`font-medium text-sm ${orderType === type.value ? "text-primary" : "text-foreground"}`}>
                        {type.label}
                      </div>
                      <div className="text-xs text-muted-foreground">{type.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Priority */}
          <div className="space-y-3">
            <Label>Priority</Label>
            <RadioGroup value={priority} onValueChange={setPriority} className="flex gap-2">
              {PRIORITY_OPTIONS.map(option => (
                <label
                  key={option.value}
                  className={`flex-1 flex flex-col items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                    priority === option.value 
                      ? "border-primary bg-primary/5" 
                      : "border-border bg-background hover:bg-muted"
                  }`}
                >
                  <RadioGroupItem value={option.value} className="sr-only" />
                  <span className={`text-sm font-medium ${priority === option.value ? "text-primary" : "text-foreground"}`}>
                    {option.label}
                  </span>
                  <span className="text-xs text-muted-foreground">{option.description}</span>
                </label>
              ))}
            </RadioGroup>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add details for the field technician..."
              className="min-h-[80px] bg-background"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            <Calendar className="h-4 w-4 mr-1.5" />
            Schedule Work Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
