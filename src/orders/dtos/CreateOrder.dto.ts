import { IsNotEmpty, MinLength } from "class-validator";

export class CreateOrderDto {
  @IsNotEmpty()
  name: string;

  food: string;

  supplement: string
}