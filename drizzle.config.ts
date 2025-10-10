import type { Config } from 'drizzle-kit';


export default {
  schema: './src/db/schema/**/*.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.PG_HOST || 'localhost',
    port: parseInt(process.env.PG_PORT || '5432'),
    user: process.env.PG_USER || 'postgres',
    password: process.env.PG_PASSWORD || 'polegadas5000',
    database: process.env.PG_DB || 'postgres',
    ssl: false
  },
  tablesFilter: ["!user", "!session", "!account", "!verification"],
} satisfies Config;