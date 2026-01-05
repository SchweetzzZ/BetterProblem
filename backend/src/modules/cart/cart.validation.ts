import { t } from "elysia";

export const createCartValidation = t.Object({
    producuct_id: t.String({ minLength: 1 }),
    quantity: t.Integer({ minimum: 1 }),
});

export const updateCartValidation = t.Object({
    quantity: t.Integer({ minimum: 0 }),
});

export const idParamsValidation = t.Object({
    id: t.String(),
});
