import { auditarTodas, porArea } from "@/lib/audit";
import { PROPERTIES } from "@/lib/properties";
import { Encabezado, Prioridades, TarjetaPropiedad, Tile } from "@/components/panel";

export const revalidate = 1800;

/**
 * Vista de TI: lo que impide que Google entre, rastree e indexe. Son cosas que
 * se arreglan tocando el servidor o el código, no escribiendo mejor.
 */
export default async function VistaTi() {
  const auditorias = await auditarTodas(PROPERTIES);
  const porSitio = auditorias.map((a) => ({ a, cs: porArea(a.comprobaciones, "ti") }));

  const caidas = auditorias.filter((a) => !a.ok);
  const lenta = Math.max(...auditorias.map((a) => a.ms ?? 0));
  const noIndexables = porSitio.filter(({ cs }) =>
    cs.some((c) => c.id === "indexable" && c.estado === "mal"),
  ).length;
  const conSitemap = porSitio.filter(({ cs }) =>
    cs.some((c) => c.id === "sitemap" && c.estado === "bien"),
  ).length;

  const fallos = porSitio.flatMap(({ a, cs }) =>
    cs.filter((c) => c.estado === "mal").map((c) => ({ propiedad: a.property.name, c })),
  );

  return (
    <main className="mx-auto max-w-[1180px] px-6 py-10">
      <Encabezado
        kicker="Vista TI"
        titulo="Que Google pueda entrar y rastrear"
        entradilla="Disponibilidad, velocidad, indexabilidad y las señales que dependen del servidor y del código. Si algo de aquí falla, da igual lo bien escrito que esté el contenido."
        medidoEn={auditorias[0]?.medidoEn ?? new Date().toISOString()}
      />

      <section aria-label="Resumen" className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Tile
          etiqueta="Propiedades en línea"
          valor={`${auditorias.length - caidas.length} / ${auditorias.length}`}
          estado={caidas.length === 0 ? "bien" : "mal"}
          pie="Responden 200 a una petición directa"
        />
        <Tile
          etiqueta="Respuesta más lenta"
          valor={lenta ? `${lenta} ms` : "—"}
          estado={lenta < 600 ? "bien" : lenta < 1500 ? "aviso" : "mal"}
          pie="Hasta el primer byte, medido sin caché"
        />
        <Tile
          etiqueta="Indexables"
          valor={`${auditorias.length - noIndexables} / ${auditorias.length}`}
          estado={noIndexables === 0 ? "bien" : "mal"}
          pie="Sin un noindex que las saque de Google"
        />
        <Tile
          etiqueta="Con sitemap"
          valor={`${conSitemap} / ${auditorias.length}`}
          estado={conSitemap === auditorias.length ? "bien" : "aviso"}
          pie="Le dan a Google la lista de páginas"
        />
      </section>

      <Prioridades fallos={fallos} titulo="Qué arreglar primero" />

      <section className="mt-9 space-y-5">
        {porSitio.map(({ a, cs }) => (
          <TarjetaPropiedad key={a.property.id} auditoria={a} comprobaciones={cs} />
        ))}
      </section>
    </main>
  );
}
