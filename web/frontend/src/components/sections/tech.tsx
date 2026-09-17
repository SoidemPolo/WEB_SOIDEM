import { IconMarquee } from "@/components/ui/icon-marquee";
import { Reveal } from "@/components/ui/reveal";
import { TECHS, type Tech as TechItem } from "@/lib/tech";

/** Dos filas que avanzan en sentidos opuestos. */
const FILA_1 = TECHS.slice(0, 6);
const FILA_2 = TECHS.slice(6);

export function Tech() {
  return (
    <section
      id="tecnologias"
      className="relative overflow-hidden border-y border-hair bg-alt py-section"
    >
      {/* Retícula de puntos, como en el original de 21st.dev */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(25,28,30,.055)_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <div className="relative">
        <div className="wrap">
          <Reveal>
            <p className="kicker">Con qué trabajamos</p>
            <h2 className="h2-display">Integramos según lo que necesites.</h2>
            <p className="lead">
              Tecnología ya probada, no reinventada. Elegimos la pieza adecuada para
              cada problema, sin encariñarnos con ninguna marca.
            </p>
          </Reveal>
        </div>

        {/* La cinta desborda el ancho del contenido a propósito: así se ve que
            sigue más allá de los bordes. */}
        <Reveal delay={0.1}>
          <IconMarquee
            className="mt-11"
            rows={[
              FILA_1.map((tech) => <TechBadge key={tech.name} tech={tech} />),
              FILA_2.map((tech) => <TechBadge key={tech.name} tech={tech} />),
            ]}
          />
        </Reveal>

        <div className="wrap">
          <p className="mt-9 text-[13.5px] text-stone">
            ¿Trabajas con otra cosa?{" "}
            <a
              href="/contacto"
              className="font-semibold text-teal underline underline-offset-4"
            >
              Cuéntanos qué tienes
            </a>{" "}
            y te decimos si encaja.
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Insignia con forma de píldora en vez de círculo: tres de las marcas no tienen
 * logotipo redistribuible y con un icono genérico solo, sin el nombre al lado,
 * no habría forma de reconocerlas.
 */
function TechBadge({ tech }: { tech: TechItem }) {
  const Icono = tech.icon;

  return (
    <span
      style={{ "--marca": tech.color } as React.CSSProperties}
      className="group flex items-center gap-2.5 rounded-full border border-hair bg-white py-2.5 pl-2.5 pr-5 shadow-[0_4px_16px_rgba(25,28,30,.06)] transition-[border-color,box-shadow] duration-200 hover:border-[var(--marca)] hover:shadow-[0_8px_22px_color-mix(in_srgb,var(--marca)_20%,transparent)]"
    >
      {/* Solo el logotipo lleva color: el círculo se queda neutro para que la
          rejilla no se vuelva un mosaico de fondos de colores. */}
      <span
        aria-hidden
        className="grid size-9 shrink-0 place-items-center rounded-full bg-alt text-[var(--marca)]"
      >
        {tech.path ? (
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-[19px]">
            <path d={tech.path} />
          </svg>
        ) : Icono ? (
          <Icono className="size-[19px]" strokeWidth={2.2} />
        ) : null}
      </span>

      <span className="whitespace-nowrap text-[14.5px] font-[650] tracking-[-0.01em] text-ink">
        {tech.name}
      </span>
    </span>
  );
}
