import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Combina clases de Tailwind resolviendo conflictos. Lo usan los componentes de shadcn y 21st.dev. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
