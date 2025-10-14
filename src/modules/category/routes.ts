import { Elysia } from "elysia"
import { createCategoryController, getCategoryByIdController, updateCategoryController, deletCategoryController, categoryAllController } from "./controller"

export const categoryRoutes = (app:Elysia) => app
.post("/category", createCategoryController)
.get("/category", categoryAllController)
.get("/category/:id", getCategoryByIdController)
.put("/category/:id", updateCategoryController)
.delete("/category/:id", deletCategoryController)
