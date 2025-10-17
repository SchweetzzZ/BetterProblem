import { creteCartController, updateCartController, deletCartController, 
    getCartByIdController, getAllCartController } from "./controller";
import { Elysia } from "elysia";
import { createCartValidation, updateCartValidation, idParamsValidation } from "./cart.validation";

export const cartRoutes = (app: Elysia) => app
    .post("/cart", creteCartController, {body: createCartValidation})
    .put("/cart/:id", updateCartController, {body: updateCartValidation, params: idParamsValidation})
    .delete("/cart/:id", deletCartController, {params: idParamsValidation})
    .get("/cart/:id", getCartByIdController, {params: idParamsValidation})
    .get("/cart", getAllCartController)