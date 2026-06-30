# Migracion Arquitectonica

## Objetivo

Registrar la migracion arquitectonica del proyecto Alerta Urbana desde una
estructura monolitica en la raiz hacia una estructura preparada para separar
frontend y backend en fases posteriores.

## Alcance

Esta documentacion cubre cambios de estructura, validaciones, problemas
encontrados y estado de la migracion. Las mejoras arquitectonicas quedan fuera
del alcance hasta completar la separacion fisica y funcional.

## Reglas de Migracion

- Mantener el proyecto funcionando al final de cada fase.
- No cambiar comportamiento de negocio durante fases de movimiento.
- No separar frontend y backend hasta que exista una fase aprobada para ello.
- No modificar autenticacion, consultas SQL, Swagger ni conexion PostgreSQL sin
  aprobacion explicita.
- Registrar cambios, validaciones y problemas en este documento.

## Estado Inicial del Proyecto

Antes de esta fase, el proyecto Next.js completo vivia en la raiz del
repositorio. La aplicacion incluia paginas frontend, API Routes, acceso a
PostgreSQL/Neon, Swagger, autenticacion y pruebas dentro de la misma estructura.

## Arquitectura Objetivo

Estructura objetivo general:

```text
Alerta-Urbana/
|-- frontend/
|-- backend/
`-- docs/
```

En esta fase, solamente se traslado el monolito Next.js completo a
`frontend/`. La carpeta `backend/` permanece vacia.

## Fases de Migracion

### Fase 1 - Preparacion de estructura contenedora

Objetivo: crear las carpetas base `frontend/`, `backend/` y `docs/`, y preparar
este documento de migracion.

Resultado: completada.

### Fase 2 - Movimiento monolitico de Next.js a frontend

Objetivo: mover el proyecto Next.js completo dentro de `frontend/` sin separar
frontend y backend, manteniendo estructura interna, imports, rutas, alias,
fetch, configuraciones, variables de entorno, Swagger, autenticacion, conexion
PostgreSQL y tests.

Resultado: completada.

### Fase 3 - Inicializacion de backend independiente minimo

Objetivo: crear un proyecto backend independiente dentro de `backend/`, todavia
vacio funcionalmente y sin migrar APIs existentes desde `frontend/`.

Resultado: completada.

### Fase 4 - Estructura minima de rutas y controladores del backend

Objetivo: separar la ruta `GET /` de `server.js` para preparar la futura
migracion de endpoints sin agregar servicios, repositorios, middleware,
database, Swagger, auth ni validaciones.

Resultado: completada.

### Fase 5 - Migracion paralela de POST /api/login a Express

Objetivo: crear una implementacion equivalente de `POST /api/login` dentro del
backend Express, manteniendo intacto el endpoint existente de Next.js y sin
modificar el frontend.

Resultado: completada.

## Registro de Cambios

### Fase 2 - Movimiento monolitico de Next.js a frontend

Archivos y carpetas movidos a `frontend/`:

- `.env`
- `.gitignore`
- `.next/`
- `coverage/`
- `node_modules/`
- `public/`
- `src/`
- `babel.config.js`
- `eslint.config.mjs`
- `jest.config.js`
- `jest.setup.js`
- `jsconfig.json`
- `next.config.mjs`
- `package-lock.json`
- `package.json`
- `postcss.config.mjs`
- `README.md`

Se mantuvieron en la raiz:

- `.git/`
- `.agents/`
- `backend/`
- `docs/`
- `skills-lock.json`

No se separaron `src/app/api`, `src/lib/db.js`, `src/lib/swagger.js`,
variables de entorno, Swagger, autenticacion ni tests.

### Fase 3 - Inicializacion de backend independiente minimo

Archivos y carpetas creados en `backend/`:

- `.env.example`
- `.gitignore`
- `README.md`
- `package.json`
- `package-lock.json`
- `src/server.js`
- `node_modules/`

Dependencia instalada:

- `express`

El servidor creado expone solamente:

```http
GET /
```

Respuesta:

```json
{
  "status": "Backend running"
}
```

No se crearon controllers, routes, services, middleware, database, Swagger, JWT
ni bcrypt. No se modifico ningun archivo dentro de `frontend/`.

### Fase 4 - Estructura minima de rutas y controladores del backend

Archivos y carpetas creados o modificados en `backend/`:

- `src/config/`
- `src/routes/`
- `src/controllers/`
- `src/controllers/healthController.js`
- `src/routes/healthRoutes.js`
- `src/server.js`

Cambios realizados:

- La respuesta de `GET /` se movio a `src/controllers/healthController.js`.
- La definicion de la ruta `GET /` se movio a `src/routes/healthRoutes.js`.
- `src/server.js` conserva la configuracion basica de Express, el puerto y el
  registro de rutas.

No se migraron endpoints de `frontend/`, no se conecto PostgreSQL, no se
instalaron dependencias nuevas y no se modifico ningun archivo dentro de
`frontend/`.

### Fase 5 - Migracion paralela de POST /api/login a Express

Archivos creados o modificados en `backend/`:

- `package.json`
- `package-lock.json`
- `.env.example`
- `src/config/db.js`
- `src/controllers/loginController.js`
- `src/routes/loginRoutes.js`
- `src/server.js`

Dependencias instaladas en `backend/`:

- `pg`
- `bcrypt`
- `jsonwebtoken`

Cambios realizados:

- Se creo una configuracion propia de conexion PostgreSQL en
  `backend/src/config/db.js` usando `process.env.DATABASE_URL`.
- Se creo el controlador `login` en `backend/src/controllers/loginController.js`.
- Se creo la ruta `POST /api/login` mediante
  `backend/src/routes/loginRoutes.js`.
- Se registro `express.json()` en `server.js` para recibir body JSON.
- Se registro el router de login bajo `/api`.
- Se agrego `JWT_SECRET=secreto_super_seguro` a `.env.example`.
- El JWT usa `process.env.JWT_SECRET` en lugar de un secreto hardcodeado.

No se modifico `frontend/`. El endpoint original de Next.js sigue existiendo.

### Fase 6 - Preparar frontend para consumir backend externo de login

Archivos modificados:

- `frontend/.env`
- `frontend/src/app/login/page.js`
- `backend/src/server.js`

Cambios realizados:

- Se agregó la variable de entorno `NEXT_PUBLIC_API_URL=http://localhost:4000` a `frontend/.env`.
- Se actualizó `frontend/src/app/login/page.js` para que el login use `${process.env.NEXT_PUBLIC_API_URL}/api/login`.
- Se añadió soporte CORS mínimo en `backend/src/server.js` para aceptar peticiones desde `http://localhost:3000`.
- Se mantuvo el endpoint Next.js `frontend/src/app/api/login/route.js` como respaldo.

