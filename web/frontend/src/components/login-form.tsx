"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "error";

/**
 * Formulario de acceso.
 *
 * Aquí NO hay autenticación: el frontend solo recoge las credenciales y las
 * envía al backend, que todavía no existe. No se guarda ninguna contraseña ni
 * se simula una sesión válida, porque una sesión falsa en el cliente parece
 * seguridad y no lo es. Cuando el backend exista, debe responder con una cookie
 * httpOnly; el token nunca debe quedarse en localStorage.
 */
export function LoginForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [verPassword, setVerPassword] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError(null);

    const form = event.currentTarget;
    const datos = new FormData(form);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      setStatus("error");
      setError(
        "El acceso todavía no está conectado: falta configurar NEXT_PUBLIC_API_URL y levantar el backend.",
      );
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // La sesión viaja en una cookie httpOnly que pone el backend.
        credentials: "include",
        body: JSON.stringify({
          email: datos.get("email"),
          password: datos.get("password"),
        }),
      });

      if (response.status === 401) {
        setStatus("error");
        // Mismo mensaje para usuario inexistente y contraseña incorrecta: decir
        // cuál de los dos falla permite averiguar qué correos están registrados.
        setError("Las credenciales no son correctas.");
        return;
      }
      if (!response.ok) throw new Error(`El servidor respondió ${response.status}`);

      window.location.assign("/area-cliente");
    } catch (cause) {
      setStatus("error");
      setError(
        cause instanceof Error
          ? cause.message
          : "No hemos podido validar el acceso. Inténtalo de nuevo.",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="login-email" className="text-[14.5px] font-semibold">
          Email
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          required
          autoComplete="username"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="login-password" className="text-[14.5px] font-semibold">
          Contraseña
        </label>
        <div className="relative">
          <input
            id="login-password"
            name="password"
            type={verPassword ? "text" : "password"}
            required
            autoComplete="current-password"
            className={cn(inputClass, "w-full pr-12")}
          />
          <button
            type="button"
            onClick={() => setVerPassword((v) => !v)}
            aria-label={verPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            className="absolute inset-y-0 right-0 grid w-12 place-items-center text-stone hover:text-ink"
          >
            {verPassword ? (
              <EyeOff aria-hidden className="size-4.5" />
            ) : (
              <Eye aria-hidden className="size-4.5" />
            )}
          </button>
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-lg border border-danger/40 bg-danger/5 p-3 text-[14.5px] text-danger"
        >
          {error}
        </p>
      )}

      <Button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Entrando…" : "Entrar"}
      </Button>
    </form>
  );
}

const inputClass = cn(
  "rounded-lg border border-hair bg-white px-3.5 py-3 text-[16px] text-ink",
  "transition-colors focus:border-teal",
);
