import { stripe } from "./stripe"
import { db } from "../../db"
import { eq } from 'drizzle-orm';
import { t, Elysia } from "elysia"
import { tableOrder} from "../../db/schema/eccomerce/order"
import { orderItens } from "../../db/schema/eccomerce/order_items"

interface PaymentItem {
    product_id: number
    name: string
    price: number
    quantity: number
}

export class StripeService {
    static async createCheckoutSession(orderId: number, items: PaymentItem[]) {
        if (!items || items.length === 0) {
          throw new Error("Carrinho vazio");
        }
    
        // Cria a sessão na Stripe
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          line_items: items.map((item) => ({
            price_data: {
              currency: "brl",
              product_data: { name: item.name },
              unit_amount: Math.round(item.price * 100), // Stripe usa centavos
            },
            quantity: item.quantity, 
            })),
            client_reference_id: orderId.toString(),
            success_url: process.env.SUCCESS_URL,
            cancel_url: process.env.CANCEL_URL,
        })
        return { url: session.url}
    }
    /**
   * Processa os webhooks da Stripe
   * Atualiza o status do pedido para "paid"
   */
    static async handleWebhook(rawBody: string, signature: string) {
        const secret = process.env.STRIPE_WEBHOOK_SECRET!;
        const event = stripe.webhooks.constructEvent(rawBody, signature, secret);
    
        switch (event.type) {
          case "checkout.session.completed": {
            const session = event.data.object as any;
            const orderId = Number(session.client_reference_id);
    
            // Atualiza status do pedido para "paid"
            await db.update(tableOrder)
              .set({ status: "paid" })
              .where(eq(tableOrder.id, orderId));
    
            console.log(`✅ Pedido ${orderId} confirmado e atualizado para 'paid'`);
    
            break;
          }
    
          default:
            console.log(`⚠ Evento não tratado: ${event.type}`);
        }
    
        return { received: true};
       }
}