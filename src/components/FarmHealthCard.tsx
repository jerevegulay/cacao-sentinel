import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";
import type { Farm } from "@/lib/mock-data";

interface FarmHealthCardProps {
  farm: Farm;
  onClick?: (farm: Farm) => void;
}

const riskColors: Record<Farm["riskLevel"], string> = {
  Healthy: "bg-success",
  "Low Risk": "bg-accent",
  "Moderate Risk": "bg-warning",
  "High Risk": "bg-destructive",
};

const riskBg: Record<Farm["riskLevel"], string> = {
  Healthy: "bg-success/10 border-success/30",
  "Low Risk": "bg-accent/10 border-accent/30",
  "Moderate Risk": "bg-warning/10 border-warning/30",
  "High Risk": "bg-destructive/10 border-destructive/30",
};

const FarmHealthCard = ({ farm, onClick }: FarmHealthCardProps) => {
  return (
    <div
      onClick={() => onClick?.(farm)}
      className={cn(
        "rounded-lg border p-4 transition-all hover:shadow-card-hover cursor-pointer",
        riskBg[farm.riskLevel]
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-semibold text-foreground text-sm">{farm.name}</p>
          <p className="text-xs text-muted-foreground">{farm.owner}</p>
        </div>
        <div className={cn("w-3 h-3 rounded-full mt-1", riskColors[farm.riskLevel])} />
      </div>
      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
        <MapPin className="w-3 h-3" />
        {farm.size} hectares
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">{farm.riskLevel}</span>
        <div className="flex items-center gap-2">
          <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className={cn("h-full rounded-full", riskColors[farm.riskLevel])}
              style={{ width: `${farm.healthScore}%` }}
            />
          </div>
          <span className="text-xs font-bold text-foreground">{farm.healthScore}%</span>
        </div>
      </div>
    </div>
  );
};

export default FarmHealthCard;
