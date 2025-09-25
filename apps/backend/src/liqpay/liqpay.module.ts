import { Module } from "@nestjs/common";
import { LiqpayService } from "./liqpay.service";
import { LiqpayController } from "./liqpay.controller";
import { OrdersModule } from "../orders/orders.module";

@Module({
  imports: [OrdersModule],   // рџ‘€ РїС–РґРєР»СЋС‡Р°С”РјРѕ OrdersModule
  controllers: [LiqpayController],
  providers: [LiqpayService],
})
export class LiqpayModule {}
