import { stripe } from "./stripe";
import { db } from "../../db";
import { eq } from "drizzle-orm";
import { tableOrder } from "../../db/schema/eccomerce/order";

interface PaymentItem {
  product_id: number;
  name: string;
  price: number;
  quantity: number;
}

export class StripeService {
  static async createCheckoutSession(orderId: number, items: PaymentItem[]) {
    console.log("Criando sessão de pagamento para orderId:", orderId);

    if (!items || items.length === 0) {
      console.warn("⚠️ Nenhum item enviado para o checkout Stripe.");
      throw new Error("Carrinho vazio");
    }

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: items.map((item) => ({
          price_data: {
            currency: "brl",
            product_data: { name: item.name },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        })),
        client_reference_id: orderId.toString(),
        success_url: process.env.SUCCESS_URL,
        cancel_url: process.env.CANCEL_URL,
      });

      console.log("✅ Sessão Stripe criada com sucesso:", session.id);
      return { url: session.url };
    } catch (err) {
      console.error("❌ ERRO ao criar sessão Stripe:", err);
      throw new Error("Falha ao criar sessão de pagamento na Stripe");
    }
  }

  static async handleWebhook(rawBody: string, signature: string) {
    console.log("🟢 [StripeService] Webhook recebido...");

    const secret = process.env.STRIPE_WEBHOOK_SECRET!;
    let event;

    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, secret);
    } catch (err) {
      console.error("❌ Erro ao validar webhook Stripe:", err);
      throw new Error("Webhook inválido");
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as any;
        const orderId = Number(session.client_reference_id);

        console.log(`💰 Pagamento confirmado pela Stripe para pedido ${orderId}`);

        try {
          await db.update(tableOrder)
            .set({ status: "paid" })
            .where(eq(tableOrder.id, orderId));

          console.log(`✅ Pedido ${orderId} atualizado para 'paid' com sucesso!`);
        } catch (dbErr) {
          console.error(`❌ Erro ao atualizar status do pedido ${orderId}:`, dbErr);
        }

        break;
      }

      default:
        console.log(`⚠️ Evento não tratado: ${event.type}`);
    }

    return { received: true };
  }
}
