"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

import { alCambiarConsentimiento, leerConsentimiento } from "@/lib/consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Analítica para el seguimiento de SEO y tráfico.
 *
 * No se carga nada hasta que la persona acepta la categoría "analítica": el
 * script solo se monta cuando hay consentimiento, y si se retira deja de
 * cargarse en la siguiente navegación. Sin `NEXT_PUBLIC_GA_ID` no hace nada,
 * de modo que en local y en pruebas no se envía ni un evento.
 *
 * Para cambiar de proveedor (Plausible, Matomo, Umami) basta sustituir los dos
 * <Script> de abajo: la condición del consentimiento ya está resuelta.
 */
export function Analytics() {
  const [permitido, setPermitido] = useState(false);

  useEffect(() => {
    setPermitido(leerConsentimiento()?.analitica ?? false);
    return alCambiarConsentimiento((consent) => setPermitido(consent.analitica));
  }, []);

  if (!permitido || !GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('consent', 'default', {
            analytics_storage: 'granted',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
          });
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
