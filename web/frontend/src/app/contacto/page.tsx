import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contacto — SOIDEM Data Technologies",
  description:
    "Cuéntanos el problema. Monitorización, integración industrial, software a medida, EBR para pharma y automatización documental.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <section className="py-section">
      <div className="wrap">
        <p className="kicker">Contacto</p>
        <h2 className="h2-display">¿Cómo podemos ayudarte?</h2>
        <p className="lead">
          No necesitas tener definida la solución. Cuéntanos el problema y seguimos
          desde ahí.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <ContactForm />

          <aside>
            <h3 className="text-[19px]">Datos de contacto</h3>
            <ul className="mt-5 space-y-4 text-[16px] text-stone">
              <li>
                Calle Mallorca 277, 2-2
                <br />
                08037 Barcelona, España
              </li>
              <li>
                <a href="tel:+34623199531" className="hover:text-teal">
                  +34 623 199 531
                </a>
              </li>
              <li>
                <a href="mailto:info@soidemdt.com" className="hover:text-teal">
                  info@soidemdt.com
                </a>
              </li>
            </ul>
            <p className="mt-8 border-t border-hair pt-6 text-[15px] text-stone">
              O{" "}
              <a
                href="https://meetings-eu1.hubspot.com/alberto-polo"
                target="_blank"
                rel="noopener"
                className="font-semibold text-teal underline underline-offset-4"
              >
                reserva una reunión
              </a>{" "}
              directamente.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
