# frontend — Web pública

La web de SOIDEM Data Technologies. Migración de los HTML estáticos de la raíz del repositorio.

## Stack

| Capa | Tecnología |
|---|---|
| Lenguaje | **TypeScript** |
| UI | **React** |
| Estilos | **Tailwind CSS v4** |
| Framework | **Next.js** |

> **Next.js sobre Vite.** La web es contenido público que debe indexarse (SEO, Open Graph, el `canonical` ya presente en el HTML actual). Vite genera una SPA que se renderiza en el cliente y obligaría a montar aparte el prerenderizado. Si en algún momento el SEO deja de importar, Vite sería más simple.

Tailwind **v4**: sintaxis nueva (`@import "tailwindcss"`, `@theme` en CSS). No usar `tailwind.config.js` al estilo v3.

## Librerías

| Librería | Uso |
|---|---|
| **21st.dev** | Secciones prefabricadas: hero, features, CTA |
| **HeroUI** | Componentes concretos: botones, inputs, modales, navbar |
| **React Bits** + **Motion** | Animaciones, revelados al hacer scroll, transiciones |
| **shadcn/ui** | Gráficas y visualización de datos |

No añadir librerías fuera de esta lista sin consultar.

## Rutas

Se mantienen las URL actuales, para no romper enlaces ni posicionamiento:

| Ruta | Origen |
|---|---|
| `/` | `index.html` |
| `/contacto` | `contacto/index.html` |
| `/iso9001` | `iso9001/index.html` |
| `/calidad-interna` | `calidad-interna/index.html` |
| `/privacidad` | `privacidad/index.html` |

Anclas de la landing que deben seguir funcionando: `#que-resolvemos`, `#cambio`, `#caso`, `#productos`, `#tecnologias`, `#calidad`, `#hablemos`.

## Formulario de contacto

El frontend **no envía correos ni conoce credenciales**. Solo:

1. Valida los campos en cliente (tipado).
2. Hace `POST` al endpoint del backend.
3. Muestra el resultado.

Campos actuales: `nombre`, `apellidos`, `email`, `telefono`, `empresa`, `tematica` (select), `mensaje`.

Única variable de entorno del frontend, y no es secreta:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Nunca poner aquí claves de Azure**: todo lo que lleve el prefijo `NEXT_PUBLIC_` acaba en el navegador.

## Tareas de migración

- [ ] Proyecto Next.js + TypeScript + Tailwind v4.
- [ ] Layout compartido: cabecera y pie, hoy duplicados en los 5 HTML.
- [ ] CSS embebido → tokens de tema y utilidades Tailwind.
- [ ] Las 7 secciones de la landing → componentes (21st.dev / HeroUI donde encajen).
- [ ] Scripts inline → Motion / React Bits.
- [ ] Las 4 páginas secundarias.
- [ ] Formulario tipado apuntando al backend.
- [ ] SEO por ruta: `title`, `description`, `canonical`, Open Graph.
- [ ] Imágenes de `images/` optimizadas.

## Contenido

Los textos del HTML actual **se conservan**: están validados. Lo que cambia es la tecnología, no el mensaje ni el orden de las secciones.
