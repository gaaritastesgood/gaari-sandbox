import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { format, addDays } from "date-fns";
import { 
  CalendarIcon, 
  FileText, 
  Power, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  LogOut,
  Mail,
  Smartphone,
  Zap,
  Wrench,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MoveOutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerName?: string;
  customerAddress?: string;
}

type Step = 1 | 2 | 3 | 4;

interface FinalBillSetup {
  forwardingAddress: string;
  sameAsService: boolean;
  deliveryPreference: "email" | "paper" | "electronic";
  email: string;
  phone: string;
}

interface ServiceAction {
  action: "leave_on" | "remote_disconnect" | "field_disconnect" | null;
}

export function MoveOutDialog({ open, onOpenChange, customerName, customerAddress }: MoveOutDialogProps) {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  
  // Step 1: Move-out Date
  const [moveOutDate, setMoveOutDate] = useState<Date | undefined>();
  const earliestDate = addDays(new Date(), 1);
  
  // Step 2: Final Bill Setup
  const [finalBillSetup, setFinalBillSetup] = useState<FinalBillSetup>({
    forwardingAddress: "",
    sameAsService: false,
    deliveryPreference: "email",
    email: "",
    phone: "",
  });
  
  // Step 3: Service Action
  const [serviceAction, setServiceAction] = useState<ServiceAction>({
    action: null,
  });

  const resetForm = () => {
    setCurrentStep(1);
    setMoveOutDate(undefined);
    setFinalBillSetup({
      forwardingAddress: "",
      sameAsService: false,
      deliveryPreference: "email",
      email: "",
      phone: "",
    });
    setServiceAction({
      action: null,
    });
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  const handleConfirmMoveOut = () => {
    toast.success("Move-out request submitted successfully!", {
      description: `Service will end on ${moveOutDate ? format(moveOutDate, "MMMM d, yyyy") : "the selected date"}.`
    });
    handleClose();
  };

  const canProceedStep1 = moveOutDate !== undefined;
  const canProceedStep2 = finalBillSetup.deliveryPreference && 
    (finalBillSetup.deliveryPreference === "paper" 
      ? (finalBillSetup.sameAsService || finalBillSetup.forwardingAddress.length > 5)
      : finalBillSetup.deliveryPreference === "email" 
        ? finalBillSetup.email.includes("@")
        : finalBillSetup.phone.length >= 10);
  const canProceedStep3 = serviceAction.action !== null;

  const steps = [
    { num: 1, label: "Move-Out Date", icon: CalendarIcon },
    { num: 2, label: "Final Bill", icon: FileText },
    { num: 3, label: "Service", icon: Power },
    { num: 4, label: "Confirm", icon: CheckCircle2 },
  ];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <LogOut className="h-5 w-5" />
            Customer Move-Out
          </DialogTitle>
        </DialogHeader>

        {customerName && (
          <div className="bg-muted/50 rounded-lg p-3 mb-2">
            <p className="text-sm text-muted-foreground">Customer</p>
            <p className="font-medium">{customerName}</p>
            {customerAddress && <p className="text-sm text-muted-foreground">{customerAddress}</p>}
          </div>
        )}

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-6 px-2">
          {steps.map((step, idx) => (
            <div key={step.num} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center transition-colors",
                  currentStep === step.num 
                    ? "bg-primary text-primary-foreground" 
                    : currentStep > step.num 
                      ? "bg-green-500 text-white"
                      : "bg-muted text-muted-foreground"
                )}>
                  {currentStep > step.num ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
                <span className={cn(
                  "text-xs mt-1 font-medium",
                  currentStep === step.num ? "text-primary" : "text-muted-foreground"
                )}>
                  {step.label}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div className={cn(
                  "h-0.5 w-12 mx-2 mt-[-16px]",
                  currentStep > step.num ? "bg-green-500" : "bg-muted"
                )} />
              )}
            </div>
          ))}
        </div>

        <Separator className="mb-4" />

        {/* Step 1: Confirm Move-Out Date */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              When is the customer moving out?
            </h3>
            
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  <span className="text-sm text-muted-foreground">
                    Earliest available move-out date: <strong>{format(earliestDate, "MMMM d, yyyy")}</strong>
                  </span>
                </div>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !moveOutDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {moveOutDate ? format(moveOutDate, "MMMM d, yyyy") : "Select move-out date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={moveOutDate}
                      onSelect={setMoveOutDate}
                      disabled={(date) => date < earliestDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </CardContent>
            </Card>

            {moveOutDate && (
              <Card className="border-primary bg-primary/5">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 text-primary">
                    <CheckCircle2 className="h-5 w-5" />
                    <div>
                      <span className="font-medium">Charges will stop on {format(moveOutDate, "MMMM d, yyyy")}</span>
                      <p className="text-sm opacity-80">Final meter reading will be taken on this date.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Step 2: Final Bill Setup */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Final Bill Delivery
            </h3>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">How should we send the final bill?</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={finalBillSetup.deliveryPreference}
                  onValueChange={(val) => setFinalBillSetup(prev => ({ 
                    ...prev, 
                    deliveryPreference: val as "email" | "paper" | "electronic" 
                  }))}
                >
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50">
                    <RadioGroupItem value="email" id="final-email" />
                    <Label htmlFor="final-email" className="flex-1 cursor-pointer">
                      <span className="font-medium flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email
                      </span>
                      <p className="text-sm text-muted-foreground">Receive final bill via email</p>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50">
                    <RadioGroupItem value="paper" id="final-paper" />
                    <Label htmlFor="final-paper" className="flex-1 cursor-pointer">
                      <span className="font-medium flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Paper Mail
                      </span>
                      <p className="text-sm text-muted-foreground">Receive physical final bill by mail</p>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50">
                    <RadioGroupItem value="electronic" id="final-electronic" />
                    <Label htmlFor="final-electronic" className="flex-1 cursor-pointer">
                      <span className="font-medium flex items-center gap-2">
                        <Smartphone className="h-4 w-4" />
                        Electronic (SMS/Text)
                      </span>
                      <p className="text-sm text-muted-foreground">Receive final bill notification via text</p>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {finalBillSetup.deliveryPreference === "email" && (
              <div className="space-y-2">
                <Label htmlFor="finalEmail">Email Address *</Label>
                <Input
                  id="finalEmail"
                  type="email"
                  placeholder="customer@email.com"
                  value={finalBillSetup.email}
                  onChange={(e) => setFinalBillSetup(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
            )}

            {finalBillSetup.deliveryPreference === "electronic" && (
              <div className="space-y-2">
                <Label htmlFor="finalPhone">Phone Number *</Label>
                <Input
                  id="finalPhone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={finalBillSetup.phone}
                  onChange={(e) => setFinalBillSetup(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
            )}

            {finalBillSetup.deliveryPreference === "paper" && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Forwarding Address for Final Bill</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sameAsService"
                      checked={finalBillSetup.sameAsService}
                      onCheckedChange={(checked) => setFinalBillSetup(prev => ({
                        ...prev,
                        sameAsService: checked as boolean,
                        forwardingAddress: checked ? "" : prev.forwardingAddress,
                      }))}
                    />
                    <Label htmlFor="sameAsService">Send to current service address</Label>
                  </div>
                  
                  {!finalBillSetup.sameAsService && (
                    <Input
                      placeholder="Enter new/forwarding address"
                      value={finalBillSetup.forwardingAddress}
                      onChange={(e) => setFinalBillSetup(prev => ({ ...prev, forwardingAddress: e.target.value }))}
                    />
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Step 3: Service Action */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Power className="h-4 w-4" />
              What should happen to the electric service?
            </h3>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Service Status After Move-Out</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Typically, billing stops but electricity service stays connected. Select the appropriate action:
                </p>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={serviceAction.action || ""}
                  onValueChange={(val) => setServiceAction({ action: val as "leave_on" | "remote_disconnect" | "field_disconnect" })}
                >
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 border mb-2">
                    <RadioGroupItem value="leave_on" id="leave-on" />
                    <Label htmlFor="leave-on" className="flex-1 cursor-pointer">
                      <span className="font-medium flex items-center gap-2">
                        <Zap className="h-4 w-4 text-green-500" />
                        Leave Service ON
                      </span>
                      <p className="text-sm text-muted-foreground">
                        Stop billing for this customer, but keep electricity connected (most common)
                      </p>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 border mb-2">
                    <RadioGroupItem value="remote_disconnect" id="remote-disconnect" />
                    <Label htmlFor="remote-disconnect" className="flex-1 cursor-pointer">
                      <span className="font-medium flex items-center gap-2">
                        <Power className="h-4 w-4 text-amber-500" />
                        Remote Disconnect
                      </span>
                      <p className="text-sm text-muted-foreground">
                        Disconnect electricity remotely (if smart meter supports it)
                      </p>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 border">
                    <RadioGroupItem value="field_disconnect" id="field-disconnect" />
                    <Label htmlFor="field-disconnect" className="flex-1 cursor-pointer">
                      <span className="font-medium flex items-center gap-2">
                        <Wrench className="h-4 w-4 text-red-500" />
                        Field Disconnect (Send Technician)
                      </span>
                      <p className="text-sm text-muted-foreground">
                        Schedule a technician to physically disconnect service
                      </p>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {serviceAction.action === "leave_on" && (
              <Card className="border-green-500 bg-green-50 dark:bg-green-950/20">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                    <Zap className="h-5 w-5" />
                    <div>
                      <span className="font-medium">Service Will Remain Active</span>
                      <p className="text-sm opacity-80">
                        Billing will stop on {moveOutDate ? format(moveOutDate, "MMMM d, yyyy") : "the move-out date"}, but power will stay on for the next occupant.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {serviceAction.action === "remote_disconnect" && (
              <Card className="border-amber-500 bg-amber-50 dark:bg-amber-950/20">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                    <Power className="h-5 w-5" />
                    <div>
                      <span className="font-medium">Remote Disconnect Scheduled</span>
                      <p className="text-sm opacity-80">
                        Service will be remotely disconnected on {moveOutDate ? format(moveOutDate, "MMMM d, yyyy") : "the move-out date"}.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {serviceAction.action === "field_disconnect" && (
              <Card className="border-red-500 bg-red-50 dark:bg-red-950/20">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                    <Wrench className="h-5 w-5" />
                    <div>
                      <span className="font-medium">Technician Visit Required</span>
                      <p className="text-sm opacity-80">
                        A technician will be scheduled to disconnect service. Customer will receive appointment details.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Step 4: Confirmation Summary */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Confirm Move-Out Details
            </h3>

            <Card>
              <CardContent className="pt-4 space-y-4">
                {customerName && (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground">Customer</p>
                      <p className="font-medium">{customerName}</p>
                    </div>
                    <Separator />
                  </>
                )}

                <div>
                  <p className="text-sm text-muted-foreground">Move-Out Date</p>
                  <p className="font-medium">{moveOutDate ? format(moveOutDate, "MMMM d, yyyy") : "Not selected"}</p>
                  <p className="text-sm text-green-600">Charges will stop on this date</p>
                </div>

                <Separator />

                <div>
                  <p className="text-sm text-muted-foreground">Final Bill Delivery</p>
                  <div className="space-y-1">
                    <p className="font-medium capitalize">{finalBillSetup.deliveryPreference}</p>
                    {finalBillSetup.deliveryPreference === "email" && (
                      <p className="text-sm">{finalBillSetup.email}</p>
                    )}
                    {finalBillSetup.deliveryPreference === "electronic" && (
                      <p className="text-sm">{finalBillSetup.phone}</p>
                    )}
                    {finalBillSetup.deliveryPreference === "paper" && (
                      <p className="text-sm">
                        {finalBillSetup.sameAsService ? "Current service address" : finalBillSetup.forwardingAddress}
                      </p>
                    )}
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-sm text-muted-foreground">Service After Move-Out</p>
                  <div className="flex items-center gap-2 mt-1">
                    {serviceAction.action === "leave_on" ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <Zap className="h-3 w-3 mr-1" />
                        Leave Service ON
                      </Badge>
                    ) : serviceAction.action === "remote_disconnect" ? (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        <Power className="h-3 w-3 mr-1" />
                        Remote Disconnect
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        <Wrench className="h-3 w-3 mr-1" />
                        Field Disconnect
                      </Badge>
                    )}
                  </div>
                </div>

                {serviceAction.action === "field_disconnect" && (
                  <>
                    <Separator />
                    <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                      <p className="text-sm text-amber-700 dark:text-amber-400">
                        <strong>Note:</strong> A technician appointment will be scheduled. The customer will receive a call to confirm the appointment time.
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => currentStep === 1 ? handleClose() : setCurrentStep(prev => (prev - 1) as Step)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {currentStep === 1 ? "Cancel" : "Back"}
          </Button>
          
          {currentStep < 4 ? (
            <Button
              onClick={() => setCurrentStep(prev => (prev + 1) as Step)}
              disabled={
                (currentStep === 1 && !canProceedStep1) ||
                (currentStep === 2 && !canProceedStep2) ||
                (currentStep === 3 && !canProceedStep3)
              }
            >
              Continue
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleConfirmMoveOut} className="bg-green-600 hover:bg-green-700">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Confirm Move-Out
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
