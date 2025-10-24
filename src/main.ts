import { Elysia } from "elysia";
import {cors} from "@elysiajs/cors"
import { auth } from "./modules/auth/auth"
import { productsRoutes,  } from "./modules/products/routes"
import { categoriesRoutes } from "./modules/category/routes"
import { cartRoutes } from "./modules/cart/routes"
import { orderRoutes } from "./modules/order/routes"
import { stripeWebhookRoutes } from "./modules/stripe/routes"
import { stripeFinalRoute } from "./modules/stripe/routes"

const app = new Elysia()
  .use(cors({
    origin: "*",//lembrar de alterar em produção
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type, Authorization"],
  }))
  .get("/health", () => ({ status: "OK", message: "Server is running" }))

  .use(productsRoutes)
  .use(categoriesRoutes)
  .use(cartRoutes)
  .use(orderRoutes)
  .use(stripeWebhookRoutes)
  .use(stripeFinalRoute)
  .mount(auth.handler)
.listen(3000, () => {
  console.log(
    `🦊 Elysia is running at 'http://localhost:3000'`
  );
});



