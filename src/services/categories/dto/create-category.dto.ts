import { IsNumber, IsString } from 'class-validator';
export class CreateCategoryDto {
  @IsString()
  name: string;

  image: string;

  @IsNumber()
  status: number;

  children: string;
//   @IsString()
//   manufacturer: string;
  @IsString()
  description: string;
}
