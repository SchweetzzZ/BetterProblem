import { db } from "../../db";
import { tablecart } from "../../db/schema/eccomerce/cart";
import { eq } from "drizzle-orm";

interface CreateCartInput {
    user_id: string
    producuct_id: number
    quantity: number
}

export const createCart = async (cart: CreateCartInput) => {
    const create = await db.insert(tablecart).values(cart).returning()
    if (!create || create.length === 0) {
        throw new Error("Cart not created")
    }
    return create[0] ?? null
}

export const updateCart = async (id: number, cart: Partial<CreateCartInput>) => {
    const update = await db.update(tablecart).set(cart).where(eq(tablecart.id,id)).returning()
    if (!update || update.length === 0) {
        throw new Error("Cart not updated")
    }
    return update[0] ?? null
}

export const deletCart = async (id: number) => {
    const delet = await db.delete(tablecart).where(eq(tablecart.id,id)).returning()
    if (!delet || delet.length === 0) {
        throw new Error("Cart not deleted")
    }
    return delet[0] ?? null
}

export const getCartById = async (id: number) => {
    const result = await db.select().from(tablecart).where(eq(tablecart.id,id))
    if (!result || result.length === 0) {
        throw new Error("Cart not found")
    }
    return result[0] ?? null
}

export const getAllCart = async () => {
    const result = await db.select().from(tablecart)
    if (!result || result.length === 0) {
        throw new Error("Cart not found")
    }
    return result ?? null
}