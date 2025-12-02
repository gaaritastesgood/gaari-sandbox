import { Program, OpportunityGroup, mockOpportunityGroups } from "@/data/programsData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Target, TrendingUp, ChevronRight } from "lucide-react";

interface ProgramDetailViewProps {
  program: Program;
  onBack: () => void;
  onSelectGroup: (group: OpportunityGroup) => void;
}

export const ProgramDetailView = ({ program, onBack, onSelectGroup }: ProgramDetailViewProps) => {
  const groups = mockOpportunityGroups
    .filter(g => g.programId === program.id)
    .sort((a, b) => b.expectedConversionMax - a.expectedConversionMax);

  return (
    <div className="space-y-4">
      {/* Back button */}
      <Button variant="ghost" size="sm" onClick={onBack} className="gap-1 -ml-2">
        <ArrowLeft className="h-4 w-4" />
        Back to Programs
      </Button>

      {/* Program Summary Header */}
      <Card className="p-5 bg-card">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">{program.name}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {program.percentToGoal}% toward target • {program.targetEnrollment.toLocaleString()} goal
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{program.percentToGoal}%</div>
            <p className="text-xs text-muted-foreground">to goal</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 pt-5 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">Currently Enrolled</p>
            <p className="text-xl font-semibold text-foreground">{program.currentEnrollment.toLocaleString()}</p>
            <p className="text-xs text-emerald-600">+{program.enrolledChange} this month</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Eligible Customers</p>
            <p className="text-xl font-semibold text-foreground">{program.eligibleCustomers.toLocaleString()}</p>
            <p className="text-xs text-blue-600">+{program.eligibleChange} new</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Conversion Potential</p>
            <p className="text-xl font-semibold text-foreground">
              {Math.round((program.eligibleCustomers - program.currentEnrollment) * 0.18).toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">est. at 18% rate</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Gap to Goal</p>
            <p className="text-xl font-semibold text-foreground">
              {(program.targetEnrollment - program.currentEnrollment).toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">customers needed</p>
          </div>
        </div>
      </Card>

      {/* Opportunity Groups */}
      <div>
        <h3 className="text-base font-semibold text-foreground mb-3">Opportunity Groups</h3>
        <p className="text-sm text-muted-foreground mb-4">Segments ranked by conversion likelihood</p>
        
        <div className="space-y-3">
          {groups.map((group, index) => (
            <Card 
              key={group.id} 
              className="p-4 hover:shadow-md transition-all hover:border-primary/50 cursor-pointer bg-card"
              onClick={() => onSelectGroup(group)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                      #{index + 1}
                    </span>
                    <h4 className="font-medium text-foreground">{group.name}</h4>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span className="text-muted-foreground">
                      <Users className="h-3.5 w-3.5 inline mr-1" />
                      {group.eligibilityCount.toLocaleString()} customers
                    </span>
                    <span className="text-emerald-600">
                      ${group.estimatedAnnualSavings.toLocaleString()}/yr savings
                    </span>
                    <span className="text-primary">
                      {group.expectedConversionMin}–{group.expectedConversionMax}% conv.
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {group.topSignals.map((signal, i) => (
                      <span 
                        key={i}
                        className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded"
                      >
                        {signal}
                      </span>
                    ))}
                  </div>
                </div>
                
                <Button variant="ghost" size="sm" className="shrink-0">
                  View Group
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
