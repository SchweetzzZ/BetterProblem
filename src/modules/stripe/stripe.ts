import Stripe from "stripe"

//inicializar SDK da stripe
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-09-30.clover"
})