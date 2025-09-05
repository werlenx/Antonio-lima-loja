import express from 'express';
import { categoryController } from '../controllers/categoryController.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateCategory } from '../middleware/validation.js';

const router = express.Router();

// Rotas públicas
router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getById);

// Rotas protegidas (admin)
router.post('/', authenticateToken, validateCategory, categoryController.create);
router.put('/:id', authenticateToken, validateCategory, categoryController.update);
router.delete('/:id', authenticateToken, categoryController.delete);

export default router;
