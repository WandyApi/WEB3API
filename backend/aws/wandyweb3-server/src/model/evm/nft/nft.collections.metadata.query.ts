import { ApiProperty } from '@nestjs/swagger';
import { ChainQuery } from '../chain.query';

export class NFTCollectionsMetadataQuery extends ChainQuery {
  /** The addresses to get metadata for */
  @ApiProperty({
    example: '0xbd3531da5cf5857e7cfaa92426877b022e612cf8',
    description: 'The addresses to get metadata for',
  })
  address: string;
}
