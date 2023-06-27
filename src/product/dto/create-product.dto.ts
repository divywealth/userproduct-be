import { IsNotEmpty } from 'class-validator';
import { Express } from 'express';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  designer: string;

  file: Express.Multer.File;

  @IsNotEmpty()
  img: string;

  @IsNotEmpty()
  price: number;
}
