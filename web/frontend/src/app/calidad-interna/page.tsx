import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/legal-page";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Política de Calidad — SOIDEM Data Technologies",
  description:
    "Política de Calidad de SOIDEM Data Technologies: compromisos de la Dirección dentro del Sistema de Gestión de Calidad ISO 9001:2015.",
  alternates: { canonical: "/calidad-interna" },
};

export default function CalidadInternaPage() {
  return (
    <LegalPage kicker="Calidad" title="Política de Calidad">
      <p>
        SOIDEM DATA TECHNOLOGIES es una empresa que ofrece a sus clientes soluciones
        tecnológicas a medida para la digitalización y automatización de procesos.
        Nuestra misión es ofrecer las soluciones más competitivas y con mayor valor
        añadido para el cliente.
      </p>
      <p>
        Para reforzar estos objetivos, hemos implantado un Sistema de Gestión de
        Calidad según la norma ISO 9001:2015. La Dirección asume el liderazgo en la
        implantación del sistema de calidad, que se basa en los siguientes
        compromisos:
      </p>

      <ul>
        <li>
          Centrar nuestros esfuerzos en escuchar a nuestros clientes, siendo
          proactivos y flexibles, ofreciendo propuestas adaptadas a sus necesidades,
          sostenibles y de alto valor.
        </li>
        <li>
          Coordinar y trabajar codo con codo con nuestros clientes para lograr un
          objetivo común: un trabajo bien hecho.
        </li>
        <li>
          Mantener un enfoque permanente en la excelencia en la gestión, la
          iniciativa, la innovación y la mejora continua.
        </li>
        <li>
          El compromiso de todas las personas que formamos parte de la empresa, y de
          nuestros colaboradores, con el cumplimiento de los requisitos del cliente y
          normativos.
        </li>
      </ul>

      <p>
        La Dirección facilita los recursos necesarios para alcanzar estos objetivos, y
        revisa periódicamente la idoneidad, adecuación y eficacia del Sistema de
        Gestión de Calidad.
      </p>
      <p>
        La participación de todas las personas de esta empresa es imprescindible, y
        pedimos el compromiso total de todos con esta Política de Calidad.
      </p>

      <div className="mt-4">
        <Button asChild>
          <Link href="/iso9001">Ver certificado ISO 9001:2015</Link>
        </Button>
      </div>
    </LegalPage>
  );
}
