import { db } from '../../db';
import { tableproducts } from '../../db/schema/eccomerce/products';
import { eq, and } from 'drizzle-orm';

export type CreateProductInput = {
  nome: string
  price: number
  description: string
  image: string
  stock: number
  category: string
}

export const createProduct = async (user_id: string, product: CreateProductInput) => {
  const create = await db
    .insert(tableproducts)
    .values({
      nome: product.nome,
      user_id: user_id,
      price: product.price.toString(),
      description: product.description,
      image: product.image,
      stock: product.stock,
      category: product.category,
    })
    .returning();

  if (!create || create.length === 0) {
    throw new Error("Produto nao criado");
  }

  return create[0] ?? null;
}

export const updateProduct = async (id: string, userId: string,product: Partial<CreateProductInput>) => {
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
    .where(and(
      eq(tableproducts.id, id), 
      eq(tableproducts.user_id, userId)))
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
//do publico
export const gettAllProducts = async () => {
  const result = await db.select().from(tableproducts)
  if (!result || result.length === 0) {
    throw new Error("Products not found")
  }
  return result
}
//do vendedor
export const getProductByUserId = async (id: string, userId: string) => {
  const result = await db.select().from(tableproducts).where(and(eq(tableproducts.id, id),eq(tableproducts.user_id, userId)))
  if (!result || result.length === 0) {
    throw new Error("Produto nao encontrado")
  }
  return result
}

export const deletProducts = async (id: string, userId: string) => {
  const deleted = await db.delete(tableproducts).where(and(
  eq(tableproducts.id, id), 
  eq(tableproducts.user_id, userId)))
  .returning()

  if (!deleted || deleted.length === 0) {
    throw new Error("Product not found or not deleted");
  }

  return deleted[0]
}