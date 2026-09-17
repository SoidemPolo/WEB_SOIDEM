import type { Metadata } from "next";
import Link from "next/link";

import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = {
  title: "Acceso — SOIDEM Data Technologies",
  description: "Acceso al área privada de clientes de SOIDEM Data Technologies.",
  alternates: { canonical: "/login" },
  // Una pantalla de acceso no aporta nada en buscadores y ensucia el rastreo.
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <section className="py-section">
      <div className="wrap max-w-[480px]">
        <p className="kicker">Área de clientes</p>
        <h1 className="text-[clamp(28px,3.4vw,40px)]">Acceso</h1>
        <p className="mt-4 text-[16.5px] text-stone">
          Entra con las credenciales que te hemos facilitado. Si todavía no tienes
          acceso,{" "}
          <Link
            href="/contacto"
            className="font-semibold text-teal underline underline-offset-4"
          >
            escríbenos
          </Link>
          .
        </p>

        <div className="mt-9">
          <LoginForm />
        </div>

        <p className="mt-8 border-t border-hair pt-6 text-[13.5px] text-stone">
          El acceso es para clientes con contrato. Al entrar aceptas la{" "}
          <Link href="/privacidad" className="font-semibold text-teal underline underline-offset-4">
            política de privacidad
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
