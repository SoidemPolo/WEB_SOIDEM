"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

export type Logo = { alt: string; src: string; w: number; h: number };

const AUTO_MS = 4500;

/**
 * Carrusel horizontal de logos. Se desplaza por páginas con scroll-snap, así que
 * el arrastre con el dedo y la rueda horizontal funcionan solos; los puntos de
 * abajo saltan de página. Avanza solo y se detiene mientras el ratón está encima,
 * mientras hay foco dentro o si el sistema pide menos animación.
 */
export function LogoCarousel({ logos, label }: { logos: Logo[]; label: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);

  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(0);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const total = Math.max(1, Math.round(track.scrollWidth / track.clientWidth));
    setPages(total);
    setPage(Math.round(track.scrollLeft / track.clientWidth));
  }, []);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(track);

    // Sin esto el carrusel avanzaría fuera de pantalla y quien llega a la
    // sección la encuentra empezada por la mitad.
    const inView = new IntersectionObserver(
      (entries) => setVisible(entries[0]?.isIntersecting ?? false),
      { threshold: 0.3 },
    );
    inView.observe(track);

    return () => {
      resize.disconnect();
      inView.disconnect();
    };
  }, [measure]);

  const goTo = useCallback((target: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: target * track.clientWidth, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      const track = trackRef.current;
      if (!track || paused.current || document.hidden || !visible) return;
      const total = Math.max(1, Math.round(track.scrollWidth / track.clientWidth));
      const next = (Math.round(track.scrollLeft / track.clientWidth) + 1) % total;
      track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" });
    }, AUTO_MS);

    return () => window.clearInterval(timer);
  }, [visible]);

  return (
    <div
      onPointerEnter={() => {
        paused.current = true;
      }}
      onPointerLeave={() => {
        paused.current = false;
      }}
      onFocusCapture={() => {
        paused.current = true;
      }}
      onBlurCapture={() => {
        paused.current = false;
      }}
    >
      <div
        ref={trackRef}
        role="group"
        aria-label={label}
        tabIndex={0}
        onScroll={(event) => {
          const track = event.currentTarget;
          setPage(Math.round(track.scrollLeft / track.clientWidth));
        }}
        className="logo-track rounded-[14px] border border-white/15 bg-white/15"
      >
        {logos.map((logo, i) => (
          <div
            key={`${logo.alt}-${i}`}
            className="logo-cell grid place-items-center bg-white px-3 py-[15px]"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.w}
              height={logo.h}
              className="h-auto max-h-[30px] w-auto max-w-[84%] object-contain opacity-[0.72] grayscale transition duration-200 hover:scale-[1.03] hover:opacity-100 hover:grayscale-0"
            />
          </div>
        ))}
      </div>

      {pages > 1 && (
        <div className="mt-5 flex justify-center gap-2.5">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ir a la página ${i + 1} de ${pages}`}
              aria-current={i === page}
              onClick={() => goTo(i)}
              className={cn(
                "size-2 rounded-full transition-[background,transform] duration-200",
                i === page ? "scale-125 bg-white" : "bg-white/30 hover:bg-white/60",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