No se modificaron otros endpoints de autenticación, registro, usuarios, Swagger ni huecos.

Resultado: completada.

### Fase 7 - Migracion paralela de GET /api/users a Express

Objetivo: crear una implementacion equivalente de `GET /api/users` dentro del
backend Express, manteniendo intacto el endpoint existente de Next.js y sin
modificar el frontend.

Resultado: completada.

Archivos creados o modificados en `backend/`:

- `src/controllers/usersController.js`
- `src/routes/usersRoutes.js`
- `src/server.js`

Cambios realizados:

- Se creo el controlador `getUsers` en `backend/src/controllers/usersController.js`
  que ejecuta la consulta `SELECT * FROM users ORDER BY created_at DESC`.
- Se creo la ruta `GET /api/users` mediante `backend/src/routes/usersRoutes.js`.
- Se registro el router de users bajo `/api` en `backend/src/server.js`.
- No se modifico `frontend/src/app/api/users/route.js`. El endpoint original de
  Next.js sigue existiendo.

### Fase 8 - Migracion paralela de DELETE /api/users/:id a Express

Objetivo: crear una implementacion equivalente de `DELETE /api/users/:id`
dentro del backend Express, manteniendo intacto el endpoint existente de
Next.js y sin modificar el frontend.

Resultado: completada.

Archivos creados o modificados en `backend/`:

- `src/controllers/userByIdController.js`
- `src/routes/userByIdRoutes.js`
- `src/server.js`

Cambios realizados:

- Se creo el controlador `deleteUserById` en
  `backend/src/controllers/userByIdController.js` que ejecuta la consulta
  `DELETE FROM users WHERE id = $1 RETURNING id`.
- Se creo la ruta `DELETE /api/users/:id` mediante
  `backend/src/routes/userByIdRoutes.js`.
- Se registro el router de borrado bajo `/api` en `backend/src/server.js`.
- No se modifico `frontend/src/app/api/users/[id]/route.js`. El endpoint
  original de Next.js sigue existiendo.

### Fase 9 - Migracion paralela de GET /api/swagger a Express

Objetivo: crear una implementacion equivalente de `GET /api/swagger` dentro del
backend Express, manteniendo intacto el endpoint existente de Next.js y sin
modificar el frontend.

Resultado: completada.

Archivos creados o modificados en `backend/`:

- `src/controllers/swaggerController.js`
- `src/routes/swaggerRoutes.js`
- `src/server.js`

