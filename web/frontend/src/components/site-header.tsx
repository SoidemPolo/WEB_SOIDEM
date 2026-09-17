"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";

import { Brand } from "@/components/brand";
import { ProductsMenu, ProductsMenuMobile } from "@/components/products-menu";
import { ScrollProgress } from "@/components/scroll-progress";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

/** Enlaces simples. "Productos" va aparte: es un desplegable. */
const NAV = [
  { id: "que-resolvemos", href: "/#que-resolvemos", label: "Qué resolvemos" },
  { id: "caso", href: "/#caso", label: "Casos" },
  { id: "calidad", href: "/#calidad", label: "Calidad" },
];

const SECTION_IDS = ["que-resolvemos", "productos", "caso", "calidad"];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const ids = useMemo(() => SECTION_IDS, []);
  const activa = useActiveSection(ids);

  // Al pasar del hero la cabecera se apoya con una sombra: sin ella, sobre las
  // secciones claras no se distingue dónde acaba.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Con el menú abierto, el fondo no debe poder desplazarse detrás.
  useEffect(() => {
    if (!open) return;
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previo;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-paper/90 backdrop-blur-[14px] transition-[box-shadow,border-color] duration-300",
        scrolled
          ? "border-hair shadow-[0_6px_24px_rgba(25,28,30,.06)]"
          : "border-transparent",
      )}
    >
      <div className="mx-auto flex h-[76px] max-w-[1180px] items-center justify-between gap-6 px-7">
        <Brand priority className="h-11" />

        <nav aria-label="Principal" className="max-lg:hidden">
          <ul className="flex items-center gap-[30px]">
            <li>
              <NavLink href={NAV[0].href} activa={activa === NAV[0].id}>
                {NAV[0].label}
              </NavLink>
            </li>
            <li>
              <ProductsMenu activa={activa === "productos"} />
            </li>
            {NAV.slice(1).map((item) => (
              <li key={item.id}>
                <NavLink href={item.href} activa={activa === item.id}>
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              <Link
                href="/contacto"
                className="rounded-lg bg-teal px-5 py-2.5 font-semibold text-white transition-[background,transform,box-shadow] duration-200 hover:-translate-y-px hover:bg-teal-dark hover:shadow-[0_8px_20px_rgba(30,121,141,.28)]"
              >
                Cuéntanos el problema
              </Link>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
          className="hidden rounded-lg p-2 text-ink transition-colors hover:text-teal max-lg:block"
        >
          {open ? (
            <X aria-hidden className="size-5.5" />
          ) : (
            <Menu aria-hidden className="size-5.5" />
          )}
        </button>
      </div>

      <ScrollProgress />

      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu-movil"
            aria-label="Principal"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-[76px] max-h-[calc(100dvh-76px)] overflow-y-auto border-b border-hair bg-paper py-2 lg:hidden"
          >
            <ul className="flex flex-col">
              <li>
                <MobileLink href={NAV[0].href} onClick={close} activa={activa === NAV[0].id}>
                  {NAV[0].label}
                </MobileLink>
              </li>
              <li>
                <ProductsMenuMobile onNavigate={close} />
              </li>
              {NAV.slice(1).map((item) => (
                <li key={item.id}>
                  <MobileLink href={item.href} onClick={close} activa={activa === item.id}>
                    {item.label}
                  </MobileLink>
                </li>
              ))}
              <li className="px-7 pb-2 pt-3">
                <Link
                  href="/contacto"
                  onClick={close}
                  className="block rounded-lg bg-teal px-5 py-3 text-center font-semibold text-white"
                >
                  Cuéntanos el problema
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

/** Enlace de escritorio con subrayado que crece desde el centro al pasar el ratón. */
function NavLink({
  href,
  activa,
  children,
}: {
  href: string;
  activa: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={activa ? "true" : undefined}
      className={cn(
        "relative text-[15px] font-medium transition-colors",
        "after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:w-full after:origin-center after:scale-x-0 after:rounded-full after:bg-teal after:transition-transform after:duration-200 after:content-['']",
        "hover:text-teal hover:after:scale-x-100",
        activa ? "text-teal after:scale-x-100" : "text-[#3d4347]",
      )}
    >
      {children}
    </Link>
  );
}

function MobileLink({
  href,
  activa,
  onClick,
  children,
}: {
  href: string;
  activa: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={activa ? "true" : undefined}
      className={cn(
        "block border-l-2 px-7 py-3 text-[15px] font-medium transition-colors",
        activa ? "border-teal bg-teal/[0.05] text-teal" : "border-transparent text-[#3d4347]",
      )}
    >
      {children}
    </Link>
  );
}
