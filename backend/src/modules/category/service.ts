import { db } from '../../db';
import { tablecategories } from '../../db/schema/eccomerce/categories';
import { eq, and } from 'drizzle-orm';

interface CreateCategoryInput {
    name: string
    description: string
}

export const createCategory = async (userId: string, category: CreateCategoryInput) => {

    const verifyName = await db
        .select()
        .from(tablecategories)
        .where(eq(tablecategories.name, category.name))

    if (verifyName.length > 0) {
        throw new Error("Category já existe")
    }

    const create = await db.insert(tablecategories).values({
        name: category.name,
        description: category.description,
        userId: userId
    }).returning()

    if (!create || create.length === 0) {
        throw new Error("Category não foi criada")
    }

    return create[0]
}


export const updateCategory = async (id: string, category: Partial<CreateCategoryInput>) => {
    const existing = await db.select().from(tablecategories).where(eq(tablecategories.id,id))
    if (!existing || existing.length === 0) {
        throw new Error("Category nao existe")
    }
    const update = await db.update(tablecategories).set(category).where(eq(tablecategories.id,id)).returning()
    if (!update || update.length === 0) {
        throw new Error("Category não foi atualizada")
    }
    return update[0] ?? null
}

export const getCategoryById = async (userId:string,id: string) => {
    const result = await db.select().from(tablecategories).where(and(eq(tablecategories.id,id),eq(tablecategories.userId,userId)))
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
export const getCategoryByName = async (name:string) => {
    const res = await db.select().from(tablecategories).where(eq(tablecategories.name, name))
    if (!res || res.length === 0) {
        throw new Error("Category não foi encontrada")
    }
    return res[0] ?? null
}


export const deletCategory = async (userId: string, id: string) => {
    const delet = await db.delete(tablecategories).where(and(eq(tablecategories.id,id),eq(tablecategories.userId,userId))).returning()
    if (!delet || delet.length === 0) {
        throw new Error("Category não foi deletada")
    }
    return delet[0] ?? null
}