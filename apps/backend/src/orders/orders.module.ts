import { Module } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";

@Module({ providers: [PrismaService, OrdersService], controllers: [OrdersController] })
export class OrdersModule {}