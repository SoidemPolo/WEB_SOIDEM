import {
  Clock,
  FlaskConical,
  Gauge,
  HeartPulse,
  ScanText,
  Truck,
  type LucideIcon,
} from "lucide-react";

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
  icon: LucideIcon;
  /**
   * Color de marca del producto, el que usa al pasar el ratón.
   *
   * Captur, Factur y TMS tienen web propia: el valor está tomado de las
   * variables CSS de su tema, no aproximado a ojo. MESOEE, EBR y +CAPFA no
   * tienen marca aparte, son SOIDEM, así que llevan el teal de la casa.
   */
  color: string;
};

export const PRODUCTS: ProductMeta[] = [
  {
    id: "mesoee",
    name: "MESOEE",
    tag: "Producción · OEE",
    value: "Incidencias, paradas y mermas conectadas al OEE de cada línea.",
    icon: Gauge,
    color: "#1E798D",
  },
  {
    id: "ebr",
    name: "EBR",
    tag: "Pharma · Fabricación guiada",
    value: "Recetas, validaciones y trazabilidad para ejecutar cada lote con control.",
    icon: FlaskConical,
    color: "#1E798D",
  },
  {
    id: "captur",
    name: "Captur",
    tag: "Control horario",
    value: "El fichaje que tu equipo de verdad usará.",
    site: "https://captur.soidemdt.com/",
    logo: { src: "/images/captur-logo.png", w: 240, h: 64 },
    icon: Clock,
    color: "#FE5151",
  },
  {
    id: "factur",
    name: "Factur",
    tag: "Órdenes de compra",
    value: "Tus pedidos. En datos. En segundos.",
    site: "https://factur.soidemdt.com/",
    logo: { src: "/images/factur-logo.png", w: 202, h: 64 },
    icon: ScanText,
    color: "#5B5BE0",
  },
  {
    id: "tms",
    name: "TMS",
    tag: "Logística de envíos",
    value: "Cada envío bajo control.",
    site: "https://tms.soidemdt.com/",
    logo: { src: "/images/tms-logo.png", w: 170, h: 64 },
    icon: Truck,
    color: "#10B981",
  },
  {
    id: "capfa",
    name: "+CAPFA",
    tag: "Salud · Atención Primaria",
    value: "Toda la actividad de tus centros, en un solo visor.",
    icon: HeartPulse,
    color: "#1E798D",
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
