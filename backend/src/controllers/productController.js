import { Product } from '../models/Product.js';

export const productController = {
  async getAll(req, res) {
    try {
      const { page, limit, categoria_id, search } = req.query;
      const result = await Product.findAll({
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 10,
        categoria_id: categoria_id ? parseInt(categoria_id) : undefined,
        search
      });

      res.json(result);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      
      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      // Buscar imagens, variações e avaliações
      const [images, variations, reviews] = await Promise.all([
        Product.getImages(id),
        Product.getVariations(id),
        Product.getReviews(id)
      ]);

      res.json({
        ...product,
        images,
        variations,
        reviews
      });
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async create(req, res) {
    try {
      const { nome, descricao, preco, estoque, categoria_id } = req.body;
      
      const product = await Product.create({
        nome,
        descricao,
        preco: parseFloat(preco),
        estoque: parseInt(estoque),
        categoria_id: parseInt(categoria_id)
      });

      res.status(201).json({
        message: 'Produto criado com sucesso',
        product
      });
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, descricao, preco, estoque, categoria_id } = req.body;
      
      const product = await Product.update(id, {
        nome,
        descricao,
        preco: parseFloat(preco),
        estoque: parseInt(estoque),
        categoria_id: parseInt(categoria_id)
      });

      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      res.json({
        message: 'Produto atualizado com sucesso',
        product
      });
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      await Product.delete(id);
      
      res.json({ message: 'Produto excluído com sucesso' });
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async addImage(req, res) {
    try {
      const { id } = req.params;
      const { url, destaque } = req.body;
      
      const image = await Product.addImage(id, { url, destaque });
      
      res.status(201).json({
        message: 'Imagem adicionada com sucesso',
        image
      });
    } catch (error) {
      console.error('Erro ao adicionar imagem:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async addVariation(req, res) {
    try {
      const { id } = req.params;
      const { nome, valor, preco_extra } = req.body;
      
      const variation = await Product.addVariation(id, {
        nome,
        valor,
        preco_extra: parseFloat(preco_extra) || 0
      });
      
      res.status(201).json({
        message: 'Variação adicionada com sucesso',
        variation
      });
    } catch (error) {
      console.error('Erro ao adicionar variação:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async addReview(req, res) {
    try {
      const { id } = req.params;
      const { nota, comentario } = req.body;
      const userId = req.user.id;
      
      const review = await Product.addReview(id, userId, { nota, comentario });
      
      res.status(201).json({
        message: 'Avaliação adicionada com sucesso',
        review
      });
    } catch (error) {
      console.error('Erro ao adicionar avaliação:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
};
