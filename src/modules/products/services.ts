import { db } from '../../db';
import { tableproducts } from '../../db/schema/eccomerce/products';
import { eq } from 'drizzle-orm';

//interface para criar o produto
export interface CreateProductInput {
    nome: string
    price: string
    description: string
    image: string
    stock: number
    category: string
}

export const gettAllProducts = async () =>{
    const result = await db.select().from(tableproducts)
    if (!result) {
        throw new Error("Products not found")
    }
    return result
}

export const getProductById = async (id:number) => {
    const result = await db.select().from(tableproducts).where(eq(tableproducts.id, id))
    if (!result) {
        throw new Error("Product not found")
    }
    return result

}

export const createProduct = async (product: CreateProductInput) => {
    if (!product.nome || !product.price || !product.description || !product.image) {
      throw new Error("Produtos obrigatórios faltando")
    }
    if(isNaN(Number(product.price))) {
      throw new Error("Preço inválido")
    }
    if(isNaN(Number(product.stock))) {
      throw new Error("Estoque inválido")
    }
    const create = await db.insert(tableproducts).values(product)
    if (!create) {
        throw new Error("Product not created")
    }
    return create
}

export const updateProduct = async (id: number, product: Partial<CreateProductInput>) => {
    const updat= await db.update(tableproducts).set(product).where(eq(tableproducts.id, id)).returning()

    if (!updat || updat.length === 0) {
        throw new Error("Product not found")
    }
    
    return {success: true, 
      message: "Product atualizado com sucesso", 
      data: updat[0]}
}

export const deletProducts = async (id: number) => {
    const delet = await db.delete(tableproducts).where(eq(tableproducts.id, id))
    if (!delet) {
        throw new Error("Product not deleted")
    }
    return delet
}























/*import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool);*/