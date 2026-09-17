import "server-only";

import type { Property } from "./properties";

/**
 * Auditoría técnica de SEO.
 *
 * Todo lo que hay aquí se mide de verdad: se descarga la página y se comprueba
 * lo que trae. No hay ni un dato inventado ni de ejemplo.
 *
 * Lo que NO se puede medir así, y por tanto no aparece como número, es el
 * tráfico: sesiones, clics, impresiones, posición media y palabras clave. Eso
 * vive en Google Analytics y Search Console y necesita credenciales, que van en
 * el backend. Hasta entonces el panel lo dice en vez de rellenarlo.
 */

export type Estado = "bien" | "aviso" | "mal";

export type Comprobacion = {
  id: string;
  etiqueta: string;
  estado: Estado;
  /** Lo que se ha encontrado, tal cual. */
  valor: string;
  /** Por qué importa, en una línea. */
  nota?: string;
};

export type Auditoria = {
  property: Property;
  ok: boolean;
  /** Milisegundos hasta el primer byte de la respuesta. */
  ms: number | null;
  status: number | null;
  error?: string;
  comprobaciones: Comprobacion[];
  /** Cuántas comprobaciones pasan, sobre el total. */
  puntuacion: { pasa: number; total: number };
  medidoEn: string;
};

/**
 * Las descargas van SIN caché a propósito: con la caché de fetch, el tiempo de
 * respuesta que se mide es el de la caché (12 ms) y no el del sitio, que es lo
 * que interesa. Quien evita castigar a los sitios auditados es el revalidate de
 * la página, que solo rehace todo esto cada media hora.
 */
const SIN_CACHE = { cache: "no-store" } as const;

function extraer(html: string, re: RegExp): string | null {
  const m = re.exec(html);
  return m ? m[1].trim() : null;
}

function contar(html: string, re: RegExp): number {
  return (html.match(re) ?? []).length;
}

/** Longitudes que Google suele mostrar sin recortar. */
const TITULO = { min: 30, max: 60 };
const DESCRIPCION = { min: 70, max: 160 };

async function existe(url: string): Promise<{ ok: boolean; cuerpo?: string }> {
  try {
    const r = await fetch(url, SIN_CACHE);
    if (!r.ok) return { ok: false };
    return { ok: true, cuerpo: await r.text() };
  } catch {
    return { ok: false };
  }
}

