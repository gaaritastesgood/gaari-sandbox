import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Bell, 
  Zap, 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Activity,
  Briefcase,
  ArrowRight,
  Phone,
  FileText,
  Mail
} from "lucide-react";
import { KAMNotification, kamNotifications } from "@/data/kamData";

interface NotificationsPanelProps {
  onSelectAccount: (accountId: string) => void;
}

const getNotificationIcon = (type: KAMNotification['type']) => {
  switch (type) {
    case 'outage': return Zap;
    case 'billing': return DollarSign;
    case 'opportunity': return TrendingUp;
    case 'contract': return Calendar;
    case 'anomaly': return Activity;
    case 'project': return Briefcase;
    default: return Bell;
  }
};

const getSeverityStyles = (severity: KAMNotification['severity']) => {
  switch (severity) {
    case 'critical': return 'border-l-red-500 bg-red-500/5';
    case 'warning': return 'border-l-amber-500 bg-amber-500/5';
    case 'info': return 'border-l-blue-500 bg-blue-500/5';
    default: return 'border-l-muted';
  }
};

const getSeverityBadge = (severity: KAMNotification['severity']) => {
  switch (severity) {
    case 'critical': return <Badge variant="destructive" className="text-xs">Critical</Badge>;
    case 'warning': return <Badge className="bg-amber-500 text-white text-xs">Warning</Badge>;
    case 'info': return <Badge variant="secondary" className="text-xs">Info</Badge>;
    default: return null;
  }
};

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffHours < 48) return 'Yesterday';
  return date.toLocaleDateString();
};

export const NotificationsPanel = ({ onSelectAccount }: NotificationsPanelProps) => {
  return (
    <Card className="border-border h-full">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-foreground">Alerts & Notifications</h2>
          </div>
          <Badge variant="outline">{kamNotifications.length} new</Badge>
        </div>
      </div>
      
      <ScrollArea className="h-[400px]">
        <div className="p-2 space-y-2">
          {kamNotifications.map((notification) => {
            const Icon = getNotificationIcon(notification.type);
            
            return (
              <div 
                key={notification.id}
                className={`p-3 rounded-lg border-l-4 ${getSeverityStyles(notification.severity)} cursor-pointer hover:bg-muted/50 transition-colors`}
                onClick={() => onSelectAccount(notification.accountId)}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{notification.title}</span>
                  </div>
                  {getSeverityBadge(notification.severity)}
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">{notification.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{notification.accountName}</span>
                  <span className="text-xs text-muted-foreground">{formatTimestamp(notification.timestamp)}</span>
                </div>
                
                {notification.actionable && (
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" className="h-7 text-xs">
                      <Phone className="h-3 w-3 mr-1" /> Call
                    </Button>
                    <Button size="sm" variant="outline" className="h-7 text-xs">
                      <Mail className="h-3 w-3 mr-1" /> Email
                    </Button>
                    <Button size="sm" variant="outline" className="h-7 text-xs">
                      <FileText className="h-3 w-3 mr-1" /> Case
                    </Button>
                    <Button size="sm" variant="ghost" className="h-7 text-xs ml-auto">
                      View <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </Card>
  );
};
