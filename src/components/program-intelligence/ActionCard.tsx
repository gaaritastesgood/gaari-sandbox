import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageSquare, Globe, Wrench, Phone, Users, Sparkles } from "lucide-react";
import { RecommendedAction } from "@/data/programMockData";
import { useToast } from "@/hooks/use-toast";

interface ActionCardProps {
  action: RecommendedAction;
}

const channelIcons: Record<RecommendedAction['channel'], React.ReactNode> = {
  'Email': <Mail className="h-3.5 w-3.5" />,
  'SMS': <MessageSquare className="h-3.5 w-3.5" />,
  'Portal': <Globe className="h-3.5 w-3.5" />,
  'Contractor': <Wrench className="h-3.5 w-3.5" />,
  'Call': <Phone className="h-3.5 w-3.5" />
};

const channelColors: Record<RecommendedAction['channel'], string> = {
  'Email': 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  'SMS': 'bg-green-500/10 text-green-600 border-green-500/20',
  'Portal': 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  'Contractor': 'bg-orange-500/10 text-orange-600 border-orange-500/20',
  'Call': 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20'
};

const priorityColors: Record<RecommendedAction['priority'], string> = {
  'High': 'bg-destructive/10 text-destructive',
  'Medium': 'bg-warning/10 text-warning',
  'Low': 'bg-muted text-muted-foreground'
};

export const ActionCard = ({ action }: ActionCardProps) => {
  const { toast } = useToast();

  const handleInitiate = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "Outreach Initiated",
      description: `${action.title} has been queued for ${action.impactedCustomers.toLocaleString()} customers.`
    });
  };

  const handleGenerateCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "Generating Outreach Copy",
      description: "AI is creating personalized messaging for this campaign..."
    });
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg ${channelColors[action.channel]}`}>
            {channelIcons[action.channel]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-sm text-foreground truncate">{action.title}</h3>
              <Badge className={`text-[10px] ${priorityColors[action.priority]}`}>
                {action.priority}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{action.description}</p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Users className="h-3 w-3" />
                <span className="text-[10px]">{action.impactedCustomers.toLocaleString()} customers</span>
              </div>
              <Badge variant="outline" className={`text-[10px] ${channelColors[action.channel]}`}>
                {channelIcons[action.channel]}
                <span className="ml-1">{action.channel}</span>
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-3 pt-3 border-t border-border/50">
          <Button variant="outline" size="sm" className="flex-1 h-7 text-xs" onClick={handleGenerateCopy}>
            <Sparkles className="h-3 w-3 mr-1" />
            Generate Copy
          </Button>
          <Button size="sm" className="flex-1 h-7 text-xs" onClick={handleInitiate}>
            Initiate Outreach
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
