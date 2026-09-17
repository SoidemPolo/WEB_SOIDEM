import Link from "next/link";

import { CookiePreferencesLink } from "@/components/cookie-preferences-link";

const WEB = [
  { href: "/#que-resolvemos", label: "Qué resolvemos" },
  { href: "/#productos", label: "Productos" },
  { href: "/#caso", label: "Casos" },
  { href: "/#calidad", label: "Calidad" },
];

const LEGAL = [
  { href: "/privacidad", label: "Política de privacidad" },
  { href: "/calidad-interna", label: "Política de calidad" },
  { href: "/iso9001", label: "ISO 9001" },
];

const ACCESO = [{ href: "/login", label: "Acceso de clientes" }];

export function SiteFooter() {
  return (
    <footer className="border-t border-hair bg-alt py-16">
      <div className="wrap">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1.4fr]">
          <div>
            <Link href="/" className="flex flex-col leading-[1.15]">
              <b className="text-lg font-bold tracking-[-0.01em]">SOIDEM</b>
              <span className="text-[9.5px] uppercase tracking-[0.24em] text-stone">
                Data Technologies
              </span>
            </Link>
            <p className="mt-4 max-w-[34ch] text-[15px] text-stone">
              Tecnología diseñada alrededor de operaciones reales.
            </p>
            <p className="mt-3 text-[13px] text-stone">
              Sistema de gestión de calidad certificado según ISO 9001:2015.
            </p>
          </div>

          <FooterColumn title="Web" items={[...WEB, ...ACCESO]} />
          <FooterColumn title="Legal" items={LEGAL} extra={<CookiePreferencesLink />} />

          <div>
            <h4 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-ink">
              Contacto
            </h4>
            <ul className="space-y-2 text-[15px] text-stone">
              <li>Calle Mallorca 277, 2-2 · 08037 Barcelona</li>
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
              <li>
                <a
                  href="https://www.linkedin.com/company/soidem-data-technologies"
                  target="_blank"
                  rel="noopener"
                  className="hover:text-teal"
                >
                  LinkedIn
                </a>{" "}
                ·{" "}
                <a
                  href="https://www.instagram.com/soidem_tech/"
                  target="_blank"
                  rel="noopener"
                  className="hover:text-teal"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-between gap-2 border-t border-hair pt-6 text-[13.5px] text-stone">
          <span>© 2026 SOIDEM Data Technologies. Todos los derechos reservados.</span>
          <span>Barcelona</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
  extra,
}: {
  title: string;
  items: { href: string; label: string }[];
  extra?: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-ink">
        {title}
      </h4>
      <ul className="space-y-2 text-[15px] text-stone">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="hover:text-teal">
              {item.label}
            </Link>
          </li>
        ))}
        {extra && <li>{extra}</li>}
      </ul>
    </div>
  );
}
