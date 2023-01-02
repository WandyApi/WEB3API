import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { NftTransferDTO } from './nft.transfer.dto';

export class NftTransferCollectionDTO {
  /**
   * @description The total number of matches for this query
   * @example 2000
   */
  @ApiProperty({
    example: 2000,
    description: 'The total number of matches for this query',
  })
  total?: number;
  /**
   * @description The page of the current result
   * @example 2
   */
  @ApiProperty({ example: 2, description: 'The page of the current result' })
  page?: number;
  /**
   * @description The number of results per page
   * @example 100
   */
  @ApiProperty({ example: 100, description: 'The number of results per page' })
  page_size?: number;

  /** @description The cursor to get to the next page */
  @ApiProperty({
    example: '',
    description: 'The cursor to get to the next page',
  })
  cursor: string;
  /**
   * @description Indicator if the block exists
   * @example true
   */
  @ApiProperty({ example: true, description: ' Indicator if the block exists' })
  block_exists?: boolean;
  /**
   * @description Indicator if the block is fully indexed
   * @example true
   */
  @ApiProperty({
    example: true,
    description: 'Indicator if the block is fully indexed',
  })
  index_complete?: boolean;

  @ApiProperty({
    description: 'Transaction result ',
    type: [NftTransferDTO],
    oneOf: [{ $ref: getSchemaPath(NftTransferDTO) }],
  })
  result?: NftTransferDTO[];
}
