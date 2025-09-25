import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { ProfileModule } from "./profile/profile.module";
import { ProductsModule } from "./products/products.module";
import { OrtomatsModule } from "./ortomats/ortomats.module";

@Module({
  imports: [AuthModule, ProfileModule, ProductsModule, OrtomatsModule],
})
export class AppModule {}
