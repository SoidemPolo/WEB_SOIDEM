import type { Metadata } from "next";

import { Nav } from "@/components/nav";

import "./globals.css";

export const metadata: Metadata = {
  title: "Panel SEO — SOIDEM",
  description: "Estado técnico y de contenido del SEO de las propiedades de SOIDEM.",
  // Un panel interno no tiene nada que hacer en Google.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
