import { t } from "elysia"

export const createProductValidation = t.Object({
    nome: t.String({maxLength: 255}),
    price: t.Number({precision: 10, scale: 2}),
    description: t.String({maxLength: 255}),
    image: t.String({maxLength: 255}),
    category: t.String({maxLength: 255}),
    stock: t.Number({precision: 10, scale: 2}),
    create_at: t.Date(),
    update_at: t.Date()
})

export const updateProductValidation = t.Partial(createProductValidation)

// Use t.String() para params e converta no controller
export const idParamsValidation = t.Object({
    id: t.String() // Mude para String
  });