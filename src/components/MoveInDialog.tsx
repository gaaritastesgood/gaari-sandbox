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
  MapPin, 
  CalendarIcon, 
  Zap, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Home,
  Building2,
  Power,
  Wrench,
  Mail,
  FileText,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MoveInDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = 1 | 2 | 3 | 4 | 5;

interface AddressData {
  streetAddress: string;
  unitNumber: string;
  city: string;
  zipCode: string;
  isValid: boolean;
  isServiceable: boolean;
}

interface ServiceStatus {
  isServiceOn: boolean | null;
  remoteActivationPossible: boolean | null;
  activationMethod: "remote" | "technician" | null;
}

interface BillingSetup {
  billingAddress: string;
  sameAsService: boolean;
  billDelivery: "email" | "paper";
  autoPay: boolean;
  email: string;
}

export function MoveInDialog({ open, onOpenChange }: MoveInDialogProps) {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isValidating, setIsValidating] = useState(false);
  
  // Step 1: Address
  const [addressData, setAddressData] = useState<AddressData>({
    streetAddress: "",
    unitNumber: "",
    city: "",
    zipCode: "",
    isValid: false,
    isServiceable: false,
  });
  
  // Step 2: Start Date
  const [startDate, setStartDate] = useState<Date | undefined>();
  const earliestDate = addDays(new Date(), 2);
  
  // Step 3: Service Status
  const [serviceStatus, setServiceStatus] = useState<ServiceStatus>({
    isServiceOn: null,
    remoteActivationPossible: null,
    activationMethod: null,
  });
  
  // Step 4: Billing
  const [billingSetup, setBillingSetup] = useState<BillingSetup>({
    billingAddress: "",
    sameAsService: true,
    billDelivery: "email",
    autoPay: false,
    email: "",
  });

  // Customer info (new customer)
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const resetForm = () => {
    setCurrentStep(1);
    setAddressData({
      streetAddress: "",
      unitNumber: "",
      city: "",
      zipCode: "",
      isValid: false,
      isServiceable: false,
    });
    setStartDate(undefined);
    setServiceStatus({
      isServiceOn: null,
      remoteActivationPossible: null,
      activationMethod: null,
    });
    setBillingSetup({
      billingAddress: "",
      sameAsService: true,
      billDelivery: "email",
      autoPay: false,
      email: "",
    });
    setCustomerName("");
    setCustomerPhone("");
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  const validateAddress = () => {
    setIsValidating(true);
    // Simulate API validation
    setTimeout(() => {
      const isValid = addressData.streetAddress.length > 5 && addressData.city.length > 2 && addressData.zipCode.length === 5;
      const isServiceable = isValid && Math.random() > 0.1; // 90% chance serviceable for demo
      setAddressData(prev => ({ ...prev, isValid, isServiceable }));
      setIsValidating(false);
      
      if (!isValid) {
        toast.error("Invalid address. Please check the details.");
      } else if (!isServiceable) {
        toast.error("Sorry, we cannot provide service at this location.");
      } else {
        toast.success("Address verified! Service is available.");
      }
    }, 1000);
  };

  const handleConfirmMoveIn = () => {
    toast.success("Move-in request submitted successfully!", {
      description: `Service will start on ${startDate ? format(startDate, "MMMM d, yyyy") : "the selected date"}.`
    });
    handleClose();
  };

  const canProceedStep1 = addressData.isValid && addressData.isServiceable && customerName.length > 2;
  const canProceedStep2 = startDate !== undefined;
  const canProceedStep3 = serviceStatus.isServiceOn !== null && 
    (serviceStatus.isServiceOn || serviceStatus.activationMethod !== null);
  const canProceedStep4 = billingSetup.billDelivery && 
    (billingSetup.billDelivery === "paper" || billingSetup.email.includes("@"));

  const steps = [
    { num: 1, label: "Address", icon: MapPin },
    { num: 2, label: "Start Date", icon: CalendarIcon },
    { num: 3, label: "Service Status", icon: Zap },
    { num: 4, label: "Billing", icon: CreditCard },
    { num: 5, label: "Confirm", icon: CheckCircle2 },
  ];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Home className="h-5 w-5" />
            New Customer Move-In
          </DialogTitle>
        </DialogHeader>

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
                  "h-0.5 w-8 mx-2 mt-[-16px]",
                  currentStep > step.num ? "bg-green-500" : "bg-muted"
                )} />
              )}
            </div>
          ))}
        </div>

        <Separator className="mb-4" />

        {/* Step 1: Confirm Service Address */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Customer Name *</Label>
              <Input
                id="customerName"
                placeholder="Full name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="customerPhone">Phone Number</Label>
              <Input
                id="customerPhone"
                placeholder="(555) 123-4567"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
              />
            </div>

            <Separator />

            <h3 className="font-semibold flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Service Address
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="streetAddress">Street Address *</Label>
              <Input
                id="streetAddress"
                placeholder="123 Main Street"
                value={addressData.streetAddress}
                onChange={(e) => setAddressData(prev => ({ 
                  ...prev, 
                  streetAddress: e.target.value,
                  isValid: false,
                  isServiceable: false 
                }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="unitNumber">Unit / Apartment Number</Label>
              <Input
                id="unitNumber"
                placeholder="Apt 2B (if applicable)"
                value={addressData.unitNumber}
                onChange={(e) => setAddressData(prev => ({ ...prev, unitNumber: e.target.value }))}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  placeholder="Springfield"
                  value={addressData.city}
                  onChange={(e) => setAddressData(prev => ({ 
                    ...prev, 
                    city: e.target.value,
                    isValid: false,
                    isServiceable: false 
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code *</Label>
                <Input
                  id="zipCode"
                  placeholder="12345"
                  maxLength={5}
                  value={addressData.zipCode}
                  onChange={(e) => setAddressData(prev => ({ 
                    ...prev, 
                    zipCode: e.target.value.replace(/\D/g, ''),
                    isValid: false,
                    isServiceable: false 
                  }))}
                />
              </div>
            </div>

            <Button 
              onClick={validateAddress} 
              variant="outline" 
              className="w-full"
              disabled={isValidating || !addressData.streetAddress || !addressData.city || addressData.zipCode.length !== 5}
            >
              {isValidating ? "Validating..." : "Verify Address"}
            </Button>

            {addressData.isValid && addressData.isServiceable && (
              <Card className="border-green-500 bg-green-50 dark:bg-green-950/20">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="font-medium">Address verified - Service available</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Step 2: Select Start Date */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              Select Service Start Date
            </h3>
            
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  <span className="text-sm text-muted-foreground">
                    Earliest available start date: <strong>{format(earliestDate, "MMMM d, yyyy")}</strong>
                  </span>
                </div>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "MMMM d, yyyy") : "Select start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      disabled={(date) => date < earliestDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </CardContent>
            </Card>

            {startDate && (
              <Card className="border-primary bg-primary/5">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 text-primary">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="font-medium">
                      Service will start on {format(startDate, "MMMM d, yyyy")}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Step 3: Service Status Decision Tree */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Service Status Check
            </h3>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Power className="h-4 w-4" />
                  Is electric service currently ON at this location?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={serviceStatus.isServiceOn === null ? "" : serviceStatus.isServiceOn ? "on" : "off"}
                  onValueChange={(val) => setServiceStatus(prev => ({
                    ...prev,
                    isServiceOn: val === "on",
                    remoteActivationPossible: val === "on" ? null : prev.remoteActivationPossible,
                    activationMethod: val === "on" ? null : prev.activationMethod,
                  }))}
                >
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50">
                    <RadioGroupItem value="on" id="service-on" />
                    <Label htmlFor="service-on" className="flex-1 cursor-pointer">
                      <span className="font-medium">Yes, service is ON</span>
                      <p className="text-sm text-muted-foreground">Building/unit already has active electric service</p>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50">
                    <RadioGroupItem value="off" id="service-off" />
                    <Label htmlFor="service-off" className="flex-1 cursor-pointer">
                      <span className="font-medium">No, service is OFF</span>
                      <p className="text-sm text-muted-foreground">No active electric service at this location</p>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {serviceStatus.isServiceOn === true && (
              <Card className="border-green-500 bg-green-50 dark:bg-green-950/20">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                    <CheckCircle2 className="h-5 w-5" />
                    <div>
                      <span className="font-medium">Service Transfer</span>
                      <p className="text-sm opacity-80">
                        Billing will be transferred to the new customer starting on {startDate ? format(startDate, "MMMM d, yyyy") : "the selected date"}.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {serviceStatus.isServiceOn === false && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Is remote activation possible?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={serviceStatus.remoteActivationPossible === null ? "" : serviceStatus.remoteActivationPossible ? "yes" : "no"}
                    onValueChange={(val) => setServiceStatus(prev => ({
                      ...prev,
                      remoteActivationPossible: val === "yes",
                      activationMethod: val === "yes" ? "remote" : "technician",
                    }))}
                  >
                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50">
                      <RadioGroupItem value="yes" id="remote-yes" />
                      <Label htmlFor="remote-yes" className="flex-1 cursor-pointer">
                        <span className="font-medium flex items-center gap-2">
                          <Zap className="h-4 w-4 text-green-500" />
                          Yes, remote activation available
                        </span>
                        <p className="text-sm text-muted-foreground">Service can be turned on remotely</p>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50">
                      <RadioGroupItem value="no" id="remote-no" />
                      <Label htmlFor="remote-no" className="flex-1 cursor-pointer">
                        <span className="font-medium flex items-center gap-2">
                          <Wrench className="h-4 w-4 text-amber-500" />
                          No, technician visit required
                        </span>
                        <p className="text-sm text-muted-foreground">A technician must physically activate service</p>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            )}

            {serviceStatus.activationMethod === "remote" && (
              <Card className="border-green-500 bg-green-50 dark:bg-green-950/20">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                    <Zap className="h-5 w-5" />
                    <div>
                      <span className="font-medium">Remote Activation</span>
                      <p className="text-sm opacity-80">
                        Service will be activated remotely on {startDate ? format(startDate, "MMMM d, yyyy") : "the selected date"}.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {serviceStatus.activationMethod === "technician" && (
              <Card className="border-amber-500 bg-amber-50 dark:bg-amber-950/20">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                    <Wrench className="h-5 w-5" />
                    <div>
                      <span className="font-medium">Technician Visit Required</span>
                      <p className="text-sm opacity-80">
                        A technician will be scheduled to activate service. Customer will receive appointment details.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Step 4: Billing Setup */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Billing Setup
            </h3>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Billing Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sameAsService"
                    checked={billingSetup.sameAsService}
                    onCheckedChange={(checked) => setBillingSetup(prev => ({
                      ...prev,
                      sameAsService: checked as boolean,
                      billingAddress: checked ? "" : prev.billingAddress,
                    }))}
                  />
                  <Label htmlFor="sameAsService">Same as service address</Label>
                </div>
                
                {!billingSetup.sameAsService && (
                  <Input
                    placeholder="Enter billing address"
                    value={billingSetup.billingAddress}
                    onChange={(e) => setBillingSetup(prev => ({ ...prev, billingAddress: e.target.value }))}
                  />
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Bill Delivery Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={billingSetup.billDelivery}
                  onValueChange={(val) => setBillingSetup(prev => ({ 
                    ...prev, 
                    billDelivery: val as "email" | "paper" 
                  }))}
                >
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50">
                    <RadioGroupItem value="email" id="bill-email" />
                    <Label htmlFor="bill-email" className="flex-1 cursor-pointer">
                      <span className="font-medium flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email (Paperless)
                      </span>
                      <p className="text-sm text-muted-foreground">Receive bills via email - faster and eco-friendly</p>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50">
                    <RadioGroupItem value="paper" id="bill-paper" />
                    <Label htmlFor="bill-paper" className="flex-1 cursor-pointer">
                      <span className="font-medium flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Paper Bill
                      </span>
                      <p className="text-sm text-muted-foreground">Receive physical bills by mail</p>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {billingSetup.billDelivery === "email" && (
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="customer@email.com"
                  value={billingSetup.email}
                  onChange={(e) => setBillingSetup(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
            )}

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="autoPay"
                    checked={billingSetup.autoPay}
                    onCheckedChange={(checked) => setBillingSetup(prev => ({ ...prev, autoPay: checked as boolean }))}
                  />
                  <Label htmlFor="autoPay" className="cursor-pointer">
                    <span className="font-medium">Enable Auto-Pay</span>
                    <p className="text-sm text-muted-foreground">Automatically pay bills on due date (can be set up later)</p>
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 5: Confirmation Summary */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Confirm Move-In Details
            </h3>

            <Card>
              <CardContent className="pt-4 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Customer</p>
                  <p className="font-medium">{customerName}</p>
                  {customerPhone && <p className="text-sm">{customerPhone}</p>}
                </div>

                <Separator />

                <div>
                  <p className="text-sm text-muted-foreground">Service Address</p>
                  <p className="font-medium">
                    {addressData.streetAddress}
                    {addressData.unitNumber && `, ${addressData.unitNumber}`}
                  </p>
                  <p className="text-sm">{addressData.city}, {addressData.zipCode}</p>
                </div>

                <Separator />

                <div>
                  <p className="text-sm text-muted-foreground">Start Date</p>
                  <p className="font-medium">{startDate ? format(startDate, "MMMM d, yyyy") : "Not selected"}</p>
                </div>

                <Separator />

                <div>
                  <p className="text-sm text-muted-foreground">Activation Method</p>
                  <div className="flex items-center gap-2">
                    {serviceStatus.isServiceOn ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Service Transfer (Already On)
                      </Badge>
                    ) : serviceStatus.activationMethod === "remote" ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Remote Activation
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        Technician Visit Required
                      </Badge>
                    )}
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-sm text-muted-foreground">Billing</p>
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">Delivery:</span> {billingSetup.billDelivery === "email" ? `Email (${billingSetup.email})` : "Paper"}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Auto-Pay:</span> {billingSetup.autoPay ? "Enabled" : "Not enabled"}
                    </p>
                  </div>
                </div>

                {serviceStatus.activationMethod === "technician" && (
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
          
          {currentStep < 5 ? (
            <Button
              onClick={() => setCurrentStep(prev => (prev + 1) as Step)}
              disabled={
                (currentStep === 1 && !canProceedStep1) ||
                (currentStep === 2 && !canProceedStep2) ||
                (currentStep === 3 && !canProceedStep3) ||
                (currentStep === 4 && !canProceedStep4)
              }
            >
              Continue
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleConfirmMoveIn} className="bg-green-600 hover:bg-green-700">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Confirm Move-In
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
