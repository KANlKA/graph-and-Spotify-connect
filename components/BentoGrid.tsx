import LocationCard from "./LocationCard";
import FeaturedWorkCard from "./FeaturedWorkCard";
import SpotifyCard from "./SpotifyCard";
import LocalTimeCard from "./LocalTimeCard";
import SocialLinksRow from "./SocialLinksRow";
import GitHubActivityCard from "./GitHubActivityCard";
import TechStackCard from "./TechStackCard";

const BentoGrid = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        {/* Main grid: 6 columns */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-auto">
          {/* Row 1: Location (2col, 2row) | Featured Work (2col, 2row) | Spotify + Local Time stacked (2col) */}
          <div className="md:col-span-2 md:row-span-2">
            <LocationCard />
          </div>
          <div className="md:col-span-2 md:row-span-2">
            <FeaturedWorkCard />
          </div>
          <div className="md:col-span-2">
            <SpotifyCard />
          </div>
          <div className="md:col-span-2">
            <LocalTimeCard />
          </div>

          {/* Row 3: Social icons row (full width) */}
          <div className="md:col-span-6">
            <SocialLinksRow />
          </div>

          {/* Row 4: GitHub (3col) | Tech Stack (3col) */}
          <div className="md:col-span-3">
            <GitHubActivityCard />
          </div>
          <div className="md:col-span-3">
            <TechStackCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BentoGrid;
