import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { FileText, CreditCard, Wrench, Settings, ArrowLeft, ChevronRight, Calendar, ClipboardList, MessageSquare, DollarSign, CheckCircle2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

interface CaseCreationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerId?: string;
  customerName?: string;
  defaultCaseType?: string;
}

const BILLING_SUB_OPTIONS = [
  { 
    value: "estimated_catchup", 
    label: "Estimated / Catch-up Bill",
    description: "Customer received estimated bills followed by a catch-up bill based on actual meter reading",
    explanation: "Your recent bill is higher because we were unable to read your meter for the past few billing cycles and provided estimated bills. Now that we have an actual meter reading, this bill reflects your true usage during that period.",
    allowsPaymentPlan: true
  },
  { 
    value: "meter_reading_error", 
    label: "Meter Reading Error",
    description: "Suspected incorrect meter reading causing billing discrepancy",
    explanation: "We've identified a potential error in your meter reading. We're scheduling a meter re-read to verify the accuracy of your current bill.",
    allowsWorkOrder: true
  },
  { 
    value: "extended_billing_period", 
    label: "Extended Billing Period",
    description: "Bill covers more than the standard billing cycle duration",
    explanation: "Your bill covers an extended period due to a billing cycle adjustment. This means more days of usage are included than a typical monthly bill.",
    allowsPaymentPlan: true
  },
];

const PAYMENT_PLAN_OPTIONS = [
  { value: "3_months", label: "3 months", installments: 3 },
  { value: "6_months", label: "6 months", installments: 6 },
  { value: "12_months", label: "12 months", installments: 12 },
];

