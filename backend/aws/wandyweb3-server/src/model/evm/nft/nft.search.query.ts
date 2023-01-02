import { ApiProperty } from '@nestjs/swagger';
import { BlockPageQuery } from '../block/block.page.query';

export class NftSearchQuery extends BlockPageQuery {
  /** The format of the token id */
  @ApiProperty({
    required: false,
    example: 'hex',
    description: 'The format of the token id',
  })
  format?: 'decimal' | 'hex';
  /** The search string */
  @ApiProperty({ example: 'key words', description: 'The search string' })
  q: string;
  /** What fields the search should match on. To look into the entire metadata set the value to 'global'. To have a better response time you can look into a specific field like name */
  @ApiProperty({
    required: false,
    example: 'name,description',
    default: 'global',
    description:
      'What fields the search should match on. To look into the entire metadata set the value to global. To have a better response time you can look into a specific field like name. Available values : name; description; attributes; global; name,description; name,attributes; description,attributes; name,description,attributes',
  })
  filter?:
    | 'name'
    | 'description'
    | 'attributes'
    | 'global'
    | 'name,description'
    | 'name,attributes'
    | 'description,attributes'
    | 'name,description,attributes';

  /** The addresses to get metadata for */
  @ApiProperty({
    required: false,
    example: [],
    description: 'The addresses to get metadata for',
  })
  addresses?: string[];
}
