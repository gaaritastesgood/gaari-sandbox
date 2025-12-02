import { useState } from "react";
import { mockPrograms } from "@/data/programsData";
import { ProgramCard } from "./ProgramCard";
import { ProgramDetailView } from "./ProgramDetailView";
import { OpportunityGroupDetail } from "./OpportunityGroupDetail";
import { Program, OpportunityGroup } from "@/data/programsData";

export const ProgramsTab = () => {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<OpportunityGroup | null>(null);

  if (selectedGroup) {
    return (
      <OpportunityGroupDetail 
        group={selectedGroup}
        onBack={() => setSelectedGroup(null)}
      />
    );
  }

  if (selectedProgram) {
    return (
      <ProgramDetailView 
        program={selectedProgram}
        onBack={() => setSelectedProgram(null)}
        onSelectGroup={setSelectedGroup}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Program Overview</h2>
        <p className="text-sm text-muted-foreground">Click a program to view opportunity groups and take action</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockPrograms.map(program => (
          <ProgramCard
            key={program.id}
            program={program}
            onClick={() => setSelectedProgram(program)}
          />
        ))}
      </div>
    </div>
  );
};
