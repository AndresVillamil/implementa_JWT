import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (user) => 
    jwt.sign( user , process.env.JWT_SECRET, { expiresIn: '1h' });

export const validateToken = (req, res, next) => {

    try {
    
    const accessToken = req.header('Authorization');
    if (!accessToken) 
        return res.status(401).json({ message: 'Token requerido' });

    const token = jwt.verify(accessToken, process.env.JWT_SECRET);
    if (!token) return res.status(401).json({ message: 'Acceso denegado, token expirado o incorrecto' });

    req.userId = token.id.toString();
    req.username = token.username.toString();
    req.role = token.role.toString();
    next();
    } catch (error) {
        res.status(401).json({ message: 'Acceso denegado, token expirado o incorrecto' });
    }

};