"use client";

import { motion } from "framer-motion";
import type { Contribution } from "@/app/page";

interface Props { contributions: Contribution[] }

const LEVEL_COLORS = [
  "bg-secondary",
  "bg-primary/20",
  "bg-primary/40",
  "bg-primary/70",
  "bg-primary",
];

function groupByWeek(flat: Contribution[]): Contribution[][] {
  const weeks: Contribution[][] = [];
  for (let i = 0; i < flat.length; i += 7) weeks.push(flat.slice(i, i + 7));
  return weeks;
}

export default function GithubActivityCard({ contributions }: Props) {
  const weeks = groupByWeek(contributions);
  const total = contributions.reduce((s, c) => s + c.count, 0);
  const lastDate = contributions.at(-1)?.date
    ? new Date(contributions.at(-1)!.date).toLocaleDateString("en-US", {
        weekday: "long", month: "long", day: "numeric", year: "numeric",
      })
    : null;

  return (
    <div className="bento-card h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <span className="bento-badge">
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          GitHub activity
        </span>
        <span className="text-xs text-muted-foreground">
          {total.toLocaleString()} contributions in the last year
        </span>
      </div>

      <div className="flex-1 overflow-x-auto">
        <div className="flex gap-[4px] min-w-max">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[4px]">
              {week.map((day, di) => (
                <motion.div
                  key={day.date}
                  title={`${day.date}: ${day.count} contribution${day.count !== 1 ? "s" : ""}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.05 + (wi * 7 + di) * 0.001, duration: 0.12 }}
                  className={`h-[13px] w-[13px] rounded-[3px] ${LEVEL_COLORS[day.level]}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {lastDate && (
        <p className="mt-4 text-xs text-muted-foreground">Last activity: {lastDate}</p>
      )}
    </div>
  );
}
