import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const BentoCard = ({ children, className, delay = 0 }: BentoCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 24, scale: 0.97 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    className={cn(
      "group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:bg-card-hover",
      className
    )}
  >
    {children}
  </motion.div>
);

export default BentoCard;

