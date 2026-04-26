📘 README.md — Autenticación con JWT (Node.js + Express)
🧠 Objetivo

Entender cómo funciona JWT (JSON Web Token) a través de un backend simple en Node.js, aplicando:

Login
Generación de token
Validación de token
Protección de rutas
🔐 ¿Qué es JWT?

JWT (JSON Web Token) es un mecanismo de autenticación que permite:

✔ Identificar usuarios
✔ Proteger rutas
✔ Evitar sesiones en servidor (stateless)

🧩 Estructura de un JWT

Un token tiene 3 partes:

HEADER.PAYLOAD.SIGNATURE
📌 Ejemplo:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
.
eyJpZCI6MSwidXNlcm5hbWUiOiJlZHdpbiIsInJvbGUiOiJhZG1pbiJ9
.
abc123firma
📦 Componentes
1. Header

Define el algoritmo:

{
  "alg": "HS256",
  "typ": "JWT"
}
2. Payload (lo importante)

En tu proyecto:

{
  id: user.id,
  username: user.username,
  role: user.role
}

👉 Esto es lo que viaja dentro del token

3. Signature

Se genera con:

JWT_SECRET + payload + algoritmo

👉 Garantiza que el token no fue modificado

🏗️ Arquitectura del proyecto
src/
 ├── controllers/
 │    └── data.controller.js
 ├── lib/
 │    └── token.js
 ├── routes/
 │    └── indexroutes.js
 └── index.js
🔄 Flujo completo de autenticación
1. Cliente → POST /login
2. Backend valida usuario
3. Backend genera JWT
4. Cliente guarda token
5. Cliente → GET /data (con token)
6. Middleware valida token
7. Backend responde datos protegidos
🔐 1. LOGIN — Generación del Token

📄 data.controller.js

const token = generateToken({
    id: user.id,
    username: user.username,
    role: user.role
});
🧠 Conceptos aplicados
✔ Autenticación

Se validan credenciales:

if (username !== user.username || password !== user.password)
✔ Creación del payload
{
  id,
  username,
  role
}

👉 Este objeto representa la “identidad” del usuario

✔ Generación del JWT

📄 token.js

jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
🧠 Conceptos
sign() → crea el token
JWT_SECRET → clave privada
expiresIn → tiempo de vida
📡 2. Uso del Token (Cliente)

El cliente debe enviar el token en cada request:

Authorization: <token>

⚠️ (Mejor práctica: Bearer <token>)

🛡️ 3. Validación del Token (Middleware)

📄 token.js

const token = jwt.verify(accessToken, process.env.JWT_SECRET);
🧠 Conceptos
✔ Verificación
Confirma que el token es válido
Verifica firma
Verifica expiración
✔ Middleware
router.get('/data', validateToken, getData);

👉 Se ejecuta antes del controlador

✔ Inyección de datos en request
req.userId = token.id;
req.username = token.username;
req.role = token.role;

👉 Permite usar datos del usuario en toda la app

🔐 4. Ruta protegida

📄 data.controller.js

export const getData = (req, res) => {
    res.json({
        message: 'Acceso a datos protegidos',
        userId: req.userId,
        username: req.username,
        role: req.role
    });
};
🧠 Concepto

👉 Solo se ejecuta si el token es válido

⚠️ Manejo de errores
try {
   jwt.verify(...)
} catch (error) {
   res.status(401)
}
🧠 Concepto
Token inválido → 401
Token expirado → 401
Sin token → 401
🔑 Variables de entorno

📄 .env

JWT_SECRET=mi_clave_super_secreta
🧠 Concepto

👉 Nunca hardcodear secretos

🧠 Conceptos clave resumidos
Concepto	Aplicación en el código
Autenticación	Validación en login
Autorización	Uso de role
Stateless	No hay sesiones
Payload	Datos del usuario
Firma	Seguridad del token
Middleware	Protección de rutas
Expiración	expiresIn: '1h'
🚀 Flujo final simplificado
LOGIN
 → valida usuario
 → genera token

REQUEST protegida
 → envía token
 → middleware valida
 → acceso permitido
🔥 Buenas prácticas (para siguiente nivel)
Usar Authorization: Bearer <token>
No enviar password en respuesta
Usar bcrypt para contraseñas
Implementar roles (admin/user)
Usar refresh tokens
Separar lógica en servicios
🧪 Ejemplo de prueba (Postman)
🔹 Login
POST /login
{
  "username": "edwin",
  "password": "123456"
}
🔹 Ruta protegida
GET /data
Authorization: <token>
🧠 Conclusión

JWT permite construir sistemas de autenticación:

✔ Escalables
✔ Sin sesiones
✔ Basados en tokens firmados

Pero requiere:

⚠️ Buen manejo de seguridad
⚠️ Buen diseño del payload
⚠️ Validación estricta