import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ProductDTO {
  // @ApiProperty({
  //   type: 'file',
  //   properties: {
  //     file: {
  //       type: 'string',
  //       format: 'binary',
  //     },
  //   },
  // })
  // file: any;

  // @ApiProperty({
  //   type: 'file',
  //   properties: {
  //     file: {
  //       type: 'string',
  //       format: 'binary',
  //     },
  //   },
  // })

  // @ApiProperty({ description: 'name' })
  name: string;

  // @ApiProperty({
  //   description: 'product img',
  //   type: 'array',
  //   items: { type: 'string', format: 'binary' },
  // })
  productImages: string;

  // @ApiProperty({ description: 'mo ta ngan gon' })
  summary: string;

  // @ApiProperty({ description: 'gia' })
  price: string;

  // @ApiProperty({ description: 'mo ta chi tiet' })
  description: string;

  // @ApiProperty({
  //   description: 'anh trong mo ta',
  //   type: 'array',
  //   items: { type: 'string', format: 'binary' },
  // })
  descriptionImages: string;
  // pdf file
  // @ApiProperty({ description: 'file mo ta(pdf)' })
  catalogue: string;

  // @ApiProperty({ description: 'thong so ky thuat' })
  specs: string;

  // @ApiProperty({
  //   description: 'anh trong thong so ky thuat',
  //   type: 'array',
  //   items: { type: 'string', format: 'binary' },
  // })
  specsImages: string;

  // @ApiProperty({ description: 'chi tiet mo ta' })
  detailsDescription: string;

  // @ApiProperty({ description: 'category' })
  categoryId: string;

  // @ApiProperty({ description: 'type' })
  type: string;
}
