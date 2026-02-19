"use client";

import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";

const MapLocation = dynamic(() => import("./MapLocation"), { ssr: false });

export default function LocationCard() {
  return (
    <div
      className="relative overflow-hidden rounded-[1rem] border border-border bg-card w-full h-full"
    >
      <div className="absolute top-4 left-4 z-[1000]">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/60 bg-zinc-800 px-2.5 py-1 text-xs font-medium text-white select-none">
          <MapPin className="h-3 w-3 text-white" />
          Location
        </span>
      </div>

      <MapLocation />
    </div>
  );
}
