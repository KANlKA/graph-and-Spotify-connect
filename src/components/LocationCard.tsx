"use client";

import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";

const MapLocation = dynamic(() => import("./MapLocation"), { ssr: false });

export default function LocationCard() {
  return (
    <div
      className="relative overflow-hidden rounded-[1rem] border border-border bg-card w-full"
      style={{ height: "320px" }}
    >
      <div className="absolute top-4 left-4 z-[1000]">
        <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0d1117]/90 backdrop-blur-sm border border-zinc-700/40 text-sm font-semibold text-white select-none">
          <MapPin className="h-4 w-4 fill-white text-white" />
          Location
        </span>
      </div>

      <MapLocation />
    </div>
  );
}