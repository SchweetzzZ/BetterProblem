import { t } from "elysia";

export const stripeCheckoutValidation = t.Object({
  orderId: t.Number({
    minimum: 1,
    error: "ID do pedido deve ser um número válido"
  }),
  items: t.Array(
    t.Object({
      product_id: t.Number({ minimum: 1 }),
      name: t.String({ minLength: 1 }),
      price: t.Number({ minimum: 0.01 }), // Preço mínimo de 1 centavo
      quantity: t.Number({ minimum: 1 }) // Quantidade mínima de 1
    }),
    { minItems: 1, error: "Carrinho não pode estar vazio" }
  )
});

export const stripeWebhookValidation = {
  headers: t.Object({
    'stripe-signature': t.String({ minLength: 1 })
  })
};