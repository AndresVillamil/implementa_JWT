📘 INFO.md — Autenticación JWT (Nivel Senior / Entrevista Técnica)

🧠 1. ¿Qué problema resuelve JWT?
JWT (JSON Web Token) permite implementar autenticación stateless, eliminando la necesidad de almacenar sesiones en el servidor.
🎯 Problemas que soluciona:


Escalabilidad en sistemas distribuidos


Eliminación de session store (Redis, memory, etc.)


Comunicación segura entre servicios (microservicios)


Autenticación desacoplada (API / Frontend)



🏗️ 2. Arquitectura aplicada
📦 Arquitectura actual (simplificada)
Cliente  │  ▼Express API  ├── Controller (login, getData)  ├── Middleware (validateToken)  └── JWT (lib/token.js)

🧠 Flujo real
[ LOGIN ]Cliente → POST /login        → Validación credenciales        → Generación JWT        → Respuesta con token[ REQUEST PROTEGIDA ]Cliente → GET /data (Authorization: Token)        → Middleware validateToken        → Verificación JWT        → Inyección en req        → Controller responde

🔐 3. Componentes de seguridad del JWT
🔑 Firma (Signature)
HMACSHA256(  base64UrlEncode(header) + "." +  base64UrlEncode(payload),  SECRET)
👉 Garantiza:


Integridad


Autenticidad



📦 Payload
{  "id": 1,  "username": "edwin",  "role": "admin"}
⚠️ Nunca almacenar información sensible


❌ password


❌ datos financieros


❌ tokens internos



⏱️ Expiración
expiresIn: '1h'
👉 Reduce ventana de ataque

⚠️ 4. Principales vulnerabilidades (JWT)

❌ 1. Robo de token (Token Theft)
💥 Escenario


XSS en frontend


Token almacenado en localStorage


Script malicioso lo roba


🛡️ Mitigación


Usar HttpOnly Cookies


CSP (Content Security Policy)


Sanitización de inputs


Evitar localStorage en apps críticas



❌ 2. Replay Attack
💥 Escenario
Un atacante reutiliza un token válido
🛡️ Mitigación


Expiraciones cortas


Refresh Tokens


Rotación de tokens


Uso de jti (JWT ID)



❌ 3. Token sin expiración
💥 Escenario
Token válido indefinidamente
🛡️ Mitigación
expiresIn: '15m'


Refresh Token



❌ 4. Secret comprometido
💥 Escenario
JWT_SECRET expuesto
🛡️ Mitigación


Variables de entorno


Vaults (AWS Secrets Manager, HashiCorp Vault)


Rotación de claves



❌ 5. Algoritmo "none" attack (histórico)
💥 Escenario
Manipulación del header:
{ "alg": "none" }
🛡️ Mitigación


Librerías modernas ya lo previenen


Validar algoritmo explícitamente



❌ 6. Falta de validación de roles
💥 Escenario
Usuario accede a rutas admin
🛡️ Mitigación
if (req.role !== 'admin') {  return res.status(403).json({ message: 'Forbidden' });}

❌ 7. No invalidación de tokens (logout)
💥 Problema
JWT es stateless → no se puede “invalidar” fácilmente
🛡️ Mitigación


Blacklist (Redis)


Versionado de token


Rotación de claves



🛡️ 5. Estrategias de seguridad (nivel profesional)

✅ 1. Access + Refresh Tokens
Access Token → 15 minRefresh Token → 7 días
Flujo:
1. Login → entrega ambos tokens2. Access expira3. Cliente usa Refresh4. Nuevo Access Token

✅ 2. Almacenamiento seguro
OpciónSeguridadlocalStorage❌sessionStorage⚠️HttpOnly Cookie✅

✅ 3. Middleware desacoplado
middlewares/ ├── auth.middleware.js ├── role.middleware.js

✅ 4. Principio de mínimo privilegio
Payload:
{  "id": 1,  "role": "user"}
👉 No incluir más de lo necesario

✅ 5. Rate limiting
Protege login:
5 intentos / minuto

✅ 6. Logging y monitoreo


Intentos fallidos


Tokens inválidos


Accesos sospechosos



🧠 6. JWT vs Sesiones (visión senior)
CaracterísticaJWTSesiónEstadoStatelessStatefulEscalabilidadAltaMediaInvalidaciónDifícilFácilSeguridadDepende del clienteControl totalUso idealAPIs / MicroserviciosApps tradicionales

🏗️ 7. Evolución a arquitectura profesional

📦 Versión actual
Controller → Token lib

🚀 Versión recomendada
src/ ├── controllers/ ├── services/ │    └── auth.service.js ├── middlewares/ │    ├── auth.middleware.js │    └── role.middleware.js ├── utils/ ├── config/ └── infrastructure/

🧠 Separación de responsabilidades
CapaResponsabilidadControllerHTTPServiceLógica de negocioMiddlewareSeguridadLib/UtilsJWT

🔍 8. Buenas prácticas clave (resumen)
✔ Tokens con expiración corta
✔ Uso de Refresh Tokens
✔ Payload mínimo
✔ Secret seguro
✔ Validación de roles
✔ Manejo de errores robusto
✔ No exponer datos sensibles
✔ Uso de HTTPS obligatorio

🧠 9. Cómo explicarlo en entrevista (respuesta ideal)

“JWT es un mecanismo de autenticación stateless donde el servidor emite un token firmado que contiene información del usuario. Este token se valida en cada request sin necesidad de almacenar sesión.
Sin embargo, introduce retos de seguridad como token theft y replay attacks, por lo que en producción se complementa con refresh tokens, expiración corta, almacenamiento seguro (HttpOnly cookies) y control de acceso basado en roles.
A nivel arquitectónico, se recomienda desacoplar autenticación en middlewares y servicios, y aplicar principios como mínimo privilegio y rotación de secretos.”


🚀 10. Conclusión
JWT es:
✔ Potente
✔ Escalable
✔ Ideal para APIs modernas
Pero:
⚠️ No es seguro por sí solo
⚠️ Requiere diseño consciente
⚠️ Debe complementarse con otras estrategias

🔥 Siguiente nivel
Si quieres llevar esto a nivel real:


Integrar con MySQL + bcrypt


Implementar refresh tokens con Redis


Agregar RBAC (Role-Based Access Control)


Diseñar arquitectura hexagonal o clean architecture



Si quieres, en el siguiente paso puedo convertir este backend en una implementación enterprise lista para producción (con todas estas prácticas aplicadas).