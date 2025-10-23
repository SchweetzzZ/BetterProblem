import { db } from "../../../db";
import { tablecart } from "../../../db/schema/eccomerce/cart";
<<<<<<< HEAD
import { tableproducts } from "../../../db/schema/eccomerce/products";
import { tableOrder } from "../../../db/schema/eccomerce/order";
import { orderItens } from "../../../db/schema/eccomerce/order_items";
import { eq, and, gte, sql } from "drizzle-orm";
import { StripeService } from "../../stripe/service"; // ← integração Stripe

export const finalizarCompraService = async (user_id: string) => {
  return await db.transaction(async (tx) => {
    // 1️⃣ Busca o carrinho
    const resultCart = await tx
      .select()
      .from(tablecart)
      .where(eq(tablecart.user_id, user_id));

    if (resultCart.length === 0) {
      throw new Error("Carrinho vazio");
    }

    // 2️⃣ Valida estoque e calcula total
    let total = 0;

    for (const item of resultCart) {
      const updatedRows = await tx
        .update(tableproducts)
        .set({
          stock: sql`${tableproducts.stock} - ${item.quantity}`,
        })
        .where(
          and(
            eq(tableproducts.id, item.producuct_id),
            gte(tableproducts.stock, item.quantity)
          )
        );

      if (updatedRows.rowCount === 0) {
        throw new Error(`Estoque insuficiente para o produto ${item.producuct_id}`);
      }

      const [product] = await tx
        .select()
        .from(tableproducts)
        .where(eq(tableproducts.id, item.producuct_id));

      total += Number(product.price) * item.quantity;
    }

    // 3️⃣ Monta os itens para salvar no pedido
    const itensJSON = await Promise.all(
      resultCart.map(async (item) => {
        const [product] = await tx
          .select()
          .from(tableproducts)
          .where(eq(tableproducts.id, item.producuct_id));

        return {
          product_id: item.producuct_id,
          quantity: item.quantity,
          price: Number(product.price),
          name: product.nome, // importante pro Stripe
        };
      })
    );

    // 4️⃣ Cria o pedido no banco (status "pending")
    const [order] = await tx
      .insert(tableOrder)
      .values({
        user_id: Number(user_id),
        total: total.toFixed(2),
        status: "pending",
        itens: itensJSON,
        creat_at: new Date(),
      })
      .returning();

    // 5️⃣ Cria registros de itens do pedido
    const orderItemsData = itensJSON.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price.toString(),
    }));

    await tx.insert(orderItens).values(orderItemsData);

    // 6️⃣ Limpa o carrinho
    await tx.delete(tablecart).where(eq(tablecart.user_id, user_id));

    // 7️⃣ 🔥 Cria a sessão de pagamento na Stripe
    const stripeSession = await StripeService.createCheckoutSession(
      order.id,
      itensJSON.map((item) => ({
        product_id: item.product_id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }))
    );

    // 8️⃣ Retorna a URL pro front redirecionar
    return {
      success: true,
      message: "Pedido criado e sessão de pagamento iniciada com sucesso!",
      order_id: order.id,
      total: total.toFixed(2),
      checkoutUrl: stripeSession.url, // 🔗 para o front-end
    };
  });
};
=======
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
>>>>>>> ca84f7f86862960a8272a255e9273a841afc4085
