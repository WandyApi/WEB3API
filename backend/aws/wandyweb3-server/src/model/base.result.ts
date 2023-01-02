import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class BaseResult<T> {
  @ApiProperty({ example: '0' })
  code: number;

  @ApiProperty({ example: 'success' })
  msg: string;

  @IsNotEmpty()
  @ApiProperty({ example: {} })
  data?: T;
}
