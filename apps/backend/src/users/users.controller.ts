import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";

@Controller("users")
export class UsersController {
  constructor(private users: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  profile(@Req() req: any) {
    return this.users.me(req.user.sub);
  }
}