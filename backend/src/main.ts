import { Elysia } from "elysia";
import {cors} from "@elysiajs/cors"
import { auth } from "./modules/auth/auth"
import { productsRoutes } from "./modules/products/routes"
import { categoriesRoutes } from "./modules/category/routes"
import { cartRoutes } from "./modules/cart/routes"
import { orderRoutes } from "./modules/order/routes"
import { stripeWebhookRoutes, stripeFinalRoute } from "./modules/stripe/routes"
import { db } from "./db"
import { user } from "./db/schema/eccomerce/auth-schema"

export const createCoreApi = () => {
    const app = new Elysia()
  .use(cors({
    origin: "http://localhost:5173",//lembrar de alterar em produção
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type, Authorization"]
  }))
  .get("/health", () => ({ status: "OK", message: "Server is running" }))
  .decorate("db", db)
  .get("/users", async ({ db }) => {
    const data = await db.select().from(user)
    return { success: true, data }
  })
  

  .mount(auth.handler)
  .use(productsRoutes)
  .use(categoriesRoutes)
  .use(cartRoutes)
  .use(orderRoutes)
  .use(stripeWebhookRoutes)
  .use(stripeFinalRoute)

  return app
}
export type Coreapi = Awaited<ReturnType<typeof createCoreApi>>//precisa chamar uma função.