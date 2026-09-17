# frontend — Web pública

La web de SOIDEM Data Technologies, migrada desde los HTML estáticos de `legacy/`.

## Stack instalado

| Capa | Tecnología | Versión |
|---|---|---|
| Lenguaje | TypeScript | 5.9 |
| UI | React | 19.3 |
| Estilos | Tailwind CSS v4 | 4.3 |
| Framework | Next.js (App Router) | 15.5 |
| Animación | Motion | 12.43 |
| Iconos | lucide-react | — |
| Utilidades | clsx, tailwind-merge, class-variance-authority, @radix-ui/react-slot | — |

> **Next.js sobre Vite.** La web es contenido público que debe indexarse (SEO, Open Graph, `canonical`). Vite generaría una SPA renderizada en cliente y obligaría a montar aparte el prerenderizado.

Tailwind **v4**: configuración en CSS (`@theme` en `src/app/globals.css`), sin `tailwind.config.js`.

## Arrancar

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de producción
npm run typecheck  # tsc --noEmit
```

## Colores

Los tokens de `src/app/globals.css` son **los mismos valores hexadecimales de la web actual**, no una aproximación:

| Token | Valor | Uso |
|---|---|---|
| `paper` | `#FAF9F6` | fondo |
| `alt` | `#F2F0EA` | fondo alterno |
| `ink` | `#191C1E` | texto |
| `stone` | `#6B7276` | texto secundario |
| `stone-2` | `#736E5F` | texto terciario |
| `hair` | `#E5E2DA` | bordes |
| `teal` | `#1E798D` | color de marca |
| `teal-dark` | `#155D6E` | hover del botón |
| `deep` | `#0C3540` | secciones oscuras |
| `line` | `#C9C5BB` | borde de botón secundario |

Estados del panel: `ok` `#4ADE80`, `warn` `#FBBF24`, `danger` `#F87171`, `info` `#37C0DB`.

Se usan como utilidades de Tailwind: `bg-paper`, `text-ink`, `border-hair`, `bg-teal`.

También hay utilidades propias que replican las clases del HTML actual: `wrap`, `kicker`, `lead`, `h2-display`, `py-section`.

## Estructura

```
src/
├── app/
│   ├── layout.tsx          → cabecera, pie, metadatos, JSON-LD de Organization
│   ├── globals.css         → tokens Tailwind v4 (@theme)
│   ├── page.tsx            → landing: compone las 10 secciones
│   ├── contacto/
│   ├── iso9001/
│   ├── calidad-interna/
│   └── privacidad/
├── components/
│   ├── site-header.tsx     → navegación sticky con menú móvil
│   ├── site-footer.tsx
│   ├── contact-form.tsx    → formulario tipado, hace POST al backend
│   ├── legal-page.tsx      → envoltorio de las páginas legales
│   ├── sections/           → las 10 secciones de la landing
│   └── ui/                 → button, arrow-link, reveal
└── lib/utils.ts            → cn()
```

## Rutas

Se mantienen las URL y las anclas de la web actual, para no romper enlaces ni posicionamiento.

| Ruta | Origen |
|---|---|
| `/` | `legacy/index.html` |
| `/contacto` | `legacy/contacto/index.html` |
| `/iso9001` | `legacy/iso9001/index.html` |
| `/calidad-interna` | `legacy/calidad-interna/index.html` |
| `/privacidad` | `legacy/privacidad/index.html` |
| `/login` | nueva: acceso al área de clientes (`noindex`) |

El desplegable de **Productos** de la cabecera enlaza a `/#producto-<id>`. La
sección de productos lee ese hash y abre el panel correspondiente, así que el
menú lleva al producto, no solo a la sección. La lista vive en
[`src/lib/products.ts`](src/lib/products.ts), compartida por cabecera y sección
para que no se desincronicen.

Anclas de la landing: `#que-resolvemos`, `#cambio`, `#caso`, `#productos`, `#tecnologias`, `#calidad`, `#hablemos`.

