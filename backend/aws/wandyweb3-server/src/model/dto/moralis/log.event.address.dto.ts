import { ApiProperty } from '@nestjs/swagger';

export class LogEventAddressDTO {
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
  @ApiProperty({ example: 'The block number', description: 'The block number' })
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
  topic1: string;
  /** @example 0x000000000000000000000000d25943be09f968ba740e0782a34e710100defae9 */
  @ApiProperty({
    example:
      '0x000000000000000000000000d25943be09f968ba740e0782a34e710100defae9',
    description: '',
  })
  topic2: string;
  @ApiProperty({
    example:
      '0x000000000000000000000000d25943be09f968ba740e0782a34e710100defae9',
    description: '',
  })
  topic3: string;
}
