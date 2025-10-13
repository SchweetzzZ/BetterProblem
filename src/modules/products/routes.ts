import { Elysia } from "elysia"
import { createProductController,getProductByIdController } from "./controllers"

export const productsRoutes = (app:Elysia) => app
.post("/products", createProductController)
.get("/products/:id", getProductByIdController)