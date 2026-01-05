import { t } from "elysia";

export const createCartValidation = t.Object({
    user_id: t.String(),
    producuct_id: t.String({minLength: 1}),//minLength vai fazer nao ter negativos
    quantity: t.Integer({minLength: 1}),//minLength vai fazer nao ter negativos
})

export const updateCartValidation = t.Partial(createCartValidation)

export const idParamsValidation = t.Object({
    id: t.String(),
})
