import { Briefcase } from "lucide-react";

const FeaturedWorkCard = () => {
  return (
    <div className="group/card relative h-full">
      <div className="bento-card h-full flex flex-col">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/60 bg-zinc-800 px-2.5 py-1 text-xs font-medium text-white">
            <Briefcase className="h-3 w-3 text-white" />
            Featured work
          </span>
        </div>

        <h3 className="text-xl font-semibold text-foreground">Creatormind</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Your social media manager all in one place. Stop thinking, start posting.
        </p>

        {/* Notification cards */}
        <div className="mt-auto pt-4 flex flex-col gap-2">
          <div className="relative z-0 rounded-xl border border-border bg-[hsl(215,20%,15%)] p-3 flex items-center gap-3 origin-left transition-all duration-200 hover:z-10 hover:scale-110 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30 hover:border-emerald-500/50">
            <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Creatormind</span>
                <span className="text-xs text-muted-foreground">Just now</span>
              </div>
              <p className="text-xs text-muted-foreground truncate">Welcome to the platform!</p>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-[hsl(215,20%,15%)] p-3 flex items-center gap-3 opacity-60">
            <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground truncate">Login now...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hover popup — outside bento-card to escape overflow:hidden */}
      <div className="pointer-events-none absolute -top-14 left-1/2 -translate-x-1/2 w-64 opacity-0 translate-y-2 group-hover/card:opacity-100 group-hover/card:-translate-y-0 transition-all duration-200 ease-out z-50">
        <div className="rounded-xl border border-border bg-[hsl(215,20%,15%)] p-3 flex items-center gap-3 shadow-xl shadow-black/40">
          <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Creatormind</span>
              <span className="text-xs text-muted-foreground">Just now</span>
            </div>
            <p className="text-xs text-muted-foreground">Welcome to the platform!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedWorkCard;
