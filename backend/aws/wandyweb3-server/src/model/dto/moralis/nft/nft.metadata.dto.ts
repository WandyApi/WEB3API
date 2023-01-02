import { ApiProperty } from '@nestjs/swagger';

export class NftMetadataDTO {
  /**
   * @description The token id of the NFT
   * @example 889
   */
  @ApiProperty({ example: '889', description: 'The token id of the NFT' })
  token_id: string;
  /**
   * @description The address of the contract of the NFT
   * @example 0x8ce66ff0865570d1ff0bb0098fa41b4dc61e02e6
   */
  @ApiProperty({
    example: '0x8ce66ff0865570d1ff0bb0098fa41b4dc61e02e6',
    description: 'The address of the contract of the NFT',
  })
  token_address: string;
  /**
   * @description The uri to the metadata of the token
   * @example https://ipfs.moralis.io:2053/ipfs/QmZZbo8u8zEWg7wtmZhJS2W718WL6FA95T4XdgmCcLp1SJ/889.json
   */
  @ApiProperty({
    example: 'The uri to the metadata of the token',
    description:
      'https://ipfs.moralis.io:2053/ipfs/QmZZbo8u8zEWg7wtmZhJS2W718WL6FA95T4XdgmCcLp1SJ/889.json',
  })
  token_uri: string;
  /**
   * @description The metadata of the token
   * @example {"name":"Bape #889","description":"The #1 metavestor clan (NFT/DAO) by a team with multi billion dollar company experience.","image":"https://bapesclan.mypinata.cloud/ipfs/QmTSUD5JA6qHaC5t25mcXySfz19AV9u4Mb6Na7ntQ6tEwf/889.jpg","attributes":[{"trait_type":"Background","value":"Black"},{"trait_type":"Body","value":"Man"},{"trait_type":"Dress","value":"Suit Tie Blue"},{"trait_type":"Face","value":"Pipe"},{"trait_type":"Eye","value":"Eye"}]}
   */
  @ApiProperty({
    example:
      '{"name":"Bape #889","description":"The #1 metavestor clan (NFT/DAO) by a team with multi billion dollar company experience.","image":"https://bapesclan.mypinata.cloud/ipfs/QmTSUD5JA6qHaC5t25mcXySfz19AV9u4Mb6Na7ntQ6tEwf/889.jpg","attributes":[{"trait_type":"Background","value":"Black"},{"trait_type":"Body","value":"Man"},{"trait_type":"Dress","value":"Suit Tie Blue"},{"trait_type":"Face","value":"Pipe"},{"trait_type":"Eye","value":"Eye"}]}',
    description: 'The metadata of the token',
  })
  metadata: string;
  /** @example 1 */
  @ApiProperty({ example: 1, description: '' })
  is_valid: number;
  /** @example 2 */
  @ApiProperty({ example: 2, description: '' })
  syncing: number;
  /** @example 0 */
  @ApiProperty({ example: 0, description: '' })
  frozen: number;
  /** @example 0 */
  @ApiProperty({ example: 0, description: '' })
  resyncing: number;
  /**
   * @description The type of NFT contract standard
   * @example ERC721
   */
  @ApiProperty({
    example: 'ERC721',
    description: 'The type of NFT contract standard',
  })
  contract_type: string;
  /** @example fffa3102469ce77f569893d16d5884f9 */
  @ApiProperty({ example: 'fffa3102469ce77f569893d16d5884f9', description: '' })
  token_hash: string;
  /** @example fd995c8a-f8b2-40cb-a407-f43e552638b4 */
  @ApiProperty({
    example: 'fd995c8a-f8b2-40cb-a407-f43e552638b4',
    description: '',
  })
  batch_id: string;
  /** @example Bape #889 */
  @ApiProperty({ example: 'Bape #889', description: '' })
  metadata_name: string;
  /** @example The #1 metavestor clan (NFT/DAO) by a team with multi billion dollar company experience. */
  @ApiProperty({
    example:
      'The #1 metavestor clan (NFT/DAO) by a team with multi billion dollar company experience.',
    description: '',
  })
  metadata_description: string;
  /** @example [{"trait_type":"Background","value":"Black"},{"trait_type":"Body","value":"Man"},{"trait_type":"Dress","value":"Suit Tie Blue"},{"trait_type":"Face","value":"Pipe"},{"trait_type":"Eye","value":"Eye"}] */
  @ApiProperty({
    example:
      '[{"trait_type":"Background","value":"Black"},{"trait_type":"Body","value":"Man"},{"trait_type":"Dress","value":"Suit Tie Blue"},{"trait_type":"Face","value":"Pipe"},{"trait_type":"Eye","value":"Eye"}] ',
    description: '',
  })
  metadata_attributes: string;
  /** @example 14265936 */
  @ApiProperty({ example: '14265936', description: '' })
  block_number_minted: string;
  @ApiProperty({ example: '', description: 'opensea_lookup' })
  opensea_lookup?: { [key: string]: unknown };
  /** @example 0xdcf086e3f7954b38180daae1405569da86588bfe */
  @ApiProperty({
    example: '0xdcf086e3f7954b38180daae1405569da86588bfe',
    description: '',
  })
  minter_address: string;
  /** @example 0x2c8d7ec7a8439b0f67b50e93be63242de52e9b5cdfc7dc0aee80c6a2f104c41a */
  @ApiProperty({
    example:
      '0x2c8d7ec7a8439b0f67b50e93be63242de52e9b5cdfc7dc0aee80c6a2f104c41a',
    description: '',
  })
  transaction_minted: string;
  @ApiProperty({ example: '', description: 'frozen_log_index' })
  frozen_log_index?: { [key: string]: unknown };
  @ApiProperty({ example: '', description: 'imported' })
  imported?: { [key: string]: unknown };
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
   * Format: date-time
   * @example 2022-02-24T00:47:26.647Z
   */
  @ApiProperty({ example: '2022-02-24T00:47:26.647Z', description: '' })
  createdAt: string;
  /**
   * Format: date-time
   * @example 2022-04-09T23:56:44.807Z
   */
  @ApiProperty({ example: '2022-04-09T23:56:44.807Z', description: '' })
  updatedAt: string;
}
