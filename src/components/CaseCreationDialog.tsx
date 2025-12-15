import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { FileText, CreditCard, Wrench, Settings, ArrowLeft, ChevronRight, Calendar, ClipboardList, MessageSquare, DollarSign, CheckCircle2, MapPin, AlertTriangle, Clock, Zap, Users, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
    ]
  },
  { 
    value: "service_issues", 
    label: "Outage / Service Issue",
    icon: Wrench,
    subOptions: [
      { value: "outage_report", label: "Outage Report" },
    ]
  },
  { 
    value: "service_requests", 
    label: "Service Requests / Changes", 
    icon: Settings,
    subOptions: [
      { value: "address_update", label: "Address Update" },
      { value: "move_in", label: "Move In" },
      { value: "move_out", label: "Move Out" },
    ]
  },
];

// Outage workflow steps
type OutageStep = "address_confirm" | "checking" | "new_outage_questions" | "known_outage_questions" | "complete";

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

  // Outage-specific states
  const [outageStep, setOutageStep] = useState<OutageStep>("address_confirm");
  const [addressConfirmed, setAddressConfirmed] = useState(false);
  const [isKnownOutage, setIsKnownOutage] = useState(false);
  const [outageStartTime, setOutageStartTime] = useState("");
  const [serviceStatus, setServiceStatus] = useState<"full" | "partial" | "">("");
  const [hasSafetyHazards, setHasSafetyHazards] = useState<"yes" | "no" | "">("");
  const [neighborsAffected, setNeighborsAffected] = useState<"yes" | "no" | "not_sure" | "">("");

  // Mock customer address
  const customerAddress = "1234 Oak Street, Apt 5B, Springfield, IL 62701";

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
      // Reset outage states
      setOutageStep("address_confirm");
      setAddressConfirmed(false);
      setIsKnownOutage(false);
      setOutageStartTime("");
      setServiceStatus("");
      setHasSafetyHazards("");
      setNeighborsAffected("");
    }
  }, [open, defaultCaseType]);

  const handleAddressConfirm = () => {
    setAddressConfirmed(true);
    setOutageStep("checking");
    
    // Simulate checking for known outages (50% chance for demo)
    setTimeout(() => {
      const hasKnownOutage = Math.random() > 0.5;
      setIsKnownOutage(hasKnownOutage);
      setOutageStep(hasKnownOutage ? "known_outage_questions" : "new_outage_questions");
    }, 1500);
  };

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
    
    // Outage-specific success message
    if (subOption === "outage_report") {
      if (isKnownOutage) {
        successMessage = "Outage report submitted. Your information has been added to the existing outage case.";
        if (hasSafetyHazards === "yes") {
          successMessage += " Safety team has been notified of the hazard.";
        }
      } else {
        successMessage = "New outage reported and sent to response teams.";
        if (hasSafetyHazards === "yes") {
          successMessage += " Safety team has been dispatched.";
        }
      }
    } else {
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
    }
    
    toast({
      title: "Case Created",
      description: successMessage,
    });

    onOpenChange(false);
  };

  const handleBack = () => {
    // Handle outage workflow back navigation
    if (subOption === "outage_report") {
      if (outageStep === "new_outage_questions" || outageStep === "known_outage_questions") {
        setOutageStep("address_confirm");
        setAddressConfirmed(false);
        setIsKnownOutage(false);
        return;
      } else if (outageStep === "address_confirm") {
        setSubOption("");
        setOutageStep("address_confirm");
        return;
      }
    }
    
    if (subOption) {
      setSubOption("");
      setCreateWorkOrder(false);
      setSetupPaymentPlan(false);
      setPaymentPlanDuration("");
      setDownPayment("");
      setSendExplanation(false);
      // Reset outage states
      setOutageStep("address_confirm");
      setAddressConfirmed(false);
      setIsKnownOutage(false);
      setOutageStartTime("");
      setServiceStatus("");
      setHasSafetyHazards("");
      setNeighborsAffected("");
    } else if (caseType) {
      if (!defaultCaseType) {
        setCaseType(null);
      }
    }
  };

  const isOutageQuestionsComplete = () => {
    if (isKnownOutage) {
      return hasSafetyHazards !== "";
    } else {
      return outageStartTime !== "" && serviceStatus !== "" && hasSafetyHazards !== "" && neighborsAffected !== "";
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

          {/* Step 3: Outage Report Workflow */}
          {caseType && subOption === "outage_report" && (
            <div className="space-y-4">
              {/* Address Confirmation Step */}
              {outageStep === "address_confirm" && (
                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-3 border border-border">
                    <div className="text-xs text-muted-foreground">Case Type</div>
                    <div className="font-medium text-foreground">Outage / Service Issue → Outage Report</div>
                  </div>

                  <div className="rounded-lg border border-border bg-background p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <Label className="font-medium">Confirm Service Address</Label>
                    </div>
                    
                    <div className="bg-muted/30 rounded-md p-3 text-sm">
                      <div className="font-medium text-foreground">{customerAddress}</div>
                    </div>

                    <Button 
                      className="w-full" 
                      onClick={handleAddressConfirm}
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Confirm Address & Check Outage Status
                    </Button>
                  </div>
                </div>
              )}

              {/* Checking for Known Outages */}
              {outageStep === "checking" && (
                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-3 border border-border">
                    <div className="text-xs text-muted-foreground">Case Type</div>
                    <div className="font-medium text-foreground">Outage / Service Issue → Outage Report</div>
                  </div>

                  <div className="rounded-lg border border-border bg-background p-6 flex flex-col items-center justify-center space-y-3">
                    <Loader2 className="h-8 w-8 text-primary animate-spin" />
                    <div className="text-sm text-muted-foreground text-center">
                      Checking for known outages in your area...
                    </div>
                  </div>
                </div>
              )}

              {/* New Outage Questionnaire */}
              {outageStep === "new_outage_questions" && (
                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-3 border border-border">
                    <div className="text-xs text-muted-foreground">Case Type</div>
                    <div className="font-medium text-foreground">Outage / Service Issue → Outage Report</div>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 flex items-start gap-2">
                    <Zap className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-700">
                      <span className="font-medium">No known outage found.</span> Please provide details so we can dispatch a response team.
                    </div>
                  </div>

                  {/* When did outage start */}
                  <div className="rounded-lg border border-border bg-background p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <Label className="font-medium">When did the outage start, approximately?</Label>
                    </div>
                    <Select value={outageStartTime} onValueChange={setOutageStartTime}>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5_min">Last 5 minutes</SelectItem>
                        <SelectItem value="15_min">Last 15 minutes</SelectItem>
                        <SelectItem value="30_min">Last 30 minutes</SelectItem>
                        <SelectItem value="1_hour">Last hour</SelectItem>
                        <SelectItem value="2_hours">Last 2 hours</SelectItem>
                        <SelectItem value="longer">More than 2 hours ago</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Service status */}
                  <div className="rounded-lg border border-border bg-background p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      <Label className="font-medium">Is service completely out or partial?</Label>
                    </div>
                    <RadioGroup value={serviceStatus} onValueChange={(v) => setServiceStatus(v as "full" | "partial")}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="full" id="full" />
                        <Label htmlFor="full" className="font-normal cursor-pointer">Full outage (no power at all)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="partial" id="partial" />
                        <Label htmlFor="partial" className="font-normal cursor-pointer">Partial (flickering, low lights, intermittent)</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Safety hazards */}
                  <div className="rounded-lg border border-border bg-background p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                      <Label className="font-medium">Any safety hazards present?</Label>
                    </div>
                    <div className="text-xs text-muted-foreground">Downed power lines, exposed wires, fires, gas smell</div>
                    <RadioGroup value={hasSafetyHazards} onValueChange={(v) => setHasSafetyHazards(v as "yes" | "no")}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="hazard_yes" />
                        <Label htmlFor="hazard_yes" className="font-normal cursor-pointer">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="hazard_no" />
                        <Label htmlFor="hazard_no" className="font-normal cursor-pointer">No</Label>
                      </div>
                    </RadioGroup>
                    {hasSafetyHazards === "yes" && (
                      <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                        <span className="text-sm text-destructive">Safety team will be immediately notified</span>
                      </div>
                    )}
                  </div>

                  {/* Neighbors affected */}
                  <div className="rounded-lg border border-border bg-background p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <Label className="font-medium">Are neighbors affected?</Label>
                    </div>
                    <RadioGroup value={neighborsAffected} onValueChange={(v) => setNeighborsAffected(v as "yes" | "no" | "not_sure")}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="neighbors_yes" />
                        <Label htmlFor="neighbors_yes" className="font-normal cursor-pointer">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="neighbors_no" />
                        <Label htmlFor="neighbors_no" className="font-normal cursor-pointer">No</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="not_sure" id="neighbors_not_sure" />
                        <Label htmlFor="neighbors_not_sure" className="font-normal cursor-pointer">Not sure</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Additional Notes (optional)</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Any other details about the outage..."
                      className="min-h-[60px] bg-background"
                    />
                  </div>
                </div>
              )}

              {/* Known Outage - Abbreviated Questionnaire */}
              {outageStep === "known_outage_questions" && (
                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-3 border border-border">
                    <div className="text-xs text-muted-foreground">Case Type</div>
                    <div className="font-medium text-foreground">Outage / Service Issue → Outage Report</div>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                      <span className="font-medium text-amber-700">Known Outage in Your Area</span>
                    </div>
                    <div className="text-sm text-amber-700">
                      We're already aware of an outage affecting your area. Crews are working to restore service. 
                      Estimated restoration: <span className="font-medium">2-3 hours</span>
                    </div>
                  </div>

                  {/* Safety hazards check only */}
                  <div className="rounded-lg border border-border bg-background p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                      <Label className="font-medium">Any safety hazards present?</Label>
                    </div>
                    <div className="text-xs text-muted-foreground">Downed power lines, exposed wires, fires, gas smell</div>
                    <RadioGroup value={hasSafetyHazards} onValueChange={(v) => setHasSafetyHazards(v as "yes" | "no")}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="known_hazard_yes" />
                        <Label htmlFor="known_hazard_yes" className="font-normal cursor-pointer">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="known_hazard_no" />
                        <Label htmlFor="known_hazard_no" className="font-normal cursor-pointer">No</Label>
                      </div>
                    </RadioGroup>
                    {hasSafetyHazards === "yes" && (
                      <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                        <span className="text-sm text-destructive">Safety team will be immediately notified</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Additional Notes (optional)</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Any additional information to report..."
                      className="min-h-[60px] bg-background"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Other Non-Billing Case Notes */}
          {caseType && subOption && !isBillingCase && subOption !== "outage_report" && (
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
          {caseType && subOption && subOption !== "outage_report" && (
            <Button onClick={handleSubmit}>
              Create Case
            </Button>
          )}
          {subOption === "outage_report" && (outageStep === "new_outage_questions" || outageStep === "known_outage_questions") && (
            <Button 
              onClick={handleSubmit}
              disabled={!isOutageQuestionsComplete()}
            >
              {isKnownOutage ? "Submit Report" : "Report Outage"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
