import type { SpotifyData } from "@/lib/spotify";
import type { WeatherResult } from "@/lib/weather";
import type { Contribution } from "@/app/page";

import BentoMouseEffect from "./BentoMouseEffect";
import LocationCard from "./LocationCard";
import FeaturedWorkCard from "./FeaturedWorkCard";
import SpotifyCard from "./SpotifyCard";
import WeatherCard from "./WeatherCard";
import LocalTimeCard from "./LocalTimeCard";
import GithubActivityCard from "./GithubActivityCard";
import TechStackCard from "./TechStackCard";
import SocialLinksRow from "./SocialLinksRow";

interface Props {
  contributions: Contribution[];
  spotify: SpotifyData;
  weather: WeatherResult;
}

export default function BentoGrid({ contributions, spotify, weather }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <BentoMouseEffect />

        <section
          id="bento"
          className="grid grid-cols-1 md:grid-cols-6 gap-4"
        >
          {/* Location — 2 col × 2 row */}
          <div className="md:col-span-2 md:row-span-2">
            <LocationCard />
          </div>

          {/* Featured Work — 2 col × 2 row */}
          <div className="md:col-span-2 md:row-span-2">
            <FeaturedWorkCard />
          </div>

          {/* Spotify — 2 col × 1 row */}
          <div className="md:col-span-2">
            <SpotifyCard spotify={spotify} />
          </div>

          {/* Weather — 2 col × 1 row */}
          <div className="md:col-span-2">
            <WeatherCard weather={weather} />
          </div>

          {/* Local time + Social — 6 col full row */}
          <div className="md:col-span-2">
            <LocalTimeCard />
          </div>
          <div className="md:col-span-4">
            <SocialLinksRow />
          </div>

          {/* GitHub Activity — 3 col */}
          <div className="md:col-span-3">
            <GithubActivityCard contributions={contributions} />
          </div>

          {/* Tech Stack — 3 col */}
          <div className="md:col-span-3">
            <TechStackCard />
          </div>
        </section>
      </div>
    </div>
  );
}
