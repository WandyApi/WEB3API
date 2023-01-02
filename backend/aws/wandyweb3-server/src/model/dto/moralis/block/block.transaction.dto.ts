import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { LogDTO } from '../log.dto';

export class BlockTransactionDTO {
  /**
   * @description The hash of the transaction
   * @example 0x1ed85b3757a6d31d01a4d6677fc52fd3911d649a0af21fe5ca3f886b153773ed
   */
  @ApiProperty({
    example:
      '0x1ed85b3757a6d31d01a4d6677fc52fd3911d649a0af21fe5ca3f886b153773ed',
    description: 'The hash of the transaction',
  })
  hash: string;
  /**
   * @description The nonce
   * @example 1848059
   */
  @ApiProperty({ example: '1848059', description: 'The nonce' })
  nonce: string;
  /** @example 108 */
  @ApiProperty({ example: '108', description: '' })
  transaction_index: string;
  /**
   * @description The from address
   * @example 0x267be1c1d684f78cb4f6a176c4911b741e4ffdc0
   */
  @ApiProperty({
    example: '0x267be1c1d684f78cb4f6a176c4911b741e4ffdc0',
    description: 'The from address',
  })
  from_address: string;
  /**
   * @description The to address
   * @example 0x003dde3494f30d861d063232c6a8c04394b686ff
   */
  @ApiProperty({
    example: '0x003dde3494f30d861d063232c6a8c04394b686ff',
    description: 'The to address',
  })
  to_address: string;
  /**
   * @description The value sent
   * @example 115580000000000000
   */
  @ApiProperty({ example: '115580000000000000', description: 'The value sent' })
  value: string;
  /** @example 30000 */
  @ApiProperty({ example: '30000', description: '' })
  gas?: string;
  /**
   * @description The gas price
   * @example 52500000000
   */
  @ApiProperty({ example: '52500000000', description: 'The gas price' })
  gas_price: string;
  /** @example 0x */
  @ApiProperty({ example: '0x', description: '' })
  input: string;
  /** @example 4923073 */
  @ApiProperty({ example: '4923073', description: '' })
  receipt_cumulative_gas_used: string;
  /** @example 21000 */
  @ApiProperty({ example: '21000', description: '' })
  receipt_gas_used: string;
  @ApiProperty({ example: '', description: '' })
  receipt_contract_address?: string;
  @ApiProperty({ example: '', description: '' })
  receipt_root?: string;
  /** @example 1 */
  @ApiProperty({ example: '1', description: '' })
  receipt_status: string;
  /**
   * @description The block timestamp
   * @example 2021-05-07T11:08:35.000Z
   */
  @ApiProperty({
    example: '2021-05-07T11:08:35.000Z',
    description: 'The block timestamp',
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
  /** @description The logs of the transaction */
  @ApiProperty({
    description: 'The logs of the transaction ',
    type: [LogDTO],
    oneOf: [{ $ref: getSchemaPath(LogDTO) }],
  })
  logs: Array<LogDTO>;
}
