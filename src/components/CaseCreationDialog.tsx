import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { FileText, CreditCard, Wrench, Settings, ArrowLeft, ChevronRight } from "lucide-react";

interface CaseCreationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerId?: string;
  customerName?: string;
  defaultCaseType?: string;
}

const CASE_TYPES = [
  { 
    value: "billing", 
    label: "Billing", 
    icon: FileText,
    subOptions: [
      { value: "high_bill", label: "High Bill Investigation" },
      { value: "bill_correction", label: "Bill Correction" },
      { value: "rebill_request", label: "Rebill Request" },
      { value: "billing_dispute", label: "Billing Dispute" },
    ]
  },
  { 
    value: "payment", 
    label: "Payment", 
    icon: CreditCard,
    subOptions: [
      { value: "payment_arrangement", label: "Payment Arrangement" },
      { value: "refund_request", label: "Refund Request" },
      { value: "payment_issue", label: "Payment Issue" },
      { value: "deposit_inquiry", label: "Deposit Inquiry" },
    ]
  },
  { 
    value: "service_problems", 
    label: "Service Problems", 
    icon: Wrench,
    subOptions: [
      { value: "outage_report", label: "Outage Report" },
      { value: "meter_issue", label: "Meter Issue" },
      { value: "voltage_problem", label: "Voltage Problem" },
      { value: "service_quality", label: "Service Quality Complaint" },
    ]
  },
  { 
    value: "account_management", 
    label: "Account Management", 
    icon: Settings,
    subOptions: [
      { value: "name_change", label: "Name Change" },
      { value: "address_update", label: "Address Update" },
      { value: "start_service", label: "Start Service" },
      { value: "stop_service", label: "Stop Service" },
    ]
  },
];

export const CaseCreationDialog = ({ open, onOpenChange, customerName, defaultCaseType }: CaseCreationDialogProps) => {
  const [caseType, setCaseType] = useState<string | null>(null);
  const [subOption, setSubOption] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (open) {
      if (defaultCaseType) {
        // Check if defaultCaseType is a main category
        const mainCategory = CASE_TYPES.find(t => t.value === defaultCaseType);
        if (mainCategory) {
          setCaseType(defaultCaseType);
          setSubOption("");
        } else {
          setCaseType(null);
          setSubOption("");
        }
      } else {
        setCaseType(null);
        setSubOption("");
      }
      setDescription("");
    }
  }, [open, defaultCaseType]);

  const handleSubmit = () => {
    if (!caseType || !subOption) {
      toast({
        title: "Missing Information",
        description: "Please select an option",
        variant: "destructive"
      });
      return;
    }

    const selectedType = CASE_TYPES.find(t => t.value === caseType);
    const selectedSubOption = selectedType?.subOptions.find(s => s.value === subOption);
    
    toast({
      title: "Case Created",
      description: `${selectedSubOption?.label} case has been created successfully`,
    });

    onOpenChange(false);
  };

  const handleBack = () => {
    if (subOption) {
      setSubOption("");
    } else if (caseType) {
      // Only allow going back if we didn't come from a default case type
      if (!defaultCaseType) {
        setCaseType(null);
      }
    }
  };

  const selectedTypeData = CASE_TYPES.find(t => t.value === caseType);
  const showBackButton = (caseType && !defaultCaseType) || subOption;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            {showBackButton && (
              <Button variant="ghost" size="sm" onClick={handleBack} className="-ml-2">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <div>
              <DialogTitle>
                {!caseType ? "Create Case" : selectedTypeData?.label}
              </DialogTitle>
              <DialogDescription>
                {customerName ? `Creating case for ${customerName}` : "Select an option to continue"}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Step 1: Select Case Type */}
          {!caseType && (
            <div className="space-y-2">
              <Label>Case Type</Label>
              <div className="grid grid-cols-2 gap-2">
                {CASE_TYPES.map(type => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setCaseType(type.value)}
                      className="flex items-center justify-between gap-2 p-3 rounded-lg border border-border bg-background hover:bg-muted text-left transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <span className="text-sm font-medium">{type.label}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Select Sub-Option */}
          {caseType && !subOption && selectedTypeData && (
            <div className="space-y-2">
              <Label>Select {selectedTypeData.label} Issue</Label>
              <div className="space-y-2">
                {selectedTypeData.subOptions.map(option => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSubOption(option.value)}
                    className="w-full flex items-center justify-between p-3 rounded-lg border border-border bg-background hover:bg-muted text-left transition-colors"
                  >
                    <span className="text-sm font-medium">{option.label}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Notes */}
          {caseType && subOption && (
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-3 border border-border">
                <div className="text-xs text-muted-foreground">Case Type</div>
                <div className="font-medium text-foreground">
                  {selectedTypeData?.label} → {selectedTypeData?.subOptions.find(s => s.value === subOption)?.label}
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
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          {caseType && subOption && (
            <Button onClick={handleSubmit}>
              Create Case
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
