import { Router } from 'express';
import { login,getData } from '../controllers/data.controller.js';
import { validateToken } from '../lib/token.js';


const router = Router();

//Simular la autenticación de un usuario
router.post('/login', login);

router.get('/data', validateToken, getData);


export default router;