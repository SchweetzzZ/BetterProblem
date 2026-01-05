import { Elysia } from "elysia";
import { createCheckoutSessionController, handleWebhookController } from "./controllers";
import { stripeCheckoutValidation, stripeWebhookValidation } from "./stripe.validation";

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