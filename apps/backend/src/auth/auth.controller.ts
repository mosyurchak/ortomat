import { Controller, Post, Body, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(
    @Body()
    body: {
      email: string;
      password?: string;
      password_hash?: string;
      first_name: string;
      last_name: string;
      phone: string;
      role: string;
    }
  ) {
    const pass = body.password || body.password_hash;
    if (!pass) throw new UnauthorizedException("Password is required");
    return this.authService.register({ ...body, password: pass });
  }

  @Post("login")
  async login(
    @Body() body: { email: string; password?: string; password_hash?: string }
  ) {
    const pass = body.password || body.password_hash;
    if (!pass) throw new UnauthorizedException("Password is required");

    const user = await this.authService.validateUser(body.email, pass);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }
    return this.authService.login(user);
  }
}
