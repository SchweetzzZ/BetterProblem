import { pgTable,  serial, integer, decimal, varchar } from "drizzle-orm/pg-core";
import { tableOrder } from "./order";
import { tableproducts } from "./products";

export const orderItens = pgTable("order_items", {
    id: serial("id").primaryKey(),
    order_id: integer("order_id").notNull().references(() => tableOrder.id, {onDelete: "cascade"}),
    product_id: integer("product_id").notNull().references(() => tableproducts.id),
    quantity: integer("quantity").notNull(),
    price: decimal("price", {precision: 10, scale: 2}).notNull(),
})