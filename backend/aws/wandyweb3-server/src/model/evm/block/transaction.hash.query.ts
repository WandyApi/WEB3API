import { ApiProperty } from '@nestjs/swagger';
import { ChainQuery } from '../chain.query';

export class TransactionHashQuery extends ChainQuery {
  @ApiProperty({
    example:
      '0xdc85cb1b75fd09c2f6d001fea4aba83764193cbd7881a1fa8ccde350a5681109',
    description: 'The transaction hash',
  })
  transactionHash: string;
}
