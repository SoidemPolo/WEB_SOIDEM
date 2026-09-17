"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

import { ArrowLink } from "@/components/ui/arrow-link";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type Product = {
  id: string;
  name: string;
  tag: string;
  value: string;
  shot:
    | { kind: "image"; src: string; alt: string; w: number; h: number }
    | { kind: "mock"; title: string; body: React.ReactNode };
  link: { href: string; label: string; external?: boolean };
};

const PRODUCTS: Product[] = [
  {
    id: "mesoee",
    name: "MESOEE",
    tag: "Producción · OEE",
    value: "Incidencias, paradas y mermas conectadas al OEE de cada línea.",
    shot: {
      kind: "image",
      src: "/images/mesoee-panel.png",
      alt: "Panel MESOEE con incidencias, OEE, mermas y estado de una línea de producción",
      w: 1903,
      h: 953,
    },
    link: { href: "/contacto", label: "Solicitar información sobre MESOEE" },
  },
  {
    id: "ebr",
    name: "EBR",
    tag: "Pharma · Fabricación guiada",
    value: "Recetas, validaciones y trazabilidad para ejecutar cada lote con control.",
    shot: {
      kind: "image",
      src: "/images/ebr-panel.png",
      alt: "Panel EBR con fabricación guiada, recetas, lotes, desviaciones y audit trail",
      w: 1901,
      h: 895,
    },
    link: { href: "/contacto", label: "Solicitar información sobre EBR" },
  },
  {
    id: "captur",
    name: "Captur",
    tag: "Control horario",
    value: "El fichaje que tu equipo de verdad usará.",
    shot: {
      kind: "mock",
      title: "Captur · Jornada",
      body: (
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <MockLabel>Estado</MockLabel>
            <div className="rounded-xl border border-hair bg-white px-4 py-6 text-center text-[15px] font-semibold">
              Jornada
              <br />
              en curso
            </div>
            <div className="mt-3 flex gap-2">
              <MockChip active>Iniciar</MockChip>
              <MockChip>Finalizar</MockChip>
            </div>
          </div>
          <div>
            <MockLabel>Calendario</MockLabel>
            <div className="grid grid-cols-7 gap-1.5">
              {Array.from({ length: 21 }).map((_, i) => (
                <i
                  key={i}
                  className={cn(
                    "aspect-square rounded-[3px]",
                    i === 5 || i === 6 ? "bg-teal" : "bg-hair",
                  )}
                />
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <MockChip>Vacaciones</MockChip>
              <MockChip>Solicitar corrección</MockChip>
            </div>
          </div>
        </div>
      ),
    },
    link: {
      href: "https://captur.soidemdt.com/",
      label: "Visitar captur.soidemdt.com",
      external: true,
    },
  },
  {
    id: "factur",
    name: "Factur",
    tag: "Órdenes de compra",
    value: "Tus pedidos. En datos. En segundos.",
    shot: {
      kind: "mock",
      title: "Factur · Documento entrante",
      body: (
        <div className="grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
          <div>
            <MockLabel>Documento</MockLabel>
            <div className="space-y-2 rounded-xl border border-hair bg-white p-4">
              {[70, 55, 85, 40, 65].map((w, i) => (
                <span
                  key={i}
                  className={cn(
                    "block h-2 rounded-full",
                    i % 2 === 1 ? "bg-teal/30" : "bg-hair",
                  )}
                  style={{ width: `${w}%` }}
                />
              ))}
            </div>
          </div>
          <span aria-hidden className="text-center text-2xl text-teal">
            →
          </span>
          <div>
            <MockLabel>Campos extraídos</MockLabel>
            <div className="space-y-1.5">
              {["Proveedor", "Fecha", "Líneas", "Importe"].map((field) => (
                <p
                  key={field}
                  className="flex items-center justify-between rounded-lg border border-hair bg-white px-3 py-2 text-[13px]"
                >
                  {field}
                  <i className="size-2 rounded-full bg-ok" />
                </p>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <MockChip active>Validar</MockChip>
              <MockChip>Enviar al ERP</MockChip>
            </div>
          </div>
        </div>
      ),
    },
    link: {
      href: "https://factur.soidemdt.com/",
      label: "Visitar factur.soidemdt.com",
      external: true,
    },
  },
  {
    id: "tms",
    name: "TMS",
    tag: "Logística de envíos",
    value: "Cada envío bajo control.",
    shot: {
      kind: "mock",
      title: "TMS · Seguimiento de envío",
      body: (
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <MockLabel>Ruta</MockLabel>
            <div className="flex items-center gap-1">
              <i className="size-3 rounded-full border-2 border-teal bg-white" />
              <i className="h-0.5 flex-1 bg-teal" />
              <i className="size-3 rounded-full border-2 border-teal bg-teal" />
              <i className="h-0.5 flex-1 border-t-2 border-dashed border-line" />
              <i className="size-3 rounded-full border-2 border-line bg-white" />
            </div>
            <div className="mt-2 flex justify-between text-[11.5px] text-stone">
              <span>Recogida</span>
              <span>Tránsito</span>
              <span>Entrega</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <MockChip>Envío</MockChip>
              <MockChip active>Incidencia detectada</MockChip>
              <MockChip>Seguimiento</MockChip>
              <MockChip>Reclamación</MockChip>
            </div>
          </div>
          <div>
            <MockLabel>Detalle</MockLabel>
            <div className="space-y-2 rounded-xl border border-hair bg-white p-4">
              {[60, 80, 45].map((w, i) => (
                <span
                  key={i}
                  className="block h-2 rounded-full bg-hair"
                  style={{ width: `${w}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      ),
    },
    link: {
      href: "https://tms.soidemdt.com/",
      label: "Visitar tms.soidemdt.com",
      external: true,
    },
  },
  {
    id: "capfa",
    name: "+CAPFA",
    tag: "Salud · Atención Primaria",
    value: "Toda la actividad de tus centros, en un solo visor.",
    shot: {
      kind: "image",
      src: "https://static.wixstatic.com/media/2ec8b3_afeee6860b1e43a496f73d61d3d31041~mv2.png/v1/fill/w_1400,h_800,al_c,q_88/capfa.png",
      alt: "Captura real del cuadro de mando +CAPFA",
      w: 1400,
      h: 800,
    },
    link: { href: "https://www.soidemdt.com/ariadna", label: "Conocer +CAPFA" },
  },
];

export function Products() {
  const [active, setActive] = useState(PRODUCTS[0].id);
  const current = PRODUCTS.find((p) => p.id === active) ?? PRODUCTS[0];

  return (
    <section id="productos" className="py-section">
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
                  className={cn(
                    "rounded-card border p-4 text-left transition-colors",
                    selected
                      ? "border-teal bg-teal/[0.06]"
                      : "border-hair bg-white hover:border-line",
                  )}
                >
                  <span className="flex flex-wrap items-baseline gap-2">
                    <b className="text-[17px] font-[650]">{product.name}</b>
                    <small className="text-[12.5px] text-stone">· {product.tag}</small>
                  </span>
                  <span className="mt-1 block text-[14px] text-stone">
                    {product.value}
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
                {current.shot.kind === "image" ? (
                  <Image
                    src={current.shot.src}
                    alt={current.shot.alt}
                    width={current.shot.w}
                    height={current.shot.h}
                    className="h-auto w-full"
                  />
                ) : (
                  <div aria-hidden>
                    <div className="flex items-center gap-1.5 border-b border-hair bg-alt px-4 py-2.5 text-[12px] text-stone">
                      <i className="size-2 rounded-full bg-danger" />
                      <i className="size-2 rounded-full bg-warn" />
                      <i className="size-2 rounded-full bg-ok" />
                      <span className="ml-1.5">{current.shot.title}</span>
                    </div>
                    <div className="p-5">{current.shot.body}</div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <ArrowLink href={current.link.href} external={current.link.external}>
              {current.link.label}
            </ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function MockLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-stone">
      {children}
    </p>
  );
}

function MockChip({
  children,
  active = false,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <span
      className={cn(
        "rounded-full border px-3 py-1 text-[12px] font-medium",
        active ? "border-teal bg-teal text-white" : "border-hair bg-white text-stone",
      )}
    >
      {children}
    </span>
  );
}
