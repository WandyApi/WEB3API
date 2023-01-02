import { ApiProperty } from '@nestjs/swagger';
import { ChainQuery } from '../../evm/chain.query';

export class TokenPriceQuery extends ChainQuery {
  /** The address of the token contract */
  @ApiProperty({
    example: '0x4d224452801aced8b2f0aebe155379bb5d594381',
    description: 'The address of the token contract',
  })
  address: string;
  /** web3 provider url to user when using local dev chain */
  // @ApiProperty({
  //   required: false,
  //   example: '',
  //   description: 'web3 provider url to user when using local dev chain',
  // })
  // providerUrl?: string;
  /** The block number on which the balances should be checked */
  @ApiProperty({
    required: false,
    description: 'The block number on which the balances should be checked',
  })
  to_block?: number;
  /** The factory name or address of the token exchange */
  @ApiProperty({
    required: false,
    description: 'The factory name or address of the token exchange',
  })
  exchange?: string;
}
