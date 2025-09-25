import { Controller, Get } from "@nestjs/common";

@Controller("products")
export class ProductsController {
  @Get()
  async findAll() {
    return [
      { id: "p1", name: "Knee Brace", price: 1200 },
      { id: "p2", name: "Wrist Support", price: 800 }
    ];
  }
}
