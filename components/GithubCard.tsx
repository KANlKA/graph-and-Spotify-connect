import BentoCard from "./BentoCard";
import { motion } from "framer-motion";

// Generate mock contribution data (52 weeks x 7 days)
const generateContributions = () => {
  const data: number[][] = [];
  for (let week = 0; week < 52; week++) {
    const days: number[] = [];
    for (let day = 0; day < 7; day++) {
      const rand = Math.random();
      if (rand < 0.3) days.push(0);
      else if (rand < 0.55) days.push(1);
      else if (rand < 0.75) days.push(2);
      else if (rand < 0.9) days.push(3);
      else days.push(4);
    }
    data.push(days);
  }
  return data;
};

const contributions = generateContributions();

const levelColors = [
  "bg-secondary",
  "bg-primary/20",
  "bg-primary/40",
  "bg-primary/70",
  "bg-primary",
];

const GitHubCard = () => {
  return (
    <BentoCard className="flex flex-col" delay={0.2}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg className="h-4 w-4 text-foreground" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <span className="text-xs font-medium text-muted-foreground">1,247 contributions this year</span>
        </div>
      </div>

      <div className="mt-4 flex-1 overflow-hidden">
        <div className="flex gap-[3px]">
          {contributions.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((level, di) => (
                <motion.div
                  key={di}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + (wi * 7 + di) * 0.001, duration: 0.2 }}
                  className={`h-[10px] w-[10px] rounded-[2px] ${levelColors[level]}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </BentoCard>
  );
};

export default GitHubCard;
