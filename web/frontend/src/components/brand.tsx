import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * Marca SOIDEM. Usa el logotipo oficial descargado del sitio actual
 * (public/logo-soidem.png), recortado al contenido y con el fondo
 * transparente para que asiente sobre cualquier color.
 *
 * El nombre viaja en el alt, no como texto duplicado al lado: repetirlo
 * haría que los lectores de pantalla lo anunciaran dos veces.
 */
export function Brand({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="SOIDEM Data Technologies, inicio"
      className={cn(
        "inline-flex shrink-0 items-center transition-opacity hover:opacity-80",
        className,
      )}
    >
      <Image
        src="/logo-soidem.png"
        alt="SOIDEM Data Technologies"
        width={1765}
        height={534}
        priority={priority}
        className="h-full w-auto object-contain"
      />
    </Link>
  );
}
