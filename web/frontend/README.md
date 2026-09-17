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

Anclas de la landing: `#que-resolvemos`, `#cambio`, `#caso`, `#productos`, `#tecnologias`, `#calidad`, `#hablemos`.

## Formulario de contacto

El frontend **no envía correos ni conoce credenciales**. `contact-form.tsx` valida, hace `POST` a `${NEXT_PUBLIC_API_URL}/contacto` y muestra el resultado.

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
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
- [ ] La pieza visual del hero y el panel Antes/Después portan el contenido y la idea del original, pero no sus animaciones más elaboradas (líneas de datos animadas, divisor arrastrable). Recuperarlas con Motion o React Bits si se quieren.