export async function auditar(property: Property): Promise<Auditoria> {
  const medidoEn = new Date().toISOString();
  const inicio = Date.now();

  let html = "";
  let status: number | null = null;
  let ms: number | null = null;

  try {
    const res = await fetch(property.url, {
      ...SIN_CACHE,
      headers: { "User-Agent": "SOIDEM-SEO-Dashboard/1.0" },
    });
    status = res.status;
    html = await res.text();
    ms = Date.now() - inicio;
  } catch (e) {
    return {
      property,
      ok: false,
      ms: null,
      status: null,
      error: e instanceof Error ? e.message : "No se ha podido conectar",
      comprobaciones: [],
      puntuacion: { pasa: 0, total: 0 },
      medidoEn,
    };
  }

  const base = new URL(property.url).origin;
  const [robots, sitemap] = await Promise.all([
    existe(`${base}/robots.txt`),
    existe(`${base}/sitemap.xml`),
  ]);

  const titulo = extraer(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const descripcion = extraer(
    html,
    /<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i,
  );
  const canonical = extraer(html, /<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
  const ogTitle = extraer(html, /<meta[^>]+property=["']og:title["'][^>]*content=["']([^"']*)["']/i);
  const ogImage = extraer(html, /<meta[^>]+property=["']og:image["'][^>]*content=["']([^"']*)["']/i);
  const lang = extraer(html, /<html[^>]+lang=["']([^"']*)["']/i);
  const viewport = extraer(html, /<meta[^>]+name=["']viewport["'][^>]*content=["']([^"']*)["']/i);
  const robotsMeta = extraer(html, /<meta[^>]+name=["']robots["'][^>]*content=["']([^"']*)["']/i);
  const h1 = contar(html, /<h1[\s>]/gi);
  const jsonLd = contar(html, /application\/ld\+json/gi);
  const imgs = contar(html, /<img[\s>]/gi);
  const imgsSinAlt = contar(html, /<img(?![^>]*\balt=)[^>]*>/gi);

  const comprobaciones: Comprobacion[] = [
    {
      id: "status",
      etiqueta: "Respuesta HTTP",
      estado: status === 200 ? "bien" : "mal",
      valor: String(status),
      nota: "Si no responde 200, no hay nada que indexar.",
    },
    {
      id: "ms",
      etiqueta: "Tiempo de respuesta",
      estado: ms === null ? "mal" : ms < 600 ? "bien" : ms < 1500 ? "aviso" : "mal",
      valor: ms === null ? "—" : `${ms} ms`,
      nota: "Medido desde este servidor; no es una métrica de Core Web Vitals.",
    },
    {
      id: "titulo",
      etiqueta: "Título",
      estado: !titulo
        ? "mal"
        : titulo.length >= TITULO.min && titulo.length <= TITULO.max
          ? "bien"
          : "aviso",
      valor: titulo ? `${titulo.length} car. · ${titulo}` : "No tiene",
      nota: `Entre ${TITULO.min} y ${TITULO.max} caracteres se muestra sin recortar.`,
    },
    {
      id: "descripcion",
      etiqueta: "Meta description",
      estado: !descripcion
        ? "mal"
        : descripcion.length >= DESCRIPCION.min && descripcion.length <= DESCRIPCION.max
          ? "bien"
          : "aviso",
      valor: descripcion ? `${descripcion.length} caracteres` : "No tiene",
      nota: `Entre ${DESCRIPCION.min} y ${DESCRIPCION.max} caracteres.`,
    },
    {
      id: "canonical",
      etiqueta: "Canonical",
      estado: canonical ? "bien" : "aviso",
      valor: canonical ?? "No tiene",
      nota: "Evita que el mismo contenido compita consigo mismo.",
    },
    {
      id: "h1",
      etiqueta: "Encabezado H1",
      estado: h1 === 1 ? "bien" : h1 === 0 ? "mal" : "aviso",
      valor: h1 === 1 ? "1 (correcto)" : `${h1}`,
      nota: "Uno por página: es el titular que describe el contenido.",
    },
    {
      id: "og",
      etiqueta: "Open Graph",
      estado: ogTitle && ogImage ? "bien" : ogTitle || ogImage ? "aviso" : "mal",
      valor: ogTitle && ogImage ? "Título e imagen" : ogTitle ? "Solo título" : ogImage ? "Solo imagen" : "No tiene",
      nota: "Es lo que se ve al compartir el enlace en LinkedIn o WhatsApp.",
    },
    {
      id: "jsonld",
      etiqueta: "Datos estructurados",
      estado: jsonLd > 0 ? "bien" : "aviso",
      valor: jsonLd > 0 ? `${jsonLd} bloque(s) JSON-LD` : "No tiene",
      nota: "Permite a Google entender qué es la empresa y mostrarlo enriquecido.",
    },
    {
      id: "robots",
      etiqueta: "robots.txt",
      estado: robots.ok ? "bien" : "aviso",
      valor: robots.ok ? "Disponible" : "No se encuentra",
      nota: "Indica a los buscadores qué pueden rastrear.",
    },
    {
      id: "sitemap",
      etiqueta: "sitemap.xml",
      estado: sitemap.ok ? "bien" : "aviso",
      valor: sitemap.ok
        ? `${contar(sitemap.cuerpo ?? "", /<loc>/gi)} URL`
        : "No se encuentra",
      nota: "Le da a Google la lista de páginas sin tener que adivinarla.",
    },
    {
      id: "indexable",
      etiqueta: "Indexable",
      estado: robotsMeta && /noindex/i.test(robotsMeta) ? "mal" : "bien",
      valor: robotsMeta ?? "Sin restricciones",
      nota: "Un noindex accidental saca la página de Google.",
    },
    {
      id: "lang",
      etiqueta: "Idioma declarado",
      estado: lang ? "bien" : "aviso",
      valor: lang ?? "No declarado",
      nota: "Ayuda a servir el resultado en el país correcto.",
    },
    {
      id: "viewport",
      etiqueta: "Viewport móvil",
      estado: viewport ? "bien" : "mal",
      valor: viewport ? "Declarado" : "No tiene",
      nota: "Google indexa primero la versión móvil.",
    },
    {
      id: "alt",
      etiqueta: "Imágenes con alt",
      estado: imgs === 0 ? "aviso" : imgsSinAlt === 0 ? "bien" : imgsSinAlt <= 3 ? "aviso" : "mal",
      valor: imgs === 0 ? "Sin imágenes" : `${imgs - imgsSinAlt} de ${imgs}`,
      nota: "Sin alt, ni Google ni un lector de pantalla saben qué hay en la imagen.",
    },
  ];

  const pasa = comprobaciones.filter((c) => c.estado === "bien").length;

  return {
    property,
    ok: status === 200,
    ms,
    status,
    comprobaciones,
    puntuacion: { pasa, total: comprobaciones.length },
    medidoEn,
  };
}

export function auditarTodas(properties: Property[]) {
  return Promise.all(properties.map(auditar));
}
