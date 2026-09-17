import { ChartColumnBig, Cloud, Cpu, type LucideIcon } from "lucide-react";
import {
  siMongodb,
  siMysql,
  siNodered,
  siOvh,
  siPostgresql,
  siSap,
  siSplunk,
} from "simple-icons";

/**
 * Tecnologías con las que trabaja SOIDEM, con su logotipo y su color.
 *
 * Los logotipos vienen de `simple-icons`, que los sirve como un único path SVG.
 * Amazon, Microsoft y Power BI NO están en ese paquete: esas empresas pidieron
 * que se retirasen sus marcas. Para ellas se usa un icono genérico en su color
 * corporativo en lugar de buscar el logotipo por otra vía, porque redistribuir
 * una marca que su dueño ha pedido retirar no es algo que convenga hacer.
 * El nombre va escrito al lado en todos los casos, así que se reconocen igual.
 */
export type Tech = {
  name: string;
  /** Color de la marca, el que toma al pasar el cursor. */
  color: string;
  /** Path del logotipo oficial (viewBox 0 0 24 24), si está disponible. */
  path?: string;
  /** Icono genérico para las marcas sin logotipo redistribuible. */
  icon?: LucideIcon;
};

export const TECHS: Tech[] = [
  { name: "Splunk", color: "#" + siSplunk.hex, path: siSplunk.path },
  { name: "Node-RED", color: "#" + siNodered.hex, path: siNodered.path },
  { name: "Power BI", color: "#F2C811", icon: ChartColumnBig },
  { name: "AWS", color: "#FF9900", icon: Cloud },
  { name: "OVH Cloud", color: "#" + siOvh.hex, path: siOvh.path },
  { name: "Microsoft Azure", color: "#0078D4", icon: Cloud },
  { name: "PostgreSQL", color: "#" + siPostgresql.hex, path: siPostgresql.path },
  { name: "MySQL", color: "#" + siMysql.hex, path: siMysql.path },
  { name: "MongoDB", color: "#" + siMongodb.hex, path: siMongodb.path },
  { name: "SAP / ERP", color: "#" + siSap.hex, path: siSap.path },
  { name: "PLC / SCADA", color: "#1E798D", icon: Cpu },
];
