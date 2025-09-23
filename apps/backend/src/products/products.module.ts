import { Module } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";

@Module({ providers: [PrismaService, ProductsService], controllers: [ProductsController] })
export class ProductsModule {}