import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Customer } from "@/types/customer";

interface AddNoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: Customer;
}

const NOTE_TYPES = [
  { value: "general", label: "General Note" },
  { value: "follow-up", label: "Follow-up Required" },
  { value: "internal-alert", label: "Internal Alert" },
  { value: "customer-request", label: "Customer Request" },
];

export const AddNoteDialog = ({ open, onOpenChange, customer }: AddNoteDialogProps) => {
  const { toast } = useToast();
  const [noteType, setNoteType] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [isImportant, setIsImportant] = useState(false);

  const handleSubmit = () => {
    if (!noteType || !noteContent.trim()) {
      toast({
        title: "Missing Information",
        description: "Please select a note type and enter note content.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Note Added",
      description: `Note added to ${customer.firstName} ${customer.lastName}'s record.`,
    });

    setNoteType("");
    setNoteContent("");
    setIsImportant(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Note</DialogTitle>
          <DialogDescription>
            Add a note to {customer.firstName} {customer.lastName}'s account record.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="noteType">Note Type</Label>
            <Select value={noteType} onValueChange={setNoteType}>
              <SelectTrigger>
                <SelectValue placeholder="Select note type" />
              </SelectTrigger>
              <SelectContent>
                {NOTE_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="noteContent">Note Content</Label>
            <Textarea
              id="noteContent"
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Enter note details..."
              rows={4}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="important">Mark as Important</Label>
            <Switch
              id="important"
              checked={isImportant}
              onCheckedChange={setIsImportant}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Note</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
