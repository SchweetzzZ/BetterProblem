import { pgTable, serial, text, integer, timestamp, numeric, boolean, varchar } from "drizzle-orm/pg-core"

export const tablecupons = pgTable("cupons", {
    id: serial("id").primaryKey(),
    code: varchar("code").notNull(),
    discount_percent: numeric("discount_percent"),//descontar a partir de %
    discount_value: numeric("discount_value"),//descontar a partir de valor
    expires_at: timestamp("expires_at").notNull(),
    is_active: boolean("is_active").notNull().default(true),
    usage_limit: integer("usage_limit").notNull().default(1),
    usage_count: integer("usage_count").notNull().default(0),
})