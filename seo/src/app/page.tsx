import { redirect } from "next/navigation";

/** La raíz no muestra nada propia: entra por la vista de TI. */
export default function Inicio() {
  redirect("/ti");
}
