import { ChevronRight, PlugZap, Unplug } from "lucide-react";

import { auditarTodas, porArea } from "@/lib/audit";
import {
  CANALES,
  EMBUDO,
  FUENTES,
  estadoFuentes,
  type Etapa,
  type Fuente,
} from "@/lib/marketing";
import { PROPERTIES } from "@/lib/properties";
import { Encabezado, Prioridades, TarjetaPropiedad, Tile } from "@/components/panel";
import { cn } from "@/lib/utils";

export const revalidate = 1800;

/**
 * Vista de marketing: de dónde vienen los clics y cómo va el embudo.
 *
 * Las cifras del embudo y de los canales viven en Search Console, GA4, el
 * backend y HubSpot. Mientras una fuente no esté conectada, su KPI se queda
 * vacío y dice qué falta: rellenarlo con datos de ejemplo sería peor que
 * dejarlo en blanco, porque sobre esos números se decide dónde gastar.
 */
export default async function VistaMkt() {
  const fuentes = estadoFuentes();
  const sinConectar = (Object.keys(fuentes) as Fuente[]).filter((f) => !fuentes[f]);

  const auditorias = await auditarTodas(PROPERTIES);
  const porSitio = auditorias.map((a) => ({ a, cs: porArea(a.comprobaciones, "mkt") }));
  const total = auditorias.length;
  const cuenta = (id: string) =>
    porSitio.filter(({ cs }) => cs.some((c) => c.id === id && c.estado === "bien")).length;
  const fallos = porSitio.flatMap(({ a, cs }) =>
    cs.filter((c) => c.estado === "mal").map((c) => ({ propiedad: a.property.name, c })),
  );

  return (
    <main className="mx-auto max-w-[1180px] px-6 py-10">
      <Encabezado
        kicker="Vista marketing"
        titulo="De dónde vienen los clics y en qué se convierten"
        entradilla="El recorrido completo: de aparecer en Google a firmar un proyecto. Cada escalón dice de qué fuente sale su número y qué se toca cuando va flojo."
        medidoEn={auditorias[0]?.medidoEn ?? new Date().toISOString()}
      />

      {sinConectar.length > 0 && <AvisoFuentes sinConectar={sinConectar} />}

      {/* EMBUDO */}
      <section className="mt-10">
        <h2 className="text-[20px]">Embudo comercial</h2>
        <p className="mt-2 max-w-[70ch] text-[15px] text-stone">
          Cada escalón pierde gente. Saber en cuál se pierde es lo que dice dónde
          merece la pena invertir: no sirve traer más visitas si el problema está en
          que nadie rellena el formulario.
        </p>

        <ol className="mt-6 space-y-2">
          {EMBUDO.map((etapa, i) => (
            <EscalonEmbudo
              key={etapa.id}
              etapa={etapa}
              indice={i}
              conectada={fuentes[etapa.fuente]}
            />
          ))}
        </ol>
      </section>

      {/* CANALES */}
      <section className="mt-12">
        <h2 className="text-[20px]">De dónde vienen los clics</h2>
        <p className="mt-2 max-w-[70ch] text-[15px] text-stone">
          Sin repartir las visitas por canal no se sabe qué esfuerzo está rindiendo
          ni cuál se puede dejar de hacer.
        </p>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CANALES.map((canal) => (
            <li
              key={canal.id}
              className="rounded-card border border-hair bg-white p-5"
            >
              <p className="text-[15px] font-[650]">{canal.nombre}</p>
              <p className="mt-1 text-[13px] leading-snug text-stone">{canal.descripcion}</p>
              <div className="mt-4 border-t border-hair pt-3">
                <ValorPendiente conectada={fuentes[canal.fuente]} fuente={canal.fuente} />
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* LO QUE SÍ SE PUEDE MEDIR HOY */}
      <section className="mt-14">
        <h2 className="text-[20px]">Lo que ya puedes arreglar hoy</h2>
        <p className="mt-2 max-w-[70ch] text-[15px] text-stone">
          Esto no necesita ninguna conexión: se mide descargando cada página. Es lo
          que decide si alguien pincha tu resultado o el de al lado, y se arregla
          escribiendo.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Tile
            etiqueta="Títulos en su medida"
            valor={`${cuenta("titulo")} / ${total}`}
            estado={cuenta("titulo") === total ? "bien" : cuenta("titulo") > 0 ? "aviso" : "mal"}
            pie="Entre 30 y 60 caracteres, sin recortar"
          />
          <Tile
            etiqueta="Descripciones"
            valor={`${cuenta("descripcion")} / ${total}`}
            estado={
              cuenta("descripcion") === total
                ? "bien"
                : cuenta("descripcion") > 0
                  ? "aviso"
                  : "mal"
            }
            pie="Entre 70 y 160 caracteres"
          />
          <Tile
            etiqueta="Tarjeta al compartir"
            valor={`${cuenta("og")} / ${total}`}
            estado={cuenta("og") === total ? "bien" : "mal"}
            pie="Open Graph con título e imagen"
          />
          <Tile
            etiqueta="Datos estructurados"
            valor={`${cuenta("jsonld")} / ${total}`}
            estado={
              cuenta("jsonld") === total ? "bien" : cuenta("jsonld") > 0 ? "aviso" : "mal"
            }
            pie="Para salir enriquecido en Google"
          />
        </div>

        <Prioridades fallos={fallos} titulo="Lo que más cuesta en clics" />

        <div className="mt-6 space-y-5">
          {porSitio.map(({ a, cs }) => (
            <TarjetaPropiedad key={a.property.id} auditoria={a} comprobaciones={cs} />
          ))}
        </div>
      </section>
    </main>
  );
}

function EscalonEmbudo({
  etapa,
  indice,
  conectada,
}: {
  etapa: Etapa;
  indice: number;
  conectada: boolean;
}) {
  // El ancho decreciente dibuja el embudo sin necesidad de una gráfica: con los
  // valores vacíos, una gráfica de embudo solo podría mentir.
  const ancho = 100 - indice * 7;

  return (
    <li className="flex items-stretch gap-4">
      <div
        className="min-w-0 flex-1 overflow-hidden rounded-card border border-hair bg-white"
        style={{ maxWidth: `${ancho}%` }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
          <div className="min-w-0">
            <p className="flex items-center gap-2 text-[16px] font-[650]">
              <span className="text-[12px] tabular-nums text-stone">{indice + 1}</span>
              {etapa.nombre}
            </p>
            <p className="mt-0.5 text-[13px] text-stone">{etapa.descripcion}</p>
          </div>

          <div className="flex shrink-0 items-center gap-4">
            <ValorPendiente conectada={conectada} fuente={etapa.fuente} />
          </div>
        </div>

        <p className="flex items-start gap-2 border-t border-hair bg-alt/60 px-5 py-2.5 text-[12.5px] text-stone">
          <ChevronRight aria-hidden className="mt-0.5 size-3.5 shrink-0 text-teal" />
          {etapa.palanca}
        </p>
      </div>
    </li>
  );
}

/** Un hueco de KPI: o el dato, o qué falta para tenerlo. Nunca un ejemplo. */
function ValorPendiente({ conectada, fuente }: { conectada: boolean; fuente: Fuente }) {
  const f = FUENTES[fuente];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-[12.5px] font-semibold",
        conectada
          ? "bg-bien/10 text-bien"
          : "border border-dashed border-hair bg-alt/70 text-stone",
      )}
      title={f.que}
    >
      {conectada ? (
        <PlugZap aria-hidden className="size-3.5" />
      ) : (
        <Unplug aria-hidden className="size-3.5" />
      )}
      {conectada ? `Listo · ${f.nombre}` : `Falta ${f.nombre}`}
    </span>
  );
}

