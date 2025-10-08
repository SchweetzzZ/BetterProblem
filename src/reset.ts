import { db } from './db';
import { sql } from 'drizzle-orm';

async function resetDatabase() {
  console.log('🧹 Apagando TODAS as tabelas...');
  
  try {
    await db.execute(sql`DROP SCHEMA public CASCADE`);
    await db.execute(sql`CREATE SCHEMA public`);
    console.log('✅ Banco resetado com sucesso!');
  } catch (error) {
    console.log('❌ Erro:', error);
  }
}

resetDatabase();