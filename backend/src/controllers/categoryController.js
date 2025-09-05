import { Category } from '../models/Category.js';

export const categoryController = {
  async getAll(req, res) {
    try {
      const categories = await Category.findAll();
      res.json(categories);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);
      
      if (!category) {
        return res.status(404).json({ error: 'Categoria não encontrada' });
      }

      res.json(category);
    } catch (error) {
      console.error('Erro ao buscar categoria:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async create(req, res) {
    try {
      const { nome, descricao } = req.body;
      
      const category = await Category.create({ nome, descricao });

      res.status(201).json({
        message: 'Categoria criada com sucesso',
        category
      });
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, descricao } = req.body;
      
      const category = await Category.update(id, { nome, descricao });

      if (!category) {
        return res.status(404).json({ error: 'Categoria não encontrada' });
      }

      res.json({
        message: 'Categoria atualizada com sucesso',
        category
      });
    } catch (error) {
      console.error('Erro ao atualizar categoria:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      await Category.delete(id);
      
      res.json({ message: 'Categoria excluída com sucesso' });
    } catch (error) {
      console.error('Erro ao excluir categoria:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
};
