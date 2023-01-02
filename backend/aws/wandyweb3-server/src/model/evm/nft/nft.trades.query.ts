import { ApiProperty } from '@nestjs/swagger';
import { PageQuery } from '../page.query';

export class NFTradesQuery extends PageQuery {
  @ApiProperty({
    required: false,
    description:
      "The minimum block number from where to get the transactions \
  1, Provide the param 'from_block' or 'from_date' \
  2,If 'from_date' and 'from_block' are provided, 'from_block' will be used.",
  })
  from_block?: number;

  @ApiProperty({
    required: false,
    description:
      "The minimum block number from where to get the transactions \
    1, Provide the param 'to_block' or 'to_date' \
    2,If 'from_date' and 'to_block' are provided, 'to_block' will be used.",
  })
  to_block?: string;

  @ApiProperty({
    required: false,
    description:
      "The date from where to get the transactions (any format that is accepted by momentjs) \
  1, Provide the param 'from_block' or 'from_date' \
  2,If 'from_date' and 'from_block' are provided, 'from_block' will be used.",
  })
  from_date?: string;

  @ApiProperty({
    required: false,
    description:
      "Get the transactions to this date (any format that is accepted by momentjs) \
    1, Provide the param 'to_block' or 'to_date' \
    2,If 'from_date' and 'to_block' are provided, 'to_block' will be used.",
  })
  to_date?: string;

  /** web3 provider url to user when using local dev chain */
  @ApiProperty({
    required: false,
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
