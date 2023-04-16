import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class ProductDTO {
  @IsString()
  name: string;

  slug: string;

  @IsNumber()
  status: string;

  images: string;

  @IsNumber()
  isFeatured: number;

  @IsString()
  manufacturer: number;

  @IsString()
  summary: string;

  @IsString()
  price: string;

  @IsString()
  description: string;

  descriptionImages: string;

  catalogue: string;

  @IsString()
  specs: string;

  specsImages: string;

  @IsString()
  detailsDescription: string;

  @IsString()
  categoryId: string;
  
  @IsString()
  type: string;
}
