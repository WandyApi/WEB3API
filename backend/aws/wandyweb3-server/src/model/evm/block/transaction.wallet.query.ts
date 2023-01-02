import { ApiProperty } from '@nestjs/swagger';
import { BlockPageQuery } from './block.page.query';

export class TransactionWalletQuery extends BlockPageQuery {
  @ApiProperty({
    example: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    description: 'The address of the wallet',
  })
  address: string;
}
