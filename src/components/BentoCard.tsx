"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
}

const BentoCard = ({ children, className }: BentoCardProps) => (
  <div className={cn("bento-card h-full flex flex-col", className)}>
    {children}
  </div>
);

export default BentoCard;
