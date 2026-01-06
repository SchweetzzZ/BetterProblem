import { roles } from "./roles"

/**
 * Define o mapeamento de permissões por role
 * Baseado nos roles definidos em roles.ts
 */
const ROLE_PERMISSIONS = {
    admin: {
        products: ["*"],
        categories: ["*"],
        cart: ["*"],
        orders: ["*"],
    },
    vendedor: {
        products: ["create", "read", "update", "delete"],
        categories: ["create", "read"],
        cart: ["create", "read", "update", "delete"],
        orders: ["read"],
    },
    user: {
        products: ["read"],
        categories: ["read"],
        cart: ["create", "read", "update", "delete"],
        orders: ["create", "read"],
    },
} as const

export type Role = keyof typeof ROLE_PERMISSIONS
export type Resource = keyof typeof ROLE_PERMISSIONS.admin
export type Action = "create" | "read" | "update" | "delete" | "*"

/**
 * Verifica se uma role tem permissão para executar uma ação em um recurso
 * 
 * @param role - A role do usuário (admin, vendedor, user)
 * @param resource - O recurso (products, cart, orders, categories)
 * @param action - A ação (create, read, update, delete)
 * @returns true se tem permissão, false caso contrário
 * 
 * @example
 * hasPermission("user", "cart", "create") // true
 * hasPermission("user", "products", "create") // false
 * hasPermission("admin", "products", "delete") // true
 */
export function hasPermission(
    role: string,
    resource: Resource,
    action: Action
): boolean {
    // Verifica se a role existe
    const rolePerms = ROLE_PERMISSIONS[role as Role]
    if (!rolePerms) return false

    // Pega as permissões do recurso
    const resourcePerms = rolePerms[resource] as readonly string[]
    if (!resourcePerms) return false

    // Verifica se tem wildcard (*) ou a ação específica
    return resourcePerms.includes("*" as any) || resourcePerms.includes(action as any)
}

/**
 * Verifica se uma role tem TODAS as permissões especificadas
 * 
 * @param role - A role do usuário
 * @param permissions - Objeto com recursos e ações necessárias
 * @returns true se tem todas as permissões, false caso contrário
 * 
 * @example
 * hasAllPermissions("admin", { products: ["create", "delete"] }) // true
 * hasAllPermissions("user", { products: ["create", "delete"] }) // false
 */
export function hasAllPermissions(
    role: string,
    permissions: Partial<Record<Resource, Action[]>>
): boolean {
    for (const [resource, actions] of Object.entries(permissions)) {
        for (const action of actions) {
            if (!hasPermission(role, resource as Resource, action)) {
                return false
            }
        }
    }
    return true
}

/**
 * Verifica se uma role tem PELO MENOS UMA das permissões especificadas
 * 
 * @param role - A role do usuário
 * @param permissions - Objeto com recursos e ações necessárias
 * @returns true se tem pelo menos uma permissão, false caso contrário
 * 
 * @example
 * hasAnyPermission("vendedor", { products: ["create"], orders: ["delete"] }) // true (tem create em products)
 */
export function hasAnyPermission(
    role: string,
    permissions: Partial<Record<Resource, Action[]>>
): boolean {
    for (const [resource, actions] of Object.entries(permissions)) {
        for (const action of actions) {
            if (hasPermission(role, resource as Resource, action)) {
                return true
            }
        }
    }
    return false
}
