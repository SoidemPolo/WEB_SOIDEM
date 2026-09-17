"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  ABRIR_PREFERENCIAS,
  CATEGORIES,
  CATEGORY_INFO,
  type Category,
  type Consent,
  guardarConsentimiento,
  leerConsentimiento,
  soloEsenciales,
  todasAceptadas,
} from "@/lib/consent";
import { cn } from "@/lib/utils";

/**
 * Aviso de cookies. Aparece si todavía no hay decisión guardada y se puede
 * reabrir desde el pie.
 *
 * Rechazar cuesta lo mismo que aceptar: los dos son un botón visible en el
 * primer nivel. Las categorías no esenciales empiezan desactivadas y nada que
 * dependa de ellas se carga hasta que se aceptan.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [detalle, setDetalle] = useState(false);
  const [seleccion, setSeleccion] = useState<Record<Category, boolean>>({
    esenciales: true,
    analitica: false,
    ubicacion: false,
    marketing: false,
  });

  useEffect(() => {
    // Solo se pregunta si no hay decisión previa (o es de una versión anterior).
    if (!leerConsentimiento()) setVisible(true);

    function abrir() {
      const actual = leerConsentimiento();
      if (actual) {
        setSeleccion({
          esenciales: true,
          analitica: actual.analitica,
          ubicacion: actual.ubicacion,
          marketing: actual.marketing,
        });
      }
      setDetalle(true);
      setVisible(true);
    }

    window.addEventListener(ABRIR_PREFERENCIAS, abrir);
    return () => window.removeEventListener(ABRIR_PREFERENCIAS, abrir);
  }, []);

  if (!visible) return null;

  function decidir(consent: Consent) {
    guardarConsentimiento(consent);
    setVisible(false);
    setDetalle(false);
  }

  function guardarSeleccion() {
    decidir({
      esenciales: true,
      analitica: seleccion.analitica,
      ubicacion: seleccion.ubicacion,
      marketing: seleccion.marketing,
      fecha: new Date().toISOString(),
      version: soloEsenciales().version,
    });
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookies-titulo"
      className="fixed inset-x-0 bottom-0 z-[80] border-t border-hair bg-paper/98 shadow-[0_-18px_44px_rgba(25,28,30,.14)] backdrop-blur-md"
    >
      <div className="wrap py-6">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-[62ch]">
            <h2 id="cookies-titulo" className="text-[19px]">
              Cookies en soidemdt.com
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-stone">
              Usamos cookies propias imprescindibles para que la web funcione. Con tu
              permiso, usamos además cookies de analítica, ubicación aproximada y
              marketing para entender cómo se encuentra y se usa este sitio. Puedes
              aceptar todo, quedarte solo con lo imprescindible o elegir categoría por
              categoría. Más detalle en la{" "}
              <Link
                href="/privacidad"
                className="font-semibold text-teal underline underline-offset-4"
              >
                política de privacidad
              </Link>
              .
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm" onClick={() => decidir(todasAceptadas())}>
              Aceptar todas
            </Button>
            <Button size="sm" variant="ghost" onClick={() => decidir(soloEsenciales())}>
              Solo las esenciales
            </Button>
            <button
              type="button"
              onClick={() => setDetalle((v) => !v)}
              aria-expanded={detalle}
              className="text-[14.5px] font-semibold text-teal underline underline-offset-4"
            >
              {detalle ? "Ocultar opciones" : "Personalizar"}
            </button>
          </div>
        </div>

        {detalle && (
          <div className="mt-6 border-t border-hair pt-6">
            <ul className="grid gap-4 md:grid-cols-2">
              {CATEGORIES.map((categoria) => {
                const info = CATEGORY_INFO[categoria];
                const activa = seleccion[categoria];
                return (
                  <li
                    key={categoria}
                    className="flex gap-3 rounded-card border border-hair bg-white p-4"
                  >
                    <input
                      type="checkbox"
                      id={`cookie-${categoria}`}
                      checked={activa}
                      disabled={info.bloqueada}
                      onChange={(event) =>
                        setSeleccion((prev) => ({
                          ...prev,
                          [categoria]: event.target.checked,
                        }))
                      }
                      className={cn(
                        "mt-1 size-4 shrink-0 accent-teal",
                        info.bloqueada && "cursor-not-allowed opacity-60",
                      )}
                    />
                    <div>
                      <label
                        htmlFor={`cookie-${categoria}`}
                        className="block text-[15px] font-semibold"
                      >
                        {info.titulo}
                        {info.bloqueada && (
                          <span className="ml-2 text-[11.5px] font-medium uppercase tracking-[0.1em] text-stone">
                            siempre activas
                          </span>
                        )}
                      </label>
                      <p className="mt-1 text-[13.5px] leading-snug text-stone">
                        {info.descripcion}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-5 flex flex-wrap gap-3">
              <Button size="sm" onClick={guardarSeleccion}>
                Guardar mi selección
              </Button>
              <Button size="sm" variant="ghost" onClick={() => decidir(todasAceptadas())}>
                Aceptar todas
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
