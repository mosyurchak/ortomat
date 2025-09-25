import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

@Controller("profile")
export class ProfileController {
  @UseGuards(JwtAuthGuard)
  @Get()
  async getProfile(@Req() req) {
    return req.user;
  }
}
