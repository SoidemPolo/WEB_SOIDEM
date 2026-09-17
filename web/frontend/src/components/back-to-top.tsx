"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Botón de volver arriba. Aparece solo cuando ya se ha bajado lo suficiente
 * para que haga falta, no desde el primer píxel.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 1.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Volver arriba"
      tabIndex={visible ? 0 : -1}
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        })
      }
      className={cn(
        "boton-arriba fixed bottom-6 right-6 z-[70] grid size-11 place-items-center rounded-full border border-hair bg-white text-ink shadow-[0_10px_30px_rgba(25,28,30,.16)]",
        "transition-[opacity,transform] duration-300 hover:-translate-y-0.5 hover:border-teal hover:text-teal",
        visible ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <ArrowUp aria-hidden className="size-4.5" />
    </button>
  );
}
