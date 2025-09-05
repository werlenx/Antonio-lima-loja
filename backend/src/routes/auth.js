import express from 'express';
import { authController } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateUser, validateLogin } from '../middleware/validation.js';

const router = express.Router();

// Rotas públicas
router.post('/register', validateUser, authController.register);
router.post('/login', validateLogin, authController.login);

// Rotas protegidas
router.get('/profile', authenticateToken, authController.getProfile);
router.put('/profile', authenticateToken, authController.updateProfile);
router.put('/change-password', authenticateToken, authController.changePassword);

export default router;
