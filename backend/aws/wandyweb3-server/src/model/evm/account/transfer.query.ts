import { ApiProperty } from '@nestjs/swagger';
import { ChainQuery } from '../chain.query';

export class TransferQuery extends ChainQuery {
  @ApiProperty({
    example:
      'liquid raven much pitch setup shallow base coconut lucky degree ancient voyage',
    description: 'The mnemonic of the payer',
  })
  mnemonic: string;
  /** The addresses to get metadata for */
  @ApiProperty({
    example: '0x2dF6EC5cE8695eccBC6B6f6b8C0035Bf5aC60787',
    description: 'Address of payee (to address)',
  })
  address: string;

  @ApiProperty({
    required: false,
    example: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    description: 'This can be an address or an ENS name',
  })
  contract_address: string;

  @ApiProperty({
    example: '0.01',
    description: 'pay amount',
  })
  amount: number;
}
