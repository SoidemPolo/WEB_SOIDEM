import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

const SOURCES = ["Máquinas · PLC", "SAP · ERP", "Calidad", "Excel · BBDD", "Personas"];

const CHIPS = [
  "visión en tiempo real",
  "sistemas conectados",
  "trazabilidad",
  "informes automáticos",
  "alertas a quien decide",
];

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

        <Reveal delay={0.1}>
          <HeroDiagram />
        </Reveal>
      </div>

      <div className="wrap mt-9">
        <p className="text-[15px] text-stone">
          <b className="text-ink">Sin sustituirlo todo. Sin empezar de cero.</b>{" "}
          Conectamos lo que ya existe y desarrollamos la pieza que falta.
        </p>
      </div>
    </section>
  );
}

/**
 * Pieza visual del hero: lo que ya existe entra por la izquierda, SOIDEM lo conecta
 * y sale convertido en un panel operativo. Porta la idea del diagrama de la web actual.
 */
function HeroDiagram() {
  return (
    <div
      role="img"
      aria-label="Lo que ya existe en tu empresa (máquinas, SAP, calidad, Excel, personas) pasa por SOIDEM, que lo entiende y lo conecta, y se convierte en lo que faltaba: visión común, alertas, trazabilidad y una aplicación a medida."
      className="relative overflow-hidden rounded-[18px] border border-hair bg-white bg-[radial-gradient(circle_at_1px_1px,#E3E0D7_1.1px,transparent_0)] bg-[length:26px_26px] p-6"
    >
      <p aria-hidden className="mb-5 text-[12px] font-semibold uppercase tracking-[0.14em] text-stone">
        Lo que ya existe → lo que faltaba
      </p>

      <div className="grid gap-5 sm:grid-cols-[auto_1fr]">
        <ul aria-hidden className="flex flex-col justify-center gap-2.5">
          {SOURCES.map((label) => (
            <li
              key={label}
              className="whitespace-nowrap rounded-full border border-[#D8D4C9] bg-white px-4 py-[9px] text-[13px] font-semibold text-[#3d4347] shadow-[0_2px_10px_rgba(25,28,30,.06)]"
            >
              {label}
            </li>
          ))}
        </ul>

        <div aria-hidden className="flex flex-col gap-3">
          <div className="flex flex-col rounded-xl bg-deep px-4 py-3 text-white">
            <b className="text-[15px] font-bold tracking-[-0.01em]">SOIDEM</b>
            <small className="text-[11px] uppercase tracking-[0.14em] text-white/70">
              entiende · conecta · integra
            </small>
          </div>

          <div className="rounded-xl border border-hair bg-white p-4">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div className="flex flex-col">
                <strong className="text-[14px]">Panel operativo</strong>
                <span className="text-[11.5px] text-stone">
                  Producción conectada y visible
                </span>
              </div>
              <span className="flex items-center gap-1.5 text-[11px] font-semibold text-teal">
                <i className="size-1.5 animate-pulse rounded-full bg-teal" />
                en línea
              </span>
            </div>

            <div className="mb-3 grid grid-cols-3 gap-2">
              <Kpi label="Líneas activas" value="4" />
              <Kpi label="OEE" value="87%" />
              <Kpi label="Alertas" value="3" />
            </div>

            <div className="rounded-lg border border-hair p-3">
              <div className="mb-2 flex justify-between text-[11px] text-stone">
                <span>Producción y energía</span>
                <span>Ahora</span>
              </div>
              <svg viewBox="0 0 220 78" preserveAspectRatio="none" className="h-16 w-full" aria-hidden>
                <defs>
                  <linearGradient id="areaHero" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="rgba(30,121,141,.26)" />
                    <stop offset="100%" stopColor="rgba(30,121,141,0)" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 62 L22 54 L44 56 L66 40 L88 42 L110 30 L132 34 L154 22 L176 26 L198 18 L220 20 L220 78 L0 78 Z"
                  fill="url(#areaHero)"
                />
                <path
                  d="M0 62 L22 54 L44 56 L66 40 L88 42 L110 30 L132 34 L154 22 L176 26 L198 18 L220 20"
                  fill="none"
                  stroke="#1E798D"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M0 68 L22 66 L44 60 L66 58 L88 52 L110 50 L132 48 L154 46 L176 40 L198 42 L220 36"
                  fill="none"
                  stroke="#0F3D47"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  strokeLinecap="round"
                />
              </svg>
              <div className="mt-2 flex gap-4 text-[11px] text-stone">
                <span className="flex items-center gap-1.5">
                  <i className="size-2 rounded-full bg-teal" />
                  producción
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="size-2 rounded-full bg-[#0F3D47]" />
                  consumo
                </span>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {CHIPS.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full bg-alt px-2.5 py-1 text-[11px] font-medium text-stone-2"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-hair px-2.5 py-2">
      <small className="block text-[10.5px] uppercase tracking-[0.08em] text-stone">
        {label}
      </small>
      <b className="text-[19px] leading-tight">{value}</b>
    </div>
  );
}
