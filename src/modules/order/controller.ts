import { createOrder, updateOrder, deleteOrder, getOrdersById, getAllOrders } from "./service"
import { createOrderValidation, updateOrderValidation, idParamsValidation } from "./order.validation"
import { Context } from "elysia"

type createOrderBody = typeof createOrderValidation.static
type updateOrderBody = typeof updateOrderValidation.static
type idParams = typeof idParamsValidation.static


export const createOrderController = async (ctx: Context<{ body: createOrderBody }>) => {
    try {
        const create = await createOrder(ctx.body)
        if (!create) {
            throw new Error("Pedido nao foi criado")
        }
        ctx.set.status = 201
        return {
            success: true,
            message: "Pedido criado com sucesso",
            data: create
    }
    } catch (error: any) {
        console.error(`[createOrderController] Erro ao criar pedido:`, error)
        ctx.set.status = 500
        return {
            success: false,
            message: "Erro interno ao criar pedido",
            data: null,
        }
    }
}

export const updateOrderController = async (ctx: Context<{params: idParams, body: updateOrderBody}>) => {
    try {
        const { id } = ctx.params
        const idNumber = Number(id)
        const update = await updateOrder(idNumber, ctx.body)

        if (!update) {
            throw new Error("Pedido nao encontrado para atualizar")
        }

        ctx.set.status = 200
        return {
        success: true,
        message: "Pedido atualizado com sucesso",
        data: update
    }
} catch (error: any) {
    console.error(`[updateOrderController] Erro ao atualizar pedido:`, error)
    ctx.set.status = 500
    return {
        success: false,
        message: "Erro interno ao atualizar pedido",
        data: null,
    }
}
}

export const deleteOrderController = async (ctx: Context<{params: idParams}>) => {
    try {
        const { id } = ctx.params
        const idNumber = Number(id)
        const delet = await deleteOrder(idNumber)

        if (!delet) {
            throw new Error("Pedido nao encontrado para deletar")
        }
    
        ctx.set.status = 200
        return {
        success: true,
        message: "Pedido deletado com sucesso",
        data: delet
    }
    } catch (error: any) {
        console.error(`[deleteOrderController] Erro ao deletar pedido:`, error)
        ctx.set.status = 500
        return {
            success: false,
            message: "Erro interno ao deletar pedido",
            data: null,
        }
    }
}

export const getOrdersByIdController = async (ctx: Context<{params: idParams}>) => {
    try {
        const { id } = ctx.params
        const idNumber = Number(id)
        const getOrd = await getOrdersById(idNumber)

        if (!getOrd) {
            throw new Error("Pedido nao encontrado na busca")
        }
    } catch (error: any) {
        console.error(`[getOrdersByIdController] Erro ao buscar pedido:`, error)
        ctx.set.status = 500
        return {
            success: false,
            message: "Erro interno ao buscar pedido",
            data: null,
        }
    }
}

export const getAllOrdersController = async (ctx: Context) => {
    try {
        const result = await getAllOrders()

        if (!result) {
            throw new Error("Pedidos nao encontrados")
        }

        return result
    } catch (error: any) {
        console.error(`[getAllOrdersController] Erro ao buscar pedidos:`, error)
        ctx.set.status = 500
        return {
            success: false,
            message: "Erro interno ao buscar pedidos",
            data: null,
        }
    }
}