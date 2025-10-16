// scripts/create-order-items-final.ts
import { db } from '../../db';
import { sql } from 'drizzle-orm';

async function createOrderItemsFinal() {
  try {
    console.log('🚀 Criando tabela order_items...');
    
    // 1. Verifica se já existe
    const check = await db.execute(sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'order_items'
      )
    `);
    
    const exists = check.rows[0]?.exists;
    
    if (exists) {
      console.log('✅ order_items já existe!');
      return;
    }
    
    // 2. Cria a tabela
    console.log('📦 Criando tabela...');
    await db.execute(sql`
      CREATE TABLE order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER NOT NULL REFERENCES "order"(id) ON DELETE CASCADE,
        product_id INTEGER NOT NULL REFERENCES products(id),
        quantity INTEGER NOT NULL CHECK (quantity > 0),
        price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    
    // 3. Cria índices
    console.log('⚡ Criando índices...');
    await db.execute(sql`
      CREATE INDEX idx_order_items_order_id ON order_items(order_id)
    `);
    
    await db.execute(sql`
      CREATE INDEX idx_order_items_product_id ON order_items(product_id)
    `);
    
    console.log('🎉 order_items criada com sucesso!');
    
    // 4. Verifica a criação
    const verify = await db.execute(sql`
      SELECT 
        table_name,
        (SELECT COUNT(*) FROM order_items) as row_count
      FROM information_schema.tables 
      WHERE table_name = 'order_items'
    `);
    
    console.log('📊 Verificação:', verify.rows[0]);
    
  } catch (error: any) {
    console.error('❌ Erro:', error.message);
  }
}

createOrderItemsFinal();