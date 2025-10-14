import { Elysia } from "elysia";
import {cors} from "@elysiajs/cors"
import { auth } from "./modules/auth/auth"
import { productsRoutes,  } from "./modules/products/routes"
import { categoryRoutes } from "./modules/category/routes"

const app = new Elysia()
  .use(cors({
    origin: "*",//lembrar de alterar em produção
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type, Authorization"],
  }))
  .get("/health", () => ({ status: "OK", message: "Server is running" }));

  
  app.get("/auth_test", async () => {
    return { message: "Auth configurado"}
  })
  .use(productsRoutes)
  .use(categoryRoutes)


.mount(auth.handler)
.listen(3000, () => {
  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
  );
});



