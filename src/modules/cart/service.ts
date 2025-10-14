import { db } from "../../db";
import { tablecart } from "../../db/schema/eccomerce/cart";
import { eq } from "drizzle-orm";

interface CreateCartInput {
    user_id: string
    producuct_id: number
    quantity: number
}

export const createCart = async (cart: CreateCartInput) => {
    if (isNaN(Number(cart.user_id))) {
        throw new Error("User ID inválido")
    }
    if (isNaN(Number(cart.producuct_id)) || cart.producuct_id <= 0) {
        throw new Error("Product ID inválido")
    }
    if (isNaN(Number(cart.quantity)) || cart.quantity <= 0) {
        throw new Error("Quantity inválida")
    }
    const create = await db.insert(tablecart).values(cart).returning()
    if (!create) {
        throw new Error("Cart not created")
    }
    return create
}
export const updateCart = async (id: number, cart: Partial<CreateCartInput>) => {
    const update = await db.update(tablecart).set(cart).where(eq(tablecart.id,id)).returning()
    if (!update) {
        throw new Error("Cart not updated")
    }
    return update
}
export const deletCart = async (id: number) => {
    const delet = await db.delete(tablecart).where(eq(tablecart.id,id)).returning()
    if (!delet) {
        throw new Error("Cart not deleted")
    }
    return delet
}
export const getCartById = async (id: number) => {
    const result = await db.select().from(tablecart).where(eq(tablecart.id,id))
    if (!result) {
        throw new Error("Cart not found")
    }
    return result
}
export const getAllCart = async () => {
    const result = await db.select().from(tablecart)
    if (!result) {
        throw new Error("Cart not found")
    }
    return result
}