import { Controller, Get } from "@nestjs/common";

@Controller("ortomats")
export class OrtomatsController {
  @Get()
  async findAll() {
    return [
      { id: "o1", name: "Ortomat 1", address: "Clinic A" },
      { id: "o2", name: "Ortomat 2", address: "Clinic B" }
    ];
  }
}
