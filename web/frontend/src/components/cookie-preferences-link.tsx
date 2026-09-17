"use client";

import { abrirPreferenciasCookies } from "@/lib/consent";

/** El RGPD exige poder retirar el consentimiento igual de fácil que darlo. */
export function CookiePreferencesLink() {
  return (
    <button type="button" onClick={abrirPreferenciasCookies} className="text-left hover:text-teal">
      Preferencias de cookies
    </button>
  );
}
