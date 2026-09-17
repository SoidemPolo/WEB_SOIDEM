import { Reveal } from "@/components/ui/reveal";

const PRINCIPLES = [
  { n: "01", text: "Entender antes de construir." },
  { n: "02", text: "Conectar antes de sustituir." },
  { n: "03", text: "Crear solo lo que falta." },
];

export function MethodBand() {
  return (
    <section aria-label="Cómo trabaja SOIDEM" className="border-y border-hair bg-alt py-14">
      <Reveal>
        <div className="wrap grid gap-6 md:grid-cols-3">
          {PRINCIPLES.map((principle) => (
            <p key={principle.n} className="flex items-baseline gap-3">
              <span className="text-[13px] font-semibold tracking-[0.14em] text-teal">
                {principle.n}
              </span>
              <b className="text-[19px] font-[650] tracking-[-0.02em]">{principle.text}</b>
            </p>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
