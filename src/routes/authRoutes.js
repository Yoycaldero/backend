import express from 'express';
import { register, login, getProfile } from '../controllers/authController.js'; // Importa getProfile
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', register);

// Ruta para iniciar sesión
router.post('/login', login);

// Ruta para obtener el perfil del usuario (protegida)
router.get('/profile', authMiddleware, getProfile);

export default router;