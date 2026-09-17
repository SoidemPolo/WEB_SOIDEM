import type { Metadata } from "next";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import "./globals.css";

const TITLE =
  "SOIDEM Data Technologies — Tecnología diseñada alrededor de operaciones reales";
const DESCRIPTION =
  "SOIDEM diseña tecnología alrededor de operaciones reales: integración industrial, software a medida, monitorización, MES/OEE, EBR para pharma, automatización y trazabilidad. ISO 9001:2015.";
const OG_IMAGE =
  "https://static.wixstatic.com/media/1e5c2d_f5a462d91e3d4a75b8d53f683dabe8d9~mv2.jpg/v1/fill/w_460,h_567,al_c,q_88/iso.jpg";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.soidemdt.com"),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "SOIDEM Data Technologies",
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

/** Datos estructurados de la organización, portados tal cual desde la web actual. */
const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SOIDEM Data Technologies",
  url: "https://www.soidemdt.com/",
  logo: "https://static.wixstatic.com/media/1e5c2d_f5a462d91e3d4a75b8d53f683dabe8d9~mv2.jpg",
  description:
    "SOIDEM diseña tecnología alrededor de operaciones reales: integración industrial, software a medida, monitorización, MES/OEE, EBR para pharma, automatización y trazabilidad.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Calle Mallorca 277, 2-2",
    postalCode: "08037",
    addressLocality: "Barcelona",
    addressCountry: "ES",
  },
  telephone: "+34623199531",
  email: "info@soidemdt.com",
  sameAs: [
    "https://www.linkedin.com/company/soidem-data-technologies",
    "https://www.instagram.com/soidem_tech/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <head>
        <meta name="theme-color" content="#191C1E" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
        />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-teal focus:px-4 focus:py-2 focus:text-white"
        >
          Saltar al contenido
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
