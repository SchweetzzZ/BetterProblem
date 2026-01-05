import { t } from "elysia"

export const  createOrderValidation = t.Object({
    user_id: t.String(),
    itens: t.Array(t.Object({
        product_id: t.String(),
        quantity: t.Number(),
        price: t.Number(),
    })),
    total: t.Number(),
    status: t.Union([
        t.Literal("pending"),
        t.Literal("completed"),
        t.Literal("cancelled"), 
        t.Literal("shipped"),
        t.Literal("delivered")
      ])
})

export const updateOrderValidation = t.Partial(createOrderValidation)

export const idParamsValidation = t.Object({
    id: t.String()
})
