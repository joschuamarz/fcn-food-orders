import { IsNotEmpty, MinLength } from "class-validator";

export class CreateOrderDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @MinLength(3)
  order: string;
}