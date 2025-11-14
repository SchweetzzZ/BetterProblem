import { db } from '../../db';
import { tablecategories } from '../../db/schema/eccomerce/categories';
import { eq } from 'drizzle-orm';

interface CreateCategoryInput {
    name: string
    description: string
}

export const createCategory = async (category: CreateCategoryInput) => {
    const create = await db.insert(tablecategories).values(category).returning()
    if (!create || create.length === 0) {
        throw new Error ("Category não foi criada")
    }
    return create[0] ?? null
}

export const updateCategory = async (id: number, category: Partial<CreateCategoryInput>) => {
    const update = await db.update(tablecategories).set(category).where(eq(tablecategories.id,id)).returning()
    if (!update || update.length === 0) {
        throw new Error("Category não foi atualizada")
    }
    return update[0] ?? null
}

export const getCategoryById = async (id: number) => {
    const result = await db.select().from(tablecategories).where(eq(tablecategories.id,id))
    if (!result || result.length === 0) {
        throw new Error("Category não foi encontrada")
    }
    return result
}

export const categoryAll = async () => {
    const result = await db.select().from(tablecategories)
    if (!result || result.length === 0) {
        throw new Error("Category não foi encontrada")
    }
    return result
}

export const deletCategory = async (id: number) => {
    const delet = await db.delete(tablecategories).where(eq(tablecategories.id,id)).returning()
    if (!delet || delet.length === 0) {
        throw new Error("Category não foi deletada")
    }
    return delet[0] ?? null
}