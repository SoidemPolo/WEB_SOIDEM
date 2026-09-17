import { cn } from "@/lib/utils";

/**
 * Cinta de insignias en dos filas que avanzan en sentidos opuestos, según el
 * patrón del integration-hero de @ruixen.ui (21st.dev).
 *
 * Tres cambios respecto al original:
 *
 * 1. No trae iconos propios: recibe los nuestros. El original apunta a imágenes
 *    alojadas en el CDN de 21st.dev, que aquí serían una dependencia externa
 *    para algo que ya tenemos en local.
 * 2. Las animaciones van en globals.css, no en `<style jsx>`. El resto del
 *    proyecto no usa styled-jsx, y así el componente sigue siendo de servidor:
 *    la cinta es CSS puro y no necesita JavaScript en el cliente.
 * 3. Se detiene con `prefers-reduced-motion`, como el resto de las cintas.
 *
 * Para que el bucle no dé saltos, cada fila se pinta dos veces y la animación
 * recorre exactamente la mitad.
 */
export function IconMarquee({
  rows,
  className,
}: {
  rows: React.ReactNode[][];
  className?: string;
}) {
  return (
    <div className={cn("marquee-cinta relative overflow-hidden", className)}>
      {rows.map((items, i) => (
        <div
          key={i}
          aria-hidden
          className={cn(
            "flex w-max gap-6 sm:gap-10",
            i > 0 && "mt-5",
            i % 2 === 0 ? "marquee-izq" : "marquee-der",
          )}
        >
          {[...items, ...items].map((item, j) => (
            <div key={j} className="shrink-0">
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
