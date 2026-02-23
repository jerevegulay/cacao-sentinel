import { farms } from "@/lib/mock-data";
import FarmHealthCard from "@/components/FarmHealthCard";

const FarmStatusGrid = () => {
  return (
    <div className="rounded-xl border bg-card shadow-card p-5">
      <h3 className="text-lg font-semibold text-foreground mb-4">Farm Status Overview</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {farms.map((farm) => (
          <FarmHealthCard key={farm.id} farm={farm} />
        ))}
      </div>
    </div>
  );
};

export default FarmStatusGrid;