## Cookies y analítica

El aviso de cookies está en [`src/components/cookie-consent.tsx`](src/components/cookie-consent.tsx)
y la lógica en [`src/lib/consent.ts`](src/lib/consent.ts).

Cuatro categorías: **esenciales** (siempre activas, no desactivables),
**analítica**, **ubicación aproximada** y **marketing**. Las tres últimas
arrancan **desactivadas** y solo se activan con un sí explícito.

- Rechazar cuesta lo mismo que aceptar: los dos son un botón del primer nivel.
- La decisión se guarda en `localStorage` y en la cookie `soidem_consent`
  (`v1.a0.u0.m0`), para que el servidor pueda comprobarla sin ejecutar JS.
- Caduca a los 6 meses y se vuelve a preguntar. Subir `CONSENT_VERSION` fuerza
  volver a preguntar a todo el mundo.
- Se puede cambiar desde «Preferencias de cookies», en el pie.

La analítica ([`src/components/analytics.tsx`](src/components/analytics.tsx))
**no carga nada** hasta que se acepta la categoría «analítica», y tampoco si
falta `NEXT_PUBLIC_GA_ID`. Para cambiar de proveedor (Plausible, Matomo, Umami)
basta sustituir los dos `<Script>`: la condición del consentimiento ya está
resuelta.

> Las cookies no esenciales **no vienen premarcadas**, y eso es deliberado: el
> RGPD las exige opt-in y la web opera desde Barcelona. Premarcarlas sería lo
> que multa la AEPD.

## Acceso de clientes

`/login` tiene el formulario, pero **no hay autenticación**: el frontend recoge
las credenciales y las envía a `POST /auth/login` del backend, que todavía no
existe. No se simula ninguna sesión, porque una sesión falsa en el cliente
parece seguridad sin serlo.

Cuando se implemente el backend: la sesión debe viajar en una **cookie
httpOnly** que ponga el servidor, nunca un token en `localStorage`. El
formulario ya envía con `credentials: "include"`.

## Formulario de contacto

El frontend **no envía correos ni conoce credenciales**. `contact-form.tsx` valida, hace `POST` a `${NEXT_PUBLIC_API_URL}/contacto` y muestra el resultado.

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_GA_ID=          # vacío = sin analítica
```

Sin esa variable el formulario avisa de que todavía no está conectado, en lugar de fallar en silencio. **Nunca poner aquí claves de Azure**: todo lo que lleva el prefijo `NEXT_PUBLIC_` acaba en el navegador.

## 21st.dev y shadcn/ui

`components.json` está configurado, así que los componentes de 21st.dev y shadcn se instalan directamente en `src/components/ui`:

```bash
npx shadcn@latest add "https://21st.dev/r/<autor>/<componente>"
npx shadcn@latest add chart    # gráficas
```

Las dependencias que esos componentes esperan (`cn()`, cva, tailwind-merge, radix slot, lucide) ya están puestas. `button.tsx` sigue ese mismo patrón, con las variantes de la web actual (`default`, `ghost`, `white`).

## Pendiente

- [ ] **HeroUI** no está instalado. Los componentes propios siguen el patrón de shadcn/21st.dev; meter HeroUI ahora significaría dos sistemas de componentes solapados. Decidir cuál manda antes de añadirlo.
- [ ] Conectar contra el backend real cuando exista.
- [ ] Sustituir la imagen de Open Graph: hoy se usa el certificado ISO como provisional. Recomendado 1200x630 con logo y claim.
- [ ] `favicon.ico` en `public/`.
- [ ] Los logos de clientes y el certificado se sirven desde `static.wixstatic.com`. Conviene traerlos al repositorio.
- [ ] Implementar `POST /auth/login` y el área de cliente en el backend. Hoy
      `/login` avisa de que no está conectado.
- [ ] Revisar la política de privacidad para que mencione las cuatro categorías
      de cookies y el plazo de 6 meses.
