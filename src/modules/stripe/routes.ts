import { Elysia } from "elysia";
import { createCheckoutSessionController } from "./controllers";
import { stripeCheckoutValidation } from "./stripe.validation";
import { handleWebhookController } from "./controllers";
import { stripeWebhookValidation } from "./stripe.validation";

export const stripeFinalRoute = (app: Elysia) =>
  app.post(
    "/checkout",
    createCheckoutSessionController,
    {
      body: stripeCheckoutValidation
    }
  );

  export const stripeWebhookRoutes = (app: Elysia) =>
    app.post(
      "/webhook",
      handleWebhookController,
      {
        headers: stripeWebhookValidation.headers
      }
    );