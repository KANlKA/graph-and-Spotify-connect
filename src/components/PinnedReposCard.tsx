import { Star, GitFork } from "lucide-react";
import BentoCard from "./BentoCard";

const repos = [
  { name: "dotfiles", desc: "My personal dev environment config", lang: "Shell", langColor: "bg-primary", stars: 142, forks: 23 },
  { name: "bento-ui", desc: "A modular bento grid component library", lang: "TypeScript", langColor: "bg-[hsl(var(--ts))]", stars: 89, forks: 12 },
  { name: "raycast-ext", desc: "Custom Raycast extensions pack", lang: "TypeScript", langColor: "bg-[hsl(var(--ts))]", stars: 56, forks: 8 },
];

const PinnedReposCard = () => {
  return (
    <BentoCard className="flex flex-col" >
      <div className="flex items-center gap-2 mb-4">
        <svg className="h-4 w-4 text-foreground" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Pinned Repos</span>
      </div>

      <div className="flex flex-col gap-3 flex-1">
        {repos.map((repo) => (
          <div key={repo.name} className="rounded-lg border border-border bg-secondary/30 p-3 transition-colors hover:bg-secondary/60">
            <p className="text-sm font-semibold text-foreground">{repo.name}</p>
            <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">{repo.desc}</p>
            <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className={`h-2.5 w-2.5 rounded-full ${repo.langColor}`} />
                {repo.lang}
              </span>
              <span className="flex items-center gap-1"><Star className="h-3 w-3" />{repo.stars}</span>
              <span className="flex items-center gap-1"><GitFork className="h-3 w-3" />{repo.forks}</span>
            </div>
          </div>
        ))}
      </div>
    </BentoCard>
  );
};

export default PinnedReposCard;
