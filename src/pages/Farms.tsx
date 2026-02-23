import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import FarmHealthCard from "@/components/FarmHealthCard";
import { farms as initialFarms, type Farm } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X, TreePine } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Farms = () => {
  const { toast } = useToast();
  const [farmList, setFarmList] = useState<Farm[]>(initialFarms);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    owner: "",
    location: "Initao, Misamis Oriental",
    size: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.owner || !formData.size) return;

    const newFarm: Farm = {
      id: String(Date.now()),
      name: formData.name,
      owner: formData.owner,
      location: formData.location,
      size: parseFloat(formData.size),
      healthScore: 100,
      riskLevel: "Healthy",
    };

    setFarmList((prev) => [newFarm, ...prev]);
    setFormData({ name: "", owner: "", location: "Initao, Misamis Oriental", size: "" });
    setShowForm(false);
    toast({ title: "Farm Registered", description: `${newFarm.name} has been added successfully.` });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Farms</h1>
            <p className="text-muted-foreground mt-1">{farmList.length} registered farms</p>
          </div>
          <Button variant="hero" className="h-12 px-6 text-base" onClick={() => setShowForm(!showForm)}>
            {showForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            {showForm ? "Cancel" : "Register Farm"}
          </Button>
        </div>

        {/* Add Farm Form */}
        {showForm && (
          <div className="rounded-xl border bg-card shadow-card p-5">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <TreePine className="w-5 h-5 text-primary" /> Register New Farm
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="farmName">Farm Name</Label>
                <Input id="farmName" placeholder="e.g. Hacienda Verde" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="owner">Owner Name</Label>
                <Input id="owner" placeholder="e.g. Juan Dela Cruz" value={formData.owner} onChange={(e) => setFormData({ ...formData, owner: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="size">Size (hectares)</Label>
                <Input id="size" type="number" step="0.1" min="0.1" placeholder="e.g. 12.5" value={formData.size} onChange={(e) => setFormData({ ...formData, size: e.target.value })} required />
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" variant="hero" className="h-12 px-8 text-base w-full sm:w-auto">
                  <Plus className="w-5 h-5" /> Add Farm
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Farm Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {farmList.map((farm) => (
            <FarmHealthCard key={farm.id} farm={farm} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Farms;
