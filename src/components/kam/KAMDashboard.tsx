import { useState } from "react";
import { PortfolioHealth } from "./PortfolioHealth";
import { NotificationsPanel } from "./NotificationsPanel";
import { AccountsTable } from "./AccountsTable";
import { AccountDashboard } from "./AccountDashboard";

export const KAMDashboard = () => {
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);

  if (selectedAccountId) {
    return (
      <AccountDashboard 
        accountId={selectedAccountId} 
        onBack={() => setSelectedAccountId(null)} 
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Portfolio Health Summary */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">Portfolio Overview</h2>
        <PortfolioHealth />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Accounts Table - Takes 2 columns */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-foreground mb-3">Assigned Accounts</h2>
          <AccountsTable onSelectAccount={setSelectedAccountId} />
        </div>

        {/* Notifications Panel - Takes 1 column */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3">What Needs Attention</h2>
          <NotificationsPanel onSelectAccount={setSelectedAccountId} />
        </div>
      </div>
    </div>
  );
};
