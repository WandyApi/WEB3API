import { ApiProperty } from '@nestjs/swagger';
import { ChainQuery } from './chain.query';

export class PageQuery extends ChainQuery {
  @ApiProperty({ example: 100, required: false })
  limit: number;

  @ApiProperty({
    required: false,
    description:
      'The cursor returned in the last response (for getting the next page)',
  })
  cursor: string;

  /** If the result should skip returning the total count (Improves performance). */
  @ApiProperty({
    required: false,
    example: '',
    description:
      'If the result should skip returning the total count (Improves performance).',
  })
  disableTotal?: boolean;
}
