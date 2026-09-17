import { Reveal } from "@/components/ui/reveal";

const PROBLEMS = [
  {
    pain: "No sé qué está pasando en mi planta ahora mismo.",
    answer: (
      <>
        Conectamos máquinas y sensores para que producción, paradas e incidencias
        estén disponibles <b className="text-ink">en tiempo real y desde cualquier lugar.</b>
      </>
    ),
    label: "Monitorización",
  },
  {
    pain: "Mis máquinas y mis sistemas no se hablan.",
    answer: (
      <>
        Integramos PLC, SAP, ERP, básculas y bases de datos para que trabajen{" "}
        <b className="text-ink">sobre una misma información.</b>
      </>
    ),
    label: "Integración OT/IT",
  },
  {
    pain: "Perdemos horas en informes y registros a mano.",
    answer: (
      <>
        Automatizamos documentos, alertas, informes y registros para que{" "}
        <b className="text-ink">la información llegue sola a quien la necesita.</b>
      </>
    ),
    label: "Automatización",
  },
  {
    pain: "Los problemas los descubrimos tarde.",
    answer: (
      <>
        Creamos alertas con contexto cuando algo se desvía para que el equipo{" "}
        <b className="text-ink">actúe antes de que el problema crezca.</b>
      </>
    ),
    label: "Alertas",
  },
  {
    pain: "Necesitamos trazabilidad y no la tenemos.",
    answer: (
      <>
        Relacionamos órdenes, lotes, proceso y calidad para construir{" "}
        <b className="text-ink">una historia completa y consultable.</b>
      </>
    ),
    label: "Trazabilidad",
  },
  {
    pain: "El software del mercado no encaja con lo nuestro.",
    answer: (
      <>
        Cuando la solución no existe,{" "}
        <b className="text-ink">la diseñamos y desarrollamos a medida</b> alrededor de
        la operativa real.
      </>
    ),
    label: "Software a medida",
  },
];

export function Problems() {
  return (
    <section id="que-resolvemos" aria-labelledby="problems-title" className="py-section">
      <div className="wrap">
        <Reveal>
          <p className="kicker">Qué resolvemos</p>
          <h2 id="problems-title" className="h2-display">
            Si has dicho alguna de estas frases,{" "}
            <em className="not-italic text-teal">es para ti.</em>
          </h2>
          <p className="lead">
            No vendemos una tecnología concreta. Entramos cuando la operación
            necesita más visibilidad, menos trabajo manual o una solución que encaje
            de verdad.
          </p>
        </Reveal>

        <div
          role="list"
          aria-label="Problemas que resuelve SOIDEM"
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PROBLEMS.map((problem, i) => (
            <Reveal key={problem.label} delay={i * 0.05}>
              <article
                role="listitem"
                className="flex h-full flex-col gap-3 rounded-card border border-hair bg-white p-6 transition-[border-color,box-shadow] hover:border-line hover:shadow-[0_8px_28px_rgba(25,28,30,.06)]"
              >
                <h3 className="text-[19px]">{problem.pain}</h3>
                <p className="text-[15.5px] text-stone">{problem.answer}</p>
                <p className="mt-auto pt-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-teal">
                  {problem.label}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
