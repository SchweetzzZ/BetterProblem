import { db } from "../../db";
import { tablecupons } from "../../db/schema/eccomerce/cupons";
import { eq, sql } from "drizzle-orm";

export class CouponService {

  static async validate(code: string, orderTotal: number) {
    const [coupon] = await db
      .select()
      .from(tablecupons)
      .where(eq(tablecupons.code, code));

    if (!coupon) throw new Error("Cupom inexistente");
    if (!coupon.is_active) throw new Error("Cupom inativo");
    if (coupon.expires_at && coupon.expires_at < new Date())
      throw new Error("Cupom expirado");
    if (coupon.usage_count >= coupon.usage_limit)
      throw new Error("Limite de uso atingido");

    return coupon;
  }

  // ✔ corrigido
  static calcDiscount(orderTotal: number, coupon: any) {
    if (coupon.discount_percent) {
      return (orderTotal * coupon.discount_percent) / 100;
    }

    if (coupon.discount_value) {
      return coupon.discount_value; // retorna só o valor do desconto
    }

    return 0;
  }

  // ✔ tipo corrigido: id é string (uuid)
  static async incrementUse(couponId: string) {
    await db
      .update(tablecupons)
      .set({
        usage_count: sql`${tablecupons.usage_count} + 1`,
      })
      .where(eq(tablecupons.id, couponId));
  }
}
