import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { NormalizedMetadataDTO } from './nft.normalized.metadata';

export class NftDTO {
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
   * @description The type of NFT contract standard
   * @example ERC721
   */
  @ApiProperty({
    example: 'ERC721',
    description: 'The type of NFT contract standard',
  })
  contract_type: string;

  /** @description The uri to the metadata of the token */
  @ApiProperty({
    example: '',
    description: 'The uri to the metadata of the token',
  })
  token_uri?: string;
  @ApiProperty({
    description: "A normalized metadata version of the NFT's metadata.",
    type: [NormalizedMetadataDTO],
    oneOf: [{ $ref: getSchemaPath(NormalizedMetadataDTO) }],
  })
  metadata?: NormalizedMetadataDTO;
  /**
   * @description The number of this item the user owns (used by ERC1155)
   * @example 1
   */
  @ApiProperty({
    example: '1',
    description: 'The number of this item the user owns (used by ERC1155)',
  })
  amount?: string;
  /**
   * @description The name of the Token contract
   * @example CryptoKitties
   */
  @ApiProperty({
    example: 'CryptoKitties',
    description: 'The name of the Token contract',
  })
  name: string;
  /**
   * @description The symbol of the NFT contract
   * @example RARI
   */
  @ApiProperty({
    example: 'RARI',
    description: 'The symbol of the NFT contract',
  })
  symbol: string;

  /**
   * @description When the token_uri was last updated
   * @example 2021-02-24T00:47:26.647Z
   */
  @ApiProperty({
    example: '2021-02-24T00:47:26.647Z',
    description: 'When the token_uri was last updated',
  })
  last_token_uri_sync: string;
  /**
   * @description When the metadata was last updated
   * @example 2021-02-24T00:47:26.647Z
   */
  @ApiProperty({
    example: '2021-02-24T00:47:26.647Z',
    description: 'When the metadata was last updated',
  })
  last_metadata_sync: string;

  /**
   * @description The wallet address of the owner of the NFT
   * @example 0x9c83ff0f1c8924da96cb2fcb7e093f78eb2e316b
   */
  @ApiProperty({
    example: '0x9c83ff0f1c8924da96cb2fcb7e093f78eb2e316b',
    description: 'The wallet address of the owner of the NFT',
  })
  owner_of?: string;
  /**
   * @description The token hash
   * @example 502cee781b0fb40ea02508b21d319ced
   */
  @ApiProperty({
    example: '502cee781b0fb40ea02508b21d319ced',
    description: 'The token hash',
  })
  token_hash?: string;
  /**
   * @description The block number when the amount or owner changed
   * @example 88256
   */
  @ApiProperty({
    example: 88256,
    description: 'The block number when the amount or owner changed',
  })
  block_number?: string;
  /**
   * @description The block number when the NFT was minted
   * @example 88256
   */
  @ApiProperty({
    example: 88256,
    description: 'The block number when the NFT was minted',
  })
  block_number_minted?: string;

  /**
   * @description The address that minted the NFT
   * @example 0x9c83ff0f1c8924da96cb2fcb7e093f78eb2e316b
   */
  @ApiProperty({
    example: '0x9c83ff0f1c8924da96cb2fcb7e093f78eb2e316b',
    description: 'The address that minted the NFT',
  })
  minter_address?: string;
}
