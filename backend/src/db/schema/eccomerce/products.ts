import { pgTable, text, decimal, integer, timestamp, varchar, uuid } from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm";
import {user} from "./auth-schema"

export const tableproducts = pgTable ("products", {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    user_id: text("user_id").notNull().references(()=> user.id),
    nome: varchar("nome", { length: 255 }).notNull(),
    price: decimal("price", {precision: 10, scale: 2, mode: "number"}).notNull(),
    description: text("description").notNull(),
    image: text("image").notNull(),
    category: text("category").notNull(),
    stock: integer("stock").notNull(),
    create_at: timestamp("create_at").notNull().defaultNow(),
    update_at: timestamp("update_at").notNull().defaultNow(),
})