function AvisoFuentes({ sinConectar }: { sinConectar: Fuente[] }) {
  return (
    <section className="mt-8 rounded-card border border-aviso/35 bg-aviso/[0.06] p-5">
      <h2 className="flex items-center gap-2 text-[16px] text-aviso">
        <Unplug aria-hidden className="size-4.5" />
        {sinConectar.length} fuente{sinConectar.length > 1 ? "s" : ""} sin conectar
      </h2>
      <p className="mt-2 max-w-[74ch] text-[14.5px] leading-relaxed text-ink">
        Sin ellas no hay clics, ni canales, ni embudo: esos números no se pueden
        calcular descargando una página. El panel los deja vacíos en vez de
        rellenarlos con cifras de ejemplo, porque un dato inventado aquí es
        indistinguible de uno real y sobre él se decide dónde gastar.
      </p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {sinConectar.map((f) => (
          <li key={f} className="rounded-lg border border-hair bg-white px-4 py-3">
            <p className="text-[14.5px] font-[650]">{FUENTES[f].nombre}</p>
            <p className="mt-0.5 text-[12.5px] leading-snug text-stone">{FUENTES[f].que}</p>
            <p className="mt-1.5 font-mono text-[11.5px] text-stone">{FUENTES[f].env}</p>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[13px] text-stone">
        Las credenciales van en el backend, nunca en esta aplicación.
      </p>
    </section>
  );
}
