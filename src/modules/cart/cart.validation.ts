import { t } from "elysia";

export const createCartValidation = t.Object({
    user_id: t.String(),
    producuct_id: t.Numeric({minLength: 1}),//minLength vai fazer nao ter negativos
    quantity: t.Numeric({minLength: 1}),//minLength vai fazer nao ter negativos
})

export const updateCartValidation = t.Partial(createCartValidation)

export const idParamsValidation = t.Object({
    id: t.Numeric(),
})

