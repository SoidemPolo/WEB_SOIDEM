"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Barra de progreso de lectura. La landing es larga y sin ella no hay forma de
 * saber cuánto queda. Va pegada al borde inferior de la cabecera y se anima con
 * un resorte para que no dé tirones al hacer scroll rápido.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const ancho = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: ancho }}
      className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-gradient-to-r from-teal to-[#5AC8FA]"
    />
  );
}
