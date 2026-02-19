"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ProjectsCard() {
  return (
    <div className="bento-card group !p-0 h-full">

      <Link
        href="#projects"
        className="flex size-full items-center justify-between px-6 py-6"
      >
        <p
          className="relative font-medium text-foreground
            after:absolute after:left-0 after:top-1/2 after:mt-3
            after:h-0.5 after:w-0 after:content-['']
            after:bg-foreground after:transition-all after:duration-300
            group-hover:after:w-full"
        >
          Discover more projects
        </p>
        <ArrowRight className="size-6 text-foreground transition-all duration-300 group-hover:rotate-90" />
      </Link>
    </div>
  );
}
