import { createCategory, getCategoryById, categoryAll, updateCategory, deletCategory } from "./service"
import type { Context } from "elysia"
import {createCategoryValidation, updateCategoryValidation, idParamsValidation} from "./category.validation"
import {tablecategories} from "../../db/schema/eccomerce/categories"
import { eq } from "drizzle-orm"
import { db } from "../../db"

type createCategoryParams = typeof createCategoryValidation.static;
type updateCategoryParams = typeof updateCategoryValidation.static;
type IdParams = typeof idParamsValidation.static;

export const createCategoryController = async (ctx: Context<{ body: createCategoryParams }>) => {
    const newCategory = await createCategory(ctx.body)
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

export const getCategoryByIdController = async (ctx: Context<{ params: IdParams }>) => {
    const { id } = ctx.params 
    //const categoryId = Number(id)
    const result = await getCategoryById(id)    

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
export const updateCategoryController = async (ctx: Context<{ params: IdParams, body: updateCategoryParams }>) => {
    try {
        const { id } = ctx.params 
        const categoryId = Number(id)

        const update = await updateCategory(categoryId, ctx.body)

        ctx.set.status = 200
        return {
            success: true, message: "Category atualizada com sucesso", data: update
        }
    } catch (err: any) {
        console.error(`[updateCategoryController] Erro ao atualizar categoria`, err)
        ctx.set.status = 500
        return {
            success: false, message: "Erro interno ao atualizar categoria", data: null,
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
export const deletCategoryController = async (ctx: Context<{ params: IdParams }>) => {
     try {
        const { id } = ctx.params 
        const categoryId = Number(id)
       
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
