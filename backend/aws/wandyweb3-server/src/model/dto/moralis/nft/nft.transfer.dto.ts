import { ApiProperty } from '@nestjs/swagger';

export class NftTransferDTO {
  /**
   * @description The address of the contract of the NFT
   * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
   */
  @ApiProperty({
    example: '0x057Ec652A4F150f7FF94f089A38008f49a0DF88e',
    description: 'The address of the contract of the NFT',
  })
  token_address: string;
  /**
   * @description The token id of the NFT
   * @example 15
   */
  @ApiProperty({ example: '15', description: 'The token id of the NFT' })
  token_id: string;
  /**
   * @description The address that sent the NFT
   * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
   */
  @ApiProperty({
    example: '0x057Ec652A4F150f7FF94f089A38008f49a0DF88e',
    description: 'The address that sent the NFT',
  })
  from_address?: string;
  /**
   * @description The address that recieved the NFT
   * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
   */
  @ApiProperty({
    example: '0x057Ec652A4F150f7FF94f089A38008f49a0DF88e',
    description: 'The address that recieved the NFT',
  })
  to_address: string;
  /**
   * @description The value that was sent in the transaction (ETH/BNB/etc..)
   * @example 1000000000000000
   */
  @ApiProperty({
    example: '1000000000000000',
    description: 'The value that was sent in the transaction (ETH/BNB/etc..)',
  })
  value?: string;
  /**
   * @description The number of tokens transferred
   * @example 1
   */
  @ApiProperty({
    example: '1',
    description: 'The number of tokens transferred',
  })
  amount?: string;
  /**
   * @description The type of NFT contract standard
   * @example ERC721
   */
  @ApiProperty({
    example: 'ERC721',
    description: 'The type of NFT contract standard',
  })
  contract_type: string;
  /**
   * @description The blocknumber of the transaction
   * @example 88256
   */
  @ApiProperty({
    example: '88256',
    description: 'The blocknumber of the transaction',
  })
  block_number: string;
  /**
   * @description The block timestamp
   * @example 2021-06-04T16:00:15
   */
  @ApiProperty({
    example: '2021-06-04T16:00:15',
    description: 'The block timestamp',
  })
  block_timestamp: string;
  /** @description The block hash of the transaction */
  @ApiProperty({
    example: '',
    description: 'The block hash of the transaction',
  })
  block_hash: string;
  /**
   * @description The transaction hash
   * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
   */
  @ApiProperty({
    example: '0x057Ec652A4F150f7FF94f089A38008f49a0DF88e',
    description: 'The transaction hash',
  })
  transaction_hash: string;

  /** @description The transaction type */
  @ApiProperty({ example: '', description: 'The transaction type' })
  transaction_type?: string;

  /** @description The transaction index */
  @ApiProperty({ example: '', description: 'The transaction index' })
  transaction_index?: string;

  /** @description The log index */
  @ApiProperty({ example: '', description: 'The log index' })
  log_index: number;
  /**
   * @description The operator present only for ERC1155 Transfers
   * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
   */
  @ApiProperty({
    example: '0x057Ec652A4F150f7FF94f089A38008f49a0DF88e',
    description: 'The operator present only for ERC1155 Transfers',
  })
  operator?: string;
}
