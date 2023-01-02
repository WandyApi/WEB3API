import { ApiProperty } from '@nestjs/swagger';
import { PageQuery } from '../page.query';

export class NFTCollectionsWalletQuery extends PageQuery {
  /** The addresses to get metadata for */
  @ApiProperty({
    example: '0xbd3531da5cf5857e7cfaa92426877b022e612cf8',
    description: 'The addresses to get metadata for',
  })
  address: string;
}
