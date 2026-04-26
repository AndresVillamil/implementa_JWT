import { generateToken } from '../lib/token.js';

export const login = async (req, res) => {
    const { username, password } = req.body;

    // 🔐 1. Buscar usuario (simulado o BD)
    const user = {
        id: 1,
        username: 'edwin',
        password: '123456',
        role: 'admin'
    };

    // 🔐 2. Validar credenciales
    if (username !== user.username || password !== user.password) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // 🔐 3. Generar token (AQUÍ VA)
    const token = generateToken({
        id: user.id,
        username: user.username,
        role: user.role
    });

    // 🔐 4. Respuesta
    res.json({
        id: user.id,
        username: user.username,
        role: user.role,
        token
    });
};


export const getData = (req, res) => {
    res.json({
        message: 'Acceso a datos protegidos',
        userId: req.userId,
        username: req.username,
        role: req.role
    });
}


