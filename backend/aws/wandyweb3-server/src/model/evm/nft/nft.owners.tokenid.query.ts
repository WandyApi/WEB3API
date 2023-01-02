import { ApiProperty } from '@nestjs/swagger';
import { PageQuery } from '../page.query';

export class NFTOwnersTokenIdQuery extends PageQuery {
  /** The format of the token id */
  @ApiProperty({
    required: false,
    example: 'decimal',
    description: 'The format of the token id,value is decimal or hex',
  })
  format?: 'decimal' | 'hex';

  /** Address of the contract */
  @ApiProperty({
    example: '0xbd3531da5cf5857e7cfaa92426877b022e612cf8',
    description: 'Address of the contract',
  })
  address: string;

  /**The id of the tokens */
  @ApiProperty({ example: '865', description: 'The id of the token' })
  tokenId: string;

  /** Should normalized metadata be returned? */
  @ApiProperty({
    required: false,
    example: '',
    description: 'Should normalized metadata be returned?',
  })
  normalizeMetadata?: boolean;
}
