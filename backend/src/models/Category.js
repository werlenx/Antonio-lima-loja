import pool from '../config/database.js';

export class Category {
  static async findAll() {
    const query = 'SELECT * FROM categorias ORDER BY nome';
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id) {
    const query = 'SELECT * FROM categorias WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async create({ nome, descricao }) {
    const query = `
      INSERT INTO categorias (nome, descricao)
      VALUES ($1, $2)
      RETURNING *
    `;
    const values = [nome, descricao];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async update(id, { nome, descricao }) {
    const query = `
      UPDATE categorias 
      SET nome = $1, descricao = $2
      WHERE id = $3
      RETURNING *
    `;
    const values = [nome, descricao, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM categorias WHERE id = $1';
    await pool.query(query, [id]);
  }
}
