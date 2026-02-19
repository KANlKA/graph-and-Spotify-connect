"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";

export default function ProjectsCard() {
  const trackRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(trackRef, { once: true });

  return (
    <div className="bento-card group !p-0 h-full">
      <Link
        href="#projects"
        className="flex size-full flex-col justify-center px-6 py-6"
      >
        <div className="flex items-center justify-between">
          <p className="font-medium text-foreground">
            Discover more projects
          </p>
          <ArrowRight className="size-6 text-foreground transition-all duration-300 group-hover:rotate-90" />
        </div>

        {/* ref on the container — has real dimensions, IntersectionObserver fires */}
        <div ref={trackRef} className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-border">
          <motion.div
            className="h-full rounded-full bg-emerald-400"
            initial={{ width: "0%" }}
            animate={{ width: isInView ? "100%" : "0%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>
      </Link>
    </div>
  );
}
