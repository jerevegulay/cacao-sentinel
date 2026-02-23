import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import ConfigCard from "@/components/ConfigCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings as SettingsIcon, Save, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const { toast } = useToast();

  // Threshold settings
  const [diseaseThreshold, setDiseaseThreshold] = useState(30);
  const [confidenceThreshold, setConfidenceThreshold] = useState(75);

  // Alert settings
  const [alertSensitivity, setAlertSensitivity] = useState<"low" | "medium" | "high">("medium");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [criticalOnly, setCriticalOnly] = useState(false);

  // General settings
  const [scanInterval, setScanInterval] = useState("30");
  const [autoScan, setAutoScan] = useState(false);

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    toast({ title: "Settings Saved", description: "Your configuration has been updated successfully." });
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground mt-1">System configuration & preferences</p>
          </div>
          <Button variant="hero" className="h-12 px-6 text-base" onClick={handleSave}>
            {saved ? <CheckCircle className="w-5 h-5" /> : <Save className="w-5 h-5" />}
            {saved ? "Saved!" : "Save All"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Disease Thresholds */}
          <ConfigCard title="Disease Thresholds" description="Set the sensitivity for Black Pod Disease detection.">
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Affected Area Threshold</Label>
                  <span className="text-sm font-bold text-foreground">{diseaseThreshold}%</span>
                </div>
                <Slider value={[diseaseThreshold]} onValueChange={(v) => setDiseaseThreshold(v[0])} min={5} max={80} step={5} />
                <p className="text-xs text-muted-foreground">Alert when pod area affected exceeds this percentage.</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Confidence Threshold</Label>
                  <span className="text-sm font-bold text-foreground">{confidenceThreshold}%</span>
                </div>
                <Slider value={[confidenceThreshold]} onValueChange={(v) => setConfidenceThreshold(v[0])} min={50} max={99} step={1} />
                <p className="text-xs text-muted-foreground">Minimum ML confidence score to flag a detection.</p>
              </div>
            </div>
          </ConfigCard>

          {/* Alert Configuration */}
          <ConfigCard title="Alert Configuration" description="Configure how and when alerts are triggered.">
            <div className="space-y-5">
              <div className="space-y-2">
                <Label>Alert Sensitivity</Label>
                <Select value={alertSensitivity} onValueChange={(v) => setAlertSensitivity(v as any)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low — Major threats only</SelectItem>
                    <SelectItem value="medium">Medium — Balanced</SelectItem>
                    <SelectItem value="high">High — All detections</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label>Email Notifications</Label>
                <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
              </div>
              <div className="flex items-center justify-between">
                <Label>Push Notifications</Label>
                <Switch checked={pushAlerts} onCheckedChange={setPushAlerts} />
              </div>
              <div className="flex items-center justify-between">
                <Label>Critical Alerts Only</Label>
                <Switch checked={criticalOnly} onCheckedChange={setCriticalOnly} />
              </div>
            </div>
          </ConfigCard>

          {/* Scan Settings */}
          <ConfigCard title="UAV Scan Settings" description="Configure automatic scan behavior.">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <Label>Auto-Scan Enabled</Label>
                <Switch checked={autoScan} onCheckedChange={setAutoScan} />
              </div>
              <div className="space-y-2">
                <Label>Scan Interval (minutes)</Label>
                <Input type="number" min="5" max="120" step="5" value={scanInterval} onChange={(e) => setScanInterval(e.target.value)} disabled={!autoScan} />
                <p className="text-xs text-muted-foreground">Time between automated UAV scan passes.</p>
              </div>
            </div>
          </ConfigCard>
        </div>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;
