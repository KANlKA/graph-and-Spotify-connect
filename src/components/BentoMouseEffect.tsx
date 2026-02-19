"use client";

import { useEffect } from "react";

export default function BentoMouseEffect() {
  useEffect(() => {
    const bento = document.getElementById("bento");
    if (!bento) return;

    const handler = (e: MouseEvent) => {
      for (const card of bento.getElementsByClassName("bento-card")) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
        (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
      }
    };

    bento.addEventListener("mousemove", handler);
    return () => bento.removeEventListener("mousemove", handler);
  }, []);

  return null;
}
