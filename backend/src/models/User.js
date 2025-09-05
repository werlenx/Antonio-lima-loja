import pool from '../config/database.js';
import bcrypt from 'bcryptjs';

export class User {
  static async create({ nome, email, senha, telefone, endereco }) {
    const senha_hash = await bcrypt.hash(senha, 10);
    const query = `
      INSERT INTO usuarios (nome, email, senha_hash, telefone, endereco)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, nome, email, telefone, endereco, criado_em
    `;
    const values = [nome, email, senha_hash, telefone, endereco];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM usuarios WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const query = 'SELECT id, nome, email, telefone, endereco, criado_em FROM usuarios WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async update(id, { nome, telefone, endereco }) {
    const query = `
      UPDATE usuarios 
      SET nome = $1, telefone = $2, endereco = $3
      WHERE id = $4
      RETURNING id, nome, email, telefone, endereco, criado_em
    `;
    const values = [nome, telefone, endereco, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async updatePassword(id, novaSenha) {
    const senha_hash = await bcrypt.hash(novaSenha, 10);
    const query = 'UPDATE usuarios SET senha_hash = $1 WHERE id = $2';
    await pool.query(query, [senha_hash, id]);
  }

  static async verifyPassword(senha, senha_hash) {
    return await bcrypt.compare(senha, senha_hash);
  }
}
