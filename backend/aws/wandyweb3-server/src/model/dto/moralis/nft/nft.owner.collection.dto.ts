import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { NftOwnerDTO } from './nft.owner.dto';

export class NftOwnerCollectionDTO {
  /**
   * @description The syncing status of the address [SYNCING/SYNCED]
   * @example SYNCING
   */
  // @ApiProperty({
  //   example: 'SYNCING',
  //   description: 'The syncing status of the address [SYNCING/SYNCED]',
  // })
  // status?: string;

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
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21QYXJhbXMiOnsid2FsbGV0QWRkcmVzcyI6IjB4ZDhkYTZiZjI2OTY0YWY5ZDdlZWQ5ZTAzZTUzNDE1ZDM3YWE5NjA0NSJ9LCJrZXlzIjpbIjE2NzE3NDkyNjAuNDgxIl0sIndoZXJlIjp7Im93bmVyX29mIjoiMHhkOGRhNmJmMjY5NjRhZjlkN2VlZDllMDNlNTM0MTVkMzdhYTk2MDQ1In0sImxpbWl0IjoxMCwib2Zmc2V0IjowLCJvcmRlciI6W10sImRpc2FibGVfdG90YWwiOmZhbHNlLCJ0b3RhbCI6MTc1MCwicGFnZSI6MSwidGFpbE9mZnNldCI6MSwiaWF0IjoxNjcyNTgxMzc0fQ.SRbBLIk475cXLzieQyxP8HT_jEAnuJgfahwWxeBF1uk',
    description: 'The cursor to get to the next page',
  })
  cursor: string;

  @ApiProperty({
    description: 'nft result ',
    type: [NftOwnerDTO],
    oneOf: [{ $ref: getSchemaPath(NftOwnerDTO) }],
  })
  result?: NftOwnerDTO[];
}
