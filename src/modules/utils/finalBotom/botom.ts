import { db } from "../../../db";
import { tablecart } from "../../../db/schema/eccomerce/cart";
import { tableproducts } from "../../../db/schema/eccomerce/products";
import { tableOrder } from "../../../db/schema/eccomerce/order";
import { orderItens } from "../../../db/schema/eccomerce/order_items";
import { eq, and, gte, sql } from "drizzle-orm";
import { StripeService } from "../../stripe/service";

export const finalizarCompraService = async (user_id: string) => {
  console.log("[SERVICE] Iniciando finalização de compra para usuário:", user_id);

  try {
    const result = await db.transaction(async (tx) => {
      console.log("Buscando carrinho do usuário...");

      // 1️⃣ Busca o carrinho
      const resultCart = await tx
        .select()
        .from(tablecart)
        .where(eq(tablecart.user_id, user_id));

      if (resultCart.length === 0) {
        console.warn("Carrinho vazio para o usuário:", user_id);
        throw new Error("Carrinho vazio");
      }

      console.log(`${resultCart.length} item(ns) encontrado(s) no carrinho.`);

      // 2️⃣ Valida estoque e calcula total
      let total = 0;

      for (const item of resultCart) {
        console.log(`Verificando estoque do produto ID ${item.producuct_id}...`);

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
          console.error(`Estoque insuficiente para o produto ${item.producuct_id}`);
          throw new Error(`Estoque insuficiente para o produto ${item.producuct_id}`);
        }

        const [product] = await tx
          .select()
          .from(tableproducts)
          .where(eq(tableproducts.id, item.producuct_id));

        total += Number(product.price) * item.quantity;

        console.log(`Estoque atualizado. Produto: ${product.nome}, Quantidade: ${item.quantity}`);
      }

      console.log("Total calculado:", total);

      // 3️⃣ Monta os itens para salvar no pedido
      console.log("Montando itens do pedido...");
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
            name: product.nome,
          };
        })
      );

      // 4️⃣ Cria o pedido
      console.log(" Criando pedido no banco...");
      const [order] = await tx
        .insert(tableOrder)
        .values({
          user_id,
          total: total.toFixed(2),
          status: "pending",
          itens: itensJSON,
          creat_at: new Date(),
        })
        .returning();

      console.log("Pedido criado com ID:", order.id);

      // 5️⃣ Cria registros de itens
      const orderItemsData = itensJSON.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price.toString(),
      }));

      console.log(`Inserindo ${orderItemsData.length} item(ns) em order_items...`);
      await tx.insert(orderItens).values(orderItemsData);

      // 6️⃣ Limpa o carrinho
      console.log("Limpando carrinho do usuário...");
      await tx.delete(tablecart).where(eq(tablecart.user_id, user_id));

      // 7️⃣ Cria sessão Stripe
      console.log("Criando sessão de pagamento na Stripe...");
      const stripeSession = await StripeService.createCheckoutSession(
        order.id,
        itensJSON.map((item) => ({
          product_id: item.product_id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        }))
      );

      console.log("Sessão Stripe criada com sucesso:", stripeSession.url);

      // 8️⃣ Retorna sucesso
      return {
        success: true,
        message: "Pedido criado e sessão de pagamento iniciada com sucesso!",
        order_id: order.id,
        total: total.toFixed(2),
        checkoutUrl: stripeSession.url,
      };
    });

    console.log("Transação finalizada com sucesso!");
    return result;
  } catch (error) {
    console.error("ERRO FATAL na finalização de compra:", error);
    throw new Error("Falha ao processar a compra. Verifique os logs do servidor.");
  }
};