import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { RegisterDto } from "./register.dto";
import { LoginDto } from "./login.dto";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async register(dto: RegisterDto) {
    const exists = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (exists) throw new UnauthorizedException("Email already in use");
    const password_hash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password_hash,
        role: dto.role,
        first_name: dto.first_name,
        last_name: dto.last_name,
        phone: dto.phone,
        is_verified: true
      },
      select: { id: true, email: true, role: true, first_name: true, last_name: true }
    });
    return user;
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException("Invalid credentials");
    const ok = await bcrypt.compare(dto.password, user.password_hash);
    if (!ok) throw new UnauthorizedException("Invalid credentials");
    const access_token = await this.jwt.signAsync({ sub: user.id, email: user.email, role: user.role }, { expiresIn: "15m" });
    const refresh_token = await this.jwt.signAsync({ sub: user.id }, { expiresIn: "30d" });
    return { access_token, refresh_token };
  }
}