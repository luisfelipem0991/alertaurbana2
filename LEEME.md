# Cómo instalar este paquete

Descomprime este ZIP en la raíz de tu proyecto `alertaurbana2` (donde están
las carpetas `frontend/` y `backend/`) y confirma que se sobrescriban estos
archivos:

```
frontend/.env.example                          (nuevo)
frontend/src/lib/validators.js                  (nuevo)
frontend/src/app/api/register/route.js          (reemplaza)
frontend/src/app/api/login/route.js             (reemplaza)
frontend/src/__test__/login-page.test.jsx       (reemplaza - tenía código duplicado)
frontend/src/__test__/register-page.test.jsx    (reemplaza - tenía código duplicado)
frontend/src/__test__/login-api.test.js         (reemplaza)
frontend/src/__test__/register-api.test.js      (reemplaza)
frontend/src/__test__/validators.test.js        (nuevo)

backend/package.json                            (reemplaza - agrega script "test")
backend/src/utils/validators.js                 (nuevo)
backend/src/controllers/loginController.js      (reemplaza)
backend/src/__tests__/validators.test.js         (nuevo)
```

## Pasos

1. Crea `frontend/.env.local` (NO `.env.example`) basado en
   `frontend/.env.example`, con tu `DATABASE_URL` real y un `JWT_SECRET`
   propio (cualquier cadena larga y random).

2. Crea `backend/.env` basado en `backend/.env.example` (ya existía en tu
   repo), con `PORT`, `DATABASE_URL` y `JWT_SECRET`. **Importante:** usa el
   mismo valor de `JWT_SECRET` en ambos `.env` si en algún momento
   pretendes que tokens de uno sirvan en el otro.

3. Corre los tests:

   ```bash
   cd frontend
   npm test

   cd ../backend
   npm test
   ```

## Qué cambió y por qué

- **Validación real:** antes solo se comprobaba que los campos no estuvieran
  vacíos. Ahora se valida formato de correo, longitud de contraseña (8-72),
  formato del nombre, y se **rechaza cualquier campo extra** en el body
  (por si alguien manda un payload manipulado con curl/Postman, ej.
  `role: "admin"`). Esto reemplaza la idea de "bloquear desde el
  inspector": eso nunca protege nada porque el cliente no es confiable,
  así que la validación se movió donde sí importa, el servidor.

- **JWT_SECRET:** en `login/route.js` (frontend) estaba hardcodeado como
  `"secreto_super_seguro"`. Ahora usa `process.env.JWT_SECRET`, igual que
  ya lo hacía el backend Express. Por eso necesitas la variable en el
  `.env` del frontend también.

- **Tests duplicados:** `login-page.test.jsx` y `register-page.test.jsx`
  tenían dos bloques de código pegados en el mismo archivo (dos imports del
  mismo componente, dos `describe`). Eso revienta Jest con un error de
  declaración duplicada. Quedaron con una sola versión limpia.

- **Tests nuevos:** `validators.test.js` en frontend y backend prueban
  específicamente los intentos de manipulación (campos extra, tipos raros,
  formatos inválidos) — son las pruebas que demuestran que la validación
  de seguridad funciona.

- **Backend sin Jest:** como `backend/package.json` no tenía Jest
  instalado, se usó el test runner nativo de Node (`node --test`), incluido
  desde Node 18+, sin agregar dependencias nuevas.

No olvides anotar este cambio en `docs/MIGRATION.md` ya que tu propia
documentación pide aprobación explícita para tocar autenticación.
