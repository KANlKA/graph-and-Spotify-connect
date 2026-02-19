import { Briefcase } from "lucide-react";

const FeaturedWorkCard = () => {
  return (
    <div className="bento-card h-full flex flex-col">
      <div className="mb-4">
        <span className="bento-badge">
          <Briefcase className="h-3 w-3 text-primary" />
          Featured work
        </span>
      </div>

      <h3 className="text-xl font-semibold text-foreground">DevSphere</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Open Source and Web 3.0 Club at RV University
      </p>

      {/* Notification cards */}
      <div className="mt-auto pt-4 flex flex-col gap-2">
        <div className="rounded-xl border border-border bg-[hsl(215,20%,15%)] p-3 flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">DevSphere</span>
              <span className="text-xs text-muted-foreground">Just now</span>
            </div>
            <p className="text-xs text-muted-foreground truncate">Welcome to the community!</p>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-[hsl(215,20%,15%)] p-3 flex items-center gap-3 opacity-60">
          <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground truncate">Membership request...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedWorkCard;
