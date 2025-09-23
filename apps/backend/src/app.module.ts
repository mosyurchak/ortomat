import "reflect-metadata";
import * as dotenv from "dotenv";
import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { ProductsModule } from "./products/products.module";
import { OrtomatsModule } from "./ortomats/ortomats.module";
import { OrdersModule } from "./orders/orders.module";

dotenv.config({ path: require("path").resolve(process.cwd(), "..", "..", ".env") });

@Module({
  imports: [AuthModule, UsersModule, ProductsModule, OrtomatsModule, OrdersModule],
})
export class AppModule {}