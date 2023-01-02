import { ApiProperty } from '@nestjs/swagger';

export class LogEventDTO {
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
   * @description The address of the contract
   * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
   */
  @ApiProperty({
    example: '0x057Ec652A4F150f7FF94f089A38008f49a0DF88e',
    description: 'The address of the contract',
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
  /** @description The content of the event */
  @ApiProperty({
    description: 'The content of the event',
    type: () => ContentData,
  })
  data: [ContentData];
}

class ContentData {
  /** @example 0x54ff6974c715956a5049a123408bff91fbe29f01 */
  @ApiProperty({
    example: '0x54ff6974c715956a5049a123408bff91fbe29f01',
    description: '',
  })
  from?: string;
  /** @example 0x74de5d4fcbf63e00296fd95d33236b9794016631 */
  @ApiProperty({
    example: '0x74de5d4fcbf63e00296fd95d33236b9794016631',
    description: '',
  })
  to?: string;
  /** @example 260103496340000000000 */
  @ApiProperty({ example: '260103496340000000000', description: '' })
  value?: string;
}
