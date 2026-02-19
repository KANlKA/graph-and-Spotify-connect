import type { WeatherResult } from "@/lib/weather";

interface Props { weather: WeatherResult }

export default function WeatherCard({ weather }: Props) {
  return (
    <div className="bento-card h-full flex flex-col justify-between">
      <span className="bento-badge self-start">Weather</span>

      {weather.status === "ok" ? (
        <>
          <div className="flex items-end justify-between mt-2">
            <div>
              <p className="text-5xl font-bold text-foreground leading-none">
                {weather.data.temp}°
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{weather.data.label}</p>
            </div>
            <span className="text-5xl leading-none">{weather.data.emoji}</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>{weather.data.city}</span>
            <span>Feels like {weather.data.feelsLike}°C</span>
          </div>
        </>
      ) : (
        <p className="text-sm text-muted-foreground mt-2">
          {weather.status === "unconfigured"
            ? "Set WEATHER_CITY in .env.local"
            : "Could not load weather"}
        </p>
      )}
    </div>
  );
}
