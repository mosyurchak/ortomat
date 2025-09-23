import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(payload: { ortomat_id: string; product_id: string; cell_number: number; doctor_id?: string | null; price: number; customer_phone?: string | null; }) {
    const product = await this.prisma.product.findUnique({ where: { id: payload.product_id } });
    if (!product) throw new NotFoundException("Product not found");
    const order = await this.prisma.order.create({
      data: {
        order_number: "ORD-" + Date.now(),
        ortomat_id: payload.ortomat_id,
        cell_number: payload.cell_number,
        product_id: payload.product_id,
        doctor_id: payload.doctor_id ?? null,
        price: payload.price,
        payment_status: "pending"
      }
    });
    return order;
  }

  async payInit(id: string) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) throw new NotFoundException("Order not found");
    // Next step: LiqPay form/signature build
    return { ok: true, order_id: id, provider: "liqpay:init" };
  }

  async liqpayCallback(data: any) {
    // Next step: verify LiqPay signature, update payment_status, commission accrual, open cell
    return { ok: true };
  }

  async byId(id: string) {
    return this.prisma.order.findUnique({ where: { id } });
  }
}