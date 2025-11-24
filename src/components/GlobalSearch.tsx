import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { mockCustomers } from "@/data/mockData";
import { Customer } from "@/types/customer";

interface GlobalSearchProps {
  onSelectCustomer: (customer: Customer) => void;
}

export const GlobalSearch = ({ onSelectCustomer }: GlobalSearchProps) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Customer[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = (value: string) => {
    setQuery(value);
    
    if (value.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = mockCustomers.filter((customer) => {
      const searchLower = value.toLowerCase();
      return (
        customer.firstName.toLowerCase().includes(searchLower) ||
        customer.lastName.toLowerCase().includes(searchLower) ||
        customer.businessPartnerId.includes(searchLower) ||
        customer.email.toLowerCase().includes(searchLower) ||
        customer.phone.includes(searchLower) ||
        customer.contractAccounts.some(ca => ca.accountNumber.includes(searchLower)) ||
        customer.premises.some(p => p.address.toLowerCase().includes(searchLower))
      );
    });

    setSuggestions(filtered);
    setShowSuggestions(true);
  };

  const handleSelectCustomer = (customer: Customer) => {
    setQuery(`${customer.firstName} ${customer.lastName} - ${customer.businessPartnerId}`);
    setShowSuggestions(false);
    onSelectCustomer(customer);
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search by name, BP ID, account number, address, phone, or email..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-9 h-10 text-sm bg-card border-border focus:border-primary"
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-card border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {suggestions.map((customer) => (
            <button
              key={customer.id}
              onClick={() => handleSelectCustomer(customer)}
              className="w-full px-4 py-3 text-left hover:bg-muted transition-colors border-b border-border last:border-b-0"
            >
              <div className="font-medium text-foreground">
                {customer.firstName} {customer.lastName}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                BP: {customer.businessPartnerId} • {customer.premises[0]?.address}, {customer.premises[0]?.city}, {customer.premises[0]?.state}
              </div>
              <div className="text-sm text-muted-foreground">
                Account: {customer.contractAccounts[0]?.accountNumber}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
