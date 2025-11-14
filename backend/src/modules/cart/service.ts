import { db } from "../../db";
import { tablecart } from "../../db/schema/eccomerce/cart";
import { eq, and } from "drizzle-orm";
import { tableproducts } from "../../db/schema/eccomerce/products";

interface CreateCartInput {
    user_id: string
    producuct_id: number
    quantity: number
}

export const createCart = async (cart: CreateCartInput) => {
    const product = await db.select().from(tableproducts).where(eq(tableproducts.id, cart.producuct_id))
    if (!product || product.length === 0) {
        throw new Error("Product nao existe")
    }
    if (product[0].stock < cart.quantity) {
        throw new Error("Quantidade insuficiente")
    }


    const [existing] = await db.select().from(tablecart).where(and
    (eq(tablecart.user_id, cart.user_id), 
    eq(tablecart.producuct_id, cart.producuct_id)))


    if (existing) {
        await updateCart(existing.id, { quantity: existing.quantity + cart.quantity })
        return existing
    }

    const create = await db.insert(tablecart).values(cart).returning()
    
    if (!create || create.length === 0) {
        throw new Error("Cart nao foi criado")
    }
    return create[0] ?? null
}

export const updateCart = async (id: number, cart: Partial<CreateCartInput>) => {
    const update = await db.update(tablecart).set(cart).where(eq(tablecart.id,id)).returning()
    if (!update || update.length === 0) {
        throw new Error("Cart nao foi atualizado")
    }
    return update[0] ?? null
}

export const deletCart = async (id: number) => {
    const delet = await db.delete(tablecart).where(eq(tablecart.id,id)).returning()
    if (!delet || delet.length === 0) {
        throw new Error("Cart nao foi deletado")
    }
    return delet[0] ?? null
}

export const getCartById = async (id: number) => {
    const result = await db.select().from(tablecart).where(eq(tablecart.id,id))
    if (!result || result.length === 0) {
        throw new Error("Cart nao foi encontrado")
    }
    return result[0] ?? null
}

export const getAllCart = async () => {
    const result = await db.select().from(tablecart)
    if (!result || result.length === 0) {
        throw new Error("Cart nao foi encontrado")
    }
    return result ?? null
}