import { pgTable, serial, integer, timestamp, text } from "drizzle-orm/pg-core";
import { user } from "./auth-schema"
import { tableproducts } from "./products";

export const tablecart = pgTable ("cart", {
    id: serial("id").primaryKey(),
    user_id: text("user_id").notNull().references(() => user.id),//mudei para text por causa da tabela do betterAuth
    producuct_id: integer("product_id").notNull().references(() => tableproducts.id),
    quantity: integer("quantity").notNull(),
    create_at: timestamp("create_at").notNull().defaultNow(),
})