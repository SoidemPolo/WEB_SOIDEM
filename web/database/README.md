# database — Pendiente, solo si hace falta

**Esta carpeta está vacía a propósito. Hoy el proyecto no necesita base de datos.**

El formulario de contacto recibe los datos, envía un correo y termina. No hay nada que guardar.

## Stack previsto

| Capa | Tecnología |
|---|---|
| Base de datos | **PostgreSQL** |
| ORM | **Prisma** |

## Cuándo montarla

Cuando aparezca algo que persistir de verdad:

- Histórico de contactos recibidos.
- Área de cliente con usuarios y sesiones.
- Integraciones que guarden estado.
- Contenido editable sin tocar código.

Hasta entonces, **no montarla**: una base de datos vacía es infraestructura que mantener, respaldar y asegurar sin ganar nada.

## Qué irá aquí

- `schema.prisma` — el esquema.
- `migrations/` — migraciones generadas por Prisma.
- `seed.ts` — datos iniciales, si aplica.

El cliente de Prisma lo consume **`web/backend`**. El frontend nunca habla con la base de datos directamente.

```
frontend → backend → Prisma → PostgreSQL
```

## Variables de entorno

Cuando exista, la cadena de conexión va en el `.env` **del backend**, junto al resto de secretos:

```env
DATABASE_URL=postgresql://usuario:password@host:5432/soidem
```

Nunca en el repositorio ni en el frontend.
