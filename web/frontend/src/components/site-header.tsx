"use client";

import { useState } from "react";
import Link from "next/link";

import { ProductsMenu, ProductsMenuMobile } from "@/components/products-menu";
import { cn } from "@/lib/utils";

/** Enlaces simples. "Productos" va aparte: es un desplegable. */
const NAV = [
  { href: "/#que-resolvemos", label: "Qué resolvemos" },
  { href: "/#caso", label: "Casos" },
  { href: "/#calidad", label: "Calidad" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-hair bg-paper/90 backdrop-blur-[14px]">
      <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-7">
        <Link
          href="/"
          aria-label="SOIDEM Data Technologies, inicio"
          className="flex flex-col leading-[1.15]"
        >
          <b className="text-lg font-bold tracking-[-0.01em]">SOIDEM</b>
          <span className="text-[9.5px] uppercase tracking-[0.24em] text-stone">
            Data Technologies
          </span>
        </Link>

        <nav aria-label="Principal" className="max-md:hidden">
          <ul className="flex items-center gap-[30px]">
            <li>
              <Link
                href="/#que-resolvemos"
                className="text-[15px] font-medium text-[#3d4347] transition-colors hover:text-teal"
              >
                Qué resolvemos
              </Link>
            </li>
            <li>
              <ProductsMenu />
            </li>
            {NAV.slice(1).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[15px] font-medium text-[#3d4347] transition-colors hover:text-teal"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contacto"
                className="rounded-lg bg-teal px-5 py-2.5 font-semibold text-white transition-colors hover:bg-teal-dark"
              >
                Cuéntanos el problema
              </Link>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
          className="hidden p-2 max-md:block"
        >
          {[0, 1, 2].map((i) => (
            <span key={i} className="my-[5px] block h-0.5 w-[22px] bg-ink" />
          ))}
        </button>
      </div>

      {/* Menú móvil: los productos se listan desplegados, sin un segundo nivel */}
      <nav
        aria-label="Principal"
        className={cn(
          "absolute inset-x-0 top-16 border-b border-hair bg-paper py-2 md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <ul className="flex flex-col">
          <li>
            <Link
              href="/#que-resolvemos"
              onClick={close}
              className="block px-7 py-3 text-[15px] font-medium text-[#3d4347]"
            >
              Qué resolvemos
            </Link>
          </li>
          <li>
            <ProductsMenuMobile onNavigate={close} />
          </li>
          {NAV.slice(1).map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={close}
                className="block px-7 py-3 text-[15px] font-medium text-[#3d4347]"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="px-7 py-3">
            <Link
              href="/contacto"
              onClick={close}
              className="inline-block rounded-lg bg-teal px-5 py-2.5 font-semibold text-white"
            >
              Cuéntanos el problema
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
