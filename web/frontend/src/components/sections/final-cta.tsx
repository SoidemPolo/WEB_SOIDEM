import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function FinalCta() {
  return (
    <section id="hablemos" className="py-section">
      <div className="wrap">
        <Reveal>
          <h2 className="h2-display">¿Qué debería funcionar mejor en tu empresa?</h2>
          <p className="lead">
            No necesitas tener definida la solución. Empieza por contarnos el
            problema.
          </p>
          <div className="mt-8">
            <Button asChild>
              <Link href="/contacto">Cuéntanos el problema</Link>
            </Button>
          </div>
          <p className="mt-6 text-[15px] text-stone">
            O si lo prefieres,{" "}
            <a
              href="https://meetings-eu1.hubspot.com/alberto-polo"
              target="_blank"
              rel="noopener"
              className="font-semibold text-teal underline underline-offset-4"
            >
              reserva una reunión
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
