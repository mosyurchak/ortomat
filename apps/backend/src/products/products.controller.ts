import { Controller, Get, Param } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
  constructor(private svc: ProductsService) {}

  @Get()
  list() { return this.svc.list(); }

  @Get(":id")
  details(@Param("id") id: string) { return this.svc.byId(id); }
}