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
}

export type OrderStatus = "pending" | "completed" | "cancelled" | "shipped" | "delivered" | "cancelled"


export const createOrder = async (order: CreateOrderInput) => {
    if (!order.itens || order.itens.length === 0) {
        throw new Error("Itens do pedido não fornecidos")
    }
    //verify if products exists
    const productIds = order.itens.map(itens => itens.product_id)

    const existingProducts = await db.select({
        id: tableproducts.id,
        nome: tableproducts.nome,
        price: tableproducts.price,
        stock: tableproducts.stock,
        image: tableproducts.image 
    }).from(tableproducts).where(inArray(tableproducts.id, productIds))

    const map = new Map(existingProducts.map(p => [p.id, p]));

    for (const { product_id, quantity } of order.itens) {
        const product = map.get(product_id);

        if (!product)
            throw new Error(`Produto não encontrado: ${product_id}`);

        if (product.stock < quantity)
            throw new Error(`Estoque insuficiente: ${product_id}`);
    }

    const [newOrder] = await db.insert(tableOrder).values({
        user_id: order.user_id,
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
    }))
    await db.insert(orderItens).values(orderItems)

    return newOrder
}
export const updateOrder = async (id: number, data: Partial<CreateOrderInput>) => {
    // 1. Buscar pedido existente
    const [existing] = await db
        .select()
        .from(tableOrder)
        .where(eq(tableOrder.id, id));

    if (!existing) {
        throw new Error("Pedido não encontrado");
    }

    // 2. Não permitir atualizar user_id (segurança)
    if (data.user_id && data.user_id !== existing.user_id) {
        throw new Error("Não é permitido alterar o usuário do pedido");
    }

    // 3. Validar itens (se enviados)
    if (data.itens !== undefined) {
        if (data.itens.length === 0) {
            throw new Error("Pedido não pode ter lista de itens vazia");
        }
    }

    // 4. Montar objeto final (somente campos enviados)
    const updatePayload: any = {};

    if (data.total !== undefined) updatePayload.total = data.total.toString();
    if (data.status !== undefined) updatePayload.status = data.status;
    if (data.itens !== undefined) updatePayload.itens = data.itens;

    if (Object.keys(updatePayload).length === 0) {
        throw new Error("Nenhum campo válido enviado para atualização");
    }

    // 5. Atualizar
    const [updated] = await db
        .update(tableOrder)
        .set(updatePayload)
        .where(eq(tableOrder.id, id))
        .returning();

    return updated;
};


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