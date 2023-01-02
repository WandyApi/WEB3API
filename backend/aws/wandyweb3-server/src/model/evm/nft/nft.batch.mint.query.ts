import { ApiProperty } from '@nestjs/swagger';

import { NFTMintQuery } from './nft.mint.query';

export class NFTBatchMintQuery extends NFTMintQuery {
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
