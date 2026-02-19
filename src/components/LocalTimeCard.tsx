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

  const timeStr = time
    ? `${time.getHours().toString().padStart(2, "0")}:${time
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${time.getSeconds().toString().padStart(2, "0")}`
    : "--:--:--";

  const dateStr = time
    ? `${days[time.getDay()]}, ${months[time.getMonth()]} ${time.getDate()}`
    : "";

  const tz = Intl.DateTimeFormat("en-US", { timeZoneName: "short" })
    .formatToParts(new Date())
    .find((p) => p.type === "timeZoneName")?.value ?? "";

  return (
    <div className="bento-card h-full flex flex-col justify-between">
      <span className="bento-badge self-start flex items-center gap-1.5">
        <Clock className="h-3 w-3 text-primary" />
        Local time
      </span>

      <div>
        <p className="text-4xl font-bold text-foreground tracking-tight tabular-nums leading-none">
          {timeStr}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          {dateStr}{tz ? ` · ${tz}` : ""}
        </p>
      </div>

      {weather.status === "ok" && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-lg">{weather.data.emoji}</span>
          <span className="font-semibold text-foreground">{weather.data.temp}°C</span>
          <span className="text-muted-foreground">· {weather.data.label}</span>
        </div>
      )}
    </div>
  );
}
