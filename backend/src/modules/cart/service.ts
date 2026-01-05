import { db } from "../../db"
import { tablecart } from "../../db/schema/eccomerce/cart"
import { tableproducts } from "../../db/schema/eccomerce/products"
import { eq, and } from "drizzle-orm"
import { sql } from "drizzle-orm"

interface CreateCartInput {
  user_id: string
  producuct_id: string
  quantity: number
}

export const createCart = async (user_id: string, cart: CreateCartInput) => {
  const product = await db
    .select()
    .from(tableproducts)
    .where(eq(tableproducts.id, cart.producuct_id))

  if (!product || product.length === 0) {
    throw new Error("Produto não existe")
  }

  if (product[0].stock < cart.quantity) {
    throw new Error("Quantidade insuficiente")
  }

  const [existing] = await db
    .select()
    .from(tablecart)
    .where(
      and(
        eq(tablecart.user_id, cart.user_id),
        eq(tablecart.producuct_id, cart.producuct_id)
      )
    )

  if (existing) {
    const updated = await updateCart(
      existing.id,
      { quantity: existing.quantity + cart.quantity },
      cart.user_id
    )
    return updated
  }

  if (cart.quantity <= 0) {
    throw new Error("Quantidade inválida")
  }

  const created = await db
    .insert(tablecart)
    .values(cart)
    .returning()

  if (!created || created.length === 0) {
    throw new Error("Cart não foi criado")
  }

  return created[0]
}

export const updateCart = async (
  id: string,
  data: Partial<CreateCartInput>,
  userId: string
) => {
  const existing = await db.query.tablecart.findFirst({
    where: eq(tablecart.id, id)
  })

  if (!existing) {
    throw new Error("Carrinho não existe")
  }

  if (existing.user_id !== userId) {
    throw new Error("Sem permissão")
  }

  if (data.quantity !== undefined) {
    if (data.quantity < 0) {
      throw new Error("Quantidade inválida")
    }

    if (data.quantity === 0) {
      await db.delete(tablecart).where(eq(tablecart.id, id))
      return { deleted: true }
    }

    const product = await db.query.tableproducts.findFirst({
      where: eq(tableproducts.id, existing.producuct_id)
    })

    if (!product || data.quantity > product.stock) {
      throw new Error("Estoque insuficiente")
    }
  }

  const updated = await db
    .update(tablecart)
    .set(data)
    .where(eq(tablecart.id, id))
    .returning()

  return updated[0]
}
export const getAllCart = async () => {
  const carts = await db.select().from(tablecart)
  return carts
}

export const getCartByUSerId = async (id: string, userId: string) => {
  const cart = await db.select().from(tablecart).where(and(eq(tablecart.id, id),eq(tablecart.user_id, userId)))
  if(!cart || cart.length === 0){
    throw new Error("Cart nao encontrado")
  }
  return cart
}

export const deletCart = async (id: string, userId: string) => {
  const deleted = await db.delete(tablecart).where(eq(tablecart.id, id))
  if(!deleted){
    throw new Error("Cart nao encontrado")
  }
  return deleted
}