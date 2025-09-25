import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";

@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post("create")
  async create(@Body() dto: CreateOrderDto) {
    return this.ordersService.create(dto);
  }

  @Get()
  async findAll() {
    return this.ordersService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.ordersService.findOne(id);
  }
}
