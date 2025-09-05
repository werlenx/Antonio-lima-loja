import express from 'express';
import { productController } from '../controllers/productController.js';
import { authenticateToken, optionalAuth } from '../middleware/auth.js';
import { validateProduct, validateReview } from '../middleware/validation.js';

const router = express.Router();

// Rotas públicas
router.get('/', optionalAuth, productController.getAll);
router.get('/:id', optionalAuth, productController.getById);

// Rotas protegidas (admin)
router.post('/', authenticateToken, validateProduct, productController.create);
router.put('/:id', authenticateToken, validateProduct, productController.update);
router.delete('/:id', authenticateToken, productController.delete);
router.post('/:id/images', authenticateToken, productController.addImage);
router.post('/:id/variations', authenticateToken, productController.addVariation);

// Avaliações (usuários autenticados)
router.post('/:id/reviews', authenticateToken, validateReview, productController.addReview);

export default router;
