import { t } from "elysia"

export const couponValidation = t.Object({
    code: t.String(),
    orderTotal: t.Number()
})