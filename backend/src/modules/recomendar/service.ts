import { db } from "../../db"
import { userInteractions, itemSimilarities } from "../../db/schema/eccomerce/recommendation"
import { tableproducts } from "../../db/schema/eccomerce/products"
import { sql, eq, desc, inArray } from "drizzle-orm"

// 
export const registerInteraction = async (data: {userId: string, itemId: number, interactionType: "view" | "cart" | "purchase"}) => {
  const interaction = await db.insert(userInteractions).values({
    userId: data.userId,
    itensId: data.itemId,
    interactionType: data.interactionType,
  }).returning()

  return interaction[0]
}

//historico de produtos clicados pelo usuario
export const getUserRecommendations = async (userId: string) => {
  const topInteractions = await db.select({
    itemId: userInteractions.userId,
    total: sql<number> `COUNT(*)`,
  })
  .from(userInteractions)
  .where(eq(userInteractions.userId, userId))
  .groupBy(desc(sql`COUNT(*)`))
  .limit(5)

  if (topInteractions.length === 0) {
    return []
  }

  const ids = topInteractions.map((i: any) => i.itens_id)

  if (ids.length === 0) return []

  const products = await db
    .select()
    .from(tableproducts)
    .where(inArray(tableproducts.id, ids))

    return products
}

 //similaridade por categoria
export const generateSimilarities = async () => {
  const products = await db.select().from(tableproducts)

  for (const base of products) {
    const similars = products.filter(
      p => p.category === base.category && p.id !== base.id
    )

    for (const similar of similars) {
      await db.insert(itemSimilarities).values({
        itemId: base.id,
        similarItemId: similar.id,
        score: "0.8",
      }).onConflictDoNothing()
    }
  }

  return { success: true, message: "Similaridades geradas com sucesso" }
}

// produtos parecidos
export const getSimilarProducts = async (itemId: number) => {
  const similars = await db
    .select()
    .from(itemSimilarities)
    .where(eq(itemSimilarities.itemId, itemId))

  const ids = similars.map(s => s.similarItemId)

  if (ids.length === 0) return []

  return await db
    .select()
    .from(tableproducts)
    .where(sql`${tableproducts.id} IN (${sql.join(ids)})`)
}

// RECOMENDAÇÃO HÍBRIDA (HISTÓRICO + PARECIDOS)
export const getHybridRecommendations = async (userId: string) => {
  const interactions = await db.execute(sql`
    SELECT itens_id, COUNT(*) as score
    FROM user_interactions
    WHERE user_id = ${userId}
    GROUP BY itens_id
    ORDER BY score DESC
    LIMIT 3
  `)

  const favoriteIds = interactions.rows.map((i: any) => i.itens_id)
  if (favoriteIds.length === 0) return []

  const similars = await db
    .select()
    .from(itemSimilarities)
    .where(sql`${itemSimilarities.itemId} IN (${sql.join(favoriteIds)})`)

  const similarIds = similars.map(s => s.similarItemId)
  const finalIds = [...new Set([...favoriteIds, ...similarIds])]

  return await db
    .select()
    .from(tableproducts)
    .where(sql`${tableproducts.id} IN (${sql.join(finalIds)})`)
}