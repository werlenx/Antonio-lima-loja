import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { join } from 'path';

// Carregar variáveis de ambiente do arquivo config.env
dotenv.config({ path: join(process.cwd(), 'config.env') });

export const config = {
  // Configurações do Banco de Dados
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    name: process.env.DB_NAME || 'marcenaria',
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'admin',
  },
  
  // Configurações do Servidor
  server: {
    port: process.env.PORT || 3001,
    env: process.env.NODE_ENV || 'development',
  },
  
  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'antonio-lima-marcenaria-secret-key-2024',
    expiresIn: '7d',
  },
  
  // CORS
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  },
  
  // Upload
  upload: {
    path: process.env.UPLOAD_PATH || './uploads',
    maxFileSize: process.env.MAX_FILE_SIZE || 5242880, // 5MB
  }
};
