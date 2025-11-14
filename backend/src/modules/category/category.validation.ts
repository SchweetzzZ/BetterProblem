import { t } from "elysia";

export const createCategoryValidation = t.Object({
    name: t.String({ minLength: 1 }),
    description: t.String({ minLength: 1 })
});

export const updateCategoryValidation = t.Partial(createCategoryValidation);

export const idParamsValidation = t.Object({
    id: t.Numeric()
});