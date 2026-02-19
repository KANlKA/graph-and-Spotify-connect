import { ExternalLink } from "lucide-react";
import BentoCard from "./BentoCard";

const projects = [
  { name: "Acme Dashboard", url: "acme.dev", status: "live", color: "bg-primary" },
  { name: "Pixel Studio", url: "pixel.studio", status: "live", color: "bg-[hsl(var(--warm))]" },
  { name: "Noted App", url: "noted.app", status: "live", color: "bento-gradient-accent" },
];

const ProjectsCard = () => {
  return (
    <BentoCard className="flex flex-col" delay={0.5}>
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">Projects · Live</span>

      <div className="flex flex-col gap-3 flex-1">
        {projects.map((project) => (
          <div
            key={project.name}
            className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-3 transition-colors hover:bg-secondary/60 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className={`h-8 w-8 rounded-lg ${project.color} flex items-center justify-center`}>
                <span className="text-xs font-bold text-primary-foreground">{project.name[0]}</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{project.name}</p>
                <p className="text-xs text-muted-foreground">{project.url}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
          </div>
        ))}
      </div>
    </BentoCard>
  );
};

export default ProjectsCard;
