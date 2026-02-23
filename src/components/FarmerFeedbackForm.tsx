import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import SeverityBadge from "@/components/SeverityBadge";

export interface FeedbackEntry {
  id: string;
  farmName: string;
  confirmation: "confirmed" | "false-positive" | "unsure";
  treatmentStatus: "untreated" | "in-progress" | "treated";
  notes: string;
  submittedAt: string;
}

interface FarmerFeedbackFormProps {
  onSubmit: (entry: FeedbackEntry) => void;
}

const FarmerFeedbackForm = ({ onSubmit }: FarmerFeedbackFormProps) => {
  const [farmName, setFarmName] = useState("");
  const [confirmation, setConfirmation] = useState<FeedbackEntry["confirmation"]>("confirmed");
  const [treatmentStatus, setTreatmentStatus] = useState<FeedbackEntry["treatmentStatus"]>("untreated");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmName.trim()) return;

    const entry: FeedbackEntry = {
      id: Date.now().toString(),
      farmName: farmName.trim(),
      confirmation,
      treatmentStatus,
      notes: notes.trim(),
      submittedAt: new Date().toLocaleString(),
    };

    onSubmit(entry);
    setSubmitted(true);
    setTimeout(() => {
      setFarmName("");
      setConfirmation("confirmed");
      setTreatmentStatus("untreated");
      setNotes("");
      setSubmitted(false);
    }, 2000);
  };

  const treatmentBadgeColor: Record<string, string> = {
    untreated: "bg-destructive/15 text-destructive",
    "in-progress": "bg-warning/15 text-warning",
    treated: "bg-success/15 text-success",
  };

  return (
    <div className="rounded-xl border bg-card shadow-card p-5">
      <h3 className="text-lg font-semibold text-foreground mb-4">Farmer Feedback</h3>

      {submitted ? (
        <div className="flex flex-col items-center justify-center py-8 gap-3 animate-slide-up">
          <CheckCircle className="w-12 h-12 text-success" />
          <p className="text-sm font-medium text-foreground">Feedback submitted successfully!</p>
          <span className={cn("px-3 py-1 rounded-full text-xs font-medium", treatmentBadgeColor[treatmentStatus])}>
            Treatment: {treatmentStatus}
          </span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fb-farm">Farm Name</Label>
            <Input
              id="fb-farm"
              placeholder="e.g. Hacienda Verde"
              value={farmName}
              onChange={(e) => setFarmName(e.target.value)}
              className="h-12"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Infection Confirmation</Label>
            <Select value={confirmation} onValueChange={(v) => setConfirmation(v as FeedbackEntry["confirmation"])}>
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="confirmed">Confirmed Infection</SelectItem>
                <SelectItem value="false-positive">False Positive</SelectItem>
                <SelectItem value="unsure">Unsure</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Treatment Status</Label>
            <Select value={treatmentStatus} onValueChange={(v) => setTreatmentStatus(v as FeedbackEntry["treatmentStatus"])}>
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="untreated">Untreated</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="treated">Treated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fb-notes">Notes</Label>
            <Textarea
              id="fb-notes"
              placeholder="Describe what you observed..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <Button type="submit" variant="hero" className="w-full h-12 text-base">
            <Send className="w-4 h-4" /> Submit Feedback
          </Button>
        </form>
      )}
    </div>
  );
};

export default FarmerFeedbackForm;
