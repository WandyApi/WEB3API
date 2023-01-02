import { ApiProperty } from '@nestjs/swagger';
import { ChainQuery } from '../chain.query';

export class TokenItem {
  /**
   * @description The contract address
   * @example 0x06012c8cf97bead5deae237070f9587f8e7a266d
   */
  @ApiProperty({
    required: false,
    example: '0x06012c8cf97bead5deae237070f9587f8e7a266d',
    description: 'The contract address',
  })
  tokenAddress?: string;
  /**
   * @description The id of the token
   * @example 100
   */
  @ApiProperty({
    required: false,
    example: '1',
    description: 'The id of the token',
  })
  tokenId?: string;
}

export class NFTMultipleQuery extends ChainQuery {
  /** Should normalized metadata be returned? */
  @ApiProperty({
    required: false,
    example: false,
    description: 'Should normalized metadata be returned?',
  })
  normalizeMetadata?: boolean;

  @ApiProperty({
    isArray: true,
    description: 'Transaction result ',
    type: TokenItem,
    // oneOf: [{ $ref: getSchemaPath(TokenItem) }],
  })
  tokens: {
    tokenAddress: string;
    tokenId: string;
  }[];
}
