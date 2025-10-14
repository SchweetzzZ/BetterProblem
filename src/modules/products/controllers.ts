import { createProduct, getProductById, updateProduct, deletProducts,type CreateProductInput, gettAllProducts } from "./services";
import type { Context } from "elysia"

interface getProductByIdParams {
    id: string
}
type CreateProductContext = Context<{body: CreateProductInput}>

export const createProductController = async (ctx: Context) => {
    const body = ctx.body as CreateProductInput
    const newProduct = await createProduct(body)
    console.log("produto novo sendo criado....")
    ctx.set.status = 201

    return {
        success: true,
        message: "Produto criado com sucesso",
        data: newProduct
    }
}


export const getProductByIdController = async (ctx: Context) => {
    const { id } = ctx.params as Record<string, string>;
    const productId = Number(id);

    if (isNaN(productId) || productId <= 0) {''
        ctx.set.status = 400;
        return {
            success: false,
            message: "ID de produto inválido",
            data: null,
        };
    }
    try {
        const product = await getProductById(productId);

        if (!product || product.length === 0) {
            ctx.set.status = 404;
            return {
                success: false,
                message: "Produto não encontrado",
                data: null,
            };
        }
        ctx.set.status = 200;
        return {
            success: true,
            message: "Produto encontrado com sucesso",
            data: product[0],
        };
    } catch (err: any) {
        console.error(`[getProductByIdController] Erro ao buscar produto ${productId}:`, err);
        ctx.set.status = 500;
        return {
            success: false,
            message: "Erro interno ao buscar produto",
            data: null,
        };
    }
};

export const updateProductController = async (ctx: Context) => {
    try {
        const {id} = ctx.params as Record<string, string>
        const productId = Number(id)

        if (isNaN(Number(productId)) || productId <= 0) {
            ctx.set.status = 400
            return {
                success: false,
                message: "ID de produto inválido",
                data: null,
            }
        }
        const payload = ctx.body as Partial<CreateProductInput>
        const update = await updateProduct(productId, payload)
        ctx.set.status = 200
        return {
            success: true,
            message: "Produto atualizado com sucesso",
            data: update,
        }
    } catch (err: any) {
        console.error(`[updateProductController] Erro ao atualizar produto`, err)
        ctx.set.status = 500
        return {
            success: false,
            message: "Erro interno ao atualizar produto",
            data: null,
        }
    }
}
export const deletProductsController = async (ctx: Context) => {
    
    try {
        const {id} = ctx.params as Record<string, string>
        const productId = Number(id)
        if (isNaN(Number(productId)) || productId <= 0) {
            ctx.set.status = 400
            return {
                success: false,
                message: "ID de produto inválido",
                data: null,
            }
        }
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