import { MapPin } from "lucide-react";

const LocationCard = () => {
  return (
    <div className="bento-card h-full flex flex-col">
      <div className="absolute top-4 left-4 z-10">
        <span className="bento-badge">
          <MapPin className="h-3 w-3 text-primary" />
          Location
        </span>
      </div>
      {/* Fake dark map */}
      <div className="flex-1 relative rounded-xl overflow-hidden bg-[hsl(215,25%,10%)] min-h-[200px]">
        {/* Map grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(215,20%,30%)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* Roads */}
          <line x1="0" y1="120" x2="300" y2="80" stroke="hsl(215,20%,25%)" strokeWidth="1.5"/>
          <line x1="50" y1="0" x2="180" y2="300" stroke="hsl(215,20%,25%)" strokeWidth="1.5"/>
          <line x1="0" y1="200" x2="400" y2="180" stroke="hsl(215,20%,25%)" strokeWidth="1"/>
          <line x1="200" y1="0" x2="280" y2="300" stroke="hsl(215,20%,22%)" strokeWidth="1"/>
          <line x1="100" y1="50" x2="350" y2="250" stroke="hsl(215,20%,22%)" strokeWidth="0.8"/>
        </svg>
        {/* Green glow dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-20 w-20 rounded-full bg-primary/20 blur-xl absolute -translate-x-1/2 -translate-y-1/2" />
          <div className="h-3 w-3 rounded-full bg-primary relative z-10" />
        </div>
        {/* City name */}
        <span className="absolute bottom-12 right-6 text-sm text-muted-foreground font-medium">Bengaluru</span>
        {/* Zoom button */}
        <div className="absolute bottom-4 left-4 h-8 w-8 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground text-lg leading-none">
          −
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