Cambios realizados:

- Se creo el controlador `getSwagger` en
  `backend/src/controllers/swaggerController.js` que devuelve la misma
  especificacion Swagger generada por `frontend/src/lib/swagger.js`.
- Se creo la ruta `GET /api/swagger` mediante `backend/src/routes/swaggerRoutes.js`.
- Se registro el router de Swagger bajo `/api` en `backend/src/server.js`.
- No se modifico `frontend/src/app/api/swagger/route.js`. El endpoint original de
  Next.js sigue existiendo.

## Problemas Encontrados

### Fase 2

- `npm run build` fallo inicialmente porque PowerShell bloqueo `npm.ps1` por la
  politica local de ejecucion de scripts.
- La compilacion fallo en el primer intento con `npm.cmd run build` porque
  Next.js necesitaba descargar las fuentes `Geist` y `Geist Mono` desde Google
  Fonts, y el entorno requeria permiso de red.
- Durante la validacion de `npm run dev` aparecieron advertencias de PowerShell
  relacionadas con `PSScheduledJob`, pero el servidor de desarrollo respondio
  correctamente.
- Durante la validacion de desarrollo se observo un artefacto generado
  `.next/dev` en la raiz del repositorio. No se elimino para respetar la regla de
  no eliminar archivos durante esta fase.

### Fase 3

- `npm install` fallo inicialmente por falta de acceso al registry/cache de npm
  dentro del entorno restringido.
- Durante la validacion de `npm run dev` aparecieron advertencias de PowerShell
  relacionadas con `PSScheduledJob`, pero el servidor respondio correctamente.

### Fase 4

- Durante la validacion de `npm run dev` aparecieron advertencias de PowerShell
  relacionadas con `PSScheduledJob`, pero el servidor respondio correctamente.

### Fase 5

- La instalacion inicial de dependencias hizo timeout dentro del entorno
  restringido.
- En la primera validacion manual, `DATABASE_URL` fue inyectada con comillas
  simples incluidas desde el archivo `.env`, lo que produjo respuesta `500`.
  Al normalizar la variable para la prueba, el endpoint respondio correctamente.

## Soluciones Aplicadas

### Fase 2

- Se uso `npm.cmd` en lugar de `npm` para evitar el bloqueo de `npm.ps1` sin
  cambiar configuraciones del sistema ni del proyecto.
- Se repitio la compilacion con permiso de red para permitir la descarga de
  fuentes requerida por `next/font`.
- No se hicieron cambios de codigo para corregir estos problemas porque no
  fueron derivados del cambio de ubicacion del proyecto.
- El artefacto `.next/dev` en la raiz queda pendiente de decision explicita
  antes de cualquier limpieza.

### Fase 3

- Se repitio `npm install` con permiso externo para descargar `express` y generar
  `package-lock.json`.
- No se aplicaron cambios al frontend.

### Fase 4

- No se requirieron dependencias nuevas ni cambios de configuracion.
- No se aplicaron cambios al frontend.

### Fase 5

- Se repitio la instalacion de `pg`, `bcrypt` y `jsonwebtoken` con permiso
  externo.
- La validacion manual inyecto `DATABASE_URL` y `JWT_SECRET` como variables de
  entorno de la sesion, sin crear ni modificar archivos `.env` reales.
- No se aplicaron cambios al frontend.

## Riesgos Identificados

- El proyecto sigue siendo un monolito Next.js dentro de `frontend/`; todavia no
  existe separacion real de backend.
- `backend/` permanece vacio por diseno en esta fase.
- La aplicacion sigue dependiendo de API Routes relativas `/api/...`, lo cual
  debera tratarse en una fase futura cuando se separe el backend.
- La ruta `/api/huecos` sigue siendo referenciada desde `admin/page.js`, pero no
  existe una API Route correspondiente en el estado actual.
- El backend Express existe como proyecto independiente, pero todavia no contiene
  ninguna API real de la aplicacion.

## Decisiones Tecnicas

- Se decidio mover el proyecto completo como unidad monolitica a `frontend/`
  para conservar estabilidad antes de separar responsabilidades.
- Se movio `node_modules/` junto con el proyecto para evitar una reinstalacion
  innecesaria en esta fase.
- Se mantuvo `backend/` vacio para no introducir un backend funcional antes de
  tiempo.
- Se inicializo `backend/` con Express y un unico endpoint de salud `GET /` para
  validar la infraestructura sin migrar funcionalidad.
- Se uso `node --watch` para el script de desarrollo y evitar dependencias de
  desarrollo adicionales.
