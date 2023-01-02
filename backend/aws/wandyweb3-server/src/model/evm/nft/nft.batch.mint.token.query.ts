import { ApiProperty } from '@nestjs/swagger';
import { NFTMintTokenQuery } from './nft.mint.token.query';

export class NFTBatchMintTokenQuery extends NFTMintTokenQuery {
  @ApiProperty({
    example: 1,
    description: 'nft tokenid start number',
  })
  start_token_id: number;

  @ApiProperty({
    example: 10,
    description: 'The number of batches generated',
  })
  total: number;
}
