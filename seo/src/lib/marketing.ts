import "server-only";

/**
 * El embudo comercial de SOIDEM y de dónde sale cada número.
 *
 * Ninguna de estas cifras se puede calcular descargando una página: viven en
 * Search Console, en Google Analytics, en el backend que reciba el formulario y
 * en HubSpot. Este módulo declara el modelo y comprueba qué fuentes están
 * configuradas; mientras una no lo esté, su KPI se queda vacío.
 *
 * No se rellenan con datos de ejemplo a propósito. Un número inventado en un
 * panel es indistinguible de uno real, y sobre él se toman decisiones de gasto.
 */

export type Fuente = "search-console" | "ga4" | "backend" | "hubspot";

export const FUENTES: Record<Fuente, { nombre: string; que: string; env: string }> = {
  "search-console": {
    nombre: "Search Console",
    que: "Qué se busca, cuánto se ve y cuánto se pincha en Google",
    env: "SEARCH_CONSOLE_SITE",
  },
  ga4: {
    nombre: "Google Analytics 4",
    que: "Qué hace la gente una vez entra y por dónde ha llegado",
    env: "GA4_PROPERTY_ID",
  },
  backend: {
    nombre: "Backend de SOIDEM",
    que: "Los formularios de contacto que se envían de verdad",
    env: "API_URL",
  },
  hubspot: {
    nombre: "HubSpot",
    que: "Reuniones reservadas, oportunidades y clientes cerrados",
    env: "HUBSPOT_TOKEN",
  },
};

/** Una fuente está conectada cuando su variable de entorno tiene valor. */
export function conectada(fuente: Fuente): boolean {
  return Boolean(process.env[FUENTES[fuente].env]);
}

export type Etapa = {
  id: string;
  nombre: string;
  descripcion: string;
  fuente: Fuente;
  /** Qué se hace cuando este escalón va flojo. */
  palanca: string;
};

/**
 * De ver el resultado en Google a firmar. Cada escalón pierde gente; saber en
 * cuál se pierde es lo que dice dónde invertir.
 */
export const EMBUDO: Etapa[] = [
  {
    id: "impresiones",
    nombre: "Impresiones",
    descripcion: "Veces que un resultado nuestro aparece en Google",
    fuente: "search-console",
    palanca: "Más contenido y mejores posiciones para las búsquedas que importan.",
  },
  {
    id: "clics",
    nombre: "Clics",
    descripcion: "De los que nos ven, cuántos entran",
    fuente: "search-console",
    palanca: "Título y descripción: es lo único que ve quien decide el clic.",
  },
  {
    id: "sesiones",
    nombre: "Sesiones",
    descripcion: "Visitas al sitio, vengan de donde vengan",
    fuente: "ga4",
    palanca: "Suma de canales: orgánico, directo, LinkedIn, campañas.",
  },
  {
    id: "interes",
    nombre: "Interés real",
    descripcion: "Llegan a contacto, a un producto o reservan reunión",
    fuente: "ga4",
    palanca: "Claridad de la propuesta y llamadas a la acción bien puestas.",
  },
  {
    id: "contactos",
    nombre: "Contactos",
    descripcion: "Formularios enviados y reuniones reservadas",
    fuente: "backend",
    palanca: "Fricción del formulario y confianza de la página de contacto.",
  },
  {
    id: "oportunidades",
    nombre: "Oportunidades",
    descripcion: "Contactos que se convierten en una conversación comercial",
    fuente: "hubspot",
    palanca: "Calidad del contacto: de qué búsqueda venía y qué buscaba.",
  },
  {
    id: "clientes",
    nombre: "Clientes",
    descripcion: "Oportunidades que acaban en proyecto",
    fuente: "hubspot",
    palanca: "Aquí ya no es marketing: es propuesta y encaje.",
  },
];

export type Canal = {
  id: string;
  nombre: string;
  descripcion: string;
  fuente: Fuente;
};

/** De dónde llegan los clics. Sin esto no se sabe qué esfuerzo está rindiendo. */
export const CANALES: Canal[] = [
  {
    id: "organico",
    nombre: "Búsqueda orgánica",
    descripcion: "Google sin pagar. Es lo que mide el resto de este panel.",
    fuente: "search-console",
  },
  {
    id: "directo",
    nombre: "Directo",
    descripcion: "Escriben la dirección o vienen de un marcador. Suele ser marca.",
    fuente: "ga4",
  },
  {
    id: "referido",
    nombre: "Referido",
    descripcion: "Enlaces desde otras webs: prensa, directorios, clientes.",
    fuente: "ga4",
  },
  {
    id: "social",
    nombre: "Redes",
    descripcion: "LinkedIn e Instagram, las dos que enlaza el pie de la web.",
    fuente: "ga4",
  },
  {
    id: "producto",
    nombre: "Subdominios de producto",
    descripcion: "Quien llega desde Captur, Factur o TMS al sitio corporativo.",
    fuente: "ga4",
  },
];

export type EstadoFuentes = Record<Fuente, boolean>;

export function estadoFuentes(): EstadoFuentes {
  return {
    "search-console": conectada("search-console"),
    ga4: conectada("ga4"),
    backend: conectada("backend"),
    hubspot: conectada("hubspot"),
  };
}
