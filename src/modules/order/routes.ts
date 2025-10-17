import { createOrderController, updateOrderController, deleteOrderController,
     getOrdersByIdController, getAllOrdersController } from "./controller"
import { Elysia } from "elysia"
import {createOrderValidation, updateOrderValidation, idParamsValidation} from "./order.validation"

export const orderRoutes = (app: Elysia) => app
    .post("/order", createOrderController, {body: createOrderValidation})
    .put("/order/:id", updateOrderController, {params: idParamsValidation, body: updateOrderValidation})
    .delete("/order/:id", deleteOrderController, {params: idParamsValidation})
    .get("/order/:id", getOrdersByIdController, {params: idParamsValidation})
    .get("/order", getAllOrdersController)