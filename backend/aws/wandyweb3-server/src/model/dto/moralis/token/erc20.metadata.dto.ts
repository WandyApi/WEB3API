import { ApiProperty } from '@nestjs/swagger';

export class Erc20MetadataDTO {
  /**
   * @description The address of the token contract
   * @example 0x2d30ca6f024dbc1307ac8a1a44ca27de6f797ec22ef20627a1307243b0ab7d09
   */
  @ApiProperty({
    example:
      '0x2d30ca6f024dbc1307ac8a1a44ca27de6f797ec22ef20627a1307243b0ab7d09',
    description: 'The address of the token contract',
  })
  address: string;
  /**
   * @description The name of the token Contract
   * @example Kylin Network
   */
  @ApiProperty({
    example: 'The name of the token Contract',
    description: 'Kylin Network',
  })
  name: string;
  /**
   * @description The symbol of the NFT contract
   * @example KYL
   */
  @ApiProperty({
    example: 'KYL',
    description: 'The symbol of the NFT contract',
  })
  symbol: string;
  /**
   * @description The number of decimals on of the token
   * @example 18
   */
  @ApiProperty({
    example: '18',
    description: 'The number of decimals on of the token',
  })
  decimals: string;
  /**
   * @description The logo of the token
   * @example https://cdn.moralis.io/eth/0x67b6d479c7bb412c54e03dca8e1bc6740ce6b99c.png
   */
  @ApiProperty({
    example:
      'https://cdn.moralis.io/eth/0x67b6d479c7bb412c54e03dca8e1bc6740ce6b99c.png',
    description: 'The logo of the token',
  })
  logo?: string;
  /**
   * @description The logo hash
   * @example ee7aa2cdf100649a3521a082116258e862e6971261a39b5cd4e4354fcccbc54d
   */
  @ApiProperty({
    example: 'ee7aa2cdf100649a3521a082116258e862e6971261a39b5cd4e4354fcccbc54d',
    description: 'The logo hash',
  })
  logo_hash?: string;
  /**
   * @description The thumbnail of the logo
   * @example https://cdn.moralis.io/eth/0x67b6d479c7bb412c54e03dca8e1bc6740ce6b99c_thumb.png
   */
  @ApiProperty({
    example:
      'https://cdn.moralis.io/eth/0x67b6d479c7bb412c54e03dca8e1bc6740ce6b99c_thumb.png',
    description: 'The thumbnail of the logo',
  })
  thumbnail?: string;
  @ApiProperty({ example: '', description: '' })
  block_number?: string;
  @ApiProperty({ example: '', description: '' })
  validated?: string;
}
