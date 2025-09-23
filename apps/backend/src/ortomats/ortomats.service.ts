import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";

@Injectable()
export class OrtomatsService {
  constructor(private prisma: PrismaService) {}
  list() { return this.prisma.ortomat.findMany({ orderBy: { created_at: "desc" } }); }
  byId(id: string) { return this.prisma.ortomat.findUnique({ where: { id } }); }
}