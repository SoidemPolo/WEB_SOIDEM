import { Reveal } from "@/components/ui/reveal";

const PROBLEMS = [
  {
    pain: "No sé qué está pasando en mi planta ahora mismo.",
    answer: (
      <>
        Conectamos máquinas y sensores para que producción, paradas e incidencias
        estén disponibles{" "}
        <b className="font-[680] text-ink">en tiempo real y desde cualquier lugar.</b>
      </>
    ),
    label: "Monitorización",
  },
  {
    pain: "Mis máquinas y mis sistemas no se hablan.",
    answer: (
      <>
        Integramos PLC, SAP, ERP, básculas y bases de datos para que trabajen{" "}
        <b className="font-[680] text-ink">sobre una misma información.</b>
      </>
    ),
    label: "Integración OT/IT",
  },
  {
    pain: "Perdemos horas en informes y registros a mano.",
    answer: (
      <>
        Automatizamos documentos, alertas, informes y registros para que{" "}
        <b className="font-[680] text-ink">
          la información llegue sola a quien la necesita.
        </b>
      </>
    ),
    label: "Automatización",
  },
  {
    pain: "Los problemas los descubrimos tarde.",
    answer: (
      <>
        Creamos alertas con contexto cuando algo se desvía para que el equipo{" "}
        <b className="font-[680] text-ink">actúe antes de que el problema crezca.</b>
      </>
    ),
    label: "Alertas",
  },
  {
    pain: "Necesitamos trazabilidad y no la tenemos.",
    answer: (
      <>
        Relacionamos órdenes, lotes, proceso y calidad para construir{" "}
        <b className="font-[680] text-ink">una historia completa y consultable.</b>
      </>
    ),
    label: "Trazabilidad",
  },
  {
    pain: "El software del mercado no encaja con lo nuestro.",
    answer: (
      <>
        Cuando la solución no existe,{" "}
        <b className="font-[680] text-ink">la diseñamos y desarrollamos a medida</b>{" "}
        alrededor de la operativa real.
      </>
    ),
    label: "Software a medida",
  },
];

export function Problems() {
  return (
    <section
      id="que-resolvemos"
      aria-labelledby="problems-title"
      className="border-t border-hair bg-white pb-[70px] pt-[58px] max-md:overflow-hidden md:pb-[92px] md:pt-[76px]"
    >
      <div className="wrap">
        <Reveal>
          <div className="mx-auto max-w-[860px] text-left md:text-center">
            <p className="kicker mb-[18px] text-teal">Qué resolvemos</p>
            <h2
              id="problems-title"
              className="max-w-[11ch] text-[42px] leading-[0.98] tracking-[-0.055em] md:mx-auto md:max-w-[18ch] md:text-[clamp(38px,5.4vw,68px)]"
            >
              Si has dicho alguna de estas frases,{" "}
              <em className="not-italic text-teal">es para ti.</em>
            </h2>
            <p className="lead max-w-[60ch] text-[15px] md:mx-auto md:mt-5 md:text-[clamp(17px,1.65vw,20px)]">
              No vendemos una tecnología concreta. Entramos cuando la operación
              necesita más visibilidad, menos trabajo manual o una solución que
              encaje de verdad.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div
            role="list"
            aria-label="Problemas que resuelve SOIDEM"
            className="problem-grid"
          >
            {PROBLEMS.map((problem) => (
              <article key={problem.label} role="listitem" className="problem-card">
                <h3 className="max-w-[29ch] pl-[13px] text-[19px] leading-[1.24] tracking-[-0.025em]">
                  {problem.pain}
                </h3>
                <p className="mt-3.5 text-[14.5px] leading-[1.52] text-stone">
                  {problem.answer}
                </p>
                <p className="mt-auto pt-5 text-[10.5px] font-[760] uppercase tracking-[0.16em] text-teal-dark">
                  {problem.label}
                </p>
              </article>
            ))}
          </div>
        </Reveal>

        <p className="mt-2.5 text-right text-[12px] text-stone md:hidden">
          Desliza para ver más →
        </p>
      </div>
    </section>
  );
}
