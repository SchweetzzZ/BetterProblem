import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "../../db"
import { authSchema } from "../../db/schema/eccomerce/auth-schema"

export const auth = betterAuth({
    basepath: "/api/auth",
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: authSchema
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
    secret: process.env.BETTER_AUTH_SECRET!, 
    trustHost: true,
})
