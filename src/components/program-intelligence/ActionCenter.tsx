import { mockActions } from "@/data/programMockData";
import { ActionCard } from "./ActionCard";
import { Zap, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const ActionCenter = () => {
  const [filter, setFilter] = useState<'All' | 'High' | 'Medium' | 'Low'>('All');

  const filteredActions = filter === 'All' 
    ? mockActions 
    : mockActions.filter(a => a.priority === filter);

  const highPriorityCount = mockActions.filter(a => a.priority === 'High').length;

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Recommended Actions</h2>
          {highPriorityCount > 0 && (
            <Badge className="bg-destructive/10 text-destructive text-[10px]">
              {highPriorityCount} High Priority
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Filter className="h-3 w-3 text-muted-foreground mr-1" />
          {(['All', 'High', 'Medium', 'Low'] as const).map(priority => (
            <Button
              key={priority}
              variant={filter === priority ? 'default' : 'ghost'}
              size="sm"
              className="h-6 px-2 text-[10px]"
              onClick={() => setFilter(priority)}
            >
              {priority}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {filteredActions.map(action => (
          <ActionCard key={action.id} action={action} />
        ))}
      </div>
    </section>
  );
};
