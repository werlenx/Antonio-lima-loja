import pool from '../config/database.js';

export class Product {
  static async findAll({ page = 1, limit = 10, categoria_id, search } = {}) {
    let query = `
      SELECT p.*, c.nome as categoria_nome,
             (SELECT url FROM imagens_produto WHERE produto_id = p.id AND destaque = true LIMIT 1) as imagem_destaque
      FROM produtos p
      LEFT JOIN categorias c ON p.categoria_id = c.id
      WHERE 1=1
    `;
    const values = [];
    let paramCount = 0;

    if (categoria_id) {
      paramCount++;
      query += ` AND p.categoria_id = $${paramCount}`;
      values.push(categoria_id);
    }

    if (search) {
      paramCount++;
      query += ` AND (p.nome ILIKE $${paramCount} OR p.descricao ILIKE $${paramCount})`;
      values.push(`%${search}%`);
    }

    // Contar total de registros
    const countQuery = query.replace(/SELECT.*FROM/, 'SELECT COUNT(*) FROM');
    const countResult = await pool.query(countQuery, values);
    const total = parseInt(countResult.rows[0].count);

    // Adicionar paginação
    paramCount++;
    query += ` ORDER BY p.criado_em DESC LIMIT $${paramCount}`;
    values.push(limit);
    
    paramCount++;
    query += ` OFFSET $${paramCount}`;
    values.push((page - 1) * limit);

    const result = await pool.query(query, values);
    return {
      products: result.rows,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  static async findById(id) {
    const query = `
      SELECT p.*, c.nome as categoria_nome
      FROM produtos p
      LEFT JOIN categorias c ON p.categoria_id = c.id
      WHERE p.id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async create({ nome, descricao, preco, estoque, categoria_id }) {
    const query = `
      INSERT INTO produtos (nome, descricao, preco, estoque, categoria_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [nome, descricao, preco, estoque, categoria_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async update(id, { nome, descricao, preco, estoque, categoria_id }) {
    const query = `
      UPDATE produtos 
      SET nome = $1, descricao = $2, preco = $3, estoque = $4, categoria_id = $5
      WHERE id = $6
      RETURNING *
    `;
    const values = [nome, descricao, preco, estoque, categoria_id, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM produtos WHERE id = $1';
    await pool.query(query, [id]);
  }

  static async getImages(productId) {
    const query = 'SELECT * FROM imagens_produto WHERE produto_id = $1 ORDER BY destaque DESC';
    const result = await pool.query(query, [productId]);
    return result.rows;
  }

  static async addImage(productId, { url, destaque = false }) {
    const query = `
      INSERT INTO imagens_produto (produto_id, url, destaque)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const values = [productId, url, destaque];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async getVariations(productId) {
    const query = 'SELECT * FROM variacoes WHERE produto_id = $1';
    const result = await pool.query(query, [productId]);
    return result.rows;
  }

  static async addVariation(productId, { nome, valor, preco_extra = 0 }) {
    const query = `
      INSERT INTO variacoes (produto_id, nome, valor, preco_extra)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [productId, nome, valor, preco_extra];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async getReviews(productId) {
    const query = `
      SELECT a.*, u.nome as usuario_nome
      FROM avaliacoes a
      JOIN usuarios u ON a.usuario_id = u.id
      WHERE a.produto_id = $1
      ORDER BY a.criado_em DESC
    `;
    const result = await pool.query(query, [productId]);
    return result.rows;
  }

  static async addReview(productId, userId, { nota, comentario }) {
    const query = `
      INSERT INTO avaliacoes (produto_id, usuario_id, nota, comentario)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [productId, userId, nota, comentario];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
}
