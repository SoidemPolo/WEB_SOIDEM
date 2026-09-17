import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, FileSearch, RefreshCw, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

const CERT_IMAGE =
  "https://static.wixstatic.com/media/1e5c2d_f5a462d91e3d4a75b8d53f683dabe8d9~mv2.jpg/v1/fill/w_460,h_567,al_c,q_88/iso.jpg";

/** Lo que la certificación significa en el día a día, no en el papel. */
const GARANTIAS = [
  {
    icon: ShieldCheck,
    titulo: "Procesos definidos",
    texto: "Cada proyecto sigue un procedimiento escrito, no la costumbre de cada cual.",
  },
  {
    icon: FileSearch,
    titulo: "Trazabilidad",
    texto: "Queda registro de qué se decidió, cuándo y por qué.",
  },
  {
    icon: RefreshCw,
    titulo: "Mejora continua",
    texto: "Las desviaciones se analizan y cambian el proceso, no solo el proyecto.",
  },
  {
    icon: BadgeCheck,
    titulo: "Auditoría externa",
    texto: "Lo verifica Intertek, no nosotros.",
  },
];

export function Iso() {
  return (
    <section id="calidad" className="relative overflow-hidden bg-deep py-section text-white">
      {/* Una veladura de luz detrás del certificado, para que la sección oscura
          no sea un rectángulo plano. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 size-[620px] rounded-full bg-[radial-gradient(circle,rgba(30,121,141,.38),transparent_68%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(90%_70%_at_60%_40%,#000,transparent)]"
      />

      <div className="wrap relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <p className="kicker text-white/50">Calidad</p>

            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal/40 bg-teal/15 px-3.5 py-1.5 text-[12.5px] font-semibold text-[#8FD4E3]">
              <BadgeCheck aria-hidden className="size-4" />
              Certificado y auditado por Intertek
            </span>

            <h2 className="text-[clamp(34px,4.6vw,58px)] font-[650] leading-[1.02] tracking-[-0.03em]">
              ISO 9001:2015
            </h2>
            <p className="mt-3 text-[19px] text-white/70">
              La agilidad no está reñida con el rigor.
            </p>

            <p className="mt-6 max-w-[52ch] text-[16.5px] leading-relaxed text-white/70">
              Nuestro sistema de gestión de calidad está certificado según ISO
              9001:2015. Procesos definidos, controlados y orientados a la mejora
              continua.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-6">
              <Button asChild variant="white">
                <Link href="/iso9001">Ver certificado y política de calidad</Link>
              </Button>
              <Link
                href="/calidad-interna"
                className="text-[15.5px] font-semibold text-white underline underline-offset-4 transition-colors hover:text-[#8FD4E3]"
              >
                Política de calidad
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <figure className="mx-auto w-fit">
              <div className="rounded-[20px] border border-white/12 bg-white/[0.06] p-3 backdrop-blur-sm">
                <Image
                  src={CERT_IMAGE}
                  alt="Certificado ISO 9001:2015 de SOIDEM Data Technologies"
                  width={460}
                  height={567}
                  className="h-auto w-full max-w-[320px] rounded-[14px] bg-white"
                />
              </div>
              <figcaption className="mt-3 text-center text-[12.5px] text-white/45">
                Certificado ISO 9001:2015 · Intertek
              </figcaption>
            </figure>
          </Reveal>
        </div>

        {/* Qué significa la certificación en la práctica: sin esto, el sello es
            una imagen bonita que no dice nada. */}
        <Reveal delay={0.15}>
          <ul className="mt-16 grid gap-px overflow-hidden rounded-card border border-white/12 bg-white/12 sm:grid-cols-2 lg:grid-cols-4">
            {GARANTIAS.map((g) => (
              <li key={g.titulo} className="bg-deep p-6">
                <g.icon aria-hidden className="size-5 text-[#5AC8FA]" strokeWidth={2.1} />
                <p className="mt-3.5 text-[15.5px] font-[650]">{g.titulo}</p>
                <p className="mt-1.5 text-[13.5px] leading-snug text-white/55">{g.texto}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
