import { ApiProperty } from '@nestjs/swagger';
import { ChainQuery } from '../../evm/chain.query';

export class TokenAllowanceQuery extends ChainQuery {
  /** The address of the token owner */
  @ApiProperty({
    example: '0xf348366c8df3210f021ab7b40b8015a55e90dda8',
    description: 'The address of the token owner',
  })
  ownerAddress: string;
  /** The address of the token spender */
  @ApiProperty({
    example: '0xf348366c8df3210f021ab7b40b8015a55e90dda8',
    description: 'The address of the token spender',
  })
  spenderAddress: string;
  /** The address of the token contract */
  @ApiProperty({
    example: '0xf348366c8df3210f021ab7b40b8015a55e90dda8',
    description: 'The address of the token contract',
  })
  address: string;
}
