import { Cloud, Sun, Droplets, Wind } from "lucide-react";
import BentoCard from "./BentoCard";

const WeatherCard = () => {
  return (
    <BentoCard className="flex flex-col justify-between relative" delay={0.3}>
      {/* Subtle glow */}
      <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bento-gradient-warm opacity-10 blur-2xl" />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">San Francisco</p>
          <p className="mt-1 text-5xl font-bold text-foreground">18°</p>
        </div>
        <Sun className="h-10 w-10 text-[hsl(var(--warm))]" />
      </div>

      <div className="mt-4 flex gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Droplets className="h-3 w-3" />
          <span>42%</span>
        </div>
        <div className="flex items-center gap-1">
          <Wind className="h-3 w-3" />
          <span>12 km/h</span>
        </div>
        <div className="flex items-center gap-1">
          <Cloud className="h-3 w-3" />
          <span>Partly cloudy</span>
        </div>
      </div>
    </BentoCard>
  );
};

export default WeatherCard;
