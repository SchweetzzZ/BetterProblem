import { db } from "../../../db";
import { tablecart } from "../../../db/schema/eccomerce/cart";
import { tableOrder } from "../../../db/schema/eccomerce/order";
import { tableproducts } from "../../../db/schema/eccomerce/products";
import { orderItens } from "../../../db/schema/eccomerce/order_items";
import { eq } from "drizzle-orm";
import { sql } from "drizzle-orm";

export const finalBotom = async (qtStock: number, userId: string) => {
    await db.transaction(async(tx) => {
        const cartItems = await tx.select().from(tablecart).where(eq(tablecart.user_id, userId))

        if (!cartItems || cartItems.length === 0) {
            throw new Error("Carrinho nao encontrado")
        }

        let total = 0
        const failedProducts: number[] = []
        const orderItemsData = []

        for (const item of cartItems) {
           
            const [updateProduct] = await tx.update(tableproducts).
            set({stock: sql`${tableproducts.stock} - ${item.quantity}`}).
            where(sql `${tableproducts.id} = ${item.producuct_id} AND ${tableproducts.stock} >= ${item.quantity}}`).returning({
                id: tableproducts.id,
                price: tableproducts.price,
                name: tableproducts.nome
            })
            
            if (!updateProduct) {
                throw new Error("Produto nao encontrado")
            }

            if (updateProduct) {
                const itemTotal = Number(updateProduct.price) * item.quantity
                total += itemTotal
                
                orderItemsData.push({
                    product_id: updateProduct.id,
                    quantity: item.quantity,
                    price: updateProduct.price
                })
            } else {
                failedProducts.push(item.producuct_id)
            }
        }
        
            if (failedProducts.length > 0) {
            throw new Error(`Erro ao finalizar a compra, estoque insuficiente: ${failedProducts.join(", ")}`)
        }
        
        const [order] = await tx.insert(tableOrder).values({
            user_id: Number(userId),
            total: total.toString(),
            status: "complete",
            itens: orderItemsData,
            creat_at: new Date()
        }).returning({
            id: tableOrder.id
        })
        
        if (orderItemsData.length > 0) {
            await tx.insert(orderItens).values(
              orderItemsData.map(item => ({
                order_id: order.id,
                product_id: item.product_id,
                quantity: item.quantity,
                price: item.price,
              }))
            )
        }
        await tx.delete(tablecart).where(eq(tablecart.user_id, userId))

        return {
            orderId: order.id,
            total: total,
            items: orderItemsData.length
        }
    })
}
