import { ApiProperty } from '@nestjs/swagger';
import { BlockPageQuery } from '../block/block.page.query';

export class TokenTransactionsContractQuery extends BlockPageQuery {
  /** The addresses to get metadata for */
  @ApiProperty({
    example: '0xf348366c8df3210f021ab7b40b8015a55e90dda8',
    description: 'The addresses to get metadata for',
  })
  address: string;

  /** offset */
  @ApiProperty({
    example: 20,
    description: 'offset',
  })
  offset?: number;
}
