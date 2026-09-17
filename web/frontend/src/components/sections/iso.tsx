import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

const CERT_IMAGE =
  "https://static.wixstatic.com/media/1e5c2d_f5a462d91e3d4a75b8d53f683dabe8d9~mv2.jpg/v1/fill/w_460,h_567,al_c,q_88/iso.jpg";

export function Iso() {
  return (
    <section id="calidad" className="bg-deep py-section text-white">
      <div className="wrap grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="kicker text-white/50">Calidad</p>
          <p className="text-[clamp(30px,4vw,50px)] font-[650] leading-[1.07] tracking-[-0.024em]">
            ISO 9001:2015
            <small className="mt-3 block text-[18px] font-normal leading-snug text-white/70">
              La agilidad no está reñida con el rigor.
            </small>
          </p>
          <p className="mt-6 max-w-[54ch] text-[16.5px] text-white/70">
            Nuestro sistema de gestión de calidad está certificado según ISO
            9001:2015. Procesos definidos, controlados y orientados a la mejora
            continua.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Button asChild variant="white">
              <Link href="/iso9001">Ver certificado y política de calidad</Link>
            </Button>
            <Link
              href="/calidad-interna"
              className="text-[15.5px] font-semibold text-white underline underline-offset-4 hover:text-white/80"
            >
              Política de calidad
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <figure className="mx-auto w-fit">
            <Image
              src={CERT_IMAGE}
              alt="Certificado ISO 9001:2015 de SOIDEM Data Technologies"
              width={460}
              height={567}
              className="h-auto w-full max-w-[380px] rounded-card"
            />
            <figcaption className="mt-3 text-center text-[13px] text-white/50">
              Certificado ISO 9001:2015
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
