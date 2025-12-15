import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { FileText, CreditCard, Wrench, Settings, ArrowLeft, ChevronRight, Calendar, ClipboardList, MessageSquare, DollarSign, CheckCircle2, MapPin, AlertTriangle, Clock, Zap, Users, Loader2, Gauge } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MeterRereadDialog } from "@/components/MeterRereadDialog";
import { MoveOutDialog } from "@/components/MoveOutDialog";

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
  { 
    value: "payment_arrangement", 
    label: "Payment Arrangement",
    description: "Customer requesting to set up a payment plan for outstanding balance",
    explanation: "We can help you set up a payment plan to spread your balance across 3-12 monthly installments.",
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
    subOptions: BILLING_SUB_OPTIONS.map(o => ({ value: o.value, label: o.label }))
  },
  { 
    value: "outage_report", 
    label: "Outage Report",
    icon: Wrench,
    directAction: true
  },
  { 
    value: "move_out", 
    label: "Move Out", 
    icon: Settings,
    directAction: true
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
  const [billingActionSelected, setBillingActionSelected] = useState(false);
  const [showMeterRereadDialog, setShowMeterRereadDialog] = useState(false);
  const [showMoveOutDialog, setShowMoveOutDialog] = useState(false);

  // Outage-specific states
  const [outageStep, setOutageStep] = useState<OutageStep>("address_confirm");
  const [addressConfirmed, setAddressConfirmed] = useState(false);
  const [isKnownOutage, setIsKnownOutage] = useState(false);
  const [outageStartTime, setOutageStartTime] = useState("");
  const [serviceStatus, setServiceStatus] = useState<"full" | "partial" | "">("");
  const [hasSafetyHazards, setHasSafetyHazards] = useState<"yes" | "no" | "">("");
  const [neighborsAffected, setNeighborsAffected] = useState<"yes" | "no" | "not_sure" | "">("");

  // Address state - editable
  const defaultAddress = "1234 Oak Street, Apt 5B, Springfield, IL 62701";
  const [customerAddress, setCustomerAddress] = useState(defaultAddress);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

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
    
// Handle billing action step back navigation
    if (subOption && isBillingCase && billingActionSelected) {
      setBillingActionSelected(false);
      setCreateWorkOrder(false);
      setSetupPaymentPlan(false);
      setPaymentPlanDuration("");
      setDownPayment("");
      setSendExplanation(false);
      return;
    }
    
    if (subOption) {
      setSubOption("");
      setCreateWorkOrder(false);
      setSetupPaymentPlan(false);
      setPaymentPlanDuration("");
      setDownPayment("");
      setSendExplanation(false);
      setBillingActionSelected(false);
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
  const showBackButton = (caseType && !defaultCaseType) || subOption || billingActionSelected;
  const isBillingCase = caseType === "billing_account";

  return (
    <>
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
                      onClick={() => {
                        if (type.value === "move_out") {
                          setShowMoveOutDialog(true);
                        } else if (type.value === "outage_report") {
                          setCaseType("outage_report");
                          setSubOption("outage_report");
                        } else {
                          setCaseType(type.value);
                        }
                      }}
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

          {/* Step 2: Select Sub-Option (only for case types with subOptions) */}
          {caseType && !subOption && selectedTypeData && selectedTypeData.subOptions && (
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
                      onClick={() => {
                        if (option.value === "move_out") {
                          setShowMoveOutDialog(true);
                        } else {
                          setSubOption(option.value);
                        }
                      }}
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

          {/* Step 3a: Billing Action Items Menu */}
          {caseType && subOption && isBillingCase && selectedBillingOption && !billingActionSelected && (
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-3 border border-border">
                <div className="text-xs text-muted-foreground">Case Type</div>
                <div className="font-medium text-foreground">{selectedBillingOption.label}</div>
              </div>

              <div className="bg-muted/30 rounded-md p-3 text-sm text-muted-foreground italic border-l-2 border-primary/30">
                "{selectedBillingOption.explanation}"
              </div>

              <div className="space-y-2">
                <Label className="font-medium">Select Action</Label>
                
                {/* Meter Reading Error Actions */}
                {selectedBillingOption.allowsWorkOrder && (
                  <button
                    type="button"
                    onClick={() => setShowMeterRereadDialog(true)}
                    className="w-full flex items-center justify-between p-4 rounded-lg border border-border bg-background hover:bg-muted text-left transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-primary/10">
                        <Gauge className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">Create Meter Reread / Work Order</div>
                        <div className="text-xs text-muted-foreground">Schedule a field technician to verify meter reading or inspect equipment</div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                )}

                {/* Payment Plan Actions (for catch-up and extended billing) */}
                {selectedBillingOption.allowsPaymentPlan && (
                  <button
                    type="button"
                    onClick={() => {
                      setSetupPaymentPlan(true);
                      setBillingActionSelected(true);
                    }}
                    className="w-full flex items-center justify-between p-4 rounded-lg border border-border bg-background hover:bg-muted text-left transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-green-500/10">
                        <DollarSign className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">Offer Payment Plan</div>
                        <div className="text-xs text-muted-foreground">Split balance into 3-12 monthly installments</div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Step 3b: Billing Case Details (after action selected) */}
          {caseType && subOption && isBillingCase && selectedBillingOption && billingActionSelected && (
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-3 border border-border">
                <div className="text-xs text-muted-foreground">Case Type</div>
                <div className="font-medium text-foreground">{selectedBillingOption.label}</div>
              </div>

              {/* Show selected action confirmation */}
              {createWorkOrder && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-md p-3 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-700">
                    {selectedBillingOption.allowsWorkOrder ? "Work order will be created upon case submission" : "Action selected"}
                  </span>
                </div>
              )}

              {/* Payment Plan Details */}
              {setupPaymentPlan && (
                <div className="rounded-lg border border-border bg-background p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <Label className="font-medium">Payment Plan Setup</Label>
                  </div>
                  
                  <div className="space-y-3">
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
                </div>
              )}

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
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <Label className="font-medium">Confirm Service Address</Label>
                      </div>
                      {!isEditingAddress && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setIsEditingAddress(true)}
                          className="text-xs h-7"
                        >
                          Edit
                        </Button>
                      )}
                    </div>
                    
                    {isEditingAddress ? (
                      <div className="space-y-2">
                        <Textarea
                          value={customerAddress}
                          onChange={(e) => setCustomerAddress(e.target.value)}
                          placeholder="Enter service address..."
                          className="min-h-[60px] bg-background text-sm"
                        />
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setIsEditingAddress(false);
                              setCustomerAddress(defaultAddress);
                            }}
                            className="flex-1"
                          >
                            Cancel
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => setIsEditingAddress(false)}
                            className="flex-1"
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-muted/30 rounded-md p-3 text-sm">
                        <div className="font-medium text-foreground">{customerAddress}</div>
                      </div>
                    )}

                    <Button 
                      className="w-full" 
                      onClick={handleAddressConfirm}
                      disabled={isEditingAddress || !customerAddress.trim()}
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

                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                      <span className="font-medium text-amber-700">Known Outage in Your Area</span>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <span className="text-amber-600 font-medium min-w-[100px]">Cause:</span>
                        <span className="text-amber-700">Severe thunderstorm with high winds caused damage to transmission lines</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-amber-600 font-medium min-w-[100px]">Status:</span>
                        <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-300">Crews dispatched</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-amber-600 font-medium min-w-[100px]">Est. Restoration:</span>
                        <span className="text-amber-700 font-medium">Today by 6:00 PM</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-amber-600 font-medium min-w-[100px]">Reported at:</span>
                        <span className="text-amber-700">2:15 PM</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-amber-600 font-medium min-w-[100px]">Affected:</span>
                        <span className="text-amber-700">1,247 customers</span>
                      </div>
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
          {caseType && subOption && subOption !== "outage_report" && (!isBillingCase || billingActionSelected) && (
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

    <MeterRereadDialog
      open={showMeterRereadDialog}
      onOpenChange={(open) => {
        setShowMeterRereadDialog(open);
        if (!open) {
          onOpenChange(false);
        }
      }}
      customerName={customerName}
    />

    <MoveOutDialog
      open={showMoveOutDialog}
      onOpenChange={(open) => {
        setShowMoveOutDialog(open);
        if (!open) {
          onOpenChange(false);
        }
      }}
      customerName={customerName}
    />
  </>
  );
};
