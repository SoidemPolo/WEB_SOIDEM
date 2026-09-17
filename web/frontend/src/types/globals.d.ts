/**
 * Imports de hojas de estilo por efecto secundario (`import "./globals.css"`).
 *
 * Next.js los procesa en el build y `next-env.d.ts` ya los declara, pero el
 * servicio de TypeScript del editor no siempre lo carga y marca el import como
 * error. Declararlo aquí evita ese aviso y, con él, que alguien lo "arregle"
 * con un @ts-expect-error innecesario que hace fallar a `tsc` y al build.
 */
declare module "*.css";
