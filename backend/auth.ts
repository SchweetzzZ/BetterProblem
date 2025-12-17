import { Pool } from 'pg';
import { betterAuth } from "better-auth";

export const auth = betterAuth({
    database: new Pool({
        connectionString:
            process.env.DATABASE_URL ||
            "postgres://postgres:polegadas5000@localhost:5432/comercegres",
    }),
    appName: "End_clone",
    plugins: [],
});
