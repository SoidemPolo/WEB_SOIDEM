import { AlertTriangle, CheckCircle2, CircleAlert, ExternalLink, Info } from "lucide-react";

import { auditarTodas, type Auditoria, type Estado } from "@/lib/audit";
import { PROPERTIES } from "@/lib/properties";
import { cn } from "@/lib/utils";

/** Se recalcula cada media hora; no tiene sentido auditar en cada visita. */
export const revalidate = 1800;

export default async function PanelSeo() {
  const auditorias = await auditarTodas(PROPERTIES);

  const total = auditorias.reduce((n, a) => n + a.puntuacion.total, 0);
  const pasa = auditorias.reduce((n, a) => n + a.puntuacion.pasa, 0);
  const fallos = auditorias.flatMap((a) =>
    a.comprobaciones.filter((c) => c.estado === "mal").map((c) => ({ a, c })),
  );
  const caidas = auditorias.filter((a) => !a.ok);

  return (
    <main className="mx-auto max-w-[1180px] px-6 py-12">
      <header className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-stone">
            SOIDEM · Panel interno
          </p>
          <h1 className="mt-2 text-[clamp(28px,3.4vw,40px)]">Estado de SEO técnico</h1>
          <p className="mt-3 max-w-[64ch] text-[16px] text-stone">
            {PROPERTIES.length} propiedades auditadas en vivo: el sitio corporativo y
            los subdominios de producto, que también son servicios nuestros.
          </p>
        </div>
        <p className="text-[13px] text-stone">
          Medido {new Date(auditorias[0]?.medidoEn ?? Date.now()).toLocaleString("es-ES")}
          <span className="mt-0.5 block">Se recalcula cada 30 minutos</span>
        </p>
      </header>

      {/* Titulares. Son recuentos, no un gráfico: con cuatro propiedades y sin
          serie temporal, una gráfica no añadiría nada que no diga el número. */}
      <section aria-label="Resumen" className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Tile
          etiqueta="Comprobaciones superadas"
          valor={`${pasa} / ${total}`}
          estado={pasa === total ? "bien" : pasa / total > 0.8 ? "aviso" : "mal"}
        />
        <Tile
          etiqueta="Propiedades en línea"
          valor={`${auditorias.length - caidas.length} / ${auditorias.length}`}
          estado={caidas.length === 0 ? "bien" : "mal"}
        />
        <Tile
          etiqueta="Problemas serios"
          valor={String(fallos.length)}
          estado={fallos.length === 0 ? "bien" : "mal"}
        />
        <Tile
          etiqueta="Respuesta más lenta"
          valor={(() => {
            const ms = auditorias.map((a) => a.ms ?? 0);
            const max = Math.max(...ms);
            return max ? `${max} ms` : "—";
          })()}
          estado={(() => {
            const max = Math.max(...auditorias.map((a) => a.ms ?? 0));
            return max < 600 ? "bien" : max < 1500 ? "aviso" : "mal";
          })()}
        />
      </section>

      {fallos.length > 0 && (
        <section className="mt-8 rounded-card border border-mal/30 bg-mal/[0.04] p-5">
          <h2 className="flex items-center gap-2 text-[16px] text-mal">
            <CircleAlert aria-hidden className="size-4.5" />
            Qué arreglar primero
          </h2>
          <ul className="mt-3 space-y-2">
            {fallos.map(({ a, c }) => (
              <li key={`${a.property.id}-${c.id}`} className="text-[14.5px] text-ink">
                <b className="font-[650]">{a.property.name}</b> — {c.etiqueta}:{" "}
                <span className="text-stone">{c.valor}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-10 space-y-5">
        {auditorias.map((a) => (
          <TarjetaPropiedad key={a.property.id} auditoria={a} />
        ))}
      </section>

      <PendienteDeConectar />
    </main>
  );
}

function Tile({
  etiqueta,
  valor,
  estado,
}: {
  etiqueta: string;
  valor: string;
  estado: Estado;
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
    </div>
  );
}

/** Estado con icono y texto, nunca solo con color. */
function Marca({ estado }: { estado: Estado }) {
  const Icono = estado === "bien" ? CheckCircle2 : estado === "aviso" ? AlertTriangle : CircleAlert;
  const color = estado === "bien" ? "text-bien" : estado === "aviso" ? "text-aviso" : "text-mal";
  const texto = estado === "bien" ? "correcto" : estado === "aviso" ? "revisar" : "problema";
  return (
    <>
      <Icono aria-hidden className={cn("size-5 shrink-0", color)} />
      <span className="sr-only">{texto}: </span>
    </>
  );
}

function TarjetaPropiedad({ auditoria }: { auditoria: Auditoria }) {
  const { property, puntuacion, comprobaciones, error } = auditoria;

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
            {puntuacion.pasa} / {puntuacion.total} correctas
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

/**
 * Los KPI de tráfico no se pueden medir descargando la página. En vez de
 * rellenarlos con cifras de ejemplo, el panel dice qué falta y de dónde saldría.
 */
function PendienteDeConectar() {
  const kpis = [
    ["Clics e impresiones", "Search Console"],
    ["Posición media y consultas", "Search Console"],
    ["Sesiones, usuarios y origen", "Google Analytics 4"],
    ["Core Web Vitals de campo", "Search Console / CrUX"],
  ];

  return (
    <section className="mt-12 rounded-card border border-hair bg-white p-6">
      <h2 className="flex items-center gap-2 text-[18px]">
        <Info aria-hidden className="size-5 text-teal" />
        KPI de tráfico: pendientes de conectar
      </h2>
      <p className="mt-3 max-w-[70ch] text-[15px] leading-relaxed text-stone">
        Todo lo de arriba se mide descargando cada página, así que es real. Estos
        otros no se pueden obtener así: viven en Google y necesitan credenciales,
        que van en el backend y no en esta aplicación. Mientras no estén
        conectados, el panel los deja vacíos en lugar de enseñar cifras de ejemplo
        que parecerían reales.
      </p>
      <ul className="mt-5 grid gap-2 sm:grid-cols-2">
        {kpis.map(([kpi, fuente]) => (
          <li
            key={kpi}
            className="flex items-center justify-between gap-3 rounded-lg border border-dashed border-hair px-4 py-3"
          >
            <span className="text-[14.5px] font-[650] text-stone">{kpi}</span>
            <span className="text-[12px] uppercase tracking-[0.08em] text-stone">
              {fuente}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
