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
  manufacturer: string;

  @IsString()
  model: string;

  @IsString()
  origin: string;

  @IsString()
  warranty: string;

  @IsString()
  summary: string;

  @IsString()
  code: string;

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

  @IsString()
  rating?: string;
}
