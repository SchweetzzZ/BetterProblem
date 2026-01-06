import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "../../db"
import { authSchema } from "../../db/schema/eccomerce/auth-schema"
import { Session } from "better-auth"

export const auth = betterAuth({
    basePath: "/api/auth",
    trustHost: true,
    trustedOrigins: ["http://localhost:5173", "http://localhost:3000"],

    database: drizzleAdapter(db, {
        provider: "pg",
        schema: authSchema
    }),

    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
    },

    secret: process.env.BETTER_AUTH_SECRET!,

    user: {
        additionalFields: {
            roles: {
                type: "string",
                required: true,
                defaultValue: "user"
            }
        }
    },

    callbacks: {
        session: async (args: { session: any; user: any }) => {
            const { session, user } = args;
            return {
                ...session,
                user: {
                    ...session.user,
                    roles: user.roles || "user",
                }
            }
        }
    }
})