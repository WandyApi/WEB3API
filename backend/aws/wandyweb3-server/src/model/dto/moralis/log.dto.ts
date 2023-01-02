import { ApiProperty } from '@nestjs/swagger';

export class LogDTO {
  /** @example 273 */
  @ApiProperty({ example: 273 })
  log_index: string;
  /**
   * @description The hash of the transaction
   * @example 0xdd9006489e46670e0e85d1fb88823099e7f596b08aeaac023e9da0851f26fdd5
   */
  @ApiProperty({
    example:
      '0xdd9006489e46670e0e85d1fb88823099e7f596b08aeaac023e9da0851f26fdd5',
    description: 'The hash of the transaction',
  })
  transaction_hash: string;
  /** @example 204 */
  @ApiProperty({ example: '204', description: '' })
  transaction_index: string;
  /**
   * @description The address of the contract
   * @example 0x3105d328c66d8d55092358cf595d54608178e9b5
   */
  @ApiProperty({
    example: '0x3105d328c66d8d55092358cf595d54608178e9b5',
    description: 'The address of the contract',
  })
  address: string;
  /**
   * @description The data of the log
   * @example 0x00000000000000000000000000000000000000000000000de05239bccd4d537400000000000000000000000000024dbc80a9f80e3d5fc0a0ee30e2693781a443
   */
  @ApiProperty({
    example:
      '0x00000000000000000000000000000000000000000000000de05239bccd4d537400000000000000000000000000024dbc80a9f80e3d5fc0a0ee30e2693781a443',
    description: 'The data of the log',
  })
  data: string;
  /** @example 0x2caecd17d02f56fa897705dcc740da2d237c373f70686f4e0d9bd3bf0400ea7a */
  @ApiProperty({
    example:
      '0x2caecd17d02f56fa897705dcc740da2d237c373f70686f4e0d9bd3bf0400ea7a',
    description: '',
  })
  topic0: string;
  /** @example 0x000000000000000000000000031002d15b0d0cd7c9129d6f644446368deae391 */
  @ApiProperty({
    example:
      '0x000000000000000000000000031002d15b0d0cd7c9129d6f644446368deae391',
    description: '',
  })
  topic1?: string;
  /** @example 0x000000000000000000000000d25943be09f968ba740e0782a34e710100defae9 */
  @ApiProperty({
    example:
      '0x000000000000000000000000d25943be09f968ba740e0782a34e710100defae9',
    description: '',
  })
  topic2?: string;
  @ApiProperty({ example: '', description: '' })
  topic3?: string;
  /**
   * @description The timestamp of the block
   * @example 2021-05-07T11:08:35.000Z
   */
  @ApiProperty({
    example: '2021-05-07T11:08:35.000Z',
    description: 'The timestamp of the block',
  })
  block_timestamp: string;
  /**
   * @description The block number
   * @example 12386788
   */
  @ApiProperty({ example: '12386788', description: 'The block number' })
  block_number: string;
  /**
   * @description The hash of the block
   * @example 0x9b559aef7ea858608c2e554246fe4a24287e7aeeb976848df2b9a2531f4b9171
   */
  @ApiProperty({
    example:
      '0x9b559aef7ea858608c2e554246fe4a24287e7aeeb976848df2b9a2531f4b9171',
    description: 'The hash of the block',
  })
  block_hash: string;
}
