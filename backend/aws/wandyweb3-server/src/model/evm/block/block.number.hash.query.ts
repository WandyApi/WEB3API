import { ApiProperty } from '@nestjs/swagger';
import { ChainQuery } from '../../evm/chain.query';

export class BlockNumberHashQuery extends ChainQuery {
  @ApiProperty({
    example: '5',
    description: 'The block hash or block number.',
  })
  blockNumberOrHash: string;
}
