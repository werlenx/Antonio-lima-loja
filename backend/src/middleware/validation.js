import { body, validationResult } from 'express-validator';

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Dados inválidos',
      details: errors.array()
    });
  }
  next();
};

export const validateUser = [
  body('nome').trim().isLength({ min: 2 }).withMessage('Nome deve ter pelo menos 2 caracteres'),
  body('email').isEmail().withMessage('Email inválido'),
  body('senha').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres'),
  body('telefone').optional().isMobilePhone('pt-BR').withMessage('Telefone inválido'),
  handleValidationErrors
];

export const validateLogin = [
  body('email').isEmail().withMessage('Email inválido'),
  body('senha').notEmpty().withMessage('Senha é obrigatória'),
  handleValidationErrors
];

export const validateProduct = [
  body('nome').trim().isLength({ min: 2 }).withMessage('Nome deve ter pelo menos 2 caracteres'),
  body('descricao').optional().trim(),
  body('preco').isFloat({ min: 0 }).withMessage('Preço deve ser um número positivo'),
  body('estoque').isInt({ min: 0 }).withMessage('Estoque deve ser um número inteiro não negativo'),
  body('categoria_id').optional().isInt({ min: 1 }).withMessage('ID da categoria deve ser um número inteiro positivo'),
  handleValidationErrors
];

export const validateCategory = [
  body('nome').trim().isLength({ min: 2 }).withMessage('Nome deve ter pelo menos 2 caracteres'),
  body('descricao').optional().trim(),
  handleValidationErrors
];

export const validateReview = [
  body('nota').isInt({ min: 1, max: 5 }).withMessage('Nota deve ser entre 1 e 5'),
  body('comentario').optional().trim().isLength({ max: 500 }).withMessage('Comentário deve ter no máximo 500 caracteres'),
  handleValidationErrors
];
