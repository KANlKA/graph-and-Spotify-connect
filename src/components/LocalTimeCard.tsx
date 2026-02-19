"use client";

import { Clock } from "lucide-react";
import { useState, useEffect } from "react";
import type { WeatherResult } from "@/lib/weather";

interface Props { weather: WeatherResult }

export default function LocalTimeCard({ weather }: Props) {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const dateStr = time
    ? `${days[time.getDay()]}, ${months[time.getMonth()]} ${time.getDate()}`
    : "";

  const tz = Intl.DateTimeFormat("en-US", { timeZoneName: "short" })
    .formatToParts(new Date())
    .find((p) => p.type === "timeZoneName")?.value ?? "";

  const timeStr = time
    ? `${time.getHours().toString().padStart(2, "0")}:${time.getMinutes().toString().padStart(2, "0")}:${time.getSeconds().toString().padStart(2, "0")}`
    : "--:--:--";

  return (
    <div className="bento-card h-full flex flex-col justify-between">

      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/60 bg-zinc-800 px-2.5 py-1 text-xs font-medium text-white self-start">
        <Clock className="h-3 w-3 text-white" />
        Local time
      </span>

      <div>
        <p className="text-5xl font-bold text-foreground tracking-tight tabular-nums leading-none">
          {timeStr}
        </p>
        <p className="text-sm text-muted-foreground mt-1.5">
          {dateStr}{tz ? ` · ${tz}` : ""}
        </p>
      </div>

      {weather.status === "ok" && (
        <div className="flex items-center gap-2">
          <span>{weather.data.emoji}</span>
          <span className="font-semibold text-foreground text-sm">{weather.data.temp}°C</span>
          <span className="text-muted-foreground text-sm">· {weather.data.label}</span>
        </div>
      )}
    </div>
  );
}
