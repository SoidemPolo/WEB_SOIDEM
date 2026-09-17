# seo — Panel de SEO

Aplicación interna que vigila el estado técnico de SEO de todas las propiedades
web de SOIDEM: el sitio corporativo y los subdominios de producto, que también
son servicios nuestros.

Es una aplicación aparte de `web/frontend` a propósito: es una herramienta
interna, no parte de la web pública, y no debe compartir ni despliegue ni
indexación con ella.

## Arrancar

Desde la raíz del repositorio:

```bash
npm run seo      # http://localhost:3002
npm run web      # http://localhost:3000
```

## Dos vistas

El SEO lo comparten dos equipos y no miran lo mismo, así que cada uno tiene la
suya. Cada comprobación está etiquetada por área; las que dependen de los dos
salen en las dos.

| Ruta | Para quién | Qué responde |
|---|---|---|
| `/ti` | Sistemas y desarrollo | ¿Puede Google entrar, rastrear e indexar? |
| `/mkt` | Marketing | ¿Qué enseña Google cuando ya ha entrado? |

`/ti` mira disponibilidad, tiempo de respuesta, indexabilidad, robots.txt,
sitemap, canonical, idioma y viewport: cosas que se arreglan tocando servidor o
código. La raíz entra por `/ti`.

`/mkt` lleva el embudo comercial completo, el reparto de los clics por canal y,
al final, lo que sí se puede medir hoy descargando la página (título,
descripción, Open Graph, datos estructurados).

### El embudo

De aparecer en Google a firmar. Cada escalón declara de qué fuente sale su
número y qué palanca se toca cuando va flojo.

| Escalón | Fuente |
|---|---|
| Impresiones | Search Console |
| Clics | Search Console |
| Sesiones | Google Analytics 4 |
| Interés real | Google Analytics 4 |
| Contactos | Backend de SOIDEM |
| Oportunidades | HubSpot |
| Clientes | HubSpot |

Canales: orgánico, directo, referido, redes y subdominios de producto.

**Ninguna de esas cifras existe todavía.** El panel comprueba qué fuentes están
configuradas —por variable de entorno, ver `.env.example`— y deja vacío lo que
no puede calcular, diciendo qué falta. No se rellenan con datos de ejemplo:
un número inventado en un panel es indistinguible de uno real, y sobre él se
decide dónde gastar.

## Qué mide, y qué no

**Lo que mide es real.** Descarga cada sitio y comprueba lo que trae. No hay ni
un dato inventado ni de ejemplo:

| Comprobación | Qué mira |
|---|---|
| Respuesta HTTP | que devuelva 200 |
| Tiempo de respuesta | milisegundos hasta el primer byte, sin caché |
| Título | que exista y quepa en 30–60 caracteres |
| Meta description | que exista y quepa en 70–160 |
| Canonical | que esté declarado |
| H1 | que haya exactamente uno |
| Open Graph | título e imagen, lo que se ve al compartir el enlace |
| Datos estructurados | bloques JSON-LD |
| robots.txt y sitemap.xml | que existan; del sitemap, cuántas URL trae |
| Indexable | que no haya un `noindex` accidental |
| Idioma y viewport | declarados |
| Imágenes con alt | cuántas lo tienen |

**Lo que no mide** son los KPI de tráfico: clics, impresiones, posición media,
consultas, sesiones y Core Web Vitals de campo. Eso vive en Search Console y
Google Analytics y necesita credenciales, que van en el backend y no aquí. El
panel lo dice en pantalla en lugar de rellenarlo con cifras de ejemplo, porque
una cifra de ejemplo en un panel es indistinguible de una real.

## Por qué no hay gráficas

Con cuatro propiedades y sin serie temporal, una gráfica no diría nada que no
diga el número. Cuando se conecte Search Console y haya histórico, la evolución
de clics y posición sí pedirá una.

## Decisiones

- **Las descargas van sin caché.** Con la caché de `fetch`, el tiempo de
  respuesta medido era el de la caché (12 ms), no el del sitio. Quien evita
  castigar a los sitios auditados es el `revalidate` de la página, que rehace
  todo cada 30 minutos.
- **Los colores de estado están reservados.** Verde, ámbar y rojo solo dicen en
  qué estado está una comprobación; nunca identifican una propiedad. Y siempre
  van con icono y texto, nunca solo con color.
- **El turquesa del logotipo (`#00E8D5`) solo se usa sobre fondo oscuro**, que es
  donde contrasta: la cabecera y la vista activa. Sobre blanco no llega al
  contraste necesario para texto, así que ahí manda el teal. El valor está
  muestreado del PNG oficial, no aproximado.

## Pendiente

- [ ] **No tiene autenticación.** Hoy cualquiera con la URL lo ve. Lleva
      `noindex`, pero eso no es protección. Debe ir detrás del `/login` del
      backend antes de publicarse.
- [ ] Conectar Search Console y GA4 a través del backend.
- [ ] Guardar histórico para poder ver evolución, no solo la foto de hoy.
