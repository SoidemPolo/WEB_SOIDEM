import { AlertTriangle, CheckCircle2, CircleAlert, ExternalLink } from "lucide-react";

import type { Auditoria, Comprobacion, Estado } from "@/lib/audit";
import { cn } from "@/lib/utils";

/** Estado con icono y texto: nunca se distingue solo por el color. */
export function Marca({ estado }: { estado: Estado }) {
  const Icono =
    estado === "bien" ? CheckCircle2 : estado === "aviso" ? AlertTriangle : CircleAlert;
  const color =
    estado === "bien" ? "text-bien" : estado === "aviso" ? "text-aviso" : "text-mal";
  const texto = estado === "bien" ? "correcto" : estado === "aviso" ? "revisar" : "problema";

  return (
    <>
      <Icono aria-hidden className={cn("size-5 shrink-0", color)} />
      <span className="sr-only">{texto}: </span>
    </>
  );
}

export function Tile({
  etiqueta,
  valor,
  estado,
  pie,
}: {
  etiqueta: string;
  valor: string;
  estado: Estado;
  pie?: string;
}) {
  return (
    <div className="rounded-card border border-hair bg-white p-5">
      <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-stone">
        {etiqueta}
      </p>
      <p className="mt-2 flex items-center gap-2 text-[27px] font-[700] tracking-[-0.02em]">
        <Marca estado={estado} />
        {valor}
      </p>
      {pie && <p className="mt-1.5 text-[12.5px] leading-snug text-stone">{pie}</p>}
    </div>
  );
}

export function Prioridades({
  fallos,
  titulo,
}: {
  fallos: { propiedad: string; c: Comprobacion }[];
  titulo: string;
}) {
  if (fallos.length === 0) return null;

  return (
    <section className="mt-8 rounded-card border border-mal/30 bg-mal/[0.04] p-5">
      <h2 className="flex items-center gap-2 text-[16px] text-mal">
        <CircleAlert aria-hidden className="size-4.5" />
        {titulo}
      </h2>
      <ul className="mt-3 space-y-2">
        {fallos.map(({ propiedad, c }) => (
          <li key={`${propiedad}-${c.id}`} className="text-[14.5px] text-ink">
            <b className="font-[650]">{propiedad}</b> — {c.etiqueta}:{" "}
            <span className="text-stone">{c.valor}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function TarjetaPropiedad({
  auditoria,
  comprobaciones,
}: {
  auditoria: Auditoria;
  comprobaciones: Comprobacion[];
}) {
  const { property, error } = auditoria;
  const pasa = comprobaciones.filter((c) => c.estado === "bien").length;

  return (
    <article className="overflow-hidden rounded-card border border-hair bg-white">
      <div
        className="flex flex-wrap items-center justify-between gap-4 border-b border-hair px-5 py-4"
        style={{ background: `color-mix(in srgb, ${property.color} 6%, white)` }}
      >
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="size-2.5 shrink-0 rounded-full"
            style={{ background: property.color }}
          />
          <div>
            <h2 className="text-[17px]">{property.name}</h2>
            {property.producto && (
              <p className="text-[12.5px] text-stone">Sitio de {property.producto}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-[14px] font-[650]">
            {pasa} / {comprobaciones.length} correctas
          </p>
          <a
            href={property.url}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-teal underline underline-offset-4"
          >
            Abrir
            <ExternalLink aria-hidden className="size-3.5" />
          </a>
        </div>
      </div>

      {error ? (
        <p className="px-5 py-4 text-[14.5px] text-mal">No responde: {error}</p>
      ) : (
        <ul className="divide-y divide-hair">
          {comprobaciones.map((c) => (
            <li key={c.id} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 px-5 py-3">
              <span className="flex w-[190px] shrink-0 items-center gap-2 text-[14px] font-[650]">
                <Marca estado={c.estado} />
                {c.etiqueta}
              </span>
              <span className="min-w-0 flex-1 truncate text-[14px] text-ink" title={c.valor}>
                {c.valor}
              </span>
              {c.nota && (
                <span className="w-full text-[12.5px] text-stone sm:w-auto sm:max-w-[42ch]">
                  {c.nota}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export function Encabezado({
  kicker,
  titulo,
  entradilla,
  medidoEn,
}: {
  kicker: string;
  titulo: string;
  entradilla: string;
  medidoEn: string;
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-6">
      <div>
        <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-stone">
          {kicker}
        </p>
        <h1 className="mt-2 text-[clamp(26px,3.2vw,38px)]">{titulo}</h1>
        <p className="mt-3 max-w-[66ch] text-[16px] text-stone">{entradilla}</p>
      </div>
      <p className="text-[13px] text-stone">
        Medido {new Date(medidoEn).toLocaleString("es-ES")}
        <span className="mt-0.5 block">Se recalcula cada 30 minutos</span>
      </p>
    </header>
  );
}
