import Link from "next/link";

import { HeroDiagram } from "@/components/sections/hero-diagram";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section aria-labelledby="h1" className="pb-[92px] pt-[84px]">
      <div className="wrap grid items-center gap-13 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="kicker">Tecnología diseñada alrededor de operaciones reales</p>
          <h1 id="h1" className="text-[clamp(36px,4.5vw,60px)]">
            La tecnología debería{" "}
            <span className="md:block">adaptarse a tu empresa.</span>{" "}
            <em className="not-italic text-teal">No al revés.</em>
          </h1>
          <p className="lead mt-[22px]">
            Entendemos cómo funciona tu operación, conectamos los sistemas que ya
            tienes y desarrollamos el software que falta.
          </p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            <Button asChild>
              <Link href="/contacto">Cuéntanos el problema</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="#productos">Explorar productos</Link>
            </Button>
          </div>
          <p className="mt-9 flex items-center gap-2.5 border-t border-hair pt-5 text-[13.5px] text-stone">
            <i className="size-[7px] shrink-0 rounded-full bg-teal" />
            Sistema de gestión de calidad certificado según ISO 9001:2015
          </p>
        </div>

        <HeroDiagram />
      </div>

      <div className="wrap mt-3.5">
        <p className="text-[13px] text-stone">
          <b className="font-semibold text-ink">
            Sin sustituirlo todo. Sin empezar de cero.
          </b>{" "}
          Conectamos lo que ya existe y desarrollamos la pieza que falta.
        </p>
      </div>
    </section>
  );
}
