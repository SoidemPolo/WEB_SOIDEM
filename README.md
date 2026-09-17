# WEB_SOIDEM

Sitio corporativo de **SOIDEM Data Technologies** (`https://www.soidemdt.com`).

El repositorio separa **la web antigua** de **el proyecto nuevo**:

```
WEB_SOIDEM/
├── legacy/            → web actual en HTML estático (la que sirve producción hoy)
│   ├── index.html
│   ├── contacto/
│   ├── iso9001/
│   ├── calidad-interna/
│   ├── privacidad/
│   └── images/
├── web/               → proyecto nuevo
│   ├── frontend/      → React + TypeScript + Tailwind v4 (Next.js)
│   ├── backend/       → NestJS + React Email
│   └── database/      → PostgreSQL + Prisma (vacía: solo si hace falta)
├── README.md
└── MEMORY.md          → reglas de trabajo
```

> ⚠️ **Revisar el despliegue.** El sitio se servía desde la raíz del repositorio y ahora vive en `legacy/`. No hay `CNAME` ni workflow de GitHub Actions en el repo, así que la configuración está fuera (ajustes de GitHub Pages o un host externo). Si se publicaba desde la raíz de `main`, **hay que apuntarlo a `legacy/` o la web dejará de cargar.**

---

## Las dos aplicaciones

| | `web/frontend` | `web/backend` |
|---|---|---|
| **Qué es** | La web pública | API de servicios |
| **Stack** | React, TypeScript, Tailwind v4, Next.js | NestJS, TypeScript |
| **Responsable de** | Páginas, secciones, animaciones, SEO | Formulario de contacto, envío de correo, secretos |
| **Se despliega** | Como sitio web | Como servicio |
| **Detalle** | [web/frontend/README.md](web/frontend/README.md) | [web/backend/README.md](web/backend/README.md) |

Y una tercera, **pendiente**: [web/database](web/database/README.md) — PostgreSQL + Prisma. Está vacía a propósito, porque hoy no hay nada que persistir. Ver su README para cuándo montarla.

### Por qué esta separación

El frontend no toca credenciales. Las claves de Azure viven **solo en el backend**: si el frontend las tuviera, viajarían al navegador. El frontend envía el formulario a la API del backend, y el backend es quien manda el correo.

```
navegador → frontend (Next.js) → POST /contacto → backend (NestJS) → React Email → Azure → info@soidemdt.com
```

---

## `legacy/` — lo que hay hoy

HTML plano, sin build, sin dependencias, con CSS y JS embebidos en cada archivo.

| Archivo | Líneas | Contenido |
|---|---|---|
| `index.html` | ~1.400 | Landing: hero, `#que-resolvemos`, `#cambio`, `#caso`, `#productos`, `#tecnologias`, `#calidad`, `#hablemos` |
| `contacto/index.html` | ~190 | Formulario de contacto (Formspree) |
| `iso9001/index.html` | ~170 | Política de calidad ISO 9001 |
| `calidad-interna/index.html` | ~160 | Calidad interna |
| `privacidad/index.html` | ~210 | Política de privacidad |
| `images/` | — | `ebr-panel.png`, `mesoee-panel.png` |

Limitaciones que motivan la migración:

- Estilos y scripts duplicados en los 5 archivos; cualquier cambio de diseño se toca 5 veces.
- Sin sistema de componentes ni tipado: no hay forma de reutilizar cabecera, pie ni tarjetas.
- El formulario depende de Formspree y **su `action` está mal formada** (`https://formspree.io/f/https://formspree.io/f/xjgnrzwl`): el envío no funciona hoy.
- Sin animaciones ni interacciones más allá de un par de scripts inline.

`legacy/` es **solo referencia y respaldo**. No se desarrolla ahí: se consulta para portar contenido y se retira cuando el proyecto nuevo esté desplegado.

---

## Credenciales — pendientes

El envío de correo necesita una **app registrada en Azure** que todavía no existe:

1. Azure Portal → App registrations → registrar la aplicación.
2. Obtener client ID, tenant ID y client secret.
3. Guardarlos en el **`.env` de `web/backend`**, nunca en el repositorio ni en el frontend.

Detalle de variables en [web/backend/README.md](web/backend/README.md).

---

## Despliegue en Vercel

El repositorio está conectado a Vercel, pero **el proyecto construye desde la
raíz**, que es donde antes estaba `index.html`. Tras mover el sitio a `legacy/`
esa construcción falla, y seguirá fallando hasta cambiar un ajuste.

### Lo que hay que hacer, una sola vez

En el panel de Vercel, en el proyecto conectado a este repositorio:

`Settings` → `Build and Deployment` → `Root Directory` → **`web/frontend`**

Con eso Vercel construye la aplicación Next.js y deja de mirar la raíz.

> No se puede resolver con un `vercel.json` en la raíz. Se intentó con
> `buildCommand` y `outputDirectory` apuntando a `web/frontend/.next` y el
> despliegue volvió a fallar: la [documentación de monorepos de Vercel](https://vercel.com/docs/monorepos)
> indica que la forma de desplegar una aplicación en una subcarpeta es el ajuste
> Root Directory, un proyecto por carpeta.

### Para el panel de SEO

Es una aplicación distinta, así que va en **otro proyecto de Vercel** apuntando
al mismo repositorio, con `Root Directory` = `seo`. Una misma cuenta puede tener
varios proyectos.

| Proyecto | Root Directory | Qué publica |
|---|---|---|
| web | `web/frontend` | El sitio público |
| seo | `seo` | El panel interno |

El panel **no tiene autenticación**: no debe publicarse en un dominio accesible
hasta que esté detrás del login del backend.

### Sobre el dominio

`www.soidemdt.com` lo sirve hoy **Wix**, no Vercel: comprobado por sus cabeceras
de respuesta. Este proyecto de Vercel publica en su propia URL `.vercel.app`, así
que arreglar el despliegue no cambia todavía lo que ve el público.

## Orden de trabajo

1. Comprobar y reapuntar el despliegue del sitio actual a `legacy/`.
2. `web/backend` — proyecto NestJS, endpoint de contacto, plantilla React Email, lectura de `.env`.
3. `web/frontend` — proyecto Next.js, layout compartido, portar las 5 páginas.
4. Conectar el formulario del frontend contra el endpoint del backend.
5. Desplegar y, solo entonces, retirar `legacy/`.
