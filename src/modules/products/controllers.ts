import { createProduct, getProductById, type CreateProductInput } from "./services";
import type { Context } from "elysia"

interface getProductByIdParams {
    id: string
}

export const createProductController = async (ctx: Context) => {
    const {body, set} = ctx as any
    const payload = body as CreateProductInput
    const newProduct = await createProduct(payload)
    console.log("produto novo sendo criado....")
    set.status = 201

    return {
        success: true,
        message: "Produto criado com sucesso",
        data: newProduct
    }
}

export const getProductByIdController = async (ctx: Context) => {
    const { id } = ctx.params as Record<string, string>;
    const productId = Number(id);

    if (isNaN(productId) || productId <= 0) {
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

