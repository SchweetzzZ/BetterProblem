import { pgTable, text, serial, integer, timestamp, decimal, uniqueIndex } from "drizzle-orm/pg-core";

export const userInteractions = pgTable("user_interactions", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    itensId: integer("item_id").notNull(),
    interactionType: text("interaction_type").notNull(),
    createdAt: timestamp('created_at')
})

export const itemSimilarities = pgTable(
    "item_similarities",
    {
      id: serial("id").primaryKey(),
      itemId: integer("item_id").notNull(),
      similarItemId: integer("similar_item_id").notNull(),
      score: decimal("score", { precision: 5, scale: 4 }).notNull(),
    },
    //evitar duplicatas de pares
    (table) => ({
      uniquePair: uniqueIndex("item_similarities_unique_pair").on(
        table.itemId,
        table.similarItemId
      ),
    })
);