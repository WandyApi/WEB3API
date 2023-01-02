import { ApiProperty } from '@nestjs/swagger';
import { Cluster } from '@solana/web3.js';
import { IsNotEmpty } from 'class-validator';

export class TransferForm {
  @IsNotEmpty()
  @ApiProperty({
    example:
      'energy wear ball recall paddle boil cigar wave genre airport actress rifle',
  })
  mnemonic: string;

  @IsNotEmpty()
  @ApiProperty({ example: '2ASevJwBi9GdhZUbNH9w8GWMAvheg68un5Y1848JNccg' })
  toAddress: string;

  @IsNotEmpty()
  @ApiProperty({ example: 500 })
  amount: number;

  @ApiProperty({
    required: false,
    default: 'SOL',
    description: 'the value is "SOL" or sql token',
    example: 'SOL',
  })
  token?: string;

  @ApiProperty({
    required: false,
    default: 'devnet',
    description: 'the value is only "devnet" or "testnet" or "mainnet-beta"',
    example: 'devnet',
  })
  cluster?: Cluster;
}
