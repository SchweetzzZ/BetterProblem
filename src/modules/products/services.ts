import { db } from '../../db';
import { tableproducts } from '../../db/schema/eccomerce/products';
import { eq } from 'drizzle-orm';

export type CreateProductInput = {
  nome: string
  price: number
  description: string
  image: string
  stock: number
  category: string
}

export const createProduct = async (product: CreateProductInput) => {
  const create = await db
    .insert(tableproducts)
    .values({
      ...product,
      price: product.price.toString(),
    })
    .returning();

  if (!create || create.length === 0) {
    throw new Error("Produto nao criado");
  }

  return create[0] ?? null;
}

export const updateProduct = async (id: number, product: Partial<CreateProductInput>) => {
  const updateData: any = {};
  
  if (product.nome !== undefined) updateData.nome = product.nome;
  if (product.price !== undefined) updateData.price = product.price.toString();
  if (product.description !== undefined) updateData.description = product.description;
  if (product.image !== undefined) updateData.image = product.image;
  if (product.stock !== undefined) updateData.stock = product.stock;
  if (product.category !== undefined) updateData.category = product.category;

  const update = await db
    .update(tableproducts)
    .set(updateData)
    .where(eq(tableproducts.id, id))
    .returning()

  if (!update || update.length === 0) {
    throw new Error("Produto nao encontrado")
  }

  return {
    success: true,
    message: "Produto atualizado com sucesso",
    data: update[0] ?? null
  }
}

export const gettAllProducts = async () => {
  const result = await db.select().from(tableproducts)
  if (!result || result.length === 0) {
    throw new Error("Products not found")
  }
  return result
}

export const getProductById = async (id: number) => {
  const result = await db.select().from(tableproducts).where(eq(tableproducts.id, id))
  if (!result || result.length === 0) {
    throw new Error("Produto nao encontrado")
  }
  return result
}

export const deletProducts = async (id: number) => {
  const deleted = await db.delete(tableproducts).where(eq(tableproducts.id, id)).returning()

  if (!deleted || deleted.length === 0) {
    throw new Error("Product not found or not deleted");
  }

  return deleted[0]
}