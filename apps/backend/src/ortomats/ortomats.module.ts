import { Module } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import { OrtomatsService } from "./ortomats.service";
import { OrtomatsController } from "./ortomats.controller";

@Module({ providers: [PrismaService, OrtomatsService], controllers: [OrtomatsController] })
export class OrtomatsModule {}