const WMO: Record<number, { label: string; emoji: string }> = {
  0:  { label: "Clear sky",           emoji: "☀️"  },
  1:  { label: "Mainly clear",        emoji: "🌤️"  },
  2:  { label: "Partly cloudy",       emoji: "⛅"  },
  3:  { label: "Overcast",            emoji: "☁️"  },
  45: { label: "Foggy",              emoji: "🌫️"  },
  48: { label: "Icy fog",            emoji: "🌫️"  },
  51: { label: "Light drizzle",      emoji: "🌦️"  },
  53: { label: "Drizzle",            emoji: "🌦️"  },
  55: { label: "Heavy drizzle",      emoji: "🌦️"  },
  61: { label: "Light rain",         emoji: "🌧️"  },
  63: { label: "Rain",               emoji: "🌧️"  },
  65: { label: "Heavy rain",         emoji: "🌧️"  },
  71: { label: "Light snow",         emoji: "🌨️"  },
  73: { label: "Snow",               emoji: "❄️"  },
  75: { label: "Heavy snow",         emoji: "❄️"  },
  77: { label: "Snow grains",        emoji: "❄️"  },
  80: { label: "Light showers",      emoji: "🌦️"  },
  81: { label: "Showers",            emoji: "🌦️"  },
  82: { label: "Heavy showers",      emoji: "🌧️"  },
  85: { label: "Snow showers",       emoji: "🌨️"  },
  86: { label: "Heavy snow showers", emoji: "❄️"  },
  95: { label: "Thunderstorm",       emoji: "⛈️"  },
  96: { label: "Thunderstorm",       emoji: "⛈️"  },
  99: { label: "Thunderstorm",       emoji: "⛈️"  },
};

export interface WeatherData {
  temp: number;
  feelsLike: number;
  label: string;
  emoji: string;
  city: string;
}

export type WeatherResult =
  | { status: "ok"; data: WeatherData }
  | { status: "unconfigured" }
  | { status: "error" };

async function geocode(city: string): Promise<{ lat: number; lon: number } | null> {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`,
    { next: { revalidate: 86400 } }
  );
  const json = await res.json();
  if (!json.results?.[0]) return null;
  return { lat: json.results[0].latitude, lon: json.results[0].longitude };
}

export async function getWeather(): Promise<WeatherResult> {
  const city = process.env.WEATHER_CITY;
  if (!city) return { status: "unconfigured" };

  try {
    const coords = await geocode(city);
    if (!coords) return { status: "error" };

    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${coords.lat}&longitude=${coords.lon}` +
        `&current=temperature_2m,apparent_temperature,weathercode` +
        `&temperature_unit=celsius&timezone=auto`,
      { next: { revalidate: 1800 } }
    );
    const json = await res.json();

    const temp      = Math.round(json.current.temperature_2m);
    const feelsLike = Math.round(json.current.apparent_temperature);
    const code      = json.current.weathercode as number;
    const { label, emoji } = WMO[code] ?? { label: "Unknown", emoji: "🌡️" };

    return { status: "ok", data: { temp, feelsLike, label, emoji, city } };
  } catch {
    return { status: "error" };
  }
}
