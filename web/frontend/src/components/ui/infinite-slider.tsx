"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "motion/react";
import useMeasure from "react-use-measure";

import { cn } from "@/lib/utils";

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  className?: string;
};

/**
 * InfiniteSlider de @ibelick (21st.dev / motion-primitives).
 *
 * Dos cambios respecto al original:
 *
 * 1. Importa de `motion/react` en vez de `framer-motion`. Son la misma
 *    librería —`motion` es el nombre nuevo de framer-motion— y el proyecto ya
 *    la tiene instalada; añadir framer-motion metería una segunda copia del
 *    motor de animación en el bundle.
 *
 * 2. Respeta `prefers-reduced-motion`. Un carrusel que no para nunca es un
 *    problema real para quien tiene trastornos vestibulares, así que si el
 *    sistema pide menos animación el contenido se queda quieto y se puede
 *    recorrer a mano.
 */
export function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  direction = "horizontal",
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [currentDuration, setCurrentDuration] = useState(duration);
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const size = direction === "horizontal" ? width : height;
    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    const controls = isTransitioning
      ? animate(translation, [translation.get(), to], {
          ease: "linear",
          duration: currentDuration * Math.abs((translation.get() - to) / contentSize),
          onComplete: () => {
            setIsTransitioning(false);
            setKey((prevKey) => prevKey + 1);
          },
        })
      : animate(translation, [from, to], {
          ease: "linear",
          duration: currentDuration,
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 0,
          onRepeat: () => {
            translation.set(from);
          },
        });

    // El original devuelve `controls?.stop` sin invocarlo. Aquí se envuelve en
    // una función para no depender de que el método venga ligado a su objeto.
    return () => controls?.stop();
  }, [
    key,
    translation,
    currentDuration,
    width,
    height,
    gap,
    isTransitioning,
    direction,
    reverse,
    reducedMotion,
  ]);

  const hoverProps =
    durationOnHover && !reducedMotion
      ? {
          onHoverStart: () => {
            setIsTransitioning(true);
            setCurrentDuration(durationOnHover);
          },
          onHoverEnd: () => {
            setIsTransitioning(true);
            setCurrentDuration(duration);
          },
        }
      : {};

  return (
    <div
      className={cn(
        "overflow-hidden",
        // Sin animación el contenido no cabe: se deja recorrer a mano.
        reducedMotion && "overflow-x-auto",
        className,
      )}
    >
      <motion.div
        className="flex w-max"
        style={{
          ...(direction === "horizontal" ? { x: translation } : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === "horizontal" ? "row" : "column",
        }}
        ref={ref}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
