import { db } from "../../db";
import { tablecart } from "../../db/schema/eccomerce/cart";
import { eq, and } from "drizzle-orm";
import { tableproducts } from "../../db/schema/eccomerce/products";

interface CreateCartInput {
    user_id: string
    producuct_id: number
    quantity: number
}

export const createCart = async (cart: CreateCartInput) => {//adicionar transition depois.

    const product = await db.select().from(tableproducts).where(eq(tableproducts.id, cart.producuct_id))
    if (!product || product.length === 0) {
        throw new Error("Product nao existe")
    }
    if (product[0].stock < cart.quantity) {
        throw new Error("Quantidade insuficiente")
    }

    const [existing] = await db.select().from(tablecart).where(and
    (eq(tablecart.user_id, cart.user_id), 
    eq(tablecart.producuct_id, cart.producuct_id)))

    if (existing) {
    // passar o userId obrigatoriamente (aqui vem do cart.user_id)
    const updated = await updateCart(existing.id, { quantity: existing.quantity + cart.quantity }, cart.user_id)
    return updated}

    if (cart.quantity === 0) {
        throw new Error("Quantidade nao pode ser 0")
    }
    if(cart.quantity < 0) {
        throw new Error("Quantidade nao pode ser negativa")
    }

    const create = await db.insert(tablecart).values(cart).returning()
    
    if (!create || create.length === 0) {
        throw new Error("Cart nao foi criado")
    }
    return create[0] ?? null
}

export const updateCart = async (id: number, data: Partial<CreateCartInput>, userId: string) => {
    // 1. Não deixe a pessoa fazer PATCH vazio
    if (!data || Object.keys(data).length === 0) {
        throw new Error("Nenhum dado informado para atualizar");
    }
    // 2. Buscar o item atual
    const existing = await db.query.tablecart.findFirst({
        where: eq(tablecart.id, id)
    });
    if (!existing) {
        throw new Error("Carrinho não existe");
    }
    // 3. Verificar se pertence ao usuário
    if (existing.user_id !== userId) {
        throw new Error("Você não tem permissão para alterar esse item");
    }
    // 4. Se o usuário forneceu quantity, validar
    if (data.quantity !== undefined) {
        // 4.0 Validar tipo
        if (typeof data.quantity !== "number" || Number.isNaN(data.quantity)) {
            throw new Error("Quantidade deve ser um número válido");
        }
        // 4.1 quantidade não pode ser negativa
        if (data.quantity < 0) {
            throw new Error("Quantidade não pode ser negativa");
        }
        // 4.2 se quantity = 0 → remover do carrinho
        if (data.quantity === 0) {
            await db.delete(tablecart)
                .where(eq(tablecart.id, id));
            return { deleted: true };
        }
        // 4.3 verificar estoque
        const product = await db.query.tableproducts.findFirst({
            where: eq(tableproducts.id, existing.producuct_id)
        });
        if (!product) {
            throw new Error("Produto não encontrado");
        }
        if (data.quantity > product.stock) {
            throw new Error(`Quantidade solicitada (${data.quantity}) é maior que o estoque disponível (${product.stock})`);
        }
    }
    // 5. Atualizar
    const updated = await db.update(tablecart)
        .set(data)
        .where(eq(tablecart.id, id))
        .returning();

    if (updated.length === 0) {
        throw new Error("Carrinho não foi atualizado");
    }

    return updated[0];
};


export const deletCart = async (id: number) => {

    const delet = await db.delete(tablecart).where(eq(tablecart.id,id)).returning()
    if (!delet || delet.length === 0) {
        throw new Error("Cart nao foi deletado")
    }
    return delet[0] ?? null
}

export const getCartById = async (id: number) => {

    const verifyId = await db.query.tablecart.findFirst({where: eq(tablecart.id, id)})

    if (!verifyId) {
        throw new Error("Cart nao existe")
    }

    const result = await db.select().from(tablecart).where(eq(tablecart.id,id))
    if (!result || result.length === 0) {
        throw new Error("Cart nao foi encontrado")
    }
    return result[0] ?? null
}

export const getAllCart = async () => {
    const result = await db.select().from(tablecart)
    if (!result || result.length === 0) {
        throw new Error("Cart nao foi encontrado")
    }
    return result ?? null
}