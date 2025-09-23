import { Controller, Get, Param } from "@nestjs/common";
import { OrtomatsService } from "./ortomats.service";

@Controller("ortomats")
export class OrtomatsController {
  constructor(private svc: OrtomatsService) {}

  @Get()
  list() { return this.svc.list(); }

  @Get(":id")
  details(@Param("id") id: string) { return this.svc.byId(id); }
}