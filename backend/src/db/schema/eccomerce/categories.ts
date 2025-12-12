import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const tablecategories = pgTable ("categories", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),//poderia ser unique
    description: text("description").notNull(),
})