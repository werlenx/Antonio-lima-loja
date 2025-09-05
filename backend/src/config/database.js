import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER || 'admin',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'marcenaria',
  password: process.env.DB_PASSWORD || 'admin',
  port: process.env.DB_PORT || 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Teste de conexão
pool.on('connect', () => {
  console.log('✅ Conectado ao banco PostgreSQL');
});

pool.on('error', (err) => {
  console.error('❌ Erro na conexão com o banco:', err);
});

export default pool;
