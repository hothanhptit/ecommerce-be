import { IsString } from 'class-validator';

export class ProductInfoDTO {
  @IsString()
  model: string;

  @IsString()
  code: string;
  
  @IsString()
  manufacturer?: string;

  @IsString()
  origin: string;

  @IsString()
  warranty: string;

  @IsString()
  catalogue?: string;

  @IsString()
  rating?: string;
}
