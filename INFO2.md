## 🧠 📌 ¿Qué es “Bearer”?

Bearer es un esquema de autorización HTTP.

👉 Significa literalmente:

“El que porta este token tiene acceso”
--

# 🔐 📡 ¿Dónde se usa?

En el header HTTP:

Authorization: Bearer <token>

Ejemplo real:

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

--
# 🎯 ¿Cuál es su aplicabilidad?

✅ 1. Estándar en APIs REST

Bearer es el estándar definido por:

OAuth 2.0
APIs modernas (Node, Spring, .NET, etc.)

👉 Permite interoperabilidad entre sistemas

--
✅ 2. Separación clara del tipo de autenticación

El header:

Authorization: Bearer <token>

Le dice al backend:

👉 “Esto es un token, no usuario/contraseña”
--
✅ 2. Separación clara del tipo de autenticación

El header:

Authorization: Bearer <token>

Le dice al backend:

👉 “Esto es un token, no usuario/contraseña”
--
✅ 4. Integración con middlewares y librerías

Muchas librerías esperan este formato:

const token = req.header('Authorization').replace('Bearer ', '');

## 🔄 🔐 Cómo se aplica en tu proyecto

Actualmente tienes:

const accessToken = req.header('Authorization');
const token = jwt.verify(accessToken, process.env.JWT_SECRET);

👉 Esto funciona, pero no es estándar

## 🚀 Versión correcta (con Bearer)

![alt text](image.png)


export const validateToken = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');

        if (!authHeader)
            return res.status(401).json({ message: 'Token requerido' });

        // 🔐 Extraer token del Bearer
        const token = authHeader.replace('Bearer ', '');

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.id;
        req.username = decoded.username;
        req.role = decoded.role;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};


# ⚠️ 🔥 Importante (seguridad)
❗ Bearer = acceso total

👉 Si alguien roba el token:

✔ Puede acceder como el usuario
❌ No necesita contraseña

🛡️ Por eso debes:

- Usar HTTPS (obligatorio)
- Evitar localStorage (en apps críticas)
- Usar expiración corta
- Implementar refresh tokens

# 🧠 Concepto clave (nivel entrevista)

Puedes explicarlo así:

“Bearer es un esquema de autenticación HTTP donde el cliente envía un token en el header Authorization. El servidor asume que quien porta el token es quien tiene acceso, por lo que la seguridad depende de proteger ese token.”

🆚 Sin Bearer vs Con Bearer

|          Forma               | Correcto  | Estándar  |
|------------------------------|-----------|-----------|
| Authorization: token         |   ❌      |   ❌      |
| Authorization: Bearer token  |   ✅      |   ✅     |


# 🚀 Resumen claro

- ✔ Bearer es un estándar HTTP
- ✔ Se usa para enviar JWT
- ✔ Indica el tipo de autenticación
- ✔ Es obligatorio en APIs profesionales