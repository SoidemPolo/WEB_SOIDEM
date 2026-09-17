/**
 * Los productos de SOIDEM, en un solo sitio: los usa el desplegable de la
 * cabecera y la sección de productos de la landing, para que no se puedan
 * desincronizar.
 */
export type ProductMeta = {
  id: string;
  name: string;
  tag: string;
  value: string;
  /** Sitio propio del producto, si lo tiene. */
  site?: string;
  /** Logotipo propio, capturado de su página. Los productos internos no tienen. */
  logo?: { src: string; w: number; h: number };
};

export const PRODUCTS: ProductMeta[] = [
  {
    id: "mesoee",
    name: "MESOEE",
    tag: "Producción · OEE",
    value: "Incidencias, paradas y mermas conectadas al OEE de cada línea.",
  },
  {
    id: "ebr",
    name: "EBR",
    tag: "Pharma · Fabricación guiada",
    value: "Recetas, validaciones y trazabilidad para ejecutar cada lote con control.",
  },
  {
    id: "captur",
    name: "Captur",
    tag: "Control horario",
    value: "El fichaje que tu equipo de verdad usará.",
    site: "https://captur.soidemdt.com/",
    logo: { src: "/images/captur-logo.png", w: 240, h: 64 },
  },
  {
    id: "factur",
    name: "Factur",
    tag: "Órdenes de compra",
    value: "Tus pedidos. En datos. En segundos.",
    site: "https://factur.soidemdt.com/",
    logo: { src: "/images/factur-logo.png", w: 202, h: 64 },
  },
  {
    id: "tms",
    name: "TMS",
    tag: "Logística de envíos",
    value: "Cada envío bajo control.",
    site: "https://tms.soidemdt.com/",
    logo: { src: "/images/tms-logo.png", w: 170, h: 64 },
  },
  {
    id: "capfa",
    name: "+CAPFA",
    tag: "Salud · Atención Primaria",
    value: "Toda la actividad de tus centros, en un solo visor.",
  },
];

/**
 * Enlace a un producto concreto. La sección de productos lee este hash y abre
 * su panel, así que el desplegable no solo lleva a la sección: lleva al producto.
 */
export function productHref(id: string) {
  return `/#producto-${id}`;
}

/** Devuelve el id del producto al que apunta un hash, si apunta a alguno. */
export function productIdFromHash(hash: string): string | null {
  const match = /^#producto-([a-z+]+)$/.exec(hash);
  if (!match) return null;
  return PRODUCTS.some((p) => p.id === match[1]) ? match[1] : null;
}
