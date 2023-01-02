import { ApiProperty } from '@nestjs/swagger';
import { ChainQuery } from '../../evm/chain.query';

export class TokenMetadataQuery extends ChainQuery {
  /** The addresses to get metadata for */
  @ApiProperty({
    type: Array,
    example: [
      '0xdac17f958d2ee523a2206206994597c13d831ec7',
      '0xba2ae424d960c26247dd6c32edc70b295c744c43',
    ],
    description: 'The addresses to get metadata for',
  })
  addresses: string[];
  /** web3 provider url to user when using local dev chain */
  // @ApiProperty({
  //   required: false,
  //   description: 'web3 provider url to user when using local dev chain',
  // })
  // providerUrl?: string;
}
