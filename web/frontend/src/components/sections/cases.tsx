import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

const W = "https://static.wixstatic.com/media";

const CASES = [
  {
    logo: {
      alt: "Texia",
      w: 253,
      h: 77,
      src: `${W}/1e5c2d_480e2fdd20784c0fa6937d3ab4b3054e~mv2.png/v1/fill/w_253,h_77,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/1e5c2d_480e2fdd20784c0fa6937d3ab4b3054e~mv2.png`,
    },
    type: "Monitorización industrial",
    pain: "Saber qué pasaba en planta exigía estar allí, en persona.",
    change: "Dirección ve la fábrica en tiempo real, esté donde esté.",
  },
  {
    logo: {
      alt: "Calier",
      w: 176,
      h: 59,
      src: `${W}/1e5c2d_1136bad52e0a4dde99be6f88349e5d99~mv2.png/v1/fill/w_176,h_59,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/calier_Indu.png`,
    },
    type: "Integración industrial · Pharma",
    pain: "Cada sistema generaba datos. Ninguno daba visión conjunta.",
    change: "Una base común que crece por líneas y procesos sin sustituir nada.",
  },
  {
    logo: {
      alt: "Vitae",
      w: 146,
      h: 69,
      src: `${W}/1e5c2d_9cc5b290ee9e43acac6fde4f45cc3a2f~mv2.png/v1/fill/w_146,h_69,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/vitae.png`,
    },
    type: "Data as a Service",
    pain: "Cada informe nuevo obligaba a empezar de cero.",
    change: "Capacidad analítica estable y con memoria, sin ampliar equipo.",
  },
  {
    logo: {
      alt: "Filinox",
      w: 146,
      h: 29,
      src: `${W}/1e5c2d_624eb0999f85410ebee86fa75c799081~mv2.png/v1/fill/w_146,h_29,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Filinox_logotipo.png`,
    },
    type: "Automatización documental · OCR",
    pain: "Leer, comprobar y teclear facturas ocupaba a cinco personas.",
    change: "Lo que ocupaba a cinco personas ahora lo gestiona una.",
  },
];

export function Cases() {
  return (
    <section id="caso" className="bg-alt py-section">
      <div className="wrap">
        <Reveal>
          <p className="kicker">Soluciones en contexto</p>
          <h2 className="h2-display">Problemas concretos. Soluciones que ya funcionan.</h2>
          <p className="lead">
            Una muestra de cómo trabajamos: primero entendemos el problema, después
            conectamos o construimos la tecnología necesaria y, por último, cambiamos
            la forma de trabajar.
          </p>
        </Reveal>

        <div
          role="list"
          aria-label="Ejemplos de soluciones desarrolladas por SOIDEM"
          className="mt-12 grid gap-5 md:grid-cols-2"
        >
          {CASES.map((item, i) => (
            <Reveal key={item.logo.alt} delay={i * 0.06}>
              <article
                role="listitem"
                className="flex h-full flex-col gap-4 rounded-card border border-hair bg-white p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <Image
                    src={item.logo.src}
                    alt={item.logo.alt}
                    width={item.logo.w}
                    height={item.logo.h}
                    className="h-auto max-h-10 w-auto object-contain"
                  />
                  <span className="rounded-full bg-alt px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-stone-2">
                    {item.type}
                  </span>
                </div>

                <h3 className="text-[20px]">{item.pain}</h3>

                <div className="mt-auto border-t border-hair pt-4">
                  <b className="block text-[11.5px] font-semibold uppercase tracking-[0.12em] text-stone">
                    Qué cambió
                  </b>
                  <strong className="mt-1 block text-[16.5px] font-[650] text-teal">
                    {item.change}
                  </strong>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-6">
            <p className="max-w-[58ch] text-[16.5px] text-stone">
              Cada reto es distinto. El punto de partida siempre es el mismo: entender
              qué está frenando la operación antes de decidir qué tecnología utilizar.
            </p>
            <Button asChild>
              <Link href="/contacto">Cuéntanos el problema</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
