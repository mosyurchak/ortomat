import { Module } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { PrismaService } from "../common/prisma/prisma.service";

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService],
  exports: [OrdersService],   // рџ‘€ СЂРѕР±РёРјРѕ РґРѕСЃС‚СѓРїРЅРёРј РґР»СЏ С–РЅС€РёС… РјРѕРґСѓР»С–РІ
})
export class OrdersModule {}
