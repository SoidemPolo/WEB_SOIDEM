"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

import { ArrowLink } from "@/components/ui/arrow-link";
import { Reveal } from "@/components/ui/reveal";
import { PRODUCTS, productIdFromHash } from "@/lib/products";
import { cn } from "@/lib/utils";

/** Captura de cada producto. Las de Captur, Factur y TMS están tomadas de su
 *  propia web; MESOEE y EBR son paneles reales del producto. */
type Shot = { src: string; alt: string; w: number; h: number };

const SHOTS: Record<string, Shot> = {
  mesoee: {
    src: "/images/mesoee-panel.png",
    alt: "Panel MESOEE con incidencias, OEE, mermas y estado de una línea de producción",
    w: 1903,
    h: 953,
  },
  ebr: {
    src: "/images/ebr-panel.png",
    alt: "Panel EBR con fabricación guiada, recetas, lotes, desviaciones y audit trail",
    w: 1901,
    h: 895,
  },
  captur: {
    src: "/images/captur-panel.png",
    alt: "Terminal de fichaje de CAPTUR con el estado de la jornada de cada persona",
    w: 1226,
    h: 1100,
  },
  factur: {
    src: "/images/factur-panel.png",
    alt: "Factur extrayendo los campos de una orden de compra a partir del documento",
    w: 1256,
    h: 1542,
  },
  tms: {
    src: "/images/tms-panel.png",
    alt: "Ficha operativa de un envío en Soidem TMS, con su timeline, SLA e incidencia",
    w: 1310,
    h: 1092,
  },
  capfa: {
    src: "/images/capfa-panel.jpg",
    alt: "Cuadro de mando de +CAPFA con los indicadores del centro y sus gráficas de actividad",
    w: 1594,
    h: 896,
  },
};

/** El enlace bajo la captura: al sitio del producto si lo tiene, o a contacto. */
function linkFor(id: string) {
  const product = PRODUCTS.find((p) => p.id === id)!;
  if (product.site) {
    return { href: product.site, label: `Visitar ${new URL(product.site).hostname}`, external: true };
  }
  if (id === "capfa") {
    return { href: "https://www.soidemdt.com/ariadna", label: "Conocer +CAPFA", external: false };
  }
  return { href: "/contacto", label: `Solicitar información sobre ${product.name}`, external: false };
}

export function Products() {
  const [active, setActive] = useState(PRODUCTS[0].id);
  const sectionRef = useRef<HTMLElement>(null);
  const ultimoScroll = useRef(0);

  /**
   * Pasar el ratón por una pestaña la selecciona, como en la web actual. Pero si
   * se está haciendo scroll con la rueda y el cursor queda sobre la lista, las
   * pestañas van pasando solas bajo el puntero. Se ignora el hover durante un
   * instante después de cada scroll para que eso no ocurra.
   */
  useEffect(() => {
    const onScroll = () => {
      ultimoScroll.current = Date.now();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const seleccionarAlPasar = (id: string) => {
    if (Date.now() - ultimoScroll.current < 250) return;
    setActive(id);
  };

  /**
   * El desplegable de la cabecera enlaza a #producto-<id>. Al llegar con ese
   * hash se abre ese panel y se lleva la vista a la sección, de forma que el
   * menú no solo lleve a la sección: lleve al producto.
   */
  useEffect(() => {
    function applyHash() {
      const id = productIdFromHash(window.location.hash);
      if (!id) return;
      setActive(id);
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  const current = PRODUCTS.find((p) => p.id === active) ?? PRODUCTS[0];
  const shot = SHOTS[current.id];
  const link = linkFor(current.id);
  const IconoActual = current.icon;

  return (
    <section id="productos" ref={sectionRef} className="py-section">
      <div className="wrap">
        <Reveal>
          <p className="kicker">Productos creados por SOIDEM</p>
          <h2 className="h2-display">
            Cuando un problema se repite, lo convertimos en producto.
          </h2>
          <p className="lead">
            Software nacido de operaciones reales y preparado para resolver
            necesidades concretas sin empezar de cero.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,340px)_1fr]">
          <div role="tablist" aria-label="Productos" className="flex flex-col gap-2">
            {PRODUCTS.map((product) => {
              const selected = product.id === active;
              const Icono = product.icon;
              return (
                <button
                  key={product.id}
                  type="button"
                  role="tab"
                  id={`tab-${product.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${product.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(product.id)}
                  onMouseEnter={() => seleccionarAlPasar(product.id)}
                  /* El color de marca del producto viaja como variable: así una
                     sola regla sirve para los seis en vez de seis juegos de
                     clases, y Tailwind no tiene que generar utilidades por
                     color. */
                  style={{ "--marca": product.color } as React.CSSProperties}
                  className={cn(
                    "group flex items-start gap-3.5 rounded-card border p-4 text-left",
                    "transition-[border-color,background,box-shadow,transform] duration-200",
                    "hover:-translate-y-px hover:border-[var(--marca)] hover:shadow-[0_10px_28px_color-mix(in_srgb,var(--marca)_18%,transparent)]",
                    selected
                      ? "border-[var(--marca)] bg-[color-mix(in_srgb,var(--marca)_7%,white)]"
                      : "border-hair bg-white",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "grid size-9 shrink-0 place-items-center rounded-[10px] transition-colors duration-200",
                      "bg-[color-mix(in_srgb,var(--marca)_12%,white)] text-[var(--marca)]",
                      "group-hover:bg-[var(--marca)] group-hover:text-white",
                      selected && "bg-[var(--marca)] text-white",
                    )}
                  >
                    <Icono className="size-[18px]" strokeWidth={2.2} />
                  </span>

                  <span className="min-w-0">
                    <span className="flex flex-wrap items-baseline gap-2">
                      <b className="text-[17px] font-[650]">{product.name}</b>
                      <small className="text-[12.5px] text-stone">· {product.tag}</small>
                    </span>
                    <span className="mt-1 block text-[14px] text-stone">{product.value}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id={`panel-${current.id}`}
            aria-labelledby={`tab-${current.id}`}
            className="flex flex-col gap-4"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden rounded-card border border-hair bg-white"
              >
                <div
                  className="flex items-center justify-between gap-4 border-b border-hair px-4 py-3"
                  style={{
                    background: `color-mix(in srgb, ${current.color} 7%, white)`,
                    borderColor: `color-mix(in srgb, ${current.color} 22%, transparent)`,
                  }}
                >
                  <span className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="grid size-8 shrink-0 place-items-center rounded-[9px] text-white"
                      style={{ background: current.color }}
                    >
                      <IconoActual className="size-4" strokeWidth={2.2} />
                    </span>
                  {current.logo ? (
                    <Image
                      src={current.logo.src}
                      alt={current.name}
                      width={current.logo.w}
                      height={current.logo.h}
                      className="h-6 w-auto object-contain"
                    />
                  ) : (
                    <b className="text-[15px] font-[650]">{current.name}</b>
                  )}
                  </span>
                  <span className="text-[11.5px] font-semibold uppercase tracking-[0.1em] text-stone">
                    {current.tag}
                  </span>
                </div>
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={shot.w}
                  height={shot.h}
                  className="h-auto w-full"
                />
              </motion.div>
            </AnimatePresence>

            <ArrowLink href={link.href} external={link.external}>
              {link.label}
            </ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}

