import { ApiProperty } from '@nestjs/swagger';
import { PageQuery } from '../page.query';

export class NFTransfersQuery extends PageQuery {
  /** The format of the token id */
  @ApiProperty({
    required: false,
    example: 'decimal',
    description: 'The format of the token id,value is decimal or hex',
  })
  format?: 'decimal' | 'hex';

  /** The transfer direction */
  @ApiProperty({
    required: false,
    example: 'both',
    description: 'The transfer direction,value is = both | to | from',
  })
  direction?: 'both' | 'to' | 'from';

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
    example: '0x128ad2b1058b095b864c0ce779e89a3d1e5c1a95',
    description: 'The sender or recepient of the transfer',
  })
  address: string;
}
