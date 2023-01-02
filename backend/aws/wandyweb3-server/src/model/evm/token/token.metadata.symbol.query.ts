import { ApiProperty } from '@nestjs/swagger';
import { ChainQuery } from '../../evm/chain.query';

export class TokenMetadataSymbolQuery extends ChainQuery {
  /** The symbols to get metadata for */
  @ApiProperty({
    type: Array,
    example: ['USDT', 'BNB', 'DOGE'],
    description: 'The symbols to get metadata for',
  })
  symbols: string[];
}
