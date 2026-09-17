import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Panel SEO — SOIDEM",
  description: "Estado técnico de SEO de las propiedades web de SOIDEM.",
  // Un panel interno no tiene nada que hacer en Google.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
