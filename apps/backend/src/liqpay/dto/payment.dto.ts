import { IsString, IsNumber, IsOptional } from "class-validator";

export class PaymentDto {
  @IsString()
  orderId: string;

  @IsNumber()
  amount: number;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  resultUrl?: string;

  @IsOptional()
  @IsString()
  serverUrl?: string;
}
