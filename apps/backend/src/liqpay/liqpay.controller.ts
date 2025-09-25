import { Controller, Post, Body } from "@nestjs/common";
import { LiqpayService } from "./liqpay.service";
import { PaymentDto } from "./dto/payment.dto";
import { OrdersService } from "../orders/orders.service";

@Controller("liqpay")
export class LiqpayController {
  constructor(
    private readonly liqpayService: LiqpayService,
    private readonly ordersService: OrdersService
  ) {}

  @Post("generate")
  generate(@Body() dto: PaymentDto) {
    const params = {
      version: 3,
      action: "pay",
      amount: dto.amount,
      currency: "UAH",
      description: dto.description,
      order_id: dto.orderId,
      result_url: dto.resultUrl || "http://localhost:3001/payment/success",
      server_url: dto.serverUrl || "http://localhost:3001/liqpay/callback",
      public_key: process.env.LIQPAY_PUBLIC_KEY || "test_public_key",
    };
    return this.liqpayService.generateData(params);
  }

  @Post("callback")
  async callback(@Body() body: any) {
    const { data, signature } = body;
    const isValid = this.liqpayService.validateSignature(data, signature);
    if (!isValid) {
      return { status: "error", message: "Invalid signature" };
    }
    const decoded = JSON.parse(Buffer.from(data, "base64").toString("utf-8"));

    // РћРЅРѕРІР»СЋС”РјРѕ СЃС‚Р°С‚СѓСЃ Р·Р°РјРѕРІР»РµРЅРЅСЏ + РєРѕРјС–СЃС–СЋ Р»С–РєР°СЂСЋ
    await this.ordersService.updatePaymentStatus(
      decoded.order_id,
      decoded.status,
      decoded.payment_id,
    );

    return { status: "ok", data: decoded };
  }
}
