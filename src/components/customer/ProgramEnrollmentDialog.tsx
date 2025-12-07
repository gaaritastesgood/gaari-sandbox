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
import { Checkbox } from "@/components/ui/checkbox";
import { CustomerProgramEligibility } from "@/types/customer";
import { toast } from "@/hooks/use-toast";
import { DollarSign, CheckCircle, Zap, Home, Users, Calendar } from "lucide-react";

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
  // Contact & Scheduling
  const [contactMethod, setContactMethod] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [preferredTimeSlot, setPreferredTimeSlot] = useState("");
  const [alternatePhone, setAlternatePhone] = useState("");
  
  // Property Information
  const [homeOwnership, setHomeOwnership] = useState("");
  const [homeType, setHomeType] = useState("");
  const [homeAge, setHomeAge] = useState("");
  const [squareFootage, setSquareFootage] = useState("");
  const [numberOfOccupants, setNumberOfOccupants] = useState("");
  
  // Current Equipment (for HVAC/energy programs)
  const [hasExistingHVAC, setHasExistingHVAC] = useState(false);
  const [hvacAge, setHvacAge] = useState("");
  const [heatingType, setHeatingType] = useState("");
  const [coolingType, setCoolingType] = useState("");
  
  // Contractor & Installation
  const [contractorPreference, setContractorPreference] = useState("");
  const [installationWindow, setInstallationWindow] = useState("");
  
  // Consent & Notes
  const [consentToContact, setConsentToContact] = useState(false);
  const [consentToAudit, setConsentToAudit] = useState(false);
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

    if (!homeOwnership) {
      toast({
        title: "Missing Information",
        description: "Please confirm home ownership status.",
        variant: "destructive",
      });
      return;
    }

    if (!consentToContact) {
      toast({
        title: "Consent Required",
        description: "Please confirm consent to be contacted about this program.",
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
    setScheduleDate("");
    setPreferredTimeSlot("");
    setAlternatePhone("");
    setHomeOwnership("");
    setHomeType("");
    setHomeAge("");
    setSquareFootage("");
    setNumberOfOccupants("");
    setHasExistingHVAC(false);
    setHvacAge("");
    setHeatingType("");
    setCoolingType("");
    setContractorPreference("");
    setInstallationWindow("");
    setConsentToContact(false);
    setConsentToAudit(false);
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

  const isHVACProgram = program.programName.includes("Rebate") || 
    program.programName.includes("HVAC") ||
    program.programName.includes("Tune-Up") ||
    program.programName.includes("Heat Pump");

  const isInsulationProgram = program.programName.includes("Insulation") ||
    program.programName.includes("Weatherization");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Program Enrollment
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
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

          {/* Contact Information Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground border-b border-border pb-2">
              <Users className="h-4 w-4" />
              Contact Information
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contact-method">Preferred Contact Method *</Label>
                <Select value={contactMethod} onValueChange={setContactMethod}>
                  <SelectTrigger id="contact-method" className="mt-1.5">
                    <SelectValue placeholder="Select method" />
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

              <div>
                <Label htmlFor="alternate-phone">Alternate Phone</Label>
                <Input
                  id="alternate-phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={alternatePhone}
                  onChange={(e) => setAlternatePhone(e.target.value)}
                  className="mt-1.5"
                />
              </div>
            </div>
          </div>

          {/* Property Information Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground border-b border-border pb-2">
              <Home className="h-4 w-4" />
              Property Information
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="home-ownership">Ownership Status *</Label>
                <Select value={homeOwnership} onValueChange={setHomeOwnership}>
                  <SelectTrigger id="home-ownership" className="mt-1.5">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="owner">Owner</SelectItem>
                    <SelectItem value="renter">Renter</SelectItem>
                    <SelectItem value="landlord">Landlord (property owner)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="home-type">Home Type</Label>
                <Select value={homeType} onValueChange={setHomeType}>
                  <SelectTrigger id="home-type" className="mt-1.5">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single-family">Single Family</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="condo">Condo/Apartment</SelectItem>
                    <SelectItem value="mobile">Mobile/Manufactured</SelectItem>
                    <SelectItem value="multi-family">Multi-Family (2-4 units)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="home-age">Year Built / Age</Label>
                <Select value={homeAge} onValueChange={setHomeAge}>
                  <SelectTrigger id="home-age" className="mt-1.5">
                    <SelectValue placeholder="Select age range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pre-1950">Before 1950</SelectItem>
                    <SelectItem value="1950-1979">1950-1979</SelectItem>
                    <SelectItem value="1980-1999">1980-1999</SelectItem>
                    <SelectItem value="2000-2009">2000-2009</SelectItem>
                    <SelectItem value="2010-present">2010-Present</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="square-footage">Approximate Sq. Ft.</Label>
                <Select value={squareFootage} onValueChange={setSquareFootage}>
                  <SelectTrigger id="square-footage" className="mt-1.5">
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-1000">Under 1,000</SelectItem>
                    <SelectItem value="1000-1500">1,000 - 1,500</SelectItem>
                    <SelectItem value="1500-2000">1,500 - 2,000</SelectItem>
                    <SelectItem value="2000-2500">2,000 - 2,500</SelectItem>
                    <SelectItem value="2500-3000">2,500 - 3,000</SelectItem>
                    <SelectItem value="over-3000">Over 3,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="occupants">Number of Occupants</Label>
                <Select value={numberOfOccupants} onValueChange={setNumberOfOccupants}>
                  <SelectTrigger id="occupants" className="mt-1.5">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5+">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Current Equipment Section (for HVAC programs) */}
          {isHVACProgram && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground border-b border-border pb-2">
                Current HVAC Equipment
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <Checkbox 
                  id="has-hvac" 
                  checked={hasExistingHVAC}
                  onCheckedChange={(checked) => setHasExistingHVAC(checked as boolean)}
                />
                <Label htmlFor="has-hvac" className="text-sm cursor-pointer">
                  Customer has existing central HVAC system
                </Label>
              </div>

              {hasExistingHVAC && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hvac-age">Existing System Age</Label>
                    <Select value={hvacAge} onValueChange={setHvacAge}>
                      <SelectTrigger id="hvac-age" className="mt-1.5">
                        <SelectValue placeholder="Select age" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-5">0-5 years</SelectItem>
                        <SelectItem value="6-10">6-10 years</SelectItem>
                        <SelectItem value="11-15">11-15 years</SelectItem>
                        <SelectItem value="16-20">16-20 years</SelectItem>
                        <SelectItem value="20+">Over 20 years</SelectItem>
                        <SelectItem value="unknown">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="heating-type">Primary Heating Type</Label>
                    <Select value={heatingType} onValueChange={setHeatingType}>
                      <SelectTrigger id="heating-type" className="mt-1.5">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gas-furnace">Gas Furnace</SelectItem>
                        <SelectItem value="electric-furnace">Electric Furnace</SelectItem>
                        <SelectItem value="heat-pump">Heat Pump</SelectItem>
                        <SelectItem value="boiler">Boiler</SelectItem>
                        <SelectItem value="baseboard">Electric Baseboard</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="cooling-type">Primary Cooling Type</Label>
                    <Select value={coolingType} onValueChange={setCoolingType}>
                      <SelectTrigger id="cooling-type" className="mt-1.5">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="central-ac">Central A/C</SelectItem>
                        <SelectItem value="heat-pump">Heat Pump</SelectItem>
                        <SelectItem value="window-unit">Window Unit(s)</SelectItem>
                        <SelectItem value="mini-split">Mini-Split</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Scheduling Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground border-b border-border pb-2">
              <Calendar className="h-4 w-4" />
              Scheduling Preferences
            </div>
            
            <div className="grid grid-cols-2 gap-4">
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
                <Label htmlFor="time-slot">Preferred Time Slot</Label>
                <Select value={preferredTimeSlot} onValueChange={setPreferredTimeSlot}>
                  <SelectTrigger id="time-slot" className="mt-1.5">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (8am-12pm)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12pm-5pm)</SelectItem>
                    <SelectItem value="evening">Evening (5pm-8pm)</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(isHVACProgram || isInsulationProgram) && (
                <>
                  <div>
                    <Label htmlFor="contractor">Contractor Preference</Label>
                    <Select value={contractorPreference} onValueChange={setContractorPreference}>
                      <SelectTrigger id="contractor" className="mt-1.5">
                        <SelectValue placeholder="Select contractor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">No preference - assign available</SelectItem>
                        <SelectItem value="greentech">GreenTech HVAC Services</SelectItem>
                        <SelectItem value="ecoinstall">Eco Install Pros</SelectItem>
                        <SelectItem value="energywise">EnergyWise Contractors</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="install-window">Installation Window</Label>
                    <Select value={installationWindow} onValueChange={setInstallationWindow}>
                      <SelectTrigger id="install-window" className="mt-1.5">
                        <SelectValue placeholder="Select window" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asap">As soon as possible</SelectItem>
                        <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
                        <SelectItem value="2-4-weeks">2-4 weeks</SelectItem>
                        <SelectItem value="1-2-months">1-2 months</SelectItem>
                        <SelectItem value="flexible">Flexible timing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Consent & Notes Section */}
          <div className="space-y-3">
            <div className="space-y-3 bg-muted/30 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Checkbox 
                  id="consent-contact" 
                  checked={consentToContact}
                  onCheckedChange={(checked) => setConsentToContact(checked as boolean)}
                />
                <Label htmlFor="consent-contact" className="text-sm cursor-pointer leading-relaxed">
                  Customer consents to be contacted regarding this program enrollment and related offers *
                </Label>
              </div>

              <div className="flex items-start gap-2">
                <Checkbox 
                  id="consent-audit" 
                  checked={consentToAudit}
                  onCheckedChange={(checked) => setConsentToAudit(checked as boolean)}
                />
                <Label htmlFor="consent-audit" className="text-sm cursor-pointer leading-relaxed">
                  Customer agrees to home energy audit/assessment if required by program
                </Label>
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Access instructions, pets on premises, equipment concerns, special requests..."
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
