import { pgTable,  serial, integer, decimal, varchar } from "drizzle-orm/pg-core";
import { tableOrder } from "./order";
import { tableproducts } from "./products";

export const orderItens = pgTable("order_itens", {
    id: serial("id").primaryKey(),
    order_id: integer("order_id").notNull().references(() => tableOrder.id, {onDelete: "cascade"}),
    product_id: integer("product_id").notNull().references(() => tableproducts.id),
    quantity: integer("quantity").notNull(),
    price: decimal("price", {precision: 10, scale: 2}).notNull(),
    name: varchar("name", {length: 255}).notNull(),
    image: varchar("image", {length: 255}).notNull(),
})