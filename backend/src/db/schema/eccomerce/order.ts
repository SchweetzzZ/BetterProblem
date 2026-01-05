import { pgTable, decimal, varchar, json, timestamp, uuid, text} from "drizzle-orm/pg-core";
import { user } from "./auth-schema"
import { tableproducts } from "./products"
import { tablecupons } from "./cupons"
import { sql } from "drizzle-orm"

export const tableOrder = pgTable ("order", {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    user_id: text("user_id").notNull().references(() => user.id),
    total: decimal("total", {precision: 10, scale: 2, mode: "number"}).notNull(),
    status: varchar("status", {length: 255}).default("pending"),
    itens: json("itens").notNull(),
    creat_at: timestamp("create_at").defaultNow(),
    cupon_id: uuid("cupon_id").references(() => tablecupons.id),
    discount: decimal("discount", {precision: 10, scale: 2, mode: "number"}).default(sql`0`)
})


