import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { config } from '../config/config.js';

export const authController = {
  async register(req, res) {
    try {
      const { nome, email, senha, telefone, endereco } = req.body;

      // Verificar se email já existe
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'Email já cadastrado' });
      }

      // Criar usuário
      const user = await User.create({ nome, email, senha, telefone, endereco });

      // Gerar token JWT
      const token = jwt.sign(
        { id: user.id, email: user.email },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
      );

      res.status(201).json({
        message: 'Usuário criado com sucesso',
        user: {
          id: user.id,
          nome: user.nome,
          email: user.email,
          telefone: user.telefone,
          endereco: user.endereco
        },
        token
      });
    } catch (error) {
      console.error('Erro no registro:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async login(req, res) {
    try {
      const { email, senha } = req.body;

      // Buscar usuário
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      // Verificar senha
      const isValidPassword = await User.verifyPassword(senha, user.senha_hash);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      // Gerar token JWT
      const token = jwt.sign(
        { id: user.id, email: user.email },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
      );

      res.json({
        message: 'Login realizado com sucesso',
        user: {
          id: user.id,
          nome: user.nome,
          email: user.email,
          telefone: user.telefone,
          endereco: user.endereco
        },
        token
      });
    } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async getProfile(req, res) {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId);
      
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      res.json({ user });
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async updateProfile(req, res) {
    try {
      const userId = req.user.id;
      const { nome, telefone, endereco } = req.body;

      const user = await User.update(userId, { nome, telefone, endereco });
      
      res.json({
        message: 'Perfil atualizado com sucesso',
        user
      });
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async changePassword(req, res) {
    try {
      const userId = req.user.id;
      const { senhaAtual, novaSenha } = req.body;

      // Buscar usuário para verificar senha atual
      const user = await User.findByEmail(req.user.email);
      const isValidPassword = await User.verifyPassword(senhaAtual, user.senha_hash);
      
      if (!isValidPassword) {
        return res.status(400).json({ error: 'Senha atual incorreta' });
      }

      await User.updatePassword(userId, novaSenha);
      
      res.json({ message: 'Senha alterada com sucesso' });
    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
};