- Se separo `GET /` en ruta y controlador para evitar que futuros endpoints
  queden definidos directamente en `server.js`.
- Se migro `POST /api/login` en paralelo, manteniendo el endpoint de Next.js
  como fuente funcional actual.
- La unica mejora permitida fue reemplazar el secreto JWT hardcodeado por
  `process.env.JWT_SECRET`, conservando el valor de ejemplo
  `secreto_super_seguro`.

## Validaciones por Fase

### Fase 2

- `npm.cmd run build` ejecutado desde `frontend/`.
  - Resultado: exitoso despues de permitir acceso de red para fuentes.
- `npm.cmd run dev -- --hostname 127.0.0.1 --port 3000` ejecutado temporalmente
  desde `frontend/`.
  - Resultado: el servidor respondio HTTP 200 en `http://127.0.0.1:3000`.
- `npm install` no fue necesario porque `node_modules/` fue movido junto con el
  proyecto.

### Fase 3

- `npm.cmd install` ejecutado desde `backend/`.
  - Resultado: exitoso despues de permitir acceso externo al registry de npm.
- `npm.cmd run dev` ejecutado temporalmente desde `backend/`.
  - Resultado: el servidor respondio HTTP 200 en `http://127.0.0.1:4000/` con
    `{"status":"Backend running"}`.
- Se verifico que no se modificaran archivos dentro de `frontend/` durante esta
  fase.

### Fase 4

- `npm.cmd run dev` ejecutado temporalmente desde `backend/`.
  - Resultado: el servidor respondio HTTP 200 en `http://127.0.0.1:4000/` con
    `{"status":"Backend running"}`.
- Se verifico que `GET /` conserve exactamente la misma respuesta.
- Se verifico que no se modificaran archivos dentro de `frontend/` durante esta
  fase.

### Fase 5

- `npm.cmd install pg bcrypt jsonwebtoken` ejecutado desde `backend/`.
  - Resultado: exitoso despues de permitir acceso externo.
- `npm.cmd run dev` ejecutado temporalmente desde `backend/` con `DATABASE_URL`
  y `JWT_SECRET` inyectadas en la sesion.
  - Resultado: `GET /` respondio HTTP 200 con `{"status":"Backend running"}`.
  - Resultado: `POST /api/login` con usuario inexistente respondio HTTP 400 con
    `{"error":"Usuario no encontrado"}`.
- Se verifico que el frontend no fuera modificado durante esta fase.

Equivalencia esperada entre endpoints:

| Criterio | Next.js actual | Express backend |
|---|---|---|
| Ruta | `POST /api/login` | `POST /api/login` |
| Body | `email`, `password` | `email`, `password` |
| SQL | `SELECT * FROM users WHERE email = $1` | `SELECT * FROM users WHERE email = $1` |
| Parametros SQL | `[email]` | `[email]` |
| Password | `bcrypt.compare(password, user.password)` | `bcrypt.compare(password, user.password)` |
| JWT payload | `{ id: user.id, role: user.role }` | `{ id: user.id, role: user.role }` |
| JWT secreto | `secreto_super_seguro` hardcodeado | `process.env.JWT_SECRET` |
| JWT expiracion | `1h` | `1h` |
| Usuario no encontrado | `400 {"error":"Usuario no encontrado"}` | `400 {"error":"Usuario no encontrado"}` |
| Password invalido | `400 {"error":"Contraseña incorrecta"}` | `400 {"error":"Contraseña incorrecta"}` |
| Error interno | `500 {"error":"Error del servidor"}` | `500 {"error":"Error del servidor"}` |
| Login exitoso | `message`, `token`, `user.id`, `user.name`, `user.role` | `message`, `token`, `user.id`, `user.name`, `user.role` |
| Cookies | No crea cookies | No crea cookies |

## Estado Actual de la Migracion

El proyecto Next.js completo vive dentro de `frontend/` y compila desde esa
ubicacion. La carpeta `backend/` contiene un proyecto Express minimo e
independiente, con estructura inicial de `config/`, `routes/` y `controllers/`,
con `POST /api/login` migrado en paralelo. El frontend sigue usando el endpoint
Next.js existente porque no se modifico `fetch`.

## Proximos Pasos

Esperar aprobacion antes de iniciar cualquier fase adicional.

## Elementos que Deben Permanecer Intactos

- Logica de negocio.
- API Routes actuales.
- Consultas SQL.
- Conexion PostgreSQL/Neon.
- Variables de entorno.
- Autenticacion.
- Swagger.
- Tests.
- Imports, alias, rutas y llamadas `fetch`.

## Historial
