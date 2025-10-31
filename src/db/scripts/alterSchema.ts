import { db } from '../index'; // ajuste o caminho
import { sql } from 'drizzle-orm';

async function main() {
  console.log('🔄 Criando tabela cupons...');
  
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS cupons (
      id serial PRIMARY KEY,
      code varchar NOT NULL UNIQUE,
      discount_percent numeric(5,2),
      discount_value numeric(10,2),
      expires_at timestamp NOT NULL,
      is_active boolean DEFAULT true,
      usage_limit integer DEFAULT 1,
      usage_count integer DEFAULT 0
    )
  `);

  console.log('🔄 Adicionando cupon_id na order...');
  await db.execute(sql`ALTER TABLE "order" ADD COLUMN IF NOT EXISTS cupon_id integer`);

  console.log('🔄 Adicionando discount na order...');
  await db.execute(sql`ALTER TABLE "order" ADD COLUMN IF NOT EXISTS discount numeric(10,2) DEFAULT 0`);

  console.log('✅ Schema atualizado com sucesso!');
}

main().catch(console.error);