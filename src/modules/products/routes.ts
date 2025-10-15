import { Elysia } from "elysia"
import { 
  createProductController,
  getProductByIdController,
  updateProductController,
  deletProductsController,
  gettAllProductsController 
} from "./controllers"
import { createProductValidation, updateProductValidation, idParamsValidation } from "./products.validation"

export const productsRoutes = (app: Elysia) => app
  .post("/products", createProductController, {
    body: createProductValidation
  })
  .get("/products", gettAllProductsController)
  .get("/products/:id", getProductByIdController, {
    params: idParamsValidation
  })
  .put("/products/:id", updateProductController, {
    params: idParamsValidation,
    body: updateProductValidation
  })
  .delete("/products/:id", deletProductsController, {
    params: idParamsValidation
  })