import { Pool } from "pg";
import { betterAuth } from "better-auth";

export const auth = betterAuth({
    database: new Pool({
        connectionString:
            process.env.DATABASE_URL ||
            "postgresql://postgres:password@localhost:5432/database",
    }),
    appName: "End_clone",
    plugins: [],
});
