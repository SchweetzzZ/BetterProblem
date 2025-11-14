import { t } from "elysia";

export const stripeCheckoutValidation = t.Object({
  user_id: t.String({ 
    minLength: 1, 
    error: "User ID é obrigatório" 
  })
});

export const stripeWebhookValidation = {
  headers: t.Object({
    'stripe-signature': t.String({ minLength: 1 })
  })
};