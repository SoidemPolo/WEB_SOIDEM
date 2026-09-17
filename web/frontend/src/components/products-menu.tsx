"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

import { PRODUCTS, productHref } from "@/lib/products";
import { cn } from "@/lib/utils";

/**
 * Desplegable de Productos de la cabecera. En escritorio se abre al pasar el
 * ratón y también con teclado; se cierra con Escape, al hacer clic fuera o al
 * salir el foco del menú.
 */
export function ProductsMenu({ activa = false }: { activa?: boolean }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Un margen al salir el ratón evita que el menú se cierre al cruzar el hueco.
  function scheduleClose() {
    closeTimer.current = window.setTimeout(() => setOpen(false), 180);
  }
  function cancelClose() {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  useEffect(() => () => cancelClose(), []);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onPointerEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onPointerLeave={scheduleClose}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-current={activa ? "true" : undefined}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
          }
        }}
        className={cn(
          "relative flex items-center gap-1 text-[15px] font-medium transition-colors",
          "after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:w-full after:origin-center after:scale-x-0 after:rounded-full after:bg-teal after:transition-transform after:duration-200 after:content-['']",
          "hover:text-teal hover:after:scale-x-100",
          activa || open ? "text-teal after:scale-x-100" : "text-[#3d4347]",
        )}
      >
        Productos
        <ChevronDown
          aria-hidden
          className={cn("size-3.5 transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      <div
        className={cn(
          "absolute left-1/2 top-full z-50 w-[320px] -translate-x-1/2 pt-3 transition-[opacity,transform] duration-150",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0",
        )}
      >
        <ul className="overflow-hidden rounded-card border border-hair bg-white p-1.5 shadow-[0_18px_44px_rgba(25,28,30,.14)]">
          {PRODUCTS.map((product) => (
            <li key={product.id}>
              <a
                href={productHref(product.id)}
                onClick={() => setOpen(false)}
                className="group block rounded-[10px] px-3 py-2.5 transition-colors hover:bg-teal/[0.06]"
              >
                <span className="flex flex-wrap items-baseline gap-1.5">
                  <b className="text-[15px] font-[650] text-ink group-hover:text-teal-dark">
                    {product.name}
                  </b>
                  <small className="text-[11.5px] text-stone">· {product.tag}</small>
                </span>
                <span className="mt-0.5 block text-[12.5px] leading-snug text-stone">
                  {product.value}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Versión para el menú móvil: los productos se listan desplegados, sin capas. */
export function ProductsMenuMobile({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="px-7 py-2">
      <p className="py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone">
        Productos
      </p>
      <ul className="flex flex-col">
        {PRODUCTS.map((product) => (
          <li key={product.id}>
            <a
              href={productHref(product.id)}
              onClick={onNavigate}
              className="flex flex-wrap items-baseline gap-1.5 py-2 text-[15px] font-medium text-[#3d4347]"
            >
              <b className="font-[650]">{product.name}</b>
              <small className="text-[11.5px] text-stone">· {product.tag}</small>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
