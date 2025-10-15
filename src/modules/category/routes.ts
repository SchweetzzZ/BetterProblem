import { Elysia } from "elysia"
import { createCategoryController, getCategoryByIdController, updateCategoryController, 
categoryAllController, deletCategoryController } from "./controller"
import { createCategoryValidation, updateCategoryValidation, idParamsValidation } from "./category.validation"

export const categoriesRoutes = (app: Elysia) => app
    .post("/category", createCategoryController, {body: createCategoryValidation})
    .get("/category", categoryAllController)
    .get("/category/:id", getCategoryByIdController, {params: idParamsValidation})
    .put("/category/:id", updateCategoryController, {params: idParamsValidation, body: updateCategoryValidation})
    .delete("/category/:id", deletCategoryController, {params: idParamsValidation})