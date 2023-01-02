import { ApiProperty, getSchemaPath } from '@nestjs/swagger';

export class NativeErc20PriceDTO {
  /**
   * @description The native price of the token
   * @example 8409770570506626
   */
  @ApiProperty({
    example: '8409770570506626',
    description: 'The native price of the token',
  })
  value: string;
  /**
   * @description The number of decimals of the token
   * @example 18
   */
  @ApiProperty({
    example: 18,
    description: 'The number of decimals of the token',
  })
  decimals: number;
  /**
   * @description The Name of the token
   * @example Ether
   */
  @ApiProperty({ example: 'Ether', description: 'The Name of the token' })
  name: string;
  /**
   * @description The Symbol of the token
   * @example ETH
   */
  @ApiProperty({ example: 'ETH', description: 'The Symbol of the token' })
  symbol: string;
}

export class Erc20PriceDTO {
  @ApiProperty({
    description: 'nativePrice',
    type: [NativeErc20PriceDTO],
    oneOf: [{ $ref: getSchemaPath(NativeErc20PriceDTO) }],
  })
  nativePrice?: NativeErc20PriceDTO;
  /**
   * Format: double
   * @description The price in USD for the token
   * @example 19.722370676
   */
  @ApiProperty({
    example: 19.722370676,
    description: 'The price in USD for the token',
  })
  usdPrice: number;
  /**
   * @description The address of the exchange used to calculate the price
   * @example 0x1f98431c8ad98523631ae4a59f267346ea31f984
   */
  @ApiProperty({
    example: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
    description: 'The address of the exchange used to calculate the price',
  })
  exchangeAddress?: string;
  /**
   * @description The name of the exchange used for calculating the price
   * @example Uniswap v3
   */
  @ApiProperty({
    example: 'Uniswap v3',
    description: 'The name of the exchange used for calculating the price',
  })
  exchangeName?: string;

  /**
   * @description The Symbol of the token
   * @example ETH
   */
  @ApiProperty({ example: 'ETH', description: 'The Symbol of the token' })
  symbol: string;
}
