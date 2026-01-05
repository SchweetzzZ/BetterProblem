import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm"
import {user} from "../../schema/eccomerce/auth-schema"

export const tablecategories = pgTable ("categories", {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    userId: text("userId").notNull().references(()=>user.id),
    name: text("name").notNull(),//poderia ser unique
    description: text("description").notNull(),
})