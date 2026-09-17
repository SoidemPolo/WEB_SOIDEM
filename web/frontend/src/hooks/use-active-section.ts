"use client";

import { useEffect, useState } from "react";

/**
 * Devuelve el id de la sección que se está leyendo, para marcarla en el menú.
 *
 * No usa el umbral de IntersectionObserver a secas: con secciones de alturas
 * muy distintas eso salta. Se queda con la sección cuyo borde superior es el
 * último que ha pasado por debajo de la cabecera.
 */
export function useActiveSection(ids: string[]) {
  const [activa, setActiva] = useState<string | null>(null);

  useEffect(() => {
    // Se ordenan por posición real en la página, no por el orden de la lista:
    // en la landing #caso va antes que #productos, y fiarse del array daba la
    // sección equivocada.
    const secciones = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
      .sort((a, b) => a.offsetTop - b.offsetTop);

    if (!secciones.length) return;

    function calcular() {
      // 96px: la altura de la cabecera (76) más un margen de holgura.
      const linea = 96;
      let actual: string | null = null;
      for (const seccion of secciones) {
        if (seccion.getBoundingClientRect().top <= linea) actual = seccion.id;
      }
      setActiva(actual);
    }

    calcular();
    window.addEventListener("scroll", calcular, { passive: true });
    window.addEventListener("resize", calcular);
    return () => {
      window.removeEventListener("scroll", calcular);
      window.removeEventListener("resize", calcular);
    };
  }, [ids]);

  return activa;
}
