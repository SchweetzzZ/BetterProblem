import { pgTable,  serial, integer, decimal, varchar, json, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const tableOrder = pgTable ("order", {
    id: serial("id").primaryKey(),
    user_id: integer("user_id").notNull().references(() => user.id),
    total: decimal("total", {precision: 10, scale: 2}).notNull(),
    status: varchar("status", {length: 255}).default("pending"),
    itens: json("itens").notNull(),
    creat_at: timestamp("create_at").defaultNow()
})