import { ApiProperty } from '@nestjs/swagger';

export class BlockDateDTO {
  /**
   * @description The date of the block
   * @example 2020-01-01T00:00:00+00:00
   */
  @ApiProperty({
    example: '2020-01-01T00:00:00+00:00',
    description: 'The date of the block',
  })
  date: string;
  /**
   * @description The blocknumber
   * @example 9193266
   */
  @ApiProperty({ example: '9193266', description: 'The blocknumber' })
  block: number;
  /**
   * @description The timestamp of the block
   * @example 1577836811
   */
  @ApiProperty({
    example: '1577836811',
    description: 'The timestamp of the block',
  })
  timestamp: number;
}
