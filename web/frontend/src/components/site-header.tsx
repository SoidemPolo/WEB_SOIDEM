"use client";

import { useState } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

const NAV = [
  { href: "/#que-resolvemos", label: "Qué resolvemos" },
  { href: "/#productos", label: "Productos" },
  { href: "/#caso", label: "Casos" },
  { href: "/#calidad", label: "Calidad" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

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

        <nav aria-label="Principal">
          <ul
            className={cn(
              "items-center gap-[30px] max-md:absolute max-md:inset-x-0 max-md:top-16 max-md:flex-col max-md:gap-0 max-md:border-b max-md:border-hair max-md:bg-paper max-md:py-2",
              open ? "max-md:flex" : "max-md:hidden",
              "flex",
            )}
          >
            {NAV.map((item) => (
              <li key={item.href} className="max-md:w-full">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-[15px] font-medium text-[#3d4347] transition-colors hover:text-teal max-md:block max-md:px-7 max-md:py-3"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="max-md:w-full max-md:px-7 max-md:py-3">
              <Link
                href="/contacto"
                onClick={() => setOpen(false)}
                className="rounded-lg bg-teal px-5 py-2.5 font-semibold text-white transition-colors hover:bg-teal-dark max-md:inline-block"
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
    </header>
  );
}
