import { pgTable, serial, text, decimal, integer, timestamp, varchar } from "drizzle-orm/pg-core";

export const tableproducts = pgTable ("products", {
    id: serial("id").primaryKey(),
    nome: varchar("nome", { length: 255 }).notNull(),
    price: decimal("price").notNull(),
    description: text("description").notNull(),
    image: text("image").notNull(),
    category: text("category").notNull(),
    stock: integer("stock").notNull(),
    create_at: timestamp("create_at").notNull().defaultNow(),
    update_at: timestamp("update_at").notNull().defaultNow(),
})