/**
 * Consentimiento de cookies.
 *
 * Las esenciales no se pueden desactivar: sin ellas el sitio no funciona y el
 * RGPD no exige consentimiento para ellas. El resto (analítica, ubicación,
 * marketing) arrancan DESACTIVADAS y solo se activan si la persona lo acepta.
 * Nada que dependa de esas categorías debe cargarse antes de tener el "sí".
 */

export const CATEGORIES = ["esenciales", "analitica", "ubicacion", "marketing"] as const;

export type Category = (typeof CATEGORIES)[number];

export type Consent = {
  esenciales: true;
  analitica: boolean;
  ubicacion: boolean;
  marketing: boolean;
  /** ISO 8601. El RGPD exige poder demostrar cuándo se dio el consentimiento. */
  fecha: string;
  /** Versión del texto informativo aceptado, para re-preguntar si cambia. */
  version: number;
};

/** Subir este número vuelve a pedir consentimiento a todo el mundo. */
export const CONSENT_VERSION = 1;

export const COOKIE_NAME = "soidem_consent";
const STORAGE_KEY = "soidem_consent";
/** Seis meses: pasado ese plazo se vuelve a preguntar, como recomienda la AEPD. */
const MAX_AGE = 60 * 60 * 24 * 182;

export const CATEGORY_INFO: Record<
  Category,
  { titulo: string; descripcion: string; bloqueada?: boolean }
> = {
  esenciales: {
    titulo: "Esenciales",
    descripcion:
      "Necesarias para que la web funcione: navegación, seguridad y recordar esta misma decisión. No se pueden desactivar.",
    bloqueada: true,
  },
  analitica: {
    titulo: "Analítica",
    descripcion:
      "Nos dicen qué páginas se visitan y cómo se llega a ellas, de forma agregada. Es lo que usamos para entender el tráfico y mejorar el posicionamiento.",
  },
  ubicacion: {
    titulo: "Ubicación aproximada",
    descripcion:
      "País y provincia deducidos de la conexión, para saber desde dónde nos consultan. No se usa la ubicación precisa del dispositivo.",
  },
  marketing: {
    titulo: "Marketing",
    descripcion:
      "Permiten medir la eficacia de nuestras campañas y no repetir el mismo anuncio. Si no las aceptas, no se instala ninguna.",
  },
};

export const CONSENT_EVENT = "soidem:consent";

/** Todo rechazado salvo lo imprescindible. Es el estado por defecto. */
export function soloEsenciales(): Consent {
  return {
    esenciales: true,
    analitica: false,
    ubicacion: false,
    marketing: false,
    fecha: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
}

export function todasAceptadas(): Consent {
  return {
    esenciales: true,
    analitica: true,
    ubicacion: true,
    marketing: true,
    fecha: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
}

/**
 * Lee la decisión guardada. Devuelve null si no hay ninguna todavía o si es de
 * una versión anterior del texto, casos en los que hay que volver a preguntar.
 */
export function leerConsentimiento(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Consent;
    if (parsed.version !== CONSENT_VERSION) return null;
    return { ...parsed, esenciales: true };
  } catch {
    return null;
  }
}

/**
 * Guarda la decisión en localStorage y en una cookie propia. La cookie existe
 * para que el servidor y las herramientas de medición puedan comprobar el
 * consentimiento sin ejecutar JavaScript de cliente.
 */
export function guardarConsentimiento(consent: Consent) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // Navegación privada o almacenamiento bloqueado: la cookie basta.
  }

  const valor = encodeURIComponent(
    [
      `v${consent.version}`,
      consent.analitica ? "a1" : "a0",
      consent.ubicacion ? "u1" : "u0",
      consent.marketing ? "m1" : "m0",
    ].join("."),
  );
  const seguro = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_NAME}=${valor}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${seguro}`;

  window.dispatchEvent(new CustomEvent<Consent>(CONSENT_EVENT, { detail: consent }));
}

/** Avisa cada vez que cambia la decisión, para activar o parar lo que dependa de ella. */
export function alCambiarConsentimiento(fn: (consent: Consent) => void) {
  const handler = (event: Event) => fn((event as CustomEvent<Consent>).detail);
  window.addEventListener(CONSENT_EVENT, handler);
  return () => window.removeEventListener(CONSENT_EVENT, handler);
}

/** Evento que abre el panel de preferencias desde cualquier parte, como el pie. */
export const ABRIR_PREFERENCIAS = "soidem:abrir-cookies";

export function abrirPreferenciasCookies() {
  window.dispatchEvent(new Event(ABRIR_PREFERENCIAS));
}