const CASE_TYPES = [
  { 
    value: "billing_account", 
    label: "Billing & Account Inquiries", 
    icon: FileText,
    subOptions: [
      ...BILLING_SUB_OPTIONS.map(o => ({ value: o.value, label: o.label })),
      { value: "payment_arrangement", label: "Payment Arrangement" },
      { value: "refund_request", label: "Refund Request" },
      { value: "payment_issue", label: "Payment Issue" },
      { value: "deposit_inquiry", label: "Deposit Inquiry" },
    ]
  },
  { 
    value: "service_issues", 
    label: "Service Issues", 
    icon: Wrench,
    subOptions: [
      { value: "outage_report", label: "Outage Report" },
      { value: "meter_issue", label: "Meter Issue" },
      { value: "voltage_problem", label: "Voltage Problem" },
      { value: "service_quality", label: "Service Quality Complaint" },
    ]
  },
  { 
    value: "service_requests", 
    label: "Service Requests / Changes", 
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
  
  // Billing-specific states
  const [createWorkOrder, setCreateWorkOrder] = useState(false);
  const [setupPaymentPlan, setSetupPaymentPlan] = useState(false);
  const [paymentPlanDuration, setPaymentPlanDuration] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [sendExplanation, setSendExplanation] = useState(false);
  const [explanationMethod, setExplanationMethod] = useState("email");

  useEffect(() => {
    if (open) {
      if (defaultCaseType) {
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
      setCreateWorkOrder(false);
      setSetupPaymentPlan(false);
      setPaymentPlanDuration("");
      setDownPayment("");
      setSendExplanation(false);
      setExplanationMethod("email");
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
    
    let successMessage = `${selectedSubOption?.label} case has been created successfully`;
    
    if (createWorkOrder) {
      successMessage += ". Meter re-read work order scheduled.";
    }
    if (setupPaymentPlan && paymentPlanDuration) {
      const plan = PAYMENT_PLAN_OPTIONS.find(p => p.value === paymentPlanDuration);
      successMessage += `. Payment plan set up for ${plan?.label}.`;
    }
    if (sendExplanation) {
      successMessage += ` Explanation sent via ${explanationMethod}.`;
    }
    
    toast({
      title: "Case Created",
      description: successMessage,
    });

    onOpenChange(false);
  };

  const handleBack = () => {
    if (subOption) {
      setSubOption("");
      setCreateWorkOrder(false);
      setSetupPaymentPlan(false);
      setPaymentPlanDuration("");
      setDownPayment("");
      setSendExplanation(false);
    } else if (caseType) {
      if (!defaultCaseType) {
        setCaseType(null);
      }
    }
  };

  const selectedTypeData = CASE_TYPES.find(t => t.value === caseType);
  const selectedBillingOption = BILLING_SUB_OPTIONS.find(o => o.value === subOption);
  const showBackButton = (caseType && !defaultCaseType) || subOption;
  const isBillingCase = caseType === "billing";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
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
                {isBillingCase ? (
                  BILLING_SUB_OPTIONS.map(option => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setSubOption(option.value)}
                      className="w-full flex flex-col items-start p-3 rounded-lg border border-border bg-background hover:bg-muted text-left transition-colors"
                    >
                      <div className="w-full flex items-center justify-between">
                        <span className="text-sm font-medium">{option.label}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">{option.description}</span>
                    </button>
                  ))
                ) : (
                  selectedTypeData.subOptions.map(option => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setSubOption(option.value)}
                      className="w-full flex items-center justify-between p-3 rounded-lg border border-border bg-background hover:bg-muted text-left transition-colors"
                    >
                      <span className="text-sm font-medium">{option.label}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </button>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Step 3: Billing Case Details */}
          {caseType && subOption && isBillingCase && selectedBillingOption && (
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-3 border border-border">
                <div className="text-xs text-muted-foreground">Case Type</div>
                <div className="font-medium text-foreground">{selectedBillingOption.label}</div>
              </div>

              {/* Customer Explanation */}
              <div className="rounded-lg border border-border bg-background p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  <Label className="font-medium">Customer Explanation</Label>
                </div>
                
                <div className="bg-muted/30 rounded-md p-3 text-sm text-muted-foreground italic border-l-2 border-primary/30">
                  "{selectedBillingOption.explanation}"
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <Switch
                      id="send-explanation"
                      checked={sendExplanation}
                      onCheckedChange={setSendExplanation}
                    />
                    <Label htmlFor="send-explanation" className="text-sm">Send explanation to customer</Label>
                  </div>
                </div>

                {sendExplanation && (
                  <div className="flex gap-2 pt-1">
                    <Button
                      type="button"
                      size="sm"
                      variant={explanationMethod === "email" ? "default" : "outline"}
                      onClick={() => setExplanationMethod("email")}
                      className="flex-1"
                    >
                      Email
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant={explanationMethod === "sms" ? "default" : "outline"}
                      onClick={() => setExplanationMethod("sms")}
                      className="flex-1"
                    >
                      SMS
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant={explanationMethod === "letter" ? "default" : "outline"}
                      onClick={() => setExplanationMethod("letter")}
                      className="flex-1"
                    >
                      Letter
                    </Button>
                  </div>
                )}
              </div>

              {/* Meter Re-read Work Order (for meter reading error) */}
              {selectedBillingOption.allowsWorkOrder && (
                <div className="rounded-lg border border-border bg-background p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <ClipboardList className="h-4 w-4 text-primary" />
                    <Label className="font-medium">Meter Re-read Work Order</Label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Schedule a field technician to verify meter reading
                    </div>
                    <Switch
                      id="work-order"
                      checked={createWorkOrder}
                      onCheckedChange={setCreateWorkOrder}
                    />
                  </div>

                  {createWorkOrder && (
                    <div className="bg-green-500/10 border border-green-500/20 rounded-md p-3 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-700">Work order will be created upon case submission</span>
                    </div>
                  )}
                </div>
              )}

              {/* Payment Plan (for catch-up and extended billing) */}
              {selectedBillingOption.allowsPaymentPlan && (
                <div className="rounded-lg border border-border bg-background p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <Label className="font-medium">Payment Plan</Label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Set up installment plan for customer
                    </div>
                    <Switch
                      id="payment-plan"
                      checked={setupPaymentPlan}
                      onCheckedChange={setSetupPaymentPlan}
                    />
                  </div>

                  {setupPaymentPlan && (
                    <div className="space-y-3 pt-2">
                      <div className="space-y-2">
                        <Label className="text-sm">Payment Duration</Label>
                        <Select value={paymentPlanDuration} onValueChange={setPaymentPlanDuration}>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            {PAYMENT_PLAN_OPTIONS.map(option => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label} ({option.installments} installments)
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm">Down Payment (optional)</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                          <Input
                            type="number"
                            value={downPayment}
                            onChange={(e) => setDownPayment(e.target.value)}
                            placeholder="0.00"
                            className="pl-7 bg-background"
                          />
                        </div>
                      </div>

                      {paymentPlanDuration && (
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-md p-3">
                          <div className="text-sm text-blue-700">
                            <span className="font-medium">Plan Summary:</span> Balance will be split into {PAYMENT_PLAN_OPTIONS.find(p => p.value === paymentPlanDuration)?.installments} equal payments
                            {downPayment && parseFloat(downPayment) > 0 && ` after $${parseFloat(downPayment).toFixed(2)} down payment`}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="description">Additional Notes (optional)</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add any additional details..."
                  className="min-h-[60px] bg-background"
                />
              </div>
            </div>
          )}

          {/* Step 3: Non-Billing Case Notes */}
          {caseType && subOption && !isBillingCase && (
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
