import { db } from '../../db';
import { tableOrder } from '../../db/schema/eccomerce/order';
import { tableproducts } from '../../db/schema/eccomerce/products';
import { orderItens } from '../../db/schema/eccomerce/order_items';
import { eq, inArray } from 'drizzle-orm';


interface CreateOrderInput {
    user_id: string
    itens: OrderItem[]
    total: number
    status: OrderStatus
}

export interface OrderItem {
    product_id: number
    quantity: number
    price: number
    name: string
    imageURL: string
}

export type OrderStatus = "pending" | "completed" | "cancelled" | "shipped" | "delivered" | "cancelled"


export const createOrder = async (order: CreateOrderInput) => {
    if (!order.itens || order.itens.length === 0) {
        throw new Error("Itens do pedido não fornecidos")
    }
    //olhar se os produtos existem
    const productIds = order.itens.map(itens => itens.product_id)

    const existingProducts = await db.select({
        id: tableproducts.id,
        nome: tableproducts.nome,
        price: tableproducts.price,
        stock: tableproducts.stock,
        image: tableproducts.image 
    }).from(tableproducts).where(inArray(tableproducts.id, productIds))

    if (existingProducts.length !== productIds.length) {
        const existingId = existingProducts.map(product => product.id)
        const missingIds = productIds.filter(id => !existingId.includes(id))
        throw new Error(`Produtos não encontrados: ${missingIds.join(', ')}`);
    }

    for (const item of order.itens) {
        const product = existingProducts.find(p => p.id === item.product_id)
        if (product && Number(product.stock) < item.quantity) {
            throw new Error(`Quantidade insuficiente para o produto ${item.product_id}`)
        }
    }

    const [newOrder] = await db.insert(tableOrder).values({
        user_id: Number(order.user_id),
        total: order.total.toString(),
        status: order.status || "pending",
        itens: order.itens, 
        creat_at: new Date()
      }).returning();

      if (!newOrder) {
        throw new Error("Erro ao criar o pedido")
      }

    const orderItems = order.itens.map(item => ({
        order_id: newOrder.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price.toString(),
        name: item.name,
        image: item.imageURL
    }))
    await db.insert(orderItens).values(orderItems)

    return newOrder
}
export const updateOrder = async (id: number, order: Partial<CreateOrderInput>) => {
    const updatedOrder = await db.update(tableOrder).set({
        user_id: Number(order.user_id),
        total: order.total?.toString(),
        status: order.status || "pending",
        itens: order.itens,
        creat_at: new Date()
    }).where(eq(tableOrder.id, id)).returning()
    return updatedOrder[0]
}

export const deleteOrder = async (id: number) => {
    const deleted = await db.delete(tableOrder).where(eq(tableOrder.id, id)).returning()

    if (!deleted || deleted.length === 0) {
        throw new Error("Pedido nao encontrado")
    }
    
    return deleted
}

export const getOrdersById = async (id: number) => {
    const result = await db.select().from(tableOrder).where(eq(tableOrder.id, id))

    if (!result || result.length === 0) {
        throw new Error("Pedido nao encontrado")
    }
    
    return result
}

export const getAllOrders = async () => {
    const result = await db.select().from(tableOrder)
    
    if (!result || result.length === 0) {
        throw new Error("Pedidos nao encontrados")
    }
    return result
}