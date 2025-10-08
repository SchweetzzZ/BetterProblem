import { betterAuth, BetterAuthError } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "../../db"
import { env } from "../../env"
import { authSchemas, user } from "../../db/schema/eccomerce/auth-schema"


export const auth = betterAuth({
    basePath: "/auth",
    database: drizzleAdapter(db, {
        schema: authSchemas,
        provider: "pg"
}),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
    },
    user: {
        additionalFields: {
            nome: {
                type: "string",
                required: true,
            },
            nascimento: {
                type: "string",
                required: true,
            },
            
        }
    },
    secret: env.BETTER_AUTH_SECRET!, 
    trustHost: true,
})



if (BetterAuthError) {
    console.log("Auth configurado")
}