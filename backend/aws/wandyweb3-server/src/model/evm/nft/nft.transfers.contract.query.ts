import { ApiProperty } from '@nestjs/swagger';
import { NFTransfersBlockQuery } from './nft.transfers.block.query';

export class NFTransfersContractQuery extends NFTransfersBlockQuery {
  @ApiProperty({
    example: '0x128ad2b1058b095b864c0ce779e89a3d1e5c1a95',
    description: 'The sender or recepient of the transfer',
  })
  address: string;
}
