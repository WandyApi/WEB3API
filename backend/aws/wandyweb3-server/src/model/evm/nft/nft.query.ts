import { ApiProperty } from '@nestjs/swagger';
import { PageQuery } from '../page.query';

export class NftQuery extends PageQuery {
  /** The format of the token id */
  @ApiProperty({
    required: false,
    example: 'decimal',
    description: 'The format of the token id,value is decimal or hex',
  })
  format?: 'decimal' | 'hex';

  /** The addresses to get metadata for */
  @ApiProperty({
    example: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    description: 'The owner of a given token',
  })
  address: string;

  /** token_address */
  @ApiProperty({
    required: false,
    type: Array,
    example: [],
    description: 'he addresses to get balances for (Optional)',
  })
  token_addresses?: string[];

  /** Should normalized metadata be returned? */
  @ApiProperty({
    required: false,
    type: Boolean,
    example: false,
    description: 'Should normalized metadata be returned?',
  })
  normalizeMetadata?: boolean;
}
