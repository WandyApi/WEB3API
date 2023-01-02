import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ChainQuery } from '../chain.query';

export class BalanceQuery extends ChainQuery {
  /** The address for which token balances will be checked */
  @ApiProperty({
    example: '0xf348366c8df3210f021ab7b40b8015a55e90dda8',
    description: 'The address for which token balances will be checked',
  })
  @IsNotEmpty()
  address: string;
}
