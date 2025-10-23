import { Context } from "elysia";
import { StripeService } from "./service";
import { stripeCheckoutValidation, stripeWebhookValidation } from "./stripe.validation";

type CheckoutBody = typeof stripeCheckoutValidation.static;

export const createCheckoutSessionController = async (ctx: Context<{ body: CheckoutBody }>) => {
  try {
    const { orderId, items } = ctx.body;

    // Validação adicional do carrinho
    if (!items || items.length === 0) {
      ctx.set.status = 400;
      return {
        success: false,
        message: "Carrinho vazio - não é possível criar sessão de pagamento",
        data: null
      };
    }

    const session = await StripeService.createCheckoutSession(orderId, items);

    ctx.set.status = 201;
    return {
      success: true,
      message: "Sessão de checkout criada com sucesso",
      data: session
    };

  } catch (error: any) {
    console.error("[createCheckoutSessionController] Erro:", error);

    ctx.set.status = 500;
    return {
      success: false,
      message: "Erro ao criar sessão de pagamento",
      data: null
    };
  }
}

export const handleWebhookController = async (ctx: Context) => {
  try {
    const signature = ctx.headers['stripe-signature'];
    
    if (!signature) {
      ctx.set.status = 400;
      return {
        success: false,
        message: "Assinatura do webhook não fornecida",
        data: null
      };
    }

    // O body precisa ser raw para validação do Stripe
    const rawBody = await ctx.request.text();
    
    const result = await StripeService.handleWebhook(rawBody, signature);

    ctx.set.status = 200;
    return result;

  } catch (error: any) {
    console.error("[handleWebhookController] Erro:", error);

    ctx.set.status = 400;
    return {
      success: false,
      message: `Webhook Error: ${error.message}`,
      data: null
    };
  }
}