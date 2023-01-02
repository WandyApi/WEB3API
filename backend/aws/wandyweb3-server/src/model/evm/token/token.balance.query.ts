import { ApiProperty } from '@nestjs/swagger';
import { ChainQuery } from '../../evm/chain.query';

export class TokenBalanceQuery extends ChainQuery {
  /** The block number on which the balances should be checked */
  @ApiProperty({
    required: false,
    description: 'The block number on which the balances should be checked',
  })
  to_block?: number;

  /** The addresses to get balances for (Optional) */
  @ApiProperty({
    required: false,
    //example: ['0xa1bc2', '0xwe23dsq3'],
    type: Array,
    description: 'The addresses to get balances for (Optional)',
  })
  token_addresses?: string[];

  /** The address for which token balances will be checked */
  @ApiProperty({
    example: '0xf348366c8df3210f021ab7b40b8015a55e90dda8',
    description: 'The address for which token balances will be checked',
  })
  address: string;
}
