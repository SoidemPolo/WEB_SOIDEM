"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Megaphone, ServerCog } from "lucide-react";

import { cn } from "@/lib/utils";

const VISTAS = [
  {
    href: "/ti",
    label: "Vista TI",
    sub: "Que Google pueda entrar",
    icon: ServerCog,
  },
  {
    href: "/mkt",
    label: "Vista marketing",
    sub: "Qué enseña cuando entra",
    icon: Megaphone,
  },
];

/**
 * Cabecera del panel. El turquesa del logotipo marca la vista activa: sobre el
 * fondo oscuro contrasta de sobra, y no compite con los verdes, ámbares y rojos
 * que aquí están reservados para el estado de cada comprobación.
 */
export function Nav() {
  const ruta = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-deep">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href="/ti" className="flex items-center gap-3">
          <Image
            src="/logo-soidem.png"
            alt="SOIDEM Data Technologies"
            width={1765}
            height={534}
            priority
            className="h-7 w-auto brightness-0 invert"
          />
          <span className="border-l border-white/20 pl-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-logo">
            Panel SEO
          </span>
        </Link>

        <nav aria-label="Vistas">
          <ul className="flex gap-2">
            {VISTAS.map((v) => {
              const activa = ruta === v.href;
              return (
                <li key={v.href}>
                  <Link
                    href={v.href}
                    aria-current={activa ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-3.5 py-2 transition-colors",
                      activa
                        ? "bg-logo/15 text-logo"
                        : "text-white/60 hover:bg-white/5 hover:text-white",
                    )}
                  >
                    <v.icon aria-hidden className="size-4 shrink-0" strokeWidth={2.2} />
                    <span className="flex flex-col leading-tight">
                      <span className="text-[14px] font-[650]">{v.label}</span>
                      <span className="text-[11px] opacity-70">{v.sub}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
