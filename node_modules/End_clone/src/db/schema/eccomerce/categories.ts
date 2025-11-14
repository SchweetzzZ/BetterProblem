import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const tablecategories = pgTable ("categories", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description").notNull(),
})