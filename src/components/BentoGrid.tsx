import type { SpotifyData } from "@/lib/spotify";
import type { WeatherResult } from "@/lib/weather";
import type { Contribution } from "@/app/page";

import BentoMouseEffect from "./BentoMouseEffect";
import LocationCard from "./LocationCard";
import FeaturedWorkCard from "./FeaturedWorkCard";
import SpotifyCard from "./SpotifyCard";
import LocalTimeCard from "./LocalTimeCard";
import GithubActivityCard from "./GithubActivityCard";
import TechStackCard from "./TechStackCard";
import ProjectsCard from "./ProjectsCard";
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
          className="grid grid-cols-1 md:grid-cols-6 md:auto-rows-[110px] gap-4"
        >
          {/* Location */}
          <div className="md:col-span-2 md:row-span-2 h-full">
            <LocationCard />
          </div>

          {/* Featured Work */}
          <div className="md:col-span-2 md:row-span-2 h-full">
            <FeaturedWorkCard />
          </div>

          {/* Spotify */}
          <div className="md:col-span-2 h-full">
            <SpotifyCard spotify={spotify} />
          </div>

          {/* Local Time + Weather */}
          <div className="md:col-span-2 md:row-span-2 h-full">
            <LocalTimeCard weather={weather} />
          </div>

          {/* Social Row */}
          <div className="md:col-span-2 h-full">
            <SocialLinksRow />
          </div>

          {/* Projects */}
          <div className="md:col-span-2 h-full">
            <ProjectsCard />
          </div>

          {/* GitHub Activity */}
          <div className="md:col-span-3 md:row-span-2 h-full">
            <GithubActivityCard contributions={contributions} />
          </div>

          {/* Tech Stack */}
          <div className="md:col-span-3 md:row-span-2 h-full">
            <TechStackCard />
          </div>
        </section>
      </div>
    </div>
  );
}
