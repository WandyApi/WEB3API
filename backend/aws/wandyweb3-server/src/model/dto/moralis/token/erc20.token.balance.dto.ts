import { ApiProperty } from '@nestjs/swagger';

export class Erc20TokenBalanceDTO {
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
   * @example Kylin Network
   */
  @ApiProperty({
    example: 'Kylin Network',
    description: 'The name of the token Contract',
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
   * @description The logo of the token
   * @example https://cdn.moralis.io/eth/0x67b6d479c7bb412c54e03dca8e1bc6740ce6b99c.png
   */
  @ApiProperty({
    example: 'The logo of the token',
    description:
      'https://cdn.moralis.io/eth/0x67b6d479c7bb412c54e03dca8e1bc6740ce6b99c.png',
  })
  logo?: string;
  /**
   * @description The thumbnail of the logo
   * @example https://cdn.moralis.io/eth/0x67b6d479c7bb412c54e03dca8e1bc6740ce6b99c_thumb.png
   */
  @ApiProperty({
    example: 'The thumbnail of the logo',
    description:
      'https://cdn.moralis.io/eth/0x67b6d479c7bb412c54e03dca8e1bc6740ce6b99c_thumb.png',
  })
  thumbnail?: string;
  /**
   * @description The number of decimals on of the token
   * @example 18
   */
  @ApiProperty({
    example: 18.56,
    description: 'The number of decimals on of the token',
  })
  decimals: number;
  /**
   * @description Timestamp of when the contract was last synced with the node
   * @example 123456789
   */
  @ApiProperty({
    example: '123456789',
    description: 'Timestamp of when the contract was last synced with the node',
  })
  balance: string;
}
