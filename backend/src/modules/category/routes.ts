/*import { Elysia } from "elysia"
import { createCategoryController, getCategoryByIdController, updateCategoryController, 
categoryAllController, deletCategoryController,getCategoryByNameController } from "./controller"
import { createCategoryValidation, updateCategoryValidation, idParamsValidation, nameParamsValidation } from "./category.validation"

export const categoriesRoutes = (app: Elysia) => app
    .post("/category", createCategoryController, {body: createCategoryValidation})
    .get("/category", categoryAllController)
    .get("/category/id/:id", getCategoryByIdController, {params: idParamsValidation})
    .get("/category/:name", getCategoryByNameController, {params: nameParamsValidation})
    .put("/category/:id", updateCategoryController, {params: idParamsValidation, body: updateCategoryValidation})
    .delete("/category/:id", deletCategoryController, {params: idParamsValidation})
    */
   // modules/category/routes.ts - CORRIGIDO
import { Elysia } from "elysia"
import { createCategoryController, getCategoryByIdController, updateCategoryController, 
categoryAllController, deletCategoryController, getCategoryByNameController } from "./controller"
import { createCategoryValidation, updateCategoryValidation, idParamsValidation, nameParamsValidation } from "./category.validation"

export const categoriesRoutes = (app: Elysia) => app
    .post("/category", createCategoryController, {body: createCategoryValidation})
    .get("/category", categoryAllController)
    .get("/category/id/:id", getCategoryByIdController, {params: idParamsValidation}) // ✅ /id/:id
    .get("/category/name/:name", getCategoryByNameController, {params: nameParamsValidation}) // ✅ /name/:name
    .put("/category/id/:id", updateCategoryController, {params: idParamsValidation, body: updateCategoryValidation}) // ✅ /id/:id
    .delete("/category/id/:id", deletCategoryController, {params: idParamsValidation}) // ✅ /id/:id
