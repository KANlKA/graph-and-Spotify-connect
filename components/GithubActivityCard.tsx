import { motion } from "framer-motion";

const generateContributions = () => {
  const data: number[][] = [];
  for (let week = 0; week < 28; week++) {
    const days: number[] = [];
    for (let day = 0; day < 7; day++) {
      const rand = Math.random();
      if (rand < 0.35) days.push(0);
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
  "bg-[hsl(215,15%,16%)]",
  "bg-primary/25",
  "bg-primary/45",
  "bg-primary/70",
  "bg-primary",
];

const GitHubActivityCard = () => {
  return (
    <div className="bento-card h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <span className="bento-badge">
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          Github activity
        </span>
        <span className="text-xs font-medium text-muted-foreground">336 contributions in the last year</span>
      </div>

      <div className="flex-1 overflow-hidden flex items-center">
        <div className="flex gap-[4px]">
          {contributions.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[4px]">
              {week.map((level, di) => (
                <motion.div
                  key={di}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + (wi * 7 + di) * 0.002, duration: 0.15 }}
                  className={`h-[14px] w-[14px] rounded-[3px] ${levelColors[level]}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Last pushed on Thursday, February 5th 2026
      </p>
    </div>
  );
};

export default GitHubActivityCard;
