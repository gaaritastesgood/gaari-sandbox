import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { FileWarning, CreditCard, Wrench, Settings } from "lucide-react";

interface CaseCreationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerId?: string;
  customerName?: string;
  defaultCaseType?: string;
}

const CASE_TYPES = [
  { value: "high_bill", label: "High Bill", icon: FileWarning },
  { value: "service_problems", label: "Service Problems", icon: Wrench },
  { value: "payment", label: "Payment", icon: CreditCard },
  { value: "account_management", label: "Account Management", icon: Settings },
];

export const CaseCreationDialog = ({ open, onOpenChange, customerName, defaultCaseType }: CaseCreationDialogProps) => {
  const [caseType, setCaseType] = useState(defaultCaseType || "");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (open) {
      if (defaultCaseType) {
        setCaseType(defaultCaseType);
      }
    } else {
      setCaseType("");
      setDescription("");
    }
  }, [open, defaultCaseType]);

  const handleSubmit = () => {
    if (!caseType) {
      toast({
        title: "Missing Information",
        description: "Please select a case type",
        variant: "destructive"
      });
      return;
    }

    const selectedType = CASE_TYPES.find(t => t.value === caseType);
    toast({
      title: "Case Created",
      description: `${selectedType?.label} case has been created successfully`,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create Case</DialogTitle>
          <DialogDescription>
            {customerName ? `Creating case for ${customerName}` : "Select a case type"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Case Type</Label>
            <div className="grid grid-cols-2 gap-2">
              {CASE_TYPES.map(type => {
                const Icon = type.icon;
                const isSelected = caseType === type.value;
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setCaseType(type.value)}
                    className={`flex items-center gap-2 p-3 rounded-lg border text-left transition-colors ${
                      isSelected
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background hover:bg-muted"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Notes (optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add any additional details..."
              className="min-h-[80px] bg-background"
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
