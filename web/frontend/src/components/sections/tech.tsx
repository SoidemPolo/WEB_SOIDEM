import { Reveal } from "@/components/ui/reveal";

const TECH = [
  "Splunk",
  "Node-RED",
  "Power BI",
  "AWS",
  "OVH Cloud",
  "Microsoft Azure",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "SAP / ERP",
  "PLC / SCADA",
];

export function Tech() {
  return (
    <section id="tecnologias" className="border-y border-hair bg-alt py-section">
      <div className="wrap">
        <Reveal>
          <p className="kicker">Con qué trabajamos</p>
          <h2 className="h2-display">Tecnología ya probada, no reinventada.</h2>
          <p className="lead">
            Elegimos la pieza adecuada para cada problema, sin encariñarnos con
            ninguna marca.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-2.5">
            {TECH.map((item) => (
              <span
                key={item}
                className="rounded-full border border-hair bg-white px-4 py-2 text-[14.5px] font-medium text-stone-2 transition-colors hover:border-teal hover:text-teal"
              >
                {item}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
