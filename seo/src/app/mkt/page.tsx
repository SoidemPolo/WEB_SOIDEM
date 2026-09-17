import { Info } from "lucide-react";

import { auditarTodas, porArea } from "@/lib/audit";
import { PROPERTIES } from "@/lib/properties";
import { Encabezado, Prioridades, TarjetaPropiedad, Tile } from "@/components/panel";

export const revalidate = 1800;

/** Los KPI que no se pueden medir descargando la página, y de dónde saldrían. */
const PENDIENTES = [
  ["Clics e impresiones", "Search Console"],
  ["Posición media y consultas", "Search Console"],
  ["Sesiones, usuarios y origen", "Google Analytics 4"],
  ["Core Web Vitals de campo", "Search Console / CrUX"],
];

/**
 * Vista de marketing: lo que Google enseña cuando ya ha entrado, y lo que se ve
 * al compartir un enlace. Son cosas que se arreglan escribiendo, no tocando el
 * servidor.
 */
export default async function VistaMkt() {
  const auditorias = await auditarTodas(PROPERTIES);
  const porSitio = auditorias.map((a) => ({ a, cs: porArea(a.comprobaciones, "mkt") }));

  const cuenta = (id: string) =>
    porSitio.filter(({ cs }) => cs.some((c) => c.id === id && c.estado === "bien")).length;

  const total = auditorias.length;
  const titulos = cuenta("titulo");
  const descripciones = cuenta("descripcion");
  const og = cuenta("og");
  const datos = cuenta("jsonld");

  const fallos = porSitio.flatMap(({ a, cs }) =>
    cs.filter((c) => c.estado === "mal").map((c) => ({ propiedad: a.property.name, c })),
  );

  return (
    <main className="mx-auto max-w-[1180px] px-6 py-10">
      <Encabezado
        kicker="Vista marketing"
        titulo="Qué enseña Google cuando ya ha entrado"
        entradilla="Títulos, descripciones, titulares y tarjetas al compartir. Es lo que decide si alguien hace clic en tu resultado o en el de al lado, y se arregla escribiendo."
        medidoEn={auditorias[0]?.medidoEn ?? new Date().toISOString()}
      />

      <section aria-label="Resumen" className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Tile
          etiqueta="Títulos en su medida"
          valor={`${titulos} / ${total}`}
          estado={titulos === total ? "bien" : titulos > 0 ? "aviso" : "mal"}
          pie="Entre 30 y 60 caracteres, sin recortar"
        />
        <Tile
          etiqueta="Descripciones"
          valor={`${descripciones} / ${total}`}
          estado={descripciones === total ? "bien" : descripciones > 0 ? "aviso" : "mal"}
          pie="Entre 70 y 160 caracteres"
        />
        <Tile
          etiqueta="Tarjeta al compartir"
          valor={`${og} / ${total}`}
          estado={og === total ? "bien" : og > 0 ? "mal" : "mal"}
          pie="Open Graph con título e imagen"
        />
        <Tile
          etiqueta="Datos estructurados"
          valor={`${datos} / ${total}`}
          estado={datos === total ? "bien" : datos > 0 ? "aviso" : "mal"}
          pie="Para que Google muestre el resultado enriquecido"
        />
      </section>

      <Prioridades fallos={fallos} titulo="Lo que más cuesta en clics" />

      <section className="mt-9 space-y-5">
        {porSitio.map(({ a, cs }) => (
          <TarjetaPropiedad key={a.property.id} auditoria={a} comprobaciones={cs} />
        ))}
      </section>

      {/* Los KPI de tráfico son los que de verdad quiere marketing, y son
          justo los que no se pueden medir descargando la página. */}
      <section className="mt-12 rounded-card border border-hair bg-white p-6">
        <h2 className="flex items-center gap-2 text-[18px]">
          <Info aria-hidden className="size-5 text-teal" />
          KPI de tráfico: pendientes de conectar
        </h2>
        <p className="mt-3 max-w-[72ch] text-[15px] leading-relaxed text-stone">
          Todo lo de arriba se mide descargando cada página, así que es real. Estos
          otros no se pueden obtener así: viven en Google y necesitan credenciales,
          que van en el backend y no en esta aplicación. Mientras no estén
          conectados, el panel los deja vacíos en lugar de enseñar cifras de ejemplo
          que parecerían reales.
        </p>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {PENDIENTES.map(([kpi, fuente]) => (
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
    </main>
  );
}
