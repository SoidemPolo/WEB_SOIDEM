import Image from "next/image";

import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { Reveal } from "@/components/ui/reveal";
import { TECHS, type Tech as TechItem } from "@/lib/tech";

/** Dos órbitas: las cinco primeras dentro, las seis restantes fuera. */
const ORBITA_INTERIOR = TECHS.slice(0, 5);
const ORBITA_EXTERIOR = TECHS.slice(5);

export function Tech() {
  return (
    <section
      id="tecnologias"
      className="relative overflow-hidden border-y border-hair bg-alt py-section"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(25,28,30,.055)_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <div className="wrap relative grid items-center gap-12 lg:grid-cols-[1fr_auto]">
        <Reveal>
          <p className="kicker">Con qué trabajamos</p>
          <h2 className="h2-display">Integramos según lo que necesites.</h2>
          <p className="lead">
            Tecnología ya probada, no reinventada. Elegimos la pieza adecuada para
            cada problema, sin encariñarnos con ninguna marca.
          </p>

          {/* La lista con los nombres es la versión accesible y la que de verdad
              identifica: en la órbita, AWS, Azure y Power BI llevan un icono
              genérico porque sus marcas no se pueden redistribuir. */}
          <ul className="mt-8 flex flex-wrap gap-2">
            {TECHS.map((tech) => (
              <li
                key={tech.name}
                style={{ "--marca": tech.color } as React.CSSProperties}
                className="flex items-center gap-2 rounded-full border border-hair bg-white py-1.5 pl-2.5 pr-3.5 text-[13.5px] font-[650] text-ink transition-colors duration-200 hover:border-[var(--marca)]"
              >
                <Logo tech={tech} className="size-[15px]" />
                {tech.name}
              </li>
            ))}
          </ul>

          <p className="mt-7 text-[13.5px] text-stone">
            ¿Trabajas con otra cosa?{" "}
            <a
              href="/contacto"
              className="font-semibold text-teal underline underline-offset-4"
            >
              Cuéntanos qué tienes
            </a>{" "}
            y te decimos si encaja.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <Orbita />
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Las integraciones girando alrededor de SOIDEM, con el orbiting-circles de
 * @dillionverma (magic-ui), instalado con su CLI. Es decorativo: los nombres
 * están en la lista de al lado, así que aquí no hace falta texto y va oculto
 * para lectores de pantalla.
 */
function Orbita() {
  return (
    <div
      aria-hidden
      className="relative mx-auto flex size-[340px] items-center justify-center sm:size-[420px]"
    >
      {/* SOIDEM en el centro: todo lo demás gira a su alrededor, que es
          exactamente lo que dice la sección.

          Es el icono oficial del sitio, que ya trae su propio círculo oscuro,
          así que no lleva ningún envoltorio detrás. No se sirve como
          /icon.png: esa ruta la genera Next desde src/app/icon.png para el
          favicon y pisaría al archivo público. */}
      <Image
        src="/images/soidem-icono.png"
        alt=""
        width={512}
        height={512}
        priority
        className="relative z-10 size-[84px] rounded-full shadow-[0_10px_30px_rgba(25,28,30,.22)]"
      />

      <OrbitingCircles iconSize={44} radius={108} duration={26}>
        {ORBITA_INTERIOR.map((tech) => (
          <Insignia key={tech.name} tech={tech} />
        ))}
      </OrbitingCircles>

      <OrbitingCircles iconSize={44} radius={172} duration={34} reverse>
        {ORBITA_EXTERIOR.map((tech) => (
          <Insignia key={tech.name} tech={tech} />
        ))}
      </OrbitingCircles>
    </div>
  );
}

function Insignia({ tech }: { tech: TechItem }) {
  return (
    <span
      title={tech.name}
      className="grid size-11 place-items-center rounded-full border border-hair bg-white shadow-[0_4px_14px_rgba(25,28,30,.08)]"
    >
      <Logo tech={tech} className="size-[21px]" />
    </span>
  );
}

/** Logotipo oficial si simple-icons lo trae; si no, un icono genérico. */
function Logo({ tech, className }: { tech: TechItem; className?: string }) {
  const Icono = tech.icon;

  if (tech.path) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        style={{ color: tech.color }}
      >
        <path d={tech.path} />
      </svg>
    );
  }
  if (Icono) {
    return <Icono className={className} strokeWidth={2.2} style={{ color: tech.color }} />;
  }
  return null;
}
