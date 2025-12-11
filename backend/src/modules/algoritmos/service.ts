import { db } from "../../db"
import { userInteractions, itemSimilarities } from "../../db/schema/eccomerce/recomendation"
import { tableproducts } from "../../db/schema/eccomerce/products"
import { eq, desc, sql, inArray } from "drizzle-orm"

// REGISTRAR INTERAÇÃO DO USUÁRIO

export const registerInteraction = async (data: {user_id: string, item_id: number, 
  interactionType: "view" | "cart" | "purchase"})=> {

    const result = await db.insert(userInteractions).values({
      userId: data.user_id,
      itensId: data.item_id,
      interactionType: data.interactionType
    }).returning()

    if (result.length === 0) {
      throw new Error ("Erro ao inserir interação")
    }
    return result
} 

// RECOMENDAÇÃO BASEADA NO USUÁRIO(ordernar por mais interações)

export const getUserTopProducts = async (userId: string) => {
  // Contar interações por produto
  const topInteractions = await db
    .select({
      itemId: userInteractions.itensId,
      total: sql<number>`COUNT(*)`,
    })
    .from(userInteractions)
    .where(eq(userInteractions.userId, userId))
    .groupBy(userInteractions.itensId)
    .orderBy(desc(sql`COUNT(*)`))
    .limit(5);

  if (topInteractions.length === 0) {
    return [];
  }

  //  Extrair apenas os IDs dos produtos
  const ids = topInteractions.map((i) => i.itemId);

  //  Buscar os produtos completos
  const products = await db
    .select()
    .from(tableproducts)
    .where(inArray(tableproducts.id, ids));

  return products;
};

export const getFavoriteCategory = console.log("nada")

/*export const getUSerHistoric = async (userId: string) => {
  const topInteraction = await db.select({
    category: tableproducts.category,
    total: sql<number>`SUM(${recomendation.score})`
  })
  .from(recomendation)
  .innerJoin(
    tableproducts,
    eq(recomendation.product.id, tableproducts.id)
  )
  .where(eq(recomendation.user.id, userId))
  .groupBy(tableproducts.category)
  .orderBy(desc(sql`SUM(${recomendation.score})`))
  .limit(5)

  if(topInteraction.length === 0) {
    return []
  }

  //pegar apenas os ids dos produtos
  const ids = topInteraction.map((itens) => itens.item.id)

  const products = await db.select().from(tableproducts).where(inArray(tableproducts.id, ids))

  return products
}*/
