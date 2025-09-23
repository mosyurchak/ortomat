import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  list() { return this.prisma.product.findMany({ orderBy: { name: "asc" } }); }
  byId(id: string) { return this.prisma.product.findUnique({ where: { id } }); }
}