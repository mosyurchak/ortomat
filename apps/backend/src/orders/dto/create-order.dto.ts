import { IsString, IsInt, IsOptional, IsNumber } from "class-validator";

export class CreateOrderDto {
  @IsString()
  ortomat_id: string;

  @IsInt()
  cell_number: number;

  @IsString()
  product_id: string;

  @IsOptional()
  @IsString()
  doctor_id?: string;

  @IsOptional()
  @IsString()
  customer_phone?: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  commission?: number;

  @IsString()
  payment_status: string;
}
