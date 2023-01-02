import { ApiProperty } from '@nestjs/swagger';
import { PageQuery } from '../page.query';

export class NFTContractQuery extends PageQuery {
  /** The format of the token id */
  @ApiProperty({
    required: false,
    example: 'hex',
    description: 'The format of the token id,value is decimal or hex',
  })
  format?: 'decimal' | 'hex';

  @ApiProperty({
    example: '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB',
    description: 'The address of the NFT contract ',
  })
  address: string;

  /** The number of subranges to split the results into */
  @ApiProperty({
    required: false,
    example: '',
    description: 'The number of subranges to split the results into',
  })
  totalRanges?: number;

  /** The desired subrange to query */
  @ApiProperty({
    required: false,
    example: '',
    description: 'The desired subrange to query',
  })
  range?: number;

  /** Should normalized metadata be returned? */
  @ApiProperty({
    required: false,
    example: '',
    description: 'Should normalized metadata be returned?',
  })
  normalizeMetadata?: boolean;
}
