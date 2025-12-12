import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from "./index-Schemas"


// Configuração da conexão com o PostgreSQL
const pool = new Pool({
  host: process.env.PG_HOST || 'localhost',
  port: parseInt(process.env.PG_PORT || '5432'),
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || 'polegadas5000',
  database: process.env.PG_DB || 'comercegres',
});

// Exportar a instância do Drizzle ORM
export const db = drizzle(pool, {schema});


