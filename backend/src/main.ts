import { Elysia } from "elysia";
import {cors} from "@elysiajs/cors"
import { auth } from "./modules/auth/auth"
import { productsRoutes } from "./modules/products/routes"
import { categoriesRoutes } from "./modules/category/routes"
import { cartRoutes } from "./modules/cart/routes"
import { orderRoutes } from "./modules/order/routes"
import { stripeWebhookRoutes, stripeFinalRoute } from "./modules/stripe/routes"

export const createCoreApi = () => {
    const app = new Elysia()
  .use(cors({
    origin: "http://localhost:5173",//lembrar de alterar em produção
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type, Authorization"]
  }))
  .get("/health", () => ({ status: "OK", message: "Server is running" }))

  .mount(auth.handler)
  .use(productsRoutes)
  .use(categoriesRoutes)
  .use(cartRoutes)
  .use(orderRoutes)
  //.use(stripeWebhookRoutes)
  //.use(stripeFinalRoute)

  return app
}
export type Coreapi = Awaited<ReturnType<typeof createCoreApi>>//precisa chamar uma função.