import { ApiProperty } from '@nestjs/swagger';

export class NftContractMetadata {
  /**
   * @description The address of the token contract
   * @example 0x2d30ca6f024dbc1307ac8a1a44ca27de6f797ec22ef20627a1307243b0ab7d09
   */
  @ApiProperty({
    example:
      '0x2d30ca6f024dbc1307ac8a1a44ca27de6f797ec22ef20627a1307243b0ab7d09',
    description: 'The address of the token contract',
  })
  token_address: string;
  /**
   * @description The name of the token Contract
   * @example KryptoKitties
   */
  @ApiProperty({
    example: 'KryptoKitties',
    description: 'The name of the token Contract',
  })
  name: string;
  /** @description Timestamp of when the contract was last synced with the node */
  @ApiProperty({
    example: '',
    description: 'Timestamp of when the contract was last synced with the node',
  })
  synced_at?: string;
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
   * @description The type of NFT contract
   * @example ERC721
   */
  @ApiProperty({ example: 'ERC721', description: 'The type of NFT contract' })
  contract_type: string;
}
