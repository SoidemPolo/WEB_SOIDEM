# backend — API

Servicios de la web de SOIDEM Data Technologies. Su trabajo principal hoy: **recibir el formulario de contacto y enviar el correo**.

## Stack

| Capa | Tecnología |
|---|---|
| Lenguaje | **TypeScript** |
| Framework | **NestJS** |
| Correo | **React Email** |

## Por qué existe

Las credenciales de Azure no pueden vivir en el frontend: cualquier cosa que llegue al navegador es pública. El backend es el único que las conoce.

```
frontend → POST /contacto → validación → React Email → Azure → info@soidemdt.com
```

## Endpoints

| Método | Ruta | Qué hace |
|---|---|---|
| `POST` | `/contacto` | Valida el formulario y envía el correo |

Cuerpo esperado (los campos del formulario actual):

```ts
{
  nombre: string
  apellidos: string
  email: string
  telefono?: string
  empresa?: string
  tematica: string
  mensaje: string
}
```

Validar en servidor con DTOs y `class-validator`. **No fiarse de la validación del cliente.**

Configurar CORS para aceptar solo el dominio del frontend.

## Correo

Plantilla con **React Email**, no HTML a mano. Destinatario: `info@soidemdt.com`.

Sustituye a Formspree, cuyo `action` en el HTML actual está mal formado (URL duplicada) y por tanto no funciona. No replicar ese servicio.

## Variables de entorno — pendientes

Las credenciales **aún no existen**. Hay que registrar una app en Azure (Azure Portal → App registrations) y obtener client ID, tenant ID y client secret.

```env
# .env — NO commitear
AZURE_CLIENT_ID=
AZURE_TENANT_ID=
AZURE_CLIENT_SECRET=
MAIL_FROM=info@soidemdt.com
MAIL_TO=info@soidemdt.com
PORT=3001
CORS_ORIGIN=https://www.soidemdt.com
```

Reglas:

- `.env` va en `.gitignore`.
- Versionar un `.env.example` con las claves vacías.
- Si falta una credencial: dejar el código leyendo de `process.env` y avisar. **Nunca inventar una clave ni dejar un valor de ejemplo funcionando.**

## Base de datos — solo si hace falta

| Capa | Tecnología |
|---|---|
| Base de datos | **PostgreSQL** |
| ORM | **Prisma** |

**Hoy no hay nada que persistir**: el formulario envía un correo y termina. No montar base de datos hasta que aparezca algo que guardar (histórico de contactos, área de cliente, integraciones).

## Tareas

- [ ] Proyecto NestJS + TypeScript.
- [ ] Módulo de contacto: controlador, servicio, DTO validado.
- [ ] Plantilla React Email.
- [ ] Integración con Azure leyendo de `.env`.
- [ ] `.env.example` versionado y `.env` ignorado.
- [ ] CORS restringido al dominio del frontend.
- [ ] Rate limiting en `/contacto` para evitar abuso.
