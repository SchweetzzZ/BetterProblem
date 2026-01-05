import { db } from "../../db";
import { tablecart } from "../../db/schema/eccomerce/cart";
import { tableproducts } from "../../db/schema/eccomerce/products";
import { eq, and } from "drizzle-orm";
import { sql } from "drizzle-orm";

interface CreateCartInput {
  producuct_id: string;
  quantity: number;
}

export const createCart = async (user_id: string, cart: CreateCartInput) => {
  const [product] = await db
    .select()
    .from(tableproducts)
    .where(eq(tableproducts.id, cart.producuct_id));

  if (!product) throw new Error("Produto não existe");

  if (product.stock < cart.quantity) {
    throw new Error("Quantidade insuficiente");
  }

  const [existing] = await db
    .select()
    .from(tablecart)
    .where(
      and(
        eq(tablecart.user_id, user_id),
        eq(tablecart.producuct_id, cart.producuct_id)
      )
    );

  // Se já existe, atualiza quantidade
  if (existing) {
    return await updateCart(existing.id, {
      quantity: existing.quantity + cart.quantity,
    }, user_id);
  }

  const created = await db
    .insert(tablecart)
    .values({
      producuct_id: cart.producuct_id,
      quantity: cart.quantity,
      user_id,
    })
    .returning();

  return created[0];
};

export const updateCart = async (
  id: string,
  data: Partial<CreateCartInput>,
  userId: string
) => {

  const existing = await db.query.tablecart.findFirst({
    where: eq(tablecart.id, id),
  });

  if (!existing) throw new Error("Carrinho não existe");
  if (existing.user_id !== userId) throw new Error("Sem permissão");

  // DELETE QUANDO quantity = 0
  if (data.quantity === 0) {
    await db.delete(tablecart).where(eq(tablecart.id, id));
    return { deleted: true };
  }

  if (data.quantity !== undefined) {
    const product = await db.query.tableproducts.findFirst({
      where: eq(tableproducts.id, existing.producuct_id),
    });

    if (!product || data.quantity > product.stock)
      throw new Error("Estoque insuficiente");
  }

  const updated = await db
    .update(tablecart)
    .set(data)
    .where(eq(tablecart.id, id))
    .returning();

  return updated[0];
};

export const getCartByUSerId = async (id: string, userId: string) => {
  const cart = await db
    .select()
    .from(tablecart)
    .where(
      and(eq(tablecart.id, id), eq(tablecart.user_id, userId))
    );

  if (!cart.length) throw new Error("Cart não encontrado");

  return cart[0];
};

export const deletCart = async (id: string, userId: string) => {
  const [existing] = await db
    .select()
    .from(tablecart)
    .where(eq(tablecart.id, id));

  if (!existing) throw new Error("Cart não encontrado");
  if (existing.user_id !== userId) throw new Error("Sem permissão");

  await db.delete(tablecart).where(eq(tablecart.id, id));

  return { deleted: true };
};
