import { Elysia } from "elysia"
import { createProductController,getProductByIdController,updateProductController,deletProductsController,gettAllProductsController } from "./controllers"

export const productsRoutes = (app:Elysia) => app
.post("/products", createProductController)
.get("/products", gettAllProductsController)
.get("/products/:id", getProductByIdController)
.put("/products/:id", updateProductController)
.delete("/products/:id", deletProductsController)