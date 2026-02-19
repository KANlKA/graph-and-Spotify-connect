"use client";

import {
  Braces,
  Container,
  Database,
  Layers,
  Server,
  Wind,
} from "lucide-react";
import Marquee from "./Marquee";

const techIcons = [
  { name: "JavaScript", el: <Braces className="h-8 w-8" /> },
  { name: "Python", el: <Database className="h-8 w-8" /> },
  { name: "Git", el: <Layers className="h-8 w-8" /> },
  { name: "Next.js", el: <Server className="h-8 w-8" /> },
  { name: "React", el: <Layers className="h-8 w-8" /> },
  { name: "TypeScript", el: <Braces className="h-8 w-8" /> },
  { name: "Node.js", el: <Server className="h-8 w-8" /> },
  { name: "Docker", el: <Container className="h-8 w-8" /> },
  { name: "PostgreSQL", el: <Database className="h-8 w-8" /> },
  { name: "Tailwind CSS", el: <Wind className="h-8 w-8" /> },
];

const TechStackCard = () => {
  return (
    <div className="bento-card h-full flex flex-col overflow-hidden">
      
      {/* Header */}
      <div className="mb-4">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/60 bg-zinc-800 px-2.5 py-1 text-xs font-medium text-white">
          <Layers className="h-3 w-3 text-white" />
          Tech stack
        </span>
      </div>

      {/* Marquee Section */}
      <div className="relative flex-1 flex items-center overflow-hidden">
        
        <div className="w-full">
          <Marquee
            pauseOnHover
            style={{ "--duration": "25s", "--gap": "1.5rem" } as React.CSSProperties}
            repeat={3}
          >
            {techIcons.map((tech) => (
              <div
                key={tech.name}
                title={tech.name}
                className="flex items-center justify-center h-12 w-12 rounded-lg text-muted-foreground hover:text-foreground transition-colors shrink-0"
              >
                {tech.el}
              </div>
            ))}
          </Marquee>
        </div>

        {/* LEFT subtle blur (masked) */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-16 backdrop-blur-sm"
          style={{
            maskImage: "linear-gradient(to right, black, transparent)",
            WebkitMaskImage: "linear-gradient(to right, black, transparent)",
          }}
        />

        {/* RIGHT subtle blur (masked) */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-16 backdrop-blur-sm"
          style={{
            maskImage: "linear-gradient(to left, black, transparent)",
            WebkitMaskImage: "linear-gradient(to left, black, transparent)",
          }}
        />
      </div>

      {/* Footer Text */}
      <div className="mt-4">
        <h3 className="text-base font-semibold text-foreground">
          Technologies I work with
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Designing and building reliable solutions across frontend, backend, and cloud.
        </p>
      </div>
    </div>
  );
};

export default TechStackCard;
