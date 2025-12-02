import { ProgramPortfolio } from "./ProgramPortfolio";
import { OpportunityGroups } from "./OpportunityGroups";
import { ActionCenter } from "./ActionCenter";

export const ProgramIntelligence = () => {
  return (
    <div className="p-4 space-y-6">
      <ProgramPortfolio />
      <OpportunityGroups />
      <ActionCenter />
    </div>
  );
};
