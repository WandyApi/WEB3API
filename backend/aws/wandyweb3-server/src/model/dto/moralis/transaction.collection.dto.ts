import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { TransactionDTO } from './transaction.dto';

export class TransactionCollectionDTO {
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

  @ApiProperty({
    description: 'Transaction result ',
    type: [TransactionDTO],
    oneOf: [{ $ref: getSchemaPath(TransactionDTO) }],
  })
  result?: TransactionDTO[];
}
