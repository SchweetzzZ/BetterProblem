import { createProduct, getProductById, updateProduct, deletProducts, gettAllProducts } from "./services";
import { Context } from "elysia"
import { idParamsValidation, updateProductValidation } from "./products.validation"
import { createProductValidation } from "./products.validation"

type CreateProductBody = typeof createProductValidation.static;
type UpdateProductBody = typeof updateProductValidation.static;
type IdParams = typeof idParamsValidation.static;

export const createProductController = async (ctx: Context<{ body: CreateProductBody }>) => {
  const newProduct = await createProduct(ctx.body)
  ctx.set.status = 201
  return {
    success: true,
    message: "Produto criado com sucesso",
    data: newProduct
  }
}

export const getProductByIdController = async (ctx: Context<{ params: IdParams }>) => {
  const { id } = ctx.params
  const productId = Number(id) 
  const product = await getProductById(productId)
  
  ctx.set.status = 200
  return {
    success: true,
    message: "Produto encontrado com sucesso",
    data: product,
  }
}

export const updateProductController = async (ctx: Context<{ params: IdParams, body: UpdateProductBody }>) => {
  const { id } = ctx.params
  const productId = Number(id) 
  const update = await updateProduct(productId, ctx.body)
  
  ctx.set.status = 200
  return {
    success: true,
    message: "Produto atualizado com sucesso",
    data: update
  }
}

export const deletProductsController = async (ctx: Context<{ params: IdParams }>) => {
  try {
    const { id } = ctx.params
    const productId = Number(id) 
    const delet = await deletProducts(productId)
    
    ctx.set.status = 200
    return {
      success: true,
      message: "Produto deletado com sucesso",
      data: delet,
    }
  } catch (err: any) {
    console.error(`[deletProductsController] Erro ao deletar produto:`, err)
    ctx.set.status = 500
    return {
      success: false,
      message: "Erro interno ao deletar produto",
      data: null,
    }
  }
}

export const gettAllProductsController = async (ctx: Context) => {
  const products = await gettAllProducts()
  ctx.set.status = 200
  return {
    success: true,
    message: "Produtos encontrados com sucesso",
    data: products,
  }
}