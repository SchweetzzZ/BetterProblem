import { ac } from "./access-control"

export const roles = {
    admin: ac.newRole({
        products: ["*"],
        categories: ["*"],
        cart: ["*"],
        orders: ["*"],
    }),

    vendedor: ac.newRole({
        products: ["create", "read", "update", "delete"],
        categories: ["create", "read"],
        cart: ["create", "read", "update", "delete"],
        orders: ["read"],
    }),

    user: ac.newRole({
        products: ["read"],
        categories: ["read"],
        cart: ["create", "read", "update", "delete"],
        orders: ["create", "read"],
    }),
} as const
