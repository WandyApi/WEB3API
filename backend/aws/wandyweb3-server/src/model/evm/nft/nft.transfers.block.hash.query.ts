import { ApiProperty } from '@nestjs/swagger';
import { PageQuery } from '../page.query';

export class NFTransfersBlockHashQuery extends PageQuery {
  @ApiProperty({
    example: '5',
    description: 'The block hash or block number.',
  })
  blockNumberOrHash: string;
}
