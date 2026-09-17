# MEMORY.md

Instrucciones para trabajar en este repositorio.

## Contexto

Web corporativa de SOIDEM Data Technologies. La web que sirve producción hoy es **HTML estático** y vive en `legacy/`. El proyecto nuevo vive en `web/`, separado en:

- **`web/frontend/`** — la web pública. React, TypeScript, Tailwind v4, Next.js.
- **`web/backend/`** — la API. NestJS, React Email.
- **`web/database/`** — PostgreSQL y Prisma. **Vacía a propósito: hoy no hace falta.**

Cada carpeta tiene su propio `README.md` con el detalle. `README.md` en la raíz explica el conjunto.

## Reglas generales

- **No desarrollar en `legacy/`.** Es referencia y respaldo. Todo desarrollo va en `web/`. `legacy/` solo se toca para correcciones urgentes en producción, y se retira cuando el proyecto nuevo esté desplegado.
- **`legacy/` es el sitio que sirve producción ahora mismo.** No borrarlo.
- **Respetar la separación.** El frontend no envía correos ni conoce credenciales; el backend no renderiza páginas. Si algo necesita un secreto, va en el backend.
- No introducir librerías fuera de las listadas sin preguntar antes.

## Stack — obligatorio

### web/frontend

| Capa | Tecnología | Nota |
|---|---|---|
| Lenguaje | TypeScript | sin `any` salvo justificación |
| UI | React | |
| Estilos | Tailwind CSS v4 | sintaxis v4 (`@import "tailwindcss"`, `@theme`), no v3 |
| Framework | Next.js | por SEO; Vite solo si el SEO deja de importar |
| Secciones | 21st.dev | hero, features, CTA |
| Componentes | HeroUI | botones, inputs, modales, navbar |
| Animación | React Bits, Motion | |
| Gráficas | shadcn/ui | |

### web/backend

| Capa | Tecnología | Nota |
|---|---|---|
| Lenguaje | TypeScript | |
| Framework | NestJS | |
| Correo | React Email | plantillas, no HTML a mano |
| Base de datos | PostgreSQL + Prisma | en `web/database`. **Solo si hace falta**; hoy no hay nada que persistir |

## Secretos

Las credenciales de correo vienen de una **app registrada en Azure** y **aún no existen**.

- Van en el `.env` **del backend**, nunca en el repositorio, nunca en el frontend.
- Nada secreto con prefijo `NEXT_PUBLIC_`: eso acaba en el navegador.
- Mantener `.env.example` con las claves vacías; `.env` en `.gitignore`.
- Si falta una credencial: dejar el código leyendo de `process.env` y avisar. **Nunca inventar una clave ni dejar un valor de ejemplo funcionando.**

Variables previstas: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_CLIENT_SECRET`, `MAIL_FROM`, `MAIL_TO`.

## Al migrar

- Conservar textos, tono y orden de secciones del HTML actual. El contenido está validado; lo que cambia es la tecnología.
- Mantener las rutas públicas: `/`, `/contacto`, `/iso9001`, `/calidad-interna`, `/privacidad`.
- Mantener las anclas: `#que-resolvemos`, `#cambio`, `#caso`, `#productos`, `#tecnologias`, `#calidad`, `#hablemos`.
- Preservar `title`, `description` y `canonical` de cada página.
- El `action` del formulario en `contacto/index.html` está roto (URL de Formspree duplicada) y no funciona. Se reemplaza por el endpoint del backend; no replicarlo.

## Idioma

El sitio y su contenido están en **español**. Commits, comentarios y documentación, también.
