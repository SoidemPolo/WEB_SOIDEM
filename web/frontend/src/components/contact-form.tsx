"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TEMATICAS = [
  "Monitorización / MES-OEE",
  "Integración industrial",
  "Software a medida",
  "EBR / Pharma",
  "Automatización documental",
  "Otro",
] as const;

export type ContactPayload = {
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  empresa: string;
  tematica: string;
  mensaje: string;
};

type Status = "idle" | "sending" | "sent" | "error";

/**
 * El formulario no envía correos ni conoce credenciales: hace POST al backend,
 * que es quien habla con Azure. Sustituye al Formspree de la web actual, cuya
 * URL estaba mal formada y no llegaba a enviar nada.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError(null);

    const form = event.currentTarget;
    const data = Object.fromEntries(
      new FormData(form).entries(),
    ) as unknown as ContactPayload;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      setStatus("error");
      setError(
        "El formulario todavía no está conectado: falta configurar NEXT_PUBLIC_API_URL y levantar el backend.",
      );
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/contacto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error(`El servidor respondió ${response.status}`);

      setStatus("sent");
      form.reset();
    } catch (cause) {
      setStatus("error");
      setError(
        cause instanceof Error
          ? cause.message
          : "No hemos podido enviar el mensaje. Inténtalo de nuevo.",
      );
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-card border border-teal bg-teal/[0.06] p-8">
        <h3 className="text-[21px]">Mensaje enviado.</h3>
        <p className="mt-3 text-[16px] text-stone">
          Gracias por escribirnos. Te respondemos lo antes posible desde
          info@soidemdt.com.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nombre" name="nombre" required />
        <Field label="Apellidos" name="apellidos" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email" name="email" type="email" required />
        <Field label="Teléfono" name="telefono" type="tel" />
      </div>

      <Field label="Empresa" name="empresa" />

      <div className="flex flex-col gap-2">
        <label htmlFor="f-tema" className="text-[14.5px] font-semibold">
          Temática
        </label>
        <select id="f-tema" name="tematica" defaultValue={TEMATICAS[0]} className={inputClass}>
          {TEMATICAS.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="f-msg" className="text-[14.5px] font-semibold">
          Cuéntanos con qué necesitas ayuda
        </label>
        <textarea id="f-msg" name="mensaje" required rows={6} className={inputClass} />
      </div>

      {error && (
        <p role="alert" className="rounded-lg border border-danger/40 bg-danger/5 p-3 text-[14.5px] text-danger">
          {error}
        </p>
      )}

      <Button type="submit" disabled={status === "sending"} className="self-start">
        {status === "sending" ? "Enviando…" : "Enviar"}
      </Button>
    </form>
  );
}

const inputClass = cn(
  "rounded-lg border border-hair bg-white px-3.5 py-3 text-[16px] text-ink",
  "transition-colors placeholder:text-stone focus:border-teal",
);

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: keyof ContactPayload;
  type?: string;
  required?: boolean;
}) {
  const id = `f-${name}`;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[14.5px] font-semibold">
        {label}
        {required && <span className="text-teal"> *</span>}
      </label>
      <input id={id} name={name} type={type} required={required} className={inputClass} />
    </div>
  );
}
