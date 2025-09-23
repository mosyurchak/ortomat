import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { OrdersService } from "./orders.service";

@Controller("orders")
export class OrdersController {
  constructor(private svc: OrdersService) {}

  @Post("create")
  create(@Body() body: any) {
    return this.svc.create(body);
  }

  @Post(":id/pay")
  pay(@Param("id") id: string) {
    return this.svc.payInit(id);
  }

  @Post("callback")
  callback(@Body() data: any) {
    return this.svc.liqpayCallback(data);
  }

  @Get(":id")
  byId(@Param("id") id: string) {
    return this.svc.byId(id);
  }
}