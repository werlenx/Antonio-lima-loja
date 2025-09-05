import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from '../config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seed() {
  try {
    console.log('🌱 Iniciando seed do banco de dados...');
    
    // Ler o arquivo de inserts
    const seedPath = path.join(__dirname, '../../database/seeds/inserts.sql');
    const seedData = fs.readFileSync(seedPath, 'utf8');
    
    // Executar os inserts
    await pool.query(seedData);
    
    console.log('✅ Seed concluído com sucesso!');
  } catch (error) {
    console.error('❌ Erro no seed:', error);
  } finally {
    await pool.end();
  }
}

seed();
