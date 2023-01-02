import { ApiProperty } from '@nestjs/swagger';
import { PageQuery } from '../page.query';

export class NFTOwnersContractQuery extends PageQuery {
  /** The format of the token id */
  @ApiProperty({
    required: false,
    example: 'hex',
    description: 'The format of the token id,value is decimal or hex',
  })
  format?: 'decimal' | 'hex';

  /** Address of the contract */
  @ApiProperty({
    example: '0x674d37ac70e3a946b4a3eb85eeadf3a75407ee41',
    description: 'Address of the contract',
  })
  address: string;

  /** Should normalized metadata be returned? */
  @ApiProperty({
    required: false,
    example: '',
    description: 'Should normalized metadata be returned?',
  })
  normalizeMetadata?: boolean;
}
