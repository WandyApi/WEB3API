import { ApiProperty } from '@nestjs/swagger';
import { ChainQuery } from '../../evm/chain.query';

export class NFTLowestPriceQuery extends ChainQuery {
  /**
   * The number of days to look back to find the lowest price
   * If not provided 7 days will be the default
   */
  @ApiProperty({
    required: false,
    example: 1,
    description:
      'The number of days to look back to find the lowest price If not provided 7 days will be the default',
  })
  days?: number;

  /** web3 provider url to user when using local dev chain */
  @ApiProperty({
    required: false,
    example: '',
    description: 'web3 provider url to user when using local dev chain',
  })
  provider_url?: string;
  /** marketplace from where to get the trades (only opensea is supported at the moment) */
  @ApiProperty({
    example: 'opensea',
    description:
      'marketplace from where to get the trades (only opensea is supported at the moment) ',
  })
  marketplace?: 'opensea';

  /** Address of the contract */
  @ApiProperty({
    example: '0xbd3531da5cf5857e7cfaa92426877b022e612cf8',
    description: 'Address of the contract',
  })
  address: string;
}
