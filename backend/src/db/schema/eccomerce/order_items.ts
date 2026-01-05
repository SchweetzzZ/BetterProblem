import { pgTable,  text, integer, decimal,uuid } from "drizzle-orm/pg-core";
import { tableOrder } from "./order";
import { tableproducts } from "./products";
import { sql } from "drizzle-orm";

export const orderItens = pgTable("order_items", {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    order_id: uuid("order_id").notNull().references(() => tableOrder.id, {onDelete: "cascade"}),
    product_id: uuid("product_id").notNull().references(() => tableproducts.id),
    quantity: integer("quantity").notNull(),
    price: decimal("price", {precision: 10, scale: 2, mode: "number"}).notNull(),
})