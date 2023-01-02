import { ApiProperty } from '@nestjs/swagger';

export class TradeDTO {
  /**
   * @description The transaction hash
   * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
   */
  @ApiProperty({
    example: '0x057Ec652A4F150f7FF94f089A38008f49a0DF88e',
    description: 'The transaction hash',
  })
  transaction_hash: string;
  /** @description The transaction index */
  @ApiProperty({ example: '', description: 'The transaction index' })
  transaction_index: string;
  /**
   * @description The token id(s) traded
   * @example 15,54
   */
  @ApiProperty({ example: [15, 54], description: 'The token id(s) traded' })
  token_ids: unknown[];
  /**
   * @description The address that sold the NFT
   * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
   */
  @ApiProperty({
    example: '0x057Ec652A4F150f7FF94f089A38008f49a0DF88e',
    description: 'The address that sold the NFT',
  })
  seller_address: string;
  /**
   * @description The address that bought the NFT
   * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
   */
  @ApiProperty({
    example: '0x057Ec652A4F150f7FF94f089A38008f49a0DF88e',
    description: 'The address that bought the NFT',
  })
  buyer_address: string;
  /**
   * @description The address of the contract that traded the NFT
   * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
   */
  @ApiProperty({
    example: '0x057Ec652A4F150f7FF94f089A38008f49a0DF88e',
    description: 'The address of the contract that traded the NFT',
  })
  marketplace_address: string;
  /**
   * @description The value that was sent in the transaction (ETH/BNB/etc..)
   * @example 1000000000000000
   */
  @ApiProperty({
    example: '1000000000000000',
    description: 'The value that was sent in the transaction (ETH/BNB/etc..)',
  })
  price: string;
  /**
   * @description The block timestamp
   * @example 2021-06-04T16:00:15
   */
  @ApiProperty({
    example: '2021-06-04T16:00:15',
    description: 'The block timestamp',
  })
  block_timestamp: string;
  /**
   * @description The blocknumber of the transaction
   * @example 13680123
   */
  @ApiProperty({
    example: '13680123',
    description: 'The blocknumber of the transaction',
  })
  block_number: string;
  /**
   * @description The block hash
   * @example 0x4a7c916ca4a970358b9df90051008f729685ff05e9724a9dddba32630c37cb96
   */
  @ApiProperty({
    example:
      '0x4a7c916ca4a970358b9df90051008f729685ff05e9724a9dddba32630c37cb96',
    description: 'The block hash',
  })
  block_hash: string;
  @ApiProperty({
    example: '0x057Ec652A4F150f7FF94f089A38008f49a0DF8bb',
    description: 'The address that token',
  })
  token_address: string;
}
