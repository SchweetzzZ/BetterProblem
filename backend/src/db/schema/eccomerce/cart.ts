import { pgTable, serial, integer, timestamp, text, uuid} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm"
import { user } from "./auth-schema"
import { tableproducts } from "./products";

export const tablecart = pgTable ("cart", {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    user_id: uuid("user_id").notNull().references(() => user.id),//mudei para text por causa da tabela do betterAuth
    producuct_id: uuid("product_id").notNull().references(() => tableproducts.id),
    quantity: integer("quantity").notNull(),
    create_at: timestamp("create_at").notNull().defaultNow(),
})