"use client";

import "leaflet/dist/leaflet.css";

import { useEffect, useRef, useState } from "react";
import type { Map as LeafletMap, ZoomPanOptions } from "leaflet";

import { Minus } from "@/components/icons/Minus";
import { Plus } from "@/components/icons/Plus";
import { cn } from "@/lib/utils";

const LATITUDE = 12.9716;
const LONGITUDE = 77.5946;

const ZOOM_STEP = 2;
const zoomOptions: ZoomPanOptions = {
  animate: true,
  duration: 0.5,
  easeLinearity: 0.25,
};

const MAX_ZOOM = 12;
const MIN_ZOOM = 8;

const MAP_URL = "/api/map/{z}/{x}/{y}";

interface ZoomButtonProps
  extends Pick<React.HTMLProps<HTMLButtonElement>, "onClick" | "children" | "className"> {
  hide?: boolean;
}

const ZoomButton = ({ onClick, children, className, hide }: ZoomButtonProps) => (
  <button
    onClick={onClick}
    className={cn(
      "absolute size-10 rounded-full bg-zinc-950 text-3xl leading-none outline outline-2 outline-slate-700",
      "scale-100 transition-all duration-300 hover:outline-4",
      "flex items-center justify-center",
      hide && "scale-0",
      className
    )}
    aria-hidden={hide}
    tabIndex={hide ? -1 : 0}
  >
    {children}
  </button>
);

export default function MapLocation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const [currentZoom, setCurrentZoom] = useState(MAX_ZOOM);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let map: LeafletMap;

    import("leaflet").then((L) => {
      if (!containerRef.current || mapRef.current) return;

      map = L.map(containerRef.current, {
        center: [LATITUDE, LONGITUDE],
        zoom: MAX_ZOOM,
        dragging: false,
        touchZoom: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        zoomControl: false,
        attributionControl: false,
      });

      L.tileLayer(MAP_URL, {
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 1,
      }).addTo(map);

      mapRef.current = map;
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const zoomIn = () => {
    setCurrentZoom((prev) => {
      const newZoom = Math.min(prev + ZOOM_STEP, MAX_ZOOM);
      mapRef.current?.setZoom(newZoom, zoomOptions);
      return newZoom;
    });
  };

  const zoomOut = () => {
    setCurrentZoom((prev) => {
      const newZoom = Math.max(prev - ZOOM_STEP, MIN_ZOOM);
      mapRef.current?.setZoom(newZoom, zoomOptions);
      return newZoom;
    });
  };

  return (
    <div className="relative group h-full">
      <div
        ref={containerRef}
        className={cn(
          "brightness-[0.64] -hue-rotate-[24deg] saturate-[0.86]",
          "h-full min-h-full w-full"
        )}
      />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[500]">
        <div className="relative size-16">
          <div className="absolute size-full animate-ping rounded-full bg-emerald-300/20 opacity-65 blur-sm" />
          <div className="size-full rounded-full bg-emerald-400/30 drop-shadow-[0_0_20px_rgba(52,211,153,0.8)]" />
        </div>
      </div>

      <ZoomButton onClick={zoomOut} className="bottom-4 left-4 z-[1000]" hide={currentZoom <= MIN_ZOOM}>
        <Minus className="size-4" />
      </ZoomButton>
      <ZoomButton onClick={zoomIn} className="bottom-4 right-4 z-[1000]" hide={currentZoom >= MAX_ZOOM}>
        <Plus className="size-4" />
      </ZoomButton>
    </div>
  );
}
