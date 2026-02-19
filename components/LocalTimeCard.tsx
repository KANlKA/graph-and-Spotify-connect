import { Clock, Sun } from "lucide-react";
import { useState, useEffect } from "react";

const LocalTimeCard = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const dayName = dayNames[time.getDay()];
  const monthName = monthNames[time.getMonth()];
  const date = time.getDate();

  const offset = -time.getTimezoneOffset();
  const offsetHours = Math.floor(Math.abs(offset) / 60);
  const offsetMinutes = Math.abs(offset) % 60;
  const offsetStr = `GMT${offset >= 0 ? "+" : "-"}${offsetHours}${offsetMinutes ? `:${offsetMinutes.toString().padStart(2, "0")}` : ""}`;

  return (
    <div className="bento-card h-full flex flex-col justify-between">
      <div>
        <span className="bento-badge">
          <Clock className="h-3 w-3" />
          Local Time
        </span>
      </div>

      <div className="mt-3">
        <p className="text-4xl font-bold text-foreground tracking-tight tabular-nums">
          {hours}:{minutes}:{seconds}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {dayName}, {monthName} {date} • {offsetStr}
        </p>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <Sun className="h-5 w-5 text-yellow-400" />
        <span className="text-lg font-semibold text-foreground">30°C</span>
        <span className="text-sm text-muted-foreground">• Sunny</span>
      </div>
    </div>
  );
};

export default LocalTimeCard;
