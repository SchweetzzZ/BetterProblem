import { t } from "elysia";

export const createCartValidation = t.Object({
    userId: t.String(),
    productId: t.String(),
    quantity: t.String(),
})

export const updateCartValidation = t.Partial(createCartValidation)

export const idParamsValidation = t.Object({
    id: t.Numeric(),
})

