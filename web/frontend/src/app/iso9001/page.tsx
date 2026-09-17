import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { LegalPage } from "@/components/legal-page";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "ISO 9001:2015 — SOIDEM Data Technologies",
  description:
    "Certificación ISO 9001:2015 de SOIDEM Data Technologies: procesos estandarizados, mejora continua y fiabilidad en entornos industriales.",
  alternates: { canonical: "/iso9001" },
};

const CERT_IMAGE = "/images/iso-9001-intertek.png";

const PDF_ESP =
  "https://www.soidemdt.com/_files/ugd/1e5c2d_699d5520e9cc48deac2cdcb363237146.pdf";
const PDF_ENG =
  "https://www.soidemdt.com/_files/ugd/1e5c2d_7b553613c0984b99973f3959e8ea95ce.pdf";

export default function Iso9001Page() {
  return (
    <LegalPage kicker="Calidad" title="Certificación ISO 9001:2015">
      <p>
        En SOIDEM Data Technologies creemos que la calidad, la seguridad y la mejora
        continua no son solo un objetivo, sino la base sobre la que construimos cada
        proyecto.
      </p>
      <p>
        Nuestra certificación ISO confirma que trabajamos según estándares
        internacionales reconocidos, garantizando procesos sólidos, trazabilidad,
        fiabilidad y un compromiso constante con la excelencia tecnológica y
        operativa.
      </p>

      <p>
        <strong>Esta certificación refleja nuestra forma de trabajar:</strong>
      </p>
      <ul>
        <li>Procesos estandarizados y eficientes.</li>
        <li>Mejora continua de nuestros servicios.</li>
        <li>Compromiso con la calidad y la satisfacción del cliente.</li>
        <li>Fiabilidad en entornos industriales y tecnológicos.</li>
        <li>Gestión profesional de proyectos y datos.</li>
      </ul>

      <p>
        Trabajamos cada día para ofrecer soluciones innovadoras manteniendo los
        máximos estándares de calidad en todos nuestros desarrollos, integraciones y
        servicios de consultoría.
      </p>

      <figure className="my-4 w-fit">
        <Image
          src={CERT_IMAGE}
          alt="Marca de certificación ISO 9001:2015 emitida por Intertek"
          width={1788}
          height={2232}
          className="h-auto w-full max-w-[260px]"
        />
        <figcaption className="mt-3 text-[13px] text-stone">
          Certificado ISO 9001:2015
        </figcaption>
      </figure>

      <div className="flex flex-wrap items-center gap-4">
        <Button asChild>
          <Link href="/calidad-interna">Ver Política de Calidad completa</Link>
        </Button>
        <a href={PDF_ESP} target="_blank" rel="noopener">
          Descargar ESP
        </a>
        <a href={PDF_ENG} target="_blank" rel="noopener">
          Descargar ENG
        </a>
      </div>
    </LegalPage>
  );
}
