import { ApiProperty } from '@nestjs/swagger';
import { PageQuery } from '../page.query';

export class BlockPageQuery extends PageQuery {
  @ApiProperty({
    required: false,
    description:
      "The minimum block number from where to get the transactions \
  1, Provide the param 'from_block' or 'from_date' \
  2,If 'from_date' and 'from_block' are provided, 'from_block' will be used.",
  })
  from_block: number;

  @ApiProperty({
    required: false,
    description:
      "The minimum block number from where to get the transactions \
    1, Provide the param 'to_block' or 'to_date' \
    2,If 'from_date' and 'to_block' are provided, 'to_block' will be used.",
  })
  to_block: number;

  @ApiProperty({
    required: false,
    description:
      "The date from where to get the transactions (any format that is accepted by momentjs) \
  1, Provide the param 'from_block' or 'from_date' \
  2,If 'from_date' and 'from_block' are provided, 'from_block' will be used.",
  })
  from_date: string;

  @ApiProperty({
    required: false,
    description:
      "Get the transactions to this date (any format that is accepted by momentjs) \
    1, Provide the param 'to_block' or 'to_date' \
    2,If 'from_date' and 'to_block' are provided, 'to_block' will be used.",
  })
  to_date: string;
}
