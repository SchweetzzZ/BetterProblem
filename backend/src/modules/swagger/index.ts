import { Elysia } from "elysia"
import { swagger } from "@elysiajs/swagger"

export const swaggerModule = (app: Elysia) =>
  app.use(
    swagger({
      documentation: {
        info: {
          title: "BetterProblem API",
          version: "1.0.0",
          description: "API for BetterProblem"
        },
        tags: [
          { name: "Products", description: "Products routes" },
          { name: "Users", description: "Users routes" },
          { name: "Auth", description: "Auth routes" },
          { name: "Orders", description: "Orders routes" },
          { name: "Payments", description: "Payments routes" },
          { name: "OrderItems", description: "OrderItems routes" },
          { name: "Carts", description: "Carts routes" },
          { name: "Categories", description: "Categories routes" }
        ]
      }
    })
  )
