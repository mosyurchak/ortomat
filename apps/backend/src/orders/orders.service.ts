import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import { CreateOrderDto } from "./dto/create-order.dto";

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateOrderDto) {
    return this.prisma.order.create({ data });
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: { product: true, ortomat: true, doctor: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: { product: true, ortomat: true, doctor: true },
    });
  }

  async updatePaymentStatus(orderId: string, status: string, paymentId?: string) {
    const order = await this.prisma.order.update({
      where: { id: orderId },
      data: { payment_status: status, payment_id: paymentId },
      include: { doctor: true },
    });

    if (status === "success" && order.doctor_id) {
      const doctor = await this.prisma.doctor.findUnique({
        where: { id: order.doctor_id },
      });
      if (doctor) {
        const commission = order.price * (doctor.commission_rate / 100);
        await this.prisma.doctor.update({
          where: { id: doctor.id },
          data: {
            total_sales: { increment: 1 },
            total_earnings: { increment: commission },
          },
        });
      }
    }

    return order;
  }
}
