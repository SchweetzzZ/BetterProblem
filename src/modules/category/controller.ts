import { createCategory, getCategoryById, categoryAll, updateCategory, deletCategory } from "./service"
import type { Context } from "elysia"
import {tablecategories} from "../../db/schema/eccomerce/categories"
import { eq } from "drizzle-orm"
import { db } from "../../db"

type createCategoryParams = {
    name: string
    description: string
}

type createCategoryContext = Context<{body: createCategoryParams}>

export const createCategoryController = async (ctx: Context) => {
    const body = ctx.body as createCategoryParams
    const newCategory = await createCategory(body)
    if (!newCategory) {
        throw new Error("Category não foi criada")
    }
    ctx.set.status = 201
    return {
        success: true,
        message: "Category criada com sucesso",
        data: newCategory
    }
}

export const getCategoryByIdController = async (ctx: Context) => {
    const { id } = ctx.params as Record<string, string>
    const categoryId = Number(id)
    if (isNaN(categoryId) || categoryId <= 0) {
        ctx.set.status = 400
        return {
            success: false,
            message: "ID de categoria inválido",
            data: null,
        }
    }
    const result = await getCategoryById(categoryId)    
    if (!result) {
        throw new Error("Category não foi encontrada")
    }
    ctx.set.status = 200
    return {
        success: true,
        message: "Category encontrada com sucesso",
        data: result
    }
}
export const updateCategoryController = async (ctx: Context) => {
    try {
        const { id } = ctx.params as Record<string, string>
        const categoryId = Number(id)
        if (isNaN(Number(categoryId)) || categoryId <= 0) {
            ctx.set.status = 400
            return {
                success: false,
                message: "ID de categoria inválido",
                data: null,
            }
        }
        const payload = ctx.body as Partial<createCategoryParams>
        const update = await updateCategory(categoryId, payload)
        ctx.set.status = 200
        return {
            success: true,
            message: "Category atualizada com sucesso",
            data: update
        }
    } catch (err: any) {
        console.error(`[updateCategoryController] Erro ao atualizar categoria`, err)
        ctx.set.status = 500
        return {
            success: false,
            message: "Erro interno ao atualizar categoria",
            data: null,
        }
    }
}
export const categoryAllController = async (ctx: Context) => {
    const result = await categoryAll()
    if (!result) {
        throw new Error("Category não foi encontrada")
    }
    ctx.set.status = 200
    return {
        success: true,
        message: "Category encontrada com sucesso",
        data: result
    }
}
export const deletCategoryController = async (ctx: Context) => {
     try {
        const { id } = ctx.params as Record<string, string>
        const categoryId = Number(id)
        if (isNaN(Number(categoryId)) || categoryId <= 0) {
            ctx.set.status = 400
            return {
                success: false,
                message: "ID de categoria inválido",
                data: null,
            }
        }
    const delet = await deletCategory(categoryId)
    ctx.set.status = 200
    return {
        success: true,
        message: "Category deletada com sucesso",
        data: delet
    }} catch (err: any) {
        console.error(`[deletCategoryController] Erro ao deletar categoria`, err)
        ctx.set.status = 500
        return {
            success: false,
            message: "Erro interno ao deletar categoria",
            data: null,
        }
    }
}
