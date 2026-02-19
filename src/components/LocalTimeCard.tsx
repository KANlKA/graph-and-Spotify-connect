"use client";

import { Clock } from "lucide-react";
import { useState, useEffect } from "react";

export default function LocalTimeCard() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const timeStr = time
    ? `${time.getHours().toString().padStart(2, "0")}:${time.getMinutes().toString().padStart(2, "0")}:${time.getSeconds().toString().padStart(2, "0")}`
    : "--:--:--";

  const dateStr = time ? (() => {
    const offset = -time.getTimezoneOffset();
    const sign = offset >= 0 ? "+" : "-";
    const oh = Math.floor(Math.abs(offset) / 60);
    const om = Math.abs(offset) % 60;
    const tz = `GMT${sign}${oh}${om ? `:${om.toString().padStart(2, "0")}` : ""}`;
    return `${days[time.getDay()]}, ${months[time.getMonth()]} ${time.getDate()} · ${tz}`;
  })() : "";

  return (
    <div className="bento-card h-full flex flex-col justify-between">
      <span className="bento-badge self-start">
        <Clock className="h-3 w-3" />
        Local time
      </span>

      <div>
        <p className="text-4xl font-bold text-foreground tracking-tight tabular-nums">
          {timeStr}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">{dateStr}</p>
      </div>
    </div>
  );
}
