import { ApiProperty } from '@nestjs/swagger';

export class TransactionDTO {
  /**
   * @description The hash of the transaction
   * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
   */
  @ApiProperty({
    example: '0x057Ec652A4F150f7FF94f089A38008f49a0DF88e',
    description: 'The hash of the transaction',
  })
  hash: string;
  /**
   * @description The nonce of the transaction
   * @example 326595425
   */
  @ApiProperty({
    example: '326595425',
    description: 'The nonce of the transaction',
  })
  nonce: string;
  /**
   * @description The transaction index
   * @example 25
   */
  @ApiProperty({ example: '25', description: 'The transaction index' })
  transaction_index: string;
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
   * @description The recipient
   * @example 0xa71db868318f0a0bae9411347cd4a6fa23d8d4ef
   */
  @ApiProperty({
    example: '0xa71db868318f0a0bae9411347cd4a6fa23d8d4ef',
    description: 'The recipient',
  })
  to_address: string;
  /**
   * @description The value that was transfered (in wei)
   * @example 650000000000000000
   */
  @ApiProperty({
    example: '650000000000000000',
    description: 'The value that was transfered (in wei)',
  })
  value: string;
  /**
   * @description The gas of the transaction
   * @example 6721975
   */
  @ApiProperty({
    example: '6721975',
    description: 'The gas of the transaction',
  })
  gas: string;
  /**
   * @description The gas price
   * @example 20000000000
   */
  @ApiProperty({ example: '20000000000', description: 'The gas price' })
  gas_price: string;
  /** @description The input */
  @ApiProperty({ example: '', description: 'The input' })
  input: string;
  /**
   * @description The receipt cumulative gas used
   * @example 1340925
   */
  @ApiProperty({
    example: '1340925',
    description: 'The receipt cumulative gas used',
  })
  receipt_cumulative_gas_used: string;
  /**
   * @description The receipt gas used
   * @example 1340925
   */
  @ApiProperty({ example: '1340925', description: 'The receipt gas used' })
  receipt_gas_used: string;
  /**
   * @description The receipt contract address
   * @example 0x1d6a4cf64b52f6c73f201839aded7379ce58059c
   */
  @ApiProperty({
    example: '0x1d6a4cf64b52f6c73f201839aded7379ce58059c',
    description: 'The receipt contract address',
  })
  receipt_contract_address: string;
  /** @description The receipt root */
  @ApiProperty({ example: '', description: 'The receipt root' })
  receipt_root: string;
  /**
   * @description The receipt status
   * @example 1
   */
  @ApiProperty({ example: '1', description: 'The receipt status' })
  receipt_status: string;
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
}
