import { db } from '../../db';
import { tablecategories } from '../../db/schema/eccomerce/categories';
import { eq } from 'drizzle-orm';

interface CreateCategoryInput {
    name: string
    description: string
}

export const createCategory = async (category: CreateCategoryInput) => {
    const create = await db.insert(tablecategories).values(category).returning()
    if (!create) {
        throw new Error ("Category não foi criada")
    }
    return create
}

export const getCategoryById = async (id: number) => {
    const result = await db.select().from(tablecategories).where(eq(tablecategories.id,id))
    if (!result) {
        throw new Error("Category não foi encontrada")
    }
    return result
}
export const categoryAll = async () => {
    const result = await db.select().from(tablecategories)
    if (!result) {
        throw new Error("Category não foi encontrada")
    }
    return result
}
export const updateCategory = async (id: number, category: Partial<CreateCategoryInput>) => {
    const update = await db.update(tablecategories).set(category).where(eq(tablecategories.id,id)).returning()
    if (!update) {
        throw new Error("Category não foi atualizada")
    }
    return update
}
export const deletCategory = async (id: number) => {
    const delet = await db.delete(tablecategories).where(eq(tablecategories.id,id)).returning()
    if (!delet) {
        throw new Error("Category não foi deletada")
    }
    return delet
}