import { Module } from "@nestjs/common";
import { OrtomatsController } from "./ortomats.controller";

@Module({
  controllers: [OrtomatsController],
})
export class OrtomatsModule {}
