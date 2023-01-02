import { ApiProperty } from '@nestjs/swagger';

export class Erc20TransactionDTO {
  /**
   * @description The transaction hash
   * @example 0x2d30ca6f024dbc1307ac8a1a44ca27de6f797ec22ef20627a1307243b0ab7d09
   */
  @ApiProperty({
    example:
      '0x2d30ca6f024dbc1307ac8a1a44ca27de6f797ec22ef20627a1307243b0ab7d09',
    description: 'The transaction hash',
  })
  transaction_hash: string;
  /**
   * @description The address of the token
   * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
   */
  @ApiProperty({
    example: '0x057Ec652A4F150f7FF94f089A38008f49a0DF88e',
    description: 'The address of the token',
  })
  address: string;
  /**
   * @description The block timestamp
   * @example 2021-04-02T10:07:54.000Z
   */
  @ApiProperty({
    example: '2021-04-02T10:07:54.000Z',
    description: 'The block timestamp',
  })
  block_timestamp: string;
  /**
   * @description The block number
   * @example 12526958
   */
  @ApiProperty({ example: '12526958', description: 'The block number' })
  block_number: string;
  /**
   * @description The block hash
   * @example 0x0372c302e3c52e8f2e15d155e2c545e6d802e479236564af052759253b20fd86
   */
  @ApiProperty({
    example:
      '0x0372c302e3c52e8f2e15d155e2c545e6d802e479236564af052759253b20fd86',
    description: 'The block hash',
  })
  block_hash: string;
  /**
   * @description The recipient
   * @example 0x62AED87d21Ad0F3cdE4D147Fdcc9245401Af0044
   */
  @ApiProperty({
    example: '0x62AED87d21Ad0F3cdE4D147Fdcc9245401Af0044',
    description: 'The recipient',
  })
  to_address: string;
  /**
   * @description The sender
   * @example 0xd4a3BebD824189481FC45363602b83C9c7e9cbDf
   */
  @ApiProperty({
    example: '0xd4a3BebD824189481FC45363602b83C9c7e9cbDf',
    description: 'The sender',
  })
  from_address: string;
  /**
   * @description The value that was transfered (in wei)
   * @example 650000000000000000
   */
  @ApiProperty({
    example: '',
    description: 'The value that was transfered (in wei)',
  })
  value: string;
}
