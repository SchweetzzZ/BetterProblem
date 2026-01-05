import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from "./index-Schemas"


// Configuração da conexão com o PostgreSQL
const pool = new Pool({
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB,
})

// Exportar a instância do Drizzle ORM
export const db = drizzle(pool, {schema});


