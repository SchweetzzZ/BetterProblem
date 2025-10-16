import { createCart, updateCart, deletCart, getCartById, getAllCart } from "./service"
import type { Context } from "elysia"
import { createCartValidation, updateCartValidation, idParamsValidation } from "./cart.validation"

type createCartParams = typeof createCartValidation.static;
type updateCartParams = typeof updateCartValidation.static;
type IdParams = typeof idParamsValidation.static;

export const creteCartController = async (ctx: Context<{ body: createCartParams} >) => {
    try {
        const newCart = await createCart(ctx.body)
        if (!newCart) {
            throw new Error("Cart nao foi criado")
        }
        ctx.set.status = 201
        return {
        success: true,
        message: "Cart criado com sucesso",
        data: newCart
    }
    } catch (err: any) {
        console.error(`[creteCartController] Erro ao criar cart`, err)
        ctx.set.status = 500
        return {
            success: false, message: "Erro interno ao criar cart", data: null,
        }
    }
}

export const updateCartController = async (ctx: Context<{params: IdParams, body: updateCartParams}>) => {
    try {
        const { id } = ctx.params 
        const cartId = Number(id)

        const update = await updateCart(cartId, ctx.body)

        ctx.set.status = 200
        return {
        success: true,
        message: "Cart atualizado com sucesso",
        data: update
    }
    } catch (err: any) {
        console.error(`[updateCartController] Erro ao atualizar cart`, err)
        ctx.set.status = 500
        return {
            success: false, message: "Erro interno ao atualizar cart", data: null,
        }
    }
}
export const deletCartController = async (ctx: Context<{params: IdParams}>) => {
    try {
        const { id } = ctx.params
        //const cartId = Number(id)
        const delet = await deletCart(id)
        ctx.set.status = 200
        return {
            success: true,
            message: "Cart deletado com sucesso",
            data: delet
        }
    } catch (err: any) {
        console.error(`[deletCartController] Erro ao deletar cart`, err)
        ctx.set.status = 500
        return {
            success: false, message: "Erro interno ao deletar cart", data: null,
        }
    }
}
export const getCartByIdController = async (ctx: Context<{params: IdParams}>) => {
    try {
         const { id } = ctx.params
         const getCartId = await getCartById(id)
         ctx.set.status = 200
         return {
            success: true,
            message: "Cart encontrado com sucesso",
            data: getCartId
        }

    } catch (err: any) {
        console.error(`[getCartByIdController] Erro ao buscar cart`, err)
        ctx.set.status = 500
        return {
            success: false, message: "Erro interno ao buscar cart", data: null,
        }
    }
}
export const getAllCartController = async (ctx: Context) => {
    try {
        const result = await getAllCart()
        if (!result) {
            throw new Error("Cart nao foi encontrado")
        }
        ctx.set.status = 200
        return {
        success: true,
        message: "Cart encontrado com sucesso",
        data: result
    }
    } catch (err: any) {
        console.error(`[getAllCartController] Erro ao buscar cart`, err)
        ctx.set.status = 500
        return {
            success: false, message: "Erro interno ao buscar cart", data: null,
        }
    }
}