import { cn } from "@/lib/utils";

type SeverityLevel = "Healthy" | "Mild" | "Moderate" | "Severe";

interface SeverityBadgeProps {
  severity: SeverityLevel;
  size?: "sm" | "md";
  className?: string;
}

const severityStyles: Record<SeverityLevel, string> = {
  Healthy: "bg-success/15 text-success",
  Mild: "bg-accent/15 text-accent-foreground",
  Moderate: "bg-warning/15 text-warning",
  Severe: "bg-destructive/15 text-destructive",
};

const SeverityBadge = ({ severity, size = "sm", className }: SeverityBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm",
        severityStyles[severity],
        className
      )}
    >
      {severity}
    </span>
  );
};

export default SeverityBadge;
