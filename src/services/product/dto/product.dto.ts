import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ProductDTO {
  @ApiProperty({ example: 'name', description: 'name' })
  @IsString()
  name: string;

  @ApiProperty({
    type: 'file',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  })
  file: any;

  // @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  // files: any[];
}
