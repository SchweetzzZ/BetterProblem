import { Context } from "elysia";
import { StripeService } from "./service";
import { finalizarCompraService } from "../utils/finalBotom/botom"; 
import { stripeCheckoutValidation, stripeWebhookValidation } from "./stripe.validation";

type CheckoutBody = typeof stripeCheckoutValidation.static;

export const createCheckoutSessionController = async (ctx: Context<{ body: CheckoutBody }>) => {
  try {
    const { user_id } = ctx.body; 

    const result = await finalizarCompraService(user_id);

    ctx.set.status = 201;
    return {
      success: true,
      message: "Sessão de checkout criada com sucesso",
      data: result 
    };

  } catch (error: any) {
    console.error("[createCheckoutSessionController] Erro:", error);

    ctx.set.status = 500;
    return {
      success: false,
      message: error.message || "Erro ao criar sessão de pagamento",
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