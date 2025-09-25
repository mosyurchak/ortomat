import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { PrismaService } from "../common/prisma/prisma.service";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string) {
    console.log("🔎 validateUser START", { email, pass });

    const user = await this.prisma.user.findFirst({ where: { email } });
    console.log("🔎 validateUser FOUND:", user);

    if (!user) return null;

    const isMatch =
      pass === user.password_hash ||
      (await bcrypt.compare(pass, user.password_hash));

    console.log("🔎 validateUser COMPARE:", {
      pass,
      stored: user.password_hash,
      isMatch,
    });

    if (!isMatch) return null;

    const { password_hash, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      ...user,
    };
  }

  async register(data: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone: string;
    role: string;
  }) {
    const existing = await this.prisma.user.findFirst({
      where: { email: data.email },
    });
    if (existing) {
      throw new UnauthorizedException("User already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password_hash: hashedPassword,
        role: data.role,
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        is_verified: true,
      },
    });

    const { password_hash, ...result } = user;
    return result;
  }
}